# Desafio gerenciador de tarefas ESIG

## Luiz Gustavo da Silva

### Links

link do site hospedado no Netify:

https://main--lucent-empanada-e79c23.netlify.app/todopage

OBS.: Desculpe pelo link estranho, isso ocorreu porque não comprei um domínio para o site.

### Resumo

Projeto criado para a resolução do desafio de estágio front-end da empresa ESIG. O objetivo desse projeto é desenvolver um gerenciador de tarefas simples. A aplicação permitirá aos usuários criar,  atualizar, remover e listar uma tarefa.


### Instruções para uso da aplicação/descrição do que foi feito

Ao acessar a aplicação, os usuários serão recebidos por uma tela de login, onde poderão autenticar-se e entrar na aplicação. Utilize o seguinte email: luiz@gmail.com e senha: 1234 para realizar a autenticação.

Após o login bem-sucedido, os usuários serão redirecionados para um painel de controle (dashboard), onde poderão visualizar uma tabela com as tarefas em andamento. Além disso, haverá uma barra lateral com um botão para adicionar uma nova tarefa e um elemento de "accordion" contendo opções de filtro.

Os usuários poderão filtrar as informações da tabela usando o filtro, que permite combinar ou pesquisar separadamente por número, situação, título/descrição e responsável.

Na coluna "Action" da tabela, os usuários terão opções para editar, excluir e concluir uma tarefa. Ao excluir uma tarefa, ela será removida do banco de dados e não poderá mais ser acessada. Ao concluir uma tarefa, ela será removida da lista inicial, mas poderá ser encontrada utilizando o filtro de "situação".

Ao lado da coluna "Action", há uma coluna "Detalhes", que permite ao usuário visualizar todas as informações relacionadas a uma determinada tarefa.
  

### Itens feitos

- a) Criei uma aplicação SPA utilizando Angular na versão mais recente.

- b) Usei o In Memory BD para simulação do back-end da aplicação.

- d) Criei algumas telas/modais extras, sendo elas o modal detalhes e a tela de login.

- g) Recurso de acessibilidade alto constraste (Para pessoas com baixa visão).

### Acessibilidade

![Texto Alternativo](./src/assets/acessibilidade%20avalia%C3%A7%C3%A3o.png)

Sendo a acessibilidade um recurso extremamente importante, considerei a inclusão de todos os usuários ao desenvolver esta aplicação. A imagem acima é um teste automatizado realizado com a ferramenta Accessibility Insights, que avalia recursos de acessibilidade. Como demonstrado, não foram encontradas falhas que comprometam a inclusão de pessoas com deficiência. Os testes manuais também não apresentaram erros.

Além disso, considerando também as necessidades das pessoas com baixa visão, implementei o recurso de alto contraste, que proporciona uma leitura mais acessível das informações (para ativá-lo, basta clicar no segundo botão à esquerda da página).

### Passo a passo para rodar o programa localmente

Este guia fornece um passo a passo para clonar e executar um projeto Angular a partir de um repositório Github.

### Pré-requisitos

- Node.js instalado no sistema
- Angular CLI instalado globalmente

### Passos

1. **Clonar o repositório**:  

`git clone https://github.com/Luiz-gustavo-da-silva/to-do_list_esig.git`

2. **Navegue até o diretório criado**

`cd to-do_list_esig`

3. **Instalar as dependências**:

`npm install`

4. **Iniciar o servidor de desenvolvimento**:

`ng serve`

Isso iniciará o servidor de desenvolvimento e irá compilar e servir o projeto Angular localmente.

5. **Acessar o projeto**: Por padrão o projeto abri na porta 4200, mas pode abrir em outra porta:

`http://localhost:4200`


