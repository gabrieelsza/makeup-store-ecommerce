import { Link } from "react-router-dom"

const DataAccount = () => {
    return (
        <div className="space-y-12">
            <section>
                <h2 className="font-display text-2xl">
                    Dados pessoais
                </h2>

                <ul className="mt-5 grid gap-px border border-border bg-border sm:grid-cols-2">
                    <div className="bg-background p-5">
                        <dt className="label-mono text-muted-foreground">
                            Nome
                        </dt>
                        <dd className="mt-1 text-sm">
                            Paulo
                        </dd>
                    </div>
                    <div className="bg-background p-5">
                        <dt className="label-mono text-muted-foreground">
                            Email
                        </dt>
                        <dd className="mt-1 text-sm">
                            Paulo@email.com
                        </dd>
                    </div>
                    <div className="bg-background p-5">
                        <dt className="label-mono text-muted-foreground">
                            CPF
                        </dt>
                        <dd className="mt-1 text-sm">
                            000.000.000-00
                        </dd>
                    </div>
                    <div className="bg-background p-5">
                        <dt className="label-mono text-muted-foreground">
                            Telefone
                        </dt>
                        <dd className="mt-1 text-sm">
                            (61) 99999-9999
                        </dd>
                    </div>
                </ul>
            </section>

            <section>
                <h2 className="font-display text-2xl">
                    Endereços
                </h2>

                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                    <li className="border border-border p-5">
                        <span className="label-mono bg-petal px-2 py-1">
                            Casa
                        </span>

                        <p className="mt-3 text-sm text-muted-foreground">
                            Av. Paulista, 1000 — Apto 52 · Bela Vista, São Paulo/SP · 01310-000
                        </p>
                    </li>

                    <li className="border border-border p-5">
                        <span className="label-mono bg-petal px-2 py-1">
                            Trabalho
                        </span>

                        <p className="mt-3 text-sm text-muted-foreground">
                            Rua Augusta, 220 — Sala 3 · Consolação, São Paulo/SP · 01304-000
                        </p>
                    </li>
                </ul>
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
                <Link className="group border border-border p-6 transition-colors hover:border-flame">
                    <span className="label-mono text-muted-foreground">
                        Pedidos
                    </span>
                    <p className="mt-2 font-mono text-3xl">
                        2
                    </p>

                    <p className="label-mono mt-3 text-flame group-hover:underline">
                        Ver histórico
                    </p>
                </Link>
                
                <Link className="group border border-border p-6 transition-colors hover:border-flame">
                    <span className="label-mono text-muted-foreground">
                        Favoritos
                    </span>
                    <p className="mt-2 font-mono text-3xl">
                        3
                    </p>

                    <p className="label-mono mt-3 text-flame group-hover:underline">
                        Ver lista
                    </p>
                </Link>

            </section>
        </div>

    )
}

export default DataAccount