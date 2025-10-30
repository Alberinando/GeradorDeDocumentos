"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {Checkbox} from "@/components/ui/checkbox";
import {useCopyToClipboard} from "@/hooks/use-copy-to-clipboard";

interface PasswordOptions {
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    special: boolean
}

export function PasswordGenerator() {
    const [passwords, setPasswords] = useState<string[]>([])
    const [length, setLength] = useState(16)
    const [quantity, setQuantity] = useState(1)
    const [options, setOptions] = useState<PasswordOptions>({
        uppercase: true,
        lowercase: true,
        numbers: true,
        special: true,
    })
    const { toast } = useToast()

    const generatePassword = (len: number, opts: PasswordOptions): string => {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const lowercase = "abcdefghijklmnopqrstuvwxyz"
        const numbers = "0123456789"
        const special = "!@#$%&*()-+.,;?[]^><:"
        const { copy } = useCopyToClipboard();

        let chars = ""
        if (opts.uppercase) chars += uppercase
        if (opts.lowercase) chars += lowercase
        if (opts.numbers) chars += numbers
        if (opts.special) chars += special

        if (chars === "") {
            chars = lowercase + numbers
        }

        let password = ""
        for (let i = 0; i < len; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return password
    }

    const handleGenerate = () => {
        // Limitar tamanho entre 10 e 64
        const validLength = Math.max(10, Math.min(64, length))

        const newPasswords: string[] = []
        for (let i = 0; i < quantity; i++) {
            const password = generatePassword(validLength, options)
            if (password) newPasswords.push(password)
        }

        setPasswords(newPasswords)
    }

    const handleCopy = async (password: string) => {
        await navigator.clipboard.writeText(password)
        toast({
            title: "Copiado!",
            description: "Senha copiada para a área de transferência",
        })
    }

    const handleCopyAll = async () => {
        await navigator.clipboard.writeText(passwords.join("\n"))
        toast({
            title: "Copiado!",
            description: "Todas as senhas copiadas para a área de transferência",
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Gerador de Senhas</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Gere senhas seguras com opções personalizadas</CardDescription>
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
                                <label
                                    htmlFor="uppercase"
                                    className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    Incluir Letras Maiúsculas (A-Z)
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="lowercase"
                                    checked={options.lowercase}
                                    onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked as boolean })}
                                />
                                <label
                                    htmlFor="lowercase"
                                    className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    Incluir Letras Minúsculas (a-z)
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="numbers"
                                    checked={options.numbers}
                                    onCheckedChange={(checked) => setOptions({ ...options, numbers: checked as boolean })}
                                />
                                <label
                                    htmlFor="numbers"
                                    className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    Incluir Números (0-9)
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="special"
                                    checked={options.special}
                                    onCheckedChange={(checked) => setOptions({ ...options, special: checked as boolean })}
                                />
                                <label
                                    htmlFor="special"
                                    className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    Incluir Caracteres Especiais (!@#$%&amp;*()-+.,;?[]^&gt;&lt;:)
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="length" className="text-xs sm:text-sm">
                                Tamanho (10-64)
                            </Label>
                            <Input
                                id="length"
                                type="number"
                                min="10"
                                max="64"
                                value={length}
                                onChange={(e) => {
                                    const val = Number.parseInt(e.target.value) || 10
                                    setLength(Math.max(10, Math.min(64, val)))
                                }}
                                className="font-mono text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="quantity" className="text-xs sm:text-sm">
                                Quantidade
                            </Label>
                            <Input
                                id="quantity"
                                type="number"
                                min="1"
                                max="50"
                                value={quantity}
                                onChange={(e) => {
                                    const val = Number.parseInt(e.target.value) || 1
                                    setQuantity(Math.max(1, Math.min(50, val)))
                                }}
                                className="font-mono text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>
                </div>

                <Button onClick={handleGenerate} className="w-full cursor-pointer text-xs sm:text-sm" size="default">
                    <RefreshCw className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Gerar Senha{quantity > 1 ? "s" : ""}
                </Button>

                {passwords.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                            <Label className="text-xs sm:text-sm">
                                Senha{passwords.length > 1 ? "s" : ""} Gerada{passwords.length > 1 ? "s" : ""}
                            </Label>
                            {passwords.length > 1 && (
                                <Button
                                    onClick={handleCopyAll}
                                    variant="outline"
                                    size="sm"
                                    className="cursor-pointer bg-transparent text-xs shrink-0"
                                >
                                    <Copy className="mr-1.5 h-3 w-3" />
                                    <span className="hidden xs:inline">Copiar Todas</span>
                                    <span className="xs:hidden">Todas</span>
                                </Button>
                            )}
                        </div>
                        <div className="space-y-2 max-h-[300px] sm:max-h-[400px] overflow-y-auto pr-1 sm:pr-2">
                            {passwords.map((password, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={password}
                                        readOnly
                                        className="font-mono text-xs sm:text-sm pointer-events-none select-none"
                                    />
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
