# Gemini AI Chatbox Setup Guide

The admin panel now includes an AI-powered chatbox assistant that responds in **Waray-Waray** language and helps users with:

- Website navigation
- Questions about Tanauan, Leyte municipality
- Information about municipal services, officials, and departments
- General inquiries about the website

## Setup Instructions

### 1. Get a Google Gemini API Key

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key" and sign in with your Google account
3. Create a new API key for this project
4. Copy the API key

### 2. Add the API Key to Your Environment

Add the following to your `.env.local` file (create it if it doesn't exist):

```
VITE_GEMINI_API_KEY=your_api_key_here
GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with the actual API key you obtained from Google.

### 3. Restart the Development Server

```bash
npm run dev
```

The chatbox will now appear in the bottom-right corner of the admin panel.

## Features

✨ **Key Features:**

- **Waray-Waray Language**: The AI responds exclusively in Waray-Waray language
- **Website Assistant**: Helps with navigation and website information
- **Municipality Info**: Provides information about Tanauan, Leyte
- **Smart Responses**: Uses Google's Gemini AI for intelligent, context-aware responses
- **Clean UI**: Minimalist chat interface with smooth animations

## How It Works

1. **Click the Chat Button**: A blue chat bubble appears in the bottom-right corner
2. **Ask Questions**: Type your question in Waray-Waray or English (the assistant will respond in Waray-Waray)
3. **Get Answers**: The Gemini API processes your question and provides context-aware responses
4. **Clear History**: Use the trash icon to clear the conversation history

## File Structure

```
src/
├── lib/
│   └── GeminiChatbox.svelte          # Main chatbox component
├── routes/
│   ├── (employee)/admin/
│   │   └── +layout.svelte            # Updated with chatbox integration
│   └── api/
│       └── gemini-key/
│           └── +server.js            # Secure API key endpoint
└── .env.example                      # Updated with new env variables
```

## System Prompt

The chatbox uses a custom system prompt that instructs the AI to:

- Act as a helpful assistant for Tanauan, Leyte municipality
- Answer questions about the website, municipality, and navigation
- Respond ONLY in Waray-Waray language
- Provide specific page URLs when helping with navigation

## Security Notes

⚠️ **Important:**

- The API key is fetched from the server-side endpoint (`/api/gemini-key`)
- Never commit your `.env.local` file to version control
- The API key is loaded dynamically at runtime
- All API calls are made directly from the client to Google's API

## Troubleshooting

**Issue**: Chatbox doesn't appear or error message shows

- **Solution**: Check that `VITE_GEMINI_API_KEY` is properly set in `.env.local`

**Issue**: API key error or "not configured" message

- **Solution**: Verify your API key is valid and has access to the Gemini API

**Issue**: Responses are in English instead of Waray-Waray

- **Solution**: The system prompt should enforce Waray-Waray responses. If not, verify the API key has sufficient quota.

## Customization

You can customize the chatbox by editing `src/lib/GeminiChatbox.svelte`:

- **Greeting Message**: Line ~41 (`addSystemMessage(...)`)
- **System Prompt**: Lines ~14-39 (update the `SYSTEM_PROMPT` constant)
- **Colors**: Line ~156 onwards (Tailwind classes in the template)
- **Position**: Line ~152 (`bottom-6 right-6` for bottom-right positioning)

## API Usage

The chatbox makes requests to Google's Generative Language API:

- Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
- Model: `gemini-pro`
- Temperature: 0.7 (balanced creativity and consistency)
- Max tokens: 1024

Monitor your API usage at [Google AI Studio](https://ai.google.dev/)
