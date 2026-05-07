# 📋 Hướng dẫn Frontend: Kết nối `user_id` với Backend

> **Tài liệu này dành cho nhóm Frontend (Next.js)**
> Backend đã sẵn sàng nhận `user_id` từ NextAuth session. Frontend chỉ cần gửi thêm field `user_id` trong body của mọi API request.

---

## 1. Thông tin kết nối

| Thông tin | Giá trị |
|---|---|
| Backend URL | URL Cloudflare Tunnel (thay đổi mỗi lần chạy `start_cloudflare.bat`) |
| API Key | Gửi qua header `X-API-Key` |
| user_id | Lấy từ `session.user.id` (NextAuth) |
| Format user_id | CUID từ bảng `User` (ví dụ: `cmkuxnusu0...`) |

---

## 2. Nguyên tắc cốt lõi

**Mọi request API gửi đến backend đều phải có `user_id` trong body JSON:**

```json
{
  "message": "hello",
  "user_id": "cmkuxnusu0abc123..."
}
```

- Nếu **chưa đăng nhập**: gửi `user_id: "anonymous"` hoặc bỏ trống (backend sẽ tự fallback theo IP)
- Nếu **đã đăng nhập**: gửi `user_id: session.user.id` (CUID từ bảng User)

---

## 3. Tạo API Helper (khuyến nghị)

Tạo file `lib/api.ts` hoặc `utils/api.ts` để tập trung logic gọi API:

```typescript
// lib/api.ts
import { getSession } from "next-auth/react";

// URL Backend - cập nhật khi chạy Cloudflare Tunnel mới
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://xxx.trycloudflare.com";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "viet-tutor-secret-key-2024";

/**
 * Lấy user_id từ NextAuth session.
 * Trả về CUID id từ bảng User trong database frontend.
 */
async function getUserId(): Promise<string> {
  const session = await getSession();
  if (session?.user) {
    // Ưu tiên dùng id (CUID), fallback về email
    return (session.user as any).id || session.user.email || "anonymous";
  }
  return "anonymous";
}

/**
 * Gọi API backend với user_id tự động.
 */
export async function callBackendAPI(
  endpoint: string,
  body: Record<string, any>,
  method: string = "POST"
): Promise<any> {
  const userId = await getUserId();

  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: JSON.stringify({
      ...body,
      user_id: userId,  // <-- Tự động gắn user_id vào mọi request
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message || `API error: ${response.status}`);
  }

  return response.json();
}
```

---

## 4. Sử dụng trong từng chức năng

### 4.1 Chat (gửi tin nhắn)

```typescript
// Trước đây (KHÔNG có user_id):
const res = await fetch(`${BACKEND_URL}/api/v1/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-API-Key": API_KEY },
  body: JSON.stringify({ message: userMessage }),
});

// ✅ Sau khi sửa (CÓ user_id):
import { callBackendAPI } from "@/lib/api";

const res = await callBackendAPI("/api/v1/chat", {
  message: userMessage,
});
// user_id được tự động gắn bởi callBackendAPI
```

### 4.2 Feedback (like/dislike)

```typescript
const res = await callBackendAPI("/api/v1/feedback", {
  query: originalQuestion,
  response: aiAnswer,
  score: 1,         // 1 = like, 0 = dislike
  feedback_type: "explicit_command",
  // user_id tự động gắn
});
```

### 4.3 Fill Blank (tạo bài tập đục lỗ)

```typescript
// Tạo bài tập
const exercise = await callBackendAPI("/api/v1/exercise/fill_blank", {
  sentence: "She goes to school every day",
});

// Nộp đáp án
const result = await callBackendAPI("/api/v1/exercise/fill_blank/submit", {
  exercise_id: exercise.exercise_id,
  answers: ["goes", "to"],
});
```

### 4.4 Dictation (bài nghe chép chính tả)

```typescript
const result = await callBackendAPI("/api/v1/exercise/dictation/submit", {
  exercise_id: "dict_001",
  original_text: "She goes to school every day",
  user_input: "She gos to school every day",
});
```

### 4.5 Xem tiến độ học tập

```typescript
import { getSession } from "next-auth/react";

const session = await getSession();
const userId = (session?.user as any)?.id;

