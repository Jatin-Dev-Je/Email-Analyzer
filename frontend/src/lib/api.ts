// API client for backend communication
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';

export interface EmailConfig {
  emailAddress: string;
  subject: string;
}

export interface EmailAnalysis {
  receivingChain: Array<{
    name: string;
    ip?: string;
    timestamp?: string;
    details?: string;
  }>;
  esp: string;
  subject: string;
  from: string;
  to: string;
  receivedAt: string | null;
  rawHeaders?: string;
}

export interface ApiError {
  error: string;
  message?: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async health(): Promise<{ status: string }> {
    return this.request<{ status: string }>('/health')
  }

  async getEmailConfig(): Promise<EmailConfig> {
    return this.request<EmailConfig>('/email/config');
  }

  async getLatestEmail(): Promise<EmailAnalysis> {
    return this.request<EmailAnalysis>('/email/latest');
  }

  async getStats(): Promise<{ avgProcessingMs: number; supportedEsps: number }> {
    return this.request<{ avgProcessingMs: number; supportedEsps: number }>('/stats');
  }
}

// Create a singleton instance
export const apiClient = new ApiClient();

// Factory to create a client with a specific base URL at runtime (used by API routes with cookies)
export function createApiClient(baseUrl?: string) {
  return new ApiClient(baseUrl || API_BASE)
}

// Helper function to check if backend is available
export async function checkBackendHealth(baseUrl?: string): Promise<boolean> {
  try {
  const client = baseUrl ? createApiClient(baseUrl) : apiClient
  await client.health();
    return true;
  } catch (error) {
    console.warn('Backend not available:', error);
    return false;
  }
}

// Fallback data when backend is not available
export const fallbackData = {
  emailConfig: {
    emailAddress: 'test@mailtrace.example',
    subject: 'MailTrace Test — 12345',
  },
  emailAnalysis: {
    receivingChain: [],
    esp: 'Unknown',
    subject: '',
    from: '',
    to: '',
    receivedAt: null,
    rawHeaders: '',
  },
  stats: {
    avgProcessingMs: 1800,
    supportedEsps: 8,
  },
};
