import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import InputBox from '../shared/ui/input';
import Button from '../shared/ui/button';

const Login = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData?.password?.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData?.password)) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object?.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await login(formData?.email, formData?.password);
      if (!result?.success) {
        setErrors({ general: result?.error });
      }
    } catch {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md py-8 px-6 shadow-2xl rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary-600">Sign In</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputBox
            id="email"
            name="email"
            type="email"
            label="Email Address"
            required={true}
            value={formData?.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            error={errors?.email}
            autoComplete="email"
          />

          <InputBox
            id="password"
            name="password"
            type="password"
            label="Password"
            required={true}
            value={formData?.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors?.password}
            autoComplete="current-password"
          />

          {errors?.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {errors?.general}
            </div>
          )}

          <div>
            <Button type="submit" disabled={isLoading} text={isLoading ? "Signing in..." : "Sign In"} />

          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Note: Use any valid email and password (min 6 characters)
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
