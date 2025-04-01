import React from "react";

import useUsers from "../../hooks/useUsers";

const UsersOrganizer: React.FC = () => {
  const { getUserByDepartment } = useUsers();

  const groupedUserByDepartment = getUserByDepartment();

  return (
    <div className="users-manager">
      <div className="department-list">
        {Object.entries(groupedUserByDepartment).map(([department, users]) => (
          <div key={department} className="department-section">
            <h2>{`${department}: ${users.length}`}</h2>
            {users.map((user) => (
              <div className="user-card" key={user.id}>
                <h3>{`${user.firstName} ${user.lastName}`}</h3>
                <p>Gender: {user.gender}</p>
                <p>Age: {user.age}</p>
                <p>Department: {user.company.department}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersOrganizer;
