import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { AppEnv } from './types'
import { route } from './routes'

const app = new Hono<AppEnv>()

app.use('*', cors())

// allowed methods
app.use('*', async (c, next) => {
  const allowedMethods = c.env.allowed_methods as string[];
  const requestMethod = c.req.method;

  if (allowedMethods.indexOf(requestMethod) === -1) {
    if (requestMethod == 'GET') return new Response('Method Not Allowed', { status: 405 });

    return new Response(JSON.stringify(await c.req.json()), {
      headers: {
        'content-type': 'application/json'
      }
    });
  }
  await next();
});

app.get('/', async (c) => {
  const routesList = await c.env.KV_DB.list();
  let routesLink = routesList.keys.length > 0 ? '': `<a href="#" class="route-item"><span class="route-path">⚠ No Routes at the Moment!</span></a>`;
  routesList.keys.forEach(e => {
    routesLink += `<a href="/${e.name}" class="route-item">
        <span class="route-path">/${e.name}</span>
      </a>`;
  });

  let html = `<!DOCTYPE html>
<html>
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <title>Ignite JSON</title>
  <style>:root{--bg-color:#16181d;--text-color:#f8fafc;--card-bg:#20242b;--card-border:#333a45;--primary-color:#ff9800;--primary-light:#ffb74d;--shadow-color:rgba(0, 0, 0, 0.5);--transition-speed:0.3s}body{font-family:'Inter',sans-serif;background-color:var(--bg-color);padding:40px;color:var(--text-color);text-align:center;margin:0;display:flex;justify-content:center;align-items:flex-start;}.container{max-width:750px;width:100%;padding:20px;box-sizing:border-box}.page-header{margin-bottom:50px;text-shadow:none}.page-header h1{font-weight:700;font-size:3em;color:var(--text-color);margin-bottom:5px;line-height:1.2;letter-spacing:-.5px}.page-header p{color:#a0aab8;font-size:1.1em;max-width:600px;margin:0 auto;letter-spacing:0}.route-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:15px;margin-bottom:70px}.route-item{display:flex;justify-content:center;align-items:center;text-decoration:none;color:var(--text-color);font-size:1.1em;font-weight:600;background-color:var(--card-bg);padding:15px;height:60px;border-radius:8px;border:1px solid var(--card-border);box-shadow:0 4px 15px var(--shadow-color);transition:all var(--transition-speed) ease;letter-spacing:.2px}.route-item:hover{background-color:#272c35;border-color:var(--primary-color);color:var(--primary-light);box-shadow:0 6px 20px rgb(0 0 0 / .7);transform:translateY(-4px)}.github-space{padding-top:40px;border-top:1px solid var(--card-border);max-width:600px;margin:0 auto;display:flex;justify-content:center;align-items:center}.github-link{display:flex;align-items:center;gap:10px;font-weight:600;font-size:1em;color:var(--primary-light);text-decoration:none;padding:10px 15px;border:1px solid var(--primary-color);border-radius:4px;transition:all var(--transition-speed) ease;background-color:#fff0}.github-link:hover{background-color:var(--primary-color);color:var(--bg-color);box-shadow:0 4px 10px rgb(255 152 0 / .4);border-color:var(--primary-color)}.github-icon{stroke:var(--primary-light);transition:stroke var(--transition-speed) ease}.github-link:hover .github-icon{stroke:var(--bg-color)}@media (max-width:600px){body{padding:20px 10px}.page-header h1{font-size:2.2em}.page-header p{font-size:.9em}.route-item{height:55px;font-size:1em;padding:12px}}</style>
</head>
<body>
  <div class="container">
    <header class="page-header">
      <h1>JSON API Endpoints</h1>
      <p>Explore the available routes and resources.</p>
    </header>

    <div class="route-grid">
      ${routesLink}
    </div>

    <div class="github-space">
      <a href="https://github.com/almodheshplus/ignite-json" target="_blank" class="github-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="github-icon">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.84 13.84 0 0 0-5.6 0C7.27.65 6.09 1 6.09 1A5.07 5.07 0 0 0 6 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          almodheshplus/ignite-json
      </a>
    </div>
  </div>
</body>
</html>`;

  return c.html(html)
})

app.route('/', route);

app.onError((err, c) => {
  return c.text(err.message);
});

export default app
