export function stripMarkdownCodeBlock(md: string): string {
  // Remove triple backtick code block with optional 'markdown' language
  return md.replace(/^```(?:markdown)?\s*([\s\S]*?)```$/im, '$1').trim();
} 