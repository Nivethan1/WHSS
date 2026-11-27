# WHSS – Windsor Home Security Solutions (MIS Prototype)

## 1. Project Description
Fictional home security company website for a university MIS project. Demonstrates data collection (quote form), storage (Readdy Backend), information processing, CRM, workflow (status pipeline) and decision support (dashboard KPIs).

## 2. Page Structure
- `/` - Home
- `/services` - Services
- `/packages` - Security Packages (example pricing)
- `/quote` - Contact / Request a Quote (`?package=Basic|Standard|Premium`)
- `/admin/login` - Admin sign-in
- `/admin` - MIS Dashboard (protected)

## 3. Core Features
- [x] Package selection carries into quote form
- [x] Validated quote form stored in database
- [x] Protected admin dashboard with KPIs, status workflow, package popularity

## 4. Data Model
### Table: quote_requests
| Field | Type | Description |
|---|---|---|
| id | bigserial | PK |
| customer_name, email, phone | text | Customer data |
| package | text | Basic / Standard / Premium |
| property_type | text | Property |
| requirements | text | Notes from customer |
| status | text | New / In Progress / Completed |
| admin_notes | text | Internal CRM notes |
| created_at, updated_at | timestamptz | |

RLS: public insert (status New), authenticated select/update.

## 5. Backend
- Readdy Backend: database + admin authentication (admin user created in Backend → Authentication)

## 6. Phases
### Phase 1: Full prototype (done)
### Phase 2: Polish (CSV export, reports, email notifications)