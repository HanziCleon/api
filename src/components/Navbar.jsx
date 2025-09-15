import { useState } from "react";

export default function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");
  return (
    <header className="bg-gray-900 p-4 flex items-center justify-between">
      <h1 className="text-white font-bold text-xl">Anime Stream</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
        placeholder="Cari anime..."
        className="px-3 py-1 rounded bg-gray-700 text-white"
      />
    </header>
  );
}
