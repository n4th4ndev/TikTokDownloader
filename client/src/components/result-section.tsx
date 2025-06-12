import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import type { DownloadResponse } from "@shared/schema";
import { Copy, Download, RotateCcw, CheckCircle, XCircle } from "lucide-react";

interface ResultSectionProps {
  result: DownloadResponse | null;
  onReset: () => void;
}

export default function ResultSection({ result, onReset }: ResultSectionProps) {
  if (!result) return null;

  if (result.success && result.downloadUrl) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fas fa-check text-green-600"></i>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Vidéo prête au téléchargement !
            </h3>
            <p className="text-green-700 mb-4">
              Votre vidéo TikTok sans filigrane est maintenant disponible au
              téléchargement.
            </p>
            <a
              href={result.downloadUrl}
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 space-x-2"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-download"></i>
              <span>Télécharger maintenant</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <i className="fas fa-exclamation-triangle text-red-600"></i>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Erreur lors du téléchargement
          </h3>
          <p className="text-red-700 mb-4">
            {result.error ||
              "Une erreur est survenue lors du traitement de votre demande. Veuillez vérifier le lien et réessayer."}
          </p>
          <Button
            type="button"
            onClick={onReset}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4"
          >
            <i className="fas fa-redo mr-2"></i>
            <span>Réessayer</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
