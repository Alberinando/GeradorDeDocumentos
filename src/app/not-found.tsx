import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, FileQuestion } from "lucide-react"

export default function NotFound() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto">
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <FileQuestion className="w-24 h-24 sm:w-32 sm:h-32 text-accent/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl sm:text-8xl font-bold text-accent">404</span>
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance mb-4 text-foreground">
                    Página não encontrada
                </h1>

                <p className="text-muted-foreground text-base sm:text-lg md:text-xl text-balance mb-8 px-4">
                    Desculpe, a página que você está procurando não existe ou foi movida.
                </p>

                <Link href="/">
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground cursor-pointer gap-2">
                        <Home className="w-5 h-5" />
                        Voltar para a página inicial
                    </Button>
                </Link>

                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        Se você acredita que isso é um erro, entre em contato com o suporte.
                    </p>
                </div>
            </div>
        </main>
    )
}
