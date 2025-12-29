class API {
  static color1 = '#239244'; // Main Dark Green
  static color2 = '#e8f5f0'; // Light Mint Background
  static color3 = '#F1F3F3'; // Light Gray Background
  static baseURL = 'http://localhost:5000';

  // Helper function to get full image URL
  static getImageUrl(imagePath) {
    if (!imagePath) return null;
    
    // If it's already a full URL (http/https), return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it starts with /, append to baseURL
    if (imagePath.startsWith('/')) {
      return `${this.baseURL}${imagePath}`;
    }
    
    // Otherwise, assume it's a relative path from uploads
    return `${this.baseURL}/uploads/${imagePath}`;
  }

  // Helper function to get auth headers
  static getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Enhanced fetch with retry logic and better error handling
  static async fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            ...this.getAuthHeaders(),
            ...options.headers
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return { success: true, data };
      } catch (error) {
        console.error(`Fetch attempt ${i + 1} failed:`, error);
        
        // Don't retry on auth errors (401, 403)
        if (error.message.includes('401') || error.message.includes('403')) {
          return { success: false, error: 'Authentication failed' };
        }

        // If this is the last retry, return the error
        if (i === retries - 1) {
          return { success: false, error: error.message };
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }

  // GET request
  static async get(endpoint) {
    return this.fetchWithRetry(`${this.baseURL}${endpoint}`, {
      method: 'GET'
    });
  }

  // POST request
  static async post(endpoint, data) {
    return this.fetchWithRetry(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT request
  static async put(endpoint, data) {
    return this.fetchWithRetry(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE request
  static async delete(endpoint) {
    return this.fetchWithRetry(`${this.baseURL}${endpoint}`, {
      method: 'DELETE'
    });
  }
}

export default API;