import { storeLinks } from '../lib/storeLinks';

// NEXT_PUBLIC_* được Next nhúng lúc build, phải đọc đúng tên biến đầy đủ ở đây.
const STORES = storeLinks(
  process.env.NEXT_PUBLIC_APP_STORE_URL,
  process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL,
);

const BOX = 'flex flex-col rounded-[11px] border px-4 py-2.5 text-[#E8EBEE]';
const CAPTION = 'text-[9.5px] tracking-[0.06em] opacity-70';
const NAME = 'text-sm font-semibold';

// Chưa có link store thì hiện "Sắp có", không bấm được.
export function StoreButtons() {
  return (
    <div id="tai-app" className="mt-5 flex scroll-mt-6 flex-wrap gap-2.5">
      {STORES.map(({ name, href }) =>
        href ? (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${BOX} border-white/[0.28] no-underline`}
          >
            <span className={CAPTION}>TẢI TRÊN</span>
            <span className={NAME}>{name}</span>
          </a>
        ) : (
          <div key={name} className={`${BOX} cursor-default border-white/[0.14] opacity-60`}>
            <span className={CAPTION}>SẮP CÓ TRÊN</span>
            <span className={NAME}>{name}</span>
          </div>
        ),
      )}
    </div>
  );
}
