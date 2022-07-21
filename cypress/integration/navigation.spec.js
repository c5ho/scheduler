it("should navigate to Tuesday", () => {
  cy.visit("/").get("li")
  .contains("[data-testid=day]", "Tuesday")
  .click()
  .should("have.class", "day-list__item--selected")
});