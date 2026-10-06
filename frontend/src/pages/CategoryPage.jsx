import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import CategoryCard from "../components/CategoryCard"
import categories from "../data/categoryData"

const CategoryPage = () => {
    return (

        <section className="mx-auto max-w-350 px-4 py-16 md:px-8 md:py-24">
            <div className="grid gap-4 border-border pt-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                <div className="min-w-0">
                    <h2 className="display-xl mt-3 text-4xl md:text-5xl">Escolha por onde começar </h2>
                    <p className="mt-3 max-w-xl text-sm text-muted-foreground"> Doze territórios de cor, do rubor discreto ao vermelho de capa de revista.</p>
                </div>
                <Link>
                    <p className="inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background text-primary hover:bg-primary/8 h-11 px-6 text-sm rounded-sm">
                        Ver tudo  <ArrowRight />
                    </p>
                </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {categories.map((category, index) => (
                    <CategoryCard
                        key={category.id}
                        number={category.number}
                        slug={category.slug}
                        image={category.image}
                        name={category.name}
                        posicao={index}
                    />
                ))}
            </div>
        </section>

    )
}

export default CategoryPage