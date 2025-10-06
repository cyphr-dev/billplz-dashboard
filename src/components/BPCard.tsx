interface BPCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function BPCard({
  children,
  className,
  noPadding = false,
}: BPCardProps) {
  return (
    <div
      className={`border rounded-lg shadow-sm bg-background ${className} ${
        noPadding ? "p-0" : "p-4"
      }`}
    >
      {children}
    </div>
  );
}
