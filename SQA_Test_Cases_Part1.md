# TÀI LIỆU KỊCH BẢN KIỂM THỬ - ỨNG DỤNG HỌC TIẾNG ANH (ENGLISHMASTER)

**Dự án:** EnglishMaster - Ứng dụng Học Tiếng Anh  
**Phiên bản:** 1.0  
**Ngày tạo:** 08/05/2026  
**Công nghệ:** Next.js, PostgreSQL (Prisma ORM), Gemini AI  
**Người viết:** Nhóm phát triển

---

## MỤC LỤC

1. Đăng ký tài khoản (Registration)
2. Xác thực email đăng ký (Email Verification - Register)
3. Đăng nhập & Xác thực 2FA (Login & 2FA)
4. Đăng nhập OAuth Google
5. Quên mật khẩu & Đặt lại mật khẩu
6. Đăng xuất
7. Trang chủ & Dashboard
8. Quản lý Hồ sơ cá nhân
9. Bảo mật - Đổi mật khẩu

---

## 1. MODULE ĐĂNG KÝ TÀI KHOẢN

| ID | Mô tả | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| REG-01 | Đăng ký thành công với thông tin hợp lệ | Chưa có tài khoản | 1. Truy cập /register<br>2. Nhập username (5-255 ký tự)<br>3. Nhập email hợp lệ<br>4. Nhập mật khẩu (7-14 ký tự)<br>5. Xác nhận mật khẩu khớp<br>6. Tick "Đồng ý điều khoản"<br>7. Nhấn "Đăng ký ngay" | Hiển thị "Đang gửi mã xác minh...", gọi API POST /api/auth/register/send-code, chuyển hướng đến /verify-register, lưu email vào localStorage | Cao |
| REG-02 | Đăng ký với email đã tồn tại | Email đã đăng ký trước đó | 1. Nhập email đã có trong hệ thống<br>2. Điền các trường hợp lệ khác<br>3. Nhấn "Đăng ký ngay" | API trả về status 400, hiển thị thông báo lỗi "Email đã được sử dụng" (nền đỏ) | Cao |
| REG-03 | Đăng ký với username trùng | Username đã tồn tại trong DB | 1. Nhập username đã có<br>2. Điền email mới, mật khẩu hợp lệ<br>3. Nhấn "Đăng ký ngay" | Hiển thị lỗi "Tên người dùng đã được sử dụng" | Cao |
| REG-04 | Để trống tất cả các trường | Không | 1. Không nhập gì<br>2. Nhấn "Đăng ký ngay" | Hiển thị lỗi client-side: "Vui lòng nhập đầy đủ Tên, Email và Mật khẩu." Không gọi API | Cao |
| REG-05 | Username quá ngắn (< 5 ký tự) | Không | 1. Nhập username "abc"<br>2. Điền các trường khác hợp lệ<br>3. Submit | Lỗi: "Tên người dùng phải từ 5 đến 255 ký tự." | Trung bình |
| REG-06 | Email không hợp lệ (thiếu @) | Không | 1. Nhập email "emailkhonghoiple"<br>2. Submit | Lỗi: "Email không hợp lệ. Ví dụ: ten@gmail.com" | Trung bình |
| REG-07 | Mật khẩu quá ngắn (< 7 ký tự) | Không | 1. Nhập mật khẩu "123456"<br>2. Submit | Lỗi: "Mật khẩu phải từ 7 đến 14 ký tự." | Trung bình |
| REG-08 | Mật khẩu quá dài (> 14 ký tự) | Không | 1. Nhập mật khẩu "123456789012345"<br>2. Submit | Lỗi: "Mật khẩu phải từ 7 đến 14 ký tự." | Trung bình |
| REG-09 | Mật khẩu xác nhận không khớp | Không | 1. Nhập mật khẩu "abcdefg"<br>2. Xác nhận "abcdefh"<br>3. Submit | Lỗi: "Mật khẩu và xác nhận mật khẩu không khớp." | Cao |
| REG-10 | Không tick điều khoản sử dụng | Không | 1. Điền đầy đủ thông tin hợp lệ<br>2. Không tick checkbox "Đồng ý"<br>3. Submit | Lỗi: "Bạn phải đồng ý Điều khoản sử dụng thì mới đăng ký được." | Trung bình |
| REG-11 | Đăng ký bằng Google OAuth | Không | 1. Nhấn nút "Google"<br>2. Chọn tài khoản Google | Redirect tới /api/oauth/google?flow=register, hoàn tất OAuth, tạo user mới trong DB, chuyển hướng vào Dashboard | Cao |
| REG-12 | Hiện/Ẩn mật khẩu | Không | 1. Nhập mật khẩu<br>2. Nhấn icon mắt (Eye/EyeOff) | Input chuyển giữa type="password" và type="text", icon đổi tương ứng | Thấp |

