# Change Log

Lista de atualizações da Extensão.

## 2.4.2

- Corrige o snippet fluig-pai-filho-nobuttons;
- Remove a mensagem "Para Fluig anterior ao 1.8.2 utilize a versão antiga da Extensão." nos erros de exportar Widget;

## 2.4.1

Informa erro ao não encontrar o arquivo .war da widget na importação de widget.

## 2.4.0

Efetua correções tipográficas e adiciona os seguintes snippets.

- fluig-checkbox-switch;
- fluig-pai-filho;
- fluig-pai-filho-nobuttons;
- fluig-pai-filho-panel;

## 2.3.0

Adiciona o comando "Atualizar Evento de Processo", o qual permite atualizar um evento de processo
sem a necessidade de mudar a versão do processo no servidor Fluig, além de permitir atualizar eventos
de versões anteriores.

## 2.2.0

Adicona os comandos "Exportar Fluiggers Widget" e "Importar Widget".

A "Fluiggers Widget" é uma widget criada pela comunidade Fluiggers para permitir executar comandos diretamente
no servidor Fluig. Seu código fonte está no repositório [fluig-widget-helper](https://github.com/fluiggers/fluig-widget-helper).

O comando "Importar Widget" permite importar várias widgets do servidor Fluig, porém para executá-lo é
necessário ter enviado a "Fluiggers Widget" para o servidor Fluig.

Agora ao importar Datasets se for identificado que ele já existe em alguma sub-pasta da `datasets` ele será
sobreescrito ao invés de importar um novo arquivo na pasta datasets.

## 2.1.0

Adiciona o comando "Exportar Datasets da Pasta". Esse comando permite exportar vários datasets de uma pasta
selecionada, incluindo a própria pasta `datasets`.

Adiciona barra de progresso a todos os comandos de importação/exportação de vários itens de uma vez.

## 2.0.0

**IMPORTANTE**: A partir desta versão a Extensão perde suporte à versão 1.8.1 do Fluig.

A partir do Fluig 1.8.2 as APIs REST perderam, por padrão, a possibilidade de enviar a autenticação
como parâmetro da URL, sendo obrigatório enviar um Cookie de autenticação no cabeçalho da requisição.

Este comportamento não é suportado por todos os endpoints do Fluig 1.8.1, por isso não indicamos usar
essa extensão em versões anteriores do Fluig 1.8.2.

Para continuar utilizando com o Fluig 1.8.1 instale a Extensão anterior à versão 2.0.0 e desabilite a
atualização automática.

- Criado um novo serviço para Login, evitando passar a senha pela URL.

## 1.28.1

Corrige tipo de mensagem ao informar erro de exportação de dataset (agora é mensagem de erro ao invés de informação).

## 1.28.0

Adiciona o comando Exportar Widget.

## 1.27.0

### Importante

A partir desta versão a Extensão não mais atualizará automaticamente a criptografia das senhas salvas
na configuração de servidores da versão 0.0.1 para a versão 1.0.0.

Caso a extensão verifique que está utilizando a versão antiga da configuração de servidores será solicitado
que redigite todas as senhas dos servidores salvos. Se houver alguma senha com erro simplesmente pulará para
o próximo servidor.

### Alterações

- Remove a atualização automática das senhas dos servidores da versão 0.0.1 para a mais atual;
- Atualiza todas as dependências da extensão;
- Adiciona todos os Eventos Globais (todos que estão no plugin Fluig do Eclipse);
- Adiciona Exportar Evento Global;
- Adiciona Excluir Evento Global;
- Adiciona Importar/Exportar Mecanismo de Atribuição Customizado;
- Ao Criar/Exportar algum evento o menu de opções os exibe em ordem alfabética;
- Otimiza o processo de criação de Widget;

## 1.26.0

Atualiza a criptografia utilizada para salvar as senhas dos servidores, garantindo maior
segurança.

Por alguns meses a antiga biblioteca de criptografia continuará na extensão para que a
atualização da criptografia das senhas já salvas seja automática para os usuários.

Na próxima atualização menor a antiga biblioteca de criptografia será removida e a partir
desse momento os usuários serão obrigados a atualizar a senha manualmente, editando o servidor.

## 1.25.1

Atualiza a documentação adicionando informações sobre a obrigatoriedade de abrir uma pasta
para que os comandos sejam inicializados e sobre a extensão só funcionar com um projeto
aberto por vez.

## 1.25.0

Adiciona dois snippets para facilitar a criação e edição de registro de formulário via
SOAP ECMCardService.

- fluig-soap-card-create
- fluig-soap-card-update

## 1.24.0

- Corrige o bug do tipo de persistência ao exportar novo formulário. Erroneamente a extensão
trocava os valores enviados, enviando 0 ("Numa única tabela") quando a intenção era enviar
1 ("Tabela de Banco de Dados);
- Adiciona a funcionalidade "Novo Widget", criando uma estrutura padrão de widget;

## 1.23.1

- Altera snippet de criação de função de formatar data para algo mais simples;
- Corrige criação de evento de processo quando o nome do processo possuí espaços;

## 1.23.0

- Agrupado os menus de contexto por funcionalidades;
- Adicionado o menu de contexto Consulta Dataset para facilitar o seu uso;
- Criado o GlobalStorageService para armazenar o último parentDocumentId utilizado;
- Alterado a ordem dos campos "Manter Versão" e "Criar Nova Versão" para evitar de criar nova versão sem querer;
- Criado o pacote extensions para melhor organização dos comandos;

## 1.22.5

- Remove código duplicado;

## 1.22.4

- Adiciona a descrição do formulário ao atualizar formulário no Fluig;

## 1.22.3

- Corrige a visualização de Datasets forçando a trazer os resultados nulos para não dar problema na exibição dos campos;

## 1.22.2

- Remove a extensão `.js` do nome do evento ao exportar Formulário;

## 1.22.1

- Corrige exportação de Formulário: estava utilizando erroneamente o login ao invés da matrícula como publisherId.

## 1.22.0

- Várias melhorias de refatoração do código para facilitar compreensão.
- Não inicializa a Extensão caso o VS Code não esteja com Diretório, ou Workspace, aberto.
- Mantém último servidor utilizado no topo da lista de seleção para agilizar importação/exportação de artefatos.

## 1.21.0

Permite indicar o campo descritor ao exportar formulário.

Ainda não permite selecionar um HTML principal para o formulário, sendo obrigatório que o nome do arquivo HTML principal seja igual ao nome
do diretório do formulário.

## 1.20.1

Permite efetuar a primeira consulta a um dataset já informando constraints, facilitando a consulta de datasets que dão erro
quando não tem constraint informada.

Porém não é possível selecionar as constraints de uma lista devido à extensão não saber quais campos são retornados pelo dataset
antes da consulta.

O comportamento de resetar todos os parâmetros da consulta ao trocar o dataset selecionado permanece.

## 1.20.0

Adiciona a opção de exportar formulário.

## 1.19.6

Corrige a criação do diretório de eventos ao importar um formulário.

## 1.19.5

Impede configurar parâmetros de consulta de Dataset antes da primeira execução.

## 1.19.4

- Aumenta a versão do motor do VSCode;
- Altera como determina o caminho dos arquivos para utilizar a `vscode.Uri`, evitando problemas com o módulo `path`;
- Utiliza a `path.basename` para determinar o nome do Dataset ao exportar, corrigindo problema de não pré-selecionar a opção em Mac / Unix;

## 1.19.3

- Instala atualizações de segurança de várias dependências do projeto;
- Aumenta a versão do engine do VS Code para ^1.75.0;

## 1.19.0

Altera o publicador da Extensão, a passando para a comunidade Fluiggers.

Adiciona os seguintes eventos globais:

- afterActivateUser
- afterDeactivateUser
- afterLogin
- beforeActivateUser
- beforeDeactivateUser
- beforeLogin
- onLoginError
- onLogout

## 1.18.1

Remove as linhas desnecessárias do template do Mecanismo Customizado.

## 1.18.0

Adiciona o comando de criar Mecanismo Customizado.

## 1.17.1

Corrige cor de fundo do cabeçalho fixo da consulta de dataset.

## 1.17.0

Adiciona o comando `Instalar Declarações de Tipo` para instalar a biblioteca de declarações de tipo puxando os
arquivos mais atualizados do GitHub.

## 1.16.0

Adiciona atalhos para:

- Exportar Dataset (CTRL + F9 / CMD + F9)
- Novo Dataset (CTRL + F10 / CMD + F10)
- Novo Formulário (CTRL + F11 / CMD + F11)
- Novo Evento de Formulário (CTRL + F12 / CMD + F12)
- Novo Evento de Processo (CTRL + F12 / CMD + F12)

## 1.15.2

Realmente corrige o bug de não fechar a tela de loading quando há erro de consulta ao Dataset. Ainda havia uma
situação na qual a tela de loading permanecia aberta.

## 1.15.1

Corrige o bug de não fechar a tela de loading quando há erro de consulta ao Dataset.

## 1.15.0

Melhorias de Interface, otimização de performance e correção de bugs nas chamadas aos Datasets.

Ao efetuar consultas de Datasets as Constraints não estavam filtrando corretamente.

Adição dos seguintes snippets JavaScript (front-end):

- fluig-dataset-async
- fluig-modal
- fluig-widget

## 1.14.0

Adicionada a opção de efetuar a consulta a um Dataset indicando quais colunas devem vir ordenadas.

## 1.13.2

Melhoria visual aplicando o tema configurado no VS Code à Extensão.

## 1.13.1

Melhoria visual da seleção de campos ao visualizar Dataset.

## 1.13.0

Permite selecionar os campos que serão retornados do Dataset ao Consultar Dataset.

## 1.12.0

Adiciona a Consulta de Dataset no gerenciamento dos Servidores.

## 1.10.0

Adição dos comandos:

- Importar Vários Formulários
- Importar Evento Global
- Importar Vários Eventos Globais

Ao exportar um Dataset o nome dele virá em primeiro na listagem caso já exista no servidor, facilitando a exportação
de Dataset já existente.

Melhor ordenação dos comandos no menu de contexto **File Explorer**.

Correção de vulnerabilidades nas dependências da extensão.

## 1.9.1

Melhoria de performance na descriptografia da senha do servidor.

## 1.9.0

Adicionado o comando "Importar Formulário".

A senha do servidor agora é criptografada utilizando como frase secreta a identificação do computador do usuário.

## 1.8.0

Agora as senhas dos servidores são criptografadas no momento de armazenagem.

Os servidores salvos devem ser atualizados para que as senhas sejam atualizadas com a criptografia.

## 1.7.0

Adição do snippet JavaScript (fluig-paifilho-loop-workflow) para percorrer Pai Filho em evento de Processo.

## 1.6.0

Adição do snippet JavaScript (fluig-consulta-jdbc) para facilitar consulta direta ao Banco de Dados com JDBC.

## 1.5.0

Adição dos comandos:

- Exportar Dataset
- Importar Dataset
- Importar Vários Dataset

Adição dos eventos de Processo:

- afterStateEntry
- afterTaskSave

## 1.4.0

Adição do gerenciamento de Servidores.

## 1.3.0

Adição dos snippets HTML:

- fluig-checkbox
- fluig-checkbox-inline
- fluig-alert
- fluig-alert-dismissible
- fluig-button-dropdown-split

## 1.2.0

Adição dos snippets HTML:

- fluig-radio
- fluig-radio-inline
- fluig-tabs

## 1.1.0

Adição dos snippets JavaScript:

- fluig-beforeMovementOptions
- fluig-beforeSendValidate
- fluig-zoom-removed
- fluig-zoom-selected

## 1.0.0

- Melhoria da documentação da Extensão;
- Redução do tamanho da Extensão;

## 0.0.8

- Adicionado comando **Novo Evento Global**;
- Adicionado template para o evento global **displayCentralTasks**;
- Adicionado template para o evento global **onNotify**;

## 0.0.7

- Refatoração dos templates em arquivos ao invés de funções;

## 0.0.5

- Comando **Novo Evento de Formulário** só aparece no menu se for selecionado um formulário;
- Comando **Novo Evento de Processo** só aparece no menu se for selecionado um diagrama de processo;

## 0.0.3

- Criação do comando **Novo Evento de Formulário** no menu de contexto de arquivos;
- Criação do comando **Novo Evento de Processo** no menu de contexto de arquivos;

## 0.0.2

- Comando **Criar Dataset** adicionado ao menu de contexto de arquivos;
- Comando **Novo Formulário** adicionado ao menu de contexto de arquivos;

## 0.0.1

- Criação dos snippets para HTML;
- Criação dos snippets para JavaScript;
- Criação do comando **Novo Dataset** no Command Palette;
- Criação do comando **Novo Formulário** no Command Palette;
