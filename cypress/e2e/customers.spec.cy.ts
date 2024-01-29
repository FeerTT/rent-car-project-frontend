const URL_BASE = Cypress.config().baseUrl;

describe("E2E Customers Test", () => {
  it("should visit localhost:3000, create a new customer, modify it, and delete it", () => {
    cy.visit(URL_BASE || "/");
    cy.url().should("include", URL_BASE);

    cy.contains("Create new Customer").click();
    cy.get("#customerForm").within(() => {
      cy.get("#firstName").type("Fernando");
      cy.get("#lastName").type("Example");
      cy.get("#email").type("fernando.example@gmail.com");
      cy.get("#phone").type("15423232");
      cy.get("#documentType").type("Passport");
      cy.get("#documentNumber").type("425522113");
      cy.get("#nationality").type("Argentinian");
      cy.get("#birthDate").type("1990-01-01");
      cy.get("#address").type("123 Main St, Paraná, Argentina");

      cy.get("button.is-primary[type='submit']").click();
      cy.wait(1000);
    });

    cy.get("#customerForm").should("have.value", "");

    cy.get("#customerForm").within(() => {
      cy.get("#firstName").type("Florencia");
      cy.get("#lastName").type("Example");
      cy.get("#email").type("florencia.example@gmail.com");
      cy.get("#phone").type("1552324");
      cy.get("#documentType").type("Passport");
      cy.get("#documentNumber").type("42564321");
      cy.get("#nationality").type("Brazilian");
      cy.get("#birthDate").type("2000-01-01");
      cy.get("#address").type("123 Main St, Paraná, Argentina");
      cy.get("button.is-primary[type='submit']").click();
    });
    cy.wait(2000);
    cy.get("#customerForm").should("have.value", "");
    const generatedValues = {
      firstName: "Fernando",
      lastName: "Example",
      email: "fernando.example@gmail.com",
      phone: "15423232",
      documentType: "Passport",
      documentNumber: "425522113",
      nationality: "Argentinian",
      birthDate: "1990-01-01",
      address: "123 Main St, Paraná, Argentina",
    };

    cy.contains("Customer List").click();
    cy.url().should("include", "/customers");

    let customerFound = false;
    cy.wait(2000);
    cy.get(".table tbody tr").each(($row, index) => {
      const firstNameCell = $row.find("td").eq(1);
      const lastNameCell = $row.find("td").eq(2);
      const emailCell = $row.find("td").eq(3);

      const firstName = firstNameCell.text().trim();
      const lastName = lastNameCell.text().trim();
      const email = emailCell.text().trim();

      if (
        firstName === generatedValues.firstName &&
        lastName === generatedValues.lastName &&
        email === generatedValues.email
      ) {
        cy.get(".table tbody tr").eq(index).find("td").eq(0).find("a").click();
        customerFound = true;
        return false;
      }
    });

    cy.url().should("include", "/customers/");
    cy.contains("Modify").click();
    cy.get("#firstNameModify").clear().type("Jazmin");
    cy.get("#lastNameModify").clear().type("Hernandez");
    cy.get("#emailModify").clear().type("jazmin.example@hotmail.com");
    cy.get("#phoneModify").clear().type("155325436");
    cy.get("#documentTypeModify").clear().type("DNI");
    cy.get("#documentNumberModify").clear().type("42852444");
    cy.get("#nationalityModify").clear().type("American");
    cy.get("#birthDateModify").clear().type("2002-08-09");
    cy.get("#addressModify").clear().type("Ramirez, Entre Rios, Argentina");

    cy.get("footer.modal-card-foot button.is-warning").click();
    cy.intercept("PUT", "**/customers/*").as("putRequest");

    cy.wait("@putRequest").should((interception) => {
      expect(interception.response).to.exist;
      expect(interception.response!.statusCode).to.equal(200);
    });

    cy.get(".button.is-danger.is-small").click();
    cy.intercept("DELETE", "**/customers/*").as("deleteRequest");

    cy.wait("@deleteRequest").should((interception) => {
      expect(interception.response).to.exist;
      expect(interception.response!.statusCode).to.equal(200);
    });
    cy.visit(URL_BASE || "/");
  });
});
