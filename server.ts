import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { AppServerModule } from './src/main.server';
import { sendEmail } from 'email';

export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/Portfolio/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.use(compression()); // compress all routes
  server.use(cookieParser());
  
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // render index by cookie lang or browser lang
  server.get('/', (req, res) => {
    let lang = req.cookies.lang;
    if (!lang) {
      const supportedLanguages = ["en", "zh"];
      lang = req.acceptsLanguages(supportedLanguages);
      if (lang === 'zh') {
        if (req.acceptsLanguages(['zh-TW', 'zh-HK'])) {
          lang = 'zh-TW';
        } else {
          lang = 'zh-CN';
        }
      } else {
        lang = 'en-US';
      }
    }
    res.render(`${lang}/${indexHtml}`, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  // render index by lang in uri
  server.get('/:lang([a-z]{2}-[A-Z]{2})', (req, res) => {
    const lang = req.params['lang'];
    const cookieLang = req.cookies.lang;
    if (!cookieLang || cookieLang !== lang) {
      res.cookie('lang', lang);
    }
    res.render(`${lang}/${indexHtml}`, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  // serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '30d'
  }));

  // send email via nodemailer
  server.post('/email', express.json(), (req, res) => {
    const data = req.body;
    sendEmail(data['name'], data['email'], data['message']).catch(console.error);
    res.status(204).end();
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';