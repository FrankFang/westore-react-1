describe('登录', () => {
  it('正常', () => {
    cy.visit('#/sign_in')
    cy.server()
    cy.route('POST', '**/api/v1/code').as('code')
    cy.get('input').eq(0).type('13800000000')
    cy.contains('发送验证码').click()
    cy.wait('@code').then(() => {
      cy.get('input').eq(1).type('000000')
      cy.contains('登录').click()
      cy.hash().should('eq', '#/admin/shops')
    })

  })
})
