export function generateShareableUrl(question: string): string {
  const encoded = btoa(encodeURIComponent(question));
  return `${window.location.origin}?q=${encoded}`;
}

export function decodeQuestionFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('q');
  
  if (!encoded) return null;
  
  try {
    return decodeURIComponent(atob(encoded));
  } catch {
    return null;
  }
}