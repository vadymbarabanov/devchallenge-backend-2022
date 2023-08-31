const PARAM_REGEXP = new RegExp(":[a-zA-Z0-9]+", "g");

export function getPathPlaceholders(path) {
  return [...path.matchAll(PARAM_REGEXP)].map(([match]) => match);
}

export function replacePlaceholdersWithRegExp(path, placeholders) {
  placeholders.forEach((placeholder) => {
    path = path.replaceAll(placeholder, "([a-zA-Z0-9]+)");
  });

  return path;
}

export function getUrlParamValues(reqUrl, pathWithRegExp) {
  const match = reqUrl.match(new RegExp(pathWithRegExp));

  if (!match) {
    return [];
  }

  return match.slice(1);
}
