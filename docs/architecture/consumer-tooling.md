# Landify Consumer & Tooling Ownership

## Mục tiêu

Tài liệu này xác định cấu hình nào được consumer nhận qua `landify-base`, cấu hình nào phải hiện diện local, và repository nào là owner của từng loại cấu hình.

## Public Remote Git Layer

`landify-base` là public Nuxt Layer. Consumer pin một tag phát hành và cho Nuxt tự cài runtime dependency của Layer:

```ts
export default defineNuxtConfig({
  extends: [
    ['github:your-org/landify-base#v1.0.0', { install: true }],
  ],
})
```

- Không cài package `landify-base` bằng pnpm/npm.
- Không cần access token khi repository là public.
- Không dùng `main` hoặc tag bị thay đổi; mỗi release dùng tag bất biến.
- Consumer tự quyết định thời điểm nâng tag và phải kiểm thử trước khi merge.

## Ownership matrix

| Concern | Nuxt `extends` kế thừa | Owner ở giai đoạn đầu | Owner về sau |
| --- | --- | --- | --- |
| Components, composables, layouts, utils, CSS tokens, Nuxt config | Có | `landify-base` | `landify-base` |
| Runtime dependency do Layer import | Có, qua `install: true` | `landify-base` | `landify-base` |
| ESLint flat config | Không | `landify-base` local config | `landify-tooling` + consumer wrapper |
| Prettier và Tailwind class sorting | Không | `landify-base` local config | `landify-tooling` + consumer wrapper |
| VS Code extension/settings | Không | `landify-base/.vscode` | template hoặc devkit sync |
| Storybook | Không | `landify-base` local dev tooling | Từng repo quyết định có cần hay không |

## Local tooling lifecycle

### Sprint 1: Base proves the configuration

`landify-base` chứa local ESLint, Prettier, `prettier-plugin-tailwindcss`, `.vscode` và Storybook. Đây là nơi team kiểm chứng rules trước khi abstraction.

Prettier sử dụng Tailwind v4 stylesheet entry của repo để sắp xếp class trong Vue template và helper như `cn()`/`cva()`:

```js
export default {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './app/assets/css/main.css',
  tailwindFunctions: ['cn', 'clsx', 'cva'],
}
```

VS Code dùng Prettier làm default formatter và bật `formatOnSave`. CLI format check vẫn là nguồn xác nhận cuối cùng trong CI.

### Sprint 5: Template copies a working snapshot

`landify-template` chứa `eslint.config.mjs`, `prettier.config.mjs`, `.vscode/` và dev dependencies cần thiết. Consumer tạo từ template nhận chúng ngay nhưng không tự nhận thay đổi template trong tương lai.

### Sprint 7: Shared tooling centralizes proven rules

`landify-tooling` trích xuất các rule đã ổn định. Consumer tham chiếu shared config nhưng giữ wrapper local khi config phụ thuộc vào path của consumer, ví dụ:

```js
import config from '@your-org/landify-tooling/prettier'

export default {
  ...config,
  tailwindStylesheet: './app/assets/css/main.css',
}
```

## Storybook and Vercel

Storybook là development/preview tooling, không phải dependency runtime của Layer. Sprint 1 chỉ cần smoke stories và a11y panel để review thủ công; không chạy automated component, visual hoặc accessibility tests.

Storybook build thành static output `storybook-static` và có thể deploy public lên Vercel với:

```json
{
  "buildCommand": "pnpm build-storybook",
  "outputDirectory": "storybook-static"
}
```

## Security boundary

Public `landify-base` không được chứa token, secret, dữ liệu khách hàng, asset giới hạn license hoặc logic dành riêng cho brand/campaign. Landing repository của từng khách hàng có thể vẫn là private.

## Documentation ownership

- `docs/architecture/` lưu kiến trúc và ownership bền vững, dễ đọc cho team.
- `docs/plan/sprint-ticket-plan-v2.md` lưu roadmap và Sprint scope.
- `openspec/specs/` lưu requirement chuẩn có thể kiểm chứng sau khi change được archive.
- `openspec/changes/` lưu proposal, design và task của một thay đổi đang được triển khai.

Không copy toàn bộ nội dung giữa các nơi. Docs giải thích bức tranh tổng thể; OpenSpec giữ contract và lịch sử quyết định thay đổi.
