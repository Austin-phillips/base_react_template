import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Profile() {
  const user = useContext(UserContext);

  return (
    <div>
      <h3>User is {user.isAuthenticated ? "Logged In" : "Logged Out"}</h3>
      {user.isAuthenticated && (
        <>
          <p>Email is {user.email}</p>
        </>
      )}
    </div>
  );
}
