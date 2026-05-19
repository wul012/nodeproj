export function parseJsonEvidence(text: string): unknown {
  return JSON.parse(stripJsonBom(text));
}

export function stripJsonBom(text: string): string {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}
