import React from "react";
import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import SpinningLoader from "./spinning-loader";

interface Props
  extends
    Omit<React.ComponentProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  asChild?: boolean;
  children?: React.ReactNode;
}

const CustomBtn = ({
  children,
  icon,
  iconPosition = "left",
  loading = false,
  disabled,
  variant = "default",
  size = "default",
  className,
  ...props
}: Props) => {
  const leading = loading ? (
    <SpinningLoader />
  ) : (
    icon && iconPosition === "left" && icon
  );
  const trailing = !loading && icon && iconPosition === "right" && icon;

  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled || loading}
      {...props}
      className={className}
    >
      {leading}
      {children}
      {trailing}
    </Button>
  );
};

export default CustomBtn;
