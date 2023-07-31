import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env['MAIL_USERNAME'],
        pass: process.env['MAIL_PASSWORD']
    }
});

export async function sendEmail(name: string, email: string, message: string) {
    const mailOptions = {
        from: 'aaron.dev247@gmail.com',
        to: 'aaron.dev247@gmail.com',
        subject: 'Contact Message',
        text: name,
        html: '<style>a,body,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table{border-collapse:collapse!important}body{height:100%!important;margin:0!important;padding:0!important;width:100%!important}@media screen and (max-width:525px){.wrapper{width:100%!important;max-width:100%!important}.responsive-table{width:100%!important}.padding{padding:10px 5% 15px 5%!important}.section-padding{padding:0 15px 50px 15px!important}}.form-container{margin-bottom:24px;padding:20px;border:1px dashed #ccc}.form-heading{color:#2a2a2a;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;text-align:left;line-height:20px;font-size:18px;margin:0 0 8px;padding:0}.form-answer{color:#2a2a2a;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:300;text-align:left;line-height:20px;font-size:16px;margin:0 0 24px;padding:0}div[style*="margin: 16px 0;"]{margin:0!important}</style><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td class=section-padding style="padding:10px 15px 30px 15px"align=center bgcolor=#ffffff><table border=0 cellpadding=0 cellspacing=0 width=100% class=responsive-table style=max-width:500px><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td class="message-content padding"style=padding:0;font-size:16px;line-height:25px;color:#232323><h2>Contact Message</h2><div class=form-container><h1 class=form-heading>Name:</h1><p class=form-answer>' + name + '<h1 class=form-heading>Email address:</h1><p class=form-answer>' + email + '<h1 class=form-heading>Message:</h1><p class=form-answer>' + message + '</div></table></table></table></table>', // html body
    }

    await transporter.sendMail(mailOptions);
}
