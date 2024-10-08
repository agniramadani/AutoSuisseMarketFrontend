import React, { useState } from 'react';
import './ComponentsStyle.css';

function SearchForm() {
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');

    const makes = ['Mercedes-Benz', 'BMW', 'AUDI'];
    const models = ['Model1', 'Model2', 'Model3'];
    const years = ['2024', '2023', '2022'];
    const prices = ['22000', '18500', '10200'];

    const buttonSearchHandler = (setter) => (value) => {
        setter(value);
    };

    const renderDropdown = (label, options, setter) => (
        <div className="col-lg-3 col-md-6 mb-3">
            <div className="dropdown">
                <button
                    className="btn btn-light dropdown-toggle"
                    type="button"
                    id={`dropdownMenuButton-${label}`}
                    data-bs-toggle="dropdown"
                    style={{width: '100%'}}
                >
                    {label}
                </button>
                <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${label}`} style={{ width: '100%'}}>
                    {options.map((option, index) => (
                        <li key={index}>
                            <a
                                className="dropdown-item"
                                onClick={() => buttonSearchHandler(setter)(option)}
                            >
                                {option}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
    
    return (
      <div className="search-form container">
        <div className="row">
            {renderDropdown(selectedMake || 'MARKE', makes, setSelectedMake)}
            {renderDropdown(selectedModel || 'MODELL', models, setSelectedModel)}
            {renderDropdown(selectedYear || 'JAHR', years, setSelectedYear)}
            {renderDropdown(selectedPrice || 'PREIS', prices, setSelectedPrice)}
        </div>
        <div>
            <button style={{width: '100%'}} type="button" class="btn btn-outline-light">SUCHE</button>
        </div>
    </div>
    )
  }
  
  export default SearchForm
