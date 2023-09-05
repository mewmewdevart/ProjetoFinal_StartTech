<div align="center">
  <img src="https://github.com/mewmewdevart/ProjetoFinal_StartTech/assets/50052600/9370dd31-bdc7-42da-8f5a-8d812b0c0998" width="250">
</div>


<p align="center">
	<b><i>Projeto Web de conclusão de curso do programa "Start &lt;Tech>" da Universidade TOTVS, em parceria com a Ada Tech e o Instituto da Oportunidade Social.</i></b><br>
</p>

<p align="center">
	<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/mewmewdevart/ProjetoFinal_StartTech?color=FFC603" />
	<img alt="Main language" src="https://img.shields.io/github/languages/top/mewmewdevart/ProjetoFinal_StartTech?color=FFC603"/>
	<img alt="License" src="https://img.shields.io/github/license/mewmewdevart/ProjetoFinal_StartTech?color=FFC603"/>
</p>

## Sobre o projeto
O StartCine+ tem como objetivo principal facilitar a pesquisa, visualização e administração de informações relacionadas a uma ampla variedade de conteúdo audiovisual, abrangendo filmes, séries e animes. A plataforma oferece aos usuários uma interface amigável e intuitiva que possibilita a busca de títulos específicos, a obtenção de detalhes completos sobre cada obra e até mesmo a gestão de uma lista de favoritos. <br>

O projeto visa criar uma experiência web envolvente e acessível para amantes de filmes, séries e animes, independentemente de serem consumidores ávidos ou casuais. Com o StartCine+, os usuários podem mergulhar no mundo do entretenimento audiovisual, explorando e desfrutando de uma ampla gama de conteúdo de forma conveniente e personalizada. <br>

Este projeto foi desenvolvido durante o programa Start &lt;Tech> da Universidade TOTVS, em parceria com a Ada Tech e o Instituto da Oportunidade Social. É importante destacar que o StartCine+ é um site fictício, criado exclusivamente para fins de estudo e prática, portanto, deve ser usado com moderação. <br>

## 💫 Implementações principais:
Principais funcionalidades e implementações do projeto:
- [x] Área de Cadastro e Login de Usuários: Foi implementada uma área onde os usuários podem se cadastrar e fazer login com segurança.
- [x] Listagem de Conteúdos: Listagem de conteúdos, como filmes, séries e animes, com fotos, títulos e links para os detalhes de cada conteúdo.
- [x] Função de Favoritar/Desfavoritar: Implementação de uma função que permite aos usuários marcar ou desmarcar conteúdos como favoritos, com uma lista de conteúdos favoritos disponível.
- [x] Formulário de Contato: Formulário de contato para que os usuários possam entrar em contato conosco.
- [x] Página de Detalhes: Paginas detalhadas para cada conteúdo, exibindo informações relevantes, como ano de lançamento, gênero, classificação, sinopse, entre outras.
- [x] Páginas de Categorias: Os conteúdos foram organizados em páginas dedicadas a cada tipo de conteúdo (animes, séries e filmes), proporcionando uma navegação intuitiva.
- [x] Página Administrativa: Foi criada uma página de administração que permite aos administradores realizar operações de CRUD (Create, Read, Update, Delete) em produtos.
- [x] Framework de Interfaces: Foram utilizados frameworks de interfaces como Material e Bootstrap para aprimorar a experiência do usuário.
- [x] Responsividade: O projeto foi projetado para ser responsivo, adaptando-se a diferentes dispositivos e tamanhos de tela. (porém depende).

## 💫 Implementações futuras
- [ ] Publicar o site na Web com um dominio personalizado.
- [ ] Realizar o Deploy de uma Api criada em C#, para que o banco de dados suporte maiores fluxos de acessos.
- [ ] Ampliar nossa acessibilidade, incluindo recursos como narração de texto e ferramentas de Libras, para atender às necessidades de todas as pessoas, promovendo uma experiência inclusiva e igualitária.
- [ ] Disponibilizar acesso gratuito limitado, permitindo que o público experimente nossos produtos antes de adquiri-los.
- [ ] Para o próximo Backlog, queremos implementar testes automatizados os quais tivemos contato e entendemos sua importância.
- [ ] Aprofundar ainda mais a Experiência do Usuário (UX Design), para um acesso maia fluído do usuário.


## Instruções  🔧

### Pré-Requisitos
Para executar o projeto, é necessário ter instalados em sua máquina os seguintes requisitos: [Node.js](https://nodejs.org/en), [Angular CLI](https://angular.io/cli) e [Json Server](https://www.npmjs.com/package/json-server). Após a instalação, é preciso também instalar as dependências do arquivo package.json. Para isso, digite o comando npm install após seguir os passos anteriores.

❗️| Certifique-se de que todas as ferramentas necessárias estejam instaladas em sua máquina local e, em seguida, prossiga com os seguintes passos. <br>

### Instruções para executar o projeto em sua máquina:

**0. Baixe os arquivos**

```bash
# Clone o repositorio
$ git clone https:/github.com/mewmewdevart/ProjetoFinal_StartTech.git

# Entre dentro da pasta clonada e do projeto
$ cd ProjetoFinal_StartTech/StartCine
```

**1. Instale as dependências**

```bash
npm install
```

**2. Rode o servidor**

```bash
ng serve
```

3. Iniciar o banco de dados
Em outro terminal, inicie o servidor da API REST falsa, o json-server em conjunto com o db.json:

```bash
json-server --watch db.json
```

**3. Retorne para o primeiro terminal, e acesse o link gerado no prompt no seu navegador web**
```bash
http://localhost:4200
```

❗️ | Caso queira acessar o painel de administração de conteudos publicos na plataforma, será necessario logar com o id: `admin` senha: `123` .

## Tecnologias
- [VS CODE](https://code.visualstudio.com/) | Ambiente de desenvolvimento integrado para escrever, ler e executar código do projeto com mais eficiência.
- [Git Bash](https://git-scm.com/downloads) | GitBash para realizar os commits.
- [Figma](https://www.figma.com/) | Figma para desenvolver alguns elementos da interface.
- [Bootstrap](https://getbootstrap.com/) | Bootstrap para ajudar na responsividade.
- [Material UI](https://material.angular.io/) | Implementação de componentes de interface.
- [Angular](https://angular.io/start) | Plataforma de aplicações Web.

## Referencias
- [Markdown](https://www.markdownguide.org/basic-syntax/) | Documentação de como utilizar o Markdown.
- [Documentação W3Schools](https://www.w3schools.com/) | Documentação e tutoriais praticos.
- [Figma Community](https://www.figma.com/community) | Inspiração na prototipação do projeto.
- +Forums e Blogs da internet para sanar as minhas duvidas relacionadas a linguagem (Alura, Stack Overflow e Geeks for geeks).

## 📜 Licença
Este projeto é licenciado sob os termos do arquivo [LICENÇA](LICENSE). Veja o arquivo para mais detalhes. <br>

<p align="center">
  Desenvolvido com muito ☕ por
  <a href="https://linktr.ee/guzius" target="_blank">Gustavo Sotrati Taques</a>,
  <a href="https://linktr.ee/joaoionafa" target="_blank">João Ionafa</a>,
  <a href="https://linktr.ee/JEduardoS" target="_blank">José Eduardo</a>,
  <a href="https://linktr.ee/mewmewdevart" target="_blank">Larissa Cristina Benedito</a> e
  <a href="https://linktr.ee/mrnho" target="_blank">Lucas da Silva Marinho</a>.
</p>


