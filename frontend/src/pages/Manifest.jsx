import { Link } from "react-router-dom"
import Button from "../components/ui/Button"
import { Sparkles } from "lucide-react"

const Manifest = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
            <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-blush-burgundy text-white p-10 lg:p-16 flex flex-col justify-center">
                    <h2 className="font-heading text-3xl lg:text-4xl font-bold mt-4 leading-tight">
                        A maquiagem é a sua
                        <br />
                        primeira linguagem do dia.
                    </h2>

                    <p className="mt-5 font-body text-sm text-white/70 max-w-sm"> 
                        BLUSH nasceu da vontade de criar produtos que respeitam 
                        a pele e celebram a individualidade. Fórmulas veganas, 
                        pigmentação honesta e design que merece ficar na penteadeira.  
                    </p>

                    <Link className="mt-8">
                        <Button
                            label="Conhecer a coleção"
                            variant="primary"
                        />
                    </Link>
                </div>

                <div className="bg-blush-amber p-10 lg:p-16 flex flex-col justify-center min-h-80">
                    <Sparkles
                        className="lucide lucide-sparkles text-blush-burgundy mb-4"
                    />

                    <h3 className="font-heading text-2xl font-bold text-blush-burgundy"> Petal Points</h3>
                    <p className="mt-3 font-body text-sm text-blush-burgundy/70 max-w-xs"> A cada compra você acumula pétalas. Troque por produtos, descontos exclusivos e acesso antecipado aos drops.</p>
                    <div className="mt-6 flex gap-2">
                        <span className="font-mono text-[10px] tracking-widest bg-blush-burgundy text-white px-3 py-1.5">VEGANO</span>
                        <span className="font-mono text-[10px] tracking-widest bg-blush-burgundy text-white px-3 py-1.5">CRUELTY-FREE</span>
                        <span className="font-mono text-[10px] tracking-widest bg-blush-burgundy text-white px-3 py-1.5">FPS</span>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Manifest