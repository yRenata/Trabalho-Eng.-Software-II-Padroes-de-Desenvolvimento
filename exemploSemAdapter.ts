// ============================================================================
// 🚫 EXEMPLO RUIM: Sistema de E-commerce SEM Adapter Pattern
// ============================================================================

console.log("🚫 === PROBLEMA REAL: INTEGRAR NOVO SISTEMA DE PAGAMENTO ===\n");

// ============================================================================
// � CENÁRIO REAL: E-commerce que usava só PIX, agora quer aceitar cartão
// ============================================================================

// Sistema antigo de pagamento (só PIX)
class SistemaPagamentoPix {
    processarPagamento(valor: number, chavePix: string): boolean {
        console.log(`💳 [PIX] Processando R$ ${valor} para chave: ${chavePix}`);
        console.log("✅ [PIX] Pagamento PIX aprovado!");
        return true;
    }
}

// E-commerce funcionando perfeitamente com PIX
class EcommercePix {
    private pagamentoPix: SistemaPagamentoPix;
    
    constructor() {
        this.pagamentoPix = new SistemaPagamentoPix();
    }
    
    finalizarCompra(valor: number, chavePix: string): void {
        console.log(`🛒 [LOJA] Finalizando compra de R$ ${valor}`);
        
        const sucesso = this.pagamentoPix.processarPagamento(valor, chavePix);
        
        if (sucesso) {
            console.log("� [LOJA] Produto enviado!");
        } else {
            console.log("❌ [LOJA] Compra cancelada!");
        }
    }
}

// Novo sistema de cartão (interface totalmente diferente!)
class NovoSistemaCartao {
    private empresaCartao: string;
    
    constructor(empresa: string) {
        this.empresaCartao = empresa;
    }
    
    chargeCard(amount: number, cardNumber: string, cvv: string): {success: boolean, transactionId: string} {
        console.log(`💳 [${this.empresaCartao}] Cobrando $${amount} do cartão ****${cardNumber.slice(-4)}`);
        
        if (cvv.length === 3) {
            const transactionId = `TXN_${Date.now()}`;
            console.log(`✅ [${this.empresaCartao}] Cartão aprovado! ID: ${transactionId}`);
            return { success: true, transactionId };
        } else {
            console.log(`❌ [${this.empresaCartao}] CVV inválido!`);
            return { success: false, transactionId: "" };
        }
    }
}

// ============================================================================
console.log("✅ FUNCIONAMENTO NORMAL (só PIX):");
const lojaPix = new EcommercePix();
lojaPix.finalizarCompra(50.0, "cliente@email.com");

// ============================================================================
console.log("\n🆕 NOVO REQUISITO: Agora a loja quer aceitar CARTÃO também!");
console.log("🔥 Vamos ver as tentativas RUINS de integração...\n");

// ============================================================================
console.log("🔥 === TENTATIVA 1: MODIFICAR E-COMMERCE EXISTENTE (RUIM!) ===");

class EcommerceModificado {
    private pagamentoPix: SistemaPagamentoPix;
    private sistemaCartao: NovoSistemaCartao;
    
    constructor() {
        this.pagamentoPix = new SistemaPagamentoPix();
        this.sistemaCartao = new NovoSistemaCartao("MasterCard");
    }
    
    // PROBLEMA: Um método que faz tudo - fica confuso!
    finalizarCompra(valor: number, dadosPagamento: any, tipo: string): void {
        console.log(`🛒 [LOJA-MOD] Finalizando compra de R$ ${valor} via ${tipo}`);
        
        let sucesso = false;
        
        // LÓGICA CONFUSA: muitos IFs para decidir como pagar
        if (tipo === "pix") {
            sucesso = this.pagamentoPix.processarPagamento(valor, dadosPagamento);
        } else if (tipo === "cartao") {
            // CONVERSÃO MANUAL: tem que saber detalhes do novo sistema
            const resultado = this.sistemaCartao.chargeCard(valor, dadosPagamento.numero, dadosPagamento.cvv);
            sucesso = resultado.success;
        } else {
            console.log("❌ [LOJA-MOD] Tipo de pagamento desconhecido!");
        }
        
        if (sucesso) {
            console.log("📦 [LOJA-MOD] Produto enviado!");
        } else {
            console.log("❌ [LOJA-MOD] Compra cancelada!");
        }
    }
}

