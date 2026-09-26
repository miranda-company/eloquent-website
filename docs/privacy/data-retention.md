# Data retention policy

Approved on 25 September 2026 for enquiries received through `info@eloquent.es`.

## Retention rules

| Record                                         | Retention                                     | Action at the end of the period                       |
| ---------------------------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| General enquiry that does not become a project | 12 months after the last meaningful contact   | Delete                                                |
| Proposal or negotiation that does not proceed  | 24 months after the last meaningful contact   | Delete                                                |
| Active client or project communication         | Move relevant messages into the client record | Apply contractual, accounting, tax, and legal periods |
| Consent or objection evidence                  | As long as needed to demonstrate compliance   | Keep only the minimum evidence                        |
| Dispute, audit, or legal hold                  | Until the hold is released                    | Suspend deletion for affected records                 |

Do not retain identity documents received for a rights request once identity has been verified and the request resolved, unless a documented legal reason requires more time.

## Classify messages first

Create these Gmail labels on every mailbox that receives enquiries:

- `RET-12M-CONSULTAS`
- `RET-24M-PROPUESTAS`
- `RET-CLIENTE-LEGAL`
- `RET-HOLD`

Apply the appropriate label to the complete conversation and update it when an enquiry becomes a proposal or client. Assign one person to review classification monthly.

## Current Workspace plan

La Baula uses **Google Workspace Business Standard**. Google Vault is not included with this edition; Google lists Vault as a Business Plus compliance feature. Do not create a Vault-based process unless La Baula later purchases a compatible add-on or upgrades its Workspace edition.

## Implementation in Business Standard

Business Standard's Gmail auto-deletion setting supports one general period plus label exclusions. It cannot safely enforce both approved periods by itself, so the current process uses labels and a quarterly review.

1. Create the four labels above in every mailbox that receives enquiries.
2. Assign the correct label when the conversation is closed, becomes a proposal, becomes a client record, or must be held.
3. Every quarter, search `label:RET-12M-CONSULTAS older_than:12m`; review and delete messages that have no client, legal, or hold reason.
4. Search `label:RET-24M-PROPUESTAS older_than:24m`; review and delete messages that have no client, legal, or hold reason.
5. Exclude `RET-CLIENTE-LEGAL` and `RET-HOLD` from both reviews.
6. Record the review date, person responsible, search used, number deleted, and any documented exceptions.

Do not enable **Admin console → Apps → Google Workspace → Gmail → Compliance → Email and chat auto-deletion** yet. A single global rule could delete unrelated or incorrectly classified email. Reconsider it only if `info@eloquent.es` becomes a dedicated enquiry mailbox with complete classification.

## Future Vault option

If La Baula later upgrades to Business Plus or purchases compatible Vault licences, design and test custom Gmail retention rules in a test organisational unit. Confirm rule scope, precedence, holds, expiry actions, and label-query support before enabling deletion. Google recommends using Vault or Gmail auto-deletion for retention management, rather than overlapping both.

## Operational safeguards

- Export or protect any record that must remain available before activating deletion.
- A label applies to existing messages in a conversation; later replies may need classification again depending on Gmail conversation settings.
- Review the policy, account licences, holds, and responsible person at least annually.
- The professional DPD contact is `rodolfo@eloquent.es`.