---

## 2. MODULE XÁC THỰC EMAIL ĐĂNG KÝ

| ID | Mô tả | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| VER-01 | Xác thực email với mã OTP đúng | Đã gửi mã OTP qua email | 1. Vào /verify-register<br>2. Nhập mã 6 chữ số đúng<br>3. Submit | API POST /api/auth/register/verify trả 200, tạo user mới với emailVerifiedAt != null, chuyển hướng /login | Cao |
| VER-02 | Nhập mã OTP sai | Đã gửi mã OTP | 1. Nhập mã sai<br>2. Submit | Hiển thị lỗi "Mã xác thực không đúng hoặc đã hết hạn" | Cao |
| VER-03 | Mã OTP hết hạn (> 10 phút) | Mã đã gửi > 10 phút trước | 1. Nhập mã cũ<br>2. Submit | Lỗi: Token hết hạn, yêu cầu gửi lại mã mới | Cao |
| VER-04 | Gửi lại mã OTP | Đang ở trang verify | 1. Nhấn "Gửi lại mã"<br>2. Kiểm tra email | API POST /api/auth/register/resend-code, mã mới được gửi qua email, mã cũ bị vô hiệu | Trung bình |
| VER-05 | Gửi lại mã quá nhanh (cooldown 60s) | Vừa gửi mã < 60s | 1. Nhấn "Gửi lại mã" ngay lập tức | API trả 429: "Vui lòng đợi Xs rồi hãy gửi lại mã." | Trung bình |

---

## 3. MODULE ĐĂNG NHẬP & XÁC THỰC 2FA

| ID | Mô tả | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| LOGIN-01 | Đăng nhập thành công (email + password + 2FA) | Tài khoản đã xác thực email | 1. Vào /login<br>2. Nhập email đúng<br>3. Nhập mật khẩu đúng<br>4. Nhấn "Đăng nhập" | API trả status "2fa_required", chuyển hướng đến /verify-login, gửi mã 6 số qua email | Cao |
| LOGIN-02 | Xác thực 2FA thành công | Đã nhận mã 2FA qua email | 1. Vào /verify-login<br>2. Nhập mã OTP đúng<br>3. Submit | Tạo JWT session cookie, chuyển hướng vào /home | Cao |
| LOGIN-03 | Đăng nhập bằng username thay vì email | Tài khoản đã tạo | 1. Nhập username (không chứa @)<br>2. Nhập mật khẩu đúng<br>3. Submit | API nhận diện là username (không có @), tìm user theo username, gửi mã 2FA | Cao |
| LOGIN-04 | Sai mật khẩu | Tài khoản đã tạo | 1. Nhập email đúng<br>2. Nhập mật khẩu sai<br>3. Submit | API trả 400: "Sai email/tên người dùng hoặc mật khẩu." (dùng bcrypt.compare) | Cao |
| LOGIN-05 | Email không tồn tại | Không | 1. Nhập email chưa đăng ký<br>2. Submit | Lỗi 400: "Sai email/tên người dùng hoặc mật khẩu." | Cao |
| LOGIN-06 | Tài khoản chưa xác thực email | Email chưa verify | 1. Nhập email/password đúng<br>2. Submit | Lỗi 400: "Tài khoản chưa xác thực email." (emailVerifiedAt == null) | Cao |
| LOGIN-07 | Để trống email hoặc mật khẩu | Không | 1. Bỏ trống 1 hoặc 2 trường<br>2. Submit | Client-side: "Vui lòng nhập đầy đủ Email/Tên người dùng và Mật khẩu." | Trung bình |
| LOGIN-08 | Gửi mã 2FA quá nhanh (cooldown) | Vừa gửi mã < 60s | 1. Đăng nhập lại ngay | API trả 429: "Vui lòng đợi Xs rồi hãy gửi lại mã." | Trung bình |
| LOGIN-09 | Lỗi gửi email (SMTP fail) | SMTP server không khả dụng | 1. Đăng nhập bình thường | API trả 502: "Không thể gửi mã xác thực.", OTP bị revoke để không block cooldown | Cao |
| LOGIN-10 | Checkbox "Ghi nhớ đăng nhập" | Không | 1. Tick "Ghi nhớ đăng nhập"<br>2. Đăng nhập thành công | Giá trị remember=true được lưu vào localStorage và gửi lên API | Thấp |

