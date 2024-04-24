using HolidayAutomationTests.Pages;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HolidayAutomationTests
{
    [TestFixture]
    public class HolidayTest : BaseTest
    {
        private List<int> nonWorkingDays;
        [SetUp]
        public async Task Init()
        {
            await LoginUsers.ChangeProfileByType(LoginUsersPage.AdminLabel);
            nonWorkingDays = await AdminCalendar.GetNonWorkingDaysCalendar();             
        }
        [Test]
        public async Task CheckHolidaysDays()
        {
            var v = nonWorkingDays;
            Assert.That(v.Any());
        }

        [Test, Order(1), Description("Пускане на отпуска и я одобрена")]
        public async Task EnterHolidayAndAccept()
        {
            string userName = await LoginUsers.ChangeProfileByName(Constants.TestUser);
            var dateCheck = await MyApplicationsPage.SearchMyApplications();
            DateTime newStartDate = dateCheck.HasValue ? dateCheck.Value.AddDays(1) : DateTime.Today;
            await NewRequestPage.CreateRequest(nonWorkingDays, newStartDate, 1);
            await Expect(Page.GetByText(Constants.SendForApprove)).ToBeVisibleAsync();
            var appId = await MyApplicationsPage.GetApplicationId();
            await LoginUsers.ChangeProfileByType(LoginUsersPage.AdminLabel);
            await AppWaitingApprovalPage.ApproveRequest(newStartDate, appId, false, userName);
            //await ChangePersonBalanceForTheYear();
        }
        [Test, Order(2), Description("Пускане на отпуска, която е отказана")]
        public async Task RejectHoliday()
        {
            string userName = await LoginUsers.ChangeProfileByName(Constants.TestUser);
            var dateCheck = await MyApplicationsPage.SearchMyApplications();
            DateTime newStartDate = dateCheck.HasValue ? dateCheck.Value.AddDays(1) : DateTime.Today;
            await NewRequestPage.CreateRequest(nonWorkingDays, newStartDate, 1);//Да се добави проверка дали е създадена успешно заявката за отпуска
            await Expect(Page.GetByText(Constants.SendForApprove)).ToBeVisibleAsync();
            var appId = await MyApplicationsPage.GetApplicationId();
            await LoginUsers.ChangeProfileByType(LoginUsersPage.AdminLabel);
            await AppWaitingApprovalPage.RejectRequest(newStartDate, appId, false, userName);
        }
        [Test, Order(3), Description("Пускане на отпуска, която се отказва от кредитиране от администратор")]
        public async Task CreditRejectHolidayRequest()
        {
            string userName = await LoginUsers.ChangeProfileByName(Constants.TestUser);
            var dateCheck = await MyApplicationsPage.SearchMyApplications();
            DateTime newStartDate = dateCheck.HasValue ? dateCheck.Value.AddDays(1) : DateTime.Today;
            await NewRequestPage.CreateRequest(nonWorkingDays, newStartDate, 1);
            await Expect(Page.GetByText(Constants.SendForApprove)).ToBeVisibleAsync();
            var appId = await MyApplicationsPage.GetApplicationId();
            await LoginUsers.ChangeProfileByType(LoginUsersPage.AdminLabel);
            await AppWaitingApprovalPage.ApproveRequest(newStartDate, appId, false, userName);
            await LoginUsers.ChangeProfileByType(userName);
            await MyApplicationsPage.CreditRequest(appId);
            await LoginUsers.ChangeProfileByType(LoginUsersPage.AdminLabel);
            await AppWaitingApprovalPage.RejectRequest(newStartDate, appId, true, userName);
        }
        [Test, Order(4), Description("Пускане на отпуска, която е успешно кредитирана от администратор")]
        public async Task CreditApproveHolidayRequest()
        {
            string userName = await LoginUsers.ChangeProfileByName(Constants.TestUser);
            var dateCheck = await MyApplicationsPage.SearchMyApplications();
            DateTime newStartDate = dateCheck.HasValue ? dateCheck.Value.AddDays(1) : DateTime.Today;
            await NewRequestPage.CreateRequest(nonWorkingDays, newStartDate, 1);
            await Expect(Page.GetByText(Constants.SendForApprove)).ToBeVisibleAsync();
            var appId = await MyApplicationsPage.GetApplicationId();
            await LoginUsers.ChangeProfileByType(LoginUsersPage.AdminLabel);
            await AppWaitingApprovalPage.ApproveRequest(newStartDate, appId, false, userName);
            await LoginUsers.ChangeProfileByType(userName);
            await MyApplicationsPage.CreditRequest(appId);
            await LoginUsers.ChangeProfileByType(LoginUsersPage.AdminLabel);
            await AppWaitingApprovalPage.ApproveRequest(newStartDate, appId, true, userName);
        }
        //[Test, Description("Промяна на текущия баланс на потребител от администратор")]
        //public async Task ChangePersonBalanceForTheYear()
        //{
        //    await LoginUsers.ChangeProfileByType(LoginUsersPage.UserLabel);
        //    var balance = BalanceManagementPage.BalanceAfterHoliday(Validations.Period);
        //    await LoginUsers.ChangeProfileByType(LoginUsersPage.AdminLabel);
        //    await BalanceManagementPage.ChangeBalancePersonCurrentYear(balance);
        //}
    }
}