import React from 'react';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Trips = () => {

  //protect fron unauthorized to login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [])

    const [trip, setTrip] = useState({
        destination: "",
        country: "",
        city: "",
        startDate: "",
        endDate: "",
        budget: "",
        transport: "",
        hotelName: "",
        hotelAddress: "",
        totalDays: "",
        description: "",
        status: "Planned"
    });
//pagination
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

    const [editId, setEditId] = useState(null);
     // Search
  const [search, setSearch] = useState("");
    const [trips, setTrips] = useState([]);
    
const gettrip = async () => {

    const response = await fetch(
        `http://localhost:4001/plan-my-trip/viewtrip?page=${page}`,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
    );

    const data = await response.json();

    console.log(data);

    setTrips(data.alltrips || []);
    setTotalPages(data.totalPages || 1);
}
    
    
   useEffect(() => {
    gettrip();
}, [page]);
    
    useEffect(() => {
      localStorage.setItem("tripForm", JSON.stringify(trip));
    }, [trip]);
    
    useEffect(() => {
      const savedTrip = localStorage.getItem("tripForm");
    
      if (savedTrip) {
        setTrip(JSON.parse(savedTrip));
      }
    }, []);
    
    const addtrip = async()=>{
    
    if(editId){
      const response = await fetch (`http://localhost:4001/plan-my-trip/updatetrip/${editId}`,
        {
          method : 'PUT',
          headers :
          {
            'Content-type' : 'application/json',
                Authorization: localStorage.getItem("token")
          },
              body: JSON.stringify(trip)
      })
      const data = await response.json();
       console.log(data);
          if (data.success) {
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
          setEditId(null);
    }
    else{
      const response = await fetch('http://localhost:4001/plan-my-trip/createtrip',
        {
          method : 'POST',
          headers : {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token")
    
          },
              body: JSON.stringify(trip)
        }
      )
      const data = await response.json();
      console.log(data);
      if (data.success) {
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
    }
    await gettrip();
    
    setTrip({
            destination: "",
            country: "",
            city: "",
            startDate: "",
            endDate: "",
            budget: "",
            transport: "",
            hotelName: "",
            hotelAddress: "",
            totalDays: "",
            description: "",
            status: "Planned"
        }
      );
      localStorage.removeItem("tripForm");
    }
    
    
      function handleEdit(tripData) {
        setTrip({
            destination: tripData.destination,
            country: tripData.country,
            city: tripData.city,
            startDate: tripData.startDate,
            endDate: tripData.endDate,
            budget: tripData.budget,
            transport: tripData.transport,
            hotelName: tripData.hotelName,
            hotelAddress: tripData.hotelAddress,
            totalDays: tripData.totalDays,
            description: tripData.description,
            status: tripData.status
        });
    
        setEditId(tripData._id);
    }
    
    async function handleDelete(id){
       const response = await fetch(`http://localhost:4001/plan-my-trip/deletetrip/${id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        const data = await response.json();
        console.log(data);
    
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        await gettrip();
      }


       // Sort
        const [sortBy, setSortBy] = useState("");
      
      
      const filteredTrips = trips.filter((trip) =>
          trip.country.toLowerCase().includes(search.toLowerCase())
      );
      
      const sortedTrips = [...filteredTrips];
      
      if (sortBy === "highBudget") {
          sortedTrips.sort((a, b) => b.budget - a.budget);
      }
      
      if (sortBy === "lowBudget") {
          sortedTrips.sort((a, b) => a.budget - b.budget);
      }
      
      if (sortBy === "az") {
          sortedTrips.sort((a, b) =>
              a.destination.localeCompare(b.destination)
          );
      }
      
      if (sortBy === "za") {
          sortedTrips.sort((a, b) =>
              b.destination.localeCompare(a.destination)
          );
      }
      
      if (sortBy === "newest") {
          sortedTrips.sort((a, b) =>
              new Date(b.startDate) - new Date(a.startDate)
          );
      }
      
      if (sortBy === "oldest") {
          sortedTrips.sort((a, b) =>
              new Date(a.startDate) - new Date(b.startDate)
          );
      }
      
      const handleChange = (e) => {
    const { name, value } = e.target;

    setTrip({
        ...trip,
        [name]: value
    });
};
    

  return (
    <>
        {/* Trip Form */}

      <h2>{editId ? "Update Trip" : "Add Trip"}</h2>

      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={trip.destination}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="country"
        placeholder="Country"
        value={trip.country}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={trip.city}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="date"
        name="startDate"
        value={trip.startDate}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="date"
        name="endDate"
        value={trip.endDate}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="budget"
        placeholder="Budget"
        value={trip.budget}
        onChange={handleChange}
      />

      <br /><br />

      <select
        name="transport"
        value={trip.transport}
        onChange={handleChange}
      >
        <option value="">Select Transport</option>
        <option value="Flight">Flight</option>
        <option value="Train">Train</option>
        <option value="Bus">Bus</option>
        <option value="Car">Car</option>
        <option value="Bike">Bike</option>
      </select>

      <br /><br />

      <input
        type="text"
        name="hotelName"
        placeholder="Hotel Name"
        value={trip.hotelName}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="hotelAddress"
        placeholder="Hotel Address"
        value={trip.hotelAddress}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="totalDays"
        placeholder="Total Days"
        value={trip.totalDays}
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="description"
        placeholder="Description"
        value={trip.description}
        onChange={handleChange}
      />

      <br /><br />

      <select
        name="status"
        value={trip.status}
        onChange={handleChange}
      >
        <option value="Planned">Planned</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <br /><br />

      <button onClick={addtrip}>
        {editId ? "Update Trip" : "Add Trip"}
      </button>

      <hr />


      {/* Search */}

      <h2>Search Trip</h2>

      <input
        type="text"
        placeholder="Search by Country"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      {/* Sort */}

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="newest">Newest Trip</option>
        <option value="oldest">Oldest Trip</option>
        <option value="highBudget">Highest Budget</option>
        <option value="lowBudget">Lowest Budget</option>
        <option value="az">Destination A-Z</option>
        <option value="za">Destination Z-A</option>
      </select>

      <br /><br />

      {/* Trips */}

      {
        sortedTrips.map((trip) => (
          <div key={trip._id}>

            <p><b>Destination:</b> {trip.destination}</p>
            <p><b>Country:</b> {trip.country}</p>
            <p><b>City:</b> {trip.city}</p>
            <p><b>Start Date:</b> {trip.startDate}</p>
            <p><b>End Date:</b> {trip.endDate}</p>
            <p><b>Budget:</b> ₹{trip.budget}</p>
            <p><b>Transport:</b> {trip.transport}</p>
            <p><b>Hotel:</b> {trip.hotelName}</p>
            <p><b>Hotel Address:</b> {trip.hotelAddress}</p>
            <p><b>Total Days:</b> {trip.totalDays}</p>
            <p><b>Description:</b> {trip.description}</p>
            <p><b>Status:</b> {trip.status}</p>

            <button onClick={() => handleEdit(trip)}>
              Edit
            </button>

            <button onClick={() => handleDelete(trip._id)}>
              Delete
            </button>

            <hr />

          </div>
        ))
      }
      <br />

<button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
>
    Previous
</button>

&nbsp;&nbsp;

<span>
    Page {page} of {totalPages}
</span>

&nbsp;&nbsp;

<button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
>
    Next
</button>
    </>
  )
}

export default Trips
