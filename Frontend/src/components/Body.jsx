import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { addUser } from "../utils/userSlice";
import api from "../utils/axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user");
        dispatch(addUser(res.data));
      } catch (err) {
        navigate("/login");
      } finally {
        setAuthChecked(true);
      }
    };
    fetchUser();
  }, [dispatch, navigate]);

  if (!authChecked) return <div>Loading the feed ..</div>;

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;