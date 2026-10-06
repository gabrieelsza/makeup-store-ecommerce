import HeroImage from '../assets/hero-editorial.jpg'
import Button from "../components/ui/Button"

const Hero = () => {
    return (
        <section className="border-b border-border">
            <div className="mx-auto grid max-w-350 items-stretch gap-0 px-0 lg:grid-cols-[1.05fr_1fr]">
                <div className='flex flex-col gap-4 px-4 py-12 md:px-8 lg:py-20'>
                    <h2 className="display-xl mt-10 text-[clamp(3rem,9vw,6.5rem)]"> Cor que <br /> <span className='text-flame'>se contrói </span> <br /> em camadas </h2>
                    <p className='max-w-md text-sm leading-relaxed text-muted-foreground md:text-base'> A coleção 04 da BLUSH nasceu de um editorial: pigmentos translúcidos, acabamentos aveludados e embalagens que você deixa à mostra na penteadeira.</p>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <Button
                            type="button"
                            variant="accent"
                            label="Comprar agora"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            label="Comprar agora"
                        />
                    </div>
                </div>

                <img src={HeroImage} alt="Produtos de qualidade" className='h-full max-h-190 w-full object-cover'/>
            </div>
        </section>
    )
}

export default Hero