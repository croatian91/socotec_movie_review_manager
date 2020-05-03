import api from '@/services/api';

const baseUrl = 'http://localhost:8000/api/actors';

export default {
  async fetchActors() {
    return api.get(`${baseUrl}/`);
  }
};
