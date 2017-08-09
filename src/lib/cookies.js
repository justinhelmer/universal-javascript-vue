import Cookies from 'universal-cookie';

export default function(context) {
  const cookies = new Cookies(context);

  cookies.getCookieString = function() {
    const all = cookies.getAll();
    const cookieNames = Object.keys(all);

    let cookie = format(cookieNames[0], all[cookieNames[0]]);
    cookieNames.shift();

    cookieNames.forEach(cookieName => {
      cookie += '; ' + format(cookieName, all[cookieName]);
    });

    return cookie;

    function format(name, value) {
      return name + '=' + encodeURIComponent(value)
    }
  };

  return cookies;
}