const res = await fetch(
  `${BACKEND_URL}/api/v1/user/${userId}/progress`,
  {
    headers: { "X-API-Key": API_KEY },
  }
);
const progress = await res.json();
```

### 4.6 Báo cáo Dictation theo tuần

```typescript
const res = await fetch(
  `${BACKEND_URL}/api/v1/user/${userId}/dictation-report?days=7`,
  {
    headers: { "X-API-Key": API_KEY },
  }
);
```

---

## 5. Xác minh kết nối (Test Endpoint)

Backend có endpoint test để frontend kiểm tra:

```typescript
// Gọi verify endpoint để kiểm tra backend nhận user_id đúng
const res = await fetch(
  `${BACKEND_URL}/api/v1/auth/verify?user_id=${userId}`,
  {
    headers: { "X-API-Key": API_KEY },
  }
);
const data = await res.json();
console.log(data);
// {
//   "status": "ok",
//   "resolved_user_id": "cmkuxnusu0abc123...",
//   "has_explicit_user_id": true,
//   "cloudflare_ip": "1.2.3.4",
//   "message": "Backend is ready to receive user_id from frontend NextAuth session."
// }
```

---

## 6. Cấu hình Environment Variables

Thêm vào file `.env.local` của frontend:

```env
# URL Backend (cập nhật mỗi lần chạy Cloudflare Tunnel mới)
NEXT_PUBLIC_BACKEND_URL=https://xxx-yyy-zzz.trycloudflare.com

# API Key để xác thực với backend
NEXT_PUBLIC_API_KEY=viet-tutor-secret-key-2024
```

> ⚠️ **Lưu ý:** URL Cloudflare Tunnel thay đổi mỗi lần chạy `start_cloudflare.bat`. Sau mỗi lần backend restart tunnel, cần cập nhật `NEXT_PUBLIC_BACKEND_URL` trong `.env.local` và restart dev server.

---

## 7. Cấu hình NextAuth để expose `user.id`

Nếu `session.user` chưa có field `id`, cần cập nhật NextAuth config:

```typescript
// pages/api/auth/[...nextauth].ts hoặc app/api/auth/[...nextauth]/route.ts

export const authOptions: NextAuthOptions = {
  // ... providers ...
  callbacks: {
    async session({ session, user, token }) {
      // Gắn user.id vào session để frontend đọc được
      if (session.user) {
        (session.user as any).id = user?.id || token?.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};
```

---

## 8. Danh sách endpoint cần cập nhật

| Endpoint | Method | Có `user_id` trong body? | Ghi chú |
|---|---|---|---|
| `/api/v1/chat` | POST | ✅ Thêm `user_id` | Chat chính |
| `/api/chat` | POST | ✅ Thêm `user_id` | Chat tương thích |
| `/api/v1/chat/stream` | POST | ✅ Thêm `user_id` | Chat SSE streaming |
| `/api/v1/feedback` | POST | ✅ Thêm `user_id` | Like/dislike |
| `/api/v1/exercise/fill_blank` | POST | ✅ Thêm `user_id` | Tạo bài đục lỗ |
| `/api/v1/exercise/fill_blank/submit` | POST | ✅ Thêm `user_id` | Nộp đáp án |
| `/api/v1/exercise/dictation/submit` | POST | ✅ Đã bắt buộc | Bài nghe chép |
| `/api/v1/user/{user_id}/progress` | GET | ⬅️ Trong URL path | Xem tiến độ |
| `/api/v1/user/{user_id}/dictation-report` | GET | ⬅️ Trong URL path | Báo cáo dictation |
| `/api/v1/auth/verify` | GET | ⬅️ Query param `?user_id=` | Test kết nối |

---

## 9. Checklist cho Frontend

- [ ] Tạo file `lib/api.ts` với helper `callBackendAPI()`
- [ ] Cập nhật NextAuth config để expose `user.id` trong session
- [ ] Cập nhật `.env.local` với `NEXT_PUBLIC_BACKEND_URL` và `NEXT_PUBLIC_API_KEY`
- [ ] Cập nhật tất cả API call để gửi `user_id` trong body
- [ ] Test với endpoint `/api/v1/auth/verify` để xác nhận backend nhận đúng user_id
- [ ] Kiểm tra chat, feedback, bài tập hoạt động bình thường

---

> **Câu hỏi?** Liên hệ nhóm backend hoặc kiểm tra API docs tại `https://<tunnel-url>/docs`
