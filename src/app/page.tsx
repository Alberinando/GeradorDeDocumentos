import {DocumentGenerator} from "@/components/generator/document-generator";

export default function Home() {
    return (
        <main className="min-h-dvh sm:min-h-[100svh] bg-gradient-to-br from-background via-secondary/20 to-background flex flex-col">
            {/* ↑ dvh corrige a altura no mobile com barra de endereço dinâmica
         e svh é um fallback interessante para alguns navegadores */}

            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 flex-1 min-h-0 max-w-6xl">
                {/* ↑ flex-1 ocupa o espaço vertical disponível
             min-h-0 permite que filhos com overflow rolem sem “forçar” altura */}
                <div className="mb-4 sm:mb-6 md:mb-8 text-center">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-balance mb-2 sm:mb-3 text-accent">
                        Gerador de Documentos
                    </h1>
                    <p className="text-muted-foreground text-xs sm:text-sm md:text-base text-balance px-2">
                        Gere e valide CPF, CNPJ, RG e senhas de forma rápida e segura
                    </p>
                </div>

                <DocumentGenerator />
                {/* Se o DocumentGenerator tiver listas grandes, você pode dar rolagem:
            <div className="max-h-full overflow-y-auto"> ... </div> */}
            </div>

            <footer className="border-t border-border py-3 sm:py-4 md:py-5 mt-4 sm:mt-6 pb-[env(safe-area-inset-bottom)]">
                <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center text-xs sm:text-sm text-muted-foreground max-w-6xl">
                    © {new Date().getFullYear()}{" "}
                    <a
                        href="https://alberinandomagno.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 transition-colors cursor-pointer"
                    >
                        Alberinando Magno
                    </a>
                    . Todos os direitos reservados.
                </div>
            </footer>
        </main>
    )
}
