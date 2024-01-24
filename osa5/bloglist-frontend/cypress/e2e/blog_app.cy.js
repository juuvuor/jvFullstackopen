
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Tero Testi',
      username: 'TestiTero',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username').get('#username') 
    cy.contains('password').get('#password') 
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('TestiTero')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Tero Testi logged in')
      
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('TestiTero')
    cy.get('#password').type('vääräS')
    cy.get('#login-button').click()

    cy.get('html').should('not.contain', 'Tero Testi logged in')

    cy.get('.error').should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(0, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'TestiTero', password: 'salainen' })
      })
  
      it('A blog can be created', function() {
        cy.get('#newBlog').click()
        cy.get('#title').type('Uusi luomukseni')
        cy.get('#author').type('Sini Simpukka')
        cy.get('#url').type('helmi.com')

        cy.get('#createBlog').click()

        cy.get('.error')
          .should('contain', 'a new blog Uusi luomukseni by Sini Simpukka added')
          .and('have.css', 'color', 'rgb(0, 0, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      describe('When created blog', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'Uusi luomukseni',
            author: 'Sini Simpukka',
            url: 'helmi.com'
          })
        })

            describe('Creator see delete button and can delete own blogs', function() {
              it('Deleting Blog is possible', function() {
                cy.get('#viewBlog').click()
                cy.get('#deleteBlog').click()
      
                cy.get('.error')
                .should('contain', 'Blog deleted successfully')
                .and('have.css', 'color', 'rgb(0, 0, 0)')
                .and('have.css', 'border-style', 'solid')
      
                cy.get('html').should('not.contain', 'Uusi luomukseni Sini Simpukka')
              })

              it('Others than Creator dosent see Blogs delete button', function(){
                const user = {
                  name: 'Teija Testaaja',
                  username: 'TesTeija',
                  password: 'salainen2'
                }
                cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
                cy.login({ username: 'TesTeija', password: 'salainen2' })

                cy.get('#viewBlog').click()
                cy.get('html').should('not.contain', 'delete')
              })
        })


        it('Liking blog is possible ', function() {
          cy.get('#viewBlog').click()
          cy.contains('likes 0')
          cy.get('#likeBlog').click()
          
          cy.get('.error')
          .should('contain', 'Successfully liked blog')
          .and('have.css', 'color', 'rgb(0, 0, 0)')
          .and('have.css', 'border-style', 'solid')
          cy.contains('likes 1')
        })

       

        describe('Blogs order by likes', function() {
          beforeEach(function(){
            cy.createBlog({
              title: 'Kirjoitus 1',
              author: 'Kirjuri 1',
              url: 'url 1'
            })
          })
          
          it('The order of the blog changes based on likes', function(){
            cy.get('.blog').eq(0).should('contain', 'Uusi luomukseni Sini Simpukka')
            cy.get('.blog').eq(1).should('contain', 'Kirjoitus 1 Kirjuri 1')
            

            cy.contains('Kirjoitus 1 Kirjuri 1').find('button').click()
            cy.get('#likeBlog').click()

            cy.get('.blog').eq(0).should('contain', 'Kirjoitus 1 Kirjuri 1')
            cy.get('.blog').eq(1).should('contain', 'Uusi luomukseni Sini Simpukka')

          }) 
        })

    
      })
    })

  })
})
