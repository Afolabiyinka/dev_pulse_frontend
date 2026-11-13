import { PulseIcon } from "@phosphor-icons/react";
import { Link } from "react-router";

const LinkBrand = () => (
  <Link
    to="/auth/login"
    className="relative z-10 inline-flex w-fit items-center gap-1"
  >
    <span className="flex h-9 w-9 items-center justify-center rounded-xl text-secondary-foreground">
      <PulseIcon aria-hidden="true" size={25} strokeWidth={2.4} />
    </span>
    <span className="font-heading text-lg font-bold tracking-normal">
      DevPulse
    </span>
  </Link>
);

export default LinkBrand;
