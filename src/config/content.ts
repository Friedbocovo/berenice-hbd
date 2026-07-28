// ============================================================================
//  CONFIGURATION CENTRALE — Modifiez ici tous les textes, photos, musique.
// ============================================================================

export const config = {
  // --- Identité ---
  prenom: 'Bérénice',
  prenomAccent: 'Bérénice ✨',

  // --- Message d'accueil ---
  accroche: "Une petite surprise t'attend...",

  // --- Musique ---
  // Remplacez par votre fichier audio (mp3/ogg) placé dans /public/audio/
  musique: {
    src: '/audio/musique.mp3',
    titre: 'Pour toi',
    volume: 0.45,
  },

  // --- Lettre personnelle ---
  lettre: {
    titre: 'Une lettre pour toi',
    paragraphes: [
      "Aujourd'hui est un jour un peu spécial, parce qu'il célèbre une personne qui l'est tout autant.",
      "Je voulais profiter de cette occasion pour te dire merci. Merci pour ta présence, pour les moments partagés, pour les fous rires, les discussions, les souvenirs et tous ces petits moments qui, avec le temps, deviennent de belles histoires à raconter.",
      "Tu es une personne unique, avec ta façon d'être, ton sourire, ton énergie et cette petite touche qui fait que tu es simplement… toi. Et je pense que c'est justement ça qui te rend aussi spéciale.",
      "En ce jour particulier, je te souhaite de toujours garder cette belle lumière qui est en toi. Je te souhaite de réaliser tes rêves, de rencontrer les bonnes personnes, de connaître encore plus de bonheur et de vivre des moments dont tu te souviendras longtemps.",
      "Que cette nouvelle année de ta vie t'apporte de belles surprises, de nouvelles aventures, beaucoup de réussite et surtout, des raisons de sourire chaque jour.",
      "Profite pleinement de cette journée, parce qu'elle est la tienne. 🎂✨",
      "Et surtout, n'oublie jamais une chose :",
      "Tu es une personne formidable, et je suis vraiment heureux(se) d'avoir eu la chance de te connaître. ❤️",
      "Alors aujourd'hui, je te souhaite tout simplement…",
      "Un très joyeux anniversaire ! 🎉🥳❤️",
      "Avec toute mon affection,",
      "[Fried]",
    ],
  },

  // --- Galerie ---
  galerie: {
    titre: 'Nos plus beaux instants',
    sousTit: 'Chaque image raconte un souvenir',
    // Photos locales depuis /public
    photos: [
      { src: '/b1.jpeg', legende: 'Sous le soleil', date: 'Été 2023' },
      { src: '/b2.jpeg', legende: 'En mode ...', date: 'Soirée' },
      { src: '/b3.jpeg', legende: 'Manequin', date: 'Studio' },
      { src: '/b4.jpeg', legende: 'After Party', date: 'Night' },
      { src: '/b5.jpeg', legende: 'Douc..', date: 'Moment doux' },
      { src: '/b6.jpeg', legende: 'Miss Bérénice', date: 'Cadeau' },
      { src: '/b7.jpeg', legende: 'After Party', date: 'Événement' },
      { src: '/b8.jpeg', legende: 'Azimavi', date: 'Aventure' },
      { src: '/b9.jpeg', legende: 'Évasion', date: 'Automne' },
    ],
  },

  // --- Ton année à venir ---
  annee: {
    titre: 'Ton année à venir',
    sousTit: 'Une nouvelle année commence pour toi... et voici quelques petites prédictions. ✨',
    cartes: [
      { emoji: '❤️', titre: 'Une année de bonheur', texte: 'Je te souhaite une année remplie de petits et grands moments de bonheur, de sourires sincères et de souvenirs qui te feront sourire encore longtemps.' },
      { emoji: '🚀', titre: 'Une année de réussite', texte: "Que cette nouvelle année t'apporte de belles opportunités et te permette d'avancer encore plus près de tes rêves et de tes objectifs." },
      { emoji: '🌍', titre: 'De nouvelles aventures', texte: "De nouveaux endroits, de nouvelles expériences et plein de moments inattendus qui deviendront peut-être tes meilleurs souvenirs." },
      { emoji: '🤝', titre: 'De belles personnes', texte: "Que tu continues à rencontrer des personnes qui t'apportent de la bonne humeur, de belles énergies et de beaux moments." },
      { emoji: '✨', titre: 'Des surprises', texte: "Parce que la vie aime parfois nous surprendre, je te souhaite une année pleine de belles surprises que tu n'avais pas prévues." },
      { emoji: '🌟', titre: 'Des rêves qui deviennent réalité', texte: "Que cette nouvelle année soit celle où certains de tes rêves commencent enfin à prendre vie." },
    ],
  },

  // --- Cadeaux ---
  cadeaux: {
    titre: 'Ouvre tes cadeaux',
    sousTit: "J'ai quelques petites surprises pour toi... Mais tu vas devoir les ouvrir une par une. 😏✨",
    messageFini: '🎉 Tu as ouvert tous tes cadeaux !',
    messageSuite: "Mais... il reste encore une dernière surprise. 👀",
    boutonSuite: 'Découvrir la suite →',
    items: [
      { titre: 'Pour commencer...', contenu: 'Tu es une personne vraiment spéciale, et tu as beaucoup plus de qualités que tu ne le penses. ✨' },
      { titre: "Parce qu'un anniversaire sans rire, ce n'est pas un anniversaire. 😂", contenu: "Pourquoi les anniversaires sont-ils toujours si fatigants ? Parce qu'on passe une soirée à souffler ses bougies au lieu de souffler son stress ! 🎂💨" },
      { titre: 'Un petit souvenir 📸', photo: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800', contenu: 'Un instant figé pour toujours. 🌸' },
      { titre: 'Un petit mot pour toi 💌', contenu: 'Continue de sourire, de profiter de la vie et de rester exactement comme tu es. Les meilleures choses sont encore à venir. ✨' },
      { titre: '🎁 Celui-ci est spécial...', special: true, contenu: 'Tu pensais vraiment que c\'était terminé ? 😏', bouton: 'Continuer la surprise ✨' },
    ],
  },

  // --- Qualités ---
  qualites: {
    titre: 'Tout ce qui te rend exceptionnelle',
    sousTit: 'Une liste bien trop courte',
    cartes: [
      { emoji: '❤️', titre: 'Gentille', texte: 'Ton cœur est plus grand que tu ne le crois.' },
      { emoji: '🌸', titre: 'Bienveillante', texte: 'Tu fais pousser les gens autour de toi.' },
      { emoji: '😊', titre: 'Souriante', texte: 'Ton sourire change la journée de tout le monde.' },
      { emoji: '💪', titre: 'Courageuse', texte: 'Tu affrontes la tempête avec grâce.' },
      { emoji: '😂', titre: 'Drôle', texte: 'Avec toi, on rit à chaque instant.' },
      { emoji: '✨', titre: 'Inspirante', texte: 'Tu donnes envie de devenir meilleur.' },
    ],
  },

  // --- Souvenirs / anecdotes ---
  souvenirs: {
    titre: 'Nos anecdotes préférées',
    sousTit: 'Les petites histoires qui restent',
    items: [
      { titre: 'La nuit où on a raté le train', texte: "On a marché une heure sous la pluie, et c'est devenu l'un de nos meilleurs souvenirs.", emoji: '🌧️' },
      { titre: 'Le gâteau raté', texte: "Tu voulais impressionner tout le monde. Le gâteau a fondu. On a ri toute la soirée.", emoji: '🎂' },
      { titre: 'La danse improvisée', texte: "Au milieu de la rue, sur une musique de magasin. Personne ne nous regardait, et tout le monde nous regardait.", emoji: '💃' },
    ],
  },

  // --- Compteur / statistiques ---
  stats: {
    titre: 'En chiffres (mais surtout en émotions)',
    items: [
      { valeur: 1000, suffixe: '+', label: 'Sourires distribués' },
      { valeur: 0, suffixe: '∞', label: 'Moments de bonheur', infini: true },
      { valeur: 365, suffixe: '', label: "Jours d'amitié" },
      { valeur: 48, suffixe: '', label: 'Rires mémorables' },
    ],
  },

  // --- Citation ---
  citation: {
    texte: "L'amitié double les joies et divise les peines.",
    auteur: 'Proverbe',
  },

  // --- Vidéo surprise ---
  video: {
    titre: 'Une petite vidéo pour toi',
    sousTit: 'Clique pour la découvrir',
    // Remplacez par votre vidéo (mp4) dans /public/video/ ou un lien YouTube
    src: '',
    poster: 'https://images.pexels.com/photos/2873268/pexels-photo-2873268.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },

  // --- Quiz ---
  quiz: {
    titre: 'Un petit quiz pour le fun',
    questions: [
      {
        q: 'Quel est mon souvenir préféré avec toi ?',
        options: ['Notre voyage improvisé', 'Le gâteau raté', 'La danse en rue', 'Tout, en vrai'],
        reponse: 3,
      },
      {
        q: 'Quelle est ta plus grande qualité ?',
        options: ['Ton rire', 'Ta gentillesse', 'Ton courage', 'Toutes les précédentes'],
        reponse: 3,
      },
      {
        q: "Que je te souhaite aujourd'hui ?",
        options: ['Du bonheur', 'De la santé', 'Toute la joie du monde', 'Encore plus de rires'],
        reponse: 2,
      },
    ],
  },

  // --- Gâteau ---
  gateau: {
    titre: 'Souffle les bougies',
    sousTit: 'Fais un vœu... et clique pour souffler',
    nbBougies: 5,
  },

  // --- Livre d'or ---
  livreOr: {
    titre: "Livre d'or",
    sousTit: 'Laisse un mot pour elle',
  },

  // --- Finale ---
  finale: {
    titre: 'Joyeux anniversaire',
    sousTit: "Merci d'avoir parcouru cette petite aventure.",
    footer: 'Créé avec ❤️ spécialement pour toi.',
  },
} as const

export type AppConfig = typeof config
