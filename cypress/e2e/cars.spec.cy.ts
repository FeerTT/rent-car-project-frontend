const urlBase = Cypress.config().baseUrl;
describe("E2E Cars Test ", () => {
  it("should visit localhost:3000, go to create new car, create a new car, go to details, modify it and delete it.", () => {
    cy.visit(urlBase || "/");
    cy.url().should("include", urlBase);
    cy.contains("Create new Car").click();
    cy.get("#carForm").within(() => {
      cy.get("#brand").type("Toyota");
      cy.get("#model").type("Camry");
      cy.get("#transmission").select("Automatic");
      cy.get("#passengers").type("5");
      cy.get("#air_conditioning").check();
      cy.get("#color").type("Blue");
      cy.get("#kms").type("50000");
      cy.get("#year").type("2022");
    });
    cy.get("button.is-primary[type='submit']").click();

    cy.wait(2000);
    cy.get("#brand").should("have.value", "");

    cy.contains("Create new Car").click();
    cy.get("#carForm").within(() => {
      cy.get("#brand").type("Mercedes");
      cy.get("#model").type("AMG");
      cy.get("#transmission").select("Automatic");
      cy.get("#passengers").type("5");
      cy.get("#air_conditioning").check();
      cy.get("#color").type("Black");
      cy.get("#kms").type("0");
      cy.get("#year").type("2024");
    });
    cy.get("button.is-primary[type='submit']").click();

    cy.wait(2000);
    cy.get("#brand").should("have.value", "");
    cy.contains("Return").click();

    cy.url().should("include", "/cars");

    cy.get(".table tbody tr:first-child .data-cell a").click();
    cy.url().should("include", "/cars/");

    cy.get("button.is-warning.is-small").click();

    cy.get("#brandModify").clear().type("Honda");
    cy.get("#modelModify").clear().type("Accord");
    cy.get("#transmissionModify").select("Manual");
    cy.get("#passengersModify").clear().type("4");
    cy.get("#air_conditioning").check();
    cy.get("#colorModify").clear().type("Silver");
    cy.get("#kmsModify").clear().type("75000");
    cy.get("#yearModify").clear().type("2018");

    cy.get("footer.modal-card-foot button.is-warning").click();
    cy.intercept("PUT", "**/cars/*").as("modifyRequest");

    cy.wait("@modifyRequest").then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.equal(200);
      } else {
        cy.log("No answer on PUT Method.");
      }
      expect(interception.request.url).to.include("/cars/");
    });
    cy.get("button.is-danger.is-small").click();
    cy.intercept("DELETE", "**/cars/*").as("deleteRequest");

    cy.wait("@deleteRequest").should((interception) => {
      expect(interception.response).to.exist;
      expect(interception.response!.statusCode).to.equal(200);
    });
    cy.visit(urlBase || "/");
    cy.url().should("eq", `${urlBase}/` || "/");

    cy.log("Test completed successfully");
  });
});
