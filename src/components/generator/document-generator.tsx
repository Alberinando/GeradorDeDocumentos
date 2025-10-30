"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CpfGenerator } from "./cpf-generator"
import { CnpjGenerator } from "./cnpj-generator"
import { RgGenerator } from "./rg-generator"
import { PasswordGenerator } from "./password-generator"
import { FileText, CheckCircle2 } from "lucide-react"
import {DocumentValidator} from "@/components/validator/document-validator";

export function DocumentGenerator() {
    return (
        <Tabs defaultValue="generator" className="w-full max-w-3xl mx-auto px-2 sm:px-0">
            <TabsList className="grid w-full grid-cols-2 mb-3 sm:mb-4 h-auto">
                <TabsTrigger
                    value="generator"
                    className="flex items-center gap-1 sm:gap-1.5 cursor-pointer text-xs sm:text-sm py-1.5 sm:py-2"
                >
                    <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span>Gerador</span>
                </TabsTrigger>
                <TabsTrigger
                    value="validator"
                    className="flex items-center gap-1 sm:gap-1.5 cursor-pointer text-xs sm:text-sm py-1.5 sm:py-2"
                >
                    <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span>Validador</span>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="generator">
                <Tabs defaultValue="cpf" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-3 sm:mb-4 h-auto gap-0.5">
                        <TabsTrigger value="cpf" className="cursor-pointer text-xs sm:text-sm py-1.5">
                            CPF
                        </TabsTrigger>
                        <TabsTrigger value="cnpj" className="cursor-pointer text-xs sm:text-sm py-1.5">
                            CNPJ
                        </TabsTrigger>
                        <TabsTrigger value="rg" className="cursor-pointer text-xs sm:text-sm py-1.5">
                            RG
                        </TabsTrigger>
                        <TabsTrigger value="password" className="cursor-pointer text-xs sm:text-sm py-1.5">
                            Senha
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="cpf">
                        <CpfGenerator />
                    </TabsContent>

                    <TabsContent value="cnpj">
                        <CnpjGenerator />
                    </TabsContent>

                    <TabsContent value="rg">
                        <RgGenerator />
                    </TabsContent>

                    <TabsContent value="password">
                        <PasswordGenerator />
                    </TabsContent>
                </Tabs>
            </TabsContent>

            <TabsContent value="validator">
                <DocumentValidator />
            </TabsContent>
        </Tabs>
    )
}
