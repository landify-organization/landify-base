# Landify Consumer & Tooling Ownership

## Mục tiêu

Tài liệu này xác định cấu hình nào được consumer nhận qua `landify-base`, cấu hình nào phải hiện diện local, và repository nào là owner của từng loại cấu hình.

## Public Remote Git Layer

`landify-base` là public Nuxt Layer. Consumer pin một tag phát hành và cho Nuxt tự cài runtime dependency của Layer:

```ts
export default defineNuxtConfig({
  extends: [['github:landify-organization/landify-base#v0.1.0', { install: true }]],
})
```

- Không cài package `landify-base` bằng pnpm/npm.
- Không cần access token khi repository là public.
- Không dùng `main` hoặc tag bị thay đổi; mỗi release dùng tag bất biến.
- Consumer tự quyết định thời điểm nâng tag và phải kiểm thử trước khi merge.

Trước khi Template hoặc consumer pin một version, merge Base vào `main`, kiểm
tra phiên bản đó, rồi tạo Git tag/release trên chính commit đã kiểm tra, ví dụ
`v0.1.0`. Template chỉ là snapshot lúc tạo project; consumer luôn giữ tag đang
được ghi trong `nuxt.config.ts` cho đến khi chủ động nâng lên tag mới.

### Distribution decision và hướng migration

Ở giai đoạn hiện tại, Landify tiếp tục ưu tiên public Remote Git Layer vì cách
này đơn giản, phù hợp với số lượng consumer còn ít và chưa cần vận hành quy trình
publish package. Đây là quyết định cho giai đoạn đầu, không phải giới hạn kiến
trúc lâu dài.

Pin Git tag giúp consumer không tự nhận code mới, nhưng không bảo đảm source luôn
sẵn sàng. Nếu organization/repository bị đổi tên, chuyển private, bị xoá hoặc tag
không còn truy cập được, bản đã deploy vẫn tiếp tục chạy nhưng clean install,
CI/CD hoặc lần build mới có thể thất bại. Cache local không được xem là phương án
backup.

Trong thời gian còn dùng Remote Git Layer:

- Giữ repository dưới ownership của organization và không đổi tên, xoá hoặc
  chuyển private trước khi có kế hoạch migration cho consumer.
- Chỉ phát hành từ commit đã kiểm tra trên `main`, tạo tag bất biến và không
  force-push tag đã có consumer sử dụng.
- Consumer pin tag cụ thể, giữ quyền chủ động nâng version và kiểm thử sau mỗi
  lần nâng.
- Duy trì backup/mirror của source và metadata release để có thể khôi phục kênh
  phân phối khi cần.

Cân nhắc chuyển sang npm Layer package trước khi có nhiều product production,
hoặc khi cần một trong các khả năng sau:

- Dependency được quản lý đầy đủ bởi `package.json` và `pnpm-lock.yaml`.
- Clean install và CI không còn phụ thuộc trực tiếp vào GitHub repository URL.
- Nâng version bằng package manager hoặc dependency bot.
- Cần đổi tên, di chuyển hoặc thay đổi visibility của source repository.

Hướng migration ưu tiên là dual distribution: GitHub tiếp tục là source of truth,
cùng một release vừa có Git tag cho consumer cũ vừa publish public scoped npm
package cho consumer mới. Consumer được chuyển dần, không cần migrate đồng loạt.
Package là một Nuxt Layer chứa source, không phải viết lại thành component bundle.

Ví dụ consumer sau migration:

```bash
pnpm add -D @landify-organization/landify-base@0.1.2
```

```ts
export default defineNuxtConfig({
  extends: ['@landify-organization/landify-base'],
})
```

Khi đó không còn cần `{ install: true }`; nếu consumer không dùng Remote Git
Layer nào khác thì cũng có thể bỏ `giget`. Public package không cần token để cài,
nhưng người hoặc CI thực hiện publish vẫn phải có quyền trên npm registry.

Trước khi publish package đầu tiên, cần tạo một OpenSpec change riêng để:

1. Chuẩn hoá `name`, semantic `version`, `main`, `files` và `publishConfig` trong
   `package.json`.
2. Kiểm tra mọi import runtime và giữ dependency được Layer import trong
   `dependencies`.
3. Loại bỏ import dựa trên alias consumer như `@/` hoặc `~/` khỏi source Base.
4. Chạy `pnpm pack`, cài tarball vào consumer sạch và xác nhận Nuxt build,
   component auto-import, CSS token và Tailwind `@source` hoạt động từ
   `node_modules`.
5. Thiết lập release/publish, sau đó cập nhật Template và migration guide cho
   consumer hiện có.

npm package làm kênh phân phối ổn định hơn nhưng không loại bỏ dependency logic:
consumer vẫn phụ thuộc vào public component, token và Nuxt config contract của
Base. Breaking change vẫn phải dùng semantic versioning và chỉ đi vào consumer
khi consumer chủ động nâng version.

## Ownership matrix

| Concern                                                          | Nuxt `extends` kế thừa  | Owner ở giai đoạn đầu            | Owner về sau                          |
| ---------------------------------------------------------------- | ----------------------- | -------------------------------- | ------------------------------------- |
| Components, composables, layouts, utils, CSS tokens, Nuxt config | Có                      | `landify-base`                   | `landify-base`                        |
| Runtime dependency do Layer import                               | Có, qua `install: true` | `landify-base`                   | `landify-base`                        |
| ESLint flat config                                               | Không                   | `landify-base` local config      | `landify-tooling` + consumer wrapper  |
| Prettier và Tailwind class sorting                               | Không                   | `landify-base` local config      | `landify-tooling` + consumer wrapper  |
| VS Code extension/settings                                       | Không                   | `landify-base/.vscode`           | template hoặc devkit sync             |
| Storybook                                                        | Không                   | `landify-base` local dev tooling | Từng repo quyết định có cần hay không |

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

