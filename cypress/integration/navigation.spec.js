describe("Navigation", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3001/api/debug/reset");
    cy.visit("/");
  });

  xit("should visit root", () => {

  });

  xit("should nagivate to Tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });

  xit("should book an interview", () => {
    cy.contains("Monday")

    cy.get("[alt='Add']")
      .first()
      .click();

    cy.get("[data-testid='student-name-input']")
      .type("Lydia Miller-Jones")

    cy.get("li")
      .children("[alt='Sylvia Palmer']")
      .click()

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
  });

  xit("should edit an interview", () => {
    cy.contains(".appointment__card--show", "Archie Cohen")
      .get("[alt='Edit']")
      .click({ force: true })
      .get("[data-testid='student-name-input']")
      .clear()
      .type("Bob")
    cy.get("li")
      .children("[alt='Tori Malcolm']")
      .click()

    cy.contains("Save")
      .click()
    cy.get("[alt='Tori Malcolm']")
  });

  xit("should cancel an interview", () => {
    cy.contains(".appointment__card--show", "Archie Cohen")
      .get("[alt='Delete']")
      .click({ force: true })
    cy.contains("Confirm")
      .click()
      cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });

  it("should validate for name and interviewer then submit", () => {
    cy.contains(".appointment__card--show", "Archie Cohen")
    cy.get("[alt='Add']")
      .first()
      .click()
    cy.contains("Save")
      .click()
    cy.contains("Student name cannot be blank")
      .should("exist")
    cy.get("[data-testid='student-name-input']")
      .type("Bob")
    cy.contains("Save")
      .click()
    cy.contains("Student name cannot be blank")
      .should("not.exist")
    cy.contains("Please select an interviewer")
      .should("exist")
    cy.get("li")
      .children("[alt='Sylvia Palmer']")
      .click()
    cy.contains("Save")
      .click()
    cy.contains("Saving")
      .should("exist")
    cy.contains("Saving")
      .should("not.exist")
    cy.contains(".appointment__card--show", "Bob")
      .should("exist")
  })
});
