interface BPHeaderProps {
  title: string;
  rightChildren?: React.ReactNode;
}

export default function BPHeader({ title, rightChildren }: BPHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-2 md:h-16 md:items-center md:flex-row">
      <h3>{title}</h3>
      <div>{rightChildren}</div>
    </div>
  );
}
