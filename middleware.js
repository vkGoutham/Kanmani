// Runs at Vercel's edge, before any HTML/CSS/JS is sent to the browser.
// Blocks the entire site behind a username + password prompt.
// Free on every Vercel plan, including Hobby — no paid add-on needed.

export const config = {
  // protects everything EXCEPT Vercel's own internal asset paths
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};

export default function middleware(req) {
  const auth = req.headers.get('authorization');

  const validUser = 'suriya';                   // change to whatever you like
  const validPass = process.env.SITE_PASSWORD;  // set this in Vercel dashboard

  if (auth) {
    const [, encoded] = auth.split(' ');
    // atob is available in the Edge Runtime
    const [user, pass] = atob(encoded).split(':');
    if (user === validUser && pass === validPass) {
      return; // credentials good — let the request through
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
