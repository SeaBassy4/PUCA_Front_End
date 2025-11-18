//Prueba 1 de login sin contraseña
describe("Pruebas de Login", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });

  it("Debe mostrar error si se intenta iniciar sesión sin contraseña", () => {
    
    // Escribir solo correo
    cy.get('[data-cy="input-correo"]').type("usuario@correo.com");

    // Dejar contraseña vacía

    // Click en botón de iniciar sesión
    cy.get('[data-cy="button-login"]').click();

    // Validar el toast
    cy.get(".Toastify__toast")
      .should("be.visible")
      .and("contain", "Por favor, completa todos los campos correctamente");
  });

});

//Prueba 2 de login sin usuario
describe("Pruebas de Login", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });
    it("Debe mostrar error si se intenta iniciar sesión sin usuario", () => {
    // Escribir solo contraseña
    cy.get('[data-cy="input-contra"]').type("contraseña123");
    // Dejar correo vacía
    // Click en botón de iniciar sesión
    cy.get('[data-cy="button-login"]').click();

    // Validar el toast
    cy.get(".Toastify__toast")
      .should("be.visible")
      .and("contain", "Por favor, completa todos los campos correctamente");
  });
});

//Prueba 3 de login con ambos campos vacíos
describe("Pruebas de Login", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });
    it("Debe mostrar error si se intenta iniciar sesión sin usuario ni contraseña", () => {
    // Dejar ambos campos vacíos
    // Click en botón de iniciar sesión
    cy.get('[data-cy="button-login"]').click();

    // Validar el toast
    cy.get(".Toastify__toast")
      .should("be.visible")
      .and("contain", "Por favor, completa todos los campos correctamente");
  });
});

//Prueba 4 de login con usuario inactivo
describe("Pruebas de Login", () => {
    beforeEach(() => {
    cy.visit("http://localhost:5173/login");
    });
    it("Debe mostrar error si se intenta iniciar sesión con un usuario inactivo", () => {
    // Escribir correo de usuario inactivo
    cy.get('[data-cy="input-correo"]').type("gaelalejandrochino@tucson.com");
    // Escribir contraseña
    cy.get('[data-cy="input-contra"]').type("contra");
    // Click en botón de iniciar sesión
    cy.get('[data-cy="button-login"]').click();
    // Validar el toast
    cy.get(".Toastify__toast")
      .should("be.visible")
      .and("contain", "Por favor, completa todos los campos correctamente");
  });
});

//Prueba 5 de login exitoso
describe("Pruebas de Login", () => {
    beforeEach(() => {
    cy.visit("http://localhost:5173/login");
    });
    it("Debe iniciar sesión correctamente con credenciales válidas", () => {
    // Escribir correo de usuario activo
    cy.get('[data-cy="input-correo"]').type("admin@benditapatria.com");
    // Escribir contraseña
    cy.get('[data-cy="input-contra"]').type("hola123");
    // Click en botón de iniciar sesión
    cy.get('[data-cy="button-login"]').click();
    // Validar redirección a la página de productos
    cy.url().should("include", "/productos");
  });
});