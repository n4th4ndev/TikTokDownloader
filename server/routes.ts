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
          error: "Services de téléchargement temporairement indisponibles. Les plateformes comme TikTok changent fréquemment leurs protections. Veuillez réessayer dans quelques minutes ou utiliser un lien de test avec 'demo' dans l'URL.",
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
  const services = [
    { name: 'TTDownloader', fn: tryTTDownloader },
    { name: 'Snaptik', fn: trySnaptik },
    { name: 'SSSTik', fn: trySSSTik },
    { name: 'TikMate', fn: tryTikMate },
  ];

  for (const service of services) {
    try {
      console.log(`Trying ${service.name}...`);
      const result = await service.fn(tiktokUrl, quality, type);
      if (result.success) {
        console.log(`Success with ${service.name}`);
        return result;
      }
    } catch (error) {
      console.error(`${service.name} failed:`, error);
      continue;
    }
  }

  return { success: false };
}

async function tryTTDownloader(tiktokUrl: string, quality: string, type: string): Promise<{success: boolean, downloadUrl?: string, audioUrl?: string, quality?: string}> {
  try {
    const formData = new URLSearchParams();
    formData.append('url', tiktokUrl);
    
    const response = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.code === 0 && data.data) {
      if (type === "audio" && data.data.music) {
        return {
          success: true,
          audioUrl: data.data.music,
          quality: "audio"
        };
      } else if (type === "video" && data.data.play) {
        let videoUrl = data.data.play;
        
        // Try to get HD version if available
        if (quality === "hd" && data.data.hdplay) {
          videoUrl = data.data.hdplay;
        }
        
        return {
          success: true,
          downloadUrl: videoUrl,
          quality: quality
        };
      }
    }

    return { success: false };
  } catch (error) {
    console.error("TikWM API error:", error);
    return { success: false };
  }
}

async function trySnaptik(tiktokUrl: string, quality: string, type: string): Promise<{success: boolean, downloadUrl?: string, audioUrl?: string, quality?: string}> {
  try {
    const response = await fetch("https://api.tiklydown.eu.org/api/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: JSON.stringify({ url: tiktokUrl }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === "success" && data.result) {
      if (type === "audio" && data.result.audio) {
        return {
          success: true,
          audioUrl: data.result.audio,
          quality: "audio"
        };
      } else if (type === "video") {
        let videoUrl = data.result.video;
        
        // Try different quality options if available
        if (quality === "hd" && data.result.video_hd) {
          videoUrl = data.result.video_hd;
        } else if (quality === "4k" && data.result.video_4k) {
          videoUrl = data.result.video_4k;
        }
        
        return {
          success: true,
          downloadUrl: videoUrl,
          quality: quality
        };
      }
    }

    return { success: false };
  } catch (error) {
    console.error("TiklyDown API error:", error);
    return { success: false };
  }
}

async function trySSSTik(tiktokUrl: string, quality: string, type: string): Promise<{success: boolean, downloadUrl?: string, audioUrl?: string, quality?: string}> {
  try {
    const response = await fetch("https://api.cobalt.tools/api/json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: JSON.stringify({
        url: tiktokUrl,
        vQuality: quality === "4k" ? "max" : quality === "hd" ? "720" : "480",
        vFormat: "mp4",
        isAudioOnly: type === "audio",
        aFormat: "mp3"
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === "success" || data.status === "stream") {
      if (type === "audio" && data.url) {
        return {
          success: true,
          audioUrl: data.url,
          quality: "audio"
        };
      } else if (type === "video" && data.url) {
        return {
          success: true,
          downloadUrl: data.url,
          quality: quality
        };
      }
    }

    return { success: false };
  } catch (error) {
    console.error("Cobalt Tools API error:", error);
    return { success: false };
  }
}

async function tryTikMate(tiktokUrl: string, quality: string, type: string): Promise<{success: boolean, downloadUrl?: string, audioUrl?: string, quality?: string}> {
  try {
    const response = await fetch("https://api.savepin.app/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: JSON.stringify({ 
        url: tiktokUrl,
        type: type === "audio" ? "audio" : "video",
        quality: quality
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      if (type === "audio" && data.data.audio_url) {
        return {
          success: true,
          audioUrl: data.data.audio_url,
          quality: "audio"
        };
      } else if (type === "video" && data.data.video_url) {
        return {
          success: true,
          downloadUrl: data.data.video_url,
          quality: quality
        };
      }
    }

    return { success: false };
  } catch (error) {
    console.error("SavePin API error:", error);
    return { success: false };
  }
}
