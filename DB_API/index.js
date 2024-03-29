const express = require('express');
const app = express();
const cors = require('cors'); // Importing the cors module
const { exec } = require('child_process');

// Defining movie and user data
const moviesInfo = [
	{
		"id": 1,
		"categoria": "filme",
		"title": "John Wick 3: Parabellum",
		"releaseYear": 2019,
		"image": "https://s3-alpha-sig.figma.com/img/154e/382f/b7e8be84d7248b8b9812172cad1cd0c9?Expires=1694390400&Signature=VVlr6nNJi1iCRZlooI99XOSOwje1juyxek8HQ7to2gWdN5foBY-P1bJ5FX~TXZokQm5Dmga2wyINzPHUMHnmDy-BbgwIeY7y0obGD2qL~iGHFibBTEj2KA6ppMMg-Ga0-OGOkRs8Y~B9btYSuy-6gNXDt0l6cg0w2Xtl4sMir33rGqOWyloFlMbPztIgFM~9mLM1dPLijyYv7SkJbo5V2Hiqg5mVZCKH9mJwnd0QqfbZ9mIU-5v9bkQF2VwVm3ayVG5~yzYScAPG6z~QxFu0zUsZo-RegDz4Gi6TmEOjXOS~L8dfkrZ~BAcoDRq6FwILs~YGsW3AWf39hJpom2b9bA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		"genre": [
		  "Ação",
		  "Crime",
		  "Suspense"
		],
		"director": "Chad Stahelski",
		"actors": [
		  "Keanu Reeves",
		  "Halle Berry"
		],
		"rating": 7.4,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Após matar um membro da alta cúpula da guilda de assassinos, John Wick se torna um alvo de 14 milhões de dólares para os assassinos profissionais em todo o mundo. Agora, ele deve lutar por sua sobrevivência enquanto busca uma maneira de sair dessa situação mortal.",
		"duracao": "2h 10min",
		"classificacao": "18 anos"
	  },
	  {
		"id": 2,
		"categoria": "filme",
		"title": "O Poderoso Chefão",
		"releaseYear": 1972,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Crime",
		  "Drama"
		],
		"director": "Francis Ford Coppola",
		"actors": [
		  "Marlon Brando",
		  "Al Pacino"
		],
		"rating": 9.2,
		"iframe": "#",
		"favorito": false,
		"sinopse": "No submundo do crime em Nova Iorque, Don Vito Corleone, um poderoso chefe da máfia, lida com negócios ilícitos enquanto tenta manter sua família unida. Quando seu filho Michael é arrastado para o mundo do crime, uma série de eventos desencadeia uma guerra entre famílias rivais, ameaçando o equilíbrio precário que o Don conseguiu alcançar.",
		"duracao": "2h 55min",
		"classificacao": "16 anos"
	  },
	  {
		"id": 3,
		"categoria": "filme",
		"title": "Um Sonho de Liberdade",
		"releaseYear": 1994,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Drama"
		],
		"director": "Frank Darabont",
		"actors": [
		  "Tim Robbins",
		  "Morgan Freeman"
		],
		"rating": 9.3,
		"iframe": "#",
		"favorito": false,
		"sinopse": "Andy Dufresne, um banqueiro injustamente condenado por assassinato, é enviado para a Penitenciária Estadual de Shawshank. Lá, ele forma laços improváveis com outros detentos, incluindo Red. Ao longo dos anos, Andy usa sua inteligência e determinação para enfrentar a vida na prisão, buscando ao mesmo tempo provar sua inocência. Um drama emocionante sobre amizade, esperança e a busca pela liberdade.",
		"duracao": "2h 22min",
		"classificacao": "14 anos"
	  },
	  {
		"id": 4,
		"categoria": "filme",
		"title": "O Senhor dos Anéis: O Retorno do Rei",
		"releaseYear": 2003,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Ação",
		  "Aventura",
		  "Fantasia"
		],
		"director": "Peter Jackson",
		"actors": [
		  "Elijah Wood",
		  "Viggo Mortensen"
		],
		"rating": 8.9,
		"iframe": "#",
		"favorito": false,
		"sinopse": "Na conclusão épica da trilogia, Frodo e Sam continuam sua perigosa jornada em direção à Montanha da Perdição, enquanto a batalha final pelo controle da Terra Média se desenrola. Aragorn deve aceitar seu destino como rei, e todos os povos livres se unem para enfrentar as forças das trevas de Sauron. Uma história de coragem, amizade e sacrifício que determinará o destino do mundo.",
		"duracao": "3h 30min",
		"classificacao": "14 anos"
	  },
	  {
		"id": 5,
		"categoria": "filme",
		"title": "O Rei Leão",
		"releaseYear": 1994,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Animação",
		  "Aventura",
		  "Drama"
		],
		"director": "Roger Allers, Rob Minkoff",
		"actors": [
		  "Matthew Broderick",
		  "Jeremy Irons"
		],
		"rating": 8.5,
		"iframe": "#",
		"favorito": false,
		"sinopse": "Simba, um jovem leão destinado a se tornar rei, é injustamente acusado da morte de seu pai, Mufasa. Exilado, Simba cresce longe de sua terra natal até que um encontro inesperado o lembra de sua verdadeira identidade e responsabilidades. Ele deve enfrentar seu passado e reivindicar seu lugar de direito como rei da Pedra do Reino. Uma jornada de autodescoberta e redenção.",
		"duracao": "1h 18min",
		"classificacao": "Livre"
	  },
	  {
		"id": 6,
		"categoria": "filme",
		"title": "Interestelar",
		"releaseYear": 2014,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Aventura",
		  "Drama",
		  "Ficção Científica"
		],
		"director": "Christopher Nolan",
		"actors": [
		  "Matthew McConaughey",
		  "Anne Hathaway"
		],
		"rating": 8.6,
		"iframe": "#",
		"favorito": false,
		"sinopse": "Em um futuro onde a Terra está à beira do colapso ambiental, um grupo de exploradores é enviado em uma missão interestelar para encontrar um novo lar para a humanidade. Enfrentando distâncias astronômicas e fenômenos cósmicos desconhecidos, eles exploram planetas alienígenas em busca de esperança. Uma narrativa emocionante sobre amor, sacrifício e a luta pela sobrevivência da humanidade.",
		"duracao": "2h 48min",
		"classificacao": "12 anos"
	  },
	  {
		"id": 7,
		"categoria": "filme",
		"title": "Cidadão Kane",
		"releaseYear": 1941,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Drama",
		  "Mistério"
		],
		"director": "Orson Welles",
		"actors": [
		  "Orson Welles",
		  "Joseph Cotten"
		],
		"rating": 8.4,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "O magnata da mídia Charles Foster Kane deixa para trás um império após sua morte. Um repórter é designado para descobrir o significado de sua última palavra, 'Rosebud'. Ao explorar a vida de Kane, o filme revela os detalhes de sua ascensão ao poder e a complexidade de sua personalidade, explorando temas como ambição e solidão.",
		"duracao": "1h 59min",
		"classificacao": "16 anos"
	  },
	  {
		"id": 8,
		"categoria": "filme",
		"title": "Matrix",
		"releaseYear": 1999,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Ação",
		  "Ficção Científica"
		],
		"director": "The Wachowskis",
		"actors": [
		  "Keanu Reeves",
		  "Laurence Fishburne"
		],
		"rating": 8.7,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Um jovem hacker chamado Neo descobre que a realidade que ele conhece é uma simulação criada por máquinas para manter a humanidade sob controle. Ele se junta a um grupo de rebeldes para lutar contra as máquinas e despertar a humanidade. O filme é conhecido por suas cenas de ação inovadoras e por explorar filosofias sobre realidade e existência.",
		"duracao": "2h 16min",
		"classificacao": "14 anos"
	  },
	  {
		"id": 9,
		"categoria": "filme",
		"title": "Pulp Fiction: Tempo de Violência",
		"releaseYear": 1994,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Crime",
		  "Drama"
		],
		"director": "Quentin Tarantino",
		"actors": [
		  "John Travolta",
		  "Samuel L. Jackson"
		],
		"rating": 8.9,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "O filme interliga várias histórias de criminosos, boxeadores, assassinos e outros personagens enquanto eles navegam por situações bizarras e violentas. A narrativa não linear, diálogos memoráveis e cenas icônicas fizeram de Pulp Fiction um clássico cult.",
		"duracao": "2h 34min",
		"classificacao": "18 anos"
	  },
	  {
		"id": 10,
		"categoria": "filme",
		"title": "Clube da Luta",
		"releaseYear": 1999,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Drama",
		  "Psicológico"
		],
		"director": "David Fincher",
		"actors": [
		  "Brad Pitt",
		  "Edward Norton"
		],
		"rating": 8.8,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Um homem desiludido forma um clube de combate subterrâneo como uma forma de liberar suas frustrações e raiva. No entanto, as coisas saem de controle quando o clube evolui para algo mais sinistro e desafiador. Um filme que examina a alienação moderna e as complexidades da psique humana.",
		"duracao": "2h 19min",
		"classificacao": "16 anos"
	  },
	  {
		"id": 11,
		"categoria": "filme",
		"title": "O Iluminado",
		"releaseYear": 1980,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Drama",
		  "Terror"
		],
		"director": "Stanley Kubrick",
		"actors": [
		  "Jack Nicholson",
		  "Shelley Duvall"
		],
		"rating": 8.4,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Baseado no romance de Stephen King, o filme segue um escritor e sua família enquanto eles cuidam de um hotel isolado durante o inverno. A solidão e o isolamento começam a afetar a sanidade do escritor, levando-o a uma espiral descendente de loucura e violência.",
		"duracao": "2h 26min",
		"classificacao": "16 anos"
	  },
	  {
		"id": 12,
		"categoria": "filme",
		"title": "A Lista de Schindler",
		"releaseYear": 1993,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Biografia",
		  "Drama",
		  "História"
		],
		"director": "Steven Spielberg",
		"actors": [
		  "Liam Neeson",
		  "Ralph Fiennes"
		],
		"rating": 8.9,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Oskar Schindler, um empresário alemão, usa sua fábrica como um refúgio para judeus durante o Holocausto. Ele salva a vida de mais de mil pessoas, mas luta com o peso da responsabilidade e o horror da guerra. Baseado em eventos reais, o filme retrata um ato extraordinário de humanidade em meio à atrocidade.",
		"duracao": "3h 15min",
		"classificacao": "16 anos"
	  },
	  {
		"id": 13,
		"categoria": "filme",
		"title": "Interestelar",
		"releaseYear": 2014,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Aventura",
		  "Drama",
		  "Ficção Científica"
		],
		"director": "Christopher Nolan",
		"actors": [
		  "Matthew McConaughey",
		  "Anne Hathaway"
		],
		"rating": 8.6,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Em um futuro onde a Terra está à beira do colapso ambiental, um grupo de exploradores é enviado em uma missão interestelar para encontrar um novo lar para a humanidade. Enfrentando distâncias astronômicas e fenômenos cósmicos desconhecidos, eles exploram planetas alienígenas em busca de esperança. Uma narrativa emocionante sobre amor, sacrifício e a luta pela sobrevivência da humanidade.",
		"duracao": "2h 48min",
		"classificacao": "12 anos"
	  },
	  {
		"id": 14,
		"categoria": "filme",
		"title": "A Origem",
		"releaseYear": 2010,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Ação",
		  "Aventura",
		  "Ficção Científica"
		],
		"director": "Christopher Nolan",
		"actors": [
		  "Leonardo DiCaprio",
		  "Joseph Gordon-Levitt"
		],
		"rating": 8.8,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Dom Cobb é um ladrão habilidoso que invade os sonhos das pessoas para roubar informações valiosas. Ele é oferecido uma chance de redenção: realizar uma 'inserção', que envolve implantar uma ideia na mente de alguém. O filme explora o poder da mente humana, a realidade subjetiva e as ramificações morais da manipulação.",
		"duracao": "2h 28min",
		"classificacao": "14 anos"
	  },
	  {
		"id": 15,
		"categoria": "filme",
		"title": "Cidade de Deus",
		"releaseYear": 2002,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Ação",
		  "Crime",
		  "Drama"
		],
		"director": "Fernando Meirelles, Kátia Lund",
		"actors": [
		  "Alexandre Rodrigues",
		  "Leandro Firmino"
		],
		"rating": 8.6,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Baseado em fatos reais, o filme segue a vida de jovens na favela Cidade de Deus, no Rio de Janeiro. Enquanto alguns tentam escapar da violência e da criminalidade, outros são puxados para o mundo do crime. A narrativa complexa e a cinematografia impressionante destacam a dura realidade da vida nas favelas.",
		"duracao": "2h 10min",
		"classificacao": "18 anos"
	  },
	  {
		"id": 16,
		"categoria": "anime",
		"title": "Naruto",
		"releaseYear": 2002,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Ação",
		  "Aventura",
		  "Fantasia"
		],
		"director": "Hayato Date",
		"actors": [
		  "Junko Takeuchi",
		  "Maile Flanagan"
		],
		"rating": 8.3,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Naruto é um jovem ninja que busca se tornar o mais poderoso ninja de sua aldeia, a Aldeia da Folha. Ele enfrenta desafios, inimigos e busca conquistar o respeito de seus colegas ninja.",
		"duracao": "24 min por episódio",
		"classificacao": "14 anos"
	  },
	  {
		"id": 17,
		"categoria": "anime",
		"title": "One Piece",
		"releaseYear": 1999,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Ação",
		  "Aventura",
		  "Comédia"
		],
		"director": "Kōnosuke Uda",
		"actors": [
		  "Mayumi Tanaka",
		  "Akemi Okamura"
		],
		"rating": 8.7,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Monkey D. Luffy e sua tripulação pirata procuram pelo lendário tesouro conhecido como 'One Piece'. Eles enfrentam perigos e inimigos em sua jornada pelo Grande Mar.",
		"duracao": "24 min por episódio",
		"classificacao": "12 anos"
	  },
	  {
		"id": 18,
		"categoria": "anime",
		"title": "Death Note",
		"releaseYear": 2006,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Mistério",
		  "Crime",
		  "Psicológico"
		],
		"director": "Tetsurō Araki",
		"actors": [
		  "Mamoru Miyano",
		  "Kappei Yamaguchi"
		],
		"rating": 9,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Um estudante encontra um caderno capaz de matar qualquer pessoa cujo nome seja escrito nele. Ele decide usá-lo para eliminar criminosos, mas atrai a atenção de um detetive genial chamado L.",
		"duracao": "23 min por episódio",
		"classificacao": "16 anos"
	  },
	  {
		"id": 19,
		"categoria": "anime",
		"title": "Attack on Titan",
		"releaseYear": 2013,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Ação",
		  "Drama",
		  "Fantasia"
		],
		"director": "Tetsurō Araki",
		"actors": [
		  "Yuki Kaji",
		  "Yui Ishikawa"
		],
		"rating": 8.9,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "A humanidade enfrenta a ameaça dos Titãs, criaturas gigantes que devoram seres humanos. Eren Yeager e seus amigos se juntam às forças militares para combater essa ameaça.",
		"duracao": "24 min por episódio",
		"classificacao": "18 anos"
	  },
	  {
		"id": 20,
		"categoria": "anime",
		"title": "My Hero Academia",
		"releaseYear": 2016,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Ação",
		  "Aventura",
		  "Superpoderes"
		],
		"director": "Kenji Nagasaki",
		"actors": [
		  "Daiki Yamashita",
		  "Kenta Miyake"
		],
		"rating": 8.4,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Em um mundo onde a maioria da população possui superpoderes, um jovem chamado Izuku Midoriya luta para se tornar um herói e enfrenta desafios para provar seu valor.",
		"duracao": "24 min por episódio",
		"classificacao": "12 anos"
	  },
	  {
		"id": 21,
		"categoria": "serie",
		"title": "Game of Thrones",
		"releaseYear": 2011,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Fantasia",
		  "Drama",
		  "Ação"
		],
		"director": "Vários diretores",
		"actors": [
		  "Emilia Clarke",
		  "Kit Harington"
		],
		"rating": 9.3,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Uma luta pelo trono de ferro em Westeros, onde famílias nobres conspiram e guerreiam pelo controle dos Sete Reinos.",
		"duracao": "55 min por episódio",
		"classificacao": "18 anos"
	  },
	  {
		"id": 22,
		"categoria": "serie",
		"title": "Stranger Things",
		"releaseYear": 2016,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Ficção Científica",
		  "Terror",
		  "Suspense"
		],
		"director": "Vários diretores",
		"actors": [
		  "Millie Bobby Brown",
		  "Winona Ryder"
		],
		"rating": 8.7,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Em uma cidade pequena, crianças enfrentam forças sobrenaturais e um laboratório secreto enquanto procuram por um amigo desaparecido.",
		"duracao": "50 min por episódio",
		"classificacao": "16 anos"
	  },
	  {
		"id": 23,
		"categoria": "serie",
		"title": "Breaking Bad",
		"releaseYear": 2008,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Crime",
		  "Drama",
		  "Suspense"
		],
		"director": "Vários diretores",
		"actors": [
		  "Bryan Cranston",
		  "Aaron Paul"
		],
		"rating": 9.5,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Um professor de química vira um fabricante de metanfetamina após ser diagnosticado com câncer terminal, e ele se envolve no submundo do crime.",
		"duracao": "47 min por episódio",
		"classificacao": "18 anos"
	  },
	  {
		"id": 24,
		"categoria": "serie",
		"title": "The Crown",
		"releaseYear": 2016,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Drama",
		  "História",
		  "Biografia"
		],
		"director": "Vários diretores",
		"actors": [
		  "Olivia Colman",
		  "Tobias Menzies"
		],
		"rating": 8.6,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "A história do reinado da Rainha Elizabeth II, explorando os desafios políticos e pessoais que ela enfrentou ao longo dos anos.",
		"duracao": "58 min por episódio",
		"classificacao": "16 anos"
	  },
	  {
		"id": 25,
		"categoria": "serie",
		"title": "Black Mirror",
		"releaseYear": 2011,
		"image": "https://i.imgur.com/eMsr58c.png",
		"genre": [
		  "Drama",
		  "Ficção Científica",
		  "Suspense"
		],
		"director": "Vários diretores",
		"actors": [
		  "Bryce Dallas Howard",
		  "Daniel Kaluuya"
		],
		"rating": 8.8,
		"iframe": "URL_DO_IFRAME",
		"favorito": false,
		"sinopse": "Uma série de antologia que explora uma realidade distópica e as implicações da tecnologia moderna na sociedade.",
		"duracao": "60 min por episódio",
		"classificacao": "16 anos"
	  }
];