const lojaModificada = new EcommerceModificado();
lojaModificada.finalizarCompra(75.0, "cliente@pix.com", "pix");
lojaModificada.finalizarCompra(120.0, {numero: "1234567812345678", cvv: "123"}, "cartao");

console.log(" PROBLEMAS desta abordagem:");
console.log("   • Modificamos código que já funcionava (risco de bugs!)");
console.log("   • Método fica complexo com muitos IFs");
console.log("   • E-commerce precisa conhecer detalhes de cada sistema");
console.log("   • Difícil adicionar novos tipos de pagamento");
console.log("   • Quebra o princípio da responsabilidade única");

// ============================================================================
console.log("=== TENTATIVA 2: FORÇAR CONVERSÃO (RUIM!) ===");

// Tentativa de forçar o novo sistema a ter a interface antiga
class NovoSistemaCartaoForcado extends NovoSistemaCartao {
    constructor() {
        super("Visa");
    }
    
    // GAMBIARRA: método com nome diferente que não faz sentido
    processarPagamento(valor: number, dadosCartao: string): boolean {
        console.log("[FORCADO] Tentando forçar cartão como se fosse PIX...");
        
        // Como transformar dados de cartão em "chave PIX"???
        const partes = dadosCartao.split("|"); // Esperando "numero|cvv"
        
        if (partes.length !== 2) {
            console.log("💥 [FORCADO] Formato inválido! Esperava 'numero|cvv'");
            return false;
        }
        
        const resultado = this.chargeCard(valor, partes[0], partes[1]);
        return resultado.success;
    }
}

// Tentativa de usar na loja original
const sistemaForcado = new NovoSistemaCartaoForcado();
const lojaComGambiarra = new EcommercePix();

// Substituindo o sistema interno (hackeando!)
(lojaComGambiarra as any).pagamentoPix = sistemaForcado;

console.log(" Tentativa de usar cartão forçando como PIX:");
lojaComGambiarra.finalizarCompra(200.0, "1111222233334444|456");

console.log("\n PROBLEMAS desta abordagem:");
console.log("   • Interface não faz sentido (cartão como chave PIX?)");
console.log("   • Formato de dados confuso e frágil");
console.log("   • Hack perigoso substituindo objetos internos");
console.log("   • Difícil de entender e manter");
console.log("   • Pode quebrar com qualquer mudança");

// ============================================================================
console.log("\n\n=== RESUMO: POR QUE ESSAS TENTATIVAS SÃO RUINS? ===");

console.log("\nSITUAÇÃO REAL: E-commerce quer aceitar cartão além de PIX");
console.log("PROBLEMA: Sistemas têm interfaces completamente diferentes");

console.log("\nTENTATIVAS RUINS que vimos:");
console.log("   1. MODIFICAR e-commerce → Código fica complexo e arriscado!");
console.log("   2. FORÇAR conversão → Interface não faz sentido!");

console.log("\nPROBLEMAS REAIS que isso causa:");
console.log("   • Bugs no código que já funcionava");
console.log("   • Complexidade aumenta exponencialmente");
console.log("   • Difícil adicionar novos sistemas de pagamento");
console.log("   • Equipe tem dificuldade para entender e manter");
console.log("   • Custo alto de manutenção");

console.log("\nSOLUÇÃO REAL: PADRÃO ADAPTER!");
console.log("   • ✅ E-commerce permanece simples e intacto");
console.log("   • ✅ Cada sistema mantém sua interface original");
console.log("   • ✅ Adapter faz a 'tradução' entre eles");
console.log("   • ✅ Fácil adicionar novos sistemas no futuro");

console.log("\nVer solução profissional em 'adapter.ts'");
