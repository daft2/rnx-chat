"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Check, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { signUp } from "@/services/authService";
import ErrorAlert from "../../components/ErrorAlert";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Password strength criteria states
  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // Check password strength based on criteria
  useEffect(() => {
    setCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    });
  }, [password]);

  // Calculate overall password strength
  const getPasswordStrength = () => {
    const criteriaCount = Object.values(criteria).filter(Boolean).length;
    if (criteriaCount <= 1) return { strength: "Weak", color: "bg-red-500" };
    if (criteriaCount <= 3)
      return { strength: "Medium", color: "bg-yellow-500" };
    return { strength: "Strong", color: "bg-green-500" };
  };

  // Navigation function to sign-in screen
  const navigateToSignIn = () => {
    router.push("/sign-in");
  };

  const passwordStrength = getPasswordStrength();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (Object.values(criteria).filter(Boolean).length < 3) {
      setError("Please create a stronger password");
      return;
    }

    setLoading(true);
    try {
      const user = await signUp(email, password, name);
      if (user) {
        router.replace("/"); // Use replace instead of push to prevent going back
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const dismissError = () => setError("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerClassName="flex-grow"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </Text>
            <Text className="text-gray-500 text-center">
              Sign up to get started
            </Text>
          </View>

          {/* Error Alert */}
          {error ? (
            <ErrorAlert message={error} onDismiss={dismissError} />
          ) : null}

          {/* Form */}
          <View className="space-y-6 gap-4">
            {/* Name Input */}
            <View>
              <Text className="text-gray-700 mb-2 font-medium">Full Name</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoComplete="name"
              />
            </View>

            {/* Email Input */}
            <View>
              <Text className="text-gray-700 mb-2 font-medium">Email</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-gray-700 mb-2 font-medium">Password</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
              />

              {/* Password Strength Indicator - Always visible */}
              <View className="mt-2">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-gray-600 text-sm">
                    Password Strength:
                  </Text>
                  <Text
                    className={`text-sm font-medium ${
                      password.length === 0
                        ? "text-gray-400"
                        : passwordStrength.strength === "Weak"
                        ? "text-red-500"
                        : passwordStrength.strength === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {password.length === 0 ? "None" : passwordStrength.strength}
                  </Text>
                </View>

                {/* Strength Bar */}
                <View className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <View
                    className={`h-full ${
                      password.length === 0
                        ? "bg-gray-300"
                        : passwordStrength.color
                    }`}
                    style={{
                      width: `${
                        (Object.values(criteria).filter(Boolean).length / 5) *
                        100
                      }%`,
                    }}
                  />
                </View>

                {/* Password Criteria */}
                <View className="mt-3 space-y-1">
                  <CriteriaItem
                    label="At least 8 characters"
                    met={criteria.length}
                  />
                  <CriteriaItem
                    label="At least one uppercase letter"
                    met={criteria.uppercase}
                  />
                  <CriteriaItem
                    label="At least one lowercase letter"
                    met={criteria.lowercase}
                  />
                  <CriteriaItem
                    label="At least one number"
                    met={criteria.number}
                  />
                  <CriteriaItem
                    label="At least one special character"
                    met={criteria.special}
                  />
                </View>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View>
              <Text className="text-gray-700 mb-2 font-medium">
                Confirm Password
              </Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
              />
              {confirmPassword.length > 0 && (
                <View className="flex-row items-center mt-1">
                  {password === confirmPassword ? (
                    <>
                      <Check size={16} color="#10b981" />
                      <Text className="text-green-600 text-sm ml-1">
                        Passwords match
                      </Text>
                    </>
                  ) : (
                    <>
                      <X size={16} color="#ef4444" />
                      <Text className="text-red-500 text-sm ml-1">
                        Passwords don't match
                      </Text>
                    </>
                  )}
                </View>
              )}
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              className={`bg-blue-600 rounded-lg py-3.5 items-center mt-4 ${
                loading ? "opacity-70" : ""
              }`}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <View className="flex-row items-center">
                  <ActivityIndicator color="white" size="small" />
                  <Text className="text-white font-semibold text-lg ml-2">
                    Signing Up...
                  </Text>
                </View>
              ) : (
                <Text className="text-white font-semibold text-lg">
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Sign In Link */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={navigateToSignIn}>
              <Text className="text-blue-600 font-medium">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Password criteria item component
function CriteriaItem({ label, met }: { label: string; met: boolean }) {
  return (
    <View className="flex-row items-center">
      {met ? (
        <Check size={16} color="#10b981" />
      ) : (
        <X size={16} color="#9ca3af" />
      )}
      <Text
        className={`text-sm ml-2 ${met ? "text-green-600" : "text-gray-500"}`}
      >
        {label}
      </Text>
    </View>
  );
}
