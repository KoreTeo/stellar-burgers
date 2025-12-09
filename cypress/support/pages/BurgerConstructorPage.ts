export class BurgerConstructorPage {
  static getBunPlaceholder() {
    return cy.contains('Выберите булки');
  }
  static getMainPlaceholder() {
    return cy.contains('Выберите начинку');
  }
  static getOrderButton() {
    return cy.contains('button', 'Оформить заказ');
  }
  static getTotalPrice() {
    return cy.get('[data-cy=total-price]');
  }
}
