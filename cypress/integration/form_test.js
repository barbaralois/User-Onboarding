describe('form inputs', () => {
  it('can navigate to the site', () => {
    cy.visit('http://localhost:1234');
    cy.url().should('include', 'localhost');
  });

  it('button is disabled', () => {
    cy.get('button').should('be.disabled');
  });

  it('can type a name', () => {
    cy.get(':nth-child(2) > input')
      .type('Barbara')
      .should('have.value', 'Barbara');
  });

  it('can type an email', () => {
    cy.get(':nth-child(3) > input').type('Barbara@abc.com');
  });

  it('can type a password', () => {
    cy.get(':nth-child(4) > input').type('abcd1234');
  });

  it('can use TOS checkbox', () => {
    cy.get('.checkbox > input').check();
  });
});

describe('submitting a user', () => {
  it('can submit a user', () => {
    cy.visit('http://localhost:1234');
    cy.get(':nth-child(2) > input').type('Benjamin');
    cy.get(':nth-child(3) > input').type('Ben@abc.com');
    cy.get(':nth-child(4) > input').type('4321dcba');
    cy.get('.checkbox > input').check();
    cy.get('button').click();
  });
  it('can display the user info', () => {
    cy.get('div.container > h2').contains('Benjamin');
  });
});

describe('form validation', () => {
  it('validates name correctly', () => {
    cy.visit('http://localhost:1234');
    cy.contains('The name must be at least four characters long').should(
      'not.exist'
    );
    cy.get(':nth-child(2) > input').type('a');
    cy.contains('The name must be at least four characters long');
    cy.get(':nth-child(2) > input').type('b');
    cy.contains('The name must be at least four characters long');
    cy.get(':nth-child(2) > input').type('c');
    cy.contains('The name must be at least four characters long');
    cy.get(':nth-child(2) > input').type('d');
    cy.contains('The name must be at least four characters long').should(
      'not.exist'
    );

    cy.get('button').should('be.disabled');
  });
  it('validates email correctly', () => {
    cy.visit('http://localhost:1234');
    cy.contains('Please enter a valid email address').should('not.exist');
    cy.get(':nth-child(3) > input').type('abcd');
    cy.contains('Please enter a valid email address');
    cy.get(':nth-child(3) > input').type('@abcd');
    cy.contains('Please enter a valid email address');
    cy.get(':nth-child(3) > input').type('.com');
    cy.contains('Please enter a valid email address').should('not.exist');

    cy.get('button').should('be.disabled');
  });
  it('validates password correctly', () => {
    cy.visit('http://localhost:1234');
    cy.contains('The password must be at least eight characters long').should(
      'not.exist'
    );
    cy.get(':nth-child(4) > input').type('abc');
    cy.contains('The password must be at least eight characters long');
    cy.get(':nth-child(4) > input').type('def');
    cy.contains('The password must be at least eight characters long');
    cy.get(':nth-child(4) > input').type('gh');
    cy.contains('The password must be at least eight characters long').should(
      'not.exist'
    );

    cy.get('button').should('be.disabled');
  });
  it('displays multiple validation messages', () => {
    cy.visit('http://localhost:1234');
    cy.contains('The name must be at least four characters long').should(
      'not.exist'
    );
    cy.contains('Please enter a valid email address').should('not.exist');
    cy.get(':nth-child(2) > input').type('ab');
    cy.get(':nth-child(3) > input').type('abcd');
    cy.contains('Please enter a valid email address');
    cy.contains('The name must be at least four characters long');
    cy.get(':nth-child(3) > input').type('@abcd.com');
    cy.contains('Please enter a valid email address').should('not.exist');
    cy.contains('The name must be at least four characters long');
    cy.get(':nth-child(2) > input').type('cd');
    cy.contains('The name must be at least four characters long').should(
      'not.exist'
    );

    cy.get('button').should('be.disabled');
  });
});
