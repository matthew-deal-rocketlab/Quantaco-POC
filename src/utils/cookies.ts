export const setCookie = (
  name: string,
  value: string,
  options: { path: string; maxAge?: number } = { path: "/" }
) => {
  const cookieHeader = `${name}=${value}; Path=${options.path}`;
  document.cookie = options.maxAge
    ? `${cookieHeader}; Max-Age=${options.maxAge}`
    : cookieHeader;
};

export const getCookie = (name: string) => {
  if (typeof document !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(";")?.shift();
  }
};
