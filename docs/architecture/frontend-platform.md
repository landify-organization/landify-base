# Landify Frontend Platform

Architecture & Repository Strategy

Nuxt Layer • Shared Tooling • Developer Platform • GitHub Template

> Mục tiêu: tạo một nền tảng landing-page có thể tái sử dụng, khởi tạo project mới gần như zero-setup, nhưng vẫn giữ từng concern đúng cơ chế native của nó.

Phiên bản tổng hợp kiến trúc đã thống nhất trong trao đổi

## 1. Tổng quan kiến trúc

Landify được tổ chức như một Frontend Platform gồm bốn repository có trách nhiệm khác nhau. Không ép tất cả vào Nuxt Layer; mỗi loại cấu hình dùng đúng cơ chế phù hợp nhất.

```text
GitHub Account / Organization
├── landify-base
├── landify-tooling
├── landify-devkit
└── landify-template
```

| Repository       | Bản chất                    | Trách nhiệm                                               | Cách consumer dùng                                      |
| ---------------- | --------------------------- | --------------------------------------------------------- | ------------------------------------------------------- |
| landify-base     | Public Nuxt Layer           | UI, tokens, composables, Nuxt config, Storybook preview   | Nuxt `extends` public remote Git layer, pin release tag |
| landify-tooling  | npm package                 | ESLint, Prettier, shared dev config, optional CLI         | `pnpm add -D` / package config                          |
| landify-devkit   | Git repo / standards source | GitHub Actions, AI/agents/skills/MCP templates, standards | Reusable workflow, template hoặc sync                   |
| landify-template | GitHub Template Repository  | Starter app wiring sẵn base + tooling + devkit            | Use this template / `gh repo create --template`         |

## 2. landify-base

`landify-base` là dependency sống của mọi landing project. Nó là một Nuxt Layer bằng source code, không phải component bundle truyền thống.

- Design System: source-owned shadcn-vue `Ui*` primitives, generic `Block*` compositions, and Reka UI behavior beneath them.

- shadcn-vue semantic theme tokens, Tailwind CSS v4, typography, spacing, responsive conventions.

- Composables, utils, layouts, generic marketing/admin blocks và Nuxt config có tính tái sử dụng.

- Storybook chỉ để preview và manual accessibility feedback ở giai đoạn đầu; không đi vào production dependency graph và chưa là automated test gate.

- Có thể có SEO/default config chung cho landing page nếu thực sự mang tính nền tảng.

- Không chứa business-specific component như BrandHero, UserApprovalFlow, campaign API hoặc tracking ID riêng của từng nhãn hàng.

```text
landify-base/
├── app/
│   ├── components/
│   ├── composables/
│   ├── lib/
│   ├── layouts/
│   ├── utils/
│   └── assets/css/
├── shared/
├── stories/
├── .storybook/
├── .vscode/
├── nuxt.config.ts
├── app.config.ts
└── package.json
```

### Consumer sử dụng

```ts
export default defineNuxtConfig({
  extends: [['github:landify-organization/landify-base#v0.1.0', { install: true }]],
})
```

`landify-base` là public repository. Consumer không cần cài package `landify-base` hoặc cấu hình access token; Nuxt tải source Layer và cài runtime dependency của Layer qua `install: true`. Consumer luôn pin tag phát hành, không dùng branch như `main`.

Tag là nhãn Git cố định gắn vào một commit đã được kiểm tra; một release là mốc Base được công bố để consumer dùng, thường mang chính tag đó. Sau khi merge và kiểm tra một phiên bản Base trên `main`, tạo tag như `v0.1.0`, rồi để Template pin tag này. Không tham chiếu `#main`: thay đổi mới trên Base sẽ không tự đi vào consumer.

Khi `landify-base` phát hành `v0.2.0`, Page A/B vẫn ở `v0.1.0` cho tới khi chủ động đổi tag và kiểm thử. Đây là khác biệt cốt lõi với template.

### Runtime và developer tooling

Nuxt `extends` chỉ kế thừa runtime/build concern: Nuxt config, component, composable, layout, utility, CSS token và runtime dependency của Layer. Nó không truyền ESLint, Prettier, plugin sắp xếp Tailwind class hay cấu hình editor vào consumer.

