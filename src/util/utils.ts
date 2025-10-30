// Função para gerar CPF válido
export function generateCPF(withMask = true, estado = ""): string {
    // Gera os primeiros 9 dígitos
    let cpf = ""

    // Se um estado foi especificado, usa o dígito correspondente na 9ª posição
    for (let i = 0; i < 8; i++) {
        cpf += Math.floor(Math.random() * 10)
    }

    // Adiciona o dígito do estado ou um aleatório
    if (estado !== "") {
        cpf += estado
    } else {
        cpf += Math.floor(Math.random() * 10)
    }

    // Calcula o primeiro dígito verificador
    let sum = 0
    for (let i = 0; i < 9; i++) {
        sum += Number.parseInt(cpf[i]) * (10 - i)
    }
    let digit1 = 11 - (sum % 11)
    if (digit1 >= 10) digit1 = 0

    // Calcula o segundo dígito verificador
    sum = 0
    for (let i = 0; i < 9; i++) {
        sum += Number.parseInt(cpf[i]) * (11 - i)
    }
    sum += digit1 * 2
    let digit2 = 11 - (sum % 11)
    if (digit2 >= 10) digit2 = 0

    cpf += digit1.toString() + digit2.toString()

    if (withMask) {
        return formatCPF(cpf)
    }
    return cpf
}

// Função para validar CPF
export function validateCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, "")

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) return false

    // Valida primeiro dígito verificador
    let sum = 0
    for (let i = 0; i < 9; i++) {
        sum += Number.parseInt(cpf[i]) * (10 - i)
    }
    let digit1 = 11 - (sum % 11)
    if (digit1 >= 10) digit1 = 0
    if (digit1 !== Number.parseInt(cpf[9])) return false

    // Valida segundo dígito verificador
    sum = 0
    for (let i = 0; i < 10; i++) {
        sum += Number.parseInt(cpf[i]) * (11 - i)
    }
    let digit2 = 11 - (sum % 11)
    if (digit2 >= 10) digit2 = 0
    if (digit2 !== Number.parseInt(cpf[10])) return false

    return true
}

// Função para gerar CNPJ válido
export function generateCNPJ(withMask = true): string {
    // Gera os primeiros 8 dígitos (número base)
    let cnpj = ""
    for (let i = 0; i < 8; i++) {
        cnpj += Math.floor(Math.random() * 10)
    }

    // Adiciona 0001 (filial)
    cnpj += "0001"

    // Calcula o primeiro dígito verificador
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let sum = 0
    for (let i = 0; i < 12; i++) {
        sum += Number.parseInt(cnpj[i]) * weights1[i]
    }
    let digit1 = sum % 11
    digit1 = digit1 < 2 ? 0 : 11 - digit1

    // Calcula o segundo dígito verificador
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    sum = 0
    for (let i = 0; i < 12; i++) {
        sum += Number.parseInt(cnpj[i]) * weights2[i]
    }
    sum += digit1 * weights2[12]
    let digit2 = sum % 11
    digit2 = digit2 < 2 ? 0 : 11 - digit2

    cnpj += digit1.toString() + digit2.toString()

    if (withMask) {
        return formatCNPJ(cnpj)
    }
    return cnpj
}

// Função para validar CNPJ
export function validateCNPJ(cnpj: string): boolean {
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]/g, "")

    // Verifica se tem 14 dígitos
    if (cnpj.length !== 14) return false

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cnpj)) return false

    // Valida primeiro dígito verificador
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let sum = 0
    for (let i = 0; i < 12; i++) {
        sum += Number.parseInt(cnpj[i]) * weights1[i]
    }
    let digit1 = sum % 11
    digit1 = digit1 < 2 ? 0 : 11 - digit1
    if (digit1 !== Number.parseInt(cnpj[12])) return false

    // Valida segundo dígito verificador
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    sum = 0
    for (let i = 0; i < 13; i++) {
        sum += Number.parseInt(cnpj[i]) * weights2[i]
    }
    let digit2 = sum % 11
    digit2 = digit2 < 2 ? 0 : 11 - digit2
    if (digit2 !== Number.parseInt(cnpj[13])) return false

    return true
}

// Função para gerar RG válido (formato SP)
export function generateRG(withMask = true): string {
    // Gera os primeiros 8 dígitos
    let rg = ""
    for (let i = 0; i < 8; i++) {
        rg += Math.floor(Math.random() * 10)
    }

    // Calcula o dígito verificador
    let sum = 0
    for (let i = 0; i < 8; i++) {
        sum += Number.parseInt(rg[i]) * (9 - i)
    }
    const digit = sum % 11
    const digitStr = digit === 10 ? "X" : digit.toString()

    rg += digitStr

    if (withMask) {
        return formatRG(rg)
    }
    return rg
}

// Função para validar RG (formato SP)
export function validateRG(rg: string): boolean {
    // Remove caracteres não numéricos (exceto X)
    rg = rg.replace(/[^\dXx]/g, "").toUpperCase()

    // Verifica se tem 9 caracteres
    if (rg.length !== 9) return false

    // Valida dígito verificador
    let sum = 0
    for (let i = 0; i < 8; i++) {
        sum += Number.parseInt(rg[i]) * (9 - i)
    }
    const digit = sum % 11
    const expectedDigit = digit === 10 ? "X" : digit.toString()

    return rg[8] === expectedDigit
}

// Função para formatar CPF
export function formatCPF(cpf: string): string {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, "")

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return cpf

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

// Função para formatar CNPJ
export function formatCNPJ(cnpj: string): string {
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]/g, "")

    // Verifica se tem 14 dígitos
    if (cnpj.length !== 14) return cnpj

    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
}

// Função para formatar RG
export function formatRG(rg: string): string {
    // Remove caracteres não numéricos (exceto X)
    rg = rg.replace(/[^\dXx]/g, "").toUpperCase()

    // Verifica se tem 9 caracteres
    if (rg.length !== 9) return rg

    return rg.replace(/(\d{2})(\d{3})(\d{3})(\w{1})/, "$1.$2.$3-$4")
}
