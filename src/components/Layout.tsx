import type { ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </>
  );
}
