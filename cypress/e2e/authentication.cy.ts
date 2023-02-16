/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

const baseurl = 'https://dev.skribe.ai';

describe('Authentication', () => {
  it('signs up for a new account', () => {
    // Start at the login page
    cy.visit(`${baseurl}/signin`);
    // Click the Sign Up link
    cy.contains('Sign Up').click();
    // The user should be taken to the Sign Up page
    cy.url().should('include', '/signup');
    // Fill out the form
    const data = {
      // Append '.localhost' to avoid accidently emailing a real person.
      'email': `${faker.internet.email()}.localhost`,
      'firstName': faker.name.firstName(),
      'lastName': faker.name.lastName(),
      'company': faker.company.name(),
      'country': 'United States of America',
      'state': faker.address.state()
    };
    cy.get('[name="email"]').type(data.email).should('have.value', data.email);
    cy.get('[name="firstName"]').type(data.firstName).should('have.value', data.firstName);
    cy.get('[name="lastName"]').type(data.lastName).should('have.value', data.lastName);
    cy.get('[name="company"]').type(data.company).should('have.value', data.company);
    cy.get('[name="country"]').type(`${data.country}{downArrow}{enter}`);
    cy.get('[name="state"]').type(`${data.state}{downArrow}{enter}`);
    // Submit the form
    cy.contains('Submit').click();
    // The user should be taken to the change password page
    cy.url().should('include', '/change-password');
    // The email field should be auto-populated
    cy.get('[name="email"]').should('have.value', data.email);
  });
});
