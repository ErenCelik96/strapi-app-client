import { create } from "zustand";

const url = process.env.NEXT_PUBLIC_STRAPI_URL;

export const authStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    const res = await fetch(`${url}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));
      set({ user: data.user, token: data.jwt });
    } else {
      set({ error: true });
    }
    set({ isLoading: false });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },

  register: async (username: string, email: string, password: string) => {
    set({ isLoading: true });
    const res = await fetch(`${url}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));
      set({ user: data.user, token: data.jwt });
    } else {
      set({ error: true });
    }
    set({ isLoading: false });
  },
  
  getUserFromLocalStorage: () => {
    const user = localStorage.getItem("user");
    if (user) {
      set({ user: JSON.parse(user) });
    }
  }
}));

