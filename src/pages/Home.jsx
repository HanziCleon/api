import { useEffect, useState } from "react";
import { getTrending, searchAnime } from "../services/anilist";
import AnimeCard from "../components/AnimeCard";
import Navbar from "../components/Navbar";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getTrending().then(setItems);
  }, []);

  const handleSearch = async (q) => {
    if (!q) return getTrending().then(setItems);
    const res = await searchAnime(q);
    setItems(res);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar onSearch={handleSearch} />
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {items.map((item) => (
          <AnimeCard key={item.id} item={item} onSelect={(id) => alert("Klik anime " + id)} />
        ))}
      </div>
    </div>
  );
}
