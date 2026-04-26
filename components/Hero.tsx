import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(280px, 33.5vw, 560px)" }}
    >
      {/* Hero image — optimised, fills full width, cropped to centre */}
      <Image
        src="/hero.png"
        alt="PureSofa Cleaning — Professional Upholstery & Carpet Cleaning in Malta"
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-center"
      />

      {/* Hairline edge-vignette — purely cosmetic polish, max 8% darkness */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, transparent 50%, rgba(0,0,0,0.06) 100%)",
        }}
      />

      {/* Bottom dissolve into the white page background */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.55) 55%, #ffffff 100%)",
        }}
      />
    </section>
  );
}
