const {test, expect} = require("@playwright/test");


const email = "aman1221@gmail.com";
const password = "Aman@2005";
const eventTitle = `Test Event ${Date.now()}`;
let seatsBeforeBooking = null;
let seatsAfterBooking = null;
let bookingRef = null;

function futureDateValue() {
    const date = new Date();

    date.setDate(date.getDate() + 10); // 10 days from today
    date.setHours(20, 0, 0, 0);        // 20:00

    return date.toISOString().slice(0, 16);
}

const login = async (page) =>{
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button",{name:"Sign In"}).click();
    await expect(page.getByRole("link",{name: "EventHub"})).toBeVisible();
}

test.only("Create a new event", async({page})=>
{
    await login(page);
    await page.getByTestId('nav-events').click();
    await page.getByRole('button', { name: 'Add New Event' }).click();
    await page.getByTestId('event-title-input').fill(eventTitle);
  await page.getByRole('textbox', { name: 'Describe the event…' }).click();
  await page.getByLabel('Category*').selectOption('Concert');
  await page.getByRole('textbox', { name: 'City*' }).fill("Kolkata");
  await page.getByRole('textbox', { name: 'Venue*' }).fill("Rabindra Sadan");
  await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill(futureDateValue());
  await page.getByRole('spinbutton', { name: 'Price ($)*' }).fill("1500");
  await page.getByRole('spinbutton', { name: 'Total Seats*' }).fill("50");
  await page.getByTestId('add-event-btn').click();
    await expect(page.getByText('Event created!')).toBeVisible();

});

test("Find the event card and capture seats", async({page})=>
{
    await login(page);
    await page.getByTestId('nav-events').click();
    await expect(page.locator("article").first()).toBeVisible();
    const eventCard = page.getByRole('article').filter({hasText: eventTitle});
    await expect(eventCard).toBeVisible();
    const text = await eventCard.getByText("seats available").textContent();
    seatsBeforeBooking = parseInt(text);
    await page.getByRole('article').filter({hasText: eventTitle}).getByTestId('book-now-btn').click();
    await expect(page.locator('#ticket-count')).toContainText('1');
    await page.getByLabel("Full Name").fill("SAM");
    await page.getByLabel("Email").fill("sam1234@gmail.com");
    await page.getByLabel("Phone Number").fill("1234567890");
    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    bookingRef = await page.locator("span.booking-ref").textContent();
});

test("Verify in My Bookings", async({page})=>{
    await login(page);

    await page.getByRole("link",{name: "My Bookings"}).nth(0).click();
    await expect(page.getByTestId("booking-card").first()).toBeVisible();
    const card = await page.getByTestId("booking-card").filter({hasText: bookingRef});
    await expect(card.locator("h3")).toHaveText(eventTitle);
});

test("Verify seat reduction", async({page})=>
{
    await login(page);
    // await page.getByRole("link",{name: "Events"}).first().click();
    await page.getByTestId('nav-events').click();
    await expect(page.locator("article").first()).toBeVisible();
    const eventCard = page.getByRole('article').filter({hasText: eventTitle});
    await expect(eventCard).toBeVisible();
    const text = await eventCard.getByText("seats available").textContent();
    seatsAfterBooking = parseInt(text);

    expect(seatsAfterBooking).toEqual(seatsBeforeBooking - 1);

});