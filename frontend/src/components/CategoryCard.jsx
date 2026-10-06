import { ArrowUpRight } from "lucide-react";

export default function CategoryCard({number, slug, image, name, posicao}) {
    const backgroundsColor = ["bg-petal", "bg-amber", "bg-card", "bg-flame text-flame-foreground"]; 

    const fundo = backgroundsColor[posicao % backgroundsColor.length]; 

    return (
        <div className={`group relative flex flex-col justify-between overflow-hidden p-4 transition-transform duration-300 hover:-translate-y-1 ${fundo}`}>
            <div className="flex items-start justify-between">
                <span className="label-mono"> {number} - {slug} </span>
                <ArrowUpRight 
                    className="h-4 w-4 opacity-40 transition-opacity group-hover:opacity-100"
                />
            </div>

            <div className="mt-6 aspect-square overflow-hidden">
                <img src={image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
            </div>

            <h3 className="mt-4 font-display text-lg leading-none">
                {name}
            </h3>
        </div>
    )
}