import Navbar from "@/frontend/modules/landing/components/Navbar";
import Hero from "@/frontend/modules/landing/components/Hero";
import Categories from "@/frontend/modules/landing/components/Categories";
import Collection from "@/frontend/modules/landing/components/Collection";
import About from "@/frontend/modules/landing/components/About";
import Newsletter from "@/frontend/modules/landing/components/Newsletter";
import Footer from "@/frontend/modules/landing/components/Footer";
import ThemeToggle from "@/frontend/components/ThemeToggle";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Categories />
      <Collection />
      <About />
      <Newsletter />
      <Footer />
      <ThemeToggle />
    </main>
  );
}