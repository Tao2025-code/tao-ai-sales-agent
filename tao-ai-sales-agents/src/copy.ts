export const LANGUAGES = ['es', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];

export const copy = {
  es: {
    investorModelView: {
      title: 'Modelo de inversión',
      subtitle: 'Supuestos y rendimientos estimados',
      // agrega más claves aquí después, si hace falta
    },
    investorNarrativeView: {
      title: 'Narrativa de inversión',
      intro: 'Explicación del modelo de inversión de TAO.',
      // agrega más claves aquí después, si hace falta
    },
  },
  en: {
    investorModelView: {
      title: 'Investment model',
      subtitle: 'Assumptions and estimated returns',
    },
    investorNarrativeView: {
      title: 'Investment narrative',
      intro: 'Explanation of TAO’s investment model.',
    },
  },
} as const;
