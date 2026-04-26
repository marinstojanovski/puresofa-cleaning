import { promises as fs } from "fs";
import path from "path";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";
import { Product } from "@/components/ProductCard";

async function getProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), "public", "products.json");
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProductsSection products={products} />
      <Footer />
    </main>
  );
}