## Tailwind source discovery

Tailwind CSS v4 tự quét source của consumer từ project hiện tại, nên Template và
consumer không cần khai báo đường dẫn đến `app/`, `components/` hoặc `pages/` của
chính chúng. Tuy nhiên, Tailwind mặc định bỏ qua dependency directory. Vì
`landify-base` được Nuxt tải như một Remote Git Layer, Base phải tự đăng ký source
của nó trong stylesheet:

```css
@import 'tailwindcss';
@source '../..'; /* từ app/assets/css/main.css tới app/ của landify-base */
@import 'tw-animate-css';
```

Nhờ vậy, static utility class trong `landify-base/app/**` được sinh ra khi
consumer build, bất kể Nuxt đặt source Layer ở thư mục cache nào. Không thêm path
của consumer vào Base: làm vậy khiến Base phụ thuộc vào cấu trúc thư mục của từng
project.

`@source` chỉ giúp Tailwind tìm file, không nhận biết class tạo động, ví dụ
`` `bg-${color}-500` ``. Với trường hợp này, dùng map class tĩnh hoặc safelist rõ
ràng bằng `@source inline(...)` theo tài liệu Tailwind.

## UI source and token ownership

`landify-base` uses shadcn-vue as a source generator, not as a packaged component library. The Base repository owns the generated source under `app/components/ui/`, reviews it like any other source change, and exposes Landify-named `Ui*` primitives to consumers. Reka UI remains an internal behavior dependency.

The Layer uses shadcn-vue semantic CSS variables. Consumers override theme values in CSS loaded after the Layer instead of forking components:

```css
:root {
  --primary: var(--color-emerald-600);
  --primary-foreground: var(--color-white);
  --ring: var(--color-emerald-700);
}
```

`Block*` components may be shared between marketing, dashboard, and back-office surfaces, but they never include consumer business data, permissions, API integration, analytics, or campaign-specific content.

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

## Pull request automation

Lần push đầu tiên lên branch khác default branch sẽ tạo một GitHub Pull Request
duy nhất. Workflow dùng `GITHUB_TOKEN`, không dùng MCP hoặc personal access
token; PR được tạo bởi GitHub Actions, còn assignee mặc định là người push
branch. Các push sau khi PR đã tồn tại chỉ kết thúc workflow, không cập nhật
title, body, assignee hay reviewer; vì vậy các chỉnh sửa thủ công trong PR được
giữ nguyên.

Trước khi sử dụng, vào **Settings → Actions → General → Workflow permissions**
và cho phép workflow có quyền ghi, sau đó bật **Allow GitHub Actions to create
and approve pull requests**. Workflow chỉ yêu cầu `issues: write` và
`pull-requests: write` ngoài quyền đọc nội dung repository.

Bạn có thể để reviewer trống, chọn reviewer thủ công trong PR, hoặc đặt Actions
variables cấp repository tại **Settings → Secrets and variables → Actions →
Variables**:

- `DEFAULT_REVIEWERS`: danh sách username GitHub, cách nhau bởi dấu phẩy, ví dụ
  `mai,anh`.
- `DEFAULT_TEAM_REVIEWERS`: danh sách team slug, cách nhau bởi dấu phẩy, ví dụ
  `frontend,platform`.

Reviewer phải có quyền phù hợp trong repository. Không đặt chính tác giả PR làm
reviewer; GitHub sẽ từ chối review request đó.

Để workflow tự đặt nội dung ban đầu và liên kết GitHub Issue cùng repository,
dùng commit subject theo dạng `type: [ticket] description`, ví dụ
`feat: [1] Set up git PR github`. Title PR giữ nguyên subject này; Summary và
Changes hiển thị `Set up git PR github`, không kèm SHA, và mô tả có `Closes #1`.
Workflow chỉ suy ra ticket từ commit đầu tiên. Subject không theo dạng này được
giữ nguyên, không suy ra issue nào.

Nếu cùng MR hoàn thành ticket khác, thêm thủ công `Closes #2` vào mô tả trước
khi merge vào default branch; GitHub sẽ đóng ticket đó khi merge. Ticket chỉ
liên quan nhưng chưa hoàn thành nên được link trong sidebar **Development**
hoặc ghi `Related to #2`, không dùng keyword đóng Issue.

## Security boundary

Public `landify-base` không được chứa token, secret, dữ liệu khách hàng, asset giới hạn license hoặc logic dành riêng cho brand/campaign. Landing repository của từng khách hàng có thể vẫn là private.

## Documentation ownership

- `docs/architecture/` lưu kiến trúc và ownership bền vững, dễ đọc cho team.
- `docs/plan/sprint-ticket-plan-v2.md` lưu roadmap và Sprint scope.
- `openspec/specs/` lưu requirement chuẩn có thể kiểm chứng sau khi change được archive.
- `openspec/changes/` lưu proposal, design và task của một thay đổi đang được triển khai.

Không copy toàn bộ nội dung giữa các nơi. Docs giải thích bức tranh tổng thể; OpenSpec giữ contract và lịch sử quyết định thay đổi.
