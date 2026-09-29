import type { ReactNode } from "react";
import { cn } from "cn";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

interface CustomInputProps extends Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "className"
> {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  iconClassName?: string;
  trailing?: ReactNode;
  className?: string;
  inputClassName?: string;
}

const CustomInput = ({
  className,
  inputClassName,
  icon,
  iconPosition = "left",
  iconClassName,
  trailing,
  ...props
}: CustomInputProps) => {
  const iconAddon = icon && (
    <InputGroupAddon
      align={iconPosition === "left" ? "inline-start" : "inline-end"}
      className={iconClassName}
    >
      {icon}
    </InputGroupAddon>
  );

  return (
    <InputGroup className={cn("h-12 rounded-full", className)}>
      {iconPosition === "left" && iconAddon}
      <InputGroupInput className={inputClassName} {...props} />
      {iconPosition === "right" && iconAddon}
      {trailing && (
        <InputGroupAddon align="inline-end" className="pr-0">
          {trailing}
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};

export default CustomInput;
