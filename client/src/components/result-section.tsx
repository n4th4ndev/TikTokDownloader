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
  const { t } = useLanguage();
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: t("result.copied"),
        description: t("toast.copy.description"),
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadFile = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Download failed:', err);
      // Fallback to direct link
      window.open(url, '_blank');
    }
  };

  if (!result) return null;

  if (result.success && (result.downloadUrl || result.audioUrl)) {
    const downloadLink = result.downloadUrl || result.audioUrl || '';
    const isVideo = !!result.downloadUrl;
    const isAudio = !!result.audioUrl;
    const filename = isVideo ? 'tiktok-video.mp4' : 'tiktok-audio.mp3';
    
    return (
      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-8">
        <div className="space-y-4">
          {/* Success Header */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                {t("result.success.title")}
              </h3>
              <p className="text-green-700 dark:text-green-300">
                {t("result.success.description")}
              </p>
            </div>
          </div>

          {/* Preview Section */}
          {isVideo && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-700">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t("result.preview.video")}</h4>
              <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '9/16', maxHeight: '300px' }}>
                <video
                  src={downloadLink}
                  controls
                  preload="metadata"
                  className="w-full h-full object-contain"
                  style={{ maxHeight: '300px' }}
                >
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
              </div>
            </div>
          )}

          {isAudio && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-700">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t("result.preview.audio")}</h4>
              <audio
                src={downloadLink}
                controls
                preload="metadata"
                className="w-full"
              >
                Votre navigateur ne supporte pas la lecture audio.
              </audio>
            </div>
          )}

          {/* Download Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => downloadFile(downloadLink, filename)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              {t("result.success.button")}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => copyToClipboard(downloadLink)}
              className="border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900"
            >
              <Copy className="w-4 h-4 mr-2" />
              {t("result.copy")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
            {t("result.error.title")}
          </h3>
          <p className="text-red-700 dark:text-red-300 mb-4">
            {result.error ||
              "Une erreur est survenue lors du traitement de votre demande. Veuillez vérifier le lien et réessayer."}
          </p>
          <Button
            type="button"
            onClick={onReset}
            className="bg-red-600 hover:bg-red-700 text-white font-medium"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            <span>{t("result.error.button")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
