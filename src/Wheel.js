import React from 'react';
import './Wheel.css';
import { useState, useEffect } from 'react';

const Wheel = (props) => {

    const [selectedItem, setItem] = useState(null);
    const { items, onSelect } = props;

    const selectItem = () => {
        //props.setShowMap(false)
        if (selectedItem === null && items.length > 0) {
            const curItem = Math.floor(Math.random() * items.length);
            const selectedID = items[curItem]._id;
            setItem(curItem);
            onSelect(selectedID);
        } else {
            setItem(null);
            onSelect(0);
            setTimeout(selectItem, 500);
        }
    }

    const wheelVars = {
        '--nb-item': items.length,
        '--selected-item': selectedItem,
    };
    const spinning = selectedItem !== null ? 'spinning' : '';

    return (
        <div className="wheel-container">
            <div className={`wheel ${spinning}`} style={wheelVars} onClick={selectItem}>
                {items.map((item, index) => (
                    <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Wheel;