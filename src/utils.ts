
export function randomUrl(maxLength: number = 10) {
  return (Math.random() ** 3).toString(36).substring(2, maxLength + 2);
}
