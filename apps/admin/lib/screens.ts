import { PLACEHOLDER_SCREENS } from './mock/placeholders';
import { NAV } from './nav';
import type { ScreenId } from './types';

const FLAT_NAME: Partial<Record<ScreenId, string>> = {};
NAV.forEach((g) => g.items.forEach((it) => (FLAT_NAME[it.id] = it.name)));

// Ported từ `detailed` trong Admin.dc.html (mô tả ngắn dưới tiêu đề trang) + tên/mô tả riêng
// của từng tab G1-G8 (mock lấy page.name/page.desc từ GTABS thay vì tên rút gọn trong nav).
const NAME_OVERRIDE: Partial<Record<ScreenId, string>> = {
  G1: 'Chỉ số Bắc Đẩu',
  G2: 'Sức khỏe nội dung theo khu vực',
  G3: 'Tăng trưởng & kích hoạt',
  G4: 'Giữ chân người dùng',
  G5: 'Tương tác nội dung',
  G6: 'Chỉ số merchant',
  G7: 'An toàn & kiểm duyệt',
  G8: 'Chi phí vận hành',
};

const DESC: Partial<Record<ScreenId, string>> = {
  A2: 'Số liệu cốt lõi hôm nay, 06/08/2026',
  A3: 'Ba vai trò và quyền tương ứng với từng nhóm màn hình',
  B1: 'Danh sách chờ duyệt — xem ảnh gốc và metadata trước khi quyết định',
  B5: 'Ưu tiên cao nhất — báo cáo an ninh, tai nạn đang chờ xác nhận trùng khớp',
  C1: 'Tìm theo SĐT, xem điểm uy tín và lịch sử vi phạm',
  C2: 'Toàn bộ lịch sử hoạt động — dùng khi điều tra nghi vấn',
  C3: 'Kết quả thuật toán graph-based: cụm tài khoản luôn vote qua lại cho nhau',
  D1: 'Duyệt đăng ký mới và theo dõi trạng thái hoạt động',
  E2: 'Bật/tắt khu vực và so sánh hiệu quả giữa các khu',
  G1: 'Một con số phản ánh đúng "mở app biết ngay chuyện quanh mình"',
  G2: 'Quan trọng nhất vì chiến lược mở rộng từng khu một',
  G3: 'Phát hiện điểm rơi trong luồng onboarding 7 màn hình',
  G4: 'Theo cohort, tách riêng từng khu — tín hiệu quyết định có mở khu thứ hai',
  G5: 'Đo mức độ hoạt động thật của bình luận và hệ thống vote',
  G6: 'Merchant là nguồn nội dung mồi cốt lõi — merchant rời bỏ rủi ro hơn user thường rời bỏ',
  G7: 'Đo hiệu quả thực tế của các cơ chế chống lạm dụng đã thiết kế',
  G8: 'Chỉ số sống còn cho mô hình bootstrap đã chốt',
};

export function screenName(id: ScreenId): string {
  return NAME_OVERRIDE[id] ?? FLAT_NAME[id] ?? id;
}

export function screenDesc(id: ScreenId): string {
  return DESC[id] ?? PLACEHOLDER_SCREENS[id]?.desc ?? '';
}
