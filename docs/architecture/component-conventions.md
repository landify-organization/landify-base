# Landify Component Conventions

## Scope

- `Ui*` names reusable primitives, for example `UiButton`, `UiCard`, and `UiDialog`.
- `Block*` names generic compositions that can serve marketing, dashboard, and back-office surfaces, for example `BlockHero`, `BlockPageHeader`, and `BlockEmptyState`.
- Brand, campaign, product, API, analytics, permission, and business-data concerns stay in the consumer repository.

## Public API

- Components use typed props and emits.
- Components use standard shadcn-vue semantic tokens such as `bg-primary`, `text-foreground`, and `border-border`, rather than hard-coded brand values.
- shadcn-vue source and Reka UI are implementation details wrapped by `Ui*` components; consumers use Landify components rather than Reka primitives directly.
- Components preserve native semantics, keyboard interaction, focus behavior, and accessible names.

## Token override contract

- Consumers override semantic CSS variables such as `--primary`, `--primary-foreground`, `--background`, and `--border` in CSS loaded after the Layer.
- Do not change generated `Ui*` source simply to apply a consumer brand.
- Example: `:root { --primary: var(--color-emerald-600); }` changes every shared primitive that uses `bg-primary`.

## Typography, responsive, and media ownership

- Base exposes semantic font hooks such as `--font-sans` and `--font-heading` with a neutral system fallback. It does not load a brand font or make a request to a third-party font provider.
- Consumers load their own font files or provider integration, then override the semantic font variables in CSS loaded after the Layer.
- Shared components use Tailwind CSS mobile-first utilities and its default breakpoints or container queries. Do not add Base-wide custom breakpoints for a one-off page requirement.
- Review each public component at 320px, 768px, and 1280px. Components must avoid horizontal overflow and preserve readable content, keyboard operation, focus visibility, and accessible names at each layout.
- Prefer `NuxtImg` or `NuxtPicture` for responsive and optimized media. Consumer repositories own provider, domain, preset, and deployment-specific configuration.
- Motion is progressive enhancement. Shared components must not require animation to communicate state and must respect reduced-motion preferences; a separate Base motion system is deferred until repeated needs justify it.

## Customization hierarchy

1. For a one-off consumer/page adjustment, pass Tailwind classes to the public `Ui*` component. `UiButton` merges its class with the shadcn-vue base class, so `class="rounded-xl hover:-translate-y-0.5"` overrides the default radius and adds a local hover effect.
2. For a reusable visual or interaction option needed by multiple consumers, add a typed variant to the shadcn-vue source in `app/components/ui/<component>/` and expose that option from its `Ui*` wrapper. For example, a reusable large radius becomes a `radius` or `shape` variant rather than a copied button component.
3. For a generic composition of primitives, create a `Block*` component under `app/components/blocks/`. `BlockActionCard` demonstrates a marketing/admin-neutral composition using `UiButton`.
4. Change the generated shadcn-vue source directly only when the new behavior is part of the Base-wide primitive contract. Treat it as owned source and document/cover the change in Storybook.
5. A consumer-specific workflow, business rule, API integration, permission check, or campaign effect belongs in the consumer repository, not Base.

## Landing-first component order

The first stable component set is intentionally driven by a complete product CTA landing page rather than by the size of the upstream shadcn-vue catalog:

1. Finalize `UiButton` and add `UiCard`.
2. Establish `BlockContainer` and `BlockSection` as the layout foundation.
3. Integrate Nuxt Image and add the accessible `UiDialog` and `UiAccordion` behaviors.
4. Compose `BlockSiteHeader`, `BlockHero`, `BlockFeatureGrid`, `BlockSocialProof`, `BlockFaq`, `BlockCallToAction`, and `BlockSiteFooter`.
5. Validate the complete composition in a local Nuxt playground reference page.

Form controls, tabs, selects, tooltips, and admin-oriented blocks are added after v1 unless a concrete consumer requirement moves them forward.

## File layout

- Public primitive wrappers are stored under `app/components/ui/Ui*.vue`; shadcn-vue source support files remain in `app/components/ui/<component>/`.
- Generic compositions are stored under `app/components/blocks/` as `Block*.vue`.
- Component stories are stored under `stories/` until component-level co-location is adopted deliberately.
- Shared app utilities live under `app/lib/`; code shared by app and server lives under `shared/`.
