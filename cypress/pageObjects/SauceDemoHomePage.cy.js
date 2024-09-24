class SauceDemoPage {
  
  get elements() {
    return {
      logo: () => cy.get('#logo > a > img'),
      nav: () => cy.get('nav'),
      mainContent: () => cy.get('#main'),
      productGrid: () => cy.get('.product-grid'),
      searchBox: () => cy.get('#product-search'),
      searchSubmit: () => cy.get('#search-submit'),
      searchKeyword: () => cy.get('#keyword'),
      firstProduct: () => cy.get('#product-1 > .product'),
      productImage: () => cy.get('#feature-image'),
      productName: () => cy.get('#product-form > h1'),
      productPrice: () => cy.get('.product-price'),
      productDescription: () => cy.get('.wysiwyg'),
      addToCartButton: () => cy.get('#add'),
      cartValue: () => cy.get('.toggle-drawer'),
      cartAnimation: () => cy.get('#cart-animation'),
      checkoutButton: () => cy.get('.checkout')
    };
  }

  
  visitHomePage() {
    cy.visit('https://sauce-demo.myshopify.com');
  }

  searchForProduct(productName) {
    this.elements.searchBox().type(productName);
    this.elements.searchSubmit().click();
  }

  selectFirstProduct() {
    this.elements.firstProduct().click();
  }

  addItemToCart() {
    this.elements.addToCartButton().click();
  }

  proceedToCheckout() {
    this.elements.checkoutButton().click({ force: true });
  }

 
  verifyCartIncrement(initialValue) {
    this.elements.cartAnimation()
      .invoke('text')
      .then((text) => {
        const newValue = parseInt(text.trim().replace(/\D/g, ''), 10);
        expect(newValue).to.equal(initialValue + 1);
      });
  }

  
  verifyHomepageLoaded() {
    this.elements.logo().should('be.visible');
    this.elements.nav().should('be.visible');
    this.elements.mainContent().should('be.visible');
    this.elements.productGrid().should('be.visible');
  }

  verifyProductDetails() {
    this.elements.productImage().should('be.visible');
    this.elements.productName().should('be.visible');
    this.elements.productPrice().should('be.visible');
    this.elements.productDescription().should('be.visible');
  }
}

export default SauceDemoPage;
