import { Button } from "./ui/button";

interface BPButtonProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon" | "link";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function BPButton({
  children,
  variant,
  size,
  disabled,
  className,
  onClick,
  ...props
}: BPButtonProps) {
  return (
    <Button
      className={className}
      onClick={onClick}
      variant={variant ? variant : "default"}
      size={size}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
}
