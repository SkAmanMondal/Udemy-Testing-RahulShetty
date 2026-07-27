const { test, expect } = require("@playwright/test");

const email = "aman1221@gmail.com";
const password = "Aman@2005";
const baseURL = "https://eventhub.rahulshettyacademy.com";
let bookingRef = null;

const login = async (page) => {
  await page.goto(baseURL, +"/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByRole("link", { name: "EventHub" })).toBeVisible();
};

test("1 Ticket Refund Eligiblity Check", async ({ page }) => {
  // Eligible with 1 Ticket

  // Login
  await login(page);
  //Booking 1 Ticket

  await page.getByTestId("nav-events").click();
  await expect(page.locator("article").first()).toBeVisible();
  await page.locator("article").first().getByTestId("book-now-btn").click();
  await expect(
    page.getByRole("heading", { name: "Book Tickets" }),
  ).toBeVisible();
  await expect(page.locator("#ticket-count")).toContainText("1");
  await page.getByLabel("Full Name").fill("SAM");
  await page.getByLabel("Email").fill("sam1234@gmail.com");
  await page.getByLabel("Phone Number").fill("1234567890");
  await page.getByRole("button", { name: "Confirm Booking" }).click();
  bookingRef = await page.locator("span.booking-ref").textContent();

  // Booking Details Page
  await page.getByTestId("nav-bookings").click();
  await expect(page.getByTestId("booking-card").first()).toBeVisible();
  const eventTitle = await page
    .locator("#booking-card")
    .filter({ hasText: bookingRef })
    .locator("h3")
    .textContent();
  await expect(bookingRef[0]).toBe(eventTitle[0]);

  await page
    .locator("#booking-card")
    .filter({ hasText: bookingRef })
    .getByRole("button", { name: "View Details" })
    .click();
  await expect(page.getByTestId("check-refund-btn")).toBeVisible();
  await page.getByTestId("check-refund-btn").click();
  await expect(page.getByTestId("refund-spinner")).toBeVisible();
  await expect(page.getByTestId("refund-spinner")).toBeHidden({
    timeout: 6000,
  });
  await expect(page.locator("strong")).toContainText("Eligible for refund.");
});

test("3 Ticket Refund Eligiblity Check", async ({ page }) => {
  // Not Eligible with 3 Ticket

  // Login
  await login(page);

  //Booking 1 Ticket
  await page.getByTestId("nav-events").click();
  await expect(page.locator("article").first()).toBeVisible();
  await page.locator("article").first().getByTestId("book-now-btn").click();
  await expect(
    page.getByRole("heading", { name: "Book Tickets" }),
  ).toBeVisible(); 
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(await page.locator("#ticket-count").textContent()).toBe("3");
  await page.getByLabel("Full Name").fill("SAM");
  await page.getByLabel("Email").fill("sam1234@gmail.com");
  await page.getByLabel("Phone Number").fill("1234567890");
  await page.getByRole("button", { name: "Confirm Booking" }).click();
  bookingRef = await page.locator("span.booking-ref").textContent();

  // Booking Details Page
  await page.getByTestId("nav-bookings").click();
  await expect(page.getByTestId("booking-card").first()).toBeVisible();
  const eventTitle = await page
    .locator("#booking-card")
    .filter({ hasText: bookingRef })
    .locator("h3")
    .textContent();
  await expect(bookingRef[0]).toBe(eventTitle[0]);

  await page
    .locator("#booking-card")
    .filter({ hasText: bookingRef })
    .getByRole("button", { name: "View Details" })
    .click();
  await expect(page.getByTestId("check-refund-btn")).toBeVisible();
  await page.getByTestId("check-refund-btn").click();
  await expect(page.getByTestId("refund-spinner")).toBeVisible();
  await expect(page.getByTestId("refund-spinner")).toBeHidden({
    timeout: 6000,
  });
  await expect(page.locator("strong")).toContainText(
    "Not eligible for refund.",
  );
});
