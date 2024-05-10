import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import NotFound from "./NotFound";
import spinner from "../img/Spinner-2.gif";

const PersonDetail = () => {
  //   let { state:person } = useLocation();
  let navigate = useNavigate();
  let { id } = useParams();
  const [person, setPerson] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const getPerson = () => {
    axios(`https://reqres.in/api/users/${id}`)
      .then((res) => setPerson(res.data.data))
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  };
  
    getPerson();
},[id]);
  if (error) {
    return <NotFound />;
  } else if (loading) {
    return (
      <div className="text-center mt-4">
        <img src={spinner} alt="spinner" />
      </div>
    );
  }
  return (
    <div>
      <div className="container text-center">
        <h3>
          {person?.first_name} {person?.last_name}
        </h3>
        <img className="rounded" src={person?.avatar} alt="" />

        <p>{person?.email}</p>
        <button onClick={() => navigate("/")} className="btn btn-success me-2">
          Go Home
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-warning">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PersonDetail;
