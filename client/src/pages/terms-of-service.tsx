import { Link } from "wouter";

export default function TermsOfService() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center">
            <Link href="/" className="text-blue-600 hover:text-blue-700 mr-4">
              <i className="fas fa-arrow-left mr-2"></i>
              Retour
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Conditions d'utilisation
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptation des conditions</h2>
              <p className="text-gray-700 mb-4">
                En accédant et en utilisant ce service de téléchargement de vidéos, vous acceptez 
                d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, 
                veuillez ne pas utiliser ce service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description du service</h2>
              <p className="text-gray-700 mb-4">
                Notre service permet de télécharger des vidéos à partir de liens TikTok publics. 
                Le service fonctionne en récupérant les vidéos directement depuis les serveurs de TikTok.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  <strong>Important :</strong> Ce service n'est pas affilié à TikTok Inc. ou ByteDance Ltd.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Utilisation acceptable</h2>
              <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Utilisations autorisées</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Télécharger vos propres vidéos TikTok</li>
                <li>Télécharger des vidéos avec l'autorisation explicite du créateur</li>
                <li>Utilisation à des fins personnelles et non commerciales</li>
                <li>Sauvegarde de contenu pour usage privé</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Utilisations interdites</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Violation des droits d'auteur ou de propriété intellectuelle</li>
                <li>Téléchargement de contenu sans autorisation du créateur</li>
                <li>Redistribution commerciale du contenu téléchargé</li>
                <li>Utilisation automatisée ou par bots</li>
                <li>Contournement des restrictions techniques</li>
                <li>Téléchargement de contenu illégal ou inapproprié</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Responsabilités de l'utilisateur</h2>
              <p className="text-gray-700 mb-4">En utilisant ce service, vous vous engagez à :</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Respecter les droits d'auteur et les conditions d'utilisation de TikTok</li>
                <li>Obtenir les autorisations nécessaires avant de télécharger du contenu</li>
                <li>Ne pas utiliser le service à des fins illégales</li>
                <li>Ne pas surcharger nos serveurs avec des requêtes excessives</li>
                <li>Fournir des informations exactes lorsque demandées</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Propriété intellectuelle</h2>
              <p className="text-gray-700 mb-4">
                Les vidéos téléchargées via notre service restent la propriété de leurs créateurs originaux. 
                Nous ne revendiquons aucun droit sur le contenu téléchargé.
              </p>
              <p className="text-gray-700">
                Notre service et son code source sont protégés par les lois sur la propriété intellectuelle.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation de responsabilité</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  <strong>Clause de non-responsabilité importante</strong>
                </p>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Le service est fourni "en l'état" sans garantie d'aucune sorte</li>
                <li>Nous ne garantissons pas la disponibilité permanente du service</li>
                <li>Nous ne sommes pas responsables des dommages résultant de l'utilisation</li>
                <li>L'utilisateur est seul responsable de l'utilisation du contenu téléchargé</li>
                <li>Nous ne stockons pas les vidéos sur nos serveurs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Modifications du service</h2>
              <p className="text-gray-700 mb-4">
                Nous nous réservons le droit de :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Modifier ou interrompre le service à tout moment</li>
                <li>Limiter l'accès au service pour certains utilisateurs</li>
                <li>Mettre à jour ces conditions d'utilisation</li>
                <li>Supprimer du contenu qui viole nos conditions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Résiliation</h2>
              <p className="text-gray-700 mb-4">
                Nous pouvons suspendre ou résilier votre accès au service en cas de :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Violation de ces conditions d'utilisation</li>
                <li>Utilisation abusive ou frauduleuse</li>
                <li>Activité illégale ou nuisible</li>
                <li>Non-respect des droits d'auteur</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Droit applicable</h2>
              <p className="text-gray-700">
                Ces conditions sont régies par le droit français. Tout litige sera soumis 
                à la compétence exclusive des tribunaux français.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact</h2>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant ces conditions d'utilisation, 
                utilisez notre formulaire de contact disponible sur le site.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Formulaire de contact :</strong> Disponible sur la page Contact<br />
                  <strong>Questions juridiques :</strong> Précisez "Questions légales" dans le sujet<br />
                  <strong>Réponse :</strong> Sous 48h pour les questions urgentes
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}