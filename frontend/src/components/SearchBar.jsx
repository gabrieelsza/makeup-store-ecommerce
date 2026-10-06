import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onClose }) {
    const [q, setQ] = useState('');
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        navigate(`/busca?q=${encodeURIComponent(q.trim())}`);
        onClose?.();
    };

    return (
        <form onSubmit={submit} className='flex items-center gap-2'>
            <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blush-burgundy/40" />
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Buscar produtos, categorias..."
                    className="w-full bg-blush-cream/60 border border-blush-burgundy/10 pl-9 pr-3 py-2.5 text-sm font-body text-blush-burgundy placeholder:text-blush-burgundy/40 focus:outline-none focus:border-blush-burgundy/40 transition-colors"
                />
            </div>
            {onClose && (
                <button type="button" onClick={onClose} className="shrink-0 p-2 text-blush-burgundy hover:text-blush-flame">
                    <X size={18} />
                </button>
            )}
        </form>
    );
}