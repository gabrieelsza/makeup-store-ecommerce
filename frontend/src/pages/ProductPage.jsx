import { useSearchParams } from "react-router-dom";
import FavoriteProducts from "../components/FavoriteProducts"
import products from "../data/products"
import { useState } from "react";

const ProductPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedTonalitate, setSelectedTonalitate] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [searchParams] = useSearchParams();

    const category = searchParams.get("cat");
    const sale = searchParams.get("sale");

    const pageContent = {
        maquiagem: {
            title: "Maquiagem",
            description:
                "Da base ao gloss: a coleção inteira, com filtros para chegar rápido no que você procura.",
        },
        rosto: {
            title: "Rosto",
            description:
                "Encontre bases, blushes, corretivos e tudo para realçar sua beleza.",
        },
        olhos: {
            title: "Olhos",
            description:
                "Descubra sombras, máscaras de cílios e produtos para destacar seu olhar.",
        },
        labios: {
            title: "Lábios",
            description:
                "Explore batons, glosses e produtos para deixar seus lábios ainda mais bonitos.",
        },
        skincare: {
            title: "Skincare",
            description:
                "Cuide da sua pele com produtos para sua rotina de cuidados diários.",
        },
        ofertas: {
            title: "Ofertas",
            description:
                "Confira os produtos selecionados com preços especiais para você.",
        },
    };

    const currentPage = sale === "1"
        ? pageContent.ofertas
        : pageContent[category] || pageContent.maquiagem;

    const filterReviews = [
        { id: 1, label: "4 + Estrelas", value: 4 },
        { id: 2, label: "4.5 + Estrelas", value: 4.5 },
        { id: 3, label: "4.8 + Estrelas", value: 4.8 },
    ];

    const filterCategories = [
        {
            id: 1,
            name: "Rosto",
            slug: "rosto",
        },
        {
            id: 2,
            name: "Olhos",
            slug: "olhos",
        },
        {
            id: 3,
            name: "Lábios",
            slug: "labios",
        },
        {
            id: 4,
            name: "Blush",
            slug: "blush",
        },
        {
            id: 5,
            name: "Iluminador",
            slug: "iluminador",
        },
        {
            id: 6,
            name: "Base",
            slug: "base",
        },
        {
            id: 7,
            name: "Corretivo",
            slug: "corretivo",
        },
        {
            id: 8,
            name: "Máscara de cílios",
            slug: "mascara-de-cilios",
        },
        {
            id: 9,
            name: "Batom",
            slug: "batom",
        },
        {
            id: 10,
            name: "Gloss",
            slug: "gloss",
        },
        {
            id: 11,
            name: "Paletas",
            slug: "paletas",
        },
        {
            id: 12,
            name: "Skincare",
            slug: "skincare",
        },
    ];

    const filterTonalities = [
        {
            id: 1,
            name: "Muito clara",
            slug: "muito-clara",
            color: "#F8E1CC",
        },
        {
            id: 2,
            name: "Clara",
            slug: "clara",
            color: "#EBC5A5",
        },
        {
            id: 3,
            name: "Média clara",
            slug: "media-clara",
            color: "#D9A77E",
        },
        {
            id: 4,
            name: "Média",
            slug: "media",
            color: "#C58B60",
        },
        {
            id: 5,
            name: "Média escura",
            slug: "media-escura",
            color: "#A96F49",
        },
        {
            id: 6,
            name: "Escura",
            slug: "escura",
            color: "#805033",
        },
        {
            id: 7,
            name: "Muito escura",
            slug: "muito-escura",
            color: "#4F3023",
        },
    ];

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "" ||
            product.category.toLowerCase() === selectedCategory;

        const matchesTonalitate =
            selectedTonalitate === "" ||
            product.tonalitate === selectedTonalitate;

        const matchesRating =
            selectedRating === 0 ||
            product.rating >= selectedRating;

        return (
            matchesCategory &&
            matchesTonalitate &&
            matchesRating
        );
    });

    const handleCleanFilter = () => {
        setSelectedCategory("");
        setSelectedTonalitate("");
        setSelectedRating(0);
    }

    return (
        <div className="mx-auto max-w-350 px-4 py-12 md:px-8 md:py-16">
            <div className="grid gap-4 border-border pt-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                <div className="min-w-0">
                    <h2 className="display-xl mt-3 text-4xl md:text-5xl">
                        {currentPage.title}
                    </h2>

                    <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                        {currentPage.description}
                    </p>
                </div>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
                <aside className="flex-col gap-6 mt-6 hidden lg:flex">
                    <div className="flex items-center justify-between">
                        <h2 className="font-display text-lg">
                            Filtrar
                        </h2>
                        <button
                            className="label-mono text-flame hover:underline"
                            onClick={handleCleanFilter}
                        >
                            Limpar
                        </button>
                    </div>
                    <div className="border-b border-border pb-6">
                        <h3 className="label-mono">
                            Categoria
                        </h3>
                        <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                                {filterCategories.map((btn) => (
                                    <button
                                        key={btn.id}
                                        type="button"
                                        onClick={() => setSelectedCategory(btn.slug)}
                                        className="label-mono border px-3 py-1.5 transition-colors border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                                    >
                                        {btn.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-border pb-6">
                        <h3 className="label-mono">
                            Avaliação minima
                        </h3>
                        <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                                {filterReviews.map((review) => (
                                    <button
                                        key={review.id}
                                        onClick={() => setSelectedRating(review.value)}
                                        className="label-mono border px-3 py-1.5 transition-colors border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                                    >
                                        {review.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-border pb-6">
                        <h3 className="label-mono">
                            Tonalidade
                        </h3>
                        <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                                {filterTonalities.map((tonali) => (
                                    <button
                                        key={tonali.id}
                                        type="button"
                                        onClick={() => setSelectedTonalitate(tonali.slug)}
                                        className="label-mono border px-3 py-1.5 transition-colors border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                                    >
                                        {tonali.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
                <div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border pb-4">
                        <p className="label-mono truncate text-muted-foreground">
                            14 produtos
                        </p>

                        <div className="flex gap-4 items-center">
                            <span className="label-mono sr-only sm:not-sr-only">
                                Ordernar
                            </span>
                            <select name="" id="" className="h-10 border border-input bg-card px-3 font-mono text-xs focus:border-flame focus:outline-none">
                                <option value="relevancia">Relevância</option>
                                <option value="menor">Menor preço</option>
                                <option value="maior">Maior preço</option>
                                <option value="avaliacao">Melhor avaliação</option>
                            </select>
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
            </div>
        </div>
    )
}

export default ProductPage