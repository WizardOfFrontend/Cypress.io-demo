
import Login from '../../../page-objects/pages/LoginPage';
import Product from '../../../page-objects/pages/ProductPage';

describe('Login/Logout Test', () => {
  
  before(function() {
    cy.visit(Cypress.env('url'));
    cy.url().should('include', 'saucedemo')    
  });

  it('invalid credential 1 - invalid username, invalid password', function(){
    Login.loginForm.should('be.visible');
    cy.fixture('userInfo.json').then((data)=>{
      const invalidUsername = data.invalidUsername;
      const invalidPassword = data.invalidPassword;
      Login.Login(invalidUsername, invalidPassword);
    })    
    Login.VerifyErrorMsg();
  });

  it('invalid credential 2 - valid username, invalid password', function(){
    Login.loginForm.should('be.visible');
    cy.fixture('userInfo.json').then((data)=>{
      const username = data.username;
      const invalidPassword = data.invalidPassword;
      Login.Login(username, invalidPassword);
    })    
    Login.VerifyErrorMsg();
  });

  it('invalid credential 3 - invalid username, valid password', function(){
    Login.loginForm.should('be.visible');
    cy.fixture('userInfo.json').then((data)=>{
      const invalidUsername = data.invalidUsername;
      const password = data.password;
      Login.Login(invalidUsername, password);
    })    
    Login.VerifyErrorMsg();
  });

  it('invalid credential 4 - valid username, empty password', function(){
    Login.loginForm.should('be.visible');
    cy.fixture('userInfo.json').then((data)=>{
      const username = data.username;
      Login.LoginWithEmptyPassword(username);
    })    
    Login.PssswordeMissingErrorMsg();
  });

  it('invalid credential 5 - empty username, valid password', function(){
    Login.loginForm.should('be.visible');
    cy.fixture('userInfo.json').then((data)=>{
      const password = data.password;
      Login.LoginWithEmptyUsername(password);
    })    
    Login.UserNameMissingErrorMsg();
  });

  it('invalid credential 6 - empty username, empty password', function(){
    Login.loginForm.should('be.visible');
    Login.LoginWithEmptyCredential(); 
    Login.UserNameMissingErrorMsg();
  });

  it('valid credential - valid username, valid password', function(){
    Login.loginForm.should('be.visible');
    cy.fixture('userInfo.json').then((data)=>{
      const username = data.username;
      const password = data.password;
      Login.Login( username, password);
    });    
    Product.products_txt.should('be.visible');
  });
});
