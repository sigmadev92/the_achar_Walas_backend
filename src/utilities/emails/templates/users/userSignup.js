export const userSignUpHtml = (userData) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>User Registration Successful</h1>
    <p>Hello ${userData.name}</p>
    <p>You have been successfully registered with our website.</p>
    <p>
      Checkout our offers and products and feel free to reach out to us anytime.
    </p>
    <p>
      Your mail isn't verified yet. You can do after login into you account
      anytime. Verified users get a discount of 5% on every Pickle that they
      purchase from our website.
    </p>
    <p>Thank you for choosing us to serve you.</p>
    <h3>The Achaar Walas</h3>
  </body>
</html>`;
};
