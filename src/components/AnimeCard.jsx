export default function AnimeCard({ item, onSelect }) {
  return (
    <div
      className="bg-gray-800 rounded p-2 cursor-pointer hover:scale-105 transition"
      onClick={() => onSelect(item.id)}
    >
      <img src={item.image} alt={item.title.romaji} className="rounded mb-2" />
      <p className="text-white text-sm">{item.title.romaji}</p>
    </div>
  );
}
