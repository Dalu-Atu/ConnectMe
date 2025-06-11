// services/authService.js
import apiClient from "./appClient";

export const authService = {
  // Login with email and password
  async login(credentials) {
    try {
      const response = await apiClient.post("/auth/signin", credentials);
      const { user, accessToken, refreshToken } = response.data;

      // Store tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  // Register new user
  async register(userData) {
    try {
      const response = await apiClient.post("/auth/signup", userData);
      console.log(response.data);

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  // Logout user
  async logout() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await apiClient.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      // Even if logout fails on server, clear local storage
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },

  // Get current user profile
  async getCurrentUser() {
    try {
      const response = await apiClient.get("/auth/me");
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get user");
    }
  },

  // Refresh access token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await apiClient.post("/auth/refresh", { refreshToken });
      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      throw new Error("Token refresh failed");
    }
  },

  // Request password reset
  async requestPasswordReset(email) {
    try {
      const response = await apiClient.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Password reset request failed"
      );
    }
  },

  // Reset password with token
  async resetPassword(token, newPassword) {
    try {
      const response = await apiClient.post("/auth/reset-password", {
        token,
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Password reset failed");
    }
  },

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await apiClient.put("/auth/profile", profileData);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Profile update failed");
    }
  },

  // Change password
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await apiClient.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Password change failed"
      );
    }
  },

  // Verify email
  async verifyEmail(token) {
    try {
      const response = await apiClient.post("/auth/verify-email", { token });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Email verification failed"
      );
    }
  },

  // Resend verification email
  async resendVerificationEmail() {
    try {
      const response = await apiClient.post("/auth/resend-verification");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to resend verification email"
      );
    }
  },
};
