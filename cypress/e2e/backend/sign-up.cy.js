"use strict";
const backendUrl = Cypress.env('backendUrl');
const validEmail = `User_${Date.now()}@example.com`;
const invalidEmail = '.test.user@example.com';
const validPassword = 'Password123!Aa';
const invalidPassword = 'Abc!123';
const validNewUserName = `User_${Date.now()}`;

describe ("Sign-up test", () => {
    let userId;
    let accessToken;
    it ("Positive sign-up test", () => {
        cy.request({
                method: 'POST',
                url: `${backendUrl}/register`,
                body: {
                    email: validEmail,
                    password: validPassword,
                    userName: validNewUserName,
            },
          }).then((response) => {
            expect(response.status).to.eq(201)
            userId = response.body.user_data.id;
            accessToken = response.body.tokens.access_token;
        });
    });

    it ("Delete test user", () => {
        cy.request({
            method: 'DELETE',
            url: `${backendUrl}/delete-profile`,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: {
                user_id: userId,
            },
          }).then((response) => {
            expect(response.status).to.eq(200)
        });
    });

    it ("Sign-up with incorrect method", () => {
        cy.request({
            method: 'GET',
            url: `${backendUrl}/register`,
            failOnStatusCode: false,
            body: {
                email: validEmail,
                password: validPassword,
                userName: validNewUserName,
            },
          }).then((response) => {
            expect(response.status).to.eq(405)
        });
    });

    it ("Sign-up with invalid email", () => {
        cy.request({
            method: 'POST',
            url: `${backendUrl}/register`,
            failOnStatusCode: false,
            body: {
                email: invalidEmail,
                password: validPassword,
                userName: validNewUserName,
            },
          }).then((response) => {
            expect(response.status).to.eq(400)
        });
    });

    // it ("Sign-up with missing password", () => { ////temporary works on the server
    //     cy.request({
    //         method: 'POST',
    //         url: `${backendUrl}/register`,
    //         failOnStatusCode: false,
    //         body: {
    //             email: validEmail,
    //             password: '',
    //             userName: validNewUserName,
    //         },
    //       }).then((response) => {
    //         expect(response.status).to.eq(400)
    //     });
    // });

    // it ("Sign-up with invalid password", () => {
    //     cy.request({
    //         method: 'POST',
    //         url: `${backendUrl}/register`,
    //         failOnStatusCode: false,
    //         body: {
    //             email: validEmail,
    //             password: invalidPassword,
    //             userName: validNewUserName,
    //         },
    //       }).then((response) => {
    //         expect(response.status).to.eq(400)
    //     });
    // });

});