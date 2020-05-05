// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const login = ({apiBaseUrl, tel}) => {
  apiBaseUrl = apiBaseUrl || Cypress.env('apiBaseUrl') || 'http://localhost:8010/api/v1'
  cy.request('POST', apiBaseUrl + '/code', {tel})
  cy.request('POST', apiBaseUrl + '/login', {tel, code: '000000'})
}

Cypress.Commands.add('loginByTel', (tel) => {
  tel = tel || new Date().valueOf().toString().slice(0, 11)
  return login({tel})
})

Cypress.Commands.add('mutate', key => {
  cy.window().then(win => {
    win.swrMutate(key)
  })
})

Cypress.Commands.add('createShop', () => {
})
