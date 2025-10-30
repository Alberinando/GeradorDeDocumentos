"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {generateCNPJ} from "@/util/utils";
import {useCopyToClipboard} from "@/hooks/use-copy-to-clipboard";

export function CnpjGenerator() {
    const [cnpj, setCnpj] = useState("")
    const [withMask, setWithMask] = useState(true)
    const { toast } = useToast()
    const { copy } = useCopyToClipboard();

    const handleGenerate = () => {
        const newCnpj = generateCNPJ(withMask)
        setCnpj(newCnpj)
    }

    const handleCopy = async () => {
        const ok = await copy(cnpj);
        toast({
            title: ok ? "Copiado!" : "Não foi possível copiar",
            description: ok
                ? "CNPJ copiado para a área de transferência"
                : "Seu navegador bloqueou o acesso à área de transferência."
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Gerador de CNPJ</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Gere CNPJs válidos com ou sem pontuação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="cnpj-mask" className="text-sm">
                        Com pontuação
                    </Label>
                    <Switch id="cnpj-mask" checked={withMask} onCheckedChange={setWithMask} />
                </div>

                <Button onClick={handleGenerate} className="w-full cursor-pointer text-sm sm:text-base" size="default">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Gerar CNPJ
                </Button>

                {cnpj && (
                    <div className="space-y-2">
                        <Label>CNPJ Gerado</Label>
                        <div className="flex gap-2">
                            <Input value={cnpj} readOnly className="font-mono text-lg pointer-events-none select-none" />
                            <Button onClick={handleCopy} variant="outline" size="icon" className="cursor-pointer bg-transparent hover:bg-accent">
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
