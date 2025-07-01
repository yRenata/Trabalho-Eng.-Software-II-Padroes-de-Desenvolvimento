# Padrões de Desenvolvimento

## 🏗️ Design Patterns Estruturais

### 📌 O que são Padrões Estruturais?

Os **padrões estruturais** são uma categoria de padrões de design que se concentram em como **compor objetos e classes** para formar estruturas maiores e mais complexas, mantendo essas estruturas **flexíveis e eficientes**.

### 🎯 Objetivo Principal

Esses padrões resolvem problemas relacionados a:
- **Composição de objetos**: Como objetos podem ser combinados para formar estruturas maiores
- **Relacionamentos entre entidades**: Como classes e objetos se relacionam uns com os outros  
- **Simplificação de interfaces**: Como tornar interfaces complexas mais simples de usar
- **Reutilização de código**: Como aproveitar código existente de forma eficiente

### 🔧 Principais Padrões Estruturais (GoF)

| Padrão | Propósito | Analogia |
|--------|-----------|----------|
| **Adapter** | Converter interface incompatível | Adaptador de tomada |
| **Bridge** | Separar abstração da implementação | Ponte sobre o rio |
| **Composite** | Tratar objetos individuais e compostos uniformemente | Árvore de arquivos |
| **Decorator** | Adicionar funcionalidades dinamicamente | Decorar um bolo |
| **Facade** | Fornecer interface simplificada | Recepção de hotel |
| **Flyweight** | Compartilhar objetos para economizar memória | Biblioteca de livros |
| **Proxy** | Controlar acesso a outro objeto | Porteiro de prédio |

---

## Padrão de Projeto: Proxy

## 📌 Definição

O Proxy é um **padrão de projeto estrutural** que fornece um substituto ou um espaço reservado para outro objeto. Um proxy controla o acesso ao objeto real, podendo adicionar funcionalidades antes ou depois do acesso. ( Váriações de proxy: Proxy Virtual, Proxy Remoto, Proxy de Proteção e Proxy Inteligente )

## ❓ Problema

Imagine que você tem um objeto muito pesado ou com acesso custoso (como conexão com banco de dados ou chamadas de API). Mesmo que esse objeto só seja necessário em alguns momentos, ele é criado assim que o sistema inicia. Isso gera desperdício de recursos.

> **Exemplo prático:** baixar o mesmo vídeo do YouTube várias vezes ao invés de cachear.

## ✅ Solução

Criamos uma **classe Proxy** que implementa a mesma interface da classe real. Ela:

- Controla a criação do objeto original (inicialização preguiçosa);
- Pode fazer cache;
- Pode proteger acessos;
- Pode logar acessos ou ocultar complexidade.

## 🔁 Analogia

> **Cartão de crédito = Proxy do dinheiro real**

O cartão de crédito tem a mesma função que o dinheiro (pagamento), mas controla o acesso ao saldo da conta bancária, adicionando segurança, praticidade e controle.

### 🎯 Vantagens
- ✅ **Controle de acesso**: Pode restringir operações baseado em permissões
- ✅ **Cache**: Evita operações custosas repetidas
- ✅ **Lazy loading**: Só cria objetos quando realmente necessário
- ✅ **Transparência**: Cliente não sabe que está usando um proxyx
- ✅ **Segurança**: Pode adicionar camadas de proteção
- ✅ **Logging**: Pode registrar todas as operações

### 🎯 Desvantagens
- ❌ **Latência adicional**: Pode introduzir delay nas operações
- ❌ **Complexidade**: Adiciona uma camada extra de abstração
- ❌ **Memória**: Proxy pode consumir memória adicional
- ❌ **Debugging**: Pode dificultar a depuração do código

---

## 🔌 Padrão Adapter

### 📌 Definição

O Adapter é um **padrão de projeto estrutural** que permite que objetos com interfaces incompatíveis trabalhem juntos. Ele atua como um wrapper entre duas classes, convertendo a interface de uma classe em outra interface que o cliente espera.

## ❓ Problema

Imagine que você tem uma aplicação que já funciona com uma biblioteca específica, mas precisa integrar uma nova biblioteca que tem uma interface completamente diferente. Reescrever todo o código seria muito custoso e arriscado.

> **Exemplo prático:** Integrar um sistema de pagamento novo em uma aplicação que já usa outro sistema, onde ambos têm métodos e estruturas diferentes.

## ✅ Solução

Criamos uma **classe Adapter** que:

- Implementa a interface esperada pelo cliente;
- Contém uma instância da classe incompatível;
- Traduz as chamadas do cliente para a interface da classe incompatível;
- Pode fazer conversões de dados quando necessário.

## 🔁 Analogia

> **Adaptador de tomada = Adapter de interface**

Quando você viaja para outro país e precisa usar seus aparelhos eletrônicos, você usa um adaptador de tomada. O adaptador tem a mesma interface que sua ficha precisa de um lado e a interface da tomada local do outro lado, permitindo que dois padrões incompatíveis trabalhem juntos.

### 🎯 Vantagens
- ✅ **Reutilização de código**: Aproveita sistemas existentes sem modificá-los
- ✅ **Integração fácil**: Conecta sistemas com interfaces diferentes
- ✅ **Flexibilidade**: Permite mudanças sem afetar código existente
- ✅ **Isolamento**: Mantém sistemas independentes
- ✅ **Compatibilidade**: Resolve problemas de incompatibilidade
- ✅ **Manutenção**: Facilita atualizações e migrações

### 🎯 Desvantagens
- ❌ **Camada extra**: Adiciona complexidade com uma camada adicional
- ❌ **Performance**: Pode introduzir overhead nas operações
- ❌ **Debugging**: Pode mascarar problemas do sistema adaptado
- ❌ **Manutenção**: Precisa ser atualizado se as interfaces mudarem

