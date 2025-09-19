import { marked } from 'marked';
import DOMPurify from 'dompurify';

marked.setOptions({
  breaks: true,
  gfm: true,
});

export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';
  try {
  const rawHtml = marked(markdown) as unknown as string;
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'strong', 'em', 'u', 'del',
        'ul', 'ol', 'li',
        'blockquote', 'code', 'pre',
        'a', 'img',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
      ALLOW_DATA_ATTR: false,
    });
    return cleanHtml;
  } catch (err) {
    console.error('Markdown render error', err);
    return '<p>Error rendering content</p>';
  }
}

export function markdownToPlainText(markdown: string, maxLength = 160): string {
  if (!markdown) return '';
  try {
    const plain = markdown
      .replace(/#{1,6}\s+/g, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '')
      .replace(/\n+/g, ' ')
      .trim();
    return plain.length > maxLength ? plain.substring(0, maxLength).trim() + '...' : plain;
  } catch {
    return '';
  }
}
