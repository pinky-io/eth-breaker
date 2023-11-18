import axios from 'axios';
import {HASURA_ENDPOINT, SECRET_HASURA} from '@env';

const api = axios.create({
  headers: {
    'x-hasura-admin-secret': SECRET_HASURA,
  },
  baseURL: HASURA_ENDPOINT,
});

export default api;
