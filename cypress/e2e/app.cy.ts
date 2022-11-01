describe('Home page', () => {
  it('Should navigate to the home page', () => {
    cy.visit('http://localhost:3000')

    // Find a link to the login page to make sure navigation is visible
    cy.get('a[href*="zaloguj"]').contains('Zaloguj się')

    // Check the main title to make sure the page content is visible
    cy.get('h1').contains('Zorganizuj swoje krwiodawstwo')

    // Check the footer
    cy.get('footer').contains('Copyright')
  })
})

export { } 
