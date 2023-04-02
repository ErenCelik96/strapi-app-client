export interface NavigationProps {
  isLogin: Boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  imageUri: string;
}

export interface Navbar {
  user: User;
}

export interface Auth {
  user: any;
  token: string;
  isLoading: boolean;
  error: boolean;
  message: string;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (username: string, email: string, password: string) => void;
  getUserFromLocalStorage: () => void;
  forgotPassword: (email: string) => void;
  getIdFromLocalStorage: () => void;
}
