## ⌕ layouts 디렉토리입니다

---

레이아웃을 관리하는 디렉토리입니다.

### 구현방법

```ts
export default function GlobalLayout() {
  return (
    <div className="box-border">
      <NavBar />
      <CustomErrorBoundary>
        <Outlet />
      </CustomErrorBoundary>
    </div>
  );
}
```

- box-border css를 GlobalLayout에서 선언합니다.
- 파스칼 케이스를 사용합니다.
- React Router Dom의 Outlet 컴포넌트를 사용하여 구현합니다.
