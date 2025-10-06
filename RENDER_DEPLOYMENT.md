# Deploying TRON Wallet App to Render

## Prerequisites
- GitHub repository with this code
- Render account (free tier works)
- Supabase PostgreSQL database URL (with SSL enabled)

## Deployment Steps

### 1. Configure Environment Variables in Render

When creating your Web Service on Render, add these environment variables:

```
DATABASE_URL=your-supabase-postgresql-url
SESSION_SECRET=your-random-secret-key
NODE_ENV=production
```

**Important**: 
- Use your Supabase PostgreSQL connection string for `DATABASE_URL`
- The app automatically enables SSL for production database connections
- Generate a secure random string for `SESSION_SECRET` (e.g., using `openssl rand -base64 32`)

### 2. Render Configuration

The `render.yaml` file is already configured with:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Runtime**: Node.js
- **Plan**: Free tier

### 3. Deploy Options

#### Option A: Using render.yaml (Recommended)
1. Connect your GitHub repository to Render
2. Render will automatically detect the `render.yaml` file
3. Click "Apply" to deploy with the pre-configured settings
4. Add your environment variables in the Render dashboard

#### Option B: Manual Setup
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. Add environment variables as listed above
5. Deploy

### 4. Database Migration

After deployment, run the database migration:
1. Go to your Render service
2. Open the Shell tab
3. Run: `npm run db:push`

This will create the necessary tables in your Supabase database.

### 5. Verify Deployment

Your app will be available at: `https://your-app-name.onrender.com`

Test the following:
- User registration: `/`
- Login functionality
- Wallet creation
- All TRON wallet features

## Database Schema

The app uses PostgreSQL with the following tables:
- `users` - User accounts with hashed passwords and PINs
- `wallets` - TRON wallet addresses and private keys
- `session` - Express session storage (auto-created)

## Production Features

✅ PostgreSQL database with Drizzle ORM  
✅ Session persistence in database  
✅ Secure cookies in production  
✅ SSL/TLS enabled for database connections  
✅ Environment-based configuration  
✅ Production-ready build process  

## Troubleshooting

### Build Failures
- Ensure all dependencies are in `dependencies`, not `devDependencies`
- Check that Node.js version is compatible (18+)

### Database Connection Issues
- Verify DATABASE_URL is correct
- SSL is automatically enabled in production (NODE_ENV=production)
- Ensure your Supabase instance allows connections from Render
- Check that database is accessible from Render's region

### Session Issues
- Verify SESSION_SECRET is set
- Check that session table was created successfully
- Ensure cookies are enabled in browser

## Security Notes

- Never commit `.env` file to git
- Rotate SESSION_SECRET periodically
- Use strong passwords for database
- Keep dependencies updated
- Monitor for security advisories
