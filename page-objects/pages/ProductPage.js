class ProductPage{
  
  get products_txt(){
    return cy.get('.product_label')
  }
  
  get allProducts(){
    return cy.get('.inventory_item')
  }

  get allProductNames(){
    return cy.get('.inventory_item_name')
  }

  get productCount(){
    return cy.get('.fa-layers-counter');
  }  

  get cart(){
    return cy.get('path')
  }

  get checkout_btn(){
    return cy.get('.btn_action');
  }

  AddProductToCart(product){
    this.allProducts.each(item=>{
      if(item.find('.inventory_item_name').text().includes(`${product}`)){
        item.find('.btn_primary').click();
      }
    })
  }

  GoToCart(){
    this.cart.click();
  }

  Checkout(){
    this.checkout_btn.click();
  }
  
  
}

export default new ProductPage()