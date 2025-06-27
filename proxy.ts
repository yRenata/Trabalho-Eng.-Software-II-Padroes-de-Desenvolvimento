// Interface comum para o documento
interface Documento {
  exibir(): void;
}

// Classe que representa o usuário
class User {
  constructor(public nome: string, public nivelAcesso: number) {}
}

// Classe real com o conteúdo confidencial
class DocumentoConfidencial implements Documento {
  private conteudo: string;

  constructor() {
    this.conteudo = "Este é um documento CONFIDENCIAL.";
  }

  exibir(): void {
    console.log(`📄 Documento: ${this.conteudo}`);
  }
}

// Proxy que controla o acesso ao documento
class DocumentoProxy implements Documento {
  private documentoReal: DocumentoConfidencial | null = null;

  constructor(private usuario: User, private nivelNecessario: number = 5) {}

  exibir(): void {
    if (this.usuario.nivelAcesso >= this.nivelNecessario) {
      if (!this.documentoReal) {
        this.documentoReal = new DocumentoConfidencial();
      }
      console.log(`✅ Acesso permitido para ${this.usuario.nome}`);
      this.documentoReal.exibir();
    } else {
      console.log(`⛔ Acesso negado para ${this.usuario.nome}. Nível necessário: ${this.nivelNecessario}`);
    }
  }
}

// Simulação de dois usuários com diferentes níveis de acesso
const usuarioComum = new User("João", 2);
const gerente = new User("Ana", 6);

// Tentando acessar o documento com ambos os usuários
const proxy1 = new DocumentoProxy(usuarioComum);
const proxy2 = new DocumentoProxy(gerente);

proxy1.exibir(); // ⛔ Deve negar o acesso
proxy2.exibir(); // ✅ Deve permitir o acesso e mostrar o documento
