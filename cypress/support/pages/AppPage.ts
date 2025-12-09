export class AppPage {
  static open() {
    cy.visit('http://localhost:4000');
  }

  static loginAsUser() {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'mockRefreshToken');
    cy.visit('http://localhost:4000');
  }
}
