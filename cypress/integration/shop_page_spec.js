/// <reference types="Cypress"  />
import shoplist from '../fixtures/shop.json'

describe('Jupiter Toys test suite - Shop and cart Page', () => {


    beforeEach(() => {

      cy.visit('/')
       
    })
    

            
        it('TC3: buy from shop and check cart', () => {

            //1.	From the home page go to shop page
            cy.get('a[href*="home"]').click().as('ClickOnHome') 
            cy.location('hash').should("equal","#/home")

            cy.get('#nav-shop > a').click()
            cy.location('hash').should("equal","#/shop")
            

            //2.	Click buy button 2 times on “Funny Cow” (This is set under the test data file)
            //3.	Click buy button 1 time on “Fluffy Bunny” (This is set under the test data file)

            shoplist.tc3td_items.forEach((shoplistobj)  => {
            cy.contains(shoplistobj.Product).parent().within(() => {
                cy.contains("Buy").click()

            })    
    
          
        })
        
        //4.	Click the cart menu. Checking here as well that the count in cart is correct
        cy.get('#nav-cart > a > span').should('have.text',shoplist.tc3td_items.length)
        cy.get('#nav-cart > a').click()
        cy.location('hash').should("equal","#/cart")

        //5.	Verify the items are in the cart
        shoplist.tc3td_summary.forEach((shoplistsummobj,index)  => {

            cy.get('body > div.container-fluid > div > form > table > tbody > tr:nth-child('+(index+1)+') > td:nth-child(1)').should('have.text',' '+shoplistsummobj.Product)
            cy.get('body > div.container-fluid > div > form > table > tbody > tr:nth-child('+(index+1)+') > td:nth-child(3) > input').should('have.value',shoplistsummobj.Count) 

            })    
    
          
        })
            

        it('TC4: buy from shop, check cart, calc amounts', () => {
            cy.get('a[href*="home"]').click().as('ClickOnHome') 
            cy.location('hash').should("equal","#/home")

            cy.get('#nav-shop > a').click()
            cy.location('hash').should("equal","#/shop")
            
            //1.	Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear (This is set under the test data file)
            shoplist.tc4td_items.forEach((shoplistobj)  => {
            cy.contains(shoplistobj.Product).parent().within(() => {
                cy.contains("Buy").click()

            })    
    
          
        })
        
        //2.	Go to the cart page. Checking here as well that the count in cart is correct

        cy.get('#nav-cart > a > span').should('have.text',shoplist.tc4td_items.length)
        cy.get('#nav-cart > a').click()
        cy.location('hash').should("equal","#/cart")

        var total = 0
        shoplist.tc4td_summary.forEach((shoplistsummobj,index)  => {

        //3.	Verify the price for each product
        //4.	Verify that each product’s sub total = product price * quantity
        //Kept here the checking of product and count as well
        //Also, calculating total amount in the loop for comparison later


            cy.get('body > div.container-fluid > div > form > table > tbody > tr:nth-child('+(index+1)+') > td:nth-child(1)').should('have.text',' '+shoplistsummobj.Product)            
            cy.get('body > div.container-fluid > div > form > table > tbody > tr:nth-child('+(index+1)+') > td:nth-child(2)').should('have.text','$'+shoplistsummobj.Price) 
            cy.get('body > div.container-fluid > div > form > table > tbody > tr:nth-child('+(index+1)+') > td:nth-child(3) > input').should('have.value',shoplistsummobj.Count)                       
            cy.get('body > div.container-fluid > div > form > table > tbody > tr:nth-child('+(index+1)+') > td:nth-child(4)').should('have.text','$'+shoplistsummobj.Price*shoplistsummobj.Count) 
            total = total+shoplistsummobj.Price*shoplistsummobj.Count
            })    

        //5.	Verify that total = sum(sub totals)

        cy.contains('Total: '+total).should('exist')
          
        })

    })

     