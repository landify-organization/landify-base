# Landify Issue Description Template

Tài liệu này cung cấp mẫu description cho một issue có phạm vi triển khai rõ
ràng. Mẫu được viết để cả thành viên trong team và coding agent có thể xác định
đúng mục tiêu, giới hạn thay đổi, yêu cầu kỹ thuật và cách bàn giao mà không phải
tự suy đoán các quyết định quan trọng.

Quy ước về Area, Work Type, Priority, Size và Labels được định nghĩa trong
[Landify Issue Conventions](./issue-conventions.md).

## Mẫu dùng lại

Sao chép nội dung dưới đây vào description của issue rồi xóa các dòng hướng dẫn
không còn cần thiết.

````md
# [Area] [Work Type] <Tên task>

## Mục tiêu

Mô tả ngắn gọn kết quả cuối cùng cần đạt được. Ưu tiên kết quả có thể quan sát
hoặc kiểm chứng, không chỉ mô tả hoạt động cần thực hiện.

Ví dụ:

Tạo `UiCardBase` làm cấu trúc Card reusable cho các landing page, giảm markup bị
lặp lại nhưng vẫn cho phép consumer tùy chỉnh nội dung qua props, slots và
`class`.

---

## Context

Mô tả lý do task tồn tại:

- Hành vi hoặc cấu trúc hiện tại là gì?
- Vấn đề đang ảnh hưởng đến ai hoặc module nào?
- Vì sao giải pháp hiện tại chưa đáp ứng nhu cầu?
- Có issue, PR, tài liệu hoặc quyết định kiến trúc liên quan nào không?

---

## Phạm vi thực hiện

Liệt kê những thay đổi thuộc task bằng checklist:

- [ ] ...
- [ ] ...

Nếu có giới hạn quan trọng, thêm mục **Ngoài phạm vi** trong section này:

### Ngoài phạm vi

- Không ...
- Không refactor các phần không liên quan.

---

## Yêu cầu kỹ thuật

Mô tả contract mà implementation phải đáp ứng, ví dụ:

- Public API: props, slots, emits hoặc kiểu dữ liệu.
- Hành vi bắt buộc và các trường hợp rỗng/lỗi.
- Convention, accessibility, responsive hoặc compatibility cần giữ.
- Vị trí file dự kiến nếu đã biết.
- Những dependency/API không được thay đổi.

### Tiêu chí hoàn thành

Dùng checklist có thể kiểm chứng. Mỗi dòng nên mô tả một kết quả cụ thể:

- [ ] ...
- [ ] Lint và typecheck thành công.

### Kiểm chứng

```sh
<các lệnh cần chạy>
```

Nếu cần kiểm tra thủ công, ghi rõ viewport, trạng thái hoặc luồng cần kiểm tra.

---

## Thiết kế / Tham chiếu (Reference)

Thêm design, code, screenshot, API contract hoặc component tham khảo.

Ghi rõ reference thuộc loại nào:

- **Bắt buộc:** implementation phải tương thích với reference.
- **Định hướng:** có thể điều chỉnh để phù hợp convention hiện tại, nhưng không
  được làm thay đổi mục tiêu và tiêu chí hoàn thành.

Links:

- Figma: ...
- Component/code liên quan: ...
- Issue/PR/tài liệu liên quan: ...

---

## Cách bàn giao

- Tạo branch từ `<base-branch>` theo convention của repository.
- Commit theo convention `type: [ticket] description` nếu repository đang dùng
  workflow tạo PR tự động.
- Push branch và tạo Pull Request về `<base-branch>`; không tự merge.
- Sử dụng và hoàn thiện PR description template có sẵn của repository.
- Báo cáo các lệnh kiểm chứng đã chạy, kết quả và phần chưa thể kiểm chứng.
- Ghi rõ mọi giả định, thay đổi ngoài dự kiến hoặc rủi ro còn lại.
````

## Ví dụ hoàn chỉnh: `UiCardBase`

````md
# [LF-Base] [Markup] Implement reusable UiCardBase

## Mục tiêu

Tạo `UiCardBase` làm cấu trúc Card reusable cho các landing page. Component giúp
giảm việc lặp lại markup của các Card primitives, đồng thời cho phép consumer tùy
chỉnh header, content, footer và style khi cần.

---

## Context

Các Card trên landing page thường lặp lại cùng một cấu trúc:

