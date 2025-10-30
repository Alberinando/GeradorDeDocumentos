"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {generateCPF} from "@/util/utils";
import {useCopyToClipboard} from "@/hooks/use-copy-to-clipboard";

const ESTADOS = [
    { value: "0", label: "Rio Grande do Sul" },
    { value: "1", label: "Distrito Federal, Goiás, Mato Grosso, Mato Grosso do Sul, Tocantins" },
    { value: "2", label: "Pará, Amazonas, Acre, Amapá, Rondônia, Roraima" },
    { value: "3", label: "Ceará, Maranhão, Piauí" },
    { value: "4", label: "Pernambuco, Rio Grande do Norte, Paraíba, Alagoas" },
    { value: "5", label: "Bahia, Sergipe" },
    { value: "6", label: "Minas Gerais" },
    { value: "7", label: "Rio de Janeiro, Espírito Santo" },
    { value: "8", label: "São Paulo" },
    { value: "9", label: "Paraná, Santa Catarina" },
]

export function CpfGenerator() {
    const [cpf, setCpf] = useState("")
    const [withMask, setWithMask] = useState(true)
    const [estado, setEstado] = useState<string>("")
    const { toast } = useToast()
    const { copy } = useCopyToClipboard();

    const handleGenerate = () => {
        const newCpf = generateCPF(withMask, estado)
        setCpf(newCpf)
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(cpf)
        toast({
            title: "Copiado!",
            description: "CPF copiado para a área de transferência",
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Gerador de CPF</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Gere CPFs válidos com ou sem pontuação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="cpf-mask" className="text-sm">
                        Com pontuação
                    </Label>
                    <Switch id="cpf-mask" checked={withMask} onCheckedChange={setWithMask} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cpf-estado" className="text-sm">
                        Estado de origem (opcional)
                    </Label>
                    <Select value={estado} onValueChange={setEstado}>
                        <SelectTrigger id="cpf-estado" className="text-sm">
                            <SelectValue placeholder="Selecione um estado" />
                        </SelectTrigger>
                        <SelectContent>
                            {ESTADOS.map((est) => (
                                <SelectItem key={est.value} value={est.value} className="text-xs sm:text-sm">
                                    {est.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={handleGenerate} className="w-full cursor-pointer text-sm sm:text-base" size="default">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Gerar CPF
                </Button>

                {cpf && (
                    <div className="space-y-2">
                        <Label className="text-sm">CPF Gerado</Label>
                        <div className="flex gap-2">
                            <Input
                                value={cpf}
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