Tailwind CSS v4 tự quét source của consumer; còn `landify-base` đăng ký rõ
`app/` của nó bằng `@source` trong stylesheet. Điều này giữ các utility class của
Base xuất hiện trong consumer build dù source Layer nằm trong dependency cache.
Xem `docs/architecture/consumer-tooling.md` để biết giới hạn với dynamic class.

### UI source và semantic token contract

`landify-base` dùng shadcn-vue như một source distribution: CLI thêm source component vào Base, sau đó Landify sở hữu và review source đó như code nội bộ. Reka UI vẫn là lớp headless/accessibility bên dưới. Consumer dùng public `Ui*` component của Layer, không gọi Reka trực tiếp.

Theme dùng semantic variable chuẩn shadcn-vue (`--primary`, `--background`, `--border`, v.v.). Consumer đặt CSS override sau stylesheet của Layer để thay brand; component dùng Tailwind semantic utility như `bg-primary`, không dùng palette/brand color trực tiếp.

`Block*` là composition generic có thể phục vụ marketing, dashboard hoặc back-office. Base chỉ cung cấp cấu trúc UI; business data, phân quyền, API, analytics và campaign content thuộc consumer.

- Trong Sprint 1, `landify-base` tự dùng ESLint, Prettier, `prettier-plugin-tailwindcss`, VS Code settings và Storybook cho local development.
- Từ Sprint 5, `landify-template` cung cấp snapshot local tooling cho consumer mới.
- Từ Sprint 7, `landify-tooling` trở thành nguồn shareable config sau khi các quy tắc đã được chứng minh trong Base; consumer có thể vẫn giữ wrapper local rất mỏng cho các path riêng, như Tailwind stylesheet của Prettier.

Xem `docs/architecture/consumer-tooling.md` để biết ownership, cấu hình và cách nâng cấp consumer.

## 3. landify-tooling

`landify-tooling` là package riêng vì ESLint/Prettier chạy độc lập với Nuxt Layer. Nó chỉ được tạo ở Phase 3, sau khi local configuration trong Base được dùng và tinh chỉnh thực tế. Tách riêng không làm Nuxt Layer mất khả năng sử dụng; ngược lại chính `landify-base` cũng nên dùng chung tooling này.

- Shared ESLint flat config và plugins.

- Shared Prettier config.

- Có thể chứa conventions TypeScript hoặc helper scripts liên quan dev tooling.

- Có thể mở rộng thành CLI: `landify init`, `landify sync`, `landify doctor` nếu nhu cầu tăng.

```js
// eslint.config.mjs
export { default } from '@yourname/landify-tooling/eslint'

// prettier.config.mjs
export { default } from '@yourname/landify-tooling/prettier'
```

## 4. landify-devkit

`landify-devkit` là single source of truth cho Developer Experience và Engineering Standards - rộng hơn một repo CI đơn thuần.

```text
landify-devkit/
├── github/
│   ├── workflows/
│   └── templates/
├── ai/
│   ├── rules/
│   ├── agents/
│   ├── skills/
│   ├── prompts/
│   └── mcp/
├── editor/
├── scripts/
└── docs/
```

- Reusable GitHub Actions cho lint/build/quality/release.

- AI coding rules, agent definitions, reusable skills và prompt conventions.

- MCP common config/template, ví dụ Figma MCP; tuyệt đối không commit token/OAuth secret cá nhân.

- VS Code recommendations, editor standards, onboarding và architecture docs.

- Những tool hỗ trợ remote reference thì reference trực tiếp; tool bắt buộc local file thì dùng template hoặc command sync.

## 5. landify-template

`landify-template` là starter Nuxt app. Nó chỉ dùng lúc sinh project mới. Sau khi Page A/B được tạo, thay đổi trong template không tự đồng bộ sang A/B.

```text
landify-template/
├── app/
│   ├── app.vue
│   └── pages/index.vue      # demo nhỏ
├── public/
├── nuxt.config.ts          # extends landify-base
├── package.json            # dùng landify-tooling
├── eslint.config.mjs
├── prettier.config.mjs
├── .vscode/
├── .github/workflows/ci.yml
├── AGENTS.md / AI bootstrap
├── .editorconfig
└── README.md
```

- Demo chỉ đủ để kiểm tra Nuxt, base components, CSS/theme, local lint/format và wiring hoạt động.

