const TEMPLATE_2027 = {
	to: emailAddress,
	bcc: 'caleb.michael.campbell@gmail.com',
	subject: 'Registration Confirmed!',
	body: `
Hi ${name},
You have successfully registered for church camp!

Based on the options you selected in the registration form, your estimated total for camp is: $${total}.
Please do not pay for camp yet! When we've had a chance to check your registration details, you'll receive another email with your final total and instructions for how to pay.

If you missed the cost breakdown in the form and would like to know how we arrived at this price, please get in contact with Caleb Campbell: caleb.michael.campbell@gmail.com

Thank you for registering!
    `,
	htmlBody: `
      <p>
        Hi ${name},<br />
        You have successfully registered for church camp!
      </p>

      <p>
        Based on the options you selected in the registration form, your estimated total for camp is: <strong>$${total}</strong>.
        <br />Please <strong>do not pay for camp yet</strong>!
        When we've had a chance to check your registration details, you'll receive another email with your final total and instructions for how to pay.
      </p>

      <p>If you missed the cost breakdown in the form and would like to know how we arrived at this price, please get in contact with Caleb Campbell: caleb.michael.campbell@gmail.com</p>

      <p>Thank you for registering!</p>
    `,
};
