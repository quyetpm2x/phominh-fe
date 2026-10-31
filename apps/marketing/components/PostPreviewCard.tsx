import { formatPostTime, type PublicPost } from '../lib/publicPost';

// Thẻ xem trước bài chia sẻ — chỉ hiện đúng dữ liệu công khai backend trả về (tên hiển thị, nội
// dung rút gọn, tối đa 4 ảnh, địa chỉ nếu tác giả tự nhập), không có ảnh đại diện hay toạ độ.
export function PostPreviewCard({ post }: { post: PublicPost }) {
  return (
    <article className="border-border rounded-[20px] border bg-white p-6 shadow-[0_10px_30px_rgba(16,24,40,.06)]">
      <header className="flex items-center gap-3">
        <span className="from-primary flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gradient-to-br to-[#1A4794] text-base font-bold text-white">
          {post.authorName.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <div className="truncate text-[15px] font-bold text-gray-900">{post.authorName}</div>
          <div className="text-[12.5px] text-gray-600">
            {formatPostTime(post.createdAt)}
            {post.addressText ? ` · ${post.addressText}` : ''}
          </div>
        </div>
      </header>

      <p className="mt-4 whitespace-pre-line text-[16.5px] leading-[1.65] text-gray-900 [text-wrap:pretty]">
        {post.content}
      </p>

      {post.images.length > 0 ? (
        <div
          className={`mt-4 grid gap-2 overflow-hidden rounded-2xl ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}
        >
          {post.images.map((image) => (
            // Ảnh nằm ở Supabase Storage (host theo môi trường) — dùng <img> thường thay vì
            // next/image để khỏi khai báo remotePatterns cho từng host.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={image.url}
              src={image.url}
              alt="Ảnh trong bài viết"
              width={image.width ?? undefined}
              height={image.height ?? undefined}
              loading="lazy"
              className="aspect-square h-full w-full bg-gray-100 object-cover"
            />
          ))}
        </div>
      ) : null}

      <footer className="mt-4 flex gap-5 border-t border-black/5 pt-3.5 text-[13.5px] text-gray-700">
        <span>{post.likeCount} lượt thích</span>
        <span>{post.commentCount} bình luận</span>
      </footer>
    </article>
  );
}
