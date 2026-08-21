/* =========================================================
   TÔ NO TRABALHO
   MENU DATABASE

   Este arquivo contém somente os dados do cardápio.
   PREÇOS NÃO DEVEM SER COLOCADOS AQUI.

   Para alterar preços:
   → scripts/prices.js

   Para alterar produtos:
   → este arquivo
========================================================= */

const MENU_CONFIG = {
    restaurantName: "Tô no Trabalho",

    whatsapp: "556681018088",

    currency: "BRL",

    imagePath: "images/"
};

const MENU = [

    /* =====================================================
       HAMBÚRGUERES
    ===================================================== */

    {
        id: "burgue-classico",
        category: "hamburgueres",
        name: "Burgue Clássico",

        description:
            "Pão francês, hambúrguer artesanal, alface, tomate, queijo e molho de maionese.",

        ingredients: [
            "Pão francês",
            "Hambúrguer artesanal",
            "Alface",
            "Tomate",
            "Queijo",
            "Molho de maionese"
        ],

        priceKey: "burgueClassico",

        image: "burgue-classico.webp"
    },

    {
        id: "burgue-especial",
        category: "hamburgueres",
        name: "Burgue Especial",

        description:
            "Pão francês, hambúrguer artesanal, cebola caramelizada, bacon, queijo e molho de maionese.",

        ingredients: [
            "Pão francês",
            "Hambúrguer artesanal",
            "Cebola caramelizada",
            "Bacon",
            "Queijo",
            "Molho de maionese"
        ],

        priceKey: "burgueEspecial",

        image: "burgue-especial.webp"
    },

    {
        id: "burgue-monster",
        category: "hamburgueres",
        name: "Burgue Monster",

        description:
            "Pão francês, 2 hambúrgueres artesanais, bacon em dose dupla, picles, alface, tomate, queijo e molho de maionese.",

        ingredients: [
            "Pão francês",
            "2 hambúrgueres artesanais",
            "Bacon em dose dupla",
            "Picles",
            "Alface",
            "Tomate",
            "Queijo",
            "Molho de maionese"
        ],

        priceKey: "burgueMonster",

        image: "burgue-monster.webp"
    },

    {
        id: "burguer-kids",
        category: "hamburgueres",
        name: "Burguer Kids",

        description:
            "Pão francês, hambúrguer artesanal, queijo e molho de maionese.",

        ingredients: [
            "Pão francês",
            "Hambúrguer artesanal",
            "Queijo",
            "Molho de maionese"
        ],

        priceKey: "burguerKids",

        image: "burguer-kids.webp"
    },


    /* =====================================================
       CALDOS & PASTÉIS
    ===================================================== */

    {
        id: "caldos-quentinhos",
        category: "caldos-pasteis",
        name: "Caldos Quentinhos",

        description:
            "Porção individual super saborosa.",

        priceKey: "caldosQuentinhos",

        options: [
            "Frango",
            "Carne",
            "Verde"
        ],

        image: "caldos-quentinhos.webp"
    },

    {
        id: "pasteis-crocantes",
        category: "caldos-pasteis",
        name: "Pastéis Crocantes",

        description:
            "Frito na hora, recheio generoso.",

        priceKey: "pasteisCrocantes",

        options: [
            "Carne",
            "Frango",
            "Presunto & Queijo"
        ],

        image: "pasteis-crocantes.webp"
    },


    /* =====================================================
       ESPETINHOS
    ===================================================== */

    {
        id: "espetinho-carne",
        category: "espetinhos",
        name: "Espetinho de Carne",

        priceKey: {
            simples: "espetinhoCarneSimples",
            completo: "espetinhoCarneCompleto"
        },

        options: [
            "simples",
            "completo"
        ],

        image: "espetinho-carne.webp"
    },

    {
        id: "espetinho-frango",
        category: "espetinhos",
        name: "Espetinho de Frango",

        priceKey: {
            simples: "espetinhoFrangoSimples",
            completo: "espetinhoFrangoCompleto"
        },

        options: [
            "simples",
            "completo"
        ],

        image: "espetinho-frango.webp"
    },

    {
        id: "espetinho-kafta",
        category: "espetinhos",
        name: "Espetinho de Kafta",

        priceKey: {
            simples: "espetinhoKaftaSimples",
            completo: "espetinhoKaftaCompleto"
        },

        options: [
            "simples",
            "completo"
        ],

        image: "espetinho-kafta.webp"
    },

    {
        id: "espetinho-coracao",
        category: "espetinhos",
        name: "Espetinho de Coração",

        priceKey: {
            simples: "espetinhoCoracaoSimples",
            completo: "espetinhoCoracaoCompleto"
        },

        options: [
            "simples",
            "completo"
        ],

        image: "espetinho-coracao.webp"
    },

    {
        id: "kafta-com-queijo",
        category: "espetinhos",
        name: "Kafta com Queijo",

        priceKey: {
            simples: "kaftaQueijoSimples",
            completo: "kaftaQueijoCompleto"
        },

        options: [
            "simples",
            "completo"
        ],

        image: "kafta-com-queijo.webp"
    }

];