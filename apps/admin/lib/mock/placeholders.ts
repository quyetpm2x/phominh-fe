import type { ScreenId } from '../types';

export interface PlaceholderScreen {
  name: string;
  desc: string;
  spec: string;
  parts: string[];
}

// Ported từ PAGES trong Admin.dc.html — 10 màn hình mock gốc chỉ mô tả bằng spec, chưa thiết
// kế UI thật. Giữ nguyên fidelity của mock: render 1 card mô tả thay vì bịa UI.
export const PLACEHOLDER_SCREENS: Partial<Record<ScreenId, PlaceholderScreen>> = {
  B2: {
    name: 'Hàng đợi report bình luận',
    desc: 'Kèm ngữ cảnh bài gốc và người đăng',
    spec: 'Cùng cơ chế duyệt như B1 nhưng đối tượng là bình luận công khai. Điểm khác biệt bắt buộc: mỗi bình luận luôn hiển thị kèm ngữ cảnh để admin không phán xét câu chữ tách rời.',
    parts: [
      'Bình luận bị report, hiển thị nguyên văn',
      'Ngữ cảnh: bài gốc là gì, ai đăng, các bình luận liền trước',
      'Hồ sơ rút gọn người bình luận: điểm uy tín, số vi phạm',
      'Hành động: giữ / ẩn bình luận / cảnh cáo / khóa bình luận của người này ở bài',
    ],
  },
  B3: {
    name: 'Bình luận riêng tư bị report',
    desc: 'Nội dung chỉ chủ bài và admin thấy được — trang riêng, không lẫn vào B2',
    spec: 'Bình luận riêng tư chỉ hiển thị cho chủ bài, nhưng nội dung vẫn được log phía server. Khi bị report, admin cần xem lại trong một không gian tách biệt vì mức độ nhạy cảm cao hơn hẳn bình luận công khai.',
    parts: [
      'Cảnh báo nhạy cảm trước khi mở nội dung, mỗi lần mở đều ghi vào audit trail F3',
      'Nội dung bình luận riêng tư + bài gốc liên quan',
      'Hành động: gỡ, cảnh cáo, khóa tính năng bình luận riêng tư của tài khoản',
      'Đối chiếu tần suất: người này gửi bao nhiêu bình luận riêng tư trong 7 ngày',
    ],
  },
  B4: {
    name: 'Theo dõi cụm tấn công tự động',
    desc: 'Các trường hợp hệ thống tự tạm khóa bình luận do phát hiện tấn công dồn dập',
    spec: 'Hệ thống tự động tạm khóa bình luận khi phát hiện nhiều tài khoản dồn vào một bài trong thời gian ngắn. Trang này để admin xem lại quyết định của máy và chốt hướng xử lý.',
    parts: [
      'Danh sách bài đang bị tạm khóa bình luận, kèm thời điểm và số tài khoản liên quan',
      'Biểu đồ mật độ bình luận theo phút để nhìn ra đợt dồn',
      'Danh sách tài khoản tham gia, tuổi tài khoản và điểm uy tín',
      'Quyết định: mở khóa / giữ nguyên / xử lý người liên quan',
    ],
  },
  C4: {
    name: 'Tín hiệu gian lận tổng hợp',
    desc: 'Cờ tham khảo, không tự động khóa — admin quyết định thủ công',
    spec: 'Bảng tổng hợp các tín hiệu phụ giúp admin nhận ra hành vi bất thường. Các tín hiệu này chỉ là cờ tham khảo, hệ thống không tự động khóa tài khoản dựa trên chúng.',
    parts: [
      'Nhiều tài khoản cùng một thiết bị',
      'Tốc độ tạo tài khoản bất thường trong một khoảng thời gian ngắn',
      'IP trùng lặp giữa các tài khoản có tương tác vote với nhau',
      'Mỗi dòng dẫn thẳng sang C2 để điều tra đầy đủ trước khi ra quyết định',
    ],
  },
  C5: {
    name: 'Khóa / mở khóa tài khoản',
    desc: 'Hành động cuối cùng sau khi xem xét C2 đến C4',
    spec: 'Trang thực thi. Mọi lệnh khóa đều yêu cầu chọn lý do và dẫn chiếu tới bằng chứng đã xem ở C2, C3 hoặc C4.',
    parts: [
      'Ô nhập SĐT hoặc mã tài khoản',
      'Bắt buộc chọn lý do và đính kèm dẫn chiếu bằng chứng',
      'Chọn thời hạn: 7 ngày, 30 ngày, vĩnh viễn',
      'Lịch sử khóa/mở khóa của tài khoản, ai thao tác, khi nào',
    ],
  },
  E1: {
    name: 'Đăng bài mồi thủ công',
    desc: 'Cho khu vực mới thí điểm chưa đủ người dùng',
    spec: 'Khi một khu mới mở mà chưa đủ người dùng, feed sẽ trống. Admin tự đăng nội dung ban đầu để khu đó có gì để xem trong những ngày đầu.',
    parts: [
      'Chọn khu vực và vị trí đặt bài trên bản đồ',
      'Soạn nội dung, đính ảnh, chọn loại bài: đời sống / khẩn cấp',
      'Đặt lịch đăng rải trong ngày thay vì dồn một lúc',
      'Đánh dấu nội bộ là bài mồi để tách khỏi số liệu bài đăng của người dùng thật',
    ],
  },
  E3: {
    name: 'Cấu hình lớp dữ liệu chính thống',
    desc: 'Quản lý tích hợp nguồn như HSDC Maps',
    spec: 'Lớp dữ liệu đã xác thực được hiển thị tách biệt với lớp nội dung cộng đồng, để người dùng luôn phân biệt được đâu là thông tin chính thống.',
    parts: [
      'Danh sách nguồn tích hợp, trạng thái kết nối và lần đồng bộ gần nhất',
      'Bật/tắt hiển thị lớp đã xác thực theo từng khu vực',
      'Cấu hình cách hiển thị phân biệt với lớp cộng đồng',
    ],
  },
  F1: {
    name: 'Quản lý điều khoản & chính sách',
    desc: 'Cập nhật Điều khoản sử dụng và Chính sách quyền riêng tư',
    spec: 'Nội dung pháp lý được quản lý theo phiên bản. Khi có thay đổi đáng kể, người dùng được thông báo và cần xác nhận lại ở lần mở app kế tiếp.',
    parts: [
      'Trình soạn thảo nội dung, lưu theo phiên bản kèm ngày hiệu lực',
      'So sánh khác biệt giữa hai phiên bản',
      'Bật yêu cầu người dùng xác nhận lại khi thay đổi đáng kể',
    ],
  },
  F2: {
    name: 'Yêu cầu xóa dữ liệu',
    desc: 'Nghĩa vụ theo Nghị định 13/2023',
    spec: 'Xử lý yêu cầu của người dùng muốn xóa tài khoản và dữ liệu cá nhân, theo đúng nghĩa vụ tại Nghị định 13/2023.',
    parts: [
      'Hàng đợi yêu cầu kèm hạn xử lý còn lại theo quy định',
      'Phạm vi dữ liệu sẽ xóa và phần buộc phải lưu giữ, kèm căn cứ pháp lý',
      'Xác nhận hai bước trước khi thực thi, xuất biên bản xử lý',
    ],
  },
  F3: {
    name: 'Log truy cập dữ liệu nhạy cảm',
    desc: 'Audit trail phục vụ minh bạch nội bộ và tuân thủ pháp lý',
    spec: 'Ghi lại việc ai trong đội ngũ đã truy vấn dữ liệu vị trí hoặc bình luận riêng tư của người dùng. Log chỉ đọc, không sửa và không xóa được.',
    parts: [
      'Ai truy cập, dữ liệu gì, của tài khoản nào, vào lúc nào',
      'Lý do truy cập bắt buộc khai báo tại thời điểm truy cập',
      'Lọc theo thành viên đội ngũ, loại dữ liệu, khoảng thời gian',
      'Xuất báo cáo khi bị thanh tra',
    ],
  },
};
