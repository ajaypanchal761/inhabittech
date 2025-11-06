# Deployment Guide for Render

## Problem
Render is looking for `package.json` in `/opt/render/project/src`, but your project structure has:
- `Backend/package.json` (backend service)
- `frontend/package.json` (frontend service)

## Solution

### Option 1: Using render.yaml (Recommended)
The `render.yaml` file in the root directory is configured to deploy the backend service. Render will automatically detect and use this file.

**Steps:**
1. Make sure `render.yaml` is committed to your repository
2. In Render dashboard, create a new "Blueprint" service
3. Connect your repository
4. Render will automatically detect and use the `render.yaml` configuration

### Option 2: Manual Configuration in Render Dashboard
If you're configuring the service manually in Render dashboard:

1. **Root Directory**: Set to `Backend` (NOT `src`)
2. **Build Command**: `npm install` (or leave empty, Render will auto-detect)
3. **Start Command**: `npm start`
4. **Environment**: Node
5. **Node Version**: Use the latest LTS version

### Environment Variables
Make sure to set these environment variables in Render dashboard:
- `NODE_ENV=production`
- `PORT` (Render will set this automatically, but your app uses `process.env.PORT || 5000`)
- `MONGODB_URI` (your MongoDB connection string)
- `JWT_SECRET` (your JWT secret key)
- `JWT_EXPIRE` (JWT expiration time, e.g., "7d")
- `CLOUDINARY_CLOUD_NAME` (if using Cloudinary)
- `CLOUDINARY_API_KEY` (if using Cloudinary)
- `CLOUDINARY_API_SECRET` (if using Cloudinary)

### Frontend Deployment
For the frontend, you'll need to:
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `frontend/dist` folder as a static site, OR
3. Create a separate web service in `render.yaml` for the frontend

### Troubleshooting
- If you see "Couldn't find a package.json file", check that the Root Directory is set to `Backend` (not `src` or empty)
- If using yarn, ensure `yarn.lock` exists, or switch to npm commands
- Make sure all environment variables are set in Render dashboard

