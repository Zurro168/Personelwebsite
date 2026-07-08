# Documentation Index

This folder contains the shared maintenance documentation for the Silicon Commodity Portal.

## Start Here

- [Repository Git Maintenance](./GIT_MAINTENANCE.md): shared Git workflow, generated-file boundaries, verification rules.
- [Architecture](./ARCHITECTURE.md): visual identity and high-level technical architecture.
- [Content Workflow](./CONTENT_WORKFLOW.md): how reports move into the website.
- [Configuration Dictionary](./CONFIG_DICTIONARY.md): configuration-oriented editing guide.

## Operations

- [Operations Index](./operations/00_INDEX.md)
- [Infrastructure](./operations/01_INFRASTRUCTURE.md)
- [Daily Workflow](./operations/02_WORKFLOW.md)
- [Core Codebase](./operations/03_CODEBASE.md)
- [Configuration](./operations/04_CONFIGURATION.md)
- [Publishing V6 Spec](./operations/06_PUBLISHING_V6_SPEC.md)

## Maintenance Rules

- Prefer editing source content and rerunning sync over hand-editing generated HTML.
- Keep documentation changes separate from content sync changes when possible.
- Treat paths connected to Obsidian as production dependencies.
- Keep secrets out of Git.

