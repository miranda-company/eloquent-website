# Documentation

This directory contains the detailed implementation contracts and operational guides for the Eloquent website. Start with the root [README](../README.md) for project status and commands, [AGENTS.md](../AGENTS.md) for repository rules, and [PLAN.md](../PLAN.md) for approved scope and launch requirements.

## Architecture

| Document                                       | Use it when                                                                                               |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [Design system](architecture/design-system.md) | Creating or changing tokens, typography, spacing, components, interactions, or responsive behavior        |
| [Page layouts](architecture/page-layouts.md)   | Changing semantic DOM, section order, component assignment, width models, or page-level styling ownership |

## Content

| Document                                                  | Use it when                                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Dossier content guide](content/dossier-content-guide.md) | Writing, editing, or assembling Dossier issues and articles in Markdown or MDX |

## Privacy, analytics, and legal

| Document                                                                              | Use it when                                                                                                 |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [Privacy, analytics, and legal playbook](privacy/privacy-analytics-legal-playbook.md) | Implementing or maintaining consent, GTM, GA4, legal pages, release testing, or the reusable client pattern |
| [Analytics configuration](privacy/analytics.md)                                       | Checking Eloquent-specific identifiers, enabled products, settings, and verification steps                  |
| [Data retention](privacy/data-retention.md)                                           | Applying Eloquent's approved email-retention periods and Google Workspace process                           |

## Maintenance rule

Update the relevant document in the same change as the code or content it governs. Keep reusable instructions in this directory and site-specific status in the appropriate operational record. Do not create a second document for a contract that already has an owner.
