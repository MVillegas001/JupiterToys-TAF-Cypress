/// <reference types="Cypress"  />
import contact from '../fixtures/contact_man.json'

describe('Jupiter Toys test suite - Contact Page', () => {

    
    beforeEach(() => {

      cy.visit('/')
       
    })
    

    

    it('TC1: create new contact - validate mandatory fields', () => {

        //1.	From the home page go to contact page
        cy.get('a[href*="home"]').click().as('ClickOnHome') 
        cy.location('hash').should("equal","#/home")

        cy.get('a[href*="contact"]').click().as('ClickOnContact')
        cy.location('hash').should("equal","#/contact")

        //2.	Click submit button
        cy.get('form').contains('Submit').click().as('ClickOnSubmit')

        //3.	Validate errors
        cy.contains("- but we won't get it unless you complete the form correctly.").should('be.visible')
        cy.get('[id=forename-err]').as('Forename-error')  
            .should('be.visible')
            .should('contain.text',"Forename is required")
        cy.get('[id=email-err]').as('Email-error')  
            .should('be.visible')            
            .should('contain.text',"Email is required")
        cy.get('[id=message-err]').as('Message-error')  
            .should('be.visible')            
            .should('contain.text',"Message is required")

        //4.	Populate mandatory fields
        //5.	Validate errors are gone

        cy.get('[id=forename]').as('Forename').type(contact.tc1td.Forename)
        cy.get('@Forename-error').should('not.exist')
        cy.contains("- but we won't get it unless you complete the form correctly.").should('be.visible')

        cy.get('[id=email]').type(contact.tc1td.Email)
        cy.get('@Email-error').should('not.exist') 
        cy.contains("- but we won't get it unless you complete the form correctly.").should('be.visible') 

        cy.get('[id=message]').type(contact.tc1td.Message)
        cy.get('@Message-error').should('not.exist')    
        cy.contains("- but we won't get it unless you complete the form correctly.").should('not.exist')
        
        cy.get('@ClickOnSubmit').click()    
        cy.contains("Sending Feedback")   
        cy.contains("Sending Feedback",{timeout:30000}).should('not.exist')  
        cy.contains("Thanks "+contact.tc1td.Forename+", we appreciate your feedback.").should('be.visible')
        cy.contains('a.btn',"Back") 
        })


        it('TC2: create new contact with mandatory fields (x5)', () => {

            //Test will run 5 times or depends how much records are in the test data file
            contact.tc2td.forEach((contactobj2)  => {
            
            //1.	From the home page go to contact page
            cy.get('a[href*="home"]').click()
            cy.location('hash').should("equal","#/home")
    
            cy.get('a[href*="contact"]').click()
            cy.location('hash').should("equal","#/contact")     

            //2.	Populate mandatory fields
                cy.get('[id=forename]',{force:true}).type(contactobj2.Forename)
                cy.get('[id=email]').type(contactobj2.Email)
                cy.get('[id=message]').type(contactobj2.Message)
           
            //3.	Click submit button
                cy.get('form').contains('Submit').click()    

            //4.	Validate successful submission message
                cy.contains("Sending Feedback")   
                cy.contains("Sending Feedback", {timeout: 30000}).should('not.exist')  
                cy.contains("Thanks "+contactobj2.Forename+", we appreciate your feedback.").should('be.visible')
                cy.contains("« Back").click()                    
                cy.contains("We welcome your feedback - tell it how it is.", {timeout: 10000})  
            })
                
        })   
        

    })

     