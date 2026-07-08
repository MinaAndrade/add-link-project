import axios from 'axios';

import { getApiUrl } from './api-url';

export const api = axios.create({
  baseURL: getApiUrl(),
});
