import React, { useState } from "react";
import useUsers from "@/components/users/useUsers";
import { User } from "@/models/user.model";

const UsersOrganizer: React.FC = () => {
  const { error, getUsersByDepartment, updateUsersByDepartment } = useUsers();
  const [showProcessed, setShowProcessed] = useState(false);

  if (error) {
    return <div>{error.message}</div>;
  }

  const groupedUsersByDepartment = getUsersByDepartment();

  const renderUsersByDepartment = () => {
    return Object.entries(
      updateUsersByDepartment(groupedUsersByDepartment)
    ).map(([department, values]) => (
      <div key={department} className="department-section">
        <h2>{`${department}`}:</h2>
        <p>Males: {values.male}</p>
        <p>Females: {values.female}</p>
        <p>Ages between: {values.ageRange}</p>
        <p>Hair Colors: </p>
        {values.hair &&
          Object.keys(values.hair).map((hairColor: string) => {
            return (
              <div key={hairColor}>
                {hairColor}: {values.hair[hairColor]}
              </div>
            );
          })}
      </div>
    ));
  };

  const renderProcessedUsersByDepartment = () => {
    return Object.entries(groupedUsersByDepartment).map(
      ([department, users]) => (
        <div key={department} className="department-section">
          <h2>{`${department}: ${users.length}`}</h2>
          {users.map((user: User) => (
            <div className="user-card" key={user.id}>
              <h3>{`${user.firstName} ${user.lastName}`}</h3>
              <p>Gender: {user.gender}</p>
              <p>Age: {user.age}</p>
              <p>Department: {user.company.department}</p>
            </div>
          ))}
        </div>
      )
    );
  };

  return (
    <div className="users-manager">
      <p className="process-data-button">
        <button
          onClick={() => {
            setShowProcessed((prev) => !prev);
          }}
        >
          {!showProcessed ? "Show By Department" : "Process Data"}
        </button>
      </p>
      <div className="department-list">
        {!showProcessed
          ? renderUsersByDepartment()
          : renderProcessedUsersByDepartment()}
      </div>
    </div>
  );
};

export default UsersOrganizer;
