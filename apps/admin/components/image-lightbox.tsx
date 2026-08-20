'use client';

import * as React from 'react';

// position: fixed nên tự thoát khỏi overflow-hidden của modal cha, luôn phủ kín toàn màn hình dù
// đặt lồng bên trong modal khác (vd post-detail-modal.tsx).
export function ImageLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <button
      type="button"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex cursor-zoom-out items-center justify-center bg-black/80 p-6"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- ảnh từ Supabase Storage, domain động theo dự án */}
      <img src={src} alt="" className="max-h-full max-w-full rounded-md object-contain" />
      <span className="absolute right-5 top-5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white">
        Đóng ✕
      </span>
    </button>
  );
}