- `Card`
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`

Thiết kế giữa các landing page có thể khác nhau, nhưng phần lớn vẫn chia thành
header, content và footer. Việc lặp lại toàn bộ cấu trúc làm consumer phải xử lý
lại các quy tắc như không render section rỗng, merge class và chọn semantic token
phù hợp.

`UiCardBase` cần cung cấp cấu trúc mặc định đủ nhanh để sử dụng cho trường hợp
phổ biến, nhưng không chứa business data, brand-specific style hoặc interaction
chỉ thuộc một landing page.

Component phải tuân theo
[`docs/architecture/component-conventions.md`](../architecture/component-conventions.md):
`Ui*` là public primitive wrapper, dùng typed props, semantic tokens và cho phép
consumer tùy chỉnh bằng class trước khi bổ sung variant mới.

---

## Phạm vi thực hiện

- [ ] Thêm các Card primitives cần thiết dưới
      `app/components/ui/card/` theo pattern shadcn-vue hiện tại.
- [ ] Tạo public wrapper `app/components/ui/UiCardBase.vue`.
- [ ] Hỗ trợ nội dung mặc định qua `title`, `subtitle` và `description`.
- [ ] Hỗ trợ slots để consumer tùy chỉnh header, content và footer.
- [ ] Forward attributes và merge `class` của consumer vào Card root.
- [ ] Thêm Storybook stories cho trường hợp mặc định, không có footer và tùy
      chỉnh bằng slots.
- [ ] Cập nhật tài liệu public component nếu repository đã có danh mục component.

### Ngoài phạm vi

- Không thêm API call, analytics, permission hoặc business logic.
- Không thêm màu sắc, font hoặc hiệu ứng riêng của một brand/campaign.
- Không tạo variant mới nếu cùng kết quả có thể đạt được bằng consumer `class`.
- Không thay đổi public API hoặc hành vi của `UiButton` và `BlockActionCard`.
- Không refactor các component không liên quan.

---

## Yêu cầu kỹ thuật

Public API định hướng:

```ts
interface Props {
  class?: HTMLAttributes['class']
  description?: string
  subtitle?: string
  title?: string
}
```

Slots:

- `header`: thay thế toàn bộ header mặc định.
- `default`: thay thế content được tạo từ `description`.
- `footer`: cung cấp nội dung footer.

Quy tắc render:

- Nếu có slot `header`, render slot và không render header được tạo từ props.
- Nếu không có slot `header`, chỉ render `CardHeader` khi có `title` hoặc
  `subtitle`.
- Slot `default` được ưu tiên hơn `description`.
- Chỉ render `CardContent` khi có default slot hoặc `description`.
- Chỉ render `CardFooter` khi consumer cung cấp slot `footer`.
- Attributes không thuộc props, bao gồm `aria-*` và `data-*`, phải được forward
  tới Card root.
- `class` của consumer phải được merge với class mặc định theo convention hiện
  tại, không ghi đè hoặc làm mất class nền của component.
- Component sử dụng semantic tokens như `bg-card`, `text-card-foreground` và
  `text-muted-foreground`; không hard-code brand color.
- Component giữ native semantics, focus visibility và accessible name của mọi
  interactive content do consumer truyền vào.
- Layout không gây horizontal overflow tại 320px, 768px và 1280px.

API trên là định hướng. Có thể điều chỉnh tên prop hoặc slot để khớp convention
đã tồn tại trong codebase, nhưng phải ghi rõ quyết định đó trong PR và vẫn đáp
ứng đầy đủ các hành vi nêu trên.

### Tiêu chí hoàn thành

- [ ] Trường hợp chỉ có `title` render Card và header, không render content hoặc
      footer rỗng.
- [ ] `title`, `subtitle` và `description` render đúng ở cấu trúc mặc định.
- [ ] Consumer có thể thay toàn bộ header bằng slot `header`.
- [ ] Default slot thay thế nội dung `description`.
- [ ] Footer chỉ xuất hiện khi có slot `footer`.
- [ ] Consumer có thể truyền `class`, `aria-*` và `data-*` vào Card root.
- [ ] Stories bao phủ default state, optional sections và custom slots.
- [ ] Component hiển thị không overflow ở 320px, 768px và 1280px.
- [ ] Không có console error hoặc warning trong Storybook.
- [ ] Lint, typecheck và Storybook build thành công.

### Kiểm chứng

```sh
pnpm lint
pnpm typecheck
pnpm build-storybook
```

Kiểm tra thủ công trong Storybook:

1. Mở story chỉ có `title`; xác nhận không có content/footer rỗng.
2. Mở story đầy đủ `title`, `subtitle`, `description` và footer.
3. Mở story dùng custom header/default/footer slots.
4. Kiểm tra các story ở viewport 320px, 768px và 1280px.
5. Kiểm tra tab Accessibility và console của browser.

---

## Thiết kế / Tham chiếu (Reference)

Reference dưới đây là **định hướng cấu trúc**, không bắt buộc sao chép nguyên
public API. Implementation có thể thay đổi chi tiết để phù hợp convention hiện
tại nhưng phải giữ các quy tắc render trong phần Yêu cầu kỹ thuật.

```vue
<Card>
  <CardHeader>
    <CardTitle>{{ title }}</CardTitle>
    <CardDescription>{{ subtitle }}</CardDescription>
  </CardHeader>

  <CardContent>
    {{ description }}
  </CardContent>

  <CardFooter>
    <slot name="footer" />
  </CardFooter>
</Card>
```

Tham chiếu trong repository:

- Public wrapper pattern: `app/components/ui/UiButton.vue`
- Generic composition example: `app/components/blocks/BlockActionCard.vue`
- Component conventions: `docs/architecture/component-conventions.md`

---

## Cách bàn giao

- Tạo branch từ default branch của repository.
- Commit đầu tiên theo dạng `feat: [<issue-number>] implement reusable UiCardBase`
  để workflow có thể tạo và liên kết PR tự động.
- Push branch và tạo Pull Request về default branch; không tự merge.
- Giữ nguyên các section trong `.github/pull_request_template.md` và điền đầy đủ
  nội dung theo implementation thực tế.
- Trong `Testing`, chỉ đánh dấu các kiểm tra đã thực sự hoàn thành; ghi rõ lệnh
  nào không chạy được và lý do.
- Ghi lại mọi thay đổi API so với định hướng của issue trong PR.
````

## Nguyên tắc viết cho coding agent

- Mô tả kết quả và contract quan trọng; không ép implementation vào một cấu trúc
  nội bộ khi task không yêu cầu.
- Dùng checklist cho các kết quả có thể kiểm chứng, không dùng các mô tả mơ hồ
  như "clean", "đẹp", "tối ưu" nếu không có tiêu chí đi kèm.
- Ghi rõ phần ngoài phạm vi để tránh refactor lan rộng.
- Không lặp lại PR description trong issue. Issue mô tả yêu cầu; PR template mô
  tả implementation thực tế và bằng chứng kiểm chứng.
- Nếu chưa có quyết định, ghi rõ phần nào là định hướng và cho phép agent đề xuất
  trước khi triển khai.
