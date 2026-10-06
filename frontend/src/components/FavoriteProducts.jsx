import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const FavoriteProducts = ({ id,
    code,
    category,
    name,
    image,
    rating,
    reviews,
    price,
    oldPrice,
    discount }) => {

    const ratingTotal = Number(rating) || 0;

    return (
        <article className="group relative flex flex-col">
            <div className="relative overflow-hidden bg-card">
                <Link>
                    <img src={image} alt="" className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]" />
                </Link>

                <span className="label-mono absolute left-3 top-3 bg-background/90 px-2 py-1"> {code} </span>
                <button className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-primary transition-colors hover:bg-petal">
                    <Heart
                        className="lucide lucide-heart h-4 w-4 transition-all"
                    />
                </button>
            </div>

            <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 ease-out group-hover:translate-y-0 md:block">


            </div>

            <div className="flex flex-1 flex-col gap-1.5 pt-3">
                <span className="label-mono text-muted-foreground">
                    {category}
                </span>

                <Link className="hover:text-flame">
                    <h3 className="font-display text-base leading-tight">
                        {name}
                    </h3>
                </Link>

                <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: ratingTotal }, (_, index) => (
                            <Star
                                key={index}
                                className="h-4 w-4 fill-flame text-flame"
                            />
                        ))}
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground">
                        {reviews}
                    </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-2 font-mono mt-auto pt-1">
                    <p className="text-sm font-medium"> R$ {price.toFixed(2)}</p>
                    {oldPrice && (
                        <p className="text-[11px] text-muted-foreground line-through">
                            R$ {oldPrice.toFixed(2)}
                        </p>
                    )}
                    {discount > 0 && (
                        <p className="label-mono bg-flame px-1.5 py-0.5 text-flame-foreground">
                            -{discount}%
                        </p>
                    )}
                </div>
            </div>
        </article>
    )
}

export default FavoriteProducts