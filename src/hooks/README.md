## 🪝 hooks 디렉토리입니다

---

커스텀 훅을 관리하는 디렉토리 입니다.

### 구현방법

```ts
export const useTest = () => {
  const handleTestGet = async () => {
    return await api.get("/auth");
  };

  const handleTestPost = async () => {
    return await api.post("/auth", "테스트 내용");
  };

  return { handleTestGet, handleTestPost };
};
```

- 필요에 따라 클로저 패턴을 사용하여 커스텀 훅을 정의합니다.
- 카멜 케이스를 사용합니다.
