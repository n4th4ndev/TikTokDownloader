import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
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
  const [quality, setQuality] = useState<"auto" | "4k" | "hd" | "sd">("auto");
  const [type, setType] = useState<"video" | "audio">("video");
  const { toast } = useToast();
  const { t } = useLanguage();

  const downloadMutation = useMutation({
    mutationFn: async (data: DownloadRequest) => {
      const response = await apiRequest("POST", "/api/download", data);
      return await response.json();
    },
    onSuccess: (data: DownloadResponse) => {
      onDownloadComplete(data);
      if (data.success) {
        toast({
          title: t("toast.success.title"),
          description: t("toast.success.description"),
        });
      } else {
        toast({
          title: t("toast.error.title"),
          description: data.error || "Une erreur est survenue",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error("Download error:", error);
      onDownloadComplete({
        success: false,
        error: t("toast.error.connection"),
      });
      toast({
        title: t("toast.error.title"),
        description: t("toast.error.connection"),
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      toast({
        title: t("toast.error.title"),
        description: t("toast.error.url"),
        variant: "destructive",
      });
      return;
    }

    const tiktokRegex = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)/i;
    if (!tiktokRegex.test(trimmedUrl)) {
      toast({
        title: t("toast.error.title"),
        description: t("toast.error.invalid"),
        variant: "destructive",
      });
      return;
    }

    onDownloadStart();
    downloadMutation.mutate({ url: trimmedUrl, quality, type });
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
                {t("form.label")}
              </Label>
              <div className="relative">
                <Input
                  type="url"
                  id="tiktokUrl"
                  name="tiktokUrl"
                  placeholder={t("form.placeholder")}
                  value={url}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 ${
                    !isUrlValid() ? "border-red-300" : ""
                  }`}
                  required
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <i className="fas fa-link text-gray-400"></i>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                <i className="fas fa-info-circle mr-1"></i>
                {t("form.info")}
              </p>
            </div>

            {/* Download Type Selection */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="downloadType" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("form.type")}
                </Label>
                <Select value={type} onValueChange={(value: "video" | "audio") => setType(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">
                      <span className="flex items-center">
                        <i className="fas fa-video mr-2 text-blue-600"></i>
                        {t("form.type.video")}
                      </span>
                    </SelectItem>
                    <SelectItem value="audio">
                      <span className="flex items-center">
                        <i className="fas fa-music mr-2 text-green-600"></i>
                        {t("form.type.audio")}
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="videoQuality" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("form.quality")}
                </Label>
                <Select value={quality} onValueChange={(value: "auto" | "4k" | "hd" | "sd") => setQuality(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">
                      <span className="flex items-center">
                        <i className="fas fa-magic mr-2 text-purple-600"></i>
                        {t("form.quality.auto")}
                      </span>
                    </SelectItem>
                    <SelectItem value="4k">
                      <span className="flex items-center">
                        <i className="fas fa-crown mr-2 text-yellow-600"></i>
                        {t("form.quality.4k")}
                      </span>
                    </SelectItem>
                    <SelectItem value="hd">
                      <span className="flex items-center">
                        <i className="fas fa-gem mr-2 text-blue-600"></i>
                        {t("form.quality.hd")}
                      </span>
                    </SelectItem>
                    <SelectItem value="sd">
                      <span className="flex items-center">
                        <i className="fas fa-play mr-2 text-gray-600"></i>
                        {t("form.quality.sd")}
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quality Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <i className="fas fa-info-circle mr-1"></i>
                {type === "audio" 
                  ? "Mode audio : Seul le son de la vidéo sera téléchargé (MP3)"
                  : `Qualité ${quality === "4k" ? "4K Ultra HD" : quality === "hd" ? "HD 1080p" : quality === "sd" ? "SD 720p" : "automatique"} sélectionnée`
                }
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
                    ? t("form.processing")
                    : t("form.button")}
                </span>
                <i
                  className={
                    isLoading || downloadMutation.isPending
                      ? "fas fa-spinner fa-spin"
                      : type === "audio" ? "fas fa-music" : "fas fa-download"
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
            <span className="font-medium">{t("form.loading")}</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            {t("form.loading.description")}
          </p>
        </div>
      )}
    </>
  );
}
