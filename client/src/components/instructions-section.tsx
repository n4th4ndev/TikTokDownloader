import { Card, CardContent } from "@/components/ui/card";

export default function InstructionsSection() {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Comment utiliser TikTok Downloader ?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Copiez le lien</h3>
            <p className="text-gray-600 text-sm">
              Copiez l'URL de la vidéo TikTok que vous souhaitez télécharger
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Collez et cliquez</h3>
            <p className="text-gray-600 text-sm">
              Collez le lien dans le champ ci-dessus et cliquez sur "Télécharger"
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Téléchargez</h3>
            <p className="text-gray-600 text-sm">
              Cliquez sur le bouton de téléchargement pour sauvegarder votre vidéo
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
