import { createContext, useContext, useState, useEffect } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Header
    "header.title": "Video Downloader",
    "header.subtitle": "Téléchargez vos vidéos TikTok préférées sans filigrane",
    
    // Hero Section
    "hero.title": "Téléchargement simple et rapide",
    "hero.description": "Collez le lien de votre vidéo TikTok ci-dessous et obtenez un lien de téléchargement direct sans filigrane en quelques secondes.",
    
    // Form
    "form.label": "Lien de la vidéo TikTok",
    "form.placeholder": "https://www.tiktok.com/@username/video/...",
    "form.info": "Assurez-vous que le lien commence par https://www.tiktok.com/",
    "form.button": "Télécharger",
    "form.processing": "Traitement...",
    "form.loading": "Traitement en cours...",
    "form.loading.description": "Récupération du lien de téléchargement",
    "form.quality": "Qualité vidéo",
    "form.type": "Type de téléchargement",
    "form.type.video": "Vidéo complète",
    "form.type.audio": "Audio uniquement",
    "form.quality.4k": "4K Ultra HD (2160p)",
    "form.quality.hd": "HD (1080p)",
    "form.quality.sd": "SD (720p)",
    "form.quality.auto": "Qualité automatique",
    
    // Results
    "result.success.title": "Vidéo prête au téléchargement !",
    "result.success.description": "Votre vidéo TikTok sans filigrane est maintenant disponible au téléchargement.",
    "result.success.button": "Télécharger maintenant",
    "result.copy": "Copier le lien",
    "result.copied": "Lien copié !",
    "result.error.title": "Erreur lors du téléchargement",
    "result.error.button": "Réessayer",
    
    // Features
    "features.watermark.title": "Sans filigrane",
    "features.watermark.description": "Téléchargez vos vidéos sans le logo TikTok",
    "features.fast.title": "Rapide et simple",
    "features.fast.description": "Processus de téléchargement en quelques clics",
    "features.secure.title": "Sécurisé",
    "features.secure.description": "Aucune donnée stockée sur nos serveurs",
    
    // Instructions
    "instructions.title": "Comment utiliser Video Downloader ?",
    "instructions.step1.title": "Copiez le lien",
    "instructions.step1.description": "Copiez l'URL de la vidéo TikTok que vous souhaitez télécharger",
    "instructions.step2.title": "Collez et cliquez",
    "instructions.step2.description": "Collez le lien dans le champ ci-dessus et cliquez sur \"Télécharger\"",
    "instructions.step3.title": "Téléchargez",
    "instructions.step3.description": "Cliquez sur le bouton de téléchargement pour sauvegarder votre vidéo",
    
    // Footer
    "footer.service": "Service gratuit de téléchargement de vidéos",
    "footer.disclaimer.title": "Avertissement légal :",
    "footer.disclaimer.1": "• Ce site n'est pas affilié à TikTok Inc. ou ByteDance Ltd.",
    "footer.disclaimer.2": "• Nous n'hébergeons aucune vidéo sur nos serveurs",
    "footer.disclaimer.3": "• Le service utilise des API tierces pour le téléchargement",
    "footer.disclaimer.4": "• Respectez les droits d'auteur et les conditions d'utilisation de TikTok",
    "footer.disclaimer.5": "• Utilisez ce service uniquement pour vos propres vidéos ou avec autorisation",
    "footer.terms": "Conditions d'utilisation",
    "footer.privacy": "Politique de confidentialité",
    "footer.contact": "Contact",
    
    // Navigation
    "nav.back": "Retour",
    
    // Toasts
    "toast.success.title": "Succès",
    "toast.success.description": "Vidéo prête au téléchargement !",
    "toast.error.title": "Erreur",
    "toast.error.url": "Veuillez entrer un lien TikTok valide.",
    "toast.error.invalid": "Le lien fourni ne semble pas être un lien TikTok valide.",
    "toast.error.connection": "Erreur de connexion. Veuillez réessayer plus tard.",
    
    // Language
    "language.french": "Français",
    "language.english": "English",
  },
  en: {
    // Header
    "header.title": "Video Downloader",
    "header.subtitle": "Download your favorite TikTok videos without watermark",
    
    // Hero Section
    "hero.title": "Simple and fast download",
    "hero.description": "Paste your TikTok video link below and get a direct download link without watermark in seconds.",
    
    // Form
    "form.label": "TikTok video link",
    "form.placeholder": "https://www.tiktok.com/@username/video/...",
    "form.info": "Make sure the link starts with https://www.tiktok.com/",
    "form.button": "Download",
    "form.processing": "Processing...",
    "form.loading": "Processing...",
    "form.loading.description": "Retrieving download link",
    "form.quality": "Video quality",
    "form.type": "Download type",
    "form.type.video": "Full video",
    "form.type.audio": "Audio only",
    "form.quality.4k": "4K Ultra HD (2160p)",
    "form.quality.hd": "HD (1080p)",
    "form.quality.sd": "SD (720p)",
    "form.quality.auto": "Auto quality",
    
    // Results
    "result.success.title": "Video ready for download!",
    "result.success.description": "Your TikTok video without watermark is now available for download.",
    "result.success.button": "Download now",
    "result.copy": "Copy link",
    "result.copied": "Link copied!",
    "result.error.title": "Download error",
    "result.error.button": "Try again",
    
    // Features
    "features.watermark.title": "No watermark",
    "features.watermark.description": "Download your videos without TikTok logo",
    "features.fast.title": "Fast and simple",
    "features.fast.description": "Download process in just a few clicks",
    "features.secure.title": "Secure",
    "features.secure.description": "No data stored on our servers",
    
    // Instructions
    "instructions.title": "How to use Video Downloader?",
    "instructions.step1.title": "Copy the link",
    "instructions.step1.description": "Copy the URL of the TikTok video you want to download",
    "instructions.step2.title": "Paste and click",
    "instructions.step2.description": "Paste the link in the field above and click \"Download\"",
    "instructions.step3.title": "Download",
    "instructions.step3.description": "Click the download button to save your video",
    
    // Footer
    "footer.service": "Free video download service",
    "footer.disclaimer.title": "Legal disclaimer:",
    "footer.disclaimer.1": "• This site is not affiliated with TikTok Inc. or ByteDance Ltd.",
    "footer.disclaimer.2": "• We do not host any videos on our servers",
    "footer.disclaimer.3": "• The service uses third-party APIs for downloading",
    "footer.disclaimer.4": "• Respect copyright and TikTok's terms of service",
    "footer.disclaimer.5": "• Use this service only for your own videos or with permission",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.contact": "Contact",
    
    // Navigation
    "nav.back": "Back",
    
    // Toasts
    "toast.success.title": "Success",
    "toast.success.description": "Video ready for download!",
    "toast.error.title": "Error",
    "toast.error.url": "Please enter a valid TikTok link.",
    "toast.error.invalid": "The provided link doesn't seem to be a valid TikTok link.",
    "toast.error.connection": "Connection error. Please try again later.",
    
    // Language
    "language.french": "Français",
    "language.english": "English",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const detectLanguage = async () => {
      // Check for saved preference first
      const saved = localStorage.getItem("language");
      if (saved === "en" || saved === "fr") {
        setLanguage(saved);
        setIsDetecting(false);
        return;
      }

      try {
        // Try to detect location via IP geolocation
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // French-speaking countries
        const frenchCountries = ['FR', 'BE', 'CH', 'CA', 'LU', 'MC', 'CI', 'SN', 'ML', 'BF', 'NE', 'TD', 'CF', 'CG', 'GA', 'CM', 'DJ', 'KM', 'MG', 'SC', 'VU', 'NC', 'PF'];
        
        if (data.country_code && frenchCountries.includes(data.country_code)) {
          setLanguage("fr");
        } else {
          // Fallback to browser language detection
          const browserLang = navigator.language.toLowerCase();
          if (browserLang.startsWith("fr")) {
            setLanguage("fr");
          } else {
            setLanguage("en");
          }
        }
      } catch (error) {
        // Fallback to browser language if geolocation fails
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("fr")) {
          setLanguage("fr");
        } else {
          setLanguage("en");
        }
      }
      
      setIsDetecting(false);
    };

    detectLanguage();
  }, []);

  useEffect(() => {
    if (!isDetecting) {
      localStorage.setItem("language", language);
      document.documentElement.lang = language;
      
      // Update page title and meta description for SEO
      const title = language === "fr" 
        ? "Video Downloader - Téléchargeur de vidéos TikTok sans filigrane"
        : "Video Downloader - Download TikTok videos without watermark";
      
      const description = language === "fr"
        ? "Téléchargez vos vidéos TikTok préférées sans filigrane gratuitement. Service rapide et sécurisé pour sauvegarder vos contenus TikTok favoris."
        : "Download your favorite TikTok videos without watermark for free. Fast and secure service to save your favorite TikTok content.";
      
      document.title = title;
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
      
      // Update Open Graph tags
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', title);
      }
      
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', description);
      }
    }
  }, [language, isDetecting]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}