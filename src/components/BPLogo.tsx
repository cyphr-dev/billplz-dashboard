import Image from "next/image";

export default function BPLogo() {
  return (
    <Image
      src="/logo/billplz-logo.svg"
      width={155}
      height={24}
      alt="billplz logo"
      className="h-16 py-2 x-2"
    />
  );
}
