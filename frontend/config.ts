import Constants from 'expo-constants';

export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';

/**
 * Fonction utilitaire pour obtenir l'URL de l'API selon l'environnement
 * Utilise la nouvelle API Constants.expoConfig (Expo SDK 46+)
 */
export const getApiUrl = (): string => {
  if (__DEV__) {
    const expoConfig = Constants.expoConfig;
    if (expoConfig?.hostUri) {
      const host = expoConfig.hostUri.split(':')[0];
      return `http://${host}:3000`;
    }
    return 'http://localhost:3000';
  }
  return BACKEND_URL;
};