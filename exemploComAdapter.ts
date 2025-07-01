// ============================================================================
// ✅ EXEMPLO COM ADAPTER: Sistema de E-commerce usando Padrão Adapter
// ============================================================================

console.log("✅ === SOLUÇÃO PROFISSIONAL: PADRÃO ADAPTER ===\n");

// ============================================================================
// 📱 CENÁRIO: E-commerce que precisa aceitar PIX e Cartão
// ============================================================================

// 💳 Sistema PIX original
class SistemaPagamentoPix {
    processarPagamento(valor: number, chavePix: string): boolean {
        console.log(`   💰 [PIX] Processando R$ ${valor} para: ${chavePix}`);
        console.log(`   ✅ [PIX] Pagamento aprovado!`);
        return true;
    }
}

// 🏦 Sistema de cartão externo (interface diferente)
class SistemaCartaoExterno {
    private bandeira: string;
    
    constructor(bandeira: string) {
        this.bandeira = bandeira;
        console.log(`🏦 [${bandeira}] Sistema de cartão inicializado`);
    }
    
    // Interface diferente do PIX!
    processarCartao(valor: number, numero: string, cvv: string): {aprovado: boolean, id: string} {
        console.log(`   💳 [${this.bandeira}] Processando cartão ****${numero.slice(-4)}`);
        
        if (numero.length === 16 && cvv.length === 3) {
            const transactionId = `TXN_${Date.now()}`;
            console.log(`   ✅ [${this.bandeira}] Cartão aprovado! ID: ${transactionId}`);
            return { aprovado: true, id: transactionId };
        } else {
            console.log(`   ❌ [${this.bandeira}] Dados inválidos!`);
            return { aprovado: false, id: "" };
        }
    }
}

// ============================================================================
// 🎯 PADRÃO ADAPTER: SOLUÇÃO PROFISSIONAL
// ============================================================================

// Interface comum para todos os processadores
interface ProcessadorPagamento {
    processarPagamento(valor: number, dados: string): boolean;
}

// E-commerce que aceita qualquer processador
class EcommerceUniversal {
    constructor(private processador: ProcessadorPagamento) {
        console.log("🏪 [Universal] E-commerce configurado");
    }
    
    finalizarCompra(valor: number, dados: string): void {
        console.log(`\n🛒 [Universal] Processando compra de R$ ${valor}`);
        
        if (this.processador.processarPagamento(valor, dados)) {
            console.log("✅ [Universal] Compra finalizada com sucesso!");
        } else {
            console.log("❌ [Universal] Falha no pagamento!");
        }
    }
}

// PIX implementa a interface
class ProcessadorPIX implements ProcessadorPagamento {
    private sistema: SistemaPagamentoPix;
    
    constructor() {
        this.sistema = new SistemaPagamentoPix();
        console.log("🔧 [PIX] Processador PIX configurado");
    }
    
    processarPagamento(valor: number, chavePix: string): boolean {
        return this.sistema.processarPagamento(valor, chavePix);
    }
}

// 🔌 ADAPTER: Faz cartão funcionar na interface do PIX
class AdapterCartao implements ProcessadorPagamento {
    constructor(private sistemaCartao: SistemaCartaoExterno) {
        console.log("🔌 [ADAPTER] Adaptador criado para integrar cartão");
    }
    
    processarPagamento(valor: number, dadosCartao: string): boolean {
        console.log("   🔄 [ADAPTER] Convertendo interface PIX → Cartão");
        
        // Converte dados do formato "numero|cvv"
        const [numero, cvv] = dadosCartao.split("|");
        
        if (!numero || !cvv) {
            console.log("   ❌ [ADAPTER] Formato inválido! Use: 'numero|cvv'");
            return false;
        }
        
        // Traduz para a interface do sistema de cartão
        const resultado = this.sistemaCartao.processarCartao(valor, numero, cvv);
        console.log("   🎯 [ADAPTER] Tradução concluída!");
        
        return resultado.aprovado;
    }
}

// ============================================================================
// 🎬 DEMONSTRAÇÃO PRÁTICA
// ============================================================================

console.log("\n" + "=".repeat(60));
console.log("🎬 DEMONSTRAÇÃO: E-COMMERCE COM ADAPTER");
console.log("=".repeat(60));

// 1️⃣ E-COMMERCE COM PIX
console.log("\n1️⃣ E-COMMERCE COM PIX:");
const processadorPix = new ProcessadorPIX();
const lojaPix = new EcommerceUniversal(processadorPix);
lojaPix.finalizarCompra(150.0, "vendedor@loja.com");

// 2️⃣ INTEGRANDO SISTEMA DE CARTÃO VISA
console.log("\n2️⃣ INTEGRANDO CARTÃO VISA (VIA ADAPTER):");
const sistemaVisa = new SistemaCartaoExterno("VISA");
const adapterVisa = new AdapterCartao(sistemaVisa);
const lojaVisa = new EcommerceUniversal(adapterVisa);
lojaVisa.finalizarCompra(300.0, "1234567812345678|123");

// 3️⃣ MÚLTIPLOS SISTEMAS DE PAGAMENTO
console.log("\n3️⃣ ADICIONANDO MASTERCARD:");
const sistemaMaster = new SistemaCartaoExterno("MASTERCARD");
const adapterMaster = new AdapterCartao(sistemaMaster);
const lojaMaster = new EcommerceUniversal(adapterMaster);
lojaMaster.finalizarCompra(500.0, "5555666677778888|456");

console.log("\n4️⃣ ADICIONANDO AMERICAN EXPRESS:");
const sistemaAmex = new SistemaCartaoExterno("AMEX");
const adapterAmex = new AdapterCartao(sistemaAmex);
const lojaAmex = new EcommerceUniversal(adapterAmex);
lojaAmex.finalizarCompra(750.0, "3333444455556666|789");

// ============================================================================
// 🎯 BENEFÍCIOS DO PADRÃO ADAPTER
// ============================================================================

console.log("\n" + "=".repeat(60));
console.log("🎯 BENEFÍCIOS DO PADRÃO ADAPTER");
console.log("=".repeat(60));

console.log("\n✅ O QUE O ADAPTER CONSEGUIU:");
console.log("   🏪 E-commerce usa a MESMA interface para tudo");
console.log("   💳 Sistemas de cartão mantêm interface ORIGINAL");
console.log("   🔌 Adapter faz a 'tradução' entre interfaces");
console.log("   🚀 FÁCIL adicionar novos tipos de pagamento");
console.log("   🛡️ ZERO risco de quebrar código existente");
console.log("   🧹 Código LIMPO e organizado");

console.log("\n🔍 SEM ADAPTER vs COM ADAPTER:");
console.log("   ❌ Sem: Modificar e-commerce para cada novo sistema");
console.log("   ✅ Com: Criar um adapter para cada novo sistema");

console.log("\n🎉 RESULTADO FINAL:");
console.log("   🎯 Um e-commerce que aceita PIX + Visa + Master + Amex");
console.log("   🎯 Código simples e fácil de manter");
console.log("   🎯 Qualquer novo sistema = apenas um novo adapter");

console.log("\n💡 O Adapter é como um tradutor universal!");
console.log("   🗣️ Faz sistemas incompatíveis conversarem perfeitamente!");
