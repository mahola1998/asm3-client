import { Navigate, Outlet, json, useLoaderData } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";
import ChatBox from "./ChatBox";
import { useEffect, useState } from "react";

const Layout = () => {
  const userData = useLoaderData();
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userData.loggedIn) {
      setUser(userData.user.fullname);
      setIsLoggedIn(userData.loggedIn);
    }
  }, [userData]);

  return (
    <div>
      <MainNavigation
        currentUser={user}
        isLoggedIn={isLoggedIn}
        userData={userData}
        setIsLoggedIn={setIsLoggedIn}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
      <div className="fixed-bottom d-flex justify-content-end p-0">
        <ChatBox user={userData} />
      </div>
    </div>
  );
};

export default Layout;

export async function loader() {
  const response = await fetch(
    "https://asm3-sever-app.onrender.com/auth/check-login",
    {
      credentials: "include",
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Could not fetch login. Server responded with status " + response.status
    );
  }

  const resData = await response.json();
  return resData;
}
