import FavoriteProducts from "../components/FavoriteProducts"
import products from "../data/products"

export const FavoriteProductPage = () => {
    return (
        <section className="mx-auto max-w-350 px-4 pb-16 md:px-8 md:pb-24">
            <div className="min-w-0">
                <h2 className="display-xl mt-3 text-4xl md:text-5xl"> Favoritos da semana </h2>
                <p className="mt-3 max-w-xl text-sm text-muted-foreground.">
                    Os oito produtos mais adicionados à sacola nos últimos sete dias.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4 mt-10">
                {products.map((favorite) => (
                    <FavoriteProducts
                        key={favorite.id}
                        code={favorite.code}
                        category={favorite.category}
                        name={favorite.name}
                        image={favorite.image}
                        rating={favorite.rating}
                        reviews={favorite.reviews}
                        price={favorite.price}
                        oldPrice={favorite.oldPrice}
                        discount={favorite.discount}
                    />
                ))}
            </div>
        </section>
    )
}
