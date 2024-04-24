import { test, expect } from '@playwright/test';
import { PropertyRegsiterApi } from '../../propertyRegisterApi'
import { LastWillReportByLegatorModel } from '../../requestModels/lastWillReportByLegatorModel';

test.describe('Last Will Report By Legator API test', () => {
    const propertyRegisterApi = new PropertyRegsiterApi();


    test('500 при невалидно invalid legatorId', async ({ request }) => {    
        // Подготвяме данни с невалиден legatorId
        const lastWillReportByLegatorModelInvalidLegatorID: LastWillReportByLegatorModel = {
            fromDate: "2024-02-01T15:37:00",
            legatorId: "invalidLegatorId", // невалиден legatorId
            operation: "getparamkey",
        }

        // Act: изпълняване POST заявак към АПИ-то
        const response = await propertyRegisterApi.lastWillReportByLegatorPost(lastWillReportByLegatorModelInvalidLegatorID, request);

        // Assert: проверяване очаквания резултат
        expect(response.status()).toBe(500);
    });

    test('200 с грешка при невалидна операция', async ({ request }) => {
        // Подготвяме данни с невалидна операция
        const lastWillReportByLegatorModelWrongOperation: LastWillReportByLegatorModel = {
            fromDate: "2024-02-01T15:37:00",
            legatorId: "10000500000000000015",
            operation: "wrongOperation", // невалидна операция
        }

        // Act: изпълняване POST заявак към АПИ-то
        const response = await propertyRegisterApi.lastWillReportByLegatorPost(lastWillReportByLegatorModelWrongOperation, request);

        // Assert: проверяване очаквания резултат
        expect(response.status()).toBe(200);

        const responseAsJson = await response.json();
        expect(responseAsJson['errors'][0]['error']).toEqual('Operation is wrong');
    });

    test('400 при невалидно ToDate', async ({ request }) => {
        // Подготвяме данни с невалидно ToDate
        const lastWillReportByLegatorModelInvalidToDate: LastWillReportByLegatorModel = {
            fromDate: "2024-02-01T15:37:00",
            legatorId: "10000500000000000015",
            operation: "getparamkey",
            toDate: "1" // невалидно ToDate
        }

        // Act: изпълняване POST заявак към АПИ-то
        const response = await propertyRegisterApi.lastWillReportByLegatorPost(lastWillReportByLegatorModelInvalidToDate, request);

        // Assert: проверяване очаквания резултат
        expect(response.status()).toBe(400);
    });
    test('200 с грешка при подаване на дата надвишаваща днешна', async ({ request }) => {
        // Подготвяме данни с невалидно fromDate който е по-голям от toDate
        const lastWillReportByLegatorModelInvalidFromDate: LastWillReportByLegatorModel = {
            fromDate: "2024-02-01T15:37:00",
            legatorId: "10000500000000000015",
            operation: "getparamkey",
            toDate: "2023-02-01T15:37:00" 
        }

        // Act: изпълняване POST заявак към АПИ-то
        const response = await propertyRegisterApi.lastWillReportByLegatorPost(lastWillReportByLegatorModelInvalidFromDate, request);

        // Assert: проверяване очаквания резултат
        expect(response.status()).toBe(200);

        const responseAsJson = await response.json();
        expect(responseAsJson['errors'][0]['error']).toEqual('Полето за начална дата не трябва да надвишава крайната дата.');
    });
    test('200 с грешка при подаване на дата над позволеният интервал', async ({ request }) => {
        // Подготвяме данни с дата която е надвишаваща позволеният интервал
        const lastWillReportByLegatorModelInvalidRange: LastWillReportByLegatorModel = {
            fromDate: "2024-02-01T15:37:00",
            legatorId: "10000500000000000015",
            operation: "getparamkey",
            toDate: "2125-02-01T15:37:00" 
        }

        // Act: изпълняване POST заявак към АПИ-то
        const response = await propertyRegisterApi.lastWillReportByLegatorPost(lastWillReportByLegatorModelInvalidRange, request);

        // Assert: проверяване очаквания резултат
        expect(response.status()).toBe(200);

        const responseAsJson = await response.json();
        expect(responseAsJson['errors'][0]['error']).toEqual('Интервалът не може да надвишава 36525 дни.');
    });
    test('200 с грешка при подаване на fromDate дата в бъдеще и интервал над позволеният ', async ({ request }) => {    
        // Подготвяме данни с невалидно fromDate която е над позволеният интервал и е в бъдеще
        const lastWillReportByLegatorModelInvalidFromDateAndRange: LastWillReportByLegatorModel = {
            fromDate: "2025-02-01T15:37:00",
            legatorId: "10000500000000000015",
            operation: "getparamkey",
            toDate: "2126-02-01T15:37:00" 
        }

        // Act: изпълняване POST заявак към АПИ-то
        const response = await propertyRegisterApi.lastWillReportByLegatorPost(lastWillReportByLegatorModelInvalidFromDateAndRange, request);

        // Assert: проверяване очаквания резултат
        expect(response.status()).toBe(200);

        const responseAsJson = await response.json();
        expect(responseAsJson['errors'][0]['error']).toEqual('Полето за начална дата не трябва да надвишава днешната дата.');
    });
    test('400 при подаване на невалиден fromDate', async ({ request }) => {
        // Подготвяме данни с невалидно fromDate
        const lastWillReportByLegatorModelInvalidFromDate: LastWillReportByLegatorModel = {
            fromDate: "999-02-01T15:37:00",
            legatorId: "10000500000000000015",
            operation: "getparamkey",
            toDate: "1099-01T15:37:00" 
        }

        // Act: изпълняване POST заявак към АПИ-то
        const response = await propertyRegisterApi.lastWillReportByLegatorPost(lastWillReportByLegatorModelInvalidFromDate, request);

        // Assert: проверяване очаквания резултат
        expect(response.status()).toBe(400);
    });
}); 
