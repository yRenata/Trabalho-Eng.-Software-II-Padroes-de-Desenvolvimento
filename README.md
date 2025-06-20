# Padrões de Desenvolvimento

## Padrão de Projeto: Proxy

## 📌 Definição

O Proxy é um **padrão de projeto estrutural** que fornece um substituto ou um espaço reservado para outro objeto. Um proxy controla o acesso ao objeto real, podendo adicionar funcionalidades antes ou depois do acesso.

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

