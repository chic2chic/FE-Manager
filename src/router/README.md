## ◉ router 디렉토리입니다

---

라우팅 파일을 관리하는 디렉토리 입니다.

### 구현방법

```tsx
export const Router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
    ],
  },
  {
    path: "/onboarding",
    element: <OnBorading />,
  },
]);
```

- createBrowserRouter를 사용하여 라우팅 정보를 관리합니다.
- 라우팅 경로는 소문자로만 추가합니다.
