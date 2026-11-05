// Link tải app ở nút App Store / Google Play. Chưa có link (hoặc không phải https) thì href = null: nút hiện "Sắp có".
export interface StoreLink {
  name: string;
  href: string | null;
}

function validLink(value: string | undefined): string | null {
  const link = value?.trim();
  return link && /^https:\/\/\S+$/.test(link) ? link : null;
}

export function storeLinks(
  appStore: string | undefined,
  googlePlay: string | undefined,
): StoreLink[] {
  return [
    { name: 'App Store', href: validLink(appStore) },
    { name: 'Google Play', href: validLink(googlePlay) },
  ];
}
