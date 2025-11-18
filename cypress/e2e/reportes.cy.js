describe("Módulo de Reportes", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/reportes");
  });

  //PRUEBA 1
  it("Debería de ", () => {
    cy.get('[data-cy="arrow-Snacks"]').click();
    cy.contains("Pan de Muerto").should("be.visible");

    cy.get('[data-cy="arrow-Pan de Muerto"]').click();
    cy.contains("Confirm").should("be.visible");
  });
});
