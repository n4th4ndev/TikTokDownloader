import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { DownloadRequest, DownloadResponse } from "@shared/schema";

interface DownloadFormProps {
  onDownloadStart: () => void;
  onDownloadComplete: (response: DownloadResponse) => void;
  isLoading: boolean;
}

export default function DownloadForm({
  onDownloadStart,
  onDownloadComplete,
  isLoading,
}: DownloadFormProps) {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const downloadMutation = useMutation({
    mutationFn: async (data: DownloadRequest) => {
      const response = await apiRequest("POST", "/api/download", data);
      return await response.json();
    },
    onSuccess: (data: DownloadResponse) => {
      onDownloadComplete(data);
      if (data.success) {
        toast({
          title: "Succès",
          description: "Vidéo prête au téléchargement !",
        });
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Une erreur est survenue",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error("Download error:", error);
      onDownloadComplete({
        success: false,
        error: "Erreur de connexion. Veuillez réessayer plus tard.",
      });
      toast({
        title: "Erreur",
        description: "Erreur de connexion. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un lien TikTok valide.",
        variant: "destructive",
      });
      return;
    }

    const tiktokRegex = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)/i;
    if (!tiktokRegex.test(trimmedUrl)) {
      toast({
        title: "Erreur",
        description: "Le lien fourni ne semble pas être un lien TikTok valide.",
        variant: "destructive",
      });
      return;
    }

    onDownloadStart();
    downloadMutation.mutate({ url: trimmedUrl });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
  };

  const isUrlValid = () => {
    if (!url.trim()) return true;
    const tiktokRegex = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)/i;
    return tiktokRegex.test(url.trim());
  };

  return (
    <>
      <Card className="shadow-lg border border-gray-200 mb-8">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Input */}
            <div>
              <Label htmlFor="tiktokUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Lien de la vidéo TikTok
              </Label>
              <div className="relative">
                <Input
                  type="url"
                  id="tiktokUrl"
                  name="tiktokUrl"
                  placeholder="https://www.tiktok.com/@username/video/..."
                  value={url}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 ${
                    !isUrlValid() ? "border-red-300" : ""
                  }`}
                  required
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <i className="fab fa-tiktok text-gray-400"></i>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                <i className="fas fa-info-circle mr-1"></i>
                Assurez-vous que le lien commence par https://www.tiktok.com/
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 transition-colors duration-200"
              disabled={isLoading || downloadMutation.isPending}
            >
              <span className="flex items-center justify-center space-x-2">
                <span>
                  {isLoading || downloadMutation.isPending
                    ? "Traitement..."
                    : "Télécharger la vidéo"}
                </span>
                <i
                  className={
                    isLoading || downloadMutation.isPending
                      ? "fas fa-spinner fa-spin"
                      : "fas fa-arrow-right"
                  }
                ></i>
              </span>
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Loading State */}
      {(isLoading || downloadMutation.isPending) && (
        <div className="mt-6 text-center mb-8">
          <div className="inline-flex items-center space-x-3 text-blue-600">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="font-medium">Traitement en cours...</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Récupération du lien de téléchargement
          </p>
        </div>
      )}
    </>
  );
}
