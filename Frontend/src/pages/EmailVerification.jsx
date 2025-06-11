import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Mail,
  RefreshCw,
  Clock,
  Shield,
  Smartphone,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function EmailVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const userState = location.state;
  const userEmail = userState?.data?.user.email;
  const [isResending, setIsResending] = useState(false);
  const { isVerifyingEmail, verifyEmail } = useAuth();
  const [timeLeft, setTimeLeft] = useState(3600); // 5 minutes in seconds
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isVerified]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-verify when all fields are filled
    if (
      newCode.every((digit) => digit !== "") &&
      newCode.join("").length === 6
    ) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData
      .split("")
      .concat(Array(6 - pastedData.length).fill(""))
      .slice(0, 6);
    setVerificationCode(newCode);

    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (code) => {
    setError("");

    const isVerified = verifyEmail(code);
    if (!isVerified) setVerificationCode(["", "", "", "", "", ""]);
    console.log(isVerified);
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setTimeLeft(300); // Reset timer
      setVerificationCode(["", "", "", "", "", ""]);
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleChangeEmail = () => {
    // Navigate back to signup or show email change modal
    window.history.back();
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-200/15 to-red-200/15 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-md mx-auto w-full">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-10">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Email Verified!
            </h1>
            <p className="text-gray-600 mb-8">
              Your email has been successfully verified. You'll be redirected to
              your dashboard in a moment.
            </p>
            <div className="flex items-center justify-center space-x-2 text-orange-600">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm">Redirecting to dashboard...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white flex items-center justify-center px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-200/15 to-red-200/15 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Branding & Info */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <Link
                to="/auth"
                className="inline-flex items-center space-x-3 group"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                <span className="text-gray-600 group-hover:text-orange-500 transition-colors">
                  Back to sign in
                </span>
              </Link>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">W</span>
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
                    Willow
                  </span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Verify your email address
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We've sent a 6-digit verification code to your email. Enter it
                  below to complete your account setup.
                </p>
              </div>
            </div>

            {/* Security Features */}
            <div className="space-y-4">
              {[
                {
                  icon: <Shield className="w-5 h-5" />,
                  text: "Your account is protected with 2FA",
                },
                {
                  icon: <Mail className="w-5 h-5" />,
                  text: "Email verification prevents spam",
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  text: "Code expires in 5 minutes for security",
                },
                {
                  icon: <Smartphone className="w-5 h-5" />,
                  text: "Check your mobile app for faster access",
                },
              ].map((feature, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="text-green-500">{feature.icon}</div>
                  <span className="text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Help Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-100">
              <h3 className="font-semibold text-gray-900 mb-3">Need help?</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Check your spam/junk folder</p>
                <p>• Make sure you entered the correct email</p>
                <p>• The code expires in 5 minutes</p>
                <p>• Contact support if you're still having issues</p>
              </div>
            </div>
          </div>

          {/* Right Side - Verification Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-10">
              {/* Mobile Header */}
              <div className="lg:hidden mb-8 text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">W</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
                    Willow
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Verify your email
                </h2>
              </div>

              {/* Email Display */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Check your email
                </h3>
                <p className="text-gray-600 mb-4">
                  We sent a verification code to:
                </p>
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <p className="font-medium text-gray-900">{userEmail}</p>
                </div>
                <button
                  onClick={handleChangeEmail}
                  className="text-orange-600 hover:text-orange-500 text-sm font-medium"
                >
                  Wrong email? Change it
                </button>
              </div>

              {/* Verification Code Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  Enter 6-digit verification code
                </label>
                <div className="flex justify-center space-x-2 sm:space-x-3 mb-4">
                  {" "}
                  {/* Adjusted spacing for smaller screens */}
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className={`w-10 h-10 sm:w-12 sm:h-12 text-center text-xl font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${
                        error ? "border-red-500" : "border-gray-300"
                      } ${digit ? "border-orange-400 bg-orange-50" : ""}`}
                      disabled={isVerifyingEmail}
                    />
                  ))}
                </div>
                {error && (
                  <p className="text-sm text-red-600 text-center mb-4">
                    {error}
                  </p>
                )}
              </div>

              {/* Timer */}
              <div className="text-center mb-6">
                {timeLeft > 0 ? (
                  <p className="text-sm text-gray-600">
                    Code expires in{" "}
                    <span className="font-semibold text-orange-600">
                      {formatTime(timeLeft)}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-red-600">
                    Verification code has expired
                  </p>
                )}
              </div>

              {/* Verify Button */}
              <button
                onClick={() => handleVerify(verificationCode.join(""))}
                disabled={
                  verificationCode.some((digit) => !digit) || isVerifyingEmail
                }
                className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 hover:from-yellow-500 hover:via-orange-500 hover:to-red-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-6"
              >
                {isVerifyingEmail ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Verify Email"
                )}
              </button>

              {/* Resend Code */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Didn't receive the code?
                </p>
                <button
                  onClick={handleResendCode}
                  disabled={isResending || timeLeft > 240} // Allow resend after 1 minute
                  className="text-orange-600 hover:text-orange-500 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Resend code</span>
                  )}
                </button>
                {timeLeft > 240 && (
                  <p className="text-xs text-gray-500 mt-1">
                    You can resend in {formatTime(timeLeft - 240)}
                  </p>
                )}
              </div>

              {/* Footer Links */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center space-y-2">
                <Link
                  to="/support"
                  className="block text-sm text-gray-600 hover:text-orange-500"
                >
                  Contact Support
                </Link>
                <Link
                  to="/auth"
                  className="block text-sm text-gray-600 hover:text-orange-500"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
