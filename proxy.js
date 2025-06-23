// Classe que representa o usuário
var User = /** @class */ (function () {
    function User(nome, nivelAcesso) {
        this.nome = nome;
        this.nivelAcesso = nivelAcesso;
    }
    return User;
}());
// Classe real com o conteúdo confidencial
var DocumentoConfidencial = /** @class */ (function () {
    function DocumentoConfidencial() {
        this.conteudo = "Este é um documento CONFIDENCIAL.";
    }
    DocumentoConfidencial.prototype.exibir = function () {
        console.log("\uD83D\uDCC4 Documento: ".concat(this.conteudo));
    };
    return DocumentoConfidencial;
}());
// Proxy que controla o acesso ao documento
var DocumentoProxy = /** @class */ (function () {
    function DocumentoProxy(usuario, nivelNecessario) {
        if (nivelNecessario === void 0) { nivelNecessario = 5; }
        this.usuario = usuario;
        this.nivelNecessario = nivelNecessario;
        this.documentoReal = null;
    }
    DocumentoProxy.prototype.exibir = function () {
        if (this.usuario.nivelAcesso >= this.nivelNecessario) {
            if (!this.documentoReal) {
                this.documentoReal = new DocumentoConfidencial();
            }
            console.log("\u2705 Acesso permitido para ".concat(this.usuario.nome));
            this.documentoReal.exibir();
        }
        else {
            console.log("\u26D4 Acesso negado para ".concat(this.usuario.nome, ". N\u00EDvel necess\u00E1rio: ").concat(this.nivelNecessario));
        }
    };
    return DocumentoProxy;
}());
// Simulação de dois usuários com diferentes níveis de acesso
var usuarioComum = new User("João", 2);
var gerente = new User("Ana", 6);
// Tentando acessar o documento com ambos os usuários
var proxy1 = new DocumentoProxy(usuarioComum);
var proxy2 = new DocumentoProxy(gerente);
proxy1.exibir(); // ⛔ Deve negar o acesso
proxy2.exibir(); // ✅ Deve permitir o acesso e mostrar o documento
