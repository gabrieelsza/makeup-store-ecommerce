import { X } from "lucide-react"
import CartProduct from "./ui/CartProduct"
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

const Cart = () => {
    const { isOpen, closeCart } = useCart();

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e) => e.key === 'Escape' && closeCart();
        document.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, closeCart]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">

            <aside className='absolute right-0 top-0 flex h-full w-full max-w-md translate-x-0 flex-col border-l border-border bg-background shadow-xl duration-300 animate-in slide-in-from-right'>
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <span className="label-mono">
                        Sua sacola
                    </span>

                    <button className="grid h-9 w-9 place-items-center hover:text-flame">
                        <X />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5">
                    <CartProduct />
                    <CartProduct />
                    <CartProduct />
                    <CartProduct />
                </div>

                <div className="border-t border-border px-5 py-5">
                    <div className="flex items-baseline justify-between">
                        <span className="label-mono"> Subtotal </span>
                        <span className="font-mono text-lg"> R$ 69,90</span>
                    </div>

                    <div className="mt-4 grid gap-2">
                        <p className="inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-flame text-flame-foreground hover:bg-flame/90 h-14 px-8 text-sm tracking-wide rounded-sm w-full"> Finalizar compra </p>
                        <p className="inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground h-11 px-6 text-sm rounded-sm w-full"> Ver sacola completa </p>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Cart