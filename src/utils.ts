export function randomUrl(maxLength: number = 10) {
  return (Math.random() ** 3).toString(36).substring(2, maxLength + 2);
}

export function saneUrl(url: string) {
  let newUrl = url.toLowerCase();
  newUrl = newUrl.replaceAll("ä", "ae");
  newUrl = newUrl.replaceAll("ü", "ue");
  newUrl = newUrl.replaceAll("ö", "oe");
  newUrl = newUrl.replaceAll("ß", "ss");
  newUrl = newUrl.replaceAll(" ", "-");
  newUrl = newUrl.replace(/[^a-z0-9-]/g, "");
  return newUrl;
}

export function isEqual(obj1:object, obj2:object) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
