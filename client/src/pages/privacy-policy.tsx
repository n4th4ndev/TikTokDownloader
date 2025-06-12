import { Link } from "wouter";

export default function PrivacyPolicy() {
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
              Politique de confidentialité
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons 
                vos informations personnelles lorsque vous utilisez notre service de téléchargement de vidéos.
              </p>
              <p className="text-gray-700">
                En utilisant notre service, vous acceptez les pratiques décrites dans cette politique.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Informations collectées</h2>
              <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Informations automatiquement collectées</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Adresse IP et informations de connexion</li>
                <li>Type de navigateur et système d'exploitation</li>
                <li>Pages visitées et durée de visite</li>
                <li>Données d'utilisation et statistiques de performance</li>
              </ul>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Informations fournies par l'utilisateur</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>URLs des vidéos que vous souhaitez télécharger</li>
                <li>Informations de contact si vous nous contactez</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Utilisation des informations</h2>
              <p className="text-gray-700 mb-4">Nous utilisons vos informations pour :</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Fournir et améliorer notre service de téléchargement</li>
                <li>Analyser l'utilisation et optimiser les performances</li>
                <li>Répondre à vos questions et demandes de support</li>
                <li>Détecter et prévenir les abus ou utilisations frauduleuses</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Stockage et sécurité</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800">
                  <i className="fas fa-shield-alt mr-2"></i>
                  <strong>Important :</strong> Nous ne stockons aucune vidéo sur nos serveurs. 
                  Les vidéos sont téléchargées directement depuis les serveurs de TikTok.
                </p>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Les URLs soumises ne sont pas conservées après traitement</li>
                <li>Nous utilisons des connexions sécurisées (HTTPS)</li>
                <li>Les logs de serveur sont conservés pour une durée limitée (30 jours maximum)</li>
                <li>Aucune donnée personnelle n'est vendue à des tiers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies et technologies similaires</h2>
              <p className="text-gray-700 mb-4">
                Notre site utilise des cookies techniques nécessaires au fonctionnement du service :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Cookies de session pour maintenir la fonctionnalité</li>
                <li>Cookies de préférences utilisateur (thème, langue)</li>
                <li>Cookies de performance pour améliorer l'expérience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Partage des informations</h2>
              <p className="text-gray-700 mb-4">
                Nous ne vendons, ne louons, ni ne partageons vos informations personnelles, 
                sauf dans les cas suivants :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Avec votre consentement explicite</li>
                <li>Pour se conformer à une obligation légale</li>
                <li>Pour protéger nos droits ou ceux de nos utilisateurs</li>
                <li>Avec des prestataires de services techniques (hébergement, analyse)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Vos droits</h2>
              <p className="text-gray-700 mb-4">
                Conformément au RGPD et aux lois sur la protection des données, vous avez le droit de :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Accéder à vos données personnelles</li>
                <li>Rectifier des données inexactes</li>
                <li>Supprimer vos données dans certaines circonstances</li>
                <li>Limiter le traitement de vos données</li>
                <li>Vous opposer au traitement</li>
                <li>Portabilité de vos données</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Modifications</h2>
              <p className="text-gray-700">
                Nous nous réservons le droit de modifier cette politique de confidentialité. 
                Les modifications seront publiées sur cette page avec une date de mise à jour. 
                Nous vous encourageons à consulter régulièrement cette page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact</h2>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant cette politique de confidentialité ou 
                l'exercice de vos droits, contactez-nous :
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Email :</strong> privacy@videodownloader.com<br />
                  <strong>Adresse :</strong> À définir selon votre localisation<br />
                  <strong>Délégué à la protection des données :</strong> dpo@videodownloader.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}