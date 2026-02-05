# SendGrid Email Setup Guide

## What We Did
Replaced Nodemailer with SendGrid for reliable email delivery on cloud platforms like Render.

## Step 1: Create SendGrid Account

1. Go to https://sendgrid.com/
2. Click "Start for Free"
3. Sign up with your email
4. Verify your email address

## Step 2: Get Your API Key

1. Log in to SendGrid dashboard
2. Go to **Settings** → **API Keys** (left sidebar)
3. Click **"Create API Key"**
4. Name it: `Cancer Research Portal`
5. Select **"Full Access"** (or at minimum: Mail Send permissions)
6. Click **"Create & View"**
7. **COPY THE API KEY** - you'll only see it once!
   - It looks like: `SG.xxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy`

## Step 3: Verify Sender Email

SendGrid requires you to verify the email address you'll send FROM:

1. In SendGrid dashboard, go to **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Fill in the form:
   - **From Name**: Cancer Research Portal
   - **From Email Address**: Your email (e.g., angatapavan@gmail.com)
   - **Reply To**: Same email
   - **Company**: Cancer Research
   - **Address**: Your address
4. Click **"Create"**
5. Check your email inbox and click the verification link
6. Wait for "Verified" status in SendGrid dashboard

## Step 4: Configure Render Environment Variables

1. Go to your Render dashboard: https://dashboard.render.com/
2. Click on your backend service: `cancer-research-backend-1`
3. Go to **Environment** tab
4. Add these environment variables:

| Key | Value |
|-----|-------|
| `SENDGRID_API_KEY` | Paste your API key from Step 2 |
| `SENDGRID_FROM_EMAIL` | Your verified email (e.g., angatapavan@gmail.com) |
| `EMAIL_USER` | Same as SENDGRID_FROM_EMAIL (for fallback) |

5. Click **"Save Changes"**
6. Render will automatically redeploy your backend

## Step 5: Test the Email

Once Render finishes deploying:

1. Visit: `https://cancer-research-backend-1.onrender.com/api/admin/test-email?email=YOUR_EMAIL@gmail.com`
2. Replace `YOUR_EMAIL@gmail.com` with your actual email
3. You should see: `{"success":true,"message":"Test email sent successfully to YOUR_EMAIL@gmail.com"}`
4. Check your inbox - you should receive the test email within seconds!

## Step 6: Test Approval Email

1. Go to your admin dashboard: https://cancer-research-pulse.vercel.app
2. Log in as admin
3. Approve a practitioner
4. They should receive an email with their login credentials!

## Troubleshooting

### "SendGrid not configured" error
- Make sure `SENDGRID_API_KEY` is set in Render environment variables
- Check that you clicked "Save Changes" and waited for redeploy

### "Sender email not verified" error
- Go back to Step 3 and verify your sender email
- Make sure the email in `SENDGRID_FROM_EMAIL` matches the verified email exactly

### Email not received
- Check spam folder
- Verify the recipient email is correct
- Check Render logs for any SendGrid errors
- In SendGrid dashboard, go to **Activity** to see email delivery status

## Free Tier Limits

SendGrid Free Plan:
- ✅ 100 emails per day
- ✅ Unlimited contacts
- ✅ Email API access
- ✅ Perfect for your use case!

## Next Steps

Once everything works:
1. Commit and push all changes to GitHub
2. Your backend is now production-ready with reliable email delivery!

## Support

If you encounter issues:
- SendGrid Support: https://support.sendgrid.com/
- SendGrid Docs: https://docs.sendgrid.com/
