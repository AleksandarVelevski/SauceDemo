import SauceDemoPage from '../pageObjects/SauceDemoHomePage.cy';

describe('Sauce Demo Website Tests', () => {
  const sauceDemoPage = new SauceDemoPage();

  it('should load the homepage successfully', () => {
    sauceDemoPage.visitHomePage();
    cy.url().should('eq', 'https://sauce-demo.myshopify.com/');
    
    sauceDemoPage.verifyHomepageLoaded();
  });

  it('should search for a product', () => {
    sauceDemoPage.visitHomePage();
    sauceDemoPage.searchForProduct('gray jacket');
    
    sauceDemoPage.elements.searchKeyword().should('be.visible');
  });

  it('should display product details properly', () => {
    sauceDemoPage.visitHomePage();
    sauceDemoPage.selectFirstProduct();
    
    sauceDemoPage.verifyProductDetails();
  });

  it('should add product to cart and verify cart increment', () => {
    sauceDemoPage.visitHomePage();
    sauceDemoPage.selectFirstProduct();

    sauceDemoPage.elements.cartValue()
      .invoke('text')
      .then((text) => {
        const initialValue = parseInt(text.trim().replace(/\D/g, ''), 10);
        
        sauceDemoPage.addItemToCart();
        
        sauceDemoPage.verifyCartIncrement(initialValue);
      });

    sauceDemoPage.proceedToCheckout();
  });
});
