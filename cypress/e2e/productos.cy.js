describe("Productos CRUD (Admin)", () => {
  beforeEach(() => {
    // 1. Visitar la página de Login (la raíz)
    cy.visit("http://localhost:5173/productos");

    // 2. Llenar formulario y hacer login
    cy.get("#correo").type("admin@benditapatria.com");
    cy.get("#contra").type("hola123");
    cy.get('button[type="submit"]').click();

    // 3. Verificar que fuimos redirigidos a /productos
    cy.url().should("include", "/productos");
    
    // 4. Verificar que un elemento clave del dashboard esté visible
    cy.contains("Categoría de Productos").should("be.visible");
  });

  // --- PRUEBA 1: LEER (READ) ---
  it("Debería mostrar la lista de productos", () => {
    // Esperar a que el texto "Cargando" desaparezca
    cy.contains("Cargando productos...").should("not.exist");

    // Verificar que un producto conocido (de la BD) esté visible
    cy.contains("Pan de Muerto").should("be.visible");
  });

  // --- PRUEBA 2: FILTRAR (READ-FILTER) ---
  it("Debería filtrar los productos por categoría", () => {
    // 1. Esperar a que cargue la lista completa
    cy.contains("Cargando productos...").should("not.exist");

    // 2. Asegurarse de que productos de diferentes categorías sean visibles
    cy.contains("Boneless").should("be.visible");
    cy.contains("Té Verde").should("be.visible");

    // 3. Seleccionar "Café" en el filtro
    // (Usamos el 'id' del <select>)
    cy.get("#categoria").select("Snacks"); 

    // 4. Verificar que el producto de "Café" sigue visible
    cy.contains("Pan de Muerto").should("be.visible");

    // 5. Verificar que el producto de "Té" ya NO está visible
    cy.contains("Té Verde").should("not.exist");
  });

  // --- PRUEBA 3: CREAR (CREATE) ---
  it("Debería poder crear un nuevo producto", () => {
    const nombreProductoNuevo = "Café de Prueba Cypress";
    // 1. Clic en el botón "Añadir" (de productos)
    // (Requiere data-cy="crear-producto-button")
    cy.get('[data-cy="crear-producto-button"]').click();

    // 2. Llenar el formulario en el modal
    cy.get('[data-cy="input-nombre"]').type(nombreProductoNuevo);
    cy.get('[data-cy="input-precio"]').type("99");
    cy.get('[data-cy="select-categoria"]').select("Snacks"); // Asumiendo que "Café" es una opción
    cy.get('[data-cy="input-descripcion"]').type("Descripción de prueba automatizada");
    // (Omitimos la subida de imagen por simplicidad, asumiendo que no es 100% obligatoria)

    // 3. Guardar el nuevo producto
    cy.get('[data-cy="confirmar-modal-button"]').click();

    // 4. Verificar que el producto nuevo aparece en la lista (esperando el refetch)
    cy.contains("Cargando productos...").should("not.exist"); 
    cy.contains(nombreProductoNuevo).should("be.visible");
  });

// --- PRUEBA 4: ACTUALIZAR (UPDATE) ---
it("Debería poder editar un producto existente", () => {
  const nuevoPrecio = "55";

  // 1. Esperar a que cargue la lista
  cy.contains("Cargando productos...").should("not.exist");

  // 2. Hacer clic en la flecha del producto
  // (Esta prueba usa "Boneless" como ejemplo)
  cy.get('[data-cy="arrow-Boneless"]').click();
  
  // 3. Verificar que se abrió el modal de edición
  cy.contains("Editar Producto: Boneless").should("be.visible");

  // 4. Modificar el precio (usa el data-cy de InputLabel)
  cy.get('[data-cy="input-precio"]')
    .clear()
    .type(nuevoPrecio);

  // 5. Guardar los cambios (usa el data-cy de Modal.jsx)
  cy.get('[data-cy="confirmar-modal-button"]').click();
  
  // 6. (Opcional pero recomendado) Verificar que el modal se cerró
  cy.contains("Editar Producto: Boneless").should("not.exist");

  // 7. (Opcional avanzado) Volver a abrir el modal y verificar que el precio SÍ cambió
});

  // --- PRUEBA 5: ELIMINAR (DELETE) ---
  it("Debería poder eliminar el producto creado", () => {
    // Usamos el producto que creamos en la PRUEBA 3
    const nombreProductoABorrar = "Café de Prueba Cypress";

    // 1. Esperar a que cargue la lista
    cy.contains("Cargando productos...").should("not.exist");

    // 2. Asegurarse de que el producto a borrar exista
    cy.get('[data-cy="arrow-Boneless"]').click();

    // 3. Abrir su modal de edición
    cy.contains("Editar Producto: Boneless").should("be.visible");

    // 4. Clic en el botón de eliminar dentro del modal
    cy.get('[data-cy="eliminar-modal-button"]').click();

    // (Cypress acepta el "window.confirm" automáticamente)

    // 5. Verificar que el producto ya no existe (esperando el refetch)
    cy.contains("Cargando productos...").should("not.exist"); 
    cy.contains(nombreProductoABorrar).should("not.exist");
  });
});