import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
            <div className="mx-auto max-w-350 px-4 py-16 md:px-8">
                <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
                    <div>
                        <span className="flex items-baseline gap-1.5 leading-none">
                            BLUSH
                        </span>

                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
                            Maquiagem editorial feita para durar o dia e render a foto. Fórmulas veganas, formuladas no Brasil, embaladas para ficar à vista.
                        </p>

                        <div className="mt-6 flex gap-2">
                            <Link
                                className="grid h-10 w-10 place-items-center border border-primary-foreground/25 transition-colors hover:bg-flame hover:border-flame" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                </svg>
                            </Link>
                            <Link
                                className="grid h-10 w-10 place-items-center border border-primary-foreground/25 transition-colors hover:bg-flame hover:border-flame" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
                                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                                </svg>
                            </Link>
                            <Link
                                className="grid h-10 w-10 place-items-center border border-primary-foreground/25 transition-colors hover:bg-flame hover:border-flame" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
                                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-10 sm:grid-cols-3">
                        <div>
                            <h3 className="label-mono text-primary-foreground/60">
                                MARCA
                            </h3>

                            <ul className="mt-4 space-y-3">
                                <li className="text-sm transition-colors hover:text-petal"> Sobre</li>
                                <li className="text-sm transition-colors hover:text-petal"> Maquiagem </li>
                                <li className="text-sm transition-colors hover:text-petal"> Ofertas</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="label-mono text-primary-foreground/60">
                                ATEDIMENTO
                            </h3>

                            <ul className="mt-4 space-y-3">
                                <li className="text-sm transition-colors hover:text-petal"> Central de ajuda</li>
                                <li className="text-sm transition-colors hover:text-petal"> Politica de troca </li>
                                <li className="text-sm transition-colors hover:text-petal"> Privacidade </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="label-mono text-primary-foreground/60">
                                CONTA
                            </h3>

                            <ul className="mt-4 space-y-3">
                                <li className="text-sm transition-colors hover:text-petal"> Minha conta </li>
                                <li className="text-sm transition-colors hover:text-petal"> Meus pedidos </li>
                                <li className="text-sm transition-colors hover:text-petal"> Favoritos </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid gap-6 border-t border-primary-foreground/20 pt-10 lg:grid-cols-[1fr_1fr] lg:items-end">
                    <div>

                        <h3 className="font-display text-2xl leading-tight">
                            Newsletter
                        </h3>

                        <p className="mt-2 text-sm text-primary-foreground/75">
                            Receba novidades, lançamentos e códigos especiais.
                        </p>
                    </div>

                    <form className="flex flex-col gap-3 sm:flex-row">
                        <label className="sr-only"> Seu email </label>
                        <input type="text" placeholder="seuemail@gmail.com" className="h-12 flex-1 border border-primary-foreground/30 bg-transparent px-4 text-sm placeholder:text-primary-foreground/40 focus:border-petal focus:outline-none" />
                        <button className="inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-flame text-flame-foreground hover:bg-flame/90 h-11 px-6 text-sm rounded-sm">
                            Quero receber
                        </button>
                    </form>
                </div>

                <div className="mt-12 flex flex-col gap-2 border-t border-primary-foreground/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <span className="label-mono text-primary-foreground/60"> BLUSH BEAUTY / 2026 </span>
                    <span className="label-mono text-primary-foreground/60"> Projeto fictício de portfólio — nenhuma venda real </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer