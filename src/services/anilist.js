import axios from "axios";
const API_BASE = import.meta.env.VITE_ANILIST_API || "https://api.consumet.org/meta/anilist";

export async function getTrending() {
  const { data } = await axios.get(`${API_BASE}/trending`);
  return data.results;
}

export async function searchAnime(q) {
  const { data } = await axios.get(`${API_BASE}/search/${encodeURIComponent(q)}`);
  return data.results;
}
