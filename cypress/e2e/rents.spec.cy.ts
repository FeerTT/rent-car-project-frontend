describe("template spec", () => {
  it("should visit localhost:3000, go to create new rent, create a new rent, go to details, modify it and delete it.", () => {
    cy.visit("http://localhost:3000/");
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
    cy.visit("http://localhost:3000/rents");

    cy.get(".table tbody tr").each(($row) => {
      const startDateCell = $row.find(".data-cell").eq(3);
      const endDateCell = $row.find(".data-cell").eq(4);
      const totalPriceCell = $row.find(".data-cell").eq(5);
      const carIdCell = $row.find(".data-cell").eq(1);
      const customerIdCell = $row.find(".data-cell").eq(2);
      const unitPriceCell = $row.find(".data-cell").eq(6);

      const startDateText = startDateCell.text();
      const endDateText = endDateCell.text();
      const totalPriceText = totalPriceCell.text();
      const carIdText = carIdCell.text();
      const customerIdText = customerIdCell.text();
      const unitPriceText = unitPriceCell.text();

      if (
        startDateText === startDate &&
        endDateText === formattedEndDate &&
        totalPriceText === "70" &&
        carIdText === "1" &&
        customerIdText === "1" &&
        unitPriceText === "10"
      ) {
        $row.find(".data-cell").eq(0).click();
      }
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
    cy.get("footer.modal-card-foot button.is-warning").click();

    cy.get("#carIdModify").should("have.value", "2");
    cy.get("#unitPriceModify").should("have.value", "15");
    cy.get("#endDateModify").should("have.value", "2024-02-01");
    cy.get("#paymentMethodModify").should("have.value", "card");
    cy.get("#isPaidModify").should("not.be.checked");
    cy.get(".table tbody tr:last-child").within(() => {
      cy.get(".button.is-danger.is-small").click();
    });
  });
});
