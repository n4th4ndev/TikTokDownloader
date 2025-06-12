import { z } from "zod";
export const downloadRequestSchema = z.object({
    url: z.string().url("URL invalide").refine((url) => {
        const tiktokRegex = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)/i;
        return tiktokRegex.test(url);
    }, "Le lien doit être un lien TikTok valide"),
    quality: z.enum(["auto", "4k", "hd", "sd"]).default("auto"),
    type: z.enum(["video", "audio"]).default("video"),
});
export const downloadResponseSchema = z.object({
    success: z.boolean(),
    downloadUrl: z.string().url().optional(),
    audioUrl: z.string().url().optional(),
    quality: z.string().optional(),
    type: z.enum(["video", "audio"]).optional(),
    error: z.string().optional(),
});
