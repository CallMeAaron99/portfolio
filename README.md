# portfolio

A portfolio website built with **Angular** and **Express.js**. Live link: https://aaronhong.net

# Install node and angular cli

For installation of Node on Debian and Ubuntu based Linux distributions, please refer to `https://github.com/nodesource/distributions`. Once Node is installed, run the command `sudo npm install -g @angular/cli` to install the Angular CLI.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. Ensure the `"localize"` option in the `angular.json` is set to false. For more information about `"localize"`, please refer to the Angular documentation at `https://angular.io/guide/i18n-common-merge#generate-application-variants-for-each-locale`

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/browser` directory

## Build (ssr)

Run `npm run build:ssr` to build the project for server side rendering. The server start JavaScript file will be located in the `dist/server` directory and named `main.js`. To start a development server, run `npm run serve:ssr`

## Extract translation

Run `npm run extract` to extract the translation file. The file will be stored in the `src/locale` directory and named `messages.xlf`

## Deloying to production

Create porfolio service `sudo vi /etc/systemd/system/portfolio.service`. Tip for vi global replace `:%s/<username>/your_username/g`

```shell
[Unit]
Description=Node.js serve for portfolio app
After=network.target

[Service]
User=<username>
Group=www-data
WorkingDirectory=/home/<username>/portfolio
Environment="PATH=/usr/bin"
Environment="NODE_ENV=production"
Environment="PORT=8000"
Environment="MAIL_USERNAME=<mail username>"
Environment="MAIL_PASSWORD=<mail password>"
ExecStart=/usr/bin/node /home/<username>/portfolio/dist/server/main.js

[Install]
WantedBy=multi-user.target
```

Enable portfolio service

```shell
sudo systemctl daemon-reload
sudo systemctl start portfolio
sudo systemctl enable portfolio
```

Create nginx config `sudo vi /etc/nginx/sites-available/portfolio`

```shell
server {
    listen 80;
    server_name <IP address or domain name>;

    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name <IP address or domain name>;

    error_log /home/<Username>/portfolio/error.log;
    access_log /home/<Username>/portfolio/access.log;

    ssl_certificate <Path to cert>;
    ssl_certificate_key <Path to key>;

    location / {
        include proxy_params;
        proxy_pass <Port or Socket>;
    }
}
```

Soft link conf file and restart nginx

```shell
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

## Using Docker

Build the image from Dockerfile

```shell
docker build -t username/portfolio:1.0 .
```

Run the container

```shell
docker run -p 8000:8000 <IMAGE ID>
```
