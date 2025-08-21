import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked options for safe HTML generation
marked.setOptions({
  breaks: true,
  gfm: true,
});

/**
 * Converts Markdown content to sanitized HTML
 * Used server-side for rendering blog post content
 * 
 * @param markdown - Raw markdown content
 * @returns Sanitized HTML string
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  try {
    // Convert markdown to HTML
    const rawHtml = marked(markdown);
    
    // Sanitize HTML to prevent XSS attacks
    // TODO: For server-side rendering, use a server-compatible sanitizer
    // like 'isomorphic-dompurify' or handle sanitization on the server
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'strong', 'em', 'u', 'del',
        'ul', 'ol', 'li',
        'blockquote', 'code', 'pre',
        'a', 'img',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
      ALLOW_DATA_ATTR: false,
    });
    
    return cleanHtml;
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return '<p>Error rendering content</p>';
  }
}

/**
 * Extracts plain text from markdown for excerpts and meta descriptions
 * 
 * @param markdown - Raw markdown content
 * @param maxLength - Maximum length of extracted text
 * @returns Plain text string
 */
export function markdownToPlainText(markdown: string, maxLength: number = 160): string {
  if (!markdown) return '';
  
  try {
    // Remove markdown syntax
    const plainText = markdown
      .replace(/#{1,6}\s+/g, '') // Remove headers
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic
      .replace(/`([^`]+)`/g, '$1') // Remove inline code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();
    
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength).trim() + '...'
      : plainText;
  } catch (error) {
    console.error('Error extracting plain text from markdown:', error);
    return '';
  }
}

// TODO: For production, consider these enhancements:
// 1. Add syntax highlighting for code blocks (using Prism.js or highlight.js)
// 2. Add support for custom markdown extensions (callouts, alerts, etc.)
// 3. Implement image optimization and lazy loading
// 4. Add table of contents generation
// 5. Support for math equations (KaTeX)
// 6. Video embed support