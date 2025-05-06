## 💡 mocks 디렉토리입니다

---

MSW에서 사용할 핸들러들을 관리하는 디렉토리입니다.

### 주요 내용

- `@/mocks/handlers/` : 도메인 혹은 기능별로 묶어서 구현합니다.
- `@/mocks/browser.ts` : 위에서 구현된 Handler를 browser.ts에 추가합니다.
- API Call이 발생하는 모든 기능이 `handlers/` 디렉토리 안에 구현되어야 합니다.
- 다음과 같이 스프레드를 사용해서 추가해주면 됩니다.

```ts
export const handlers = [...AuthHandlers, ...ProductHandlers];
```

### Naming Conventions

- browser.ts를 제외한 파일은 모두 파스칼 케이스로 작성합니다.
- handler로 사용되는 파일은 `~.handlers.ts` 와 같이 중간에 `handlers` 를 추가합니다.
