"use strict";
const backendUrl = Cypress.env('backendUrl');
const validUserName = 'TestAutoUser';
const validPassword = '12345678Abc!';
const wrongUserName = 'WrongUserExample';
const wrongPassword = 'wrongpassword123456789Abc!';

describe ("Positive login test", () => {
    it ("Login", () => {
        cy.request ({
            method: 'POST',
            url: `${backendUrl}/login`,
            body: {
                user_name: validUserName,
                password: validPassword,
            },
          }).then((response) => {
            expect(response.status).to.eq(200)
        });
    });
    
});

describe("Negative login tests", () => {
    it("Login with wrong username", () => {
        cy.request({
            method: 'POST',
            url: `${backendUrl}/login`,
            body: {
                user_name: wrongUserName,
                password: validPassword,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it("Login with wrong password", () => {
        cy.request({
            method: 'POST',
            url: `${backendUrl}/login`,
            body: {
                user_name: validUserName,
                password: wrongPassword,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    // it("Login with missing password", () => { //temporary works on the server
    //     cy.request({
    //         method: 'POST',
    //         url: `${backendUrl}/login`,
    //         body: {
    //             user_name: validUserName,
    //             password: "",
    //         },
    //         failOnStatusCode: false
    //     }).then((response) => {
    //         expect(response.status).to.eq(400);
    //     });
    // });

    it("Login with incorrect method", () => {
        cy.request({
            method: 'GET',
            url: `${backendUrl}/login`,
            body: {
                user_name: validUserName,
                password: validPassword,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(405);
        });
    });

});