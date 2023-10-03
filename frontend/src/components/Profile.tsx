import React from "react";
import { useAppSelector } from "../hooks/redux";
import styles from "../css/profile.module.css"; // Import the CSS module

const Profile = () => {
  const { user, diseases } = useAppSelector((state) => state.user);

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-card"]}>
        <div className={styles["profile-header"]}>
          <h2>Your Profile</h2>
        </div>
        <div className={styles["profile-info"]}>
          <div className={styles["info-item"]}>
            <strong>Name:</strong> {user?.name}
          </div>
          <div className={styles["info-item"]}>
            <strong>Username:</strong> {user?.username}
          </div>
          <div className={styles["info-item"]}>
            <strong>Email:</strong> {user?.email}
          </div>
        </div>
        <div className={styles["disease-list"]}>
          <h2>Your Diseases</h2>
          <ul>
            {diseases?.map((disease, i) => (
              <li key={i}>{disease}</li>
            ))}
          </ul>
        </div>
        <button className={styles["edit-profile-button"]}>Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
