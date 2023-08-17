## Demo: [https://whisper-wave.vercel.app/](https://whisper-wave.vercel.app/)
![upload_media1.png](/assets/upload_media1.png)
![people1.png](/assets/people1.png)
![people2.png](/assets/people2.png)
![change_profile_info.png](/assets/change_profile_info.png)
![people3.png](/assets/people3.png)
![people4.png](/assets/people4.png)
![upload_media.png](/assets/upload_media.png)

## Getting Started

`First`, install the dependencies, by running this command in the root directory:

```bash
npm install
```

`Second`, Fill in the environment variables in the `.env` file in the root directory

- Connect to your MongoDB database and add the connection string to the `MONGODB_URI` variable
![diagonal-vs-non-diagonal](/assets/mongo.png)
*Note:* Dont forget to add the database name to the end of the connection string

- excute this command to apply the migrations

    ```bash
    npx prisma db push
    ```

- Create a Pusher account and add your credentials to the `PUSHER_APP_ID`, `PUSHER_APP_KEY`, and `PUSHER_APP_SECRET` variables
*Note:* The app won't work without the pusher credentials

- Create a Cloudinary account and add your credentials to the `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` variables [Tutorial Link](https://cloudinary.com/documentation/node_integration#configuration)
  - make sure that you create an unsigned upload preset and update the `uploadPreset` variable in the `/app/components/sidebar/SettingsModal.tsx` file and in `/app/conversations/[conversationId]/components/Form.tsx` file with it
    ![preset image](/assets/preset.png)
    *Note:* The app won't work without the pusher credentials

- Create a Github OAuth app and add your credentials to the `GITHUB_ID` and `GITHUB_SECRET` variables [Tutorial Link](https://docs.github.com/en/developers/apps/creating-an-oauth-app)

- Create a Google OAuth app and add your credentials to the `GOOGLE_ID` and `GOOGLE_SECRET` variables [Tutorial Link](https://support.google.com/cloud/answer/6158849?hl=en)

`Third`, you can run the application both the frontend and the backend concurrently, in development mode by running:

```bash
npm run build
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Features

- Real-time messaging using Pusher
- Message notifications and alerts
- Tailwind design for sleek UI
- Tailwind animations and transition effects
- Full responsiveness for all devices
- Credential authentication with NextAuth
- Google authentication integration
- Github authentication integration
- File and image upload using Cloudinary CDN
- Client form validation and handling using react-hook-form
- Server error handling with react-toast
- Message read receipts
- Online/offline user status
- Group chats and one-on-one messaging
- Message attachments and file sharing
- User profile customization and settings
- How to write POST, GET, and DELETE routes in route handlers (app/api)
- How to fetch data in server React components by directly accessing the database (WITHOUT API! like Magic!)
- Handling relations between Server and Child components in a real-time environment
- Creating and managing chat rooms and channels
