import { Minus, Plus, Trash } from "lucide-react"
import ProductImage from '../../assets/cat-face.jpg'

const CartProduct = () => {
    return (
        <ul className="divide-y divide-border">
            <li className="flex gap-4 py-5">
                <div className="h-24 w-20 shrink-0 overflow-hidden bg-card">
                    <img src={ProductImage} alt="Imagem do produto" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm">
                        Soft Glow Blush
                    </p>
                    <p className="label-mono mt-1 text-muted-foreground">
                        01 Cherry
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex items-center border border-input">
                            <button className="grid h-8 w-8 place-items-center hover:text-flame">
                                <Plus />
                            </button>
                            <span className="w-8 text-center font-mono text-xs">
                                1
                            </span>
                            <button className="grid h-8 w-8 place-items-center hover:text-flame">
                                <Minus />
                            </button>
                        </div>

                        <p className="font-mono text-sm">
                            16,90
                        </p>
                    </div>
                </div>
                <button className="self-start text-muted-foreground hover:text-destructive">
                    <Trash />
                </button>
            </li>
        </ul>
    )
}

export default CartProduct