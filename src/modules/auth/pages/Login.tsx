import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import AuthLayout from "@/modules/auth/components/AuthLayout";
import CustomBtn from "@/components/custom/CustomBtn";
import CustomInput from "@/components/custom/CustomInput";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import { useGithubLogin } from "@/modules/auth/hooks/useGithubLogin";
import { GithubLogo } from "@phosphor-icons/react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, loading, setLoginData, loginData } = useLogin();
  const { handleGithubLogin } = useGithubLogin();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to Dockyard"
      description="Pick up right where you left off."
      footer={
        <>
          New to Dockyard?{" "}
          <Link
            className="font-semibold text-primary hover:underline"
            to="/auth/signup"
          >
            Create an account
          </Link>
        </>
      }
    >
      <div className="space-y-6">
        <CustomBtn
          className="w-full"
          type="button"
          variant="secondary"
          icon={<GithubLogo aria-hidden="true" size={18} />}
          onClick={handleGithubLogin}
        >
          Continue with GitHub
        </CustomBtn>

        <div className="flex items-center gap-4">
          <Separator className="flex-1 bg-border" />
          <span className="text-xs font-medium text-muted-foreground">
            OR USE EMAIL
          </span>
          <Separator className="flex-1 bg-border" />
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label
              className="text-sm font-semibold text-foreground"
              htmlFor="email"
            >
              Email address
            </Label>
            <CustomInput
              icon={<Mail aria-hidden="true" size={17} />}
              autoComplete="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={loginData.email}
              onChange={(event) =>
                setLoginData({ ...loginData, email: event.target.value })
              }
              required
              type="email"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                className="text-sm font-semibold text-foreground"
                htmlFor="password"
              >
                Password
              </Label>
              <Link
                className="text-xs font-semibold text-primary hover:underline"
                to="/auth/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
            <CustomInput
              icon={<LockKeyhole aria-hidden="true" size={17} />}
              autoComplete="current-password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(event) =>
                setLoginData({ ...loginData, password: event.target.value })
              }
              required
              type={showPassword ? "text" : "password"}
              trailing={
                <CustomBtn
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" size={17} />
                  ) : (
                    <Eye aria-hidden="true" size={17} />
                  )}
                </CustomBtn>
              }
            />
          </div>

          <CustomBtn
            className="h-12 w-full rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
            type="submit"
            loading={loading}
          >
            {loading ? "Signing in" : "Sign in"}
          </CustomBtn>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
