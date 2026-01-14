# Jugantor Farewell - Firebase Setup Guide

This guide will walk you through setting up Firebase for the real-time message board feature.

## Step 1: Create a Firebase Project

1. **Go to Firebase Console**
   - Visit: <https://console.firebase.google.com/>
   - Sign in with your Google account

2. **Create New Project**
   - Click "Add project"
   - Enter project name: `jugantor-farewell` (or any name you prefer)
   - Click "Continue"
   - Disable Google Analytics (not needed for this project)
   - Click "Create project"
   - Wait for project creation to complete

## Step 2: Set Up Realtime Database

1. **Navigate to Realtime Database**
   - In the left sidebar, click "Build" → "Realtime Database"
   - Click "Create Database"

2. **Choose Database Location**
   - Select a location close to you (e.g., `asia-southeast1` for Bangladesh)
   - Click "Next"

3. **Set Security Rules**
   - Choose "Start in **test mode**" (we'll update rules later)
   - Click "Enable"

4. **Update Security Rules** (Important!)
   - Once the database is created, click on the "Rules" tab
   - Replace the rules with:

   ```json
   {
     "rules": {
       "messages": {
         ".read": true,
         ".write": true,
         ".validate": "newData.hasChildren(['name', 'message', 'timestamp'])"
       }
     }
   }
   ```

   - Click "Publish"

## Step 3: Get Firebase Configuration

1. **Go to Project Settings**
   - Click the gear icon ⚙️ next to "Project Overview"
   - Select "Project settings"

2. **Add a Web App**
   - Scroll down to "Your apps"
   - Click the web icon `</>`
   - Enter app nickname: `Jugantor Farewell Web`
   - **Don't** check "Also set up Firebase Hosting"
   - Click "Register app"

3. **Copy Configuration**
   - You'll see a `firebaseConfig` object
   - **Copy all the values** (keep this tab open)

## Step 4: Update Your Project

1. **Open the Firebase Config File**
   - Navigate to: `src/firebase/config.js`

2. **Replace Placeholders**
   - Replace these values with your Firebase configuration:

   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY_HERE",              // Replace
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // Replace
     databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",  // Replace
     projectId: "YOUR_PROJECT_ID",              // Replace
     storageBucket: "YOUR_PROJECT_ID.appspot.com",  // Replace
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // Replace
     appId: "YOUR_APP_ID"                      // Replace
   };
   ```

3. **Save the File**

## Step 5: Test Locally

1. **Run the Development Server**

   ```bash
   npm run dev
   ```

2. **Open the Website**
   - Visit: <http://localhost:5173/>

3. **Test Message Submission**
   - Scroll to the "Leave Your Message" section
   - Fill in your name and a test message
   - Click "Send Message"
   - You should see your message appear below!

4. **Verify in Firebase Console**
   - Go back to Firebase Console → Realtime Database
   - You should see your message data appear in the database

## Troubleshooting

### Error: "Firebase app not properly initialized"

- Double-check that all values in `config.js` are correctly copied
- Make sure there are no extra quotes or spaces

### Messages not appearing

- Check browser console for errors (F12 → Console tab)
- Verify database rules are set to allow read/write
- Make sure you're connected to the internet

### "Permission denied" error

- Go to Firebase Console → Realtime Database → Rules
- Make sure rules allow `.read: true` and `.write: true` under `messages`

## Security Note

The current setup allows anyone to read and write messages. This is intentional for this farewell website, as you want people to be able to leave messages freely.

After the farewell event (Jan 16), if you want to prevent new messages, you can update the rules to:

```json
{
  "rules": {
    "messages": {
      ".read": true,
      ".write": false
    }
  }
}
```

This will allow viewing past messages but prevent new ones from being added.

## Need Help?

If you encounter any issues:

1. Check the Firebase Console for error messages
2. Check your browser's console (F12)
3. Make sure all Firebase configuration values are correct
4. Ensure you're using the Realtime Database (not Firestore)

---

**Once Firebase is set up and working, you're ready to deploy to GitHub Pages!**
