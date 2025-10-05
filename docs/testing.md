# Guía de Testing

## 1. Objetivo
Esta guía define los tipos de pruebas a realizar sobre el frontend de la aplicación, asegurando la calidad del software, la correcta interacción de los componentes y la experiencia del usuario.

---

## 2. Tipos de Pruebas

### 2.1. Unitarias
**Objetivo:** Validar la funcionalidad de componentes y funciones de manera aislada.  

**Qué probar:**  
1. Componentes individuales (inputs, botones, listas, modales).  
2. Funciones utilitarias (formatos de fecha, cálculos, validaciones).  
3. Validaciones de formularios (inputs obligatorios, patrones de texto, rangos numéricos).  

**Herramientas recomendadas:**  
- Jest  
- React Testing Library  
- Mocha  

**Ejemplo:**  
```javascript
describe('validateEmail', () => {
    it('should return true for a valid email', () => {
        expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should return false for an invalid email', () => {
        expect(validateEmail('test@com')).toBe(false);
    });
});
### 2.2 Integración
**Objetivo:** Verificar que varios componentes interactúan correctamente y que el estado se gestiona de manera adecuada.  

**Qué probar:**  
1. Flujos completos entre componentes.  
2. Interacción con APIs internas simuladas (mocking).  
3. Gestión de estado global o local (Redux, Context API, Zustand, etc.).  

**Herramientas recomendadas:**  
- Jest + React Testing Library  
- Testing Library DOM  
- Vitest  

**Ejemplo:**  
```javascript
describe('Login Component Integration', () => {
    it('should update the form state and submit data', () => {
        // Simular input del usuario
        // Simular click en botón
        // Verificar cambio de estado y envío de datos
    });
});
a### 2.3 E2E (End-to-End)
**Objetivo:** Simular escenarios reales de usuario y garantizar que los flujos críticos funcionan de principio a fin.  

**Qué probar:**  
1. Registro de usuario  
2. Inicio de sesión  
3. Compra o envío de formularios  

**Herramientas recomendadas:**  
- Cypress  
- Playwright  
- Selenium  

**Ejemplo (Cypress):**  
```javascript
describe('User Login Flow', () => {
    it('should allow a user to log in successfully', () => {
        cy.visit('/login');
        cy.get('#usuario').type('juan123');
        cy.get('#password').type('123456');
        cy.get('#loginButton').click();
        cy.contains('Bienvenido Juan'); // Verifica mensaje de bienvenida
    });
});
## 3. Buenas Prácticas

1. Mantener los tests independientes y aislados.  
2. Escribir tests claros y descriptivos (qué se prueba y qué se espera).  
3. Ejecutar los tests en entornos de desarrollo antes de pasar a producción.  
4. Usar mocks y stubs para APIs externas.  
5. Priorizar los flujos críticos de usuario en las pruebas E2E.  
