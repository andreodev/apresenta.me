export function formatUpdatedAt(value?: string) {
  if (!value) return "recentemente";

  const date = new Date(value);
  const diffInMinutes = Math.max(
    1,
    Math.floor((Date.now() - date.getTime()) / 60_000),
  );

  if (diffInMinutes < 60) return `há ${diffInMinutes} min`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return `há ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;

  return date.toLocaleDateString("pt-BR");
}
