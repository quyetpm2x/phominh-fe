import { NAV } from './nav';
import type { ScreenId } from './types';

const FLAT_NAME: Partial<Record<ScreenId, string>> = {};
NAV.forEach((g) => g.items.forEach((it) => (FLAT_NAME[it.id] = it.name)));

// Ported từ `detailed` trong Admin.dc.html (mô tả ngắn dưới tiêu đề trang) + tên/mô tả riêng
// của từng tab G1-G8 (mock lấy page.name/page.desc từ GTABS thay vì tên rút gọn trong nav).
const NAME_OVERRIDE: Partial<Record<ScreenId, string>> = {
  G1: 'Tỉ lệ thấy bài mới',
  G2: 'Sức khỏe nội dung theo khu vực',
  G3: 'Tăng trưởng & kích hoạt',
  G4: 'Giữ chân người dùng',
  G5: 'Tương tác nội dung',
  G7: 'An toàn & kiểm duyệt',
  G8: 'Chi phí vận hành',
};

const DESC: Partial<Record<ScreenId, string>> = {
  A2: 'Số liệu cốt lõi hôm nay và các việc đang chờ xử lý',
  A3: 'Ba vai trò và quyền tương ứng với từng nhóm màn hình',
  B1: 'Danh sách chờ duyệt — xem ảnh gốc và metadata trước khi quyết định',
  C1: 'Tìm theo SĐT, xem số người đang tin tưởng',
  C2: 'Toàn bộ lịch sử hoạt động — dùng khi điều tra nghi vấn',
  C7: 'Tìm người viết thật của bài hoặc bình luận ẩn danh — bắt buộc ghi lý do, mỗi lần tra đều lưu log',
  C8: 'Xem và huỷ phiếu tin tưởng gian lận, xem và thu hồi phiên đăng nhập của 1 người',
  C9: 'Tài khoản đang để số điện thoại làm tên, hiện công khai trong app',
  A5: 'Giới hạn, tắt nhanh tính năng, bản app tối thiểu, mức thưởng, ẩn chủ đề',
  A6: 'Gửi thông báo tới toàn bộ người dùng hoặc 1 khu vực',
  A7: 'Xác thực 2 lớp cho tài khoản admin của bạn',
  B6: 'Tin nhắn bị người nhận báo cáo — nội dung chỉ hiện sau khi ghi lý do',
  A4: 'Mọi thao tác thay đổi dữ liệu của admin, kèm lý do',
  B2: 'Kèm ngữ cảnh bài gốc và người đăng',
  B4: 'Các trường hợp hệ thống tự tạm khoá bình luận do phát hiện tấn công dồn dập',
  C3: 'Cụm tài khoản luôn vote qua lại cho nhau',
  C4: 'Cờ tham khảo, không tự động khoá — admin quyết định thủ công',
  C5: 'Hành động cuối cùng sau khi xem xét C2 đến C4',
  E1: 'Cho khu vực mới thí điểm chưa đủ người dùng',
  E3: 'Quản lý tích hợp nguồn như HSDC Maps',
  F1: 'Cập nhật Điều khoản sử dụng và Chính sách quyền riêng tư',
  F2: 'Nghĩa vụ theo Nghị định 13/2023',
  F3: 'Audit trail phục vụ minh bạch nội bộ và tuân thủ pháp lý',
  E2: 'Bật/tắt khu vực và so sánh hiệu quả giữa các khu',
  G1: 'Một con số phản ánh đúng "mở app biết ngay chuyện quanh mình"',
  G2: 'Quan trọng nhất vì chiến lược mở rộng từng khu một',
  G3: 'Phát hiện điểm rơi trong luồng onboarding 7 màn hình',
  G4: 'Theo cohort, tách riêng từng khu — tín hiệu quyết định có mở khu thứ hai',
  G5: 'Đo mức độ hoạt động thật của bình luận và hệ thống vote',
  G7: 'Đo hiệu quả thực tế của các cơ chế chống lạm dụng đã thiết kế',
  G8: 'Chỉ số sống còn cho mô hình bootstrap đã chốt',
  H1: 'Dữ liệu THẬT từ backend — không phải mock, chờ mở khu mới/liên hệ',
  G10: 'Người dùng hoạt động, uy tín, thưởng, tin nhắn, ẩn danh — số thật tại lúc mở trang',
  J1: 'Toàn bộ bài đăng, sắp xếp theo thời gian đăng mới nhất',
};

export function screenName(id: ScreenId): string {
  return NAME_OVERRIDE[id] ?? FLAT_NAME[id] ?? id;
}

export function screenDesc(id: ScreenId): string {
  return DESC[id] ?? '';
}
