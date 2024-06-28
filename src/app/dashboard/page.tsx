"use client";
import { useEffect, useState } from "react";
import { getCookie } from "../../utils/cookies";

const Dashboard = () => {
  const [accessToken, setAccessToken] = useState("");
  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    const accessToken = getCookie("access_token");
    const idToken = getCookie("id_token");

    if (accessToken && idToken) {
      setAccessToken(accessToken);
      setIdToken(idToken);
    } else {
      window.location.href = "/"; // Redirect to login if no tokens are found
    }
  }, []);

  const handleOpenSalesline = () => {
    const url = `https://salesline.quantaco.co?accessToken=${accessToken}&idToken=${idToken}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <h1>Protected Dashboard</h1>
      <p>You can see this because you are authenticated.</p>
      <button
        onClick={handleOpenSalesline}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 active:bg-blue-900"
      >
        Open Salesline
      </button>
    </div>
  );
};

export default Dashboard;
