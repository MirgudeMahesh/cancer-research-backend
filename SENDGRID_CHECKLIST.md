# 🎯 SendGrid Setup Checklist

Use this checklist to set up SendGrid email service for your Cancer Research Portal.

## ☐ Step 1: Create SendGrid Account (5 min)

- [ ] Go to https://sendgrid.com/
- [ ] Click "Start for Free"
- [ ] Sign up with email: `angatapavan@gmail.com`
- [ ] Verify your email address
- [ ] Log in to SendGrid dashboard

## ☐ Step 2: Get API Key (2 min)

- [ ] In SendGrid dashboard, click **Settings** (left sidebar)
- [ ] Click **API Keys**
- [ ] Click **"Create API Key"** button
- [ ] Name: `Cancer Research Portal`
- [ ] Permission Level: **Full Access**
- [ ] Click **"Create & View"**
- [ ] **COPY THE API KEY** (you'll only see it once!)
  ```
  Format: SG.xxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
  ```
- [ ] Save it somewhere safe temporarily

## ☐ Step 3: Verify Sender Email (3 min)

- [ ] In SendGrid dashboard, go to **Settings** → **Sender Authentication**
- [ ] Click **"Verify a Single Sender"**
- [ ] Fill in the form:
  - **From Name**: `Cancer Research Portal`
  - **From Email**: `angatapavan@gmail.com`
  - **Reply To**: `angatapavan@gmail.com`
  - **Company**: `Cancer Research`
  - **Address**: (your address)
- [ ] Click **"Create"**
- [ ] Check your email inbox (`angatapavan@gmail.com`)
- [ ] Click the verification link in the email
- [ ] Return to SendGrid and confirm status shows **"Verified"**

## ☐ Step 4: Configure Render (5 min)

- [ ] Go to https://dashboard.render.com/
- [ ] Find your service: `cancer-research-backend-1`
- [ ] Click on the service name
- [ ] Go to **Environment** tab (left sidebar)
- [ ] Click **"Add Environment Variable"**
- [ ] Add first variable:
  - **Key**: `SENDGRID_API_KEY`
  - **Value**: (paste your API key from Step 2)
- [ ] Add second variable:
  - **Key**: `SENDGRID_FROM_EMAIL`
  - **Value**: `angatapavan@gmail.com`
- [ ] Click **"Save Changes"** button
- [ ] Wait for automatic redeploy (watch the "Events" tab)
- [ ] Wait until status shows **"Live"** (usually 2-3 minutes)

## ☐ Step 5: Test Email Service (2 min)

- [ ] Open this URL in your browser:
  ```
  https://cancer-research-backend-1.onrender.com/api/admin/test-email?email=angatapavan@gmail.com
  ```
- [ ] You should see:
  ```json
  {"success":true,"message":"Test email sent successfully to angatapavan@gmail.com"}
  ```
- [ ] Check your email inbox (`angatapavan@gmail.com`)
- [ ] You should receive an email with subject: **"Diagnostic: Email System Check"**
- [ ] If you don't see it, check your **Spam** folder

## ☐ Step 6: Test Approval Email (2 min)

- [ ] Go to https://cancer-research-pulse.vercel.app
- [ ] Click **Admin** tab
- [ ] Log in:
  - Username: `pulse_testing_for_nhs`
  - Password: `pulse@testing@nhs`
- [ ] Find a pending practitioner
- [ ] Click **"Approve"**
- [ ] Confirm the approval
- [ ] Check the practitioner's email inbox
- [ ] They should receive login credentials!

## ☐ Step 7: Commit & Push (1 min)

- [ ] Open terminal in `backend` folder
- [ ] Run:
  ```bash
  git add .
  git commit -m "Integrate SendGrid for reliable email delivery"
  git push origin main
  ```

## ✅ Success Criteria

You'll know everything is working when:

1. ✅ Test email endpoint returns `{"success":true}`
2. ✅ You receive the test email in your inbox
3. ✅ Approved practitioners receive login credentials via email
4. ✅ No more `ETIMEDOUT` or `ENETUNREACH` errors in Render logs
5. ✅ SendGrid dashboard shows emails in **Activity** tab

## 🆘 Troubleshooting

### Test email fails with "SendGrid not configured"
- **Fix**: Make sure you added `SENDGRID_API_KEY` in Render and clicked "Save Changes"
- **Fix**: Wait for Render to finish redeploying (check "Events" tab)

### Test email fails with "Sender email not verified"
- **Fix**: Go back to Step 3 and complete email verification
- **Fix**: Make sure `SENDGRID_FROM_EMAIL` exactly matches the verified email

### Email not received
- **Fix**: Check spam/junk folder
- **Fix**: In SendGrid dashboard, go to **Activity** → **Email Activity** to see delivery status
- **Fix**: Verify the recipient email address is correct

### Render redeploy stuck
- **Fix**: Wait 5 minutes - sometimes it takes time
- **Fix**: Check "Logs" tab for any errors
- **Fix**: Try clicking "Manual Deploy" → "Clear build cache & deploy"

## 📊 SendGrid Dashboard

After setup, you can monitor emails at:
- **Activity**: https://app.sendgrid.com/email_activity
- **Statistics**: https://app.sendgrid.com/statistics

## 🎉 You're Done!

Once all checkboxes are ticked, your application has:
- ✅ Reliable email delivery on Render
- ✅ Professional email notifications
- ✅ Automated practitioner approval emails
- ✅ 100 free emails per day
- ✅ Production-ready email infrastructure

**Total time**: ~20 minutes
**Cost**: $0 (Free tier)
**Emails per day**: 100 (more than enough!)

---

**Need help?** Check `SENDGRID_SETUP.md` for detailed instructions.
