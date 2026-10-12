import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Heart, Minus, Plus, ShoppingBag, Star, Truck } from "lucide-react"
import products from "../data/products"
import productDetails from "../data/productDetails"
import { useCart } from "../context/CartContext"

const formatPrice = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

const TABS = [
    { id: "description", label: "Descrição" },
    { id: "benefits", label: "Benefícios" },
    { id: "howToUse", label: "Modo de uso" },
    { id: "ingredients", label: "Ingredientes" },
]

const primaryButton =
    "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-sm bg-flame px-8 text-sm font-medium tracking-wide text-flame-foreground transition-all duration-200 hover:bg-flame/90 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const outlineButton =
    "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-sm border border-primary/40 px-8 text-sm font-medium tracking-wide text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"


const ProductDetail = () => {
    const { slug } = useParams()
    const baseProduct = products.find((item) => item.slug === slug)

    if (!baseProduct) {
        return (
            <main className="mx-auto max-w-350 px-4 py-24 text-center md:px-8">
                <p className="label-mono text-muted-foreground">404</p>
                <h1 className="display-xl mt-3 text-4xl md:text-5xl">
                    Produto não encontrado
                </h1>
                <Link
                    to="/busca"
                    className="mt-8 inline-block text-sm underline underline-offset-4 hover:text-flame"
                >
                    Ver todos os produtos
                </Link>
            </main>
        )
    }

    const product = { ...baseProduct, ...productDetails[slug] }

    return <ProductView key={slug} product={product} />
}

