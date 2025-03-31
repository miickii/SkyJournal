# SkyJournal

A simple messaging application designed for sharing messages between two people across locations, with a special focus on supporting communication between China and other countries.

## Features

- Simple shared password login system
- GitHub Gist integration for persistent storage
- Weather displays for two locations
- Journal entries with timestamps
- Language cards for learning phrases
- Multi-language support (English/Chinese)
- Works in China (no blocked services)

## Setup Instructions

### Basic Setup (For All Users)

1. Clone this repository
2. Install dependencies: `npm install`
3. Create a `.env` file with:
   ```
   VITE_WEATHER_API_KEY=your_openweathermap_api_key
   ```
4. Run in development mode: `npm run dev`

### GitHub Gist Setup (Optional, for Cloud Storage)

This app uses GitHub Gists to store encrypted messages between users. To set this up:

1. Create a GitHub Personal Access Token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token" (classic)
   - Give it a name like "SkyJournal Gist Access"
   - Select the "gist" scope only
   - Copy the generated token

2. Create a new secret Gist:
   - Go to https://gist.github.com/
   - Create a new secret Gist with any content (can be empty)
   - After creating, copy the Gist ID from the URL (the part after your username)
     - Example: `https://gist.github.com/yourusername/abcd1234abcd1234abcd1234abcd1234`
     - The ID is `abcd1234abcd1234abcd1234abcd1234`

3. Update the configuration in `/src/utils/githubStorage.js`:
   ```js
   const GITHUB_TOKEN = 'your_personal_access_token';
   const GIST_ID = 'your_gist_id';
   ```

## How It Works

1. Both users sign in with the same shared password
2. Messages are encrypted using this shared password
3. If GitHub Gist is configured, encrypted messages are stored in your private Gist
4. Messages are synced between users automatically

## Deployment

### Deploying to GitHub Pages

1. The project is already configured for GitHub Pages deployment

2. Build the project:
   ```
   npm run build
   ```

3. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

### Deploying to other static hosting

1. Build the project:
   ```
   npm run build
   ```

2. Upload the contents of the `dist` folder to your hosting provider

## Shared Password

The default shared password is: `skyjournal2024`

You can change this in `src/utils/simpleAuth.js` by updating the `DEFAULT_PASSWORD` constant.
