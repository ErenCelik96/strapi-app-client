import { create } from "zustand";
import Cookies from "js-cookie";

const url = process.env.NEXT_PUBLIC_STRAPI_URL;
const localUser = JSON.parse(Cookies.get("user") || "{}") || null;

export const authStore = create((set) => ({
  user: localUser || null,
  token: null,
  isLoading: false,
  error: false,
  message: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    const res = await fetch(`${url}auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    });
    const data = await res?.json();
    if (res.ok) {
      Cookies.set("token", data.jwt);
      Cookies.set("user", JSON.stringify(data.user));
      Cookies.set("userId", data.user.id);
      set({ user: data.user, token: data.jwt });
    } else {
      set({ error: true });
    }
    set({ isLoading: false });
  },

  logout: () => {
    Cookies.remove("token");
    Cookies.remove("user");
    set({ user: null, token: null });
    window.location.href = "/";
  },

  register: async (username: string, email: string, password: string) => {
    set({ isLoading: true });
    const res = await fetch(`${url}auth/local/register`, {
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
      Cookies.set("token", data.jwt);
      Cookies.set("user", JSON.stringify(data.user));
      Cookies.set("userId", data.user.id);
      set({ user: data.user, token: data.jwt });
      window.location.href = "/";
    } else {
      set({ error: true });
    }
    set({ isLoading: false });
  },

  getUserFromLocalStorage: () => {
    const user = Cookies.get("user");
    if (user) {
      set({ user: JSON.parse(user) });
    }
  },

  forgotPassword: async (email: string) => {
    set({ isLoading: true });
    const res = await fetch(`${url}auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    if (res.ok) {
      set({ message: "Check your email" });
    } else {
      set({ error: true });
    }
    set({ isLoading: false });
  },

  getIdFromLocalCookie: () => {
    const jwt = Cookies.get("token");
  if (jwt) {
    return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }).then((data:any) => {
      return data.id;
    });
  } else {
    return;
  }
  },
}));