---

## 📊 Comparação: Proxy vs Adapter

### 🎯 Diferenças Principais

| Aspecto | **Proxy** | **Adapter** |
|---------|-----------|-------------|
| **Objetivo** | Controlar acesso a um objeto | Compatibilizar interfaces diferentes |
| **Interface** | Mesma do objeto real | Nova interface compatível |
| **Relacionamento** | "É-UM" substituto | "TEM-UM" objeto adaptado |
| **Quando usar** | Cache, lazy loading, segurança | Integração, APIs diferentes |

### 🔍 Semelhanças

- 🔗 Ambos implementam uma interface
- 🔗 Ambos encapsulam outro objeto
- 🔗 Ambos adicionam uma camada de indireção
- 🔗 Ambos seguem o princípio da composição

### 🎨 Estrutura Visual

```
🔒 PROXY - Mesmo destino, controle de acesso
Cliente → Proxy → ObjetoReal
       (mesma interface)

🔌 ADAPTER - Destinos diferentes, tradução
Cliente → Adapter → ObjetoIncompatível
       (interface convertida)
```

### 💡 Analogias Comparativas

| **Proxy** | **Adapter** |
|-----------|-------------|
| 🏢 Porteiro de prédio | 🔌 Adaptador de tomada |
| 💳 Cartão de crédito | 🗣️ Tradutor de idiomas |
| 🛡️ Guarda de segurança | 🌉 Ponte entre ilhas |

### 🚀 Quando Usar Cada Um?

**Use PROXY quando:**
- ✅ Quer controlar acesso a um objeto
- ✅ Precisa de cache ou lazy loading
- ✅ Quer adicionar segurança ou logging
- ✅ Objeto é caro para criar/manter

**Use ADAPTER quando:**
- ✅ Tem interfaces incompatíveis
- ✅ Quer integrar biblioteca externa
- ✅ Precisa reutilizar código legado
- ✅ Quer isolar mudanças de API

### 🤝 Podem Trabalhar Juntos?

**Sim!** Exemplo real:
```
Cliente → Proxy → Adapter → SistemaExterno
         (cache)  (tradução)
```

---

## 🎯 Implementação

### Estrutura do Proxy
```
Cliente → Interface → Proxy → ServiçoReal
```

### Estrutura do Adapter
```
Cliente → InterfaceAlvo → Adapter → ServiçoAdaptado
```

## 📁 Arquivos do Projeto

### 🗂️ Estrutura do Projeto
```
📦 Trabalho-Eng.-Software-II-Padroes-de-Desenvolvimento/
├── 📄 README.md                 # Documentação completa do projeto
├── 📄 proxy.ts                  # Implementação do padrão Proxy em TypeScript
├── 📄 proxy.js                  # Implementação do padrão Proxy em JavaScript
├── 📄 exemploComAdapter.ts      # Implementação do padrão Adapter em TypeScript
├── 📄 exemploSemAdapter.ts      # Exemplo sem usar o padrão Adapter
├── 📄 proxyruim.ts              # Exemplo sem usar o padrão Proxy
├── 📄 package.json              # Configurações do projeto Node.js
├── 📄 tsconfig.json             # Configurações do TypeScript
└── 📄 .gitignore                # Arquivos ignorados pelo Git
```

### 🎯 Descrição dos Arquivos

- **`proxy.ts/js`**: Implementação completa do padrão Proxy com cache e lazy loading
- **`exemploComAdapter.ts`**: Implementação do padrão Adapter para integração de sistemas
- **`exemploSemAdapter.ts`**: Demonstração dos problemas sem usar o padrão Adapter
- **`proxyruim.ts`**: Demonstração dos problemas sem usar o padrão Proxy
- **`README.md`**: Documentação didática com teoria, exemplos e comparações

### 🚀 Como Executar

```bash
# Para TypeScript
npx ts-node proxy.ts
npx ts-node proxyruim.ts
npx ts-node exemploSemAdapter.ts
npx ts-node exemploComAdapter.ts


# Para JavaScript
node proxy.js
node proxyruim.js
```

---

### 📋 **Tópicos da Apresentação:**
- Contextualização sobre padrões estruturais
- Padrão Proxy: teoria e demonstração prática
- Padrão Adapter: teoria e demonstração prática  
- Comparação entre os padrões

### 🎯 **Link do Vídeo:**
> **[📹 Assistir Apresentação](https://www.youtube.com/watch?v=dQw4w9WgXcQ)**

---

## 👥 Informações do Projeto

**Disciplina:** Engenharia de Software II  
**Tema:** Padrões de Desenvolvimento - Padrões Estruturais  
**Padrões Estudados:** Proxy e Adapter  
**Linguagens:** TypeScript e JavaScript  

### 🎯 **Objetivos Alcançados:**
- ✅ Estudo teórico detalhado dos padrões
- ✅ Implementação prática em código
- ✅ Comparação entre os padrões
- ✅ Exemplos de uso sem e com os padrões
- ✅ Análise de pontos fortes e fracos

---

*🎉 Projeto desenvolvido para demonstrar a importância e aplicabilidade dos padrões de design estruturais no desenvolvimento de software.*

## 👨‍💻👩‍💻 Desenvolvedores

<div align="center">

### Equipe do Projeto

<a href="https://github.com/yRenata"><img src="https://github.com/yRenata.png" width="45" height="45" style="border-radius: 50%; margin-right: 10px;"></a>
<a href="https://github.com/KarolineKS"><img src="https://github.com/KarolineKS.png" width="45" height="45" style="border-radius: 50%;"></a>

</div>
