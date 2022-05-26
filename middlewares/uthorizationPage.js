import cookies from "next-cookies";

export const unauthPage = (ctx) => {
  return new Promise((resolve) => {
    const allCookies = cookies(ctx);

    if (allCookies.token)
      return ctx.res
        .writeHead(302, {
          Location: "/posts",
        })
        .end();

    return resolve("unauthorized");
  });
};

export const authPage = (ctx) => {
  return new Promise((resolve) => {
    const allCookies = cookies(ctx);

    if (!allCookies.token)
      return ctx.res
        .writeHead(302, {
          Location: "/auth/login",
        })
        .end();

    return resolve({
      token: allCookies.token,
    });
  });
};
