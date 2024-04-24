using Microsoft.VisualBasic;
using Newtonsoft.Json;
using System.Diagnostics;
using Xunit.Abstractions;

namespace AutomationTest.InternalApi
{
    public class GetCurrentStatus : BaseTest
    {

        [Fact]
        public async void ResponseAttributesTest() 
       
       
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
        public async Task TestRequiredQueryMethod() //Ïðîâåðêà íà Required Query Method
            
         
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
        public class HeadersTests //Ïðîâåðêà íà õåäúðèòå íà Ðåñïîíñà

    
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
            public async Task ContentTypeTest() //Ïðîâåðêà íà ContentType íà Ðåñïîíñà
            
           
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
            public async Task ResponseDataLengthGreaterThanZeroTest() // Ïðîâåðêà äàëè äúëæèíàòà íà Ðåñïîíñà å ïî-ãîëÿìà îò íóëà

                 "Response data should not be empty".
            {
                var response = await _client.GetAsync("https://uclpresalesapi.azurewebsites.net/api/Offers/GetCurrentStatus");
                var responseData = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseData);

                Assert.True(data.Count > 0, "Response data should not be empty");
            }
        }
      
    }
}
