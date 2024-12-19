import { nanoid } from "nanoid";

const BROWSER_IDENT_LOCALSTORAGE_KEY = "browser-ident";

const createBrowserIdent = () => {
  const newBrowserIdent = nanoid();

  localStorage.setItem(BROWSER_IDENT_LOCALSTORAGE_KEY, newBrowserIdent);

  return newBrowserIdent;
};

export const getBrowserIdent = () => {
  const browserIdent = localStorage.getItem(BROWSER_IDENT_LOCALSTORAGE_KEY);

  if (browserIdent) {
    return browserIdent;
  }

  return createBrowserIdent();
};
