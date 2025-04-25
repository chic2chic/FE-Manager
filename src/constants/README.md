## 💡 constants 디렉토리입니다

---

상수 데이터를 관리하는 디렉토리입니다.

### 구현방법

```ts
export const NavigationItems = [
  {
    title: "대시보드",
    url: "/dashboard",
  },
  {
    title: "팝업관리",
    url: "/popup",
  },
  {
    title: "상품관리",
    url: "/products",
  },
];
```

- `constants/onboarding` 과 같이 페이지별로 상수를 관리합니다.
- 파스칼 케이스를 사용합니다.
