// Một số biểu đồ (cohort grid, heatmap, donut, gauge) cần độ mờ/góc liên tục theo dữ liệu —
// Tailwind không có class tĩnh cho việc này, nên tính rgba()/conic-gradient() từ chính giá trị
// hex đã khai báo trong @pho-minh/design-tokens thay vì lặp lại một hex rời rạc mới.
export function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
