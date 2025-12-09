import { BurgerIngredientsPage } from '../support/pages/BurgerIngredientsPage';
import { BurgerConstructorPage } from '../support/pages/BurgerConstructorPage';
import { ModalPage } from '../support/pages/ModalPage';
import { AppPage } from '../support/pages/AppPage';

describe('Stellar Burgers – e2e тесты с Page Object Model', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    AppPage.loginAsUser();
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
    localStorage.clear();
  });

  it('TC-SB-01,02 – Открытие и закрытие модалки ингредиента', () => {
    BurgerIngredientsPage.getIngredientCard('Краторная булка N-200i').click();
    ModalPage.getModal().should('be.visible');
    cy.contains('Детали ингредиента').should('be.visible');

    ModalPage.getCloseButton().click();
    ModalPage.getModal().should('not.exist');
  });

  it('TC-SB-03,04 – Добавление ингредиентов в конструктор', () => {
    BurgerIngredientsPage.getAddButtonInCategory('Булки').click();
    BurgerConstructorPage.getBunPlaceholder().should('not.exist');

    BurgerIngredientsPage.getAddButtonInCategory('Соусы').click();
    BurgerIngredientsPage.getAddButtonInCategory('Начинки').click();
    BurgerConstructorPage.getMainPlaceholder().should('not.exist');
  });

  it('TC-SB-05,06 – Полный сценарий оформления заказа', () => {
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    BurgerIngredientsPage.getAddButtonInCategory('Булки').click();
    BurgerIngredientsPage.getAddButtonInCategory('Начинки').click();
    BurgerIngredientsPage.getAddButtonInCategory('Соусы').click();

    BurgerConstructorPage.getOrderButton().click();

    cy.wait('@postOrder');
    ModalPage.getModal().should('be.visible');
    ModalPage.getOrderNumber().should('be.visible');

    ModalPage.getCloseButton().click();
    ModalPage.getModal().should('not.exist');

    BurgerConstructorPage.getBunPlaceholder().should('be.visible');
    BurgerConstructorPage.getMainPlaceholder().should('be.visible');
  });
});
