interface SolvexaLogoProps {
  /** "full" = wordmark + motto line (footer/hero), "mark" = wordmark only (navbar) */
  variant?: "full" | "mark";
  /** dark = white text (on dark bg), light = dark text (on white bg) */
  theme?: "dark" | "light";
  className?: string;
}

export function SolvexaLogo({ variant = "mark", theme = "light", className = "" }: SolvexaLogoProps) {
  const textColor = theme === "dark" ? "#ffffff" : "#0f0f0f";
  const mottoColor = theme === "dark" ? "rgba(255,255,255,0.35)" : "#555555";
  const lineColor = theme === "dark" ? "rgba(255,255,255,0.25)" : "#1a35c9";
  const blue = "#1a35c9";

  if (variant === "full") {
    return (
      <svg
        viewBox="0 0 420 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Solvexa"
      >
        {/* ∫ */}
        <text
          x="8"
          y="80"
          fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
          fontStyle="italic"
          fontSize="88"
          fill={textColor}
        >
          ∫
        </text>
        {/* θ in blue */}
        <text
          x="52"
          y="78"
          fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
          fontStyle="italic"
          fontSize="72"
          fill={blue}
        >
          θ
        </text>
        {/* lvexa */}
        <text
          x="95"
          y="78"
          fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
          fontStyle="italic"
          fontSize="72"
          fill={textColor}
        >
          lvexa
        </text>
        {/* motto line */}
        <line x1="8" y1="96" x2="52" y2="96" stroke={lineColor} strokeWidth="1.2" />
        <text
          x="60"
          y="100"
          fontFamily="var(--font-inter), Inter, sans-serif"
          fontSize="11"
          letterSpacing="3"
          fill={mottoColor}
          fontWeight="500"
        >
          LEARN  •  GET UNSTUCK  •  HELP OTHERS
        </text>
        <line x1="368" y1="96" x2="412" y2="96" stroke={lineColor} strokeWidth="1.2" />
      </svg>
    );
  }

  // "mark" — compact wordmark for navbar
  return (
    <svg
      viewBox="0 0 200 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Solvexa"
    >
      {/* ∫ */}
      <text
        x="2"
        y="40"
        fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
        fontStyle="italic"
        fontSize="46"
        fill={textColor}
      >
        ∫
      </text>
      {/* θ in blue */}
      <text
        x="26"
        y="39"
        fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
        fontStyle="italic"
        fontSize="38"
        fill={blue}
      >
        θ
      </text>
      {/* lvexa */}
      <text
        x="50"
        y="39"
        fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
        fontStyle="italic"
        fontSize="38"
        fill={textColor}
      >
        lvexa
      </text>
    </svg>
  );
}
