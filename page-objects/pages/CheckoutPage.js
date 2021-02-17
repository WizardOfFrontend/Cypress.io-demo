class CheckoutPage{
  
  get firstNaem_tbox(){
    return cy.get('#first-name');
  }

  get lastName_tbox(){
    return cy.get('#last-name');
  }

  get zip_tbox(){
    return cy.get('#postal-code');
  }
 
  get continue_btn(){
    return cy.get('input[value="CONTINUE"]');
  }

  get subTotal_txt(){
    return cy.get('.summary_subtotal_label');
  }

  get total_txt(){
    return cy.get('.summary_total_label');
  }

  get finish_btn(){
    return cy.contains('FINISH');
  }

  get completeHeader_txt(){
    return cy.get('.complete-header');
  }

  VerifyOrderComfirmationMsg(){
    this.completeHeader_txt.should('have.text','THANK YOU FOR YOUR ORDER')
  }
 
  FillOutInfoAndSubmit(firstname,lastname,zip){
    this.firstNaem_tbox.type(firstname);
    this.lastName_tbox.type(lastname);
    this.zip_tbox.type(zip);
    this.continue_btn.click();
  } 

  CompleteOrder(){
    this.finish_btn.click();
  }
}

export default new CheckoutPage()