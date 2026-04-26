import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cleaning Services — PureSofa Cleaning Malta",
  description:
    "Professional sofa, carpet & mattress cleaning in Malta. Deep extraction cleaning with premium Global Clean chemicals. Book via WhatsApp.",
};

const WA_BASE = "https://wa.me/35677994837?text=";

const services = [
  {
    id: "sofa",
    name: "Sofa & Upholstery Cleaning",
    tagline: "Restore your furniture to showroom condition",
    description:
      "Over time, sofas and upholstered furniture accumulate deep seated dirt, allergens, body oils, and bacteria invisible to the naked eye. Our professional hot water extraction method — using Global Clean certified chemistry — lifts contamination from within the fabric pile, not just the surface. Suitable for all fabric types including microfibre, velvet, chenille, linen, and blended materials.",
    benefits: [
      "Deep hot water extraction removes embedded soils, allergens and bacteria",
      "Safe for all fabric types — velvet, microfibre, chenille and delicate blends",
      "Visible results — showroom condition guaranteed",
    ],
    image: "/sofa-cleaning.png",
    waText: "Hi, I'd like to book a Sofa & Upholstery Cleaning service",
    align: "left" as const,
  },
  {
    id: "carpet",
    name: "Carpet Cleaning",
    tagline: "Revive your floors, eliminate hidden dirt",
    description:
      "Carpets trap a surprising volume of fine particulates, dust mites, pet dander, and odour producing bacteria deep in the pile. Our professional extraction systems deliver consistent cleaning power across domestic and commercial spaces of any size. We treat traffic lanes with dedicated Global Clean presprays and rinse to a pH neutral finish, leaving carpets dry faster and resistant to resoiling.",
    benefits: [
      "Professional hot water extraction — far beyond consumer hire machines",
      "Global Clean certified chemistry matched to your carpet type and soil level",
      "Fast drying, minimal disruption — most carpets walkable in 1 to 3 hours",
    ],
    image: "/carpet-cleaning.png",
    waText: "Hi, I'd like to book a Carpet Cleaning service",
    align: "right" as const,
  },
  {
    id: "mattress",
    name: "Mattress Cleaning",
    tagline: "Sleep cleaner, breathe easier",
    description:
      "The average mattress harbours millions of dust mites, accumulated sweat, dead skin cells, and bacteria — contributing to allergies, asthma, and disrupted sleep. Our deep sanitisation process combines hot water extraction with broad spectrum antimicrobial treatments to eliminate pathogens and permanently neutralise odours, leaving your mattress hygienically clean and fresh.",
    benefits: [
      "Removes up to 99% of dust mites, allergens and harmful bacteria",
      "Broad spectrum antimicrobial treatment — ideal for nurseries and allergy sufferers",
      "Permanent odour elimination — enzyme chemistry destroys, not masks",
    ],
    image: "/mattress-cleaning.png",
    waText: "Hi, I'd like to book a Mattress Cleaning service",
    align: "left" as const,
  },
];

const trustPoints = [
  { icon: "malta",    label: "Malta-based team",          sub: "Local, reliable, always reachable" },
  { icon: "chemical", label: "Global Clean chemistry",    sub: "Professional-grade certified products" },
  { icon: "insured",  label: "Fully insured service",     sub: "Your home & furniture protected" },
  { icon: "quote",    label: "Free quotes",               sub: "No obligation, instant via WhatsApp" },
];

