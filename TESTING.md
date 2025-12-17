# Testing Strategy

NextDoor uses a pragmatic, risk-based testing strategy. The focus is to keep core business logic and critical user flows safe to change while avoiding an overly heavy test suite.

## Strategy

- Validate most behaviour at the **unit level**, as close to the business logic as possible, so refactors in helpers, validation, and data access remain safe.
- Use **integration tests** only where important interactions between components, routing, and data cannot be reliably covered by unit tests alone.
- Reserve **E2E tests** for a small set of high-value end-to-end journeys; most confidence comes from unit and integration tests.

## Coverage Philosophy

- Prioritise code that is both **business‑critical** and **easy to break** (validation, query construction, key route behaviour).
- Prefer a smaller set of **high‑value, stable tests** over chasing 100% coverage.
- Let tests describe user‑visible behaviour and guard against regressions, rather than mirroring implementation details.
