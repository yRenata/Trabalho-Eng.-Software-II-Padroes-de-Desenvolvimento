"use strict";

// Sem proxy de proteção
class DocumentoSimples {
    constructor() {
        this.conteudo = "Documento confidencial sem proteção.";
    }
    exibir() {
        console.log(`📄 Documento: ${this.conteudo}`);
    }
}
// Simula dois usuários
const joao = { nome: "João", nivelAcesso: 2 };
const ana = { nome: "Ana", nivelAcesso: 6 };

// Nenhum controle de acesso!
const documento = new DocumentoSimples();
console.log(`👤 ${joao.nome} tentando acessar...`);
documento.exibir();
console.log(`👤 ${ana.nome} tentando acessar...`);
documento.exibir();
