# Cancer Research Portal - Backend

Node.js/Express backend for the Cancer Research Portal application.

## Features

- ✅ RESTful API for patient management
- ✅ Practitioner registration and approval workflow
- ✅ Admin dashboard for managing practitioners
- ✅ MySQL database with Aiven cloud hosting
- ✅ SendGrid email notifications
- ✅ CORS configuration for Vercel frontend
- ✅ Production-ready deployment on Render

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (Aiven Cloud)
- **Email**: SendGrid API
- **Hosting**: Render.com

## Local Development

### Prerequisites

- Node.js 16+ installed
- MySQL database (local or cloud)
- SendGrid account (for email features)

### Installation

1. Clone the repository
```bash
cd backend
npm install
```

2. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your actual credentials
```

3. Start the development server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## Environment Variables

See `.env.example` for all required variables. Key configurations:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL connection string | Yes |
| `SENDGRID_API_KEY` | SendGrid API key for emails | Yes (production) |
| `SENDGRID_FROM_EMAIL` | Verified sender email | Yes (production) |
| `ADMIN_USER` | Admin login username | Yes |
| `ADMIN_PASS` | Admin login password | Yes |
| `FRONTEND_ORIGIN` | Allowed CORS origin | Yes |

## API Endpoints

### Authentication
- `POST /api/login` - Practitioner login
- `POST /api/admin/login` - Admin login

### Practitioners (Admin)
- `GET /api/admin/practitioners` - List all practitioners
- `POST /api/admin/practitioners/:id/approve` - Approve practitioner
- `POST /api/admin/practitioners/:id/reject` - Reject practitioner

### Practitioners (Public)
- `POST /api/practitioners/register` - Register new practitioner

### Patients
- `GET /api/patients/doctor/:doctorId` - Get patients for a doctor
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `GET /api/patients/:id` - Get patient by ID

### Utility
- `GET /healthz` - Health check endpoint
- `GET /api/admin/test-email` - Test email configuration

## Email Setup

This application uses **SendGrid** for reliable email delivery in production.

### Quick Setup:
1. Create a free SendGrid account at https://sendgrid.com/
2. Get your API key from Settings → API Keys
3. Verify your sender email in Settings → Sender Authentication
4. Add to environment variables:
   - `SENDGRID_API_KEY`
   - `SENDGRID_FROM_EMAIL`

See `SENDGRID_SETUP.md` for detailed instructions.

## Deployment

### Render.com (Recommended)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Add all variables from `.env.example`
5. Deploy!

Your backend will be live at: `https://your-app.onrender.com`

### Environment Variables on Render

Make sure to set these in the Render dashboard:
- All database credentials
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`
- `ADMIN_USER` and `ADMIN_PASS`
- `FRONTEND_ORIGIN=https://cancer-research-pulse.vercel.app`

## Database Schema

The application uses MySQL with the following main tables:

- `practitioners` - Registered medical practitioners
- `patients` - Patient records with comprehensive medical data
- `doctors` - Legacy table (deprecated)

## Security Features

- ✅ CORS protection
- ✅ Environment variable configuration
- ✅ SQL injection protection (parameterized queries)
- ✅ Password hashing (client-side)
- ✅ Admin authentication
- ✅ SSL/TLS database connections

## Troubleshooting

### Email not sending
- Check SendGrid API key is set correctly
- Verify sender email is verified in SendGrid
- Check Render logs for errors
- Visit `/api/admin/test-email?email=your@email.com` to test

### Database connection failed
- Verify `DATABASE_URL` is correct
- Check SSL certificate if using Aiven
- Ensure database allows connections from Render IPs

### CORS errors
- Add your frontend URL to `allowedOrigins` in `data.js`
- Set `FRONTEND_ORIGIN` environment variable

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Support

For issues or questions:
- Check the logs in Render dashboard
- Review `SENDGRID_SETUP.md` for email issues
- Verify all environment variables are set correctly

## License

Private - Cancer Research Portal
