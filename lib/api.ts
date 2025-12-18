// lib/api.ts

const API_URL = 'http://localhost/auth-api';

// === Types ===
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  user?: T;
}

export interface User {
  id: number;
  name: string;
  email?: string;
}

// lib/api.ts


const fetchOptions = {
  credentials: 'include' as const, // This sends cookies (session)
  headers: {
    'Content-Type': 'application/json',
  },
};

// lib/api.ts

export const register = async (user: RegisterData): Promise<ApiResponse & { status: number }> => {
  const res = await fetch(`${API_URL}/register.php`, {
    method: 'POST',
    ...fetchOptions,
    body: JSON.stringify(user),
  });

  const data = await res.json();
  return { ...data, status: res.status }; // Return status too
};

export const login = async (credentials: LoginData): Promise<ApiResponse<User>> => {
  const res = await fetch(`${API_URL}/login.php`, {
    method: 'POST',
    ...fetchOptions,
    body: JSON.stringify(credentials),
  });
  return res.json();
};

export const logout = async (): Promise<ApiResponse> => {
  const res = await fetch(`${API_URL}/logout.php`, {
    method: 'POST',
    ...fetchOptions,
  });
  return res.json();
};

export const checkAuth = async (): Promise<ApiResponse<User>> => {
  const res = await fetch(`${API_URL}/check-auth.php`, {
    ...fetchOptions,
  });
  return res.json();
};
