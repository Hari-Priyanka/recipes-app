import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './List.css';

const Area = ({ closeSidebar }) => {
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        const API_URL = 'https://www.themealdb.com/api/json/v1/1';

        const fetchAreas = async () => {
            try {
                const response = await axios.get(`${API_URL}/list.php?a=list`);
                const areaList = response.data.meals.map(area => area.strArea);
                setAreas(areaList);
            } catch (error) {
                console.error("Error fetching areas", error);
            }
        };
        fetchAreas();
    }, [areas]);

    const handleClick = () => {
        closeSidebar();
    };

    return (
        <div className='list_item'>
            {areas.map(area => (
                <Link
                    key={area}
                    to={`/areas/${area.toLowerCase()}`}
                    className='areas active_link'
                    onClick={handleClick}
                >
                    {area}
                </Link>
            ))}
        </div>
    )
}

export default Area;
