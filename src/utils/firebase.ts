import admin from "firebase-admin";

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(
    require("../../private/camping-app-66565-firebase-adminsdk-y5t5h-cff9822bb7.json")
  ),
});
