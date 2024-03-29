import { create } from "zustand";
import Cookies from "js-cookie";

const url = process.env.NEXT_PUBLIC_STRAPI_URL;
const localUser = JSON.parse(Cookies.get("user") || "{}") || null;

export const authStore = create((set) => ({
  user: localUser,
  token: null,
  isLoading: false,
  error: false,
  message: "",

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
      set({ error: true, message: "Failed to login. Please check your username and password." });
    }
    set({ isLoading: false });
  },

  logout: () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("userId");
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
      set({ error: true, message: "Registration failed. Please check your username and password." });
      }
    set({ isLoading: false });
  },

  getUserFromLocalStorage: () => {
    const user = Cookies.get("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
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
      set({ error: true, message: "Email not found" });
    }
    set({ isLoading: false });
  },

  getIdFromLocalCookie: async () => {
    const jwt = Cookies.get("token");
    if (jwt) {
      let data;
      await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((res) => (data = res.json()))
        .then((data: any) => {
          return data.id;
        });
    } else {
      return;
    }
  },

  deletePost: async (id: string) => {
    const jwt = Cookies.get("token");
    if (jwt) {
      let data;
      await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((res) => (data = res.json()))
        .then((data: any) => {
          window.location.reload();
        });
    } else {
      return;
    }
  },
}));
