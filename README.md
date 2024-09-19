# :checkered_flag:  Loja de Filmes
Uma loja online para venda de filmes


## :technologist: Membros da equipe

Pedro Henrique Gomes Lima 538588

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

Usuário não registrado

Usuário registrado

Administrador

## :spiral_calendar: Entidades ou tabelas do sistema

Usuário não registrado

Usuário registrado

Administrador

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

Usuário não logado poderá ver o catálogo e ver os detalhes do filme e uma descrição dele.

Usuário não logado poderá ver o catálogo e ver os detalhes do filme e uma descrição dele. Além disso
ele pode adicionar filmes no carrinho. 

O adminstrador pode controlar a loja: adicionando, removendo e editando os filmes.


----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

vue.js

**Backend:**

Typescript, Node.js, Express


## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Usuário |  |  X  |   | X |
| Admin | X | X |  X | X |
| CART |  |   | X | X |


## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | http://localhost:3000/movies/ |
| POST | http://localhost:3000/users/login |
| POST | 'http://localhost:3000/movies/ |
| POST | 'http://localhost:3000/movies/ |
| DELETE | http://localhost:3000/movies/getCart/${userStore.user.id} |
| GET | http://localhost:3000/movies/getCart/${userStore.user.id} |
| GET | http://localhost:3000/movies/${id} |
| POST | http://localhost:3000/movies/addToCart |

## Comandos para rodas e observações
Backend: node app.js
Frontend: npm run serve

A página de adicionar filmes só tem acesso digitando a URL: http://localhost:8080/addMovie
