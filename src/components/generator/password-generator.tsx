"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

interface PasswordOptions {
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    special: boolean
}

export function PasswordGenerator() {
    const [passwords, setPasswords] = useState<string[]>([])
    const [length, setLength] = useState<string>("16");
    const [quantity, setQuantity] = useState<string>("1");
    const [options, setOptions] = useState<PasswordOptions>({
        uppercase: true,
        lowercase: true,
        numbers: true,
        special: true,
    })
    const { toast } = useToast()
    const { copy } = useCopyToClipboard()

    const blockNonNumeric: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
            e.preventDefault()
        }
    }

    const clampLength = (v: number) => (v < 10 ? 10 : v > 64 ? 64 : v);
    const clampQuantity = (v: number) => (v < 1 ? 1 : v > 50 ? 50 : v);

    const generatePassword = (len: number, opts: PasswordOptions): string => {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const lowercase = "abcdefghijklmnopqrstuvwxyz"
        const numbers = "0123456789"
        const special = "!@#$%&*()-+.,;?[]^><:Çç|\"'`´"

        let chars = ""
        if (opts.uppercase) chars += uppercase
        if (opts.lowercase) chars += lowercase
        if (opts.numbers) chars += numbers
        if (opts.special) chars += special

        if (chars === "") chars = lowercase + numbers

        let password = ""
        for (let i = 0; i < len; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return password
    }

    const handleGenerate = () => {
        const len = clampLength(parseInt(length || "0", 10) || 10);
        const qty = clampQuantity(parseInt(quantity || "0", 10) || 1);

        setLength(String(len));
        setQuantity(String(qty));

        const next: string[] = [];
        for (let i = 0; i < qty; i++) next.push(generatePassword(len, options));
        setPasswords(next);
    };

    const handleCopy = async (password: string) => {
        const ok = await copy(password)
        toast({
            title: ok ? "Copiado!" : "Não foi possível copiar",
            description: ok
                ? "Senha copiada para a área de transferência"
                : "Seu navegador bloqueou o acesso à área de transferência.",
        })
    }

    const handleCopyAll = async () => {
        const ok = await copy(passwords.join("\n"))
        toast({
            title: ok ? "Copiado!" : "Não foi possível copiar",
            description: ok
                ? "Todas as senhas copiadas para a área de transferência"
                : "Seu navegador bloqueou o acesso à área de transferência.",
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Gerador de Senhas</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                    Gere senhas seguras com opções personalizadas
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-4">
                    <div className="space-y-3">
                        <Label className="text-xs sm:text-sm">Opções de Caracteres</Label>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="uppercase"
                                    checked={options.uppercase}
                                    onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked as boolean })}
                                />
                                <label htmlFor="uppercase" className="text-xs sm:text-sm font-medium cursor-pointer">
                                    Incluir Letras Maiúsculas (A-Z)
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="lowercase"
                                    checked={options.lowercase}
                                    onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked as boolean })}
                                />
                                <label htmlFor="lowercase" className="text-xs sm:text-sm font-medium cursor-pointer">
                                    Incluir Letras Minúsculas (a-z)
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="numbers"
                                    checked={options.numbers}
                                    onCheckedChange={(checked) => setOptions({ ...options, numbers: checked as boolean })}
                                />
                                <label htmlFor="numbers" className="text-xs sm:text-sm font-medium cursor-pointer">
                                    Incluir Números (0-9)
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="special"
                                    checked={options.special}
                                    onCheckedChange={(checked) => setOptions({ ...options, special: checked as boolean })}
                                />
                                <label htmlFor="special" className="text-xs sm:text-sm font-medium cursor-pointer">
                                    Incluir Caracteres Especiais (!@#$%&amp;*()-+.,;?[]^&gt;&lt;:)
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="length" className="text-xs sm:text-sm">
                                Tamanho <span className="text-muted-foreground">(10-64)</span>
                            </Label>
                            <Input
                                id="length"
                                type="number"
                                inputMode="numeric"
                                min={10}
                                max={64}
                                step={1}
                                value={length}
                                onKeyDown={blockNonNumeric}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    if (v === "") setLength(""); else setLength(v);
                                }}
                                onBlur={() => {
                                    const n = parseInt(length || "0", 10);
                                    const normalized = clampLength(Number.isFinite(n) ? n : 10);
                                    setLength(String(normalized));
                                }}
                                className="font-mono text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quantity" className="text-xs sm:text-sm">
                                Quantidade <span className="text-muted-foreground">(1-50)</span>
                            </Label>
                            <Input
                                id="quantity"
                                type="number"
                                inputMode="numeric"
                                min={1}
                                max={50}
                                step={1}
                                value={quantity}
                                onKeyDown={blockNonNumeric}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    if (v === "") setQuantity(""); else setQuantity(v);
                                }}
                                onBlur={() => {
                                    const n = parseInt(quantity || "0", 10);
                                    const normalized = clampQuantity(Number.isFinite(n) ? n : 1);
                                    setQuantity(String(normalized));
                                }}
                                className="font-mono text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>
                </div>

                <Button onClick={handleGenerate} className="w-full cursor-pointer text-xs sm:text-sm" size="default">
                    <RefreshCw className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Gerar Senha{Number(quantity) > 1 ? "s" : ""}
                </Button>

                {passwords.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                            <Label className="text-xs sm:text-sm">
                                Senha{passwords.length > 1 ? "s" : ""} Gerada{passwords.length > 1 ? "s" : ""}
                            </Label>
                            {passwords.length > 1 && (
                                <Button onClick={handleCopyAll} variant="outline" size="sm" className="cursor-pointer bg-transparent text-xs shrink-0">
                                    <Copy className="mr-1.5 h-3 w-3" />
                                    <span className="hidden xs:inline">Copiar Todas</span>
                                    <span className="xs:hidden">Todas</span>
                                </Button>
                            )}
                        </div>

                        <div className="space-y-2 max-h-[300px] sm:max-h-[400px] overflow-y-auto pr-1 sm:pr-2">
                            {passwords.map((password, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input value={password} readOnly className="font-mono text-xs sm:text-sm pointer-events-none select-none" />
                                    <Button
                                        onClick={() => handleCopy(password)}
                                        variant="outline"
                                        size="icon"
                                        className="cursor-pointer bg-transparent shrink-0 h-9 w-9 sm:h-10 sm:w-10"
                                    >
                                        <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
