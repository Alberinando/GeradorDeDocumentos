"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {generateRG} from "@/util/utils";
import {useCopyToClipboard} from "@/hooks/use-copy-to-clipboard";

export function RgGenerator() {
    const [rg, setRg] = useState("")
    const [withMask, setWithMask] = useState(true)
    const { toast } = useToast()
    const { copy } = useCopyToClipboard();

    const handleGenerate = () => {
        const newRg = generateRG(withMask)
        setRg(newRg)
    }

    const handleCopy = async () => {
        const ok = await copy(rg);
        toast({
            title: ok ? "Copiado!" : "Não foi possível copiar",
            description: ok
                ? "RG copiado para a área de transferência"
                : "Seu navegador bloqueou o acesso à área de transferência."
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Gerador de RG</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Gere RGs válidos com ou sem pontuação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="rg-mask" className="text-sm">
                        Com pontuação
                    </Label>
                    <Switch id="rg-mask" checked={withMask} onCheckedChange={setWithMask} />
                </div>

                <Button onClick={handleGenerate} className="w-full cursor-pointer text-sm sm:text-base" size="default">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Gerar RG
                </Button>

                {rg && (
                    <div className="space-y-2">
                        <Label className="text-sm">RG Gerado</Label>
                        <div className="flex gap-2">
                            <Input
                                value={rg}
                                readOnly
                                className="font-mono text-sm sm:text-base md:text-lg pointer-events-none select-none"
                            />
                            <Button
                                onClick={handleCopy}
                                variant="outline"
                                size="icon"
                                className="cursor-pointer bg-transparent shrink-0"
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
