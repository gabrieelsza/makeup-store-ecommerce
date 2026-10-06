import { Link } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useState } from "react";
import SearchBar from "./SearchBar";
import { useCart } from '../context/CartContext';


function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { toggleCart } = useCart();

    const menu = [
        { id: 1, label: 'Início', path: '/' },
        { id: 2, label: 'Maquiagem', path: '/busca' },
        { id: 3, label: 'Rosto', path: '/busca' },
        { id: 4, label: 'Olhos', path: '/busca?cat=olhos' },
        { id: 5, label: 'Lábios', path: '/busca?cat=labios' },
        { id: 6, label: 'Skincare', path: '/busca?cat=rosto' },
        { id: 7, label: 'Ofertas', path: '/busca?sale=1' },
    ];

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
            <div className="mx-auto grid max-w-350 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 md:px-8">
                <div className="flex items-center gap-2">
                    <button className="lg:hidden text-blush-burgundy" onClick={() => setMobileOpen(true)} aria-label="Menu">
                        <Menu size={22} />
                    </button>
                    <Link to="/" className="flex items-center gap-2">
                        <span className="font-heading text-2xl font-black tracking-tight text-blush-burgundy">BLUSH</span>
                        <span className="hidden sm:block w-2 h-2 rounded-full bg-blush-flame" />
                    </Link>
                </div>

                <nav className="hidden min-w-0 justify-center lg:flex">
                    <ul className="flex items-center gap-7">
                        {menu.map((m) => (
                            <li key={m.id}>
                                <Link to={m.path} className="font-body text-sm text-blush-burgundy/80 hover:text-blush-flame transition-colors">
                                    {m.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-1 sm:gap-2">
                    <button onClick={() => setSearchOpen(!searchOpen)} className="w-full p-2 text-blush-burgundy hover:text-blush-flame" aria-label="Buscar">
                        <Search size={20} />
                    </button>
                    <Link to="/favoritos" className="p-2 text-blush-burgundy hover:text-blush-flame relative" aria-label="Favoritos">
                        <Heart size={20} />
                    </Link>
                    <Link to="/conta" className="p-2 text-blush-burgundy hover:text-blush-flame" aria-label="Conta">
                        <User size={20} />
                    </Link>
                    <button onClick={toggleCart} className="p-2 text-blush-burgundy hover:text-blush-flame relative" aria-label="Carrinho">
                        <ShoppingBag size={20} />
                    </button>
                </div>

                {searchOpen && (
                    <div className="pb-4 animate-fade-up">
                        <SearchBar onClose={() => setSearchOpen(false)} />
                    </div>
                )}
            </div>

            {/* mobile menu */}
            {mobileOpen && (
                <div className="fixed inset-0 z-70 lg:hidden">
                    <div className="absolute inset-0 bg-blush-burgundy/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                    <div className="absolute left-0 top-0 h-full w-72 bg-background shadow-xl animate-slide-in-right" style={{ animationName: 'slide-in-right', animationDirection: 'reverse' }}>
                        <div className="flex items-center justify-between p-5 border-b border-blush-burgundy/10">
                            <span className="font-heading text-xl font-black text-blush-burgundy">BLUSH</span>
                            <button onClick={() => setMobileOpen(false)} className="text-blush-burgundy"><X size={22} /></button>
                        </div>
                        <nav className="flex flex-col p-3">
                            {menu.map((m) => (
                                <Link key={m.label} to={m.path} onClick={() => setMobileOpen(false)}
                                    className="px-4 py-3 font-body text-sm text-blush-burgundy/80 hover:bg-blush-petal/30 border-b border-blush-burgundy/5">
                                    {m.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}


        </header >
    );
}

export default Header;