<p align="center">
  <img src="./src/assets/logo.svg" alt="Lanchonete Belo Arco-Iris" width="260">
</p>

<h1 align="center">Lanchonete Belo Arco-Iris</h1>

<p align="center">
  Site institucional desenvolvido com React e Vite para a Lanchonete Belo Arco-Iris, no Jardim da Glória, São Paulo.
</p>

<p align="center">
  <img src="./public/assets/home.png" alt="Preview da página inicial" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white" alt="React Router">
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase">
</p>

---

## Sobre o projeto

Site institucional da Lanchonete Belo Arco-Iris, restaurante tradicional do Jardim da Glória, em São Paulo. Reúne cardápio, horário de funcionamento, localização, contato e avaliações de clientes em um só lugar.

A identidade visual segue as cores do cardápio impresso do estabelecimento: azul como cor principal, fundo branco e texto em preto.

## Funcionalidades

- Página inicial com apresentação da lanchonete, diferenciais e horário de funcionamento
- Cardápio completo em formato de dados (não é só uma imagem escaneada), com preços e fotos por prato
- Aviso automático do prato do dia na página inicial, de acordo com o dia da semana
- Carrossel de fotos do salão e da fachada
- Zoom nas imagens originais do cardápio e download em PDF
- Seção de avaliações de clientes (nome, nota, comentário e foto), com dados salvos no Firebase
- Localização integrada ao Google Maps
- Layout responsivo, com menu hambúrguer no celular
- Transições e animações com Framer Motion

## Tecnologias

- React
- Vite
- React Router DOM
- Framer Motion
- React Icons
- CSS Modules
- Firebase (Firestore e Authentication)

## Estrutura do projeto

```text
src/
├── assets/
│   └── logo.svg
├── components/
│   ├── About/
│   ├── Carousel/
│   ├── CTA/
│   ├── DailySpecial/
│   ├── Differentials/
│   ├── Footer/
│   ├── Hero/
│   ├── Hours/
│   ├── Lightbox/
│   ├── Navbar/
│   ├── PageTransition/
│   ├── Reviews/
│   └── ScrollToTop.jsx
├── pages/
│   ├── Home/
│   ├── Menu/
│   ├── Contact/
│   └── AdminReviews/
├── data/
│   ├── menu.json
│   └── fotosDoEstabelecimento.json
├── lib/
│   └── firebase.js
├── styles/
│   ├── global.css
│   └── tokens.css
├── App.jsx
└── main.jsx

public/
├── assets/
│   ├── menu/
│   ├── salao/
│   ├── cardapio-frente.svg
│   ├── cardapio-verso.svg
│   ├── cardapio-belo-arco-iris.pdf
│   └── favicon.svg
└── ...

firestore.rules
```

## Como executar

Pré-requisito: Node.js 18 ou superior.

```bash
git clone https://github.com/seu-usuario/Lanchonete-Belo-Arco-Iris.git
cd Lanchonete-Belo-Arco-Iris
npm install
npm run dev
```

O endereço do projeto aparece no terminal, normalmente `http://localhost:5173`.

Para gerar e testar o build de produção:

```bash
npm run build
npm run preview
```

## Cardápio

Todo o conteúdo do cardápio (pratos feitos, comerciais, pratos do dia, lanches, bebidas e porções) fica em `src/data/menu.json`. A página `/cardapio` lê esse arquivo e monta as seções, o menu de atalhos e a formatação dos preços automaticamente — não é necessário alterar nenhum componente para adicionar ou editar itens.

Estrutura do arquivo:

```json
{
  "categories": [
    {
      "id": "pratos-feitos",
      "title": "Pratos Feitos",
      "items": [
        { "name": "Picanha, Ovo, Arroz, Fritas e Salada", "price": 36.0 }
      ]
    },
    {
      "id": "bebidas",
      "title": "Bebidas",
      "subcategories": [
        { "title": "Sucos", "items": [{ "name": "Laranja", "price": 10.0 }] }
      ]
    },
    {
      "id": "pratos-do-dia",
      "title": "Pratos do Dia",
      "days": [
        { "day": "Segunda-Feira", "items": [{ "name": "Picadinho", "price": 25.0 }] }
      ]
    }
  ]
}
```

- Categorias simples (Pratos Feitos, Comerciais, Lanches, Porções) usam `items`.
- Bebidas usa `subcategories`, para separar sucos de refrigerantes.
- Pratos do Dia usa `days`, com os itens de cada dia da semana.
- Um preço como `null` faz o site mostrar um travessão no lugar do valor.

