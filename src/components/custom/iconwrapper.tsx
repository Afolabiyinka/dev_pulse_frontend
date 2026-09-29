import { siDocker } from "simple-icons";
import { icons, HelpCircle, type LucideProps } from "lucide-react";
const DockerIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={siDocker.path} />
  </svg>
);
export { DockerIcon };

export type IconName = keyof typeof icons;
type IconProps = LucideProps & { icon?: IconName };

export const IconComponent = ({ icon, ...props }: IconProps) => {
  const Icon = (icon && icons[icon]) || HelpCircle;
  return <Icon {...props} />;
};
