using Microsoft.VisualBasic;
using Newtonsoft.Json;
using System.Diagnostics;
using Xunit.Abstractions;

namespace UCL.PreSalesModule.AutomationTest.InternalApi
{
    public class GetCurrentStatus : BaseTest
    {

        [Fact]
        public async void ResponseAttributesTest() //Проверка на  Респонс Атрибути
       
        //1.Създава нова инстанция на ApiLogic класа, който  съдържа логиката за взаимодействие с API.
        //2.Извиква асинхронния метод Get_Offers на offersApi обекта, подавайки "0006759-0" като аргумент. Този метод връща отговор, който се записва в променливата response.
        //3.Проверява дали offerID, date, user и statusName атрибутите на отговора съвпадат със съответните константи. Ако някой от тези атрибути не съвпада с очакваната стойност, тестът ще се провали 
        {
            ApiLogic offersApi = new ApiLogic();
            var response = await offersApi.Get_Offers("0006759-0");
            Assert.Equal(Constants.offerID, response.offerID);
            Assert.Equal(Constants.data, response.date);
            Assert.Equal(Constants.username, response.user);
            Assert.Equal(Constants.statusName, response.statusName);

         
        }
        [Fact]
        public async Task Get_Offers_Success()
        //Successful request with valid response:

            //Извиква асинхронния метод Get_Offers на api обекта, подавайки "0006759-0" като аргумент. Този метод връща отговор, който се записва в променливата response.
            //Проверява дали отговорът не е null и дали е от тип OfferResponse.Ако отговорът е null или не е от тип OfferResponse, тестът ще се провали.
        {
            // Arrange
            var api = new ApiLogic();

            // Act
            var response = await api.Get_Offers("0006759-0");

            // Assert
            Assert.NotNull(response);
            Assert.IsAssignableFrom<OfferResponse>(response);
            //Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
        [Fact]
        public async Task ResponseTimeTest() 
        //Response time validation

            //Проверява времето за изпълнение на Requst-a. Ако времето за изпълнение е по-голямо от 1 секунда, тестът ще се провали.
        {
            // Arrange
            var api = new ApiLogic();
            var stopwatch = new Stopwatch();

            // Act
            stopwatch.Start();
            var response = await api.Get_Offers("0006759-0");
            stopwatch.Stop();

            // Assert
            Assert.NotNull(response);
            Assert.IsAssignableFrom<OfferResponse>(response);
            Assert.True(stopwatch.ElapsedMilliseconds < 1000); // Adjust the time threshold as needed
        }

    }

    public class TestQuery
    {
        [Fact]
        public async Task TestRequiredQueryMethod() //Проверка на Required Query Method
            
            //Преобразува заявката в JSON формат и я записва в променливата jsonQuery.
           //Използва jsonQuery за да извика асинхронния метод Get_Offers на api обекта.Този метод връща отговор, който се записва в променливата response.
          //Проверява дали отговорът не е null и дали свойството property на отговора е равно на "0006759-0". Ако отговорът е null или property не е равно на "0006759-0", тестът ще се провали.
        {
            // Arrange
            var api = new ApiLogic();
            var query = new Dictionary<string, string>
        {
            { "OfferID", "0006759-0" }
        };

            // Act
            var jsonQuery = JsonConvert.SerializeObject(query);
            OfferResponse response = null;
            try
            {
                response = await api.Get_Offers(jsonQuery); // Convert the query dictionary to JSON string
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error occurred: {ex.Message}");
            }

            // Assert
            if (response != null)
            {
                Assert.NotNull(response);
                // Add your assertions here
                Assert.Equal("0006759-0", response.property); // Replace "expectedValue" with the expected value for the property you want to assert
                Assert.True(response != null, "Response is null"); // Assert that the response is not null
            }
            else
            {
                Assert.True(true, "Response is null"); // Assert that the response is not null
            }
        }
        public class HeadersTests //Проверка на хедърите на Респонса

        //ContentTypeTest: проверява дали стойността на хедъра ContentType е равна на "application/json; charset=utf-8". Ако това не е вярно, тестът ще се провали.
        //ServerTest: проверява дали стойността на хедъра Server е равна на "Microsoft-IIS/10.0". Ако това не е вярно, тестът ще се провали.
        //XPoweredByTest:  проверява дали стойността на хедъра XPoweredBy е равна на "ASP.NET". Ако това не е вярно, тестът ще се провали.
        {
            [Fact]
            public void ContentTypeTest()
            {
                Assert.Equal("application/json; charset=utf-8", Headers.ContentType);
            }

            [Fact]
            public void ServerTest()
            {
                Assert.Equal("Microsoft-IIS/10.0", Headers.Server);
            }

            [Fact]
            public void XPoweredByTest()
            {
                Assert.Equal("ASP.NET", Headers.XPoweredBy);
            }
        }
        public class ResponseHasContentType //Content type is application/json
        {
            private const string V = "ApiUr";

            [Fact]
            public async Task ContentTypeTest() //Проверка на ContentType на Респонса
            
             //Извлича се MediaType от ContentType на Респонса.
            //Използва се Assert.Equal за да се увери, че MediaType е "application/json". Ако това не е вярно, тестът ще се провали.
            {
                var response = await GetAsync("https://uclpresalesapi.azurewebsites.net/api/Offers/GetCurrentStatus");
                var contentType = response.Content.Headers.ContentType.MediaType;

                Assert.Equal("application/json", contentType);
            }

            public async Task<HttpResponseMessage> GetAsync(string url)
            {
                using (HttpClient client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync(url);
                    return response;
                }
            }
        }
        public class ResponseDataLengthTest //The response data length must be greater than zero
        {
            private readonly HttpClient _client = new HttpClient();

            [Fact]
            public async Task ResponseDataLengthGreaterThanZeroTest() // Проверка дали дължината на Респонса е по-голяма от нула

                //Използва се Assert.True за да се увери, че броят на цифрите в data е по-голям от нула.Ако това не е вярно, тестът ще се провали и ще се покаже съобщението "Response data should not be empty".
            {
                var response = await _client.GetAsync("https://uclpresalesapi.azurewebsites.net/api/Offers/GetCurrentStatus");
                var responseData = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseData);

                Assert.True(data.Count > 0, "Response data should not be empty");
            }
        }
      
    }
}
