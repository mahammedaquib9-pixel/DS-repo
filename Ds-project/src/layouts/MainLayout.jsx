import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThreeBackground from "../components/ThreeBackground";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ThreeBackground />
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
