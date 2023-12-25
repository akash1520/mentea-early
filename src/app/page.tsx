import Features from "@/app/components/Features/Features";
import Footer from "@/app/components/Footer/Footer";
import Hero from "@/app/components/Hero";
import Internship from "@/app/components/Internship/Internship";
import Navbar from "@/app/components/Navbar/Navbar";
import Testimonials from "@/app/components/Testimonials";
import FAQ from "./components/FAQ/FAQ";
import Mentor from "@/app/components/Mentor";
import Mentee from "@/app/components/Mentee";
import React from "react";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Internship />
      <Mentee />
      <Mentor />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
