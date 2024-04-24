using Microsoft.VisualBasic;
using Newtonsoft.Json;
using System.Diagnostics;
using Xunit.Abstractions;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Newtonsoft.Json;

namespace UCL.PreSalesModule.AutomationTest.InternalApi
{
    public class OfferStatusUpdateTest
    {
        private readonly HttpClient _client = new HttpClient();

        [Fact]
        public async Task PostNewStatusTest()
        {
            var url = "https://uclpresalesapi.azurewebsites.net/api/Offers/SetNewStatus";
            var body = new
            {
                offerID = "0006762-0",
                statusID = 14,
                user = "CROSSROAD\\MKIRILOV",
                date = "2023-12-19T15:38:40"
            };

            var content = new StringContent(JsonConvert.SerializeObject(body), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync(url, content);
            response.EnsureSuccessStatusCode();
        }
    }
}
