Setup

- BASE_URL = https://eventhub.rahulshettyacademy.com

- API_URL = BASE_URL + /api

- Create Two accounts: ex : Yahoo email , Gmail email   - (Dummies can be ok no need of giving real emails)

Have below link handy for API Documentation
https://api.eventhub.rahulshettyacademy.com/api/docs/





---

Steps



Step 1 — Login as Yahoo user via API  -

- Use request.post() to call POST /api/auth/login - (Refer below API Doc link to construct )- https://api.eventhub.rahulshettyacademy.com/api/docs/#/Auth/post_auth_login)

- Pass { email, password } as the request body under the data key

- Assert the response is OK (loginRes.ok() is truthy)

- Parse the JSON response and extract token — you will use this for all subsequent API calls



Step 2 — Fetch events via API to get a valid event ID

- Use request.get() to call GET /api/events - (Refer below API Doc link to construct )- https://api.eventhub.rahulshettyacademy.com/api/docs/#/Events/get_events)

- Pass Authorization: Bearer <token> in the request headers

- Assert the response is OK

- Parse the JSON, read data[0].id — store this as eventId



Step 3 — Create a booking via API as Yahoo user

- Use request.post() to call POST /api/bookings  - (Refer below API Doc link to construct )-

https://api.eventhub.rahulshettyacademy.com/api/docs/#/Bookings/post_bookings

- Pass Authorization: Bearer <token> in headers

- Pass the booking payload in data:

- eventId — from Step 2

- customerName — any name e.g. 'Yahoo User'

- customerEmail — Yahoo user's email

- customerPhone — any 10-digit number

- quantity — 1

- Assert the response is OK

- Parse the JSON and extract data.id — store as yahooBookingId



Step 4 — Login as Gmail user via browser UI

- Call your loginAs(page, GMAIL_USER) helper



Step 5 — Navigate to Yahoo's booking URL as Gmail user

- Navigate directly to /bookings/${yahooBookingId}

- Pass { waitUntil: 'networkidle' } as the navigation option so the page fully resolves before asserting



Step 6 — Validate Access Denied

- Assert text Access Denied is visible

- Assert text You are not authorized to view this booking is visible



Questions for this assignment
Complete the Playwright code for given Assignment Instructions