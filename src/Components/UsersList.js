import React from "react";

const UsersList = ({ users, setUserSelected, removeUser }) => {
  return (
    <div className="list_user_card">
      {users.map((user) => (
        <ul className="list_user_info" key={user.id}>
          <div>
            <li>
              <b>
                {user.first_name} {user.last_name}
              </b>
            </li>
            <li>{user.email}</li>
            <li>
              <i className="fa-solid fa-cake-candles"></i>{" "}
              {user.birthday}
            </li>
          </div>
          <div>
            <button onClick={() => setUserSelected(user)}>
              <b>
                <i className="fa-solid fa-pen-to-square"></i>
              </b>
            </button>
            <br/>
            <button id="btn-red" onClick={() => removeUser(user.id)}>
              <b>
                <i className="fa-solid fa-trash-can"></i>
              </b>
            </button>
            
          </div>
        </ul>
      ))}
    </div>
  );
};

export default UsersList;