- Không copy Button/Dialog/... vào template; reusable UI phải nằm ở landify-base.

- Template nên càng mỏng càng tốt: starter structure + pointer tới các nguồn dùng chung.

## 6. Luồng tạo Page A / Page B

Bật `landify-template` thành GitHub Template Repository. Sau đó có hai cách tạo project mới:

### Cách 1 - GitHub UI

```text
landify-template
→ Use this template
→ Create a new repository
→ đặt tên: brand-a-landing
```

### Cách 2 - GitHub CLI

```bash
gh repo create brand-a-landing \
  --template yourname/landify-template \
  --private \
  --clone

cd brand-a-landing
pnpm install
pnpm dev
```

Sau khi tạo, repository mới độc lập với template, nhưng vẫn tiếp tục tham chiếu các nguồn versioned/shared như `landify-base`, `landify-tooling` và reusable workflows/devkit.

```text
landify-template
      │ create once
      ▼
brand-a-landing
      ├── extends → public landify-base#v1.0.0 (install: true)
      ├── package → landify-tooling
      └── workflow/rules → landify-devkit
```

## 7. Quy tắc cập nhật

| Nguồn thay đổi          | Page A/B có đổi tự động?      | Cách nhận thay đổi                                                                    |
| ----------------------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| landify-template        | Không                         | Không có quan hệ update; chỉ ảnh hưởng project tạo mới sau đó.                        |
| landify-base            | Không nếu pin tag             | Chủ động đổi `#vX.Y.Z`, test rồi commit.                                              |
| landify-tooling         | Theo package/lockfile         | Nâng package version và chạy install; local wrapper có thể giữ path-specific setting. |
| landify-devkit workflow | Theo ref đang dùng            | Nâng workflow/tag ref; nếu dùng floating ref thì thay đổi có thể tới sớm hơn.         |
| AI/MCP local files      | Không tự động nếu là bản copy | Dùng sync/generate command hoặc cập nhật từ template/source canonical.                |

## 8. Nguyên tắc kiến trúc cần giữ

- Nuxt Layer chịu trách nhiệm application/runtime/build concern của Nuxt; không dùng Layer để giả lập mọi loại repository config.

- `landify-base` là dependency sống; `landify-template` chỉ bootstrap một lần.

- UI reusable nằm ở base, không bị copy sang từng project.

- ESLint/Prettier/Tailwind class sorting là local tooling: template copy snapshot ban đầu, rồi dùng shareable package sau Phase 3; không kỳ vọng Nuxt `extends` truyền các config này.

- CI dùng reusable GitHub Actions; AI/MCP/agents/skills dùng central source + reference hoặc sync theo khả năng từng tool.

- Secrets cá nhân (Figma token, OAuth, API key) không bao giờ đưa vào shared repository.

- Vì `landify-base` là public, không đưa customer data, restricted asset, proprietary brand behavior hay secret vào lịch sử Git.

- Project cụ thể đặt tên theo brand/campaign/product, ví dụ `nike-summer-campaign`; không cần prefix `landify-`.

- Các repo `landify-*` là hạ tầng; Page A/B/C là sản phẩm được dựng trên hạ tầng đó.

## 9. Naming khuyến nghị

```text
landify-base       # Nuxt Layer + Design System + Storybook
landify-tooling    # ESLint / Prettier / optional CLI
landify-devkit     # GitHub workflow + AI/Agent/Skill/MCP standards
landify-template   # GitHub Template Repository

Project thật:
brand-a-launch
nike-airmax-campaign
samsung-product-landing
```

## 10. Mental model cuối cùng

| landify-base     | "Project này được xây trên cái gì?"                      |
| ---------------- | -------------------------------------------------------- |
| landify-tooling  | "Code của project được lint/format theo chuẩn nào?"      |
| landify-devkit   | "Developer/CI/AI làm việc theo chuẩn và automation nào?" |
| landify-template | "Project mới được sinh ra với setup ban đầu nào?"        |

Kết luận: bắt đầu với 4 repo trên GitHub là mô hình rõ ràng, dễ mở rộng và tránh over-engineering. Nếu muốn tối giản ở giai đoạn đầu, có thể triển khai 3 repo chính trước và thêm landify-template khi bắt đầu tạo project thứ hai.
