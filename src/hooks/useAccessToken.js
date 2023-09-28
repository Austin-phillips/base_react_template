import { useState } from "react";

export const useAccessToken = () => {
  const [accessToken] = useState(() => {
    try {
      const firebaseStorage = localStorage.getItem(
        `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
      );

      if (firebaseStorage) {
        const parsedValues = JSON.parse(firebaseStorage);
        if (
          parsedValues.stsTokenManager &&
          parsedValues.stsTokenManager.accessToken
        ) {
          return parsedValues.stsTokenManager.accessToken;
        }
        return null;
      }

      return null;
    } catch (err) {
      return null;
    }
  });

  return [accessToken];
};