Para adicionar um item novo, basta copiar o formato `{ "name": "...", "price": null }` dentro da categoria correspondente.

### Fotos dos pratos

Qualquer item pode ter uma foto, com o campo `image`:

```json
{ "name": "Feijoada Prato Feito", "price": 35.0, "image": "/assets/menu/feijoada-prato-feito.jpg" }
```

As imagens ficam em `public/assets/menu/`. A página do cardápio tem um botão "Ver com fotos", fixo no canto da tela: quando ativo, todo item com `image` mostra a foto ao lado do nome (clicável, com zoom); itens sem foto continuam aparecendo normalmente.

Recomendações antes de adicionar uma foto nova:

- Redimensionar para no máximo 900px de largura.
- Recortar em proporção 4:3, para manter o padrão das demais fotos.
- Salvar em `.jpg`, qualidade entre 75% e 80% — normalmente reduz o arquivo para menos de 100KB sem perda visível.

Ferramentas como [squoosh.app](https://squoosh.app) fazem essa otimização gratuitamente.

### Fotos do estabelecimento (carrossel)

O carrossel da página inicial é alimentado por `src/data/fotosDoEstabelecimento.json` e passa as fotos automaticamente, com navegação manual por setas ou indicadores.

Para adicionar uma foto:

1. Salvar o arquivo em `public/assets/salao/`.
2. Adicionar uma entrada no JSON:
   ```json
   { "src": "/assets/salao/salao-3.jpg", "alt": "Descrição da foto" }
   ```

Mesma recomendação de otimização: até 1400px de largura, `.jpg`, qualidade 75-80%.

## Avaliações dos clientes

A página inicial tem uma seção pública de avaliações (nome, nota de 1 a 5 estrelas, comentário e foto opcional), usando Firebase Firestore. Qualquer visitante pode publicar uma avaliação, que aparece imediatamente para os demais — não há fila de aprovação.

As fotos são comprimidas no navegador antes do envio (480px de largura, qualidade 60%) e guardadas como texto (base64) dentro do próprio documento do Firestore, sem depender do Firebase Storage — que passou a exigir o plano pago (Blaze) para ser habilitado. Isso mantém o recurso inteiramente no plano gratuito (Spark).

### Moderação

Não existe fila de aprovação. Para remover uma avaliação:

- Pelo Console do Firebase, em Firestore Database, coleção `reviews`; ou
- Pela página interna `/gerenciar-avaliacoes`, que lista as avaliações com um botão de exclusão em cada uma.

Essa página não aparece em nenhum menu do site e não exige login — ela autentica de forma anônima apenas para ter permissão de exclusão nas regras do Firestore.

### Segurança

Pontos relevantes sobre as regras em `firestore.rules`:

- Criação de avaliações exige exatamente os campos esperados (`name`, `rating`, `comment`, `photo`, `createdAt`) — nenhum campo extra é aceito, e `createdAt` precisa ser a hora real do servidor, o que impede datas forjadas.
- A exclusão está liberada para qualquer sessão autenticada, incluindo anônima. Essa é uma decisão consciente: como o login anônimo fica disponível para o site inteiro, qualquer visitante que abra o console do navegador também consegue autenticar-se e excluir avaliações, sem precisar sequer conhecer o endereço da página interna. A alternativa mais segura — login de e-mail e senha apenas para o responsável pelo site, com uma permissão especial de administrador — foi avaliada e não foi adotada, para não haver nenhuma tela de login no site. Caso essa decisão mude no futuro, a correção é pontual e não afeta o restante do site.
- Não há proteção contra envio automatizado (bots). Se isso se tornar um problema, o Firebase App Check (gratuito, não exige o plano Blaze) é a forma recomendada de mitigar.
- As chaves do Firebase em `src/lib/firebase.js` são públicas por natureza — todo site que usa Firebase as expõe no navegador. A proteção real dos dados está nas regras do Firestore, não no sigilo dessas chaves. Não há nenhuma chave de servidor ou credencial sensível neste projeto.

## Informações da lanchonete

**Lanchonete Belo Arco-Iris**

Rua Inglês de Sousa, 305 — Jardim da Glória, São Paulo/SP — CEP 01546-010

Telefone: (11) 3539-4944

Horário de funcionamento:

| Dia | Horário |
|---|---|
| Segunda a sexta-feira | 07:00 às 20:00 |
| Sábado | 07:30 às 15:00 |
| Domingo | Fechado |

---

## Desenvolvedor

Desenvolvido por José Diogo.

[jose-diogo.vercel.app](https://jose-diogo.vercel.app/)