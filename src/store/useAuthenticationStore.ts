import { authenticationAPI } from '@/apis/authenticationAPI';
import { create } from 'zustand';



export type loginType = {
  username: string;
  password: string;
};

export interface AuthenticationState {
  isAuthenticated: boolean;
  user: string | null;
  login: (user: loginType) => Promise<any>;
  logout: () => void;
  isAuthenticating?: boolean;
  setIsAuthenticating: (isAuthenticating: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}


const useAuthenticationStore = create<AuthenticationState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (user: loginType) => {
    const res = await authenticationAPI.login(user);
    localStorage.setItem('token', res.access);
    set({ isAuthenticated: true, user: user.username });
    return res;
  },
  logout: () => set({ isAuthenticated: false, user: null }),
  isAuthenticating: false,
  setIsAuthenticating: (isAuthenticating) => set({ isAuthenticating }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export default useAuthenticationStore;