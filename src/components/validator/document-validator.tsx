"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle } from "lucide-react"
import { validateCPF, validateCNPJ, validateRG, formatCPF, formatCNPJ, formatRG } from "@/util/utils"

export function DocumentValidator() {
    const [cpfInput, setCpfInput] = useState("")
    const [cnpjInput, setCnpjInput] = useState("")
    const [rgInput, setRgInput] = useState("")
    const [cpfValid, setCpfValid] = useState<boolean | null>(null)
    const [cnpjValid, setCnpjValid] = useState<boolean | null>(null)
    const [rgValid, setRgValid] = useState<boolean | null>(null)

    const filterInput = (value: string) => {
        return value.replace(/[^0-9.\-/]/g, "")
    }

    const handleValidateCPF = () => {
        const isValid = validateCPF(cpfInput)
        setCpfValid(isValid)
        if (isValid) {
            setCpfInput(formatCPF(cpfInput))
        }
    }

    const handleValidateCNPJ = () => {
        const isValid = validateCNPJ(cnpjInput)
        setCnpjValid(isValid)
        if (isValid) {
            setCnpjInput(formatCNPJ(cnpjInput))
        }
    }

    const handleValidateRG = () => {
        const isValid = validateRG(rgInput)
        setRgValid(isValid)
        if (isValid) {
            setRgInput(formatRG(rgInput))
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base sm:text-lg md:text-xl">Validador de Documentos</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Valide CPF, CNPJ e RG</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="cpf" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 h-auto">
                        <TabsTrigger value="cpf" className="cursor-pointer text-xs sm:text-sm py-1.5">
                            CPF
                        </TabsTrigger>
                        <TabsTrigger value="cnpj" className="cursor-pointer text-xs sm:text-sm py-1.5">
                            CNPJ
                        </TabsTrigger>
                        <TabsTrigger value="rg" className="cursor-pointer text-xs sm:text-sm py-1.5">
                            RG
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="cpf" className="space-y-3">
                        <div className="space-y-2">
                            <Label htmlFor="cpf-input" className="text-xs sm:text-sm">
                                Digite o CPF
                            </Label>
                            <Input
                                id="cpf-input"
                                placeholder="000.000.000-00"
                                value={cpfInput}
                                onChange={(e) => {
                                    const filtered = filterInput(e.target.value)
                                    setCpfInput(filtered.slice(0, 14))
                                    setCpfValid(null)
                                }}
                                maxLength={14}
                                className="font-mono text-sm sm:text-base"
                            />
                        </div>
                        <Button onClick={handleValidateCPF} className="w-full cursor-pointer text-xs sm:text-sm" size="default">
                            Validar CPF
                        </Button>
                        {cpfValid !== null && (
                            <div
                                className={`flex items-center gap-2 p-3 sm:p-4 rounded-lg ${
                                    cpfValid ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                                }`}
                            >
                                {cpfValid ? (
                                    <>
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                                        <span className="font-medium text-xs sm:text-sm">CPF válido!</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                                        <span className="font-medium text-xs sm:text-sm">CPF inválido!</span>
                                    </>
                                )}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="cnpj" className="space-y-3">
                        <div className="space-y-2">
                            <Label htmlFor="cnpj-input" className="text-xs sm:text-sm">
                                Digite o CNPJ
                            </Label>
                            <Input
                                id="cnpj-input"
                                placeholder="00.000.000/0000-00"
                                value={cnpjInput}
                                onChange={(e) => {
                                    const filtered = filterInput(e.target.value)
                                    setCnpjInput(filtered.slice(0, 18))
                                    setCnpjValid(null)
                                }}
                                maxLength={18}
                                className="font-mono text-sm sm:text-base"
                            />
                        </div>
                        <Button onClick={handleValidateCNPJ} className="w-full cursor-pointer text-xs sm:text-sm" size="default">
                            Validar CNPJ
                        </Button>
                        {cnpjValid !== null && (
                            <div
                                className={`flex items-center gap-2 p-3 sm:p-4 rounded-lg ${
                                    cnpjValid ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                                }`}
                            >
                                {cnpjValid ? (
                                    <>
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                                        <span className="font-medium text-xs sm:text-sm">CNPJ válido!</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                                        <span className="font-medium text-xs sm:text-sm">CNPJ inválido!</span>
                                    </>
                                )}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="rg" className="space-y-3">
                        <div className="space-y-2">
                            <Label htmlFor="rg-input" className="text-xs sm:text-sm">
                                Digite o RG
                            </Label>
                            <Input
                                id="rg-input"
                                placeholder="00.000.000-0"
                                value={rgInput}
                                onChange={(e) => {
                                    const filtered = filterInput(e.target.value)
                                    setRgInput(filtered.slice(0, 12))
                                    setRgValid(null)
                                }}
                                maxLength={12}
                                className="font-mono text-sm sm:text-base"
                            />
                        </div>
                        <Button onClick={handleValidateRG} className="w-full cursor-pointer text-xs sm:text-sm" size="default">
                            Validar RG
                        </Button>
                        {rgValid !== null && (
                            <div
                                className={`flex items-center gap-2 p-3 sm:p-4 rounded-lg ${
                                    rgValid ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                                }`}
                            >
                                {rgValid ? (
                                    <>
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                                        <span className="font-medium text-xs sm:text-sm">RG válido!</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                                        <span className="font-medium text-xs sm:text-sm">RG inválido!</span>
                                    </>
                                )}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