const usersInfo = [
	{
		"name": "Administrador",
		"email": "admin@startCine.com",
		"username": "admin",
		"password": "123",
		"confirmPassword": "123",
		"type": "admin",
		"id": 1
	},
	{
		"name": "user",
		"username": "user",
		"password": "123",
		"email": "user@gmail.com",
		"confirmPassword": "123",
		"type": "user",
		"id": 2
	}
];

// Middleware to allow JSON requests and enable CORS
app.use(express.json());
app.use(cors());

// Root route with documentation
app.get('/', (req, res) => {
	const documentation = {
		message: 'Bem-vindo(a) à API NodeJS do StartCine - StartTech',
		routes: {
			moviesInfo: '/api/movies-info',
			usersInfo: '/api/users-info'
		}
	};

	const htmlResponse = `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Documentação da API</title>
		</head>
		<body>
			<h1>${documentation.message}</h1>
			<h2>Rotas Disponíveis:</h2>
			<ul>
				<li><strong>Movies Info:</strong> <a href="${documentation.routes.moviesInfo}" target="_blank">${documentation.routes.moviesInfo}</a></li>
				<li><strong>Users Info:</strong> <a href="${documentation.routes.usersInfo}" target="_blank">${documentation.routes.usersInfo}</a></li> <!-- Added usersInfo route -->
			</ul>
		</body>
	</html>
	`;

	// Respond with the HTML page
	res.send(htmlResponse);
});

