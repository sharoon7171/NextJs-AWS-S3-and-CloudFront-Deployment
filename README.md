# Next.js AWS Lambda Deployment Sample

A professional Next.js 15 application deployed on AWS Lambda using Serverless Framework. This sample demonstrates serverless architecture with automatic scaling and cost-effective deployment.

## About This Sample

This project showcases:
- **Next.js 15** with App Router and TypeScript
- **AWS Lambda** serverless deployment
- **CloudFront CDN** for global content delivery
- **S3** for static asset hosting
- **Tailwind CSS** for modern, responsive design

The application includes two professional pages (Home and About) with a complete navigation system, demonstrating a production-ready Next.js application running on AWS infrastructure.

## What's in the Code

### Project Structure

```
app/
├── components/          # Reusable React components
│   ├── Navigation.tsx   # Responsive navigation bar
│   └── Footer.tsx      # Footer component
├── about/               # About page
│   └── page.tsx        # Professional about page
├── globals.css         # Global styles with Tailwind
├── layout.tsx          # Root layout
└── page.tsx            # Home page with hero section

Configuration Files:
├── serverless.yml      # Serverless Framework config
├── next.config.js      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json       # Dependencies and scripts
```

### Key Features

- **Home Page**: Hero section, features showcase, and call-to-action
- **About Page**: Project information, tech stack, and key features
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Serverless Ready**: Configured for AWS Lambda deployment

## How to Use

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Build for Production

```bash
npm run build
```

### 4. Deploy to AWS

**Prerequisites**: AWS account with credentials configured via `aws configure`

```bash
# Deploy to development
npm run deploy:dev

# Deploy to production
npm run deploy:prod
```

After deployment, you'll receive a CloudFront URL to access your application.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **AWS Lambda** - Serverless compute
- **Serverless Framework** - Deployment automation
- **CloudFront** - Global CDN
- **S3** - Static asset storage

---

This sample demonstrates professional Next.js development and AWS serverless deployment practices.
