import { z } from "zod";

export const downloadRequestSchema = z.object({
  url: z.string().url("URL invalide").refine(
    (url) => {
      const tiktokRegex = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)/i;
      return tiktokRegex.test(url);
    },
    "Le lien doit être un lien TikTok valide"
  ),
});

export const downloadResponseSchema = z.object({
  success: z.boolean(),
  downloadUrl: z.string().url().optional(),
  error: z.string().optional(),
});

export type DownloadRequest = z.infer<typeof downloadRequestSchema>;
export type DownloadResponse = z.infer<typeof downloadResponseSchema>;
