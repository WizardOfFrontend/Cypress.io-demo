import Login from '../../../page-objects/pages/LoginPage';
import Product from '../../../page-objects/pages/ProductPage';
import Checkout from '../../../page-objects/pages/CheckoutPage';

describe('Purchasing Products Flow', function () {

  before(function () {
    cy.visit(Cypress.env('url'));
    cy.url().should('include', 'saucedemo')
  });

  it('user login for purchasing the products', function () {
    Login.loginForm.should('be.visible');
    cy.fixture('userInfo.json').then((data) => {
      const username = data.username;
      const password = data.password;
      Login.Login(username, password);
    });
    Product.products_txt.should('be.visible');
  });

  it('Add products to the cart', () => {
    Product.AddProductToCart('T-Shirt');
    Product.productCount.then(el=>{
      expect(el.text()).to.equal('2');
    })    
  })

  it('Verify the quantity inside the cart', () => {
    Product.GoToCart(); 
    Product.allProductNames.should('have.length',2);
  })

  it('Checkout', () => {
    Product.Checkout(); 
    cy.fixture('userInfo.json').then((data)=>{
      const firstName = data.firstName;
      const lastName = data.lastName;
      const zip = data.zip;
      Checkout.FillOutInfoAndSubmit(firstName,lastName,zip);
    })    
  })

  it('Final Verification', () => {
     cy.get('.inventory_item_price').then(el=>{       
       let subTotal = parseFloat(el.text().split('$').reduce((total,price)=> Number(total) + Number(price),0));       
       let total = subTotal + parseFloat((subTotal * 0.08).toFixed(2));
       // verify subtoal
       Checkout.subTotal_txt.then(el=>{
         expect(parseFloat(el.text().split('$')[1])).to.equal(subTotal)
       })
       // verify toal
       Checkout.total_txt.then(el=>{
         expect(parseFloat(el.text().split('$')[1])).to.equal(total)
       })
      })      
  })

  it('Complete the order', () => {
    Checkout.CompleteOrder();
    Checkout.VerifyOrderComfirmationMsg();
  })
});