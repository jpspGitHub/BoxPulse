# BoxPulse Architecture

## Repository Layout

```text
api/
apps/
  mobile/
  web/
packages/
  shared/
docs/
```

## Boundaries

- The API owns persistence, authorization, validation at trust boundaries, and business workflows.
- The web app owns browser-specific user experience and presentation state.
- The mobile app owns native user experience and device-specific concerns.
- The shared package owns stable domain types, constants, and validation helpers used by more than one project.

## Data Flow

Clients call the API over HTTP. The API validates requests, applies domain rules, persists data, and returns typed responses. Shared contracts keep client and server expectations aligned.

## Early Technical Decisions

- Keep the monorepo structure explicit from the first PR.
- Avoid coupling clients directly to persistence models.
- Version API contracts through documented request and response shapes.
- Keep app scaffolds thin until the first end-to-end MVP slice is selected.

## Open Decisions

- Backend framework and runtime.
- Web framework.
- Mobile framework.
- Database and migration strategy.
- Authentication approach.
- CI provider and deployment targets.
