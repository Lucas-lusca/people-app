## Sobre

Projeto desenvolvido utilizando React Native com Expo, como parte de um desafio técnico em um processo seletivo.

A aplicação consome dados de uma API externa (randomuser.me) e tem como objetivo demonstrar a estruturação de um app mobile, organização de código e integração com serviços externos.

## Como testar o projeto

Siga os passos abaixo para executar a aplicação em ambiente local.

Pré-requisitos:

- Ter o **Node.js** instalado na máquina
- Ter um smartphone com o app **Expo Go** instalado

Passo a passo:

1. Clone ou baixe este repositório para sua máquina
2. Instale as dependências do projeto:

   ```bash
   npx expo start
   ```

3. Inicie o projeto com o comando:

   ```bash
   npx expo start
   ```

Se tudo estiver correto, um QRCode será apresentado no terminal, basta ler com a câmera do seu smartphone e a aplicação será aberta.

## Decisões técnicas

- Foi utilizado **Axios** para realizar as requisições HTTP, por ser uma biblioteca consolidada e com amplo suporte na comunidade.
- Inicialmente, o projeto foi estruturado utilizando **Expo Router**, porém, devido aos requisitos do desafio, a navegação foi migrada para **React Navigation**.

## Desafios encontrados

A parte mais complexa do desenvolvimento foi a implementação e organização das rotas.

Pessoalmente, acho complexo as opções de lidar com rotas disponíveis em projetos React Native Expo.

Atualmente, existe um bug relacionado às rotas que ainda não foi resolvido, devido à falta de domínio mais avançado sobre. Basicamente quando acessado o menu de perfil vindo da tela de chat, aparece no botão de voltar a tela de Feed, sendo que deveria mostrar a última tela acessada.

## Persistência de dados

Pensei em utilizar **SQLite** para armazenamento local do chat e mensagens. No entanto, com o objetivo de manter o projeto mais simples, decidi seguir utilizando arrays.

## Observações

O desenvolvimento contou com o auxílio do ChatGPT, para a criação de interfaces, rotas de navegação e uso de `specialized hooks`, área na qual ainda estou em processo de aprendizado.
