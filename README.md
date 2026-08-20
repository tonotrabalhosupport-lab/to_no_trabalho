# 🍔 Hamburgueria Tô no Trabalho - Sistema Web Product-First

Este é um site estático focado na experiência direta do produto desenvolvido para rodar de forma 100% gratuita no **GitHub Pages**. Diferente de grandes aplicativos de delivery que focam primeiro na loja, este sistema coloca os produtos em evidência imediata para gerar desejo de compra rápido.

## 🚀 Funcionalidades Principais
* **Foco no Produto:** Galeria visual limpa, organizada por categorias intuitivas através de ícones.
* **Carrinho Inteligente Dinâmico:** Atualiza o total de itens e valores em tempo real sem recarregar a página.
* **Menu de Customização Simples:** Permite escolher sabores (Caldos/Pastéis) e modalidades (Espetinho Simples vs Completo) antes de adicionar ao carrinho.
* **Integração Direta com WhatsApp:** O botão de finalização gera uma mensagem formatada contendo todo o pedido detalhado, transferindo o fechamento (endereço e frete) de forma humanizada para o WhatsApp.
* **Manutenção Descomplicada:** Preços, nomes e ingredientes centralizados em um único objeto de configuração no JavaScript para fácil edição.

## 🛠️ Como Atualizar os Preços e Produtos
Para alterar valores, nomes ou descrições, abra o arquivo `index.html`, role até a tag `<script>` no final do documento e localize a constante `CARDAPIO`. Basta alterar os valores numéricos ou textos ali para que todo o site se atualize automaticamente.
