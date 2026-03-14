# Translation Editing Guide

This guide is for simple wording updates, typo fixes, or translation corrections.

## Where the Text Lives

- English source: `lib/i18n/messages/en.ts`
- Dutch text: `locales/nl/*.json`

If you only want to improve Dutch wording, edit the Dutch file.
If the meaning should change in every language, update both English and Dutch.

## Which File To Edit

- `locales/nl/common.json`: header, footer, menu, shared buttons
- `locales/nl/home.json`: homepage
- `locales/nl/about.json`: About page
- `locales/nl/advertising.json`: Advertising page
- `locales/nl/contact.json`: Contact page
- `locales/nl/reserve.json`: Reserve / partnership page
- `locales/nl/forms.json`: form labels, errors, placeholders, buttons
- `locales/nl/emails.json`: email subjects and confirmation emails
- `locales/nl/legal.json`: privacy policy and terms
- `locales/nl/seo.json`: page titles and search-engine descriptions

## The Safe Editing Rule

Only change the text inside quotes.

Example:

```json
"title": "Neem contact op"
```

Safe change:

```json
"title": "Contact opnemen"
```

Do not change:

- keys like `title`, `description`, `cta`
- commas, brackets, or quote marks
- placeholders like `{name}`, `{date}`, `{id}`, `{platform}`
- links like `/advertising`

## Quick Workflow

1. Open the file for the page you want to change.
2. Find the sentence.
3. Edit only the wording inside the quotes.
4. Save the file.

## If You Are Unsure

Instead of editing directly, write the suggestion like this:

```text
File: locales/nl/contact.json
Current: “Heb je vragen over onze laadstations?”
Suggested: “Heb je vragen over onze laadstations of diensten?”
```

That is the safest option for a non-technical editor.

## Important Warning

Never remove or rename placeholders like `{name}`.
Those are filled in automatically by the website or emails.

## Writing Style

Prefer wording that feels:

- clear
- natural
- modern
- confident

For Dutch, use natural Netherlands Dutch, not literal word-for-word English.

## If Something Breaks

Check whether you accidentally changed:

- a quote mark
- a comma
- a key name
- a placeholder like `{name}`

If yes, undo the last change.