function TrustIcon({ type }: { type: string }) {
  const map: Record<string, React.ReactNode> = {
    malta:    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" fill="currentColor" />,
    chemical: <path d="M7 2v2h1v7.27l-4.63 7.27A1 1 0 004.22 20h15.56a1 1 0 00.85-1.46L16 11.27V4h1V2H7zm5 12a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-2-3a1 1 0 110 2 1 1 0 010-2zm5.5.5a1 1 0 110 2 1 1 0 010-2z" fill="currentColor" />,
    insured:  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="currentColor" />,
    quote:    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="currentColor" />,
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">{map[type]}</svg>
  );
}

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
    <circle cx="12" cy="12" r="11" fill="rgba(102,156,173,0.25)" />
    <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#85b3c2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>

        {/* ── Hero banner ── */}
        <section
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0e1e2d 0%, #1a3244 45%, #2a5068 100%)" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#669cad 1px, transparent 1px), linear-gradient(90deg, #669cad 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 80% 50%, rgba(102,156,173,0.18) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <nav className="mb-6 flex items-center gap-2 text-xs text-[#669cad]/60">
              <a href="/" className="hover:text-[#669cad] transition-colors">Home</a>
              <span>/</span>
              <span className="text-[#669cad]">Services</span>
            </nav>
            <div className="max-w-2xl">
              <p className="text-[#669cad] text-sm font-semibold uppercase tracking-widest mb-3">
                Malta — Professional Cleaning
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
                Expert Cleaning,<br />
                <span className="text-[#669cad]">Exceptional Results</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                We use professional Global Clean chemistry and extraction
                equipment to deep clean sofas, carpets, and mattresses across Malta.
                Trusted by homes and businesses for visible, lasting results.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`${WA_BASE}${encodeURIComponent("Hi, I'd like to get a free quote for a cleaning service")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#669cad] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#4f8090] transition-colors text-sm"
                >
                  <WhatsAppIcon />
                  Get a Free Quote
                </a>
                <a
                  href="/#products"
                  className="inline-flex items-center gap-2 border border-[#669cad]/40 text-[#669cad] font-semibold px-6 py-3 rounded-xl hover:border-[#669cad] hover:bg-[#669cad]/10 transition-colors text-sm"
                >
                  Browse Products
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust strip ── */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustPoints.map((tp) => (
                <div key={tp.icon} className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#669cad]/10 flex items-center justify-center text-[#669cad] flex-shrink-0">
                    <TrustIcon type={tp.icon} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{tp.label}</p>
                    <p className="text-xs text-gray-500">{tp.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Service sections ── */}
        {services.map((service, idx) => {
          const textLeft = service.align === "left";
          return (
            <section key={service.id} id={service.id} className="relative min-h-[560px] flex items-center">

              {/* Background photo */}
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={idx === 0}
              />

              {/* Dark gradient overlay — heavier on the text side, fading toward the photo side */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: textLeft
                    ? "linear-gradient(to right, rgba(10,22,34,0.93) 0%, rgba(10,22,34,0.82) 40%, rgba(10,22,34,0.45) 70%, rgba(10,22,34,0.15) 100%)"
                    : "linear-gradient(to left,  rgba(10,22,34,0.93) 0%, rgba(10,22,34,0.82) 40%, rgba(10,22,34,0.45) 70%, rgba(10,22,34,0.15) 100%)",
                }}
              />

              {/* Content */}
              <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className={`max-w-xl ${textLeft ? "" : "ml-auto"}`}>

                  {/* Service number + category */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#669cad] text-xs font-bold uppercase tracking-widest">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-[#669cad]/50" />
                    <span className="text-[#85b3c2] text-xs font-semibold uppercase tracking-widest">
                      Professional Service
                    </span>
                  </div>

                  {/* Heading */}
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3">
                    {service.name}
                  </h2>
                  <p className="text-[#85b3c2] font-semibold text-base mb-5">
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-gray-300 text-base leading-relaxed mb-7">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-3 mb-8">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-gray-200">
                        <CheckIcon />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={`${WA_BASE}${encodeURIComponent(service.waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-[#669cad] text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-[#4f8090] transition-colors text-sm shadow-lg"
                  >
                    <WhatsAppIcon />
                    Book Now
                  </a>
                </div>
              </div>

            </section>
          );
        })}

        {/* ── Bottom CTA banner ── */}
        <section
          className="py-16 md:py-20"
          style={{ background: "linear-gradient(135deg, #0e1e2d 0%, #1a3244 50%, #2a5068 100%)" }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready for a fresher home?
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Message us on WhatsApp for a free, no-obligation quote. We'll assess
              your needs and book a time that suits you — anywhere in Malta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`${WA_BASE}${encodeURIComponent("Hi, I'd like to get a free cleaning quote")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#669cad] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#4f8090] transition-colors text-base shadow-lg"
              >
                <WhatsAppIcon size={18} />
                WhatsApp Us Now
              </a>
              <a
                href="mailto:puresofacleaning@gmail.com"
                className="inline-flex items-center justify-center gap-2 border border-[#669cad]/40 text-[#669cad] font-semibold px-8 py-4 rounded-xl hover:border-[#669cad] hover:bg-[#669cad]/10 transition-colors text-base"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Send an Email
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
