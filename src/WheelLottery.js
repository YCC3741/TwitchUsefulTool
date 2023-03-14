import React from 'react';
import './WheelLottery.css';
import { useState, useEffect } from 'react';
import { Tabs, List, Button } from 'antd';
import Wheel from './Wheel';

const WheelLottery = () => {
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState([]);
    const [curId, setId] = useState(1);


    const handleSubmit = (e) => {
        e.preventDefault();
        setItems([...items, {name: e.target.name.value, relativeProbability: e.target.probability.value, _id: curId}]);
        setId(curId+1);
        //console.log(curId);
    }

    const onSelect = (_id) => {
        if (_id === 0) {
            return;
        }
        let found = false;
        var tmp = [...selected];
        tmp = tmp.map((it) => {
            if (it._id === _id) {
                it.cnt++;
                found = true;
                //console.log("hello"+it.name);
            }
            return it;
        });
        if (found === false) {
            items.forEach((it) => {
                if (it._id === _id) {
                    tmp.push({name: it.name, _id: _id, cnt: 1});
                    //console.log("hi"+it._id);
                }
            });
        }
        setSelected(tmp);
    }

    const clearSelected = (_id) => {
        var tmp = [...selected];
        tmp = tmp.filter((it) => {
            if (it._id == _id)
                return false;
            else
                return true;
        });
        setSelected(tmp);
    }

    const resetWheel= () => {
        setItems([]);
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} className="create">
                <label>New item name</label>
                <input type='text' name='name' id='name' required />
                <label>relative probability</label>
                <input type='number' name='probability' id='probability' required />
                <input type='submit' value="Submit"/>
            </form>
            
            <List
                dataSource={selected}
                size="small"
                renderItem={item => (
                    <List.Item key={item._id}>
                        <List.Item.Meta
                            title={item.name}
                            description={item.cnt}
                        />
                        <Button size="small" shape="round" type="primary" onClick={() => {clearSelected(item._id)}}
                                style={{background: "#da3768"}}>Clear this</Button>						
                    </List.Item>
                )}
            />

            <Wheel items={items} onSelect={onSelect}/>

            <Button size="small" shape="round" type="primary" onClick={resetWheel}
                                style={{background: "#da3768"}}>Reset Wheel</Button>
        </React.Fragment>
     );
}
 
export default WheelLottery;