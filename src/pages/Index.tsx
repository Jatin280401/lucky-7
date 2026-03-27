import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MarqueeBar from "@/components/MarqueeBar";
import HeroSection from "@/components/HeroSection";
import ResultsTable from "@/components/ResultsTable";
import TimingSection from "@/components/TimingSection";
import SeoContent from "@/components/SeoContent";
import Footer from "@/components/Footer";
import SocialBanner from "@/components/SocialBanner";
import { useData } from "@/hooks/useData";

const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029VafVyGV1SWsynynlOO0W";
const TELEGRAM_CHANNEL_URL = "https://t.me/a7Resultupdates";

const Index = () => {
  const { cities } = useData();

  const mainCities = cities
    .filter((c) => c.group === "main" && c.id !== "system-date-tracker")
    .sort((a, b) => a.order - b.order);
  const secondaryCities = cities
    .filter((c) => c.group === "secondary" && c.id !== "system-date-tracker")
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <MarqueeBar />
      <HeroSection />

      <div className="w-full bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 py-3 px-4 text-center border-y-[1.5px] border-solid border-red-500 my-1 shadow-sm">
        <a href="/chart/disawer" className="text-blue-700 font-bold uppercase underline text-xs md:text-sm">LUCKY7MATKA DISAWER CHART</a>
        <span className="text-black font-bold uppercase text-xs md:text-sm"> FOR {(new Date()).getFullYear() + 1} IS AVAILABLE</span>
      </div>

      <div className="w-full bg-gradient-to-r from-orange-300 via-yellow-200 to-orange-300 py-3 px-4 text-center border-y-[1.5px] border-solid border-red-500 my-1 shadow-sm">
        <a href="/chart/delhi-bazar" className="text-blue-700 font-bold uppercase underline text-xs md:text-sm">DELHI SATTA RECORD CHART</a>
        <span className="text-black font-bold uppercase text-xs md:text-sm"> AVAILABLE ON LUCKY7MATKA</span>
      </div>

      <div className="w-full bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 py-3 px-4 text-center border-y-[1.5px] border-solid border-red-500 my-1 shadow-sm">
        <span className="text-black font-bold uppercase text-xs md:text-sm">CHECK UPDATED SHREE GANESH SATTA KING CHART </span>
        <a href="/chart/shri-ganesh" className="text-blue-700 font-bold uppercase underline text-xs md:text-sm">HERE</a>
      </div>

      <TimingSection />

      <div className="px-4 py-6">
        <ResultsTable cities={mainCities} />
        <ResultsTable cities={secondaryCities} />
      </div>
      <SeoContent />
      <Footer />
    </div>
  );
};

export default Index;
