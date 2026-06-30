import axios from "axios";
import type { CatImage } from "../types/Post";

const CAT_API_URL = "https://api.thecatapi.com/v1";

const apiClient = axios.create({
  baseURL: CAT_API_URL,
});

// Pide N imágenes de gatos a la API. La consigna pide mínimo 10,
export const fetchCatImages = async (limit: number = 12): Promise<CatImage[]> => {
  const response = await apiClient.get<CatImage[]>("/images/search", {
    params: { limit },
  });

  return response.data;
};