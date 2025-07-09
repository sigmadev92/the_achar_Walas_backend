export const firstAdminRegisterHTML = (adminData) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Admin Registration Successful</h1>
    <p>Hello ${adminData.name}</p>
    <p>
      You have been successfully registered as the main System Administrator
      with our website.
    </p>
    <p>
      You have full control over the website and can call the technical
      developers team anytime. All information is provided in your developer
      console.
    </p>
    <p>
      You can see many operation regarding the users, products and other admins.
    </p>
    <p>
      Your mail isn't verified yet. You can do after login into you account
      anytime.
    </p>
    <p>Thank you for choosing us to serve you.</p>
    <h3>The Achaar Walas</h3>
  </body>
</html>
`;
};
