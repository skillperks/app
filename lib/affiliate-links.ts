export function buildGoLink({
  to,
  merchant,
  sourcePath,
  src,
  placement,
}: {
  to: string;
  merchant?: string;
  sourcePath?: string;
  src?: string;
  placement?: string;
}) {
  const params = new URLSearchParams();
  params.set("to", to);
  if (merchant) params.set("m", merchant);
  if (sourcePath) params.set("sp", sourcePath);
  if (src) params.set("src", src);
  if (placement) params.set("p", placement);
  return `/go?${params.toString()}`;
}
