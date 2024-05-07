"use client";
import { useState, useEffect } from "react";

export default function Guest() {
  const [success, setSuccess] = useState({});
  const [errorMessage, setErrorMessage] = useState(``);

  const handleSubmit = async (e) => {
    // prevent the HTML form from actually submitting
    e.preventDefault();
    const formData = {
      fullName: e.target.fullName.value,
      phone: e.target.phone.value,
    };

    console.log(formData);

    try {
      // send the request to the server api to validate
      const response = await fetch(`http://localhost:3001/guest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status !== "success") {
        // if data isn't valid or db save fails, an error message displays
        setErrorMessage(data.message);
      } else {
        // update success variable to display success page
        console.log("success");
        setSuccess(data);
      }
    } catch (err) {
      // throw an error
      console.error(err);
    }
  };

  if (!success.status)
    return (
      <div className="guest">
        <h1 className="guest__title">Welcome</h1>
        {errorMessage ? <p className="error">{errorMessage}</p> : ""}
        <p className="guest__subtitle">
          Please provide your full name and phone number.
        </p>
        <form onSubmit={handleSubmit}>
          <label>Full Name: </label>
          <input type="text" name="fullName" placeholder="Full Name" />
          <br />
          <br />
          <label>Phone: </label>
          <input type="text" name="phone" placeholder="Phone" />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  else
    return (
      <div>
        <p>Saved!</p>
        <h1 className="guest__title">Welcome</h1>
        <h2>{success.data.name}</h2>
      </div>
    );
}
