import DownloadForm from "@/components/download-form";
import ResultSection from "@/components/result-section";
import FeaturesSection from "@/components/features-section";
import InstructionsSection from "@/components/instructions-section";
import LanguageSwitcher from "@/components/language-switcher";
import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/language-context";
import type { DownloadResponse } from "@shared/schema";

export default function Home() {
  const [result, setResult] = useState<DownloadResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleDownloadComplete = (response: DownloadResponse) => {
    setResult(response);
    setIsLoading(false);
  };

  const handleDownloadStart = () => {
    setIsLoading(true);
    setResult(null);
  };

  const handleReset = () => {
    setResult(null);
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                <i className="fas fa-video text-blue-600 mr-3"></i>
                {t("header.title")}
              </h1>
              <p className="text-gray-600 text-lg">
                {t("header.subtitle")}
              </p>
            </div>
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <i className="fas fa-download text-blue-600 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t("hero.title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("hero.description")}
          </p>
        </div>

        {/* Download Form */}
        <DownloadForm
          onDownloadStart={handleDownloadStart}
          onDownloadComplete={handleDownloadComplete}
          isLoading={isLoading}
        />

        {/* Result Section */}
        <ResultSection result={result} onReset={handleReset} />

        {/* Features */}
        <FeaturesSection />

        {/* Instructions */}
        <InstructionsSection />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              <i className="fas fa-heart text-red-500 mr-1"></i>
              {t("footer.service")}
            </p>
            
            {/* Disclaimer légal */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-sm text-gray-600">
              <p className="mb-2">
                <i className="fas fa-info-circle text-gray-500 mr-1"></i>
                <strong>{t("footer.disclaimer.title")}</strong>
              </p>
              <ul className="text-left space-y-1 max-w-2xl mx-auto">
                <li>{t("footer.disclaimer.1")}</li>
                <li>{t("footer.disclaimer.2")}</li>
                <li>{t("footer.disclaimer.3")}</li>
                <li>{t("footer.disclaimer.4")}</li>
                <li>{t("footer.disclaimer.5")}</li>
              </ul>
            </div>
            
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <Link href="/terms-of-service" className="hover:text-gray-700 transition-colors">
                {t("footer.terms")}
              </Link>
              <Link href="/privacy-policy" className="hover:text-gray-700 transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link href="/contact" className="hover:text-gray-700 transition-colors">
                {t("footer.contact")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
