/** Tiny classnames joiner — avoids pulling in a dependency for this. */
export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}
