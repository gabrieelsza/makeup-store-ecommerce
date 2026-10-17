import { Heart, Store, X } from "lucide-react"
import { Link } from "react-router-dom"
import imageRefence from "../assets/cat-face.jpg"
import Button from "../components/ui/Button"



const YourFavorites = () => {
    return (
        <main className="flex-1">
            <div className="mx-auto max-w-350 px-4 py-12 md:px-8 md:py-16">
                <div className="grid gap-4 border-t border-border pt-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                    <div className="min-w-0">
                        <h2 className="display-xl mt-3 text-4xl md:text-5xl"> Seus favoritos</h2>
                        <p className="mt-3 max-w-xl text-sm text-muted-foreground"> Salvos no seu navegador. Adicione à sacola quando quiser. </p>
                    </div>

                </div>
                
                <div className="mt-12 border border-dashed border-border px-6 py-20 text-center">
                    <Heart className="lucide lucide-heart mx-auto h-7 w-7 text-muted-foreground" />

                    <p className="label-mono mt-4 text-muted-foreground">
                        Nenhum favorito ainda
                    </p>

                    <Link className="inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-flame text-flame-foreground hover:bg-flame/90 h-11 px-6 text-sm rounded-sm mt-8">
                        <p>Descobrir produtos</p>
                    </Link>
                </div>

                <ul className="mt-12 divide-y divide-border border-y border-border">
                    <li className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-4 py-6 sm:grid-cols-[120px_minmax(0,1fr)_auto]">
                        <img src={imageRefence} alt="" className="aspect-4/5 overflow-hidden bg-card" />
                        <div className="min-w-0">
                            <p className="label-mono text-muted-foreground"> Base </p>
                            <h3 className="mt-1 font-display text-lg leading-tight">
                                Velvet Skin Foundation
                            </h3>

                            <div className="flex flex-wrap items-baseline gap-2 font-mono mt-2">
                                <p className="text-sm font-medium"> R$ 149,90</p>
                            </div>
                        </div>

                        <div className="col-span-2 flex flex-wrap gap-2 sm:col-span-1 sm:flex-col">
                            <div>
                                <Button
                                    type="button"
                                    variant="accent"
                                    label="Adicionar"
                                >
                                    <Store />
                                </Button>
                            </div>

                            <div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    label="Remover"
                                >

                                    <X />
                                </Button>
                            </div>

                        </div>
                    </li>
                </ul>
            </div>
        </main >
    )
}

export default YourFavorites