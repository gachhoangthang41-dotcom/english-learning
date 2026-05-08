# TÀI LIỆU KIỂM THỬ - PHẦN 2: CÁC MODULE CHỨC NĂNG

## 10. MODULE BÀI HỌC (LESSONS)

| ID | Mô tả | Tiền điều kiện | Bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| LES-01 | Xem danh sách bài học theo level | Đã đăng nhập | 1. Vào /lessons<br>2. Chọn level A1 | Hiển thị danh sách bài học A1 từ LESSONS_BY_LEVEL, mỗi bài có title, mô tả | Cao |
| LES-02 | Xem chi tiết bài học | Đã đăng nhập | 1. Click vào 1 bài học | Chuyển đến /lessons/[id], hiển thị nội dung bài: vocabulary, video YouTube | Cao |
| LES-03 | Xem bài học IPA (phát âm) | Đã đăng nhập | 1. Vào /learn/[levelId]/[topicId] | Hiển thị IpaLessonView: Sound bank, Quick tips, Practice deck, nút "Mark complete" | Cao |
| LES-04 | Phát video YouTube trong bài học | Đang xem bài có video | 1. Click Play trên iframe YouTube | Video phát đúng nguồn, không lỗi iframe, hiển thị mượt | Cao |

## 11. MODULE DICTATION & SHADOWING

| ID | Mô tả | Tiền điều kiện | Bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| DICT-01 | Phân đoạn video (Segment) | Đang ở /learn/[level]/[topic]/dictation | 1. Chọn segment từ danh sách | Video seekTo đúng thời gian bắt đầu segment, dừng/lặp ở thời gian kết thúc | Cao |
| DICT-02 | Nhập chính tả (Dictation input) | Đang làm Dictation | 1. Nghe audio<br>2. Gõ câu nghe được<br>3. Submit | So sánh với đáp án: từ đúng bôi xanh, từ sai bôi đỏ, tính điểm accuracy | Cao |
| DICT-03 | Lặp lại đoạn video | Đang xem segment | 1. Video chạy hết segment<br>2. Quan sát hành vi | Video tự động loop lại segment hiện tại (seekTo start khi đạt end) | Cao |
| DICT-04 | Hoàn thành bài và lưu tiến độ | Hoàn thành tất cả segments | 1. Nhấn "Hoàn thành bài"<br>2. Kiểm tra DB | API POST /api/learning/progress: tạo UserExerciseProgress status=COMPLETED, progressPct=100, ghi completedAt | Cao |

## 12. MODULE FLASHCARDS (THẺ TỪ VỰNG)

| ID | Mô tả | Tiền điều kiện | Bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| FLASH-01 | Xem trang tổng quan Flashcards | Đã đăng nhập | 1. Vào /flashcards | Hiển thị 7 bộ thẻ: Saved, Known, Unknown, A1, A2, B1, B2 với gradient cards | Cao |
| FLASH-02 | Xem flashcards theo level A1 | Đã đăng nhập | 1. Click card "A1" | Chuyển /flashcards/a1, hiển thị danh sách từ vựng level A1 dạng thẻ lật | Cao |
| FLASH-03 | Xem flashcards đã lưu (Saved) | Đã lưu từ vựng | 1. Click "Từ đã lưu" | API GET /api/dictionary trả danh sách từ level="SAVED", hiển thị word, meaning, pronunciation | Cao |
| FLASH-04 | Flashcards hiển thị trên Dashboard | Đã đăng nhập | 1. Truy cập /home | Component Flashcards hiển thị bộ từ vựng ngay trên trang chủ | Trung bình |

## 13. MODULE TỪ ĐIỂN (DICTIONARY)

| ID | Mô tả | Tiền điều kiện | Bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| DICT-05 | Lưu từ mới vào từ điển cá nhân | Đã đăng nhập | 1. Gặp từ mới trong bài<br>2. Nhấn "Lưu từ" | API POST /api/dictionary: dịch qua Google Translate API, lấy IPA từ dictionaryapi.dev, lưu LearningProgress level="SAVED" | Cao |
| DICT-06 | Lưu từ đã tồn tại (upsert) | Từ đã lưu trước đó | 1. Lưu lại cùng từ | Prisma upsert: cập nhật meaning/pronunciation mới, không tạo bản ghi trùng | Trung bình |
| DICT-07 | Chỉnh sửa nghĩa từ vựng | Đã lưu từ | 1. Sửa meaning/pronunciation<br>2. Submit | API PUT /api/dictionary cập nhật trường đã sửa trong DB | Trung bình |
| DICT-08 | Lưu từ khi chưa đăng nhập | Chưa đăng nhập | 1. Gọi API POST /api/dictionary | API trả 401: "Unauthorized" | Cao |

