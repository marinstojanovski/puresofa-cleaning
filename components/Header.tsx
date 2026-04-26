"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isServices = pathname === "/services";

  const navLink = (label: string, href: string) => (
    <a
      href={href}
      className={`text-sm font-medium transition-colors ${
        (label === "Services" && isServices)
          ? "text-[#669cad]"
          : "text-gray-600 hover:text-[#669cad]"
      }`}
    >
      {label}
    </a>
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <div className="relative w-[110px] h-[40px] overflow-hidden flex-shrink-0">
            <Image
              src="/logo.png"
              alt="PureSofa Cleaning"
              fill
              sizes="110px"
              className="object-cover object-left-top"
              priority
            />
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLink("Services", "/services")}
          {navLink("Products", "/#products")}
          {navLink("Contact", "/#contact")}
          <a
            href="https://wa.me/35677994837"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#669cad] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#4f8090] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-[#669cad]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4">
          <a
            href="/services"
            className="text-sm font-medium text-gray-700 hover:text-[#669cad]"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </a>
          <a
            href="/#products"
            className="text-sm font-medium text-gray-700 hover:text-[#669cad]"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </a>
          <a
            href="/#contact"
            className="text-sm font-medium text-gray-700 hover:text-[#669cad]"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
          <a
            href="https://wa.me/35677994837"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#669cad] text-white text-sm font-semibold px-4 py-2 rounded-lg w-fit"
          >
            WhatsApp Us
          </a>
        </div>
      )}
    </header>
  );
}
