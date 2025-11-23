// cypress/e2e/history_page.cy.js

describe("Historial de Órdenes - Filtros", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");

    cy.get('[data-cy="input-correo"]').type("admin@benditapatria.com");
    // Escribir contraseña
    cy.get('[data-cy="input-contra"]').type("hola123");
    // Click en botón de iniciar sesión
    cy.get('[data-cy="button-login"]').click();

    cy.url().should("not.include", "/login");
    cy.wait(2000);

    // 4. Abrir el menú sidebar
    cy.get('[data-cy="menu-button"]').click();

    // 5. Hacer click en la opción "Historial" del sidebar
    cy.get('[data-cy="sidebar-historial"]').click();

    cy.wait(2000); // Esperar a que la página cargue

    // Esperar a que los datos se carguen
    cy.get('[data-cy="orden-row"]').should("exist");
  });

  it("debe filtrar órdenes por búsqueda de cliente", () => {
    // Obtener el número inicial de órdenes
    cy.get('[data-cy="orden-row"]').then(($initialRows) => {
      const initialCount = $initialRows.length;

      // Buscar por un cliente específico
      cy.get('[data-cy="search-cliente"]').type("test");

      // Verificar que el número de filas cambió (disminuyó)
      cy.get('[data-cy="orden-row"]').should(($filteredRows) => {
        expect($filteredRows.length).to.be.lessThan(initialCount);
      });
    });
  });

  it("debe filtrar órdenes por estado", () => {
    // Obtener el número inicial de órdenes
    cy.get('[data-cy="orden-row"]').then(($initialRows) => {
      const initialCount = $initialRows.length;

      // Filtrar por estado "Cancelada"
      cy.get('[data-cy="select-estado"]').select("Cancelada");

      // Verificar que el número de filas cambió
      cy.get('[data-cy="orden-row"]').should(($filteredRows) => {
        expect($filteredRows.length).to.be.lessThan(initialCount);
      });

      // Verificar que las filas visibles tienen el estado seleccionado
      cy.get('[data-cy="orden-row"]').each(($row) => {
        cy.wrap($row).find("td").eq(2).should("contain", "Cancelada");
      });
    });
  });

  it("debe filtrar órdenes por empleado", () => {
    // Obtener el número inicial de órdenes
    cy.get('[data-cy="orden-row"]').then(($initialRows) => {
      const initialCount = $initialRows.length;

      // Seleccionar un empleado del dropdown (primer empleado disponible)
      cy.get('[data-cy="select-empleado"]')
        .find('option:not([value=""])')
        .first()
        .then(($option) => {
          const employeeValue = $option.val();
          const employeeName = $option.text();

          cy.get('[data-cy="select-empleado"]').select(employeeValue);

          // Verificar que el número de filas cambió
          cy.get('[data-cy="orden-row"]').should(($filteredRows) => {
            expect($filteredRows.length).to.be.lessThan(initialCount);
          });
        });
    });
  });
});
