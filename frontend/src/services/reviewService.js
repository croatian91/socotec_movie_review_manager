import api from '@/services/api';

const baseUrl = 'http://localhost:8000/api/reviews';

export default {
  async addReview(review) {
    return await api.post(`${baseUrl}/`, review);
  }
};
