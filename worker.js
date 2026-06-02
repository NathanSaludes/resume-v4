// Gateway for nathanielsaludes.com
//   /                    -> redirect to /resume
//   /resume*             -> static resume (served from assets)
//   /invoice-generator*  -> forwarded to the freelance-invoice Worker
export default {
  async fetch(request, env) {
    const { pathname, origin } = new URL(request.url);

    if (pathname === "/invoice-generator" || pathname.startsWith("/invoice-generator/")) {
      return env.INVOICE_APP.fetch(request);   // hand off, path preserved
    }
    if (pathname === "/") {
      return Response.redirect(`${origin}/resume`, 301);
    }
    return env.ASSETS.fetch(request);           // serve the resume + any other assets
  },
};
