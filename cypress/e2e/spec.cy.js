describe("Módulo de Productos", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  //PRUEBA 1
  it("Debería de abrir el add modal", () => {
    cy.get('[data-cy="arrow-Snacks"]').click();
    cy.contains("Pan de Muerto").should("be.visible");

    cy.get('[data-cy="arrow-Pan de Muerto"]').click();
    cy.contains("Confirm").should("be.visible");
  });

  //PRUEBA 1
  it("Debería de agregar un producto al carrito", () => {
    cy.get('[data-cy="arrow-Snacks"]').click();
    cy.contains("Pan de Muerto").should("be.visible");

    cy.get('[data-cy="arrow-Pan de Muerto"]').click();
    cy.contains("Confirm").should("be.visible");

    cy.get('[data-cy="confirm-add-button"]').click();
    cy.get('[data-cy="close-modal-button"]').click();
    cy.contains("Total a Pagar:").should("be.visible");
  });

  //PRUEBA 1
  it("Debería de cerrar el ad modal", () => {
    cy.get('[data-cy="arrow-Snacks"]').click();
    cy.contains("Pan de Muerto").should("be.visible");

    cy.get('[data-cy="arrow-Pan de Muerto"]').click();
    cy.contains("Confirm").should("be.visible");

    cy.get('[data-cy="confirm-add-button"]').click();
    cy.get('[data-cy="close-modal-button"]').click();
    cy.contains("Total a Pagar:").should("be.visible");
  });

  //PRUEBA 2
  it("Debería de eliminar el producto agregado del carrito", () => {
    cy.get('[data-cy="arrow-Snacks"]').click();
    cy.contains("Pan de Muerto").should("be.visible");

    cy.get('[data-cy="arrow-Pan de Muerto"]').click();
    cy.contains("Confirm").should("be.visible");

    cy.get('[data-cy="confirm-add-button"]').click();
    cy.get('[data-cy="close-modal-button"]').click();
    cy.contains("Total a Pagar:").should("be.visible");

    cy.get('[data-cy="delete-product"]').click();
    cy.contains("Total a Pagar:").should("not.exist");
  });

  //PRUEBA 2
  it("Debería de crear una orden con el producto agregado", () => {
    cy.get('[data-cy="arrow-Snacks"]').click();
    cy.contains("Pan de Muerto").should("be.visible");

    cy.get('[data-cy="arrow-Pan de Muerto"]').click();
    cy.contains("Confirm").should("be.visible");

    cy.get('[data-cy="confirm-add-button"]').click();
    cy.get('[data-cy="close-modal-button"]').click();
    cy.contains("Total a Pagar:").should("be.visible");

    cy.get('[data-cy="confirm-order-button"]').click();

    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("Luis"); // "Luis" es el texto que quieres ingresar
    });

    cy.contains("Total a Pagar:").should("not.exist");
  });
});
