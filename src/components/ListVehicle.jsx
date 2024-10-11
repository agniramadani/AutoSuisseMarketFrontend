import { useEffect, useState } from "react";
import { API_BASE_URL } from "../apiConfig.jsx";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";

const ListVehicle = () => {
    const [searchParams] = useSearchParams();
    const [vehicles, setVehicles] = useState([]);
    
    useEffect(() => {
        // Create an object from searchParams
        const paramsObj = Object.fromEntries([...searchParams.entries()]);
    
        // Filter out null or undefined values dynamically
        const filteredParams = Object.fromEntries(
            Object.entries(paramsObj).filter(([key, value]) => value !== "null" && value !== null && value !== "")
        );

        const fetchVehicles = async () => {
            // Convert filtered params into a query string
            const queryString = new URLSearchParams(filteredParams).toString();
    
            // Dynamically build the fetch URL based on available params
            const response = await fetch(`${API_BASE_URL}/vehicle/search/?${queryString}`);
            const data = await response.json();
            setVehicles(data);
        };
    
        fetchVehicles();
    }, [searchParams]);

  return (
    <>
    {Navbar()}
    <div>
        {
        vehicles.map((vehicle) => (
            <div key={vehicle.id} className="card shadow-sm mx-auto my-4" style={{ width: '90%', maxWidth: '800px', border: '1px solid #ddd' }}>
                <div className="card-header text-center">
                    <h5 className="card-title m-0">{vehicle.make} {vehicle.model}</h5>
                </div>
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div id={`carousel-${vehicle.id}`} className="carousel slide" data-bs-ride="false">
                                <div className="carousel-inner">
                                    {vehicle.images && vehicle.images.length > 0 ? (
                                        vehicle.images.map((image, index) => (
                                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                                <img
                                                    src={`${API_BASE_URL}/${image.image}`}
                                                    className="d-block w-100"
                                                    alt={`${vehicle.make} ${vehicle.model} image ${index + 1}`}
                                                    style={{ height: '250px', objectFit: 'cover', borderRadius: '10px' }}
                                                />
                                            </div>
                                        ))
                                    ) : null}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${vehicle.id}`} data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${vehicle.id}`} data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        {/* Vehicle Information on the right */}
                        <div className="col-lg-6 col-md-12 text-center text-md-start mt-3 mt-md-0">
                            <p className="card-text"><strong>Jahr:</strong> {vehicle.year} <strong>Preis:</strong> {vehicle.price} CHF</p>
                            <p className="card-text"><strong>Kilometerstand:</strong> {vehicle.mileage} km <strong>Farbe:</strong> {vehicle.color}</p>
                            <p className="card-text"><strong>Kraftstoffart:</strong> {vehicle.fuel_type} <strong>Getriebe:</strong> {vehicle.transmission}</p>
                        </div>
                    </div>
                </div>
            </div>
        ))                                           
        }
    </div>
    </>
  );
};

export default ListVehicle;
