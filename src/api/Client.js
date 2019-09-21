import { API_URL } from 'react-native-dotenv';
import { create } from 'apisauce';

const client = create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export function request(method, path, params = {}, headers = {}) {
  return client[method](path, params, {
    headers,
  }).then(response => {
    if (response.ok) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  });
}
