# WHSS — Windsor Home Security Solutions

## 1. Project Description

WHSS is a home and small-business security provider serving Windsor and Essex County, Ontario. The site presents the company's services and monthly protection packages, collects qualified enquiries through a quote request form, and gives staff a private portal to track and work each enquiry from first contact to installation.

Core value:
- **For homeowners:** a clear, no-pressure way to compare packages and request a tailored quote.
- **For the business:** every enquiry lands in one place with the customer's details, the package they are interested in, and a follow-up status, so nothing is lost between the web form and the person who calls them back.

## 2. Page Structure

- `/` — Home (value proposition, services overview, packages, how it works, trust signals, contact)
- `/services` — Services in detail
- `/packages` — Protection packages and pricing, with a request-a-quote action per plan
- `/quote` — Contact / Request a Quote (accepts `?package=Basic|Standard|Premium` so the chosen plan carries through)
- `/admin/login` — Staff sign-in
- `/admin` — Operations Dashboard (protected; redirects to sign-in when there is no session)
- `*` — Not found

## 3. Core Features

- [x] Package selection on the packages page pre-fills the quote form
- [x] Validated quote request form, saved to the database with a confirmation message on the page
- [x] Staff sign-in using Backend authentication; the dashboard is inaccessible without a session
- [x] Operations dashboard: headline counts, new vs. in-progress vs. completed enquiries, package popularity, customer history and internal notes
- [x] Status workflow per enquiry (New → In Progress → Completed) editable inline
- [x] Consistent contact details and company information across every page
- [x] Responsive layout, accessible form labels and keyboard-friendly controls

## 4. Data Model Design

### Table: quote_requests

| Field | Type | Description |
|---|---|---|
| id | bigserial | Primary key |
| customer_name | text | Name of the person enquiring |
| email | text | Contact email |
| phone | text | Contact phone number |
| package | text | Basic / Standard / Premium |
| property_type | text | House, townhouse, condo, business, etc. |
| requirements | text | Free-text notes from the customer |
| status | text | New / In Progress / Completed |
| admin_notes | text | Internal follow-up notes, staff only |
| created_at | timestamptz | Submitted time |
| updated_at | timestamptz | Last change |

Access rules:
- Anonymous visitors may insert a new request only, with status forced to `New`.
- Only an authenticated staff account may read or update requests.

## 5. Backend / Third-party Integration Plan

- **Database & authentication:** Readdy Backend. The `quote_requests` table stores enquiries; staff accounts are created in the Backend Authentication panel. No public registration — accounts are issued internally.
- **Shopify:** not required; packages are services quoted per property, not catalog items with checkout.
- **Stripe / Toss / PayPal / Square:** not required. No payment is taken on the website; pricing is monthly and agreed after a site assessment.
- **Email notifications:** future enhancement (new enquiry alert to the office inbox).

## 6. Development Phase Plan

### Phase 1: Public site (done)
- Goal: A credible company website a visitor understands in ten seconds.
- Deliverable: Home, Services, Packages and Contact/Quote pages with real copy, consistent branding, contact details and working navigation.

### Phase 2: Enquiry capture and staff dashboard (done)
- Goal: Capture enquiries reliably and give staff a single place to work them.
- Deliverable: Database table with access rules, validated quote form with on-page confirmation, staff sign-in, dashboard with counts, package popularity, status workflow and internal notes.

### Phase 3: Launch (done)
- Goal: Put the site on a public address.
- Deliverable: Published build with search and social sharing metadata and a stable, shareable link.

### Phase 4: Operations polish (next)
- Goal: Reduce manual follow-up work.
- Deliverable candidates:
  - CSV export of enquiries for the office
  - Email notification to the office when a new enquiry arrives
  - Simple date filtering and search inside the dashboard
  - Automated acknowledgement email to the customer