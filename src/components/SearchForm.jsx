import React, { useState, useEffect, useMemo } from 'react';
import { API_BASE_URL } from "../apiConfig.jsx";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar.jsx"
import './ComponentsStyle.css';
import axios from 'axios';

const SearchForm = () =>  {
    const [selectedMake, setSelectedMake] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]); 

    const navigate = useNavigate();
    
    // Generate years from 2004 to 2024
    const years = useMemo(() => Array.from({ length: 21 }, (_, i) => `${2024 - i}`), []);

    // Generate prices from 1k to 200k by 10k
    const prices = useMemo(() => Array.from({ length: 20 }, (_, i) => `${(i + 1) * 10000}`), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch makes
                const makesResponse = await axios.get(`${API_BASE_URL}/vehicle/make/`);
                setMakes(makesResponse.data);
                
                // Fetch models if a make is selected
                if (selectedMake) {
                    const modelsResponse = await axios.get(`${API_BASE_URL}/vehicle/model/${selectedMake}/`);
                    setModels(modelsResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedMake]);

    const renderDropdown = (label, options, setter, disabled) => (
        <div className="col-lg-3 col-md-6 mb-3">
            <div className="dropdown">
                <button
                    className="btn btn-light dropdown-toggle"
                    type="button"
                    id={`dropdownMenuButton-${label}`}
                    data-bs-toggle="dropdown"
                    style={{ width: '100%' }}
                    disabled={disabled}
                >
                    {label}
                </button>
                <ul className="dropdown-menu" 
                    aria-labelledby={`dropdownMenuButton-${label}`} 
                    style={{
                        width: '100%',
                        maxHeight: '200px', 
                        overflowY: 'auto',
                    }}>
                    {options.map((option, index) => (
                        <li key={index}>
                            <a
                                className="dropdown-item"
                                onClick={() => setter(option)}
                            >
                                {option}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );   

    const handleSearch = () => {
        const queryParams = new URLSearchParams();
        // Query will include only non-null parameters from selected values
        if (selectedMake) queryParams.append('make', selectedMake);
        if (selectedModel) queryParams.append('model', selectedModel);
        if (selectedYear) queryParams.append('year', selectedYear);
        if (selectedPrice) queryParams.append('price', selectedPrice);
    
        navigate(`/search?${queryParams.toString()}`);
    };

    return (
        <>
            {Navbar()}
            <div className="search-form container">
                <div className="row">
                    {renderDropdown(selectedMake || 'MARKE', makes.map(make => make.make), setSelectedMake)}
                    {renderDropdown(
                        selectedModel || 'MODELL', 
                        models.map(model => model.model),
                        setSelectedModel,
                        !selectedMake // Disable if no make is selected
                    )}
                    {renderDropdown(selectedYear ? `AB ${selectedYear}` : 'JAHR', years, setSelectedYear)}
                    {renderDropdown(selectedPrice ? `AB ${selectedPrice} CH` : 'PREIS', prices, setSelectedPrice)}
                </div>
                <div>
                    <button
                        style={{ width: '100%' }}
                        type="button"
                        className="btn btn-outline-light"
                        onClick={handleSearch}
                    >
                        SUCHE
                    </button>
                </div>
            </div>
        </>
    );
}

export default SearchForm;
