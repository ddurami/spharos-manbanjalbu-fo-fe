import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/contexts/auth-context";

export function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
    </AuthProvider>
  );
}
