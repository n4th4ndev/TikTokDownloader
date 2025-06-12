import { Card, CardContent } from "@/components/ui/card";

export default function FeaturesSection() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <Card className="border border-gray-200">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-magic text-blue-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Sans filigrane</h3>
          <p className="text-gray-600 text-sm">
            Téléchargez vos vidéos sans le logo TikTok
          </p>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-200">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-bolt text-green-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Rapide et simple</h3>
          <p className="text-gray-600 text-sm">
            Processus de téléchargement en quelques clics
          </p>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-200">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-shield-alt text-purple-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Sécurisé</h3>
          <p className="text-gray-600 text-sm">
            Aucune donnée stockée sur nos serveurs
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
