import { Zap } from "lucide-react";
import { Link } from "react-router";

const LinkBrand = () => (
  <Link
    to="/auth/login"
    className="relative z-10 inline-flex w-fit items-center gap-2.5"
  >
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
      <Zap aria-hidden="true" size={19} strokeWidth={2.4} />
    </span>
    <span className="font-heading text-lg font-bold tracking-normal">
      DevPulse
    </span>
  </Link>
);

export default LinkBrand;
