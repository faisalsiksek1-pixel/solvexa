import { cn } from "@/utils/cn";

export function SolvexaAILogo({ className, white = false }: { className?: string; white?: boolean }) {
  const main = white ? "text-white" : "text-slate-900";
  const blue = white ? "text-blue-300" : "text-blue-600";
  const ai = white ? "text-blue-300" : "text-brand-600";
  return (
    <span
      className={cn("select-none leading-none", className)}
      style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}
    >
      <span className={main}>∫</span>
      <span className={blue}>θ</span>
      <span className={main}>lvexa</span>
      <span className={cn("not-italic font-bold ml-1 text-[0.7em] align-middle tracking-wide", ai)}>AI</span>
    </span>
  );
}

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  white?: boolean;
}

export function Logo({ className, white = false }: LogoProps) {
  const textColor = white ? "text-white" : "text-slate-900";
  const blueColor = white ? "text-blue-300" : "text-blue-600";

  return (
    <div className={cn("flex items-center", className)}>
      <span
        className={cn(
          "font-['var(--font-cormorant)'] italic text-[1.6rem] leading-none tracking-tight select-none",
          textColor
        )}
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        ∫
        <span className={blueColor}>θ</span>
        lvexa
      </span>
    </div>
  );
}

export function LogoIcon({ className, white = false }: { className?: string; white?: boolean }) {
  const blueColor = white ? "#93c5fd" : "#2563eb";
  const mainColor = white ? "#ffffff" : "#0f172a";

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text
        x="2"
        y="30"
        fontSize="32"
        fontFamily="serif"
        fontStyle="italic"
        fill={mainColor}
      >
        ∫
      </text>
      <text
        x="16"
        y="28"
        fontSize="18"
        fontFamily="serif"
        fontStyle="italic"
        fill={blueColor}
      >
        θ
      </text>
    </svg>
  );
}

export function LogoWhite({ className }: { className?: string }) {
  return <Logo className={className} white />;
}