## 14. MODULE QUIZ NGỮ PHÁP (TENSES)

| ID | Mô tả | Tiền điều kiện | Bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| QUIZ-01 | Hiển thị câu hỏi Quiz | Đã đăng nhập | 1. Vào /practice/tenses | Hiển thị câu hỏi đầu tiên từ TENSE_QUIZ_QUESTIONS: prompt, 4 options, level badge, tense badge | Cao |
| QUIZ-02 | Chọn đáp án đúng | Đang làm Quiz | 1. Click đáp án đúng | Đáp án bôi xanh (border-emerald-500), hiện icon CheckCircle2, hiện explanation "Correct" | Cao |
| QUIZ-03 | Chọn đáp án sai | Đang làm Quiz | 1. Click đáp án sai | Đáp án chọn bôi đỏ (border-red-500, XCircle), đáp án đúng bôi xanh, hiện "Review this tense" + explanation | Cao |
| QUIZ-04 | Chuyển câu hỏi tiếp theo | Đã trả lời câu hiện tại | 1. Nhấn "Next question" | currentIndex tăng 1, hiển thị câu tiếp theo, progress bar cập nhật | Cao |
| QUIZ-05 | Nút Next bị disable ở câu cuối | Đang ở câu cuối cùng | 1. Quan sát nút "Next question" | Nút bị disabled (opacity-50, cursor-not-allowed) | Trung bình |
| QUIZ-06 | Thanh tiến độ (progress bar) | Đang làm Quiz | 1. Trả lời 5/10 câu | Progress bar hiển thị 50% width, cập nhật theo completedCount/total | Trung bình |
| QUIZ-07 | Bảng điểm (Score panel) | Đang làm Quiz | 1. Trả lời đúng 3 câu | Panel bên phải hiển thị "3" với icon Trophy | Trung bình |
| QUIZ-08 | Question Map navigation | Đang làm Quiz | 1. Click ô số 5 trong Question Map | Nhảy đến câu hỏi số 5, ô hiện tại có ring-2 ring-blue-500 | Trung bình |
| QUIZ-09 | Question Map màu sắc | Đã trả lời một số câu | 1. Quan sát Question Map | Câu đúng: emerald, câu sai: red, chưa trả lời: secondary (xám) | Thấp |
| QUIZ-10 | Reset Quiz | Đã trả lời một số câu | 1. Nhấn "Reset quiz" | answers={}, currentIndex=0, score=0, tất cả ô Question Map trở về xám | Cao |

## 15. MODULE TRỢ LÝ AI (CHATBOT)

| ID | Mô tả | Tiền điều kiện | Bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| AI-01 | Gửi câu hỏi cho AI | Đã đăng nhập, có mạng | 1. Mở chatbot<br>2. Nhập "Explain Present Perfect"<br>3. Nhấn Gửi | API POST /api/ai-assistant: gửi message tới External AI API, nhận response text, hiển thị trên UI | Cao |
| AI-02 | AI phản hồi thành công | Sau AI-01 | 1. Đợi phản hồi | Chatbot hiển thị nội dung trả lời từ AI, format rõ ràng | Cao |
| AI-03 | Gửi tin nhắn quá dài (> 1000 ký tự) | Không | 1. Nhập text > 1000 ký tự<br>2. Gửi | Hệ thống tự truncate bằng buildExternalPrompt(), gửi prompt <= 1000 chars | Trung bình |
| AI-04 | API AI không cấu hình | Thiếu env vars | 1. Gửi tin nhắn | API trả 500: "AI tutor API is not configured." | Cao |
| AI-05 | Server AI offline (Cloudflare Tunnel) | Tunnel không hoạt động | 1. Gửi tin nhắn | API trả 502: "Server AI hiện không online. Cloudflare Tunnel chưa hoạt động..." | Cao |
| AI-06 | Lỗi kết nối fetch failed | Mất mạng | 1. Gửi tin nhắn | API trả 502: "Không thể kết nối tới server AI bên ngoài." App không crash | Cao |
| AI-07 | AI trả về response rỗng | API upstream trả empty | 1. Gửi tin nhắn | API trả 502: "External AI API returned an empty response." | Trung bình |
| AI-08 | Gửi feedback (like/dislike) | Đã nhận phản hồi AI | 1. Nhấn nút Like/Dislike | API POST /api/ai-feedback: lưu AiFeedback vào DB, forward tới external feedback URL | Trung bình |

