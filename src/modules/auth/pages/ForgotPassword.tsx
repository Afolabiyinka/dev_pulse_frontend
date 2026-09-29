import type { FormEvent } from "react";
import { Link } from "react-router";
import { ArrowLeft, Mail } from "lucide-react";
import AuthLayout from "@/modules/auth/components/AuthLayout";
import CustomBtn from "@/components/custom/CustomBtn";
import CustomInput from "@/components/custom/CustomInput";
import { Label } from "@/components/ui/label";
import useToast from "@/shared/hooks/useToast";

const ForgotPassword = () => {
  const { toastInfo } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toastInfo(
      "Password recovery is ready to connect to your authentication provider.",
    );
  };

  return (
    <AuthLayout
      eyebrow="Account recovery"
      title="Reset your password"
      description="Enter the email address linked to your account."
      footer={
        <Link
          className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          to="/auth/login"
        >
          <ArrowLeft aria-hidden="true" size={15} />
          Back to sign in
        </Link>
      }
    >
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
            required
            type="email"
          />
        </div>

        <CustomBtn
          className="h-12 w-full rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
          type="submit"
        >
          Send recovery link
        </CustomBtn>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
