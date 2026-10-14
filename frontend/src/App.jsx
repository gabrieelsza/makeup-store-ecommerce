import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import CategoryPage from "./pages/CategoryPage"
import { FavoriteProductPage } from "./pages/FavoriteProductPage"
import Hero from "./pages/Hero"
import Manifest from "./pages/Manifest"
import ProductPage from "./pages/ProductPage"
import Footer from "./pages/Footer"
import Cart from "./components/Cart"
import ProductDetail from "./components/ProductDeital"
import Offer from "./pages/Offer"


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
                            <Cart />
                        </>
                    }
                />

                <Route
                    path="/busca"
                    element={<ProductPage />}
                />
                <Route 
                    path="/produto/:slug" 
                    element={<ProductDetail />} 
                />

                <Route 
                    path="/ofertas" 
                    element={<Offer />} 
                />
                
            </Routes>

            <Footer />
        </>
    )
}

export default App
