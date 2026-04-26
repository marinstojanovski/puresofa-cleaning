import Image from "next/image";

export interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  category: string;
  code: string;
  imageUrl: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

export default function ProductCard({ product, onOpen }: ProductCardProps) {
  const subject = encodeURIComponent(
    `Enquiry: ${product.name} ${product.size} (${product.code})`
  );
  const mailtoHref = `mailto:puresofacleaning@gmail.com?subject=${subject}`;

  return (
    <article
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
      onClick={() => onOpen(product)}
    >
      {/* Product image */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#669cad/10] to-[#4f8090/10] overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={`${product.name} ${product.size}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#669cad]/30">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect x="20" y="8"  width="24" height="40" rx="4" fill="currentColor" />
              <rect x="22" y="10" width="20" height="6"  rx="2" fill="white" fillOpacity="0.5" />
              <circle cx="32" cy="40" r="4" fill="white" fillOpacity="0.4" />
            </svg>
            <span className="mt-2 text-xs font-medium text-[#669cad]/50">{product.code}</span>
          </div>
        )}
        {/* Size badge */}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-600 px-2 py-0.5 rounded-full shadow-sm border border-gray-100">
          {product.size}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#669cad] mb-1">
            {product.code}
          </p>
          <h3 className="font-bold text-gray-900 text-base leading-snug">
            {product.name}{" "}
            <span className="font-normal text-gray-500 text-sm">{product.size}</span>
          </h3>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <span className="text-2xl font-extrabold text-gray-900">
            €{product.price.toFixed(2)}
          </span>
          {/* Stop propagation so clicking Enquire doesn't also open the modal */}
          <a
            href={mailtoHref}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 bg-[#669cad] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#4f8090] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}
