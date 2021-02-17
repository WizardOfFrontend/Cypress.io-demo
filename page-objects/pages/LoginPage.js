class LoginPage{
   
  get userName_tbx(){
    return cy.get('#user-name');
  }

  get password_tbx(){
    return cy.get('#password');
  }


  get logIn_btn(){
    return cy.get('#login-button');
  }

  get loginForm(){
    return cy.get('form');
  }

  get error(){
    return cy.get('h3[data-test="error"]')
  }

  Submit_Login_Form(){
    this.logIn_btn.click();
  }

  Fill_LoginForm(username, password) {
    this.Celar_Credential();    
    this.userName_tbx.type(username);
    this.password_tbx.type(password);
  }

  Celar_Credential(){
    this.userName_tbx.clear();
    this.password_tbx.clear();
    cy.wait(1000);
  }

  Login(username, password) {
    this.loginForm.should('be.visible');
    this.Fill_LoginForm(username, password);
    this.Submit_Login_Form();  
  }  
  
  LoginWithEmptyUsername(password) {    
    this.loginForm.should('be.visible');
    this.Celar_Credential();
    this.userName_tbx.invoke('val','');
    this.password_tbx.type(password);
    this.Submit_Login_Form();    
  }  

  LoginWithEmptyPassword(username) {    
    this.loginForm.should('be.visible');  
    this.Celar_Credential();
    this.userName_tbx.clear().type(username);
    this.password_tbx.invoke('val','');
    this.Submit_Login_Form();
    this.Celar_Credential();
  }  

  LoginWithEmptyCredential() {    
    this.loginForm.should('be.visible');  
    this.Celar_Credential();
    this.userName_tbx.invoke('val','');
    this.password_tbx.invoke('val','');
    this.Submit_Login_Form();
    this.Celar_Credential();
  }  


  VerifyErrorMsg(){
    this.error.contains('Username and password do not match any user in this service')
  }

  UserNameMissingErrorMsg(){
    this.error.contains('Username is required')
  }

  PssswordeMissingErrorMsg(){
    this.error.contains('Password is required')
  }
  
  generateRegEmail(){
    return `test@test${new Date().valueOf()}.com`
  }
}

export default new LoginPage()