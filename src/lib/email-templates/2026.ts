const TEMPLATE_2026 = {
	to: emailAddress,
	bcc: 'caleb.michael.campbell@gmail.com',
	subject: 'Registration Confirmed!',
	body: `
Hi ${name},
You have successfully registered for church camp!

Based on the options you selected in the registration form, your total for camp is: $${total}.
Please pay this amount into the church account before Saturday 17th Jan. The sooner you can pay, the easier it'll be for those who are organising camp. Thank you!

Newcastle Central Presbyterian Church
BSB: 082 847
Account number: 450573762
Reference: Camp26 (YOUR NAME)

If you missed the cost breakdown in the form and would like to know how we arrived at this price, please get in contact with Caleb Campbell: caleb.michael.campbell@gmail.com

What's Next?

Once the accommodation has all been booked and finalised, if you selected a bunk room, family room (unit) or lakeside cabin as your accommodation of preference, you'll receive another email with your specific room number. If you indicated that you need financial assistance or a lift or that you were happy to provide financial assistance or a lift, we will also contact you to organise that once registration is closed (if need arises).

The only other thing to do is to make sure the dates for camp (Friday 30th Jan - Sunday 1st Feb) are in your calendar.

Looking forward to seeing you there!
    `,
	htmlBody: `
      <p>
        Hi ${name},<br />
        You have successfully registered for church camp!
      </p>

      <p>
        Based on the options you selected in the registration form, your total for camp is: <strong>$${total}</strong>.
        <br />Please pay this amount into the church account <strong>before Saturday 17th Jan</strong>.
        The sooner you can pay, the easier it'll be for those who are organising camp. Thank you!
      </p>

      <ul style="list-style: none">
        <li>Newcastle Central Presbyterian Church</li>
        <li>BSB: 082 847</li>
        <li>Account number: 450573762</li>
        <li>Reference: Camp26 (YOUR NAME)</li>
      </ul>

      <p style="margin-bottom: 16px;">If you missed the cost breakdown in the form and would like to know how we arrived at this price, please get in contact with Caleb Campbell: caleb.michael.campbell@gmail.com</p>

      <h2>What's Next?</h2>

      <p>Once the accommodation has all been booked and finalised, if you selected a bunk room, family room (unit) or lakeside cabin as your accommodation of preference, you'll receive another email with your specific room number. If you indicated that you need financial assistance or a lift or that you were happy to provide financial assistance or a lift, we will also contact you to organise that once registration is closed (if need arises).</p>

      <p>The only other thing to do is to make sure the dates for camp (Friday 30th Jan - Sunday 1st Feb) are in your calendar.</p>

      <p>Looking forward to seeing you there!</p>
    `,
};
