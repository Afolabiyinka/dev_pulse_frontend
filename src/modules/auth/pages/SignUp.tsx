import type { FormEvent } from "react";
import { Link } from "react-router";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import AuthLayout from "@/modules/auth/components/AuthLayout";
import CustomBtn from "@/components/custom/CustomBtn";
import CustomInput from "@/components/custom/CustomInput";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGithubLogin } from "@/modules/auth/hooks/useGithubLogin";
import { useSignup } from "@/modules/auth/hooks/useSignup";
import { GithubLogoIcon } from "@phosphor-icons/react";

const SignUp = () => {
  const { handleSignup, loading, setSignupData, signupData } = useSignup();
  const { handleGithubLogin } = useGithubLogin();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignup();
  };

  return (
    <AuthLayout
      eyebrow="Your next chapter"
      title="Create your account"
      description="Set up your Dockyard workspace in a few seconds."
      footer={
        <>
          Already have an account?{" "}
          <Link
            className="font-semibold text-primary hover:underline"
            to="/auth/login"
          >
            Sign in
          </Link>
        </>
      }
    >
      <div className="space-y-6">
        <CustomBtn
          className="w-full"
          type="button"
          variant="secondary"
          icon={<GithubLogoIcon aria-hidden="true" size={18} />}
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
              htmlFor="name"
            >
              Full name
            </Label>
            <CustomInput
              icon={<UserRound aria-hidden="true" size={17} />}
              autoComplete="name"
              id="name"
              name="name"
              placeholder="Your name"
              value={signupData.username}
              onChange={(event) =>
                setSignupData({ ...signupData, username: event.target.value })
              }
              required
            />
          </div>

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
              value={signupData.email}
              onChange={(event) =>
                setSignupData({ ...signupData, email: event.target.value })
              }
              required
              type="email"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-sm font-semibold text-foreground"
              htmlFor="password"
            >
              Password
            </Label>
            <CustomInput
              icon={<LockKeyhole aria-hidden="true" size={17} />}
              autoComplete="new-password"
              id="password"
              minLength={8}
              name="password"
              placeholder="At least 8 characters"
              value={signupData.password}
              onChange={(event) =>
                setSignupData({ ...signupData, password: event.target.value })
              }
              required
              type="password"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-sm font-semibold text-foreground"
              htmlFor="confirmedPassword"
            >
              Confirm password
            </Label>
            <CustomInput
              icon={<LockKeyhole aria-hidden="true" size={17} />}
              autoComplete="new-password"
              id="confirmedPassword"
              minLength={8}
              name="confirmedPassword"
              placeholder="Re-enter your password"
              value={signupData.confirmedPassword}
              onChange={(event) =>
                setSignupData({
                  ...signupData,
                  confirmedPassword: event.target.value,
                })
              }
              required
              type="password"
            />
          </div>

          <CustomBtn
            className="h-12 w-full rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
            type="submit"
            loading={loading}
          >
            {loading ? "Creating account" : "Create account"}
          </CustomBtn>
          <p className="text-center text-xs leading-5 text-muted-foreground">
            By creating an account, you agree to our terms and privacy policy.
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
