
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Simple API client for public endpoints
 */
export const api = {
  /**
   * Generic GET request
   */
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Server error (${response.status}): ${text.substring(0, 200)}`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  /**
   * Generic POST request
   */
  post: async (endpoint, body, isFormData = false) => {
    try {
      const config = {
        method: "POST",
        body: isFormData ? body : JSON.stringify(body),
      };

      if (!isFormData) {
        config.headers = {
          "Content-Type": "application/json",
        };
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Server error (${response.status}): ${text.substring(0, 200)}`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // ================= SPECIFIC ENDPOINTS =================

  /**
   * Get all products (public access)
   */
  getProducts: async () => {
    return api.get("/products/public");
  },

  /**
   * Get single product by ID (public access)
   */
  getProductById: async (productId) => {
    return api.get(`/products/public/${productId}`);
  },

  /**
   * Check registration status
   */
  getRegistrationStatus: async () => {
    return api.get("/config/registration/status");
  },

  /**
   * Create new registration
   */
  createRegistration: async (formData) => {
    return api.post("/registrations", formData, true);
  },

  /**
   * Create payment token
   */
  createPaymentToken: async (paymentData) => {
    return api.post("/payments/token", paymentData);
  },

  /**
   * Update payment status
   */
  updatePaymentStatus: async (statusData) => {
    return api.post("/payments/update-status", statusData);
  },
};
