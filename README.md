# Camping-Node-API

Node.js/Express.js backend for camping-app integrated with firebase &amp; mongodb

## Installation guide

1. Clone the project:

```bash
git clone https://github.com/GGO-web/Camping-Node-API.git
```

or download and extract files

```bash
https://github.com/GGO-web/Camping-Node-API/archive/refs/heads/main.zip
```

2. Install NodeJS dependencies (only for development):

```bash
npm install
```

3. Define 2 private files before execution:

- ```.env``` in the root folder:

```
PORT=8080
MONGODB_CONNECTION=MONGODB_CONNECTION_STRING
```

- Create "private" folder in the root and create firebase admin sdk json credentials ``` camping-app-66565-firebase-adminsdk-y5t5h-cff9822bb7.json ``` with similar structure:

```json
{
  "type": "service_account",
  "project_id": "camping-app-66565",
  "private_key_id": "PRIVATE_KEY_ID",
  "private_key": "PRIVATE_KEY_CONTENT",
  "client_email": "FIREBASE_CLIENT_EMAIL",
  "client_id": "FIREBASE_CLIENT_ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "CLIENT_CERTIFICATE_URL"
}
```

How to create firebase admin SDK account?

[Read this tutorial (Step 2: Creating Service Account to communicate with Firebase)](https://enappd.com/blog/firebase-admin-sdk-nodejs/184/)

4. Run Camping API:

```bash
npm run server
```

If you have any troubles try to modify **src/index.ts** file to get your created *private/firebase-admin-sdk.json* config instead of a predefined name (camping-app-66565-firebase-adminsdk-y5t5h-cff9822bb7.json) and rebuild the app using ```npm run build``` command

## Documentation

- To reach documentation in browser follow this link <https://petstore.swagger.io/#/>

- Then paste the link below to the Explore panel:

```txt
https://raw.githubusercontent.com/GGO-web/Camping-Node-API/main/swagger.yaml
```

- Want to get API docs locally? Just follow the link after server startup:

[Camping API Documentation -> https://localhost:8080/api-docs](https://localhost:8080/api-docs)