## 16. MODULE LỊCH SỬ HỌC TẬP

| ID | Mô tả | Tiền điều kiện | Bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| HIST-01 | Xem lịch sử bài đã hoàn thành | Đã hoàn thành ít nhất 1 bài | 1. Vào /history | API GET /api/learning/history, hiển thị danh sách: tên bài, level, % hoàn thành, thời gian, ngày | Cao |
| HIST-02 | Lịch sử trống | Chưa hoàn thành bài nào | 1. Vào /history | Hiển thị empty state: icon 📝, "Chưa có lịch sử", nút "Về Trang Chủ" | Trung bình |
| HIST-03 | Ôn tập lại bài từ lịch sử | Có lịch sử | 1. Nhấn "Ôn tập chữ" | Chuyển đến /learn/[level]/[topicId] | Trung bình |
| HIST-04 | Làm lại Shadowing từ lịch sử | Có lịch sử | 1. Nhấn "Shadowing" | Chuyển đến /learn/[level]/[topicId]/dictation | Trung bình |
| HIST-05 | Màu sắc theo tiến độ | Có lịch sử | 1. Quan sát badge % | >=80%: emerald, >=50%: yellow, <50%: red | Thấp |

## 17. MODULE GHI NHẬN TỪ ĐÃ HỌC

| ID | Mô tả | Tiền điều kiện | Bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| LEARN-01 | Ghi nhận từ mới đã học | Đã đăng nhập, đang học | 1. Học từ mới trong bài<br>2. Nhấn "Đã học" | API POST /api/learning/record: tạo LearningProgress, increment learnedWordsCount +1 | Cao |
| LEARN-02 | Ghi nhận từ đã học trước đó | Từ đã learned | 1. Học lại cùng từ | API kiểm tra existing (userId_level_wordId unique), không tạo trùng, không increment count | Cao |
| LEARN-03 | Ghi nhận khi chưa đăng nhập | Chưa đăng nhập | 1. Gọi API POST /api/learning/record | Trả 401: "Unauthenticated - no token" | Cao |
| LEARN-04 | User không tồn tại trong DB | Token hợp lệ nhưng user bị xóa | 1. Gọi API | Trả 404: "User not found" | Trung bình |

## 18. MODULE CỘNG ĐỒNG (FRIENDS)

| ID | Mô tả | Tiền điều kiện | Bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| FRIEND-01 | Xem danh sách người dùng | Đã đăng nhập | 1. Vào /friends | API GET /api/friends: trả danh sách users (trừ current user), sắp xếp theo learnedWordsCount DESC, max 50 | Cao |
| FRIEND-02 | Tìm kiếm bạn bè | Đã đăng nhập | 1. Gõ tên vào ô tìm kiếm | Client-side filter: lọc theo displayName/username chứa searchTerm (case-insensitive) | Cao |
| FRIEND-03 | Không tìm thấy kết quả | Đã đăng nhập | 1. Gõ tên không tồn tại | Hiển thị empty state: "Không tìm thấy người dùng" | Trung bình |
| FRIEND-04 | Nhấn "Kết bạn" | Đã đăng nhập | 1. Nhấn "Kết bạn" trên card user | Hiển thị alert "Đã gửi lời mời!" | Thấp |
| FRIEND-05 | Hiển thị thông tin user card | Có users | 1. Quan sát card | Avatar (hoặc chữ cái đầu), displayName, @username, badge level, số từ đã học | Trung bình |

## 19. MODULE THÔNG BÁO & NHẮC NHỞ

