import React from "react";
import { useNavigate } from "react-router-dom";

export default function Doctor({ doctor }) {
    const navigate = useNavigate()
  return (
    <div className="card p-2 cursor-pointer doctor" onClick={()=> navigate(`/book-appointment/${doctor._id}`)}>
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number: </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Address: </b>
        {doctor.address}
      </p>
      <p>
        <b>Fee Per Visit: </b>
        {doctor.feePerConsultation}
      </p>
    </div>
  );
}
