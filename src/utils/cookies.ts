import cookie from 'js-cookie';

const domain = 'localhost';
//   process.env.NODE_ENV === "development"
//     ? "localhost"
//     : SITE.DOMAIN.replace("https://", "");

type Key = 'AUTH';

export const setCookie = (key: Key, value: string, sessionCookie = false) => {
  const options = {
    expires: sessionCookie ? 1 / 288 : 1,
  };

  cookie.set(key, value, options);
};

export const destroyCookie = (key: Key, opt?: any) => {
  cookie.remove(key, { ...opt, domain });
};

export const getCookie = (key: Key) => cookie.get(key);
