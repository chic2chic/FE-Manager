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
