import { expect, test } from '@playwright/test';
import { Login } from '../../pages/loginPages/login';
import { PropertyPage } from '../../pages/vnpropertyPages/vnProperty';

test.describe('Търсене, преглед, редакция, справка за имот', () => {

    test.beforeEach(async ({ page }) => {
        const login = new Login(page);
        await login.navigateToHomePage();
        await login.loginAsSupervisorReporter();

        const VnPropertyPage = new PropertyPage(page);
        await VnPropertyPage.navigateTovnPropertyPage();
    });

    test('ТС – 39.1 Търсене на имот', async ({ page }) => {
        const vnPropertyPage = new PropertyPage(page);

        // Търсене на имот
        await vnPropertyPage.propertySearch.click();

        //Кликване на бутона за търсене
        await vnPropertyPage.searchBtn.click();

        // Проверяваме наличните колони в таблицата 
        const sectionsExistingColumns: string[] = [
            'Партида №',
            'Идентификатор',
            'Имот',
        ];

        for (const section of sectionsExistingColumns) {
            await expect(vnPropertyPage.table.findHeaderInTableByText(section)).toBeVisible();
            
        }

        //проверка на чек бокса 
        await vnPropertyPage.toggleInactiveProperties();

        // Ново търсене
        await vnPropertyPage.newSearchBtn.click();

        // Избиране на радиобутон "Търсене по данни за имот"
        await vnPropertyPage.detailsSearchCheckbox.click();

        // Попълване на полетата за търсене
        await vnPropertyPage.fillFields({
            propertyNumber: '1234',
            oldPropertyNumber: '5678',
            note: 'Забележка',
        });

        //Натискаме бутона за търсене 
        await vnPropertyPage.searchBtn.click();

        // Ново търсене
        await vnPropertyPage.newSearchBtn.click();

        // Избиране на радиобутон "Търсене по собственик"
        await vnPropertyPage.ownerSearchCheckbox.click();

        // Попълване на полето за търсене по собственик
        await vnPropertyPage.fillFields({
            ownerId: '9508061756',
        });

        //Натискаме бутона за  ново търсене
        await vnPropertyPage.newSearchBtn.click();

        //Проверяваме успешен запис
        await expect(vnPropertyPage.pageTitle).toBeVisible();
        await expect(vnPropertyPage.pageTitle).toHaveText('Търсене/добавяне на имот');
    });

    test('ТС – 39.2 Преглед и редакция на имот', async ({ page }) => {
        const vnPropertyPage = new PropertyPage(page);

        // Tърсене на имот
        await vnPropertyPage.propertySearch.click();

        //Натискаме бутона за търсене 
        await vnPropertyPage.searchBtn.click();

        //Натискаме бутон за Преглед/Редакция
        await vnPropertyPage.table.viewOrEditProperty();

        //Натискаме бутон Назад
        await vnPropertyPage.backBtn.click();

        //Проверяваме успешен запис
        await expect(vnPropertyPage.pageTitle).toBeVisible();
        await expect(vnPropertyPage.pageTitle).toHaveText('Търсене/добавяне на имот');
    });

    test('ТС – 39.3 Справка за имот', async ({ page }) => {
        const vnPropertyPage = new PropertyPage(page);

        // Tърсене на имот
        await vnPropertyPage.propertySearch.click();

        //Натискаме бутона за търсене 
        await vnPropertyPage.searchBtn.click();

        //Натискаме бутон за Справка за имот
        await vnPropertyPage.table.generatePropertyReport();

        //Проверяваме успешен запис
        await expect(vnPropertyPage.pageTitle).toBeVisible();
        await expect(vnPropertyPage.pageTitle).toHaveText('Търсене/добавяне на имот');
    });
});
