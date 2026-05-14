import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const healthAPI = {
  analyzeSymptom: async (symptom: string) => {
    try {
      // Mock API call - replace with actual endpoint
      return {
        symptom,
        severity: 'moderate',
        precautions: [
          'Rest and stay hydrated',
          'Monitor symptoms',
          'Consult doctor if worsens',
        ],
      };
    } catch (error) {
      console.error('Error analyzing symptom:', error);
      throw error;
    }
  },

  getNearbyHospitals: async (lat: number, lng: number) => {
    try {
      // Mock API call - replace with Google Maps API
      // const response = await api.get(`/hospitals?lat=${lat}&lng=${lng}`);
      // return response.data;
      return [];
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      throw error;
    }
  },

  sendEmergencyAlert: async (data: any) => {
    try {
      // Mock API call - replace with actual emergency service endpoint
      console.log('Emergency alert sent:', data);
      return { success: true };
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      throw error;
    }
  },
};

export default api;
