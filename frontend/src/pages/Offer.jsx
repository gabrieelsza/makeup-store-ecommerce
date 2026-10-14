import FavoriteProducts from "../components/FavoriteProducts";
import products from "../data/products"

const Offer = () => {
    const filteredProducts = products.filter((product) => {
        const filterProductDiscount = product.discount > 0;

        return filterProductDiscount;
    });

    return (
        <div className="mx-auto max-w-350 px-4 py-12 md:px-8 md:py-16">
            <div className="bg-flame px-6 py-12 text-flame-foreground md:px-10">
                <h1 className="display-xl mt-4 text-[clamp(2.5rem,7vw,5rem)]">
                    Preço de estreia
                </h1>
                <p className="mt-4 max-w-lg text-sm text-flame-foreground/90">
                    produtos com desconto direto no carrinho. Use o cupom BLUSH10 para 10% adicionais.
                </p>
            </div>

            <div className="grid gap-4 border-t border-border pt-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                <div className="min-w-0">
                    <p className="label-mono text-flame">
                        Oferta ativas
                    </p>

                    <h2 className="display-xl mt-3 text-4xl md:text-5xl">
                        Em promoção agora
                    </h2>

                    <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                        Estoque limitado por tonalidade.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4 mt-10">
                {filteredProducts.map((favorite) => (
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
        </div>
    )
}

export default Offer