import { test, expect } from '@playwright/test';
import { PropertyRegsiterApi } from '../../propertyRegisterApi'
import { LastWillRegisterRequestModel } from '../../requestModels/lastWillRegisterRequestModel';

test.describe('Last Will  Register API test', () => {
    const propertyRegisterApi = new PropertyRegsiterApi();
    const operations = ['get', 'put', 'delete', 'patch', 'head', 'update', 'save'];

// Подготвяме данни с невалидна операция
test('400 при грешен формат на registrationData', async ({ request }) => {
    const lastWillRegisterRequestModelMissAtribute: LastWillRegisterRequestModel = {
       operation: "search",
       registrationDate: "+15005550009", 
    }
    
   // Act: изпълняване POST заявак към АПИ-то
   const response = await propertyRegisterApi.lastWillRegisterPOST(lastWillRegisterRequestModelMissAtribute, request);

   // Assert: проверяване очаквания резултат
   expect(response.status()).toBe(400);

});     

// Подготвяме данни с невалидна операция
test('400 при невалиден processId', async ({ request }) => {
    const lastWillRegisterRequestModelInvalidProcessId: LastWillRegisterRequestModel = {
        operation: "search",
        processId: "invalidProcessId",
       registerNumber: "827",
        }
       
        // Act: изпълняване POST заявак към АПИ-то
        const response = await propertyRegisterApi.lastWillRegisterPOST(lastWillRegisterRequestModelInvalidProcessId, request);

    // Assert: проверяване очаквания резултат
    expect(response.status()).toBe(400);

});

//Подготвяме данни с невалидна операция 
test(' 500 при Над допустим брой символи ', async ({ request }) => {
    const lastWillRegisterRequestModelManySymbols: LastWillRegisterRequestModel = {
        actTypeId: "#KR=JJ8eZQE=HrkKRE&09=2UAYgDNyDFbN0tXV$+9HhBmDArMPFOkXWrGNZUc75VH*$4kfv6!UhxP$Yp5+s9BnXh#JoNZGAXN0Q9cQ+SbR+kdU8#g@f1p7=mn7!9%3!6*j*XVYPHauv&Ba9+CRQ9CwkhBxw72A0zZ5YF1uQJJPs3q$+h9XW2Dfsc+M7DHRGeSV2#qgn*Uv*9RvQ@PNK&&ODuw*eJPhY$xqu!Po6982%d&5!Pv=2GSYFqKUxyY6g#qXsxxeK6Y&18A==e%umFQpShTMDKntp0mp#e*QpoSHPo=Wkjhcwu5s&Fyr2=B3yCoTgScPkEr%GO@%PeG9EtKVjnjFZMYbc#7@OOfw6NYRG=Fc@@81r17*Cvg+OkbhFacF$ZtVMsHa2b8e7=5BJ*sGG*v!QR1%TRN$60bBs62ySAnzjf0Cp0aR6xsdMoW6XmrKNqP#CzK+1T+=03OYh=Sm%ApeUjH@#OUsHAQTZc6mPZ$%cTSuqe$*ka04b@DWKhDCyH@b#@X2xjank9TJBSQoezUgNew+xnSuz3Nxy0TrOj!sTWrU5&%Gx!X*&uK4G#xfKdfMaaTWSWOY4kkZtkfR=7rAJX#kZxW$UzNEeD7UB19Svw6sOgn$H*Rcb8YO7#!*YojVFFpBzXSVkgRJpe3c$gy%Y1fk4y=FM=tSgB*#vSMbE1f9Weczufk3=S3QUGYfn9h2p9GbKuN9fnEDvOdGw+4TFAVHEc606RemSQVuENWF*#@UJQxSeNs0Punt686StoOYoWJEVPe%ju8G%52%#!t@X2m$VvJkzjSmBxt$RuAqGepSwRETpuho@22K6wwRVD3jh05CBWAg3EG!dM+UYJUJ12GJYoP=GkSvOta+zbKn!fNsZ9Cht*ZoEbfB5dCguXu5o#91Mj608ZyMSkZFMJq%HjrxB0=KaNVRgaG0425SCd5kyffMsRK7#oe8FCqAj4yv%OV4jm#rS=9dXtaJza5MsKaz3uFXTqvwtMSjh*=POKNYwSB4h2eO$KnB@Dcjwmg*oUs5x6vWF*0SdKMNM4CQv9JwKzaK=N*n+CoSCMf3qh*oDoqChNamUTe&EdxPQJU&govFFaftjeNcQ!WjAr=jOcp94GbS0BN*0AD*DD3Ws#2ozYBt*jPMZEVf9mYV+Ec@r&7g4Jq+Ze74uDEf1vNf8QZoHsvVKQbnCrwN%pH@zJT!Q+vmYspWBcXTrEvJm%JFv2X91C2$EJK!12@mEkFrjoMhN5eZhrDeyAcf@tCG2FaBpPyGQj7wDXpVJsw*SDx5rB!Tz9Y&dM7!Q4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%p",
        isSuccess: true,
        operation: "search",
        registerNumber: "827",
    }
    // Act: изпълняване POST заявак към АПИ-то
    const response = await propertyRegisterApi.lastWillRegisterPOST(lastWillRegisterRequestModelManySymbols, request);
    
    expect(response.status()).toBe(500);
    //Assert: проверяване очаквания резултат

});

//Подготвяме данни с невалидна операция
test('200 и грешка при Минимално допустими символи', async ({ request }) => {
    const lastWillRegisterRequestModelMinimumSymbol: LastWillRegisterRequestModel = {
        operation: "search",
        registerNumber: "827",
        filterApplicantString: "bob",
    }
    // Act: изпълняване POST заявак към АПИ-то
    const response = await propertyRegisterApi.lastWillRegisterPOST(lastWillRegisterRequestModelMinimumSymbol, request);

    // Assert: проверяване очаквания резултат
expect(response.status()).toBe(200);

const responseAsJson = await response.json();
expect(responseAsJson['errors'][0]['error']).toEqual('Въведете поне 4 символа в полето за заявител.');
expect(responseAsJson['isSuccess']).toBe(false);

});

//Изпращаме рекуест към боди атрибута registerNumber (№ от входящ регистър) голям брой символи над допустимите  30 от frondend-a
test('500 при повече символи ', async ({ request }) => {
   const lastWillRegisterRequestMoreSymbols: LastWillRegisterRequestModel = {
    operation: "search",
    registrationDate: "2023-09-26T00:00:00",
    registerNumber: "#KR=JJ8eZQE=HrkKRE&09=2UAYgDNyDFbN0tXV$+9HhBmDArMPFOkXWrGNZUc75VH*$4kfv6!UhxP$Yp5+s9BnXh#JoNZGAXN0Q9cQ+SbR+kdU8#g@f1p7=mn7!9%3!6*j*XVYPHauv&Ba9+CRQ9CwkhBxw72A0zZ5YF1uQJJPs3q$+h9XW2Dfsc+M7DHRGeSV2#qgn*Uv*9RvQ@PNK&&ODuw*eJPhY$xqu!Po6982%d&5!Pv=2GSYFqKUxyY6g#qXsxxeK6Y&18A==e%umFQpShTMDKntp0mp#e*QpoSHPo=Wkjhcwu5s&Fyr2=B3yCoTgScPkEr%GO@%PeG9EtKVjnjFZMYbc#7@OOfw6NYRG=Fc@@81r17*Cvg+OkbhFacF$ZtVMsHa2b8e7=5BJ*sGG*v!QR1%TRN$60bBs62ySAnzjf0Cp0aR6xsdMoW6XmrKNqP#CzK+1T+=03OYh=Sm%ApeUjH@#OUsHAQTZc6mPZ$%cTSuqe$*ka04b@DWKhDCyH@b#@X2xjank9TJBSQoezUgNew+xnSuz3Nxy0TrOj!sTWrU5&%Gx!X*&uK4G#xfKdfMaaTWSWOY4kkZtkfR=7rAJX#kZxW$UzNEeD7UB19Svw6sOgn$H*Rcb8YO7#!*YojVFFpBzXSVkgRJpe3c$gy%Y1fk4y=FM=tSgB*#vSMbE1f9Weczufk3=S3QUGYfn9h2p9GbKuN9fnEDvOdGw+4TFAVHEc606RemSQVuENWF*#@UJQxSeNs0Punt686StoOYoWJEVPe%ju8G%52%#!t@X2m$VvJkzjSmBxt$RuAqGepSwRETpuho@22K6wwRVD3jh05CBWAg3EG!dM+UYJUJ12GJYoP=GkSvOta+zbKn!fNsZ9Cht*ZoEbfB5dCguXu5o#91Mj608ZyMSkZFMJq%HjrxB0=KaNVRgaG0425SCd5kyffMsRK7#oe8FCqAj4yv%OV4jm#rS=9dXtaJza5MsKaz3uFXTqvwtMSjh*=POKNYwSB4h2eO$KnB@Dcjwmg*oUs5x6vWF*0SdKMNM4CQv9JwKzaK=N*n+CoSCMf3qh*oDoqChNamUTe&EdxPQJU&govFFaftjeNcQ!WjAr=jOcp94GbS0BN*0AD*DD3Ws#2ozYBt*jPMZEVf9mYV+Ec@r&7g4Jq+Ze74uDEf1vNf8QZoHsvVKQbnCrwN%pH@zJT!Q+vmYspWBcXTrEvJm%JFv2X91C2$EJK!12@mEkFrjoMhN5eZhrDeyAcf@tCG2FaBpPyGQj7wDXpVJsw*SDx5rB!Tz9Y&dM7!Q4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%pKE9jK12TqBsUszCaksPrTZm5$zu1Csy%!VSvpMj7pxtP3JUbs48*9Fa=aV1%PX5Okz$QY%Dy47vP3YJ59csDkjH@4SpQoK!41a%p",
   }
   // Act: изпълняване POST заявак към АПИ-то
   const response = await propertyRegisterApi.lastWillRegisterPOST(lastWillRegisterRequestMoreSymbols, request);
   
   // Assert: проверяване очаквания резултат
   expect(response.status()).toBe(500);

});

for (const operation of operations) {
    test(`200 с грешка при операция ${operation.toUpperCase()} operation`, async ({ request }) => {
        // Подготвяме данни с невалидна операция
        const lastWillRegisterRequestWrongOperation: LastWillRegisterRequestModel = {
           operation: operation,
           registrationDate: "2023-09-26T00:00:00",
           resultData: [],
        }

        // Act: изпълняване POST заявак към АПИ-то
        const response = await propertyRegisterApi.lastWillRegisterPOST(lastWillRegisterRequestWrongOperation, request);

       // Assert: проверяване очаквания резултат
       expect(response.status()).toBe(200);

       const responseAsJson = await response.json();
       expect(responseAsJson['errors'][0]['error']).toEqual('Operation is wrong');
       expect(responseAsJson['isSuccess']).toBe(false);
    
    });
}

});
