# Next.js 15 Serverless on AWS

A complete Next.js 15 application configured for serverless deployment on AWS using **AWS Amplify** - the official AWS solution for Next.js applications.

## 🚀 Features

- **Next.js 15** with App Router and TypeScript
- **AWS Amplify** - Official AWS managed service for Next.js
- **AWS Lambda** for serverless API routes and SSR
- **S3** for static asset hosting
- **CloudFront CDN** for global content delivery
- **Tailwind CSS** for modern, responsive design

## 📋 Prerequisites

1. **Node.js** 18+ installed
2. **AWS Account** with appropriate permissions
3. **AWS CLI** installed and configured (`aws configure`)
4. **AWS Amplify CLI** (optional, for local testing)

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Full type safety
- **Tailwind CSS** - Modern, responsive styling
- **AWS Amplify** - Official AWS managed service
- **AWS Lambda** - Serverless compute
- **AWS S3** - Static asset storage
- **AWS CloudFront** - Global CDN distribution

## 🚀 Quick Start

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

### 4. Deploy to AWS Amplify

**Option 1: Using AWS Amplify Console (Recommended)**

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click "New app" → "Host web app"
3. Connect your Git repository
4. Amplify will automatically detect Next.js and deploy

**Option 2: Using AWS Amplify CLI**

```bash
# Install Amplify CLI (if not installed)
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

**Option 3: Using AWS CLI**

```bash
# Create Amplify app
aws amplify create-app --name nextjs-app --region us-east-1

# Connect repository and deploy via Amplify Console
```

## 📁 Project Structure

```
app/
├── api/                # API routes
│   └── serverless-info/
│       └── route.ts    # Lambda environment verification endpoint
├── components/         # Reusable React components
│   ├── Navigation.tsx
│   └── Footer.tsx
├── about/              # About page
│   └── page.tsx
├── globals.css         # Global styles with Tailwind
├── layout.tsx          # Root layout
└── page.tsx           # Home page

Configuration Files:
├── amplify.yml         # AWS Amplify build configuration
├── next.config.js      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## ⚙️ Configuration

### AWS Amplify Configuration (`amplify.yml`)

AWS Amplify automatically:
- Builds your Next.js application
- Creates Lambda functions for API routes
- Sets up S3 buckets for static assets
- Configures CloudFront distribution
- Handles all AWS infrastructure

### Next.js Configuration (`next.config.js`)

Optimized for AWS Amplify deployment:
- `images.unoptimized: true` - Required for S3/CloudFront
- Compression enabled
- Production optimizations

## 🔌 API Endpoints

### `/api/serverless-info`

Verifies and returns AWS Lambda environment information to confirm the application is running on serverless infrastructure.

**Method:** `GET`

**Response:**
```json
{
  "platform": "AWS Lambda (Serverless)",
  "runtime": "AWS_Lambda_nodejs22.x",
  "region": "us-east-1",
  "functionName": "Amplify-managed Lambda",
  "functionVersion": "Latest",
  "memoryLimit": "1024 MB",
  "timestamp": "2025-11-08T16:35:59.000Z",
  "deployment": "AWS Amplify",
  "architecture": "Serverless",
  "verified": true,
  "handler": "index.handler",
  "environmentVariables": {
    "AWS_EXECUTION_ENV": true,
    "AWS_REGION": true,
    "AWS_LAMBDA_FUNCTION_NAME": true,
    "AWS_LAMBDA_FUNCTION_MEMORY_SIZE": true,
    "LAMBDA_TASK_ROOT": true
  }
}
```

**Purpose:**
- Verifies the application is running on AWS Lambda
- Displays Lambda environment variables and configuration
- Useful for debugging and confirming serverless deployment

## 🏗️ AWS Infrastructure

AWS Amplify automatically creates:

1. **AWS Lambda Functions**
   - Serverless functions for API routes
   - SSR support for dynamic pages
   - Automatic scaling

2. **S3 Buckets**
   - Stores static assets (`_next/static/*`)
   - Configured for CloudFront origin

3. **CloudFront Distribution**
   - Global CDN for fast content delivery
   - Automatic cache invalidation
   - HTTPS enabled by default

4. **IAM Roles & Policies**
   - Proper permissions for all services
   - Secure by default

## 📚 Official Documentation

- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [Next.js on AWS Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html)
- [Next.js Documentation](https://nextjs.org/docs)

## 💰 Cost

- **Amplify Free Tier**: 1000 build minutes/month, 15 GB storage
- **Lambda Free Tier**: 1 million requests/month free
- **S3 Free Tier**: 5GB storage, 20,000 GET requests/month
- **CloudFront**: Pay-per-use CDN pricing
- **Estimated Cost**: ~$0-5/month for low traffic

## 🔍 Troubleshooting

### Deployment Issues

1. **Ensure AWS credentials are configured:**
   ```bash
   aws configure
   ```

2. **Check Amplify app status:**
   ```bash
   aws amplify list-apps
   ```

3. **View build logs:**
   Check the AWS Amplify Console for detailed build and deployment logs.

## 📝 License

This project is open source and available under the MIT License.

---

**Built with Next.js 15 and AWS Amplify - Official AWS Solution**
