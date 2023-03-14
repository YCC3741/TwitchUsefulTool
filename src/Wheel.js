import React from 'react';
import './Wheel.css';
import { useState, useEffect } from 'react';

const Wheel = (props) => {

    const [selectedItem, setItem] = useState('');
    const { items, onSelect } = props;
    const [spinning, setSpin] = useState('');

    useEffect(() => {
        console.log('selectedItem = ', selectedItem);
      }, [selectedItem])

    const hello = () => {
        let total = 0, cumulate = 0, itemIndex = 0;
        items.forEach(it => {
            total += it.relativeProbability;
        });
        let itemPercentage = Math.floor(Math.random() * total);
        items.forEach(it => {
            cumulate += it.relativeProbability;
            if (cumulate <= itemPercentage)
                itemIndex += 1;
        });
        const selectedID = items[itemIndex]._id;
        setItem(itemIndex);
        setSpin('spinning');
        onSelect(selectedID);
        console.log(selectedItem);
    }

    const selectItem = () => {
        //props.setShowMap(false)
        /*
        if (selectedItem === '' && items.length > 0) {
            console.log("upper");
            console.log(selectedItem);
            const curItem = Math.floor(Math.random() * items.length);
            const selectedID = items[curItem]._id;
            setItem(curItem);
            onSelect(selectedID);
            setSpin('spinning');
        } else {
            console.log("under");
            if (selectedItem != -1) {
                //console.log("selectedItem !== null");
            } else {
                console.log("other");
            }
            setItem('');
            onSelect(0);
            setSpin('');
            console.log(selectedItem);
            setTimeout(selectItem, 1000);
        }
        */
        if (items.length > 0) {
            setSpin('');
            setTimeout(hello, 500);
        }
    }

    const wheelVars = {
        '--nb-item': items.length,
        '--selected-item': selectedItem,
    };
    //const spinning = selectedItem !== null ? 'spinning' : '';

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