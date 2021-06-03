import React from "react";

import { useState } from "react";
import { useEffect } from "react";

const DataShow = () => {
  const [user, setUser] = useState([]);

  console.log({ user });
  useEffect(() => {
    const url = "http://localhost:5200/api/user/users";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setUser(data.result));
  }, []);

  return (
    <div className="text-center">
      {/* {user.map((user) => {
        return (
          <div
            key={user._id}
            style={{ border: "1px solid red", margin: "10px" }}
          >
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>{user.role}</li>
            <li>{user._id}</li>
            <img
              alt=""
              style={{ height: "150px", borderRadius: "5px" }}
              src={`${user.image}`}
            />
          </div>
        );
      })} */}
    </div>
  );
};

export default DataShow;
