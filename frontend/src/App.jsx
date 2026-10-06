import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import CategoryPage from "./pages/CategoryPage"
import { FavoriteProductPage } from "./pages/FavoriteProductPage"
import Hero from "./pages/Hero"
import Manifest from "./pages/Manifest"
import ProductPage from "./pages/ProductPage"
import Footer from "./pages/Footer"

function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Hero />
                            <CategoryPage />
                            <FavoriteProductPage />
                            <Manifest />
                        </>
                    }
                />

                <Route
                    path="/busca"
                    element={<ProductPage />}
                />
            </Routes>

            <Footer />
        </>
    )
}

export default App
