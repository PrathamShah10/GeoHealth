import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNIN_HOSPITAL } from "../redux/query/user";
import { useNavigate } from "react-router";
const HospitalLogin = () => {
  const [hospitalLogin, { data }] = useMutation(SIGNIN_HOSPITAL);
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const loginHospital = () => {
    hospitalLogin({
      variables: {
        signDetails: {
          name,
        },
      },
    });
  };

  useEffect(() => {
    const res = data?.signInHospital;
    if (res) {
      if (res.error) {
        return;
      }
      localStorage.setItem("token", res.token);
      const { _id } = res.userDetails;
      localStorage.setItem("hospital", JSON.stringify({ _id }));
      navigate("/hospital-home");
    }
  }, [data]);
  return (
    <div>
      hospital Name:
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={loginHospital}>Login</button>
    </div>
  );
};

export default HospitalLogin;
