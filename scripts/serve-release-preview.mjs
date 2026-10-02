import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain'};
const server = createServer(async (req,res) => {
  res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');
  res.setHeader('Cache-Control','no-store');
  if (!['GET','HEAD'].includes(req.method)) {res.writeHead(405);res.end('This private prototype does not accept submissions.');return;}
  try {
    const url = new URL(req.url,'http://127.0.0.1');
    const pathname = decodeURIComponent(url.pathname);
    if (pathname === '/__qa__/axe.js') {res.writeHead(200,{'Content-Type':'text/javascript'});res.end(await readFile(resolve('node_modules/axe-core/axe.min.js')));return;}
    if (pathname === '/__qa__/audit.js') {res.writeHead(200,{'Content-Type':'text/javascript'});res.end(await readFile(resolve('scripts/local-a11y-audit.js')));return;}
    if (pathname === '/robots.txt') {res.writeHead(200,{'Content-Type':'text/plain'});res.end('User-agent: *\nDisallow: /\n');return;}
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) {res.writeHead(403);res.end();return;}
    if ((await stat(file)).isDirectory()) file = resolve(file,'index.html');
    let data = await readFile(file);
    if (url.searchParams.get('qa') === '1' && extname(file) === '.html') data = data.toString().replace('</body>','<script src="/__qa__/axe.js" defer></script><script src="/__qa__/audit.js" defer></script></body>');
    res.writeHead(200, {'Content-Type':types[extname(file)] || 'application/octet-stream'});
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
    res.end(await readFile(resolve(root,'404.html')).catch(()=>'Not found'));
  }
});
server.listen(4187,'127.0.0.1',()=>console.log('Release preview: http://127.0.0.1:4187/'));
server.on('error',error=>{console.error(error.message);process.exitCode=1;});
