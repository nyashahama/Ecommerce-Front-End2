import React from "react";
import { useAuth } from "../../AuthContext";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>
      <div className="card">
        <div className="card-body">
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