// Additional route for /api
app.get('/api', (req, res) => {
	res.send('API is up and running!');
});

// Route to get movies information
app.get('/api/movies-info', (req, res) => {
	res.json(moviesInfo);
});

// Route to get users information
app.get('/api/users-info', (req, res) => {
	res.json(usersInfo);
});

// Rota para retornar informações de um filme pelo ID
app.get('/api/movies-info/:id', (req, res) => {
	const movieId = parseInt(req.params.id);
	const movie = moviesInfo.find(movie => movie.id === movieId);
	if (!movie) {
		return res.status(404).send('Filme não encontrado');
	}
	res.json(movie);
});

// Rota para retornar informações de um filme baseado na categoria
app.get('/api/movies-info/categoria/:category', (req, res) => {
	const category = req.params.category.toLowerCase();
	let moviesInCategory;
	if (category === 'filme') {
		moviesInCategory = moviesInfo.filter(movie => movie.categoria === 'filme');
	} else {
		moviesInCategory = moviesInfo.filter(movie => movie.categoria === category);
	}
	if (moviesInCategory.length === 0) {
		return res.status(404).send('Nenhum filme encontrado para esta categoria');
	}
	res.json(moviesInCategory);
});



// Rota para retornar informações de um usuário pelo ID
app.get('/api/users-info/:id', (req, res) => {
	const userId = parseInt(req.params.id);
	const user = usersInfo.find(user => user.id === userId);
	if (!user) {
		return res.status(404).send('Usuário não encontrado');
	}
	res.json(user);
});

const server = app.listen(0, () => {
	const port = server.address().port;
	console.log(`API listening on port ${port}`);

	// Open the root route in the default web browser
	exec(`xdg-open http://localhost:${port}`);
});
