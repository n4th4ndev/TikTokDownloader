import DownloadForm from "@/components/download-form";
import ResultSection from "@/components/result-section";
import FeaturesSection from "@/components/features-section";
import InstructionsSection from "@/components/instructions-section";
import { useState } from "react";
import type { DownloadResponse } from "@shared/schema";

export default function Home() {
  const [result, setResult] = useState<DownloadResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              <i className="fab fa-tiktok text-black mr-3"></i>
              TikTok Downloader
            </h1>
            <p className="text-gray-600 text-lg">
              Téléchargez vos vidéos TikTok préférées sans filigrane
            </p>
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
            Téléchargement simple et rapide
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Collez le lien de votre vidéo TikTok ci-dessous et obtenez un lien de
            téléchargement direct sans filigrane en quelques secondes.
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
              Fait avec amour pour la communauté TikTok
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700 transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="hover:text-gray-700 transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-gray-700 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
