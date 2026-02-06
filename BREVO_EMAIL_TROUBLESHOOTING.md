# Brevo Email Troubleshooting Guide

## Issue: Emails Not Being Received

**Symptom**: Brevo returns success with messageId, but recipient doesn't receive the email.

**Root Cause**: Sender email address is not verified in Brevo.

## Current Configuration

- **Sender Email**: `angatapavan@gmail.com` (from .env `EMAIL_USER`)
- **Brevo API Key**: Configured ✅
- **API Status**: Working ✅ (messageId received)
- **Delivery Status**: ❌ Failed (sender not verified)

## Solution: Verify Your Sender Email

### Option 1: Verify Gmail Address (Current Setup)

1. **Login to Brevo Dashboard**
   - Go to: https://app.brevo.com/
   - Navigate to: **Settings** → **Senders & IP**

2. **Add Sender Email**
   - Click "Add a sender"
   - Email: `angatapavan@gmail.com`
   - Sender name: `Cancer Research Portal`
   - Click "Add"

3. **Verify the Email**
   - Brevo will send a verification email to `angatapavan@gmail.com`
   - Check your Gmail inbox (including Spam folder)
   - Click the verification link
   - Wait for status to change to "Verified" ✅

4. **Test Again**
   - Approve a practitioner in your app
   - Email should now be delivered successfully

### Option 2: Use a Different Verified Sender

If you already have a verified sender in Brevo, update your `.env`:

```env
EMAIL_USER=your-verified-email@example.com
```

Then restart your backend server.

### Option 3: Use Domain Email (Production Recommended)

For production, use a custom domain email:

1. Add domain to Brevo (Settings → Senders & IP → Domains)
2. Verify domain ownership (add DNS records)
3. Create sender: `noreply@yourdomain.com`
4. Update `.env` with new sender

## How to Check Verification Status

1. Go to: https://app.brevo.com/settings/senders
2. Look for your sender email
3. Status should show "Verified" with a green checkmark

## Common Issues

### Issue: Email Goes to Spam
**Solution**: 
- Ensure sender domain has proper SPF/DKIM records
- Don't use generic Gmail for production
- Use a professional domain email

### Issue: "Sender not authorized"
**Solution**: 
- Sender email must be verified in Brevo dashboard first
- Check verification status in Settings → Senders & IP

### Issue: Need Different Sender Per Email
**Solution**: 
You can pass a different sender for specific emails by modifying `emailService.js`:

```javascript
async function sendEmail(to, subject, html, customSender = null) {
    const sender = customSender || {
        email: process.env.EMAIL_USER || "noreply@pulsepharma.net",
        name: "Cancer Research Portal"
    };
    // ... rest of code
}
```

## Environment Variables Explained

### Used by Brevo:
- ✅ `BREVO_API_KEY` - Your Brevo API key (required)
- ✅ `EMAIL_USER` - Sender email address (must be verified in Brevo)

### NOT Used by Brevo (Legacy from Nodemailer):
- ❌ `EMAIL_PASS` - Not needed for Brevo (you can remove this)

## Updated .env Template

```env
# Brevo Email Configuration
BREVO_API_KEY=your-brevo-api-key-here
EMAIL_USER=verified-sender@yourdomain.com

# These are NOT used by Brevo (legacy):
# EMAIL_PASS=...  (you can remove this line)
```

## Verification Checklist

- [ ] Login to Brevo dashboard
- [ ] Navigate to Settings → Senders & IP
- [ ] Add sender email: `angatapavan@gmail.com`
- [ ] Check email for verification link
- [ ] Click verification link
- [ ] Confirm status shows "Verified"
- [ ] Restart backend server
- [ ] Test by approving a practitioner
- [ ] Check recipient email (including spam folder)
- [ ] Check backend console for success message

## Need More Help?

Check Brevo's documentation:
- Sender verification: https://help.brevo.com/hc/en-us/articles/209552669
- Email deliverability: https://help.brevo.com/hc/en-us/articles/360000991960

## Next Steps After Verification

Once verified, emails should be delivered successfully. Monitor your Brevo dashboard for:
- Delivery statistics
- Bounce rates
- Spam complaints
- Email opens (if tracking enabled)
