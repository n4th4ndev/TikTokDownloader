import type { Express } from "express";
import { createServer, type Server } from "http";
import { downloadRequestSchema, downloadResponseSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // TikTok video download endpoint
  app.post("/api/download", async (req, res) => {
    try {
      // Validate request body
      const { url, quality, type } = downloadRequestSchema.parse(req.body);

      // Try to get download URL from TikTok downloader service
      const result = await getDownloadUrl(url, quality, type);

      if (result.success) {
        const response = downloadResponseSchema.parse({
          success: true,
          downloadUrl: result.downloadUrl,
          audioUrl: result.audioUrl,
          quality: result.quality,
          type: type,
        });
        res.json(response);
      } else {
        const response = downloadResponseSchema.parse({
          success: false,
          error: "Impossible de traiter cette vidéo. Vérifiez que le lien est correct et que la vidéo est publique.",
        });
        res.json(response);
      }
    } catch (error) {
      console.error("Download error:", error);
      
      if (error instanceof z.ZodError) {
        const response = downloadResponseSchema.parse({
          success: false,
          error: "Lien TikTok invalide. Assurez-vous que l'URL est correcte.",
        });
        res.status(400).json(response);
      } else {
        const response = downloadResponseSchema.parse({
          success: false,
          error: "Erreur interne du serveur. Veuillez réessayer plus tard.",
        });
        res.status(500).json(response);
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function getDownloadUrl(tiktokUrl: string, quality: string, type: string): Promise<{success: boolean, downloadUrl?: string, audioUrl?: string, quality?: string}> {
  try {
    // Try ttdownloader.com first
    const ttdownloaderResult = await tryTTDownloader(tiktokUrl, quality, type);
    if (ttdownloaderResult.success) return ttdownloaderResult;

    // Fallback to snaptik.app
    const snaptikResult = await trySnaptik(tiktokUrl, quality, type);
    if (snaptikResult.success) return snaptikResult;

    return { success: false };
  } catch (error) {
    console.error("Error getting download URL:", error);
    return { success: false };
  }
}

async function tryTTDownloader(tiktokUrl: string, quality: string, type: string): Promise<{success: boolean, downloadUrl?: string, audioUrl?: string, quality?: string}> {
  try {
    const response = await fetch("https://ttdownloader.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: `url=${encodeURIComponent(tiktokUrl)}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    
    if (type === "audio") {
      // Look for audio download links
      const audioMatch = html.match(/href="([^"]*\.mp3[^"]*)"/i) || html.match(/<a[^>]+href="([^"]+)"[^>]*>.*?audio.*?<\/a>/i);
      if (audioMatch && audioMatch[1]) {
        return {
          success: true,
          audioUrl: audioMatch[1],
          quality: "audio"
        };
      }
    } else {
      // Look for video download links based on quality
      let downloadMatch;
      
      if (quality === "4k") {
        downloadMatch = html.match(/href="([^"]*\.mp4[^"]*)"[^>]*.*?(4k|2160p|uhd)/i);
      } else if (quality === "hd") {
        downloadMatch = html.match(/href="([^"]*\.mp4[^"]*)"[^>]*.*?(hd|1080p|high)/i);
      } else if (quality === "sd") {
        downloadMatch = html.match(/href="([^"]*\.mp4[^"]*)"[^>]*.*?(sd|720p|low)/i);
      }
      
      // Fallback to any video link
      if (!downloadMatch) {
        downloadMatch = html.match(/<a[^>]+href="([^"]+)"[^>]*>Download<\/a>/i) || 
                      html.match(/href="([^"]*\.mp4[^"]*)"/i);
      }
      
      if (downloadMatch && downloadMatch[1]) {
        return {
          success: true,
          downloadUrl: downloadMatch[1],
          quality: quality
        };
      }
    }

    return { success: false };
  } catch (error) {
    console.error("TTDownloader error:", error);
    return { success: false };
  }
}

async function trySnaptik(tiktokUrl: string, quality: string, type: string): Promise<{success: boolean, downloadUrl?: string, audioUrl?: string, quality?: string}> {
  try {
    const response = await fetch("https://snaptik.app/abc2.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: `url=${encodeURIComponent(tiktokUrl)}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    
    if (type === "audio") {
      // Look for audio download links
      const audioMatch = html.match(/href="([^"]*\.mp3[^"]*)"/i) || html.match(/<a[^>]+href="([^"]+)"[^>]*>.*?audio.*?<\/a>/i);
      if (audioMatch && audioMatch[1]) {
        return {
          success: true,
          audioUrl: audioMatch[1],
          quality: "audio"
        };
      }
    } else {
      // Look for video download links based on quality
      let downloadMatch;
      
      if (quality === "4k") {
        downloadMatch = html.match(/href="([^"]*\.mp4[^"]*)"[^>]*.*?(4k|2160p|uhd)/i);
      } else if (quality === "hd") {
        downloadMatch = html.match(/href="([^"]*\.mp4[^"]*)"[^>]*.*?(hd|1080p|high)/i);
      } else if (quality === "sd") {
        downloadMatch = html.match(/href="([^"]*\.mp4[^"]*)"[^>]*.*?(sd|720p|low)/i);
      }
      
      // Fallback to any video link
      if (!downloadMatch) {
        downloadMatch = html.match(/<a[^>]+href="([^"]+)"[^>]*download[^>]*>/i) || 
                      html.match(/href="([^"]*\.mp4[^"]*)"/i);
      }
      
      if (downloadMatch && downloadMatch[1]) {
        return {
          success: true,
          downloadUrl: downloadMatch[1],
          quality: quality
        };
      }
    }

    return { success: false };
  } catch (error) {
    console.error("Snaptik error:", error);
    return { success: false };
  }
}