const ProductView = ({ product }) => {
    const { openCart } = useCart()

    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedShade, setSelectedShade] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)
    const [activeTab, setActiveTab] = useState("description")

    const gallery = product.gallery?.length ? product.gallery : [product.image]
    const shades = product.shades ?? []
    const currentShade = shades[selectedShade]
    const filledStars = Math.round(Number(product.rating) || 0)

    const handleAddToCart = () => {
        openCart()
    }

    const tabContent = {
        description: <p>{product.description}</p>,
        benefits: (
            <ul className="list-disc space-y-1 pl-5">
                {product.benefits?.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                ))}
            </ul>
        ),
        howToUse: <p>{product.howToUse}</p>,
        ingredients: <p>{product.ingredients}</p>,
    }

    return (
        <main className="mx-auto max-w-350 px-4 py-8 md:px-8 md:py-12">
            <nav
                aria-label="Breadcrumb"
                className="label-mono flex flex-wrap items-center gap-2 text-muted-foreground"
            >
                <Link to="/" className="hover:text-flame">
                    Início
                </Link>
                <span>/</span>
                <Link to="/busca" className="hover:text-flame">
                    {product.category}
                </Link>
                <span>/</span>
                <span className="text-primary">{product.name}</span>
            </nav>

            <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
                <section
                    aria-label="Fotos do produto"
                    className="flex flex-col-reverse gap-3 md:flex-row"
                >
                    <div className="flex gap-3 md:flex-col">
                        {gallery.map((src, index) => (
                            <button
                                key={src}
                                type="button"
                                onClick={() => setSelectedImage(index)}
                                aria-label={`Ver foto ${index + 1}`}
                                aria-current={selectedImage === index}
                                className={`h-18 w-18 shrink-0 overflow-hidden border-2 bg-card transition-colors ${
                                    selectedImage === index
                                        ? "border-flame"
                                        : "border-transparent hover:border-primary/30"
                                }`}
                            >
                                <img
                                    src={src}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>

                    <div className="aspect-[4/5] flex-1 overflow-hidden bg-card">
                        <img
                            src={gallery[selectedImage]}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </section>

                <section className="flex flex-col">
                    <div className="flex items-center gap-3">
                        <span className="label-mono bg-petal px-2 py-1 text-petal-foreground">
                            {product.category}
                        </span>
                        <span className="label-mono text-muted-foreground">
                            {product.code}
                        </span>
                    </div>

                    <h1 className="display-xl mt-4 text-4xl md:text-5xl">
                        {product.name}
                    </h1>

                    <div className="mt-4 flex items-center gap-2">
                        <div
                            className="flex items-center gap-0.5"
                            aria-label={`Avaliação ${product.rating} de 5`}
                        >
                            {Array.from({ length: 5 }, (_, index) => (
                                <Star
                                    key={index}
                                    className={`h-3.5 w-3.5 ${
                                        index < filledStars
                                            ? "fill-flame text-flame"
                                            : "text-muted-foreground/40"
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">
                            {product.rating} ({product.reviews})
                        </span>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3 font-mono">
                        <p className="text-3xl font-medium">
                            {formatPrice(product.price)}
                        </p>
                        {product.oldPrice && (
                            <p className="text-xs text-muted-foreground line-through">
                                {formatPrice(product.oldPrice)}
                            </p>
                        )}
                        {product.discount > 0 && (
                            <p className="label-mono bg-flame px-1.5 py-0.5 text-flame-foreground">
                                -{product.discount}%
                            </p>
                        )}
                    </div>

                    <p className="mt-5 text-sm text-muted-foreground">
                        {product.shortDescription}
                    </p>

                    {shades.length > 0 && (
                        <div className="mt-8">
                            <div className="flex items-center justify-between">
                                <span className="label-mono">Tonalidades</span>
                                <span className="label-mono text-muted-foreground">
                                    {currentShade.code} {currentShade.name}
                                </span>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-4">
                                {shades.map((shade, index) => (
                                    <button
                                        key={shade.code}
                                        type="button"
                                        onClick={() => setSelectedShade(index)}
                                        aria-label={`Tonalidade ${shade.code} ${shade.name}`}
                                        aria-pressed={selectedShade === index}
                                        className="group flex flex-col items-center gap-1.5"
                                    >
                                        <span
                                            className={`grid h-9 w-9 place-items-center rounded-full border-2 transition-colors ${
                                                selectedShade === index
                                                    ? "border-flame"
                                                    : "border-transparent group-hover:border-primary/30"
                                            }`}
                                        >
                                            <span
                                                className="h-6 w-6 rounded-full border border-border"
                                                style={{ backgroundColor: shade.hex }}
                                            />
                                        </span>
                                        <span className="label-mono text-[10px] text-muted-foreground">
                                            {shade.code}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex items-center gap-3">
                        <div className="flex h-12 items-center border border-input">
                            <button
                                type="button"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                disabled={quantity === 1}
                                aria-label="Diminuir quantidade"
                                className="grid h-12 w-12 place-items-center hover:text-flame disabled:opacity-40 disabled:hover:text-inherit"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span
                                className="w-10 text-center font-mono text-sm"
                                aria-live="polite"
                            >
                                {quantity}
                            </span>
                            <button
                                type="button"
                                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                                disabled={quantity === 10}
                                aria-label="Aumentar quantidade"
                                className="grid h-12 w-12 place-items-center hover:text-flame disabled:opacity-40 disabled:hover:text-inherit"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsFavorite((prev) => !prev)}
                            aria-label={
                                isFavorite
                                    ? "Remover dos favoritos"
                                    : "Adicionar aos favoritos"
                            }
                            aria-pressed={isFavorite}
                            className="grid h-12 w-12 place-items-center border border-input text-primary transition-colors hover:text-flame"
                        >
                            <Heart
                                className={`h-4 w-4 ${
                                    isFavorite ? "fill-flame text-flame" : ""
                                }`}
                            />
                        </button>
                    </div>

                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className={primaryButton}
                        >
                            <ShoppingBag className="h-4 w-4" />
                            Adicionar à sacola
                        </button>
                        <button type="button" className={outlineButton}>
                            Comprar agora
                        </button>
                    </div>

                    <p className="label-mono rule-hairline mt-8 flex items-center gap-2 pt-6 text-muted-foreground">
                        <Truck className="h-4 w-4" />
                        Frete grátis acima de R$199 · Troca em 30 dias
                    </p>

                    <div className="mt-8">
                        <div
                            role="tablist"
                            className="flex flex-wrap gap-x-6 border-b border-border"
                        >
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`label-mono -mb-px border-b-2 pb-3 transition-colors ${
                                        activeTab === tab.id
                                            ? "border-flame text-flame"
                                            : "border-transparent text-muted-foreground hover:text-primary"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div
                            role="tabpanel"
                            className="pt-5 text-sm leading-relaxed text-muted-foreground"
                        >
                            {tabContent[activeTab]}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default ProductDetail