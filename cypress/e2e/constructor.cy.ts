describe('Сборка бургера', () => {
  const ingredientsList = {
    bun: 'Краторная булка N-200i',
    main: 'Говяжий метеорит (отбивная)',
    sauce: 'Соус с шипами Антарианского плоскоходца'
  };

  const DATACYS = {
    MODAL: '[data-cy=modal]',
    MODAL_OVERLAY: '[data-cy=modal-overlay]',
    MODAL_CLOSE_BUTTON: '[data-cy=modal-close-button]'
  };

  describe('Пользователь не авторизован', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');
      cy.visit('/');
      cy.wait(['@getIngredients']);
    });

    describe('Добавление ингредиента из списка ингредиентов в конструктор', () => {
      beforeEach(() => {
        Object.values(ingredientsList).forEach((ingredientName) => {
          cy.contains(ingredientName).parent().find('button').click();
        });
      });

      it('Добавление ингредиентов (и булок, и начинок) в конструктор - верное', () => {
        cy.contains('Оформить заказ')
          .parents('section')
          .first()
          .within(() => {
            cy.contains(ingredientsList.main).should('exist');
            cy.contains(ingredientsList.sauce).should('exist');
            cy.contains(ingredientsList.bun).should('exist');
            cy.contains('5598').should('exist');
          });
      });

      it('Проверяем очистку конструктора бургера от добавленных ингредиентов', () => {
        cy.contains('Оформить заказ')
          .parents('section')
          .first()
          .within(() => {
            [ingredientsList.main, ingredientsList.sauce].forEach((element) => {
              cy.contains(element)
                .parent()
                .find('.constructor-element__action')
                .click();
            });
            cy.contains(ingredientsList.bun).should('exist');
            cy.contains('2510').should('exist');
          });
      });

      describe('Тест работы модальных окон', () => {
        beforeEach(() => {
          cy.contains('Говяжий метеорит (отбивная)').parent().click();
        });
        it('Открытие модального окна ингредиента', () => {
          cy.get(DATACYS.MODAL).should(
            'contain',
            'Говяжий метеорит (отбивная)'
          );
        });

        it('Закрытие по клику на крестик', () => {
          cy.get(DATACYS.MODAL_CLOSE_BUTTON).click();
          cy.get(DATACYS.MODAL).should('not.exist');
        });

        it('Закрытие по клику на оверлей', () => {
          cy.get(DATACYS.MODAL_OVERLAY).click({ force: true });
          cy.get(DATACYS.MODAL).should('not.exist');
        });
      });
    });
  });

  describe('Создание заказа авторизованным пользователем', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'testAccess');
      cy.window().then((window) => {
        window.localStorage.setItem('refreshToken', 'testRefresh');
      });

      cy.intercept('GET', '/api/auth/user', {
        fixture: 'user.json'
      }).as('getUser');

      cy.intercept('GET', '/api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.visit('');
      cy.wait(['@getUser', '@getIngredients']);
    });

    it('Оформление заказа', () => {
      cy.intercept('POST', '/api/orders', {
        fixture: 'order.json',
        delay: 100
      }).as('postOrder');

      cy.contains(ingredientsList.bun).parent().find('button').click();
      cy.contains(ingredientsList.main).parent().find('button').click();

      cy.contains('Оформить заказ').click();

      cy.contains('Оформляем заказ...').should('exist');

      cy.wait('@postOrder').then(() => {
        cy.get(DATACYS.MODAL).should('contain', '78349');
        cy.get(DATACYS.MODAL_CLOSE_BUTTON).click();
        cy.get(DATACYS.MODAL).should('not.exist');

        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('exist');
        cy.contains('Оформить заказ').parent().contains('0').should('exist');
      });
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      cy.window().then((window) => {
        window.localStorage.removeItem('refreshToken');
      });
    });
  });
});