---

## 4. MODULE ĐĂNG NHẬP OAUTH GOOGLE

| ID | Mô tả | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| OAUTH-01 | Đăng nhập Google thành công | Có tài khoản Google | 1. Nhấn nút "Google" ở trang Login<br>2. Chọn tài khoản Google<br>3. Cấp quyền | Redirect tới /api/oauth/google, xác thực Google, tạo/cập nhật user (googleSub, oauthProvider), tạo session JWT, chuyển hướng /home | Cao |
| OAUTH-02 | Google OAuth - Người dùng hủy | Không | 1. Nhấn "Google"<br>2. Hủy/đóng popup Google | Quay về trang login, không tạo session | Trung bình |

---

## 5. MODULE QUÊN MẬT KHẨU & ĐẶT LẠI

| ID | Mô tả | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| FORGOT-01 | Gửi mã reset password thành công | Email đã đăng ký | 1. Vào /forgot-password<br>2. Nhập email đúng<br>3. Submit | API POST /api/auth/password/forgot gửi mã OTP (PASSWORD_RESET) qua email, chuyển hướng verify | Cao |
| FORGOT-02 | Email không tồn tại | Không | 1. Nhập email chưa đăng ký<br>2. Submit | Hiển thị lỗi "Email không tồn tại trong hệ thống" | Cao |
| FORGOT-03 | Xác thực mã reset đúng | Đã nhận mã qua email | 1. Nhập mã OTP<br>2. Submit | Mã hợp lệ, cho phép chuyển đến trang nhập mật khẩu mới /reset-password | Cao |
| FORGOT-04 | Đặt lại mật khẩu thành công | Đã xác thực mã reset | 1. Nhập mật khẩu mới (7-14 ký tự)<br>2. Xác nhận mật khẩu<br>3. Submit | API POST /api/auth/password/reset, cập nhật passwordHash mới (bcrypt), chuyển hướng /login | Cao |
| FORGOT-05 | Cooldown gửi lại mã reset | Vừa gửi < 60s | 1. Nhấn "Gửi lại mã" | API POST /api/auth/password/resend-code trả 429 | Trung bình |

---

## 6. MODULE ĐĂNG XUẤT

| ID | Mô tả | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| LOGOUT-01 | Đăng xuất thành công | Đang đăng nhập | 1. Click avatar góc phải<br>2. Chọn "Đăng xuất" | API POST /api/auth/logout, xóa session cookie, dispatch event "auth-changed", redirect /login | Cao |
| LOGOUT-02 | Truy cập trang bảo vệ sau khi đăng xuất | Đã đăng xuất | 1. Truy cập /home trực tiếp | Redirect về /login (API /api/me trả 401) | Cao |

---

## 7. MODULE TRANG CHỦ & DASHBOARD