| ID | Mô tả | Tiền điều kiện | Bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| NOTI-01 | Bật/Tắt nhắc nhở học tập | Đã đăng nhập | 1. Vào /profile/notifications<br>2. Toggle "Nhắc nhở học tập" | API POST /api/auth/profile/update-notifications: cập nhật practiceRemindersEnabled trong DB | Cao |
| NOTI-02 | Đặt giờ Smart Reminder | Toggle đang ON | 1. Chọn giờ (VD: 20:00)<br>2. Blur input (tự lưu) | API cập nhật smartReminderTime="20:00" cho user | Cao |
| NOTI-03 | Tự động tạo notification nhắc nhở | Chưa học hôm nay, đã qua giờ reminder | 1. GET /api/notifications được gọi | Kiểm tra: practiceRemindersEnabled=true, chưa COMPLETED hôm nay, chưa có DAILY_REMINDER hôm nay, giờ hiện tại >= smartReminderTime => tạo Notification mới | Cao |
| NOTI-04 | Không tạo nhắc nhở nếu đã học | Đã hoàn thành bài hôm nay | 1. GET /api/notifications | hasCompletedToday=true => KHÔNG tạo notification nhắc nhở | Cao |
| NOTI-05 | Không tạo nhắc nhở trùng (max 1/ngày) | Đã có DAILY_REMINDER hôm nay | 1. GET /api/notifications lần 2 | remindersToday.length > 0 => bỏ qua, không tạo thêm | Cao |
| NOTI-06 | Gửi Push Notification (mobile) | User-Agent là mobile | 1. Trigger notification | Gửi webpush.sendNotification tới PushSubscription endpoints | Cao |
| NOTI-07 | Gửi Email Notification (desktop) | User-Agent là desktop | 1. Trigger notification | Gửi email qua sendEmail() với nội dung nhắc nhở | Cao |
| NOTI-08 | Đánh dấu đã đọc thông báo | Có thông báo chưa đọc | 1. Click thông báo | API PUT /api/notifications: cập nhật isRead=true cho ids[] | Trung bình |
| NOTI-09 | Bật Web Push Permission | Trình duyệt chưa cấp quyền | 1. Nhấn "Bật Thông Báo"<br>2. Chấp nhận permission | Notification.requestPermission() => "granted", subscribe PushManager, POST /api/notifications/push-subscription | Cao |
| NOTI-10 | Từ chối Push Permission | Không | 1. Nhấn "Bật Thông Báo"<br>2. Từ chối | Hiển thị lỗi "Bạn đã từ chối cấp quyền thông báo", hướng dẫn mở lại trong settings | Trung bình |

## 20. MODULE STREAK & GAMIFICATION

| ID | Mô tả | Tiền điều kiện | Bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| STRK-01 | Tính streak liên tiếp | Học 3 ngày liên tiếp | 1. GET /api/stats/home | Algorithm: loop ngược từ hôm nay, đếm ngày liên tiếp có dailyCompleted[key]=true => streakDays=3 | Cao |
| STRK-02 | Streak bị reset khi nghỉ 1 ngày | Hôm qua không học | 1. GET /api/stats/home | Ngày hôm qua không có COMPLETED => break loop => streakDays=0 (hoặc chỉ tính từ hôm nay) | Cao |
| STRK-03 | Học 2 bài cùng ngày không tăng streak | Streak đã +1 hôm nay | 1. Hoàn thành bài thứ 2<br>2. Kiểm tra streak | streakDays giữ nguyên (đếm theo ngày, không theo số bài) | Trung bình |
| STRK-04 | Thống kê wordsLearned | Đã học từ | 1. GET /api/stats/home | Trả về learnedWordsCount từ User model, fallback count LearningProgress | Trung bình |
| STRK-05 | Thống kê hoursStudied | Có dữ liệu 7 ngày | 1. GET /api/stats/home | Tổng weekMinutes / 60, làm tròn 1 chữ số thập phân | Trung bình |

## 21. MODULE PHÁT ÂM (PRONUNCIATION)

| ID | Mô tả | Tiền điều kiện | Bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| PRON-01 | Nghe phát âm từ (GET) | Không | 1. GET /api/pronunciation?text=hello | Forward tới upstream Pronunciation API, trả về audio stream hoặc JSON | Cao |
| PRON-02 | Nghe phát âm từ (POST) | Không | 1. POST /api/pronunciation {text:"hello"} | Forward tới upstream, trả audio/octet-stream hoặc JSON | Cao |
| PRON-03 | Text rỗng | Không | 1. GET /api/pronunciation?text= | Trả 400: "Missing 'text' query param" | Trung bình |
| PRON-04 | Upstream API lỗi | API phát âm offline | 1. Gọi API | Trả 502: "Upstream error" kèm upstreamStatus | Trung bình |
| PRON-05 | Kiểm tra phát âm (Check) | Không | 1. POST /api/pronunciation/check | Forward audio tới upstream để chấm điểm phát âm | Trung bình |

## 22. MODULE HỘI THOẠI AI (CONVERSATIONS)

