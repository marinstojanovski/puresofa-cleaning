"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Product } from "./ProductCard";
import { getProductSpecs, ProductSpecs } from "@/lib/productSpecs";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const SPEC_LABELS: [keyof ProductSpecs, string][] = [
  ["character",   "Character"],
  ["dilution",    "Dilution ratio"],
  ["ph",          "pH level"],
  ["miscibility", "Miscibility"],
  ["maxTemp",     "Max temperature"],
  ["packaging",   "Packaging"],
  ["producer",    "Producer"],
];

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!product) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [product, handleKeyDown]);

  if (!product) return null;

  const specs = getProductSpecs(product.code);

  const emailSubject = encodeURIComponent(
    `Enquiry: ${product.name} ${product.size} (${product.code})`
  );
  const whatsappText = encodeURIComponent(
    `Hi, I'm interested in ${product.name} ${product.size} (${product.code}). Could you give me more information?`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X size={16} />
        </button>

        {/* ── Two-column layout: image | details ── */}
        <div className="flex flex-col sm:flex-row">

          {/* Left — product image */}
          <div className="relative sm:w-72 flex-shrink-0 bg-gradient-to-br from-[#669cad]/10 to-[#4f8090]/10 sm:rounded-l-2xl overflow-hidden min-h-[240px]">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={`${product.name} ${product.size}`}
                fill
                sizes="(max-width: 640px) 100vw, 288px"
                className="object-contain p-6"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#669cad]/25">
                <svg width="72" height="72" viewBox="0 0 64 64" fill="none">
                  <rect x="20" y="8"  width="24" height="40" rx="4" fill="currentColor" />
                  <rect x="22" y="10" width="20" height="6"  rx="2" fill="white" fillOpacity="0.5" />
                  <circle cx="32" cy="40" r="4" fill="white" fillOpacity="0.4" />
                </svg>
                <span className="mt-2 text-xs font-medium text-[#669cad]/40">{product.code}</span>
              </div>
            )}
          </div>

          {/* Right — details */}
          <div className="flex flex-col flex-1 p-6 gap-5 min-w-0">

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#669cad] bg-sky-50 px-2 py-1 rounded-md">
                {product.code}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                {product.category}
              </span>
            </div>

            {/* Name + size */}
            <div className="flex items-start gap-3">
              <h2 className="text-xl font-extrabold text-gray-900 leading-snug flex-1">
                {product.name}
              </h2>
              <span className="flex-shrink-0 mt-0.5 bg-[#669cad]/10 text-[#4f8090] text-xs font-bold px-2.5 py-1 rounded-full border border-[#669cad]/20">
                {product.size}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications table */}
            {specs && (
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Specifications
                </h3>
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {SPEC_LABELS.map(([key, label], i) => (
                      <tr
                        key={key}
                        className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="py-2 px-3 font-semibold text-gray-500 w-2/5 rounded-l-md whitespace-nowrap">
                          {label}
                        </td>
                        <td className="py-2 px-3 text-gray-800 rounded-r-md">
                          {key === "packaging" ? product.size : (specs as unknown as Record<string, string>)[key]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-gray-900">
                €{product.price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400 font-medium">incl. VAT</span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:puresofacleaning@gmail.com?subject=${emailSubject}`}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#669cad] text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-[#4f8090] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Enquire via Email
              </a>

              <a
                href={`https://wa.me/35677994837?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#669cad] text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-[#4f8090] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
