import { useEffect, useState } from "react";
import axios from "axios";
import FavoriteProducts from "../components/FavoriteProducts";
import imageRefence from "../assets/cat-face.jpg"

export const FavoriteProductPage = () => {
    const [products, setProducts] = useState([]);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarProdutos() {
            try {
                const response = await axios.get("http://localhost:3333/api/products");

                console.log("Resposta da API:", response.data);

                const lista = Array.isArray(response.data)
                    ? response.data
                    : response.data?.products || response.data?.data || [];

                setProducts(lista);
            } catch (error) {
                setErro(
                    error?.response?.data?.message ||
                    "Não foi possível carregar os produtos"
                );
            } finally {
                setCarregando(false);
            }
        }

        carregarProdutos();
    }, []);

    if (carregando) {
        return <p className="p-8">Carregando produtos...</p>;
    }

    if (erro) {
        return <p className="p-8 text-red-500">{erro}</p>;
    }

    return (
        <section className="mx-auto max-w-350 px-4 pb-16 md:px-8 md:pb-24">
            <div className="min-w-0">
                <h2 className="display-xl mt-3 text-4xl md:text-5xl">
                    Favoritos da semana
                </h2>

                <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                    Os oito produtos mais adicionados à sacola nos últimos sete dias.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4 mt-10">
                {products.map((product) => (
                    <FavoriteProducts
                        key={product.id}
                        slug={product.slug}
                        code={product.id}
                        category={product.categoria}
                        name={product.nome}
                        image={imageRefence}
                        rating={product.avaliacaoMedia}
                        reviews={product.quantidadeAvaliacoes}
                        price={product.preco}
                        oldPrice={product.precoPromocional}
                        discount={product.discount}
                    />
                ))}
            </div>
        </section>
    );
};