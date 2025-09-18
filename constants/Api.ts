import Constants from 'expo-constants';

type Extra = { apiBaseUrl?: string } | undefined;

const extra = (Constants.expoConfig?.extra as Extra) ?? undefined;
const baseUrlFromExtra = extra?.apiBaseUrl;

const API_BASE_URL = (baseUrlFromExtra || 'http://localhost:3001').replace(/\/$/, '');

export const REQUESTS_ENDPOINT = `${API_BASE_URL}/api/requests`;
export const HEALTH_ENDPOINT = `${API_BASE_URL}/api/health`;

export default {
  baseUrl: API_BASE_URL,
  requests: REQUESTS_ENDPOINT,
  health: HEALTH_ENDPOINT,
};
