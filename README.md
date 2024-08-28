# Kompasu
Esta API foi desenvolvida para o Kompasu, uma aplicação desenvolvida para a cadeira de Projeto Integrado I, da Universidade Federal do Ceará (UFC). O Kompasu é uma plataforma de e-learning que tem como principal objetivo ensinar a desenvolvedores web (iniciantes e intermediários) sobre acessibilidade web. 

## Sobre a API
A estrutura desta API segue o padrão RESTful e foi desenvolvida utilizando o framework Fastify e TypeScript. O código foi estrurado de uma forma similar ao padrão MVC (Model-View-Controller), com a separação de rotas, controladores e modelos. Além disso, foi utilizado o Prisma como ORM para o gerenciamento e a comunicação com o banco de dados PostgreSQL. O Docker foi utilizado para a criação de um container para a própria aplicação e para o banco de dados PostgreSQL (Docker Compose). O Swagger foi utilizado para a documentação da API.

## Tecnologias Utilizadas
- Node.js
- Fastify
- TypeScript
- Prisma
- Docker
- PostgreSQL
- Swagger
- Nodemailer
- JWT

## Diagrama Entidade-Relacionamento
![Diagrama Entidade-Relacionamento](er-diagram.png)

## Instalação
1. Clone este repositório
```bash
git clone https://github.com/JoaoBarroso4/api-projeto.git
```
2. Instale as dependências
```bash
npm install
```
3. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
```bash
DATABASE_URL="postgresql://<user>:<password
>@<host>:<port>/<database>"
JWT_SECRET="<secret>"
JWT_EXPIRATION="<time>"
PORT=<port>
NODEMAILER_USER="<user>"
NODEMAILER_PASSWORD="<password>"
EMAIL_PORT=<email_port>
EMAIL_HOST="<host>"
```
4. Crie o container do banco de dados
```bash
docker-compose up -d
```
5. Execute as migrações do banco de dados
```bash
npx prisma migrate dev
```
6. Inicie a aplicação
```bash
npm run start
```
A aplicação estará disponível em `http://localhost:<port>`. Documentação em `http://localhost:<port>/docs`.

## Rotas
### Usuários
- `POST /user`: Cria um novo usuário
- `POST /user/login`: Autentica um usuário
- `GET /user{email}`: Busca um usuário pelo email
- `PUT /user{user_id}`: Atualiza um usuário por id
- `PUT /user/password`: Atualiza a senha de um usuário

### Níveis
- `GET /level`: Busca todos os níveis
- `GET /level{level_id}`: Busca um nível por id

### Lições
- `GET /lesson{lesson_id}`: Busca uma lição por id
- `GET /lesson/level{level_id}`: Busca todas as lições de um nível
- `GET /lesson/unit{unit_id}`: Busca todas as lições de uma unidade
- `GET /lesson/session{session_id}`: Busca todas as lições de uma sessão
- `POST /lesson`: Cria uma nova lição
- `PUT /lesson/finish{lesson_id}`: Finaliza uma lição

### Unidades
- `GET /unit`: Busca todas as unidades
- `GET /unit{unit_id}`: Busca uma unidade por id
- `GET /unit/session{session_id}`: Busca todas as unidades de uma sessão
- `POST /unit`: Cria uma nova unidade
- `PUT /unit/finish{unit_id}`: Finaliza uma unidade

### Explicações
- `GET /explanation{lesson_id}`: Busca todas as explicações de uma lição
- `POST /explanation`: Cria uma nova explicação

## Produção
A aplicação está disponível em produção no Railway:...