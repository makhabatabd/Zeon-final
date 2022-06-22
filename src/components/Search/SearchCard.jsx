import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchCard = ({ value, clearInput, setShowInput }) => {
    const navigate = useNavigate()
    const handleDetails = () => {
            if (value.type == "summer") {
                navigate(`/details/${value.id}`)
            } else if (value.type == "hit") {
                 navigate(`/hitdetails/${value.id}`)
            } else if (value.type == "brandnew") {
                navigate(`/newdetails/${value.id}`)
            }
    }
    function find() {
        handleDetails()
        clearInput()
        setShowInput(false)
    }

    return (
            <span key={value.id} onClick={find} className='data-item' >
            {value.title}
            </span>
    );
};

export default SearchCard;