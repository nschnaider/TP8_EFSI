import type { Post } from "../types/Post";

// Forma del usuario actual (perfil simulado, sin login real)
export interface User {
  username: string;
  fullName: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  totalLikes: number;
  posts: Post[];
}

// Convierte números grandes a formato abreviado (121000 -> "121K")
export const formatNum = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return `${n}`;
};

// Usuario hardcodeado
export const currentUser: User = {
  username: "Nico_09",
  fullName: "Nicolas Schnaider",
  bio: "Aguante los gatos | Buenos Aires, Argentina",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nicolas",
  followers: 121_000,
  following: 348,
  totalLikes: 900_000,
  posts: [],
};