// cypress/e2e/reportes.cy.js

describe("Reportes – Pruebas completas", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");

    cy.get('[data-cy="input-correo"]').type("admin@benditapatria.com");
    cy.get('[data-cy="input-contra"]').type("hola123");
    cy.get('[data-cy="button-login"]').click();

    cy.url().should("not.include", "/login");
    cy.wait(1200);

    // Abrir menú lateral
    cy.get('[data-cy="menu-button"]').click();

    // Entrar a Reportes
    cy.get('[data-cy="sidebar-reportes"]').click();

    cy.wait(1200);

    // El wrapper del DatePicker debe existir
    cy.get('[data-cy="datepicker-wrapper"]').should("exist");
  });

  it("debe mostrar el DatePicker", () => {
    cy.get('[data-cy="datepicker-wrapper"] .react-datepicker')
      .should("exist")
      .and("be.visible");
  });

  it("debe permitir seleccionar una fecha", () => {
    // abrir datepicker (react-datepicker renderiza automáticamente al cargar)
    cy.get('[data-cy="datepicker-wrapper"] .react-datepicker')
      .should("exist");

    // seleccionar día 1
    cy.get(".react-datepicker__day")
      .contains(/^1$/)
      .click({ force: true });

    // verificar panel derecho
    cy.get('[data-cy="selected-date"]')
      .should("not.contain", "Seleccione una fecha");
  });

  it("debe habilitar los checkboxes cuando se selecciona una fecha", () => {
    // seleccionar fecha
    cy.get(".react-datepicker__day")
      .contains(/^1$/)
      .click({ force: true });

    // verificar habilitados
    cy.get('[data-cy^="checkbox-"]').each(($el) => {
      expect($el).not.to.have.attr("disabled");
    });
  });

  it("debe permitir activar columnas antes de exportar", () => {
    cy.get(".react-datepicker__day")
      .contains(/^1$/)
      .click({ force: true });

    cy.get('[data-cy="checkbox-nombreCliente"]').check({ force: true });
    cy.get('[data-cy="checkbox-nombreCliente"]').should("be.checked");
  });

  it("debe activar la exportación solo cuando hay fecha", () => {
    cy.get('[data-cy="export-selection"]').should("be.disabled");

    cy.get(".react-datepicker__day")
      .contains(/^1$/)
      .click({ force: true });

    cy.get('[data-cy="export-selection"]').should("not.be.disabled");
  });

  it("debe mostrar alerta cuando se intenta exportar sin fecha", () => {
    cy.on("window:alert", (msg) => {
      expect(msg).to.include("Seleccione una fecha");
    });

    cy.get('[data-cy="export-selection"]').click({ force: true });
  });
});
