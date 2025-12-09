export class BurgerIngredientsPage {
  static getIngredientCard(name: string) {
    return cy
      .get('[data-cy=ingredients-category]')
      .find('li')
      .first()
      .as('ingredient');
  }

  static getAddButtonInCategory(category: string) {
    return cy
      .contains('h3', category)
      .next('ul')
      .find('button')
      .contains('Добавить');
  }
}
