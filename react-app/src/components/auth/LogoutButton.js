import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogoutButton = ({socket}) => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    if(localStorage.getItem('lastPage')){
      localStorage.removeItem('lastPage')
    }
    socket.disconnect()
    dispatch(logout());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
