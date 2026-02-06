require('dotenv').config();
const SibApiV3Sdk = require('sib-api-v3-sdk');

// Initialize Brevo API client
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * Send email using Brevo API
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - Email HTML content
 * @returns {Promise} - Resolves when email is sent
 */
async function sendEmail(to, subject, html) {
    try {
        const sendSmtpEmail = {
            sender: {
                email: process.env.EMAIL_USER || "noreply@pulsepharma.net",
                name: "Cancer Research Portal"
            },
            to: [{ email: to }],
            subject: subject,
            htmlContent: html
        };

        console.log(`📧 Attempting to send email to: ${to}`);
        console.log(`📨 Sender: ${sendSmtpEmail.sender.email}`);

        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('✅ Email sent successfully via Brevo:', response);
        return response;
    } catch (error) {
        console.error('❌ Error sending email via Brevo:', error);
        console.error('❌ Error details:', {
            message: error.message,
            response: error.response?.text || error.response?.body,
            statusCode: error.status
        });
        throw error;
    }
}

/**
 * Send practitioner approval email
 * @param {string} email - Practitioner's email
 * @param {string} firstName - Practitioner's first name
 * @param {string} password - Practitioner's password
 * @returns {Promise}
 */
async function sendApprovalEmail(email, firstName, password) {
    const subject = 'Account Approved - Cancer Research Portal';
    const html = `
        <h3>Hello ${firstName},</h3>
        <p>Your account on the Cancer Research Portal has been approved.</p>
        <p><strong>Login URL:</strong> <a href="https://cancer-research-pulse.vercel.app">https://cancer-research-pulse.vercel.app</a></p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>You can now log in and start using the portal.</p>
        <br/>
        <p>Best Regards,<br/>Cancer Research Team</p>
    `;

    return await sendEmail(email, subject, html);
}

module.exports = {
    sendEmail,
    sendApprovalEmail
};
