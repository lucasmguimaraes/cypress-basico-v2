// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
//Exercício 1 do curso de Automação de Cypress - Básico
// Neste exercício somente será verificado se o título da aplicação está escrito de for correta

    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

// Este é o exercício Extra 1, onde será verificado o preenchimento do campos obrigatórios
// e o envio do formulário. Um adicional será inserir um texto longo.

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Testando a feature com um texto longo. testes, testes, testes, testes, testes, testes, testes, testes, testes, testes, testes, testes, testes, testes, testes.'
        
        cy.get('#firstName').type('Lucas')
        cy.get('#lastName').type('Medeiros')
        cy.get('#email').type('lucasmg@exemplo.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })

// Este é o exercício Extra 2, onde será verificado um erro de digitação no email do formuláio
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName'). type('Lucas')
        cy.get('#lastName').type('Medeiros')
        cy.get('#email').type('lucasmg@exemplo,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')   
    })

// Este exercício extra 3 pede para validar que o campo de telefone só aceita números,
// e se o valor for não-numérico, continuará vazio
    it('campo de telefone continuará vazio se um valor não-numérico for digitado', function(){
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })

//Este exercício extra 4, onde será criado um teste que exibe uma mensagem de erro quando  telefone se torna obrigatório
// mas não é preenchido antes do do envio do formulário
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

        cy.get('#firstName').type('Lucas')
        cy.get('#lastName').type('Medeiros')
        cy.get('#email').type('lucasmg@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste para telefone obrigatório')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')   
    })

//Neste próximo exercício extra 5, no teste vamos utilizar a funcionalidade .clear() para limpar um campo
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){

        cy.get('#firstName').type('Lucas').should('have.value', 'Lucas')
            .clear().should('have.value','')
        cy.get('#lastName').type('Medeiros').should('have.value','Medeiros')
            .clear().should('have.value','')
        cy.get('#email').type('lucasmg@exemplo.com').should('have.value', 'lucasmg@exemplo.com')
            .clear().should('have.value','')
        cy.get('#phone').type('11223344550').should('have.value','11223344550')
            .clear().should('have.value','')
      //  cy.get('#open-text-area').type('Testando')
       // cy.get('button[type="submit"]').click() 
    })

// Exercício Extra 6 terá como teste uma mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios
    it('exibe mensagem de erro ao submeter o formula´rio sem preencher os campos obrigarótios', function(){

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

// Exercício Extra 7 com o teste de envio de formulário com sucesso usando comando customizado
    it('envia o formulário com sucesso usando umcomando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

// Agora será um exercício da aula 03 sobre 'Selecionar opções em campos  de seleção suspensa'
// O Primeiro exercício será feito a partir da seleção de um produto, que no caso será 'Youtube', através do texto, com isso:

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')  // Nosso 'select' é o #product (# = significa ID)
            .select('YouTube') // aqui quer selecionar pelo texto a seleção "YouTube"
            .should('have.value','youtube') // verificando se a opção foi realmente selecionada através do valor do "value"
                                            // esse valor do "value" foi obtido no inspecionar da aplicação
        })

// Exercício extra 1 para os testes de seleção de opções de campos de seleção suspensa através do seu valor (value)
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value','mentoria')
    
    })

// Exercício extra 2 para os testes de seleção de opções de campos de seleção suspensa através do seu índice
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
            
        })
// Vamos fazer um execício agora da aula 4 como a seleção do input do tipo radio, ou seja, uma seleção única
//O exercício é fazer um teste onde marca o tipo de atendimento "Feedback"
    it('marca o tipo de atendimento "Feedback', function(){
        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value','feedback')

    })

// Exercício extra para marcar cada tipo de atendimento de nossa aplicação, onde vai selecionar cada uma das
// opções e vai verificar se foi selecionada
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]') 
            .should('have.length',3) // verifica se há três elementos
            .each(function($radio){  // each recebe uma função de callback, que recebe cada argumento q que foi selecionado
                cy.wrap($radio).check() // para empacotar cada um dos radios
                cy.wrap($radio).should('be.checked')  // para fazer a verificação  
            }) 


    })
// Agora vamos marcar e desmarcar checkboxes
//Para o próximo exemplo, vamos marcar ambos os checkboxes e desmarcar o último
    // it.only('marca ambos checkboxes, depois desmarca o último', function(){
    //     cy.get('input[type="checkbox"][value="email"]').check()
    //         .should('have.value','email')
    //     cy.get('input[type="checkbox"][value="phone"]').check()
    //         .should('have.value','phone')    
    //     cy.get('input[type="checkbox"][value="phone"]').uncheck()
    //         .should('have.value','phone')

    //Essa forma acima foi feita por mim antes de ver como é executado da melhor maneira
    //não está errado, mas podemos simplificar o código. abaixo fiz como é executado 

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last() // vai selecionar o último elemento marcado
        .uncheck()
        .should('not.be.checked')

    })

// O Exercício extra de marcação de checkbox será uma revisão de um dos testes que foi feito antes
// será troca o '.click' do #phone-checkbox para '.check', pois com o .clic(), se o campo já estivesse marcado
// o .click iria desmarcar. Agora com o .check, só irá verificar se está marcado ou não, se não estiver, ele marcará.

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

        cy.get('#firstName').type('Lucas')
        cy.get('#lastName').type('Medeiros')
        cy.get('#email').type('lucasmg@exemplo.com')
        cy.get('#phone-checkbox').check() // se o campo estivesse com 
        cy.get('#open-text-area').type('Teste para telefone obrigatório')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')   
    })

//Agora vamos fazer um teste utilizando a seleção de arquivos através do comando .selectFile()
// o primeiro exercício que vamos fazer é somente selecionar um arquivo da pasta fixtures
//esse teste verificará se após a seleção do arquivo, o nome do arquivo é persistido no objeto do files do input

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            }) 
        
        })

//O próximo exercício utilizando o .selectFile() será simulando um drag-and-drop, ou seja, 
//como se o usuário tivesse arrastando um arquivo para cima do campo "Escolher arquivo"
// será repetido o código de cima, modificando o selectFile

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) //o primeiro argumento é o arquivo e o segundo é um objeto com a propriedade action 
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
        })

//O próximo exercício utilizando o .selectFile() será utilizando uma fixture para a qual foi dada um 'alias'   

    it('seleciona um arquivo utilizando um fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

//o teste que será realizado agora é a partir do que foi estudado sobre a limitação do Cypress de utilizar somente uma aba do navegador
// esse teste é para saber se quando clicarmos no link, ele abrirá uma outra página
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr','target','_blank')

    })

// execício extra 1 para links que abrem em outra aba do navegador
// Nesse teste será removido o target, ou seja, abrindo o link na própria página de teste

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click() // até aqui foi feito o testo de tirar o target e abrir o link na própria aba testada

        cy.contains('Talking About Testing').should('be.visible') // aqui foi feito um teste de texto para verificar
        //se pode mesmo fazer teste na página aberta
    })

// Simulando o viewport em um dispositivo móvel

  })
  
