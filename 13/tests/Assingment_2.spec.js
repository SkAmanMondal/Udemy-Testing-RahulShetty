const { test, expect, request } = require("@playwright/test");

const baseUrl = "https://eventhub.rahulshettyacademy.com";
const apiBaseUrl = "https://api.eventhub.rahulshettyacademy.com";
const email1 = "aman1221@gmail.com";
const email2 = "aman12221@gmail.com";
const password = "Aman@2005";

const getToken = async (loginPayload) => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(`${apiBaseUrl}/api/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: loginPayload,
  });

  const loginResponseJson = await loginResponse.json();
  const token = loginResponseJson.token;
  return token;
};

const bookTicket = async (token, bookingPayload) => {
  const apiContext = await request.newContext();
  const bookingResponse = await apiContext.post(`${apiBaseUrl}/api/bookings`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: bookingPayload,
  });

  const bookingResponseJson = await bookingResponse.json();
  const bookingId = bookingResponseJson.data.id;
  return bookingId;
}

const loginWithEmail1AndReturnBookingId = async (page) => {

  // Login and return Token
  const loginPayload = { email: email1, password: password };
  const token = await getToken(loginPayload);
  // console.log(token);

  // Booked Ticked and return Booking Id
  const bookingPayload = { customerEmail: email1,customerName: "Sam",customerPhone: "1234567890",eventId : 73671, quantity: 1 };
  const bookingId = await bookTicket(token, bookingPayload);

  return bookingId;
  

};

test("Booking Access Test", async ({ page }) => {
  const bookingId = await loginWithEmail1AndReturnBookingId();
  // console.log(bookingId);

  // Login with Email 2
  await page.goto(`${baseUrl}/login`);
    await page.getByLabel("Email").fill(email2);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page.getByRole("link", { name: "EventHub" })).toBeVisible();

    // Booking Page
    await page.getByTestId("nav-bookings").click();
    // Checking for first card visiblity
    await expect(page.getByTestId("booking-card").first()).toBeVisible();
    // Intercepting Url and Changing the booking id
    await page.route(`${baseUrl}/bookings/*`,
        route => route.continue({ url: `${baseUrl}/bookings/${bookingId}` }));
    // Clicking on First Booking card view details
    await page
    .locator("#booking-card")
    .getByRole("button", { name: "View Details" })
    .first()
    .click();

    // Checking for Access Denied
    await expect(page.getByText("Access Denied")).toBeVisible();




  


});
