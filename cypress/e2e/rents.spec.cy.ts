const baseUrl = Cypress.config().baseUrl;
describe("E2E Rents test", () => {
  it("should visit localhost:3000, go to create new rent, create a new rent, go to details, modify it and delete it.", () => {
    cy.visit(baseUrl || "/");
    cy.contains("Create new Rent").click();
    cy.get("#carId")
      .find("option:not(:disabled)")
      .first()
      .then((option) => {
        cy.get("#carId").select(option.val() as number);
      });
    cy.get("#customerId")
      .find("option:not(:disabled)")
      .first()
      .then((customerOption) => {
        cy.get("#customerId").select(customerOption.val() as number);
      });
    const unitValue = "10";
    cy.get("#unitPrice").clear().type(unitValue);

    const currentDate = new Date();
    const startDate = currentDate.toISOString().split("T")[0];
    cy.get("#startDate").type(startDate);

    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 7);
    const formattedEndDate = endDate.toISOString().split("T")[0];

    cy.get("#endDate").type(formattedEndDate);
    const totalValue = "70";
    cy.get("#totalPrice").clear().type(totalValue);
    cy.get("#paymentMethod").clear().type("cash");
    cy.get("#isPaid").check();
    cy.get("button.is-primary[type='submit']").click();

    cy.wait(1000);
    cy.visit(`${baseUrl}/rents`);

    cy.get(".table tbody tr")
      .first()
      .within(() => {
        cy.get("td").eq(0).click();
      });

    cy.url().should("include", "/rents/");
    cy.get(".container .button.is-warning").click();
    cy.get("#modifyModal").should("be.visible");

    cy.get(".modal-content").should("include.text", "Modify Rent");
    cy.get("#carIdModify")
      .find("option:not(:disabled)")
      .eq(1)
      .then((option) => {
        cy.get("#carIdModify").select(option.val() as number);
      });
    cy.get("#unitPriceModify").clear().type("15");
    cy.get("#endDateModify").clear().type("2024-02-01");
    cy.get("#totalPriceModify").clear().type("100");
    cy.get("#paymentMethodModify").clear().type("card");
    cy.get("#isPaidModify").uncheck();

    cy.intercept("PUT", "**/rents/*").as("putRequest");
    cy.get("footer.modal-card-foot button.is-warning").click();
    cy.wait("@putRequest").should((interception) => {
      expect(interception.response).to.exist;
      expect(interception.response!.statusCode).to.equal(200);
    });

    cy.get(".table tbody tr:last-child").within(() => {
      cy.intercept("DELETE", "**/rents/*").as("deleteRequest");

      cy.get(".button.is-danger.is-small").click();
      cy.wait("@deleteRequest").should((interception) => {
        expect(interception.response).to.exist;
        expect(interception.response!.statusCode).to.equal(200);
      });
    });
    cy.visit(baseUrl || "/");
    cy.url().should("eq", `${baseUrl}/` || "/");

    cy.log("Test completed successfully");
  });
});