| ID | Mô tả | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| HOME-01 | Hiển thị thông tin người dùng | Đã đăng nhập | 1. Truy cập /home | API GET /api/me trả về user info, hiển thị displayName, role, avatar trên header | Cao |
| HOME-02 | Hiển thị thống kê học tập (Stats) | Đã đăng nhập | 1. Truy cập /home | API GET /api/stats/home trả về: streakDays, wordsLearned, hoursStudied, dailyGoalPct, weekMinutes[7], todayMin | Cao |
| HOME-03 | Biểu đồ hoạt động 7 ngày | Đã đăng nhập, có dữ liệu | 1. Quan sát mục "Activity This Week" | 7 cột bar chart hiển thị phút học mỗi ngày, cột hôm nay màu xanh blue-600, các cột khác màu slate | Trung bình |
| HOME-04 | Icon ngọn lửa (Flame) sáng khi đã học | Đã hoàn thành bài hôm nay | 1. Hoàn thành 1 bài<br>2. Quay về /home | hasStudiedToday=true, icon Flame có class "text-orange-500 drop-shadow" (sáng), không bị grayscale | Cao |
| HOME-05 | Icon ngọn lửa tắt khi chưa học | Chưa học bài nào hôm nay | 1. Truy cập /home | hasStudiedToday=false, icon Flame có class "text-slate-400 grayscale opacity-80" | Cao |
| HOME-06 | Thanh tiến độ Daily Goal | Đã đăng nhập | 1. Quan sát hero banner | Thanh progress bar hiển thị dailyGoalPct%, text "X / Y phút" | Trung bình |
| HOME-07 | Điều hướng danh sách bài học (scroll) | Đã đăng nhập | 1. Nhấn nút ChevronLeft/Right<br>2. Quan sát carousel bài học | Container scroll mượt mà 320px mỗi lần, hiển thị 4 card (A1, A2, B1, B2) | Thấp |
| HOME-08 | Click vào bài học A1 | Đã đăng nhập | 1. Click card "A1" | Chuyển hướng đến /lessons/a1 | Cao |
| HOME-09 | Responsive - Menu mobile | Đã đăng nhập, màn hình nhỏ | 1. Thu nhỏ màn hình<br>2. Nhấn icon Menu (hamburger) | Hiện menu mobile với đầy đủ nav items: Home, Lessons, Practice, History, Friends, Settings | Trung bình |
| HOME-10 | User menu dropdown | Đã đăng nhập | 1. Click vào avatar/tên<br>2. Quan sát menu | Dropdown hiện 3 mục: "Tài khoản", "Trợ giúp", "Đăng xuất". Click ngoài => đóng menu | Trung bình |

---

## 8. MODULE QUẢN LÝ HỒ SƠ CÁ NHÂN

| ID | Mô tả | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| PROF-01 | Xem thông tin cá nhân | Đã đăng nhập | 1. Vào /profile | Hiển thị đầy đủ: Email, Tên hiển thị, Ngày tạo, Trạng thái xác thực email, Level CEFR, Ngôn ngữ giao diện | Cao |
| PROF-02 | Upload avatar thành công | Đã đăng nhập | 1. Click icon Camera trên avatar<br>2. Chọn file ảnh (image/*)<br>3. Đợi upload | API POST /api/auth/profile/avatar/upload, upload lên Cloudinary, cập nhật avatarUrl trong DB, hiển thị ảnh mới | Cao |
| PROF-03 | Upload file không phải ảnh | Đã đăng nhập | 1. Chọn file .pdf hoặc .txt | Hiển thị lỗi: "Vui lòng chọn file ảnh" (kiểm tra file.type.startsWith("image/")) | Trung bình |
| PROF-04 | Chuyển đổi ngôn ngữ giao diện | Đã đăng nhập | 1. Vào /profile<br>2. Đổi dropdown "Ngôn ngữ" từ "Tiếng Việt" sang "English" | Toàn bộ giao diện chuyển sang tiếng Anh (sử dụng LanguageProvider context) | Trung bình |
| PROF-05 | Sidebar navigation hoạt động | Đã đăng nhập | 1. Click "Tài khoản" => /profile<br>2. Click "Cài đặt" => mở sub-menu<br>3. Click "Thông báo" => /profile/notifications<br>4. Click "Bảo mật" => /profile/security | Mỗi mục active có highlight màu xanh, chuyển trang đúng | Trung bình |

---

## 9. MODULE BẢO MẬT - ĐỔI MẬT KHẨU

| ID | Mô tả | Tiền điều kiện | Các bước thực hiện | Kết quả mong đợi | Mức độ |
|---|---|---|---|---|---|
| SEC-01 | Đổi mật khẩu thành công | Đã đăng nhập | 1. Vào /profile/security<br>2. Nhập mật khẩu hiện tại đúng<br>3. Nhập mật khẩu mới (7-14 ký tự)<br>4. Xác nhận mật khẩu mới<br>5. Submit | API POST /api/auth/profile/change-password, bcrypt.compare mật khẩu cũ, hash mật khẩu mới, cập nhật DB | Cao |
| SEC-02 | Đổi mật khẩu - Sai mật khẩu hiện tại | Đã đăng nhập | 1. Nhập mật khẩu hiện tại sai<br>2. Submit | Lỗi: "Mật khẩu hiện tại không đúng" | Cao |
| SEC-03 | Đổi mật khẩu - Mật khẩu mới không khớp | Đã đăng nhập | 1. Nhập mật khẩu mới và xác nhận khác nhau<br>2. Submit | Lỗi validation client-side | Trung bình |

---

*Tiếp tục ở file Part 2...*
