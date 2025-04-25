## 📖 pages 디렉토리입니다

---

서비스를 구성하는 모든 페이지를 관리하는 디렉토리입니다.

### 구현방법

```tsx
export default function DashBoard() {
  return (
    <div>
      <div></div>
    </div>
  );
}
```

- export default function으로 페이지 컴포넌트를 관리합니다.
- 페이지명은 파스칼 케이스를 사용합니다.
- 페이지 내부 컴포넌트의 Depth는 최대 4개까지만 가져가도록 합니다.
- 해당 페이지에서만 사용되는 컴포넌트는 페이지 내에 `views` 디렉토리를 생성하여 별도로 관리합니다.
