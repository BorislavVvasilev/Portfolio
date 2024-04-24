import { test, expect } from '@playwright/test';
import { LastWillDetailsRequestModel } from '../../requestModels/lastWillDetailsRequestModel';
import { PropertyRegsiterApi } from '../../propertyRegisterApi';
import StringFunctions from '../../functions/string_functions';


test.describe('LastWillDetail API tests', () => {
  const propertyRegisterApi = new PropertyRegsiterApi();
  const stringFunctions = new StringFunctions();

  test('500 при невалидно Id', async ({ request }) => {
    // Arrange: подготваня на данни с невалидно id
    const lastWillDetailsRequestInvalidId: LastWillDetailsRequestModel = {
      id: 'test-56'
    };

    // Act: изпълняване на заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestInvalidId, request)

    //Assert: проверка за очакван код грешка
    expect(response.status()).toBe(500);
  });

  // Натискане на бутона нова регистрация
  test('500 при невалидно operation', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestInvalidOperation: LastWillDetailsRequestModel = {
      operation: 'test'
    };

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestInvalidOperation, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(500);
  });

  // Подаваме непопълнено полето за съдия по вписванията в таба заявител
  test('500 при непопълнено applicantId съдия', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestInvaidapplicantID: LastWillDetailsRequestModel = {
      id: "10004500100000004449",
      processId: stringFunctions.uuid(),
      operation: "save",
      updateCount: 0,
      applicantId: "",
      actTypeId: "10001100000000019578",
      bookTypeId: "10001100000000019600",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000022",
      lawAreaId: "10000900000000015838",
      registerNumber: "829",
      judgeId: "10003200100001001796",
      registrationDate: new Date(),
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173",
      notaryAct: true,
      notaryActYear: "2024",
      courtAct: false,
      otherAct: false,
      isOldActEntry: false
    };

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestInvaidapplicantID, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(500);
  });

  // Подаваме непопълнено полето за нотариус в таба заявител
  test('500 при непопълнено applicantId нотариус', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestInvaidapplicantID: LastWillDetailsRequestModel = {
      id: "10004500100000004449",
      processId: stringFunctions.uuid(),
      operation: "save",
      updateCount: 0,
      applicantId: "",
      actTypeId: "10001100000000019578",
      bookTypeId: "10001100000000019600",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000022",
      lawAreaId: "10000900000000015838",
      registerNumber: "829",
      judgeId: "10003200100001001796",
      registrationDate: new Date(),
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173",
      notaryAct: true,
      notaryActYear: "2024",
      courtAct: false,
      otherAct: false,
      isOldActEntry: false
    }
    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestInvaidapplicantID, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(500);
  });

  // Подаваме непопълено полето за съдия по вписванията в таба разпределение
  test('200 и грешка при непопълнено judgeId', async ({ request }) => {
    // Подготвяме данни с невалидна операция
    const lastWillDetailsRequestEmptyjudgeId: LastWillDetailsRequestModel = {
      id: "7883fd63-890f-4d5a-9423-d6ad2825c957",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001776",
      actTypeId: "10001100000000019578",
      bookTypeId: "10001100000000019600",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      judgeId: "",
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173"
    }
    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestEmptyjudgeId, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(200);

    const responseAsJson = await response.json();
    expect(responseAsJson['errors'][0]['error']).toEqual('Полето Съдия по вписванията е задължително.');
    expect(responseAsJson['isSuccess']).toBe(false);
  });

  // Подаваме непопълено полето книга в таба общи данни
  test('500 и грешка при непопълнено bookTypeId', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestEmptybookTypeId: LastWillDetailsRequestModel = {
      id: "10004500100000004449",
      processId: stringFunctions.uuid(),
      operation: "save",
      updateCount: 2,
      applicantId: "10003200100001001776",
      actTypeId: "10001100000000019606",
      bookTypeId: "",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      registerNumber: "829",
      volume: "1",
      page: 165,
      judgeId: "10003200100001001796",
      registrationDate: new Date(),
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173",
      notaryAct: false,
      courtAct: false,
      otherAct: false,
      isOldActEntry: false
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestEmptybookTypeId, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(500);
  });

  // Подаваме непопълено полето тип акт в таба общи данни
  test('200 и грешка при непопълнено actTypeId', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestEmptyactTypeId: LastWillDetailsRequestModel = {
      id: "f6866f57-bb1f-4ad9-a461-96a4bfbba4b2",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001776",
      actTypeId: "",
      bookTypeId: "10001100000000019601",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      judgeId: "10003200100001001895",
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173"
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestEmptyactTypeId, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(200);

    const responseAsJson = await response.json();
    expect(responseAsJson['errors'][0]['error']).toEqual('Полето за тип на акта е задължително.');
    expect(responseAsJson['isSuccess']).toBe(false);
  });

  // Подаваме невалидни данни в полето година, в нотариален акт, специфични данни от издателя
  test('200 и грешка при невалидно въведени данни в notaryActYear', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestInvalidnotaryActYear: LastWillDetailsRequestModel = {
      id: "82091914-1205-49ec-923c-72d19e099a8d",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001776",
      actTypeId: "10001100000000029637",
      bookTypeId: "10001100000000019601",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      judgeId: "10003200100001001903",
      registryOfficerId: "10003209500001001691",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173",
      notaryAct: true,
      notaryActNumber: "10",
      notaryActVolume: "10",
      notaryActRegnumber: "10",
      notaryActYear: "ггггъъг",
      isOldActEntry: false
    }
    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestInvalidnotaryActYear, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(200);

    const responseAsJson = await response.json();
    expect(responseAsJson['errors'][0]['error']).toEqual('Полето за година на дело за нотариален акт е невалидно.');
    expect(responseAsJson['isSuccess']).toBe(false);
  });


  // Подаваме непопълнено поле номер на акт в нотариален акт, специфични данни от издателя
  test('200 и грешка при празно поле в notaryActNumber', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestEmptynotaryActNumber: LastWillDetailsRequestModel = {
      id: "e37e3248-b11d-4392-b602-ca180f707010",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001776",
      actTypeId: "10001100000000019606",
      bookTypeId: "10001100000000019601",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      judgeId: "10003200100001001903",
      registryOfficerId: "10003209500001001691",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173",
      notaryAct: true,
      notaryActNumber: "",
      notaryActVolume: "10",
      notaryActRegnumber: "10",
      notaryActYear: "2023",
      isOldActEntry: false
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestEmptynotaryActNumber, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(200);

    const responseAsJson = await response.json();
    expect(responseAsJson['errors'][0]['error']).toEqual('Полето за номер на нотариален акт е задължително.');
    expect(responseAsJson['isSuccess']).toBe(false);
  });


  // Подаваме непопълнено поле том на нотариален акт в нотариален акт, специфични данни от издателя
  test('200 и грешка при празно поле в notaryActVolume', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestEmptynotaryActVolume: LastWillDetailsRequestModel = {
      id: "d92a0cbf-9e1f-45c7-8aca-91692c42f25c",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001776",
      actTypeId: "10001100000000019604",
      bookTypeId: "10001100000000019600",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      judgeId: "10003200100001001903",
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173",
      notaryAct: true,
      notaryActNumber: "10",
      notaryActVolume: "",
      notaryActRegnumber: "10",
      notaryActYear: "2023"
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestEmptynotaryActVolume, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(200);

    const responseAsJson = await response.json();
    expect(responseAsJson['errors'][0]['error']).toEqual('Полето за том на нотариален акт е задължително.');
    expect(responseAsJson['isSuccess']).toBe(false);
  });

  // Подаваме непопълнено поле номер на регистър на нотариален акт в нотариален акт, специфични данни от издателя
  test('200 и грешка при празно поле в notaryActRegnumber', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestEmptynotaryActRegnumber: LastWillDetailsRequestModel = {
      id: "d92a0cbf-9e1f-45c7-8aca-91692c42f25c",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001776",
      actTypeId: "10001100000000019604",
      bookTypeId: "10001100000000019600",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      judgeId: "10003200100001001903",
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173",
      notaryAct: true,
      notaryActNumber: "10",
      notaryActVolume: "10",
      notaryActRegnumber: "",
      notaryActYear: "2023"
    }
    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestEmptynotaryActRegnumber, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(200);

    const responseAsJson = await response.json();
    expect(responseAsJson['errors'][0]['error']).toEqual('Полето за номер на регистър на нотариален акт е задължително.');
    expect(responseAsJson['isSuccess']).toBe(false);
  });

  // Подаване на съществуващ номер на стар акт, при регистрация на стар акт
  test('200 и грешка при подаден съществуващ номер на стар акт в registerNumber', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const date = "1996-01-18T16:21:00";
    const lastWillDetailsRequestExistingregisterNumber: LastWillDetailsRequestModel = {
      id: "d92a0cbf-9e1f-45c7-8aca-91692c42f25c",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001776",
      actTypeId: "10001100000000019604",
      bookTypeId: "10001100000000019600",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      registerNumber: "100",
      judgeId: "10003200100001001903",
      registrationDate: new Date(date),
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019611",
      taxCurrencyId: "10000500000000000173",
      notaryAct: true,
      notaryActNumber: "10",
      notaryActVolume: "10",
      notaryActRegnumber: "10",
      notaryActYear: "2023",
      isOldActEntry: true
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestExistingregisterNumber, request);
    expect(response.status()).toBe(200);

    //Assert: проверяваме очаквания резултат
    const responseAsJson = await (await response).json();
    expect(responseAsJson['errors'][0]['error']).toEqual('Съществува документ със същия номер.');
    expect(responseAsJson['isSuccess']).toBe(false);
  });

  // Подаване на неизбран съд от частта за съдебно дело
  test('200 и грешка при неизбран courtActCourtId', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestInvalidcourtActCourtId: LastWillDetailsRequestModel = {
      id: "42aaae6e-0a4d-400a-911b-20c7d125a084",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001776",
      actTypeId: "10001100000000019606",
      bookTypeId: "10001100000000019601",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      judgeId: "10003200100001001794",
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173",
      courtAct: true,
      courtActCourtId: "",
      courtActYear: "2023"
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestInvalidcourtActCourtId, request);
    expect(response.status()).toBe(200);

    //Assert: проверяваме очаквания резултат
    const responseAsJson = await response.json();
    expect(responseAsJson['errors'][0]['error']).toEqual('Полето за съд от частта за съдебно дело е задължително.');
    expect(responseAsJson['isSuccess']).toBe(false);
  });

  // Подаване на ИД на нотариус от една служба в друга служба в заявител
  test('500 при подаден applicantId на адвокат от друга служба', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestWrongLawyerapplicantId: LastWillDetailsRequestModel = {
      id: "a7f7d5fa-6937-4815-bd18-2a5d94cc0a13",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003202300001001816",
      actTypeId: "10001100000000019606",
      bookTypeId: "10001100000000019601",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      judgeId: "10003200100001001794",
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173",
      isOldActEntry: false
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestWrongLawyerapplicantId, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(500);
  });

  // Подаване на ИД на съдия по вписванията от една служба в друга служба в заявител
  test('500 при подаден applicantId на съдия по вписванията от друга служба', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestWrongGudgeapplicantId: LastWillDetailsRequestModel = {
      id: "621661b3-6a1a-416c-aed1-f419ad7dfcc1",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001895",
      actTypeId: "10001100000000019579",
      bookTypeId: "10001100000000019601",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000022",
      lawAreaId: "10000900000000015860",
      judgeId: "10003200100001001895",
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173",
      isOldActEntry: false
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestWrongGudgeapplicantId, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(500);
  });


  // Подаване на празно поле за завещател при запазване на завещание в статус приключил акт
  test('200 с грешка при запзване статус приключил акт с празен legatorId', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestEmptylegatorId: LastWillDetailsRequestModel = {
      id: "a61b2410-1ec1-499e-9b49-cd6c55cc8c2e",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      applicantId: "10003200100001001776",
      judgeId: "10003200100001001895",
      bookTypeId: "10001100000000019600",
      actTypeId: "10001100000000019604",
      taxCurrencyId: "10000500000000000173",
      statusId: "10001100000000019599",
      processId: stringFunctions.uuid(),
      operation: "save",
      siteId: "001",
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      isOldActEntry: false
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestEmptylegatorId, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(200);

    const responseAsJson = await response.json();
    expect(responseAsJson['errors'][0]['error']).toEqual('Полето за завещател е задължително.');
    expect(responseAsJson['isSuccess']).toBe(false);
  });

  // Подаване на празно поле за дата на регистрация на стар акт
  test('200 с грешка при подаване на празно registrationDate', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestEmptyregistrationDate: LastWillDetailsRequestModel = {
      id: "e37e3248-b11d-4392-b602-ca180f707010",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001776",
      actTypeId: "10001100000000019604",
      bookTypeId: "10001100000000019600",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      registerNumber: "423",
      judgeId: "10003200100001001903",
      registryOfficerId: "10003209500001001691",
      entryTypeId: "10001100000000019611",
      taxCurrencyId: "10000500000000000173",
      isOldActEntry: true
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestEmptyregistrationDate, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(200);

    const responseAsJson = await response.json();
    expect(responseAsJson['errors'][0]['error']).toEqual('Невалидна дата на регистрация.');
    expect(responseAsJson['isSuccess']).toBe(false);
  });

  // Подаване на празно поле за страница на входящ регистар стар акт
  test('200 с грешка при подаване на празно page', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestEmptyPage: LastWillDetailsRequestModel = {
      id: "e37e3248-b11d-4392-b602-ca180f707010",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001776",
      actTypeId: "10001100000000019606",
      bookTypeId: "10001100000000019601",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      registerNumber: "423",
      volume: "2",
      judgeId: "10003200100001001903",
      registrationDate: new Date(),
      registryOfficerId: "10003209500001001691",
      entryTypeId: "10001100000000019611",
      taxCurrencyId: "10000500000000000173",
      isOldActEntry: true
    }

    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestEmptyPage, request);
    // Act: изпълняваме POST заявка към API-то
    expect(response.status()).toBe(200);

    //Assert: проверяваме очаквания резултат
    const responseAsJson = await response.json();
    expect(responseAsJson['errors'][0]['error']).toEqual('Необходимо е да зададете страница за входящият регистър.');
    expect(responseAsJson['isSuccess']).toBe(false);
  });

  // Подаване на празно поле за том на входящ регистар стар акт
  test('200 с грешка при подаване на празно volume', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestEmptyvolume: LastWillDetailsRequestModel = {
      registerNumber: "200",
      page: 2,
      registrationDate: new Date(),
      id: "5d632de2-c3c4-4c90-bfbd-dcbfa1f8899c",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      applicantId: "10003200100001001776",
      judgeId: "10003200100001001903",
      bookTypeId: "10001100000000019601",
      actTypeId: "10001100000000019606",
      taxCurrencyId: "10000500000000000173",
      statusId: "10001100000000019598",
      processId: stringFunctions.uuid(),
      operation: "save",
      siteId: "001",
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019611",
      isOldActEntry: true
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestEmptyvolume, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(200);

    const responseAsJson = await response.json();
    expect(responseAsJson['errors'][0]['error']).toEqual('Необходимо е да зададете том за входящият регистър.');
    expect(responseAsJson['isSuccess']).toBe(false);
  });

  // Подаване на невалидни данни в полето такса в таба общи данни
  test('400 при подаване невалидни данни в taxValue', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestInvalidtaxValue: LastWillDetailsRequestModel = {
      id: "84dfd272-e389-4f5b-9de4-146f3ff8b577",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001776",
      actTypeId: "10001100000000029637",
      bookTypeId: "10001100000000019601",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "10000900000000015838",
      judgeId: "10003200100001001903",
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      taxValue: "тест",
      taxCurrencyId: "10000500000000000173",
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestInvalidtaxValue, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(400);
  });

  // Подаваме празно тип лице в заявител
  test('500 при празно applicantTypeId', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestEmptyapplicantTypeId: LastWillDetailsRequestModel = {
      id: "799888af-e960-4bc7-825f-f7f92d7af4ce",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001776",
      actTypeId: "10001100000000019604",
      bookTypeId: "10001100000000019600",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "",
      lawAreaId: "10000900000000015838",
      judgeId: "10003200100001001794",
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173",
      isOldActEntry: false
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestEmptyapplicantTypeId, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(500);
  });

  // Подаваме празно съдебен район в заявител
  test('500 при празно lawAreaId', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestEmptylawAreaId: LastWillDetailsRequestModel = {
      id: "799888af-e960-4bc7-825f-f7f92d7af4ce",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001776",
      actTypeId: "10001100000000019604",
      bookTypeId: "10001100000000019600",
      statusId: "10001100000000019598",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      lawAreaId: "",
      judgeId: "10003200100001001794",
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173",
      isOldActEntry: false
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestEmptylawAreaId, request);
    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(500);
  });

  // Подаваме празно статус на завещанието
  test('500 при празно statusId', async ({ request }) => {
    //Arrange: подготвяме данни с невалидна операция
    const lastWillDetailsRequestEmptystatusId: LastWillDetailsRequestModel = {
      id: "799888af-e960-4bc7-825f-f7f92d7af4ce",
      processId: stringFunctions.uuid(),
      operation: "save",
      applicantId: "10003200100001001776",
      actTypeId: "10001100000000019604",
      bookTypeId: "10001100000000019600",
      statusId: "",
      siteId: "001",
      applicantTypeId: "10000500000000000021",
      awAreaId: "10000900000000015838",
      judgeId: "10003200100001001794",
      registryOfficerId: "10003200100001001902",
      entryTypeId: "10001100000000019609",
      taxCurrencyId: "10000500000000000173",
      isOldActEntry: false
    }

    // Act: изпълняваме POST заявка към API-то
    const response = await propertyRegisterApi.lastWillDetailsPOST(lastWillDetailsRequestEmptystatusId, request);

    //Assert: проверяваме очаквания резултат
    expect(response.status()).toBe(500);
  });

  const lastWillDetailsRequestnull: LastWillDetailsRequestModel = {
    id: "2261f3c9-a12f-498d-84c4-ab497361c617",
    processId: stringFunctions.uuid(),
    operation: "save",
    applicantId: "10003200100001001776",
    actTypeId: "10001100000000019606",
    bookTypeId: "10001100000000019601",
    statusId: "10001100000000019598",
    siteId: "001",
    applicantTypeId: "10000500000000000021",
    lawAreaId: "10000900000000015838",
    judgeId: "10003200100001001903",
    registryOfficerId: "10003209500001001691",
    entryTypeId: "10001100000000019609",
    taxValue: "10",
  }

  const lastWillDetailsRequestEmptyString: LastWillDetailsRequestModel = {
    id: "2261f3c9-a12f-498d-84c4-ab497361c617",
    processId: stringFunctions.uuid(),
    operation: "save",
    applicantId: "10003200100001001776",
    actTypeId: "10001100000000019606",
    bookTypeId: "10001100000000019601",
    statusId: "10001100000000019598",
    siteId: "001",
    applicantTypeId: "10000500000000000021",
    lawAreaId: "10000900000000015838",
    judgeId: "10003200100001001903",
    registryOfficerId: "10003209500001001691",
    entryTypeId: "10001100000000019609",
    taxValue: "10",
    taxCurrencyId: ""
  }

  const lastWillDetailsRequestEmptyStringSpace: LastWillDetailsRequestModel = {
    id: "2261f3c9-a12f-498d-84c4-ab497361c617",
    processId: stringFunctions.uuid(),
    operation: "save",
    applicantId: "10003200100001001776",
    actTypeId: "10001100000000019606",
    bookTypeId: "10001100000000019601",
    statusId: "10001100000000019598",
    siteId: "001",
    applicantTypeId: "10000500000000000021",
    lawAreaId: "10000900000000015838",
    judgeId: "10003200100001001903",
    registryOfficerId: "10003209500001001691",
    entryTypeId: "10001100000000019609",
    taxValue: "10", 
    taxCurrencyId: " "
  }

  const taxCurrencyIdTestCases = [
    { lastWillDetailsRequestModel: lastWillDetailsRequestnull, expectedCode: 200 },
    { lastWillDetailsRequestModel: lastWillDetailsRequestEmptyString, expectedCode: 200 },
    { lastWillDetailsRequestModel: lastWillDetailsRequestEmptyStringSpace, expectedCode: 200 },
  ];

  let testNumber = 0;
  for (const singleTestCase of taxCurrencyIdTestCases) {
    testNumber += 1;

    //Подаваме празна стойности за валута в таба общи данни
    test(`Сценарий ${testNumber}: taxCurrencyId: \"${singleTestCase.lastWillDetailsRequestModel.taxCurrencyId}\", expectedCode: ${singleTestCase.expectedCode}`, async ({ request }) => {

      // Act: изпълняваме POST заявка към API-то
      const response = await propertyRegisterApi.lastWillDetailsPOST(singleTestCase.lastWillDetailsRequestModel, request);
      //Assert: проверяваме очаквания резултат
      expect(response.status()).toBe(singleTestCase.expectedCode);

      const responseAsJson = await response.json();
      expect(responseAsJson['errors'][0]['error']).toEqual('Не сте избрали валута.');
      expect(responseAsJson['isSuccess']).toBe(false);
    });
  }
});