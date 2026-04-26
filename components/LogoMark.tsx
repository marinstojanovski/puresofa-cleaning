/**
 * Inline SVG recreation of the PureSofa Cleaning logo mark.
 * Accepts a `variant` prop: "dark" (original colours) or "light" (all-white for dark backgrounds).
 */
interface LogoMarkProps {
  variant?: "dark" | "light";
  height?: number;
}

export default function LogoMark({ variant = "dark", height = 40 }: LogoMarkProps) {
  const isLight = variant === "light";

  // Colour tokens
  const dropletFill = isLight ? "rgba(255,255,255,0.12)" : "#1a3244";
  const sofaBody    = isLight ? "white" : "white";
  const sofaArm     = isLight ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.88)";
  const sofaSeat    = isLight ? "rgba(255,255,255,0.70)" : "rgba(255,255,255,0.70)";
  const sofaLeg     = isLight ? "rgba(255,255,255,0.50)" : "rgba(255,255,255,0.50)";
  const textPrimary = isLight ? "white" : "#1a3244";
  const textSub     = isLight ? "rgba(255,255,255,0.65)" : "#4a6278";

  // viewBox: 152 × 44. Droplet occupies left ~40px, text fills the rest.
  const vbW = 152;
  const vbH = 44;
  const aspect = vbW / vbH;
  const w = Math.round(height * aspect);

  return (
    <svg
      width={w}
      height={height}
      viewBox={`0 0 ${vbW} ${vbH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PureSofa Cleaning"
    >
      {/* ── Teardrop shell — point at top, circle base ── */}
      <path
        d="M20 1C20 1 4 13 4 25C4 35 11.2 43 20 43C28.8 43 36 35 36 25C36 13 20 1 20 1Z"
        fill={dropletFill}
        stroke={isLight ? "rgba(255,255,255,0.20)" : "none"}
        strokeWidth="0.5"
      />

      {/* ── Sofa backrest ── */}
      <rect x="8"  y="16" width="24" height="8"   rx="2"   fill={sofaBody} />
      {/* ── Left armrest ── */}
      <rect x="6"  y="18" width="5"  height="10"  rx="1.5" fill={sofaArm}  />
      {/* ── Right armrest ── */}
      <rect x="29" y="18" width="5"  height="10"  rx="1.5" fill={sofaArm}  />
      {/* ── Seat cushion ── */}
      <rect x="8"  y="24" width="24" height="5.5" rx="1"   fill={sofaSeat} />
      {/* ── Legs ── */}
      <rect x="10" y="29.5" width="3" height="4" rx="0.6" fill={sofaLeg} />
      <rect x="27" y="29.5" width="3" height="4" rx="0.6" fill={sofaLeg} />

      {/* ── "PureSofa" wordmark ── */}
      <text
        x="46"
        y="28"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="19"
        fontWeight="800"
        fill={textPrimary}
        letterSpacing="-0.3"
      >
        PureSofa
      </text>

      {/* ── "CLEANING" sub-label ── */}
      <text
        x="48"
        y="40"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="8.5"
        fontWeight="600"
        letterSpacing="2.8"
        fill={textSub}
      >
        CLEANING
      </text>
    </svg>
  );
}
