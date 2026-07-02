## SpendTrack — Personal Spending Tracker

A clean, modern app to log expenses, set monthly budgets per category, and visualize where your money goes.

### Features (v1)
- **Auth**: Email/password sign-in via Lovable Cloud, with cloud sync across devices
- **Add expense**: amount, category, note, date — fast one-screen form
- **Expense list**: recent transactions, filter by month/category, edit/delete
- **Budgets**: set a monthly limit per category, see progress bars + over-budget warnings
- **Dashboard**: this month total, by-category donut chart, 6-month trend line
- **Categories**: sensible defaults (Food, Transport, Housing, Entertainment, Shopping, Health, Bills, Other) with emoji icons; user can add custom ones
- **Currency**: USD default, switchable in settings

### Design direction
Modern dark finance vibe — deep neutral background, single vivid accent (mint green), generous spacing, large numerals for amounts, subtle card elevation. Inter for UI, tabular numerals for figures. Mobile-first (you're on a 390px viewport) with a bottom tab bar: Home · Add · Budgets · Settings.

### Pages
- `/auth` — sign in / sign up
- `/` (authenticated) — Dashboard: month total, donut by category, recent transactions, trend
- `/transactions` — full list with filters
- `/budgets` — per-category limits + progress
- `/settings` — currency, categories, sign out

### Technical
- Lovable Cloud (Postgres + Auth)
- Tables (all with RLS scoped to `auth.uid()`):
  - `categories` (id, user_id, name, emoji, color)
  - `transactions` (id, user_id, amount, category_id, note, occurred_on, created_at)
  - `budgets` (id, user_id, category_id, month, amount_limit)
- Seed default categories on first sign-in via a trigger
- TanStack Query for data fetching; Recharts for charts
- Routes under `_authenticated/` layout; `/auth` public

### Out of scope for v1
Recurring/subscriptions, bank import, multi-currency conversion, shared accounts, income tracking (can add later).

Approve and I'll build it.