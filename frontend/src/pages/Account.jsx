import { Link } from "react-router-dom"
import { Outdent } from 'lucide-react'
import DataAccount from '../components/DataAccount'


const Account = () => {
    return (
        <div className="mx-auto max-w-350 px-4 py-12 md:px-8 md:py-16">
            <div className="grid gap-4 border-t border-border pt-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                <div className="min-w-0">

                    <h2 className="display-xl mt-3 text-4xl md:text-5xl">
                        Olá, Paulo
                    </h2>
                    <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                        Área do cliente simulada para demonstração.
                    </p>
                </div>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
                <nav className="lg:sticky lg:top-32 lg:self-start">
                    <ul className="flex flex-wrap gap-2 lg:flex-col">
                        <li>
                            <Link className="label-mono block border border-border px-3 py-2 transition-colors hover:border-primary/40 lg:border-0 lg:border-l-2 lg:px-3 text-flame">
                                Dados pessoais
                            </Link>
                        </li>
                        <li>
                            <Link className="label-mono block border border-border px-3 py-2 transition-colors hover:border-primary/40 lg:border-0 lg:border-l-2 lg:px-3 text-flame">
                                Meus pedidos
                            </Link>
                        </li>
                        <li>
                            <Link className="label-mono block border border-border px-3 py-2 transition-colors hover:border-primary/40 lg:border-0 lg:border-l-2 lg:px-3 text-flame">
                                Favoritos
                            </Link>
                        </li>
                        <li>
                            <button className='label-mono flex items-center gap-2 border border-border px-3 py-2 text-muted-foreground transition-colors hover:text-destructive lg:border-0 lg:border-l-2 lg:border-transparent'>
                                <Outdent />
                                sair da conta
                            </button>
                        </li>
                    </ul>
                </nav>

                <div>
                    <DataAccount />
                </div>

            </div>
        </div>
    )
}

export default Account