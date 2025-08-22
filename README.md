# Demo Hono API

A full-stack API built with Hono that supports multiple runtimes and includes authentication, database management, file storage, and caching capabilities.

[![Hono](https://img.shields.io/badge/Hono-4.9.1-orange)](https://hono.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://www.typescriptlang.org)
[![Better Auth](https://img.shields.io/badge/Better%20Auth-1.3.6-green)](https://www.better-auth.com)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-0.44.4-brightgreen)](https://orm.drizzle.team)

## 🚀 Multi-Runtime Support

This API supports **4 different runtimes** out of the box:

- 🔧 **Node.js** - Traditional server deployment
- ⚡ **Bun** - Fast JavaScript runtime
- 🌐 **Cloudflare Workers** - Edge computing platform
- 🔗 **Next.js** - Full-stack React framework

## 🛠️ Tech Stack

### Core Framework
- **[Hono](https://hono.dev)** - Lightweight web framework
- **TypeScript** - Type-safe development

### Database & ORM
- **[Drizzle ORM](https://orm.drizzle.team)** - Type-safe SQL ORM
- **PostgreSQL** - Primary database

### Authentication
- **[Better Auth](https://www.better-auth.com)** - Modern authentication library
- **Email Authentication** via [Resend](https://resend.com)
- **OAuth Google** integration
- **Email OTP** verification

### File Storage
- **S3-Compatible Bucket** storage (AWS S3, Cloudflare R2, Backblaze B2)
- **Presigned URLs** for secure file uploads
- **Multi-part uploads** for large files (5MB - 5GB)
- **AWS SDK v3** integration

### Caching & Additional Features
- **Redis** caching support
- **Email templates** with React Email
- **Zod** validation
- **Pino** structured logging

## 📋 Prerequisites

Make sure your runtime supports `process.env` for environment variables:

- **Node.js**: ✅ Native support
- **Bun**: ✅ Native support  
- **Cloudflare Workers**: ✅ With `nodejs_compat` flag
- **Next.js**: ✅ Native support

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Choose Your Runtime

Replace `src/index.ts` with the appropriate template:

#### For Node.js
```bash
cp src/__index_templates__/nodejs.txt src/index.ts
```

#### For Bun
```bash
cp src/__index_templates__/bun.txt src/index.ts
```

#### For Cloudflare Workers
```bash
cp src/__index_templates__/cloudflare-worker.txt src/index.ts
```

#### For Next.js
```bash
cp src/__index_templates__/nextjs.txt src/index.ts
```

### 3. Update package.json Scripts

Update your `package.json` scripts based on your chosen runtime:

```json
{
  "scripts": {
    // For Node.js
    "dev": "pnpm node:dev",
    "build": "pnpm node:build", 
    "start": "pnpm node:start",
    
    // For Bun
    "dev": "pnpm bun:dev",
    "build": "pnpm bun:build",
    "start": "pnpm bun:start",
    
    // For Cloudflare Workers  
    "dev": "pnpm cloudflare:worker:dev",
    "build": "wrangler deploy --dry-run",
    "start": "pnpm cloudflare:worker:deploy",
    
    // For Next.js
    "dev": "pnpm nextjs:dev", 
    "build": "pnpm nextjs:build",
    "start": "pnpm nextjs:start"
  }
}
```

### 4. Environment Setup

Create a `.env` file with the required variables:

```env
# Environment
NODE_ENV="development"
PORT="8787"

# Database
DATABASE_URL="postgresql://xxx"

# Cache
CACHE_URL="rediss://xxx"

# Auth
AUTH_TOTP_SECRET="xxx"
AUTH_BETTER_AUTH_SECRET="xxx"
AUTH_GOOGLE_CLIENT_ID="xxx"
AUTH_GOOGLE_CLIENT_SECRET="xxx"

# Email
EMAIL_RESEND_API_KEY="xxx"
EMAIL_FROM="noreply@example.com"
EMAIL_WEBSITE_NAME="Example App"
EMAIL_WEBSITE_URL="https://www.example.com"

# Bucket (S3-Compatible Storage)
BUCKET_NAME="xxx"
BUCKET_REGION="xxx"
BUCKET_ENDPOINT="https://www.example.com"
BUCKET_ACCESS_KEY_ID="xxx"
BUCKET_SECRET_ACCESS_KEY="xxx"
BUCKET_PUBLIC_URL="https://www.example.com"
```

### 5. Database Setup

```bash
# Generate migrations
pnpm db:generate

# Run migrations  
pnpm db:migrate

# Optional: Seed database
pnpm db:seed

# Optional: Open Drizzle Studio
pnpm db:studio
```

### 6. Development

```bash
pnpm dev
```

## 🌐 Runtime-Specific Notes

### Cloudflare Workers
- Enable `nodejs_compat` in your `wrangler.toml`:
```toml
compatibility_flags = ["nodejs_compat"]
```
- Generate types: `pnpm cloudflare:worker:typegen`
- Use bindings for environment variables

### Next.js  
- Ensure your `PORT` environment variable matches Next.js configuration
- API routes will be available under `/api`

### Node.js & Bun
- Standard HTTP server setup
- Full filesystem access available

## 📚 Available Scripts

```bash
# Development
pnpm node:dev          # Node.js development
pnpm bun:dev           # Bun development  
pnpm cloudflare:worker:dev  # Cloudflare Workers dev
pnpm nextjs:dev        # Next.js development

# Production
pnpm node:start        # Start Node.js server
pnpm bun:start         # Start Bun server
pnpm cloudflare:worker:deploy  # Deploy to Cloudflare
pnpm nextjs:start      # Start Next.js server

# Database
pnpm db:generate       # Generate migrations
pnpm db:migrate        # Run migrations
pnpm db:push          # Push schema changes
pnpm db:studio        # Open Drizzle Studio
pnpm db:seed          # Seed database

# Code Quality  
pnpm types:check      # TypeScript check
pnpm lint            # Lint code
```

## 🔐 Authentication Features

- **Email/Password** authentication with verification
- **Google OAuth** integration
- **Email OTP** for secure verification
- **Password reset** functionality
- **Session management** with Better Auth
- **Protected routes** middleware

## 🗄️ Bucket Storage Features

The API includes comprehensive S3-compatible storage functionality that works with:

- **AWS S3** - Amazon Simple Storage Service
- **Cloudflare R2** - Zero egress fees object storage
- **Backblaze B2** - Affordable cloud storage
- Any **S3-compatible** storage provider

### Bucket Capabilities

- 📤 **Presigned URLs** - Secure direct uploads to storage
- 📦 **Multi-part uploads** - Handle large files (5MB - 5GB) efficiently
- 🔒 **Authentication required** - All bucket endpoints are protected
- 🏷️ **Automatic file naming** - UUID-based with date folders
- 🎯 **MIME type validation** - Proper content type handling

### Bucket API Endpoints

```bash
# Generate presigned URL for single file upload
POST /api/bucket/presigned-url
{
  "mimeType": "image/png"
}

# Generate presigned URLs for multi-part upload (large files)
POST /api/bucket/multi-parts-presigned-url
{
  "mimeType": "video/mp4",
  "fileSize": 104857600  // 100MB in bytes
}

# Complete multi-part upload
POST /api/bucket/multi-parts-presigned-url/complete
{
  "uploadId": "upload-id-from-initiation",
  "key": "file-key-from-initiation",
  "parts": [
    { "ETag": "etag1", "PartNumber": 1 },
    { "ETag": "etag2", "PartNumber": 2 }
  ]
}
```

### File Organization

Files are automatically organized using date-based folder structure:

```
bucket/
├── 2024/01/15/uuid1.jpg
├── 2024/01/15/uuid2.png
└── 2024/01/16/uuid3.pdf
```

## 📁 Project Structure

```
src/
├── __index_templates__/     # Runtime-specific entry points
├── app.ts                  # Main Hono application
├── auth/                   # Authentication configuration
├── bucket/                 # S3-compatible storage utilities
│   ├── bucket-client.ts    # S3 client configuration
│   ├── presigned-url.ts    # Single file presigned URLs
│   ├── multi-parts-presigned-url.ts  # Large file uploads
│   └── bucket-utils.ts     # Storage helper functions
├── cache/                  # Redis caching utilities
├── db/                     # Database schema and migrations
├── routes/                 # API route handlers
│   ├── auth/              # Authentication routes
│   ├── bucket/            # File storage routes
│   └── posts/             # Example CRUD routes
├── middlewares/            # Custom middleware
├── email/                  # Email templates
└── lib/                    # Shared utilities
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.