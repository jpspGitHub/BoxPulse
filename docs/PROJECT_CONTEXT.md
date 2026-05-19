# BoxPulse Project Context

## Overview

BoxPulse is the foundation for a product that will track, organize, and surface useful signals around boxes, inventory, or shipments. This repository starts as a monorepo so the API, web app, mobile app, and shared packages can evolve together.

## Goals

- Establish a clear project structure before implementation begins.
- Keep product, architecture, API, and backlog decisions documented in version control.
- Share domain types and validation logic across apps where practical.

## Initial Repository Shape

- `api/`: backend service.
- `apps/mobile/`: mobile application.
- `apps/web/`: web application.
- `packages/shared/`: shared types, utilities, and contracts.
- `docs/`: product and technical planning documents.

## Working Principles

- Prefer simple, testable slices over broad speculative architecture.
- Document public contracts before clients depend on them.
- Keep shared code small and stable; app-specific behavior should stay in the app layer.
