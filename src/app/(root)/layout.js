import React from "react";
import Navbar from "@/components/ui/shared/Navbar";
import Footer from "@/components/ui/shared/Footer";

export default function Authlayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
