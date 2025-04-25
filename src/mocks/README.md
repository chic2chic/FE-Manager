## 📊 mocks 디렉토리입니다

---

MSW Handler를 정의하는 디렉토리입니다.

### 구현방법

```ts
// Auth.handlers.ts
import { http, HttpResponse } from "msw";

const posts = ["사용자1", "사용자2", "사용자3"];

export const AuthHandlers = [
  http.get("/auth", () => {
    return HttpResponse.json(posts, { status: 200 });
  }),

  http.post("/auth", async ({ request }) => {
    const newPost = await request.text();
    posts.push(newPost);
    return HttpResponse.json({ success: true }, { status: 201 });
  }),
];
```

- 필요한 목데이터에 맞춰서 handlers를 정의합니다.
- handler는 `Auth.handlers.ts` 와 같이 중간에 `handlers`를 추가하여 파일을 관리합니다.
- 파스칼 케이스를 사용합니다.

```ts
// browser.ts
export const handlers = [...AuthHandlers];

export const worker = setupWorker(...handlers);
```

- 다음으로 정의된 handler를 browser.ts의 `handlers`에 스프레드 형식으로 추가하여 사용합니다.
