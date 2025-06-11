// hooks/useAuth.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Get current user query
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
    isError: isUserError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: authService.getCurrentUser,
    retry: (failureCount, error) => {
      // Don't retry on 401 errors
      if (error.response?.status === 401) return false;
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    // Only run query if we have a token
    enabled: !!localStorage.getItem("accessToken"),
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Update user in cache
      queryClient.setQueryData(["user"], data.user);
      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      toast.success(
        "Registration successful! Please check your email to verify your account."
      );
      navigate("/verify-email", { state: data });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      toast.success("Logged out successfully");
      navigate("/login");
    },
    onError: (error) => {
      // Still clear cache even if server logout fails
      queryClient.clear();
      toast.error("Logout completed with warnings");
      navigate("/login");
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (updatedUser) => {
      // Update user in cache
      queryClient.setQueryData(queryKeys.auth.currentUser, updatedUser);
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: ({ currentPassword, newPassword }) =>
      authService.changePassword(currentPassword, newPassword),
    onSuccess: () => {
      toast.success("Password changed successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Request password reset mutation
  const requestPasswordResetMutation = useMutation({
    mutationFn: authService.requestPasswordReset,
    onSuccess: () => {
      toast.success("Password reset email sent! Check your inbox.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, newPassword }) =>
      authService.resetPassword(token, newPassword),
    onSuccess: () => {
      toast.success("Password reset successful! You can now login.");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Verify email mutation
  const verifyEmailMutation = useMutation({
    mutationFn: authService.verifyEmail,
    onSuccess: (data) => {
      toast.success("Email verified successfully!");
      queryClient.setQueryData(["user"], data.user);
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/welcome");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Resend verification email mutation
  const resendVerificationMutation = useMutation({
    mutationFn: authService.resendVerificationEmail,
    onSuccess: () => {
      toast.success("Verification email sent! Check your inbox.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Helper functions
  const login = (credentials) => loginMutation.mutate(credentials);
  const register = (userData) => registerMutation.mutate(userData);
  const logout = () => logoutMutation.mutate();
  const updateProfile = (profileData) =>
    updateProfileMutation.mutate(profileData);
  const changePassword = (passwords) =>
    changePasswordMutation.mutate(passwords);
  const requestPasswordReset = (email) =>
    requestPasswordResetMutation.mutate(email);
  const resetPassword = (data) => resetPasswordMutation.mutate(data);
  const verifyEmail = (token) => verifyEmailMutation.mutate(token);
  const resendVerification = () => resendVerificationMutation.mutate();

  // Computed states
  const isAuthenticated = !!user && !!localStorage.getItem("accessToken");
  const isLoading =
    isLoadingUser ||
    loginMutation.isPending ||
    registerMutation.isPending ||
    logoutMutation.isPending;

  return {
    // User data
    user,
    isAuthenticated,

    // Loading states
    isLoading,
    isLoadingUser,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    isRequestingReset: requestPasswordResetMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    isVerifyingEmail: verifyEmailMutation.isPending,
    isResendingVerification: resendVerificationMutation.isPending,

    // Error states
    userError,
    isUserError,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    updateProfileError: updateProfileMutation.error,
    changePasswordError: changePasswordMutation.error,

    // Actions
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    requestPasswordReset,
    resetPassword,
    verifyEmail,
    resendVerification,

    // Reset functions for clearing errors
    resetLoginError: () => loginMutation.reset(),
    resetRegisterError: () => registerMutation.reset(),
    resetUpdateProfileError: () => updateProfileMutation.reset(),
    resetChangePasswordError: () => changePasswordMutation.reset(),
  };
};
