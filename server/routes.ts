import type { Express } from "express";
import { createServer, type Server } from "http";
import { downloadRequestSchema, downloadResponseSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // TikTok video download endpoint
  app.post("/api/download", async (req, res) => {
    try {
      // Validate request body
      const { url } = downloadRequestSchema.parse(req.body);

      // Try to get download URL from TikTok downloader service
      const downloadUrl = await getDownloadUrl(url);

      if (downloadUrl) {
        const response = downloadResponseSchema.parse({
          success: true,
          downloadUrl: downloadUrl,
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

async function getDownloadUrl(tiktokUrl: string): Promise<string | null> {
  try {
    // Try ttdownloader.com first
    const ttdownloaderUrl = await tryTTDownloader(tiktokUrl);
    if (ttdownloaderUrl) return ttdownloaderUrl;

    // Fallback to snaptik.app
    const snaptikUrl = await trySnaptik(tiktokUrl);
    if (snaptikUrl) return snaptikUrl;

    return null;
  } catch (error) {
    console.error("Error getting download URL:", error);
    return null;
  }
}

async function tryTTDownloader(tiktokUrl: string): Promise<string | null> {
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
    
    // Parse HTML to extract download link
    const downloadMatch = html.match(/<a[^>]+href="([^"]+)"[^>]*>Download<\/a>/i);
    if (downloadMatch && downloadMatch[1]) {
      return downloadMatch[1];
    }

    // Alternative pattern matching
    const videoMatch = html.match(/href="([^"]*\.mp4[^"]*)"/i);
    if (videoMatch && videoMatch[1]) {
      return videoMatch[1];
    }

    return null;
  } catch (error) {
    console.error("TTDownloader error:", error);
    return null;
  }
}

async function trySnaptik(tiktokUrl: string): Promise<string | null> {
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
    
    // Parse HTML to extract download link
    const downloadMatch = html.match(/<a[^>]+href="([^"]+)"[^>]*download[^>]*>/i);
    if (downloadMatch && downloadMatch[1]) {
      return downloadMatch[1];
    }

    // Alternative pattern matching
    const videoMatch = html.match(/href="([^"]*\.mp4[^"]*)"/i);
    if (videoMatch && videoMatch[1]) {
      return videoMatch[1];
    }

    return null;
  } catch (error) {
    console.error("Snaptik error:", error);
    return null;
  }
}
