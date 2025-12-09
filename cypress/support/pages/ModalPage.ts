export class ModalPage {
  static getModal() {
    return cy.get('[data-cy=modal]', { timeout: 10000 });
  }
  static getCloseButton() {
    return cy.get('[data-cy=close-button]');
  }
  static getOverlay() {
    return cy.get('[data-cy=overlay]');
  }
  static getOrderNumber() {
    return cy.contains('60185');
  }
}
