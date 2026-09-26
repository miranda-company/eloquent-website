# Analytics, advertising, and consent

This file records Eloquent-specific identifiers and live configuration. The reusable implementation, legal-input worksheet, release sequence, and full test matrix are defined in `docs/privacy/privacy-analytics-legal-playbook.md`.

## Runtime contract

Eloquent uses Google Tag Manager container `GTM-MPRT28KC` and Google Analytics 4 measurement ID
`G-H60YXKMYVE` with explicit consent and Google Consent Mode v2.

- Necessary storage is limited to the visitor's consent preferences.
- `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization` default to `denied`.
- The interface offers independent **Analítica** and **Publicidad** choices, plus equally visible controls to accept all or reject all optional categories.
- GTM is requested only after at least one optional category is accepted. Tags must still require the corresponding Google consent type inside GTM.
- Preferences are stored as versioned JSON under `eloquent:consent-preferences`. A previous `eloquent:analytics-consent` value migrates to analytics only; advertising stays denied.
- Withdrawing a category clears recognized first-party cookies and reloads the page. Third-party cookies must be removed through browser controls.
- **Gestionar cookies** in the footer reopens the shared interface.
- Without JavaScript, GTM does not load and the site's primary content remains available.

The standard GTM `noscript` iframe is intentionally omitted. Loading it immediately after `body` would contact Google before a visitor chooses and would break this basic-consent contract.

## Google Tag Manager setup

The container is published and the LinkedIn Insight tag has been removed. Keep these rules for every
future version:

1. The GA4 Google tag uses an all-pages trigger and requires `analytics_storage`.
2. Any Google Ads or conversion tag requires `ad_storage`, `ad_user_data`, and `ad_personalization` as appropriate.
3. Do not use a trigger that bypasses consent initialization.
4. Preview with Tag Assistant before publishing, then record the published container version and date here.
5. Do not duplicate the GA4 script in Astro.

## Approved and observed property settings

- Event and user data retention: **14 months**, with reset on new user activity.
- Search Console is linked to the web stream.
- Google Ads is linked and personalized advertising is enabled. The site now exposes a separate advertising consent category for these functions.
- Google Signals and granular location and device collection are enabled. They are described in the privacy policy and must remain governed by the advertising choice.
- User-provided data policy is acknowledged, while automatic collection appeared disabled in the supplied screenshot. Keep automatic user-provided data collection disabled unless the site later collects such data with a documented purpose and consent flow.
- Email data redaction is enabled. URL query parameter redaction is disabled; avoid personal data in URLs and add redaction if future URLs can contain identifiers.
- GTM was reported published after the LinkedIn removal on 25 September 2026.

## Enhanced measurement review

Open **GA4 → Admin → Data collection and modification → Data streams → Website stream → Enhanced measurement → gear icon**. Use these settings for the current site:

| Measurement       | Setting | Reason                                                   |
| ----------------- | ------- | -------------------------------------------------------- |
| Page views        | On      | Core aggregate traffic measurement                       |
| Scrolls           | On      | Useful for long editorial and service pages              |
| Outbound clicks   | On      | Measures mail, DCC, and referenced external links        |
| File downloads    | On      | Useful when downloadable resources are added             |
| Site search       | Off     | The site has no search feature                           |
| Video engagement  | Off     | Enable only when embedded supported videos are published |
| Form interactions | Off     | The site has no forms                                    |

After saving, verify in **Realtime** and **DebugView** that only the intended events appear. Revisit this table whenever a search, form, or video feature is added.

## Verification

Test in a fresh browser profile or after clearing site storage:

1. Before choosing, confirm there is no request to `googletagmanager.com`, Google Analytics, or Google Ads.
2. Select **Rechazar opcionales** and confirm the choice persists after navigation and reload.
3. Open **Gestionar cookies**, allow only analytics, and confirm `analytics_storage=granted` while all advertising states remain denied.
4. Allow only advertising and confirm the three advertising consent states are granted while analytics remains denied.
5. Accept all and verify the GA4 and advertising tags expected from the published container in Tag Assistant.
6. Withdraw each category and confirm the page reloads without that authorization and recognized first-party cookies are removed.
7. Repeat the controls with a keyboard and at mobile width.
