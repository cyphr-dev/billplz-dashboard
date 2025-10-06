interface BPSectionProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

export default function BPSection({
  className,
  title,
  children,
}: BPSectionProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {title && <p className="font-semibold">{title}</p>}
      {children}
    </div>
  );
}
