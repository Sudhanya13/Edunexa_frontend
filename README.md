# Edunexa

Edunexa is a modern tuition and tutoring marketplace built with Next.js. It helps
students discover tuition opportunities, save listings, submit applications,
and manage their learning profile. Tutors can publish and manage tuition posts,
review applicants, and upgrade to a Pro subscription.

## Features

- Student, tutor, and admin dashboards
- Email/password and Google authentication
- Role-based dashboard routing and tutor route protection
- JWT-secured integration with the Edunexa Express API
- Tuition search, details, bookmarks, and applications
- Tutor tuition creation, editing, activation, and deletion
- Applicant review and application status management
- Free and Pro subscription plans through Stripe
- Dynamic account profile with phone, biography, and avatar editing
- Responsive navigation, dashboards, loading states, and notifications

## Tech Stack

- Next.js 16 App Router
- React 19
- Better Auth
- MongoDB
- Stripe
- Tailwind CSS 4
- Lucide React
- ImgBB image hosting
- Express API hosted at `https://edunexa-server.vercel.app`

## User Roles

| Role    | Dashboard            | Main capabilities                                     |
| ------- | -------------------- | ----------------------------------------------------- |
| Student | `/dashboard/student` | Browse tuitions, save listings, and apply             |
| Tutor   | `/dashboard/tutor`   | Post tuitions, manage listings, and review applicants |
| Admin   | `/dashboard/admin`   | Manage users, tuitions, and transactions              |

## Subscription Plans

### Free

- Tutors can publish up to 2 tuition posts
- Students can bookmark up to 5 tuition listings

### Pro

- Unlimited tutor posts and student bookmarks
- Pro profile badge
- Priority listing and support benefits

Subscription state is stored on the authenticated user as `plan` and
`subscriptionStatus`.

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- A MongoDB database
- Optional: Google OAuth, Stripe, and ImgBB credentials

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

MONGO_URI=your_mongodb_connection_string

NEXT_PUBLIC_API_URL=https://edunexa-server.vercel.app

NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Do not commit real credentials. Rotate any credentials that have previously been
committed or shared.

### Development

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production

```bash
npm run build
npm start
```

Set `BETTER_AUTH_URL` to the deployed frontend origin, for example:

```env
BETTER_AUTH_URL=https://your-edunexa-domain.com
```

## Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm start`     | Start the production server          |
| `npm run lint`  | Run ESLint                           |

## Authentication

Better Auth is configured in:

- `src/lib/auth.js`
- `src/lib/auth-client.js`
- `src/app/api/auth/[...all]/route.js`

The current user session is used for role checks and profile data. Requests to
the Express backend use a Better Auth JWT:

```js
const { data, error } = await authClient.token();

fetch("https://edunexa-server.vercel.app/tutor/applicants", {
  headers: {
    Authorization: `Bearer ${data.token}`,
  },
});
```

Tutor routes are protected by
`src/app/(dashboard)/dashboard/tutor/layout.jsx`. Users without a session are
sent to `/signin`, while authenticated users whose role is not `tutor` are sent
back to `/dashboard`.

## Profile Page

The profile page at `/profile` reads the signed-in user dynamically:

- Full name is read-only
- Email address is read-only
- Account role is displayed dynamically
- Subscription plan is displayed dynamically
- Phone number can be edited
- Biography can be edited
- Profile image can be uploaded

## Project Structure

```text
src/
├── app/
│   ├── (auth)/                 Email and Google sign-in/sign-up pages
│   ├── (dashboard)/dashboard/
│   │   ├── admin/              Admin dashboard
│   │   ├── student/            Student dashboard
│   │   └── tutor/              Protected tutor dashboard
│   ├── api/                    Better Auth and Stripe API routes
│   ├── payments/               Stripe checkout and payment status
│   ├── profile/                Dynamic account profile
│   ├── tuitions/               Public tuition listing pages
│   └── pricing/                Subscription pricing
├── components/
│   ├── dashboard/              Dashboard layout and shared widgets
│   ├── home/                   Home page sections
│   └── ui/                    Shared UI and site chrome
└── lib/
    ├── auth.js                 Server-side Better Auth setup
    ├── auth-client.js          Browser-side Better Auth client
    ├── pricing.js              Plan definitions
    └── stripe.js               Stripe configuration
```

## Deployment

The frontend is compatible with Vercel. Add all required environment variables
in the Vercel project settings and redeploy after changing authentication or
Stripe configuration.

For cross-origin API authentication, ensure the Express backend accepts the
expected JWT issuer and audience and allows requests from the deployed frontend
origin.

## Repository

- Backend API: `https://edunexa-server.vercel.app`