| ID | Mô tả | Tiền điều kiện | Bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| CONV-01 | Lấy cuộc trò chuyện theo sessionId | Có cuộc trò chuyện | 1. GET /api/conversations?sessionId=xxx | Trả về ChatConversation matching sessionId | Cao |
| CONV-02 | Lưu cuộc trò chuyện mới | Đang chat | 1. POST /api/conversations {sessionId, userId, messages, title} | Tạo ChatConversation mới trong DB | Cao |
| CONV-03 | Cập nhật cuộc trò chuyện | sessionId đã tồn tại | 1. POST /api/conversations (cùng sessionId) | Update messages và title cho conversation hiện có | Trung bình |
| CONV-04 | Xóa cuộc trò chuyện | Có conversation | 1. DELETE /api/conversations?sessionId=xxx | Xóa ChatConversation khỏi DB, trả về record đã xóa | Trung bình |
| CONV-05 | Xóa không tìm thấy | sessionId không tồn tại | 1. DELETE /api/conversations?sessionId=invalid | Trả 404: "Not found" | Trung bình |
| CONV-06 | Thiếu tham số | Không | 1. GET /api/conversations (không params) | Trả 400: "sessionId or userId required" | Trung bình |

## 23. KIỂM THỬ PHI CHỨC NĂNG

| ID | Mô tả | Bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|
| NFR-01 | Responsive Design - Mobile | 1. Truy cập trên điện thoại (375px) | Layout tự động co giãn, không bị tràn ngang, menu hamburger hoạt động | Cao |
| NFR-02 | Responsive Design - Tablet | 1. Truy cập trên tablet (768px) | Grid layout chuyển từ 1 cột sang 2 cột phù hợp | Trung bình |
| NFR-03 | Dark Mode | 1. Toggle nút ThemeToggle | Toàn bộ giao diện chuyển dark theme, text đọc được, contrast đủ | Cao |
| NFR-04 | Light Mode | 1. Toggle về light | Giao diện trở về sáng, không có element bị "invisible" | Cao |
| NFR-05 | Đa ngôn ngữ (i18n) | 1. Đổi ngôn ngữ VI ↔ EN | Tất cả text UI chuyển đổi đúng qua useLanguage() hook | Trung bình |
| NFR-06 | Bảo mật - Unauthorized access | 1. Truy cập /home khi chưa đăng nhập | Redirect về /login, API trả 401 | Cao |
| NFR-07 | Bảo mật - JWT hết hạn | 1. Để session hết hạn<br>2. Thao tác | API trả 401, redirect /login | Cao |
| NFR-08 | Hiệu năng - Tải trang chủ | 1. Đo thời gian load /home | Trang load hoàn chỉnh < 3 giây (bao gồm API calls) | Trung bình |
| NFR-09 | Xử lý lỗi server | 1. Gây lỗi 500 | Hiển thị thông báo lỗi thân thiện, không crash trắng màn hình | Cao |
| NFR-10 | Mật khẩu được mã hóa | 1. Kiểm tra DB | passwordHash lưu bcrypt hash, không lưu plaintext | Cao |

---

## TỔNG KẾT

| Module | Số Test Case | Cao | Trung bình | Thấp |
|---|---|---|---|---|
| Đăng ký | 12 | 5 | 6 | 1 |
| Xác thực Email | 5 | 3 | 2 | 0 |
| Đăng nhập & 2FA | 10 | 6 | 3 | 1 |
| OAuth Google | 2 | 1 | 1 | 0 |
| Quên mật khẩu | 5 | 3 | 2 | 0 |
| Đăng xuất | 2 | 2 | 0 | 0 |
| Dashboard | 10 | 4 | 4 | 2 |
| Hồ sơ cá nhân | 5 | 2 | 3 | 0 |
| Bảo mật | 3 | 2 | 1 | 0 |
| Bài học | 4 | 4 | 0 | 0 |
| Dictation/Shadowing | 4 | 4 | 0 | 0 |
| Flashcards | 4 | 2 | 2 | 0 |
| Từ điển | 4 | 2 | 2 | 0 |
| Quiz Ngữ pháp | 10 | 3 | 5 | 2 |
| AI Chatbot | 8 | 4 | 4 | 0 |
| Lịch sử | 5 | 1 | 3 | 1 |
| Ghi nhận từ | 4 | 3 | 1 | 0 |
| Cộng đồng | 5 | 1 | 3 | 1 |
| Thông báo | 10 | 6 | 4 | 0 |
| Streak | 5 | 2 | 3 | 0 |
| Phát âm | 5 | 1 | 4 | 0 |
| Hội thoại AI | 6 | 1 | 5 | 0 |
| Phi chức năng | 10 | 5 | 4 | 1 |
| **TỔNG** | **136** | **67** | **62** | **9** |

---
*Tài liệu này phục vụ cho báo cáo môn Kiểm thử Phần mềm (Software Testing).*
