/**
 * Centralized API Client Layer for HackShastra Frontend
 * Connects to Express API at process.env.VITE_API_URL or http://localhost:5000/api
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

export interface EventData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  image?: string;
  location?: string;
  category?: string;
}

export interface BlogData {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`API Request Error [${endpoint}]:`, error);
    return {
      success: false,
      message: 'Network error or backend server unreachable.',
    };
  }
}

export const api = {
  // Events API
  getEvents: () => request<EventData[]>('/events'),
  getEventBySlug: (slug: string) => request<EventData>(`/events/${slug}`),
  registerForEvent: (eventId: string, data: { name: string; email: string; phone?: string; university?: string }) =>
    request(`/events/${eventId}/register`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Email Registration Verification
  verifyRegistration: (token: string) => request(`/registrations/verify/${token}`),

  // Blogs API
  getBlogs: () => request<BlogData[]>('/blogs'),
  getBlogBySlug: (slug: string) => request<BlogData>(`/blogs/${slug}`),

  // Projects API
  getProjects: () => request<ProjectData[]>('/projects'),
  submitProject: (data: { title: string; description: string; techStack: string[]; link?: string }) =>
    request('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Contact API
  submitContact: (data: { name: string; email: string; subject: string; message: string }) =>
    request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Content API (CMS driven content)
  getContent: (key: string) => request<any>(`/content/${key}`),
};

export default api;
