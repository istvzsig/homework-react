import React, { useState } from "react";
import useUsers from "@/components/users/useUsers";
import { User } from "@/models/user.model";
import { Colors } from "@/models/color.model";

const UsersOrganizer: React.FC = () => {
  const [showProcessed, setShowProcessed] = useState(false);
  const {
    error,
    getUsersByDepartment,
    getUsersGroupedTraits,
    getTotalUsersCountByDepartment,
  } = useUsers();

  if (error) {
    return <div>{error.message}</div>;
  }

  const usersByDepartment = getUsersByDepartment();

  const renderUsersByDepartment = () => {
    return Object.entries(getUsersGroupedTraits(usersByDepartment)).map(
      ([department, values]) => (
        <div key={department} className="department-section">
          <h2>
            {`${department}`}: {getTotalUsersCountByDepartment(values)}
          </h2>
          <p>Males: {values.male}</p>
          <p>Females: {values.female}</p>
          <p>Ages between: {values.ageRange}</p>
          <p>Hair Colors: </p>
          {values.hair &&
            Object.keys(values.hair).map((hairColor: string) => {
              return (
                <div key={hairColor}>
                  <p>
                    <span
                      style={{
                        display: "inline-block",
                        width: "15px",
                        height: "15px",
                        backgroundColor: Colors[hairColor],
                        marginRight: "5px",
                        border: hairColor === "White" ? "2px solid black" : "",
                      }}
                    ></span>
                    {hairColor}: {values.hair[hairColor]}
                  </p>
                </div>
              );
            })}
        </div>
      )
    );
  };

  const renderProcessedUsersByDepartment = () => {
    return Object.entries(usersByDepartment).map(([department, users]) => (
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
    ));
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
