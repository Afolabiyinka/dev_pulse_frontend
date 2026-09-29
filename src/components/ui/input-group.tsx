import * as React from "react";
import { cn } from "cn";
import { Input } from "./input";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="input-group"
      className={cn(
        "group/input-group flex h-12 w-full items-center gap-1 overflow-hidden rounded-full border border-input bg-background px-3 transition-[color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/20",
        className,
      )}
      {...props}
    />
  );
}

interface InputGroupAddonProps extends React.ComponentProps<"div"> {
  align?: "inline-start" | "inline-end";
}

function InputGroupAddon({
  align = "inline-start",
  className,
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      role="presentation"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "flex h-full shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4",
        align === "inline-start" ? "pr-2" : "pl-2",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "h-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-0 py-0 shadow-none focus-visible:border-0 focus-visible:ring-0",
        className,
      )}
      {...props}
    />
  );
}

export { InputGroup, InputGroupAddon, InputGroupInput };
