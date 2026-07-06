import { StoreShell } from "@/components/layout/StoreShell";

export default function AllProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StoreShell>{children}</StoreShell>;
}
