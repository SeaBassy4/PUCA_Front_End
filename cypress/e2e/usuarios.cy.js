/// <reference types="cypress" />

describe("Módulo de Usuarios - PUCA", () => {

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
    cy.get('[data-cy="sidebar-usuarios"]').click();

    cy.wait(1200);

    // El wrapper del DatePicker debe existir
    //cy.get('[data-cy="datepicker-wrapper"]').should("exist");
  });

  /*  Cargar pantalla */
  it("Carga la pantalla de Usuarios correctamente", () => {
    cy.contains("Usuarios del Sistema").should("exist");
    cy.get(".btn-add-user").should("exist");
    cy.get("table").should("exist");
  });

  /* Abrir modal Añadir */
  it("Abre el modal de Añadir Usuario", () => {
    cy.get(".btn-add-user").click();
    cy.contains("Añadir Usuario").should("exist");
  });

  /* Agregar usuario */
 it("Agrega un usuario con datos válidos", () => {

  cy.intercept("POST", "**/usuarios", {
    statusCode: 200,
    body: { ok: true }
  }).as("crearUsuario");

  cy.get(".btn-add-user").click();
  cy.contains("Añadir Usuario").should("exist");

  cy.get('[data-cy="input-nombre"]').type("Nuevo Usuario Test");
  cy.get('[data-cy="input-celular"]').type("6625559988");
  cy.get('[data-cy="input-correo"]').type("nuevo@test.com");
  cy.get('[data-cy="input-contra"]').type("123456");
  cy.get('[data-cy="select-rol"]').select("Empleado", { force: true });

  cy.contains("Confirm").click();
  cy.wait("@crearUsuario");

  cy.contains("¡Usuario agregado!").should("exist");
});


/*  Intentar agregar usuario con datos ERRÓNEOS */
it("Muestra errores al ingresar datos inválidos", () => {

  cy.get(".btn-add-user").click();
  cy.contains("Añadir Usuario").should("exist");

  // Nombre muy corto
  cy.get('[data-cy="input-nombre"]').type("A");

  // Celular con letras
  cy.get('[data-cy="input-celular"]').type("12abc");

  // Correo incorrecto
  cy.get('[data-cy="input-correo"]').type("correo_malo");

  cy.contains("Confirm").click();

  cy.contains("Debe tener al menos 2 caracteres").should("exist");
  cy.contains("Solo números permitidos").should("exist");
  cy.contains("Correo no válido").should("exist");
  cy.contains("La contraseña es obligatoria").should("exist");
  cy.contains("El rol es obligatorio").should("exist");

});



  /* Editar usuario */
  it("Abre el modal de edición y carga datos", () => {
    cy.get(".btn-edit-user").first().click();
    cy.contains("Editar Usuario").should("exist");
    cy.get('input[name="nombre"]').should("not.have.value", "");
  });

  /* Eliminar usuario */
  it("Permite eliminar un usuario", () => {

    cy.intercept("DELETE", "**/usuarios/*", {
      statusCode: 200,
      body: { ok: true }
    }).as("deleteUsuario");

    cy.get(".btn-delete-user").first().click();
    cy.contains("Sí, eliminar").click();

    cy.wait("@deleteUsuario");
  });

  /* Buscador */
  it("Filtra usuarios por texto", () => {
  cy.get('[data-cy="search-user"]').type("Carlos");

  cy.get("table").contains("Carlos").should("exist");
});

});
