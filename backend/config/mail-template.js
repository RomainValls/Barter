const HTML_TEMPLATE = (text) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NodeMailer Email Template</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .email-header {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email">
              <div class="email-header">
                <h1>BARTER REQUEST NOTIFICATION</h1>
              </div>
              <div class="email-body">
                <p>${text}</p>
              </div>
              <div class="email-footer">
              <a href="https://www.linkedin.com/in/romain-valls-157436b4/">
  <img
    src="https://cdn-icons-png.flaticon.com/128/1384/1384014.png"
    alt="Logos"
    style="width: 40px; height: 40px;"
    class="logos"
  />
  </a>
  <p style="text-decoration: none; color: white">Romain Valls LinkedIn Profile<p/>
              <a href="https://www.linkedin.com/in/bryan-tsanga-1a233745/">
  <img
    src="https://cdn-icons-png.flaticon.com/128/1384/1384014.png"
    alt="Logos"
    style="width: 40px; height: 40px;"
    class="logos"
  />
  </a>
  <p style="text-decoration: none; color: white">Bryan Tsanga LinkedIn Profile<p/>
              <a href="https://github.com/RomainValls">
  <img
    src="https://cdn-icons-png.flaticon.com/128/2111/2111432.png"
    alt="Logos"
    style="width: 40px; height: 40px;"
    class="logos"
  />
  </a>
  <p style="text-decoration: none; color: white">Romain Valls GitHub Profile<p/>
              <a href="https://github.com/Tygar-Sanban">
  <img
    src="https://cdn-icons-png.flaticon.com/128/2111/2111432.png"
    alt="Logos"
    style="width: 40px; height: 40px;"
    class="logos"
  />
  </a>
  <p style="text-decoration: none; color: white">Bryan Tsanga GitHub Profile<p/>
<p style="color: white; font-size: 14px; text-align: center;">
Copyright © 2023 Barter, All rights reserved. <br>
3 rue Maillard, 75011, Paris
</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
};

module.exports = HTML_TEMPLATE;
