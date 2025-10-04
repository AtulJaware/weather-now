import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  loading: boolean;
}

export function SearchBar({ value, onChange, onSearch, loading }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative group">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for any city..."
          disabled={loading}
          className="w-full px-6 py-5 pl-16 text-lg rounded-2xl border-2 border-white/30 bg-white/95 backdrop-blur-md shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/60 focus:border-white/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-3xl font-medium"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </div>
    </form>
  );
}
