import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { allContext } from '../../context/AllContext';
import SearchIcon from '@mui/icons-material/Search';
import "./Search.css"
import { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchCard from './SearchCard';


const Search = () => {
    const { getAllProducts, data } = useContext(allContext)
    const [showInput, setShowInput] =useState(false)
    useEffect(() => {
        getAllProducts()
    }, [])
    const allData = data.reduce((acc, val) => acc.concat(val), [])
    const [filteredData, setFilteredData] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const ref = useRef()

    const handleFilter = (event) => {
        setShow(true)
        const searchWord = event.target.value;
        setSearchValue(searchWord);
        const newFilter = allData.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setSearchValue("");
        ref.current.value = ""
    };
    
    const handleNavigate = (e) => {
        navigate(`/searchpage/${searchValue}`)
        clearInput()
        setShow(false)
    }

    const inputHandler = () => {
        if (searchValue !== "") {
            setShow(true)
        }
    }

    const keyHandler = (e) => {
        if (e.key === "Enter") {
            handleNavigate()
        }
    }

    return (
        <div>
            <div className='search'>
                <div className='search-inputs'>
                    <input onBlur={() => setTimeout(() => setShow(false), 300)} onKeyDown={(e)=>keyHandler(e)} onClick={() => inputHandler()} ref={ref} onChange={handleFilter} placeholder='Поиск' type="text" />
                    <div className='search-icon'>
                        <SearchIcon onClick={handleNavigate}/>
                    </div>
                </div>
            </div>
            <div className='small-search'>
                {showInput ? <div onClick={()=>setShowInput(false)}>
                    <CloseIcon/>
                </div> : <div onClick={() => setShowInput(true)}>
                    <SearchIcon/>
                    </div>}
                {showInput ? <><div className='small-search-inputs'>
                    <input onKeyDown={(e)=>keyHandler(e)} onBlur={() => setTimeout(() => setShow(false), 300)} onClick={() => inputHandler()} ref={ref} onChange={handleFilter} placeholder='Поиск' type="text" />
                    <div className='small-search-icon'>
                        <SearchIcon onClick={() => {
                            handleNavigate()
                            setShowInput(false)
                        }}/>
                    </div>
                </div></> : null}
            </div>
            {filteredData.length != 0 && show && (
                <div className='data-result-outter'>
                <div className="data-result">
                    {filteredData.map((value, index) => (
                        <SearchCard value={value} key={index} clearInput={clearInput} setShowInput={setShowInput} />
                    ))}
                </div>
                </div>
            )
            }
        </div>
    );
}

export default Search;