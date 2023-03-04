import React from 'react';
import './NormalLottery.css';
import { useState, useEffect } from 'react';
import { PieChart, Pie} from 'recharts';

const NormalLottery = () => {
    const [data, setData] = useState([]);
    const [hit, setHit] = useState([]);

    let curId = 1;

    const handleSubmit = (e) => {
        e.preventDefault();
        setData([...data, {name: e.target.name.value, numLottery: e.target.numLottery.value, _id: curId}]);
        curId += 1;
    }

    const onSelect = (_id) => {
        if (_id === 0) {
            return;
        }
        let found = false;
        var tmp = hit.map((it) => {
            if (it._id == _id) {
                it.cnt++;
                found = true;
            }
            return it;
        });
        if (found === false) {
            tmp.push({_id: _id, cnt: 1});
        }
        setHit(tmp);
    }

    return ( 
        <React.Fragment>
            <form onSubmit={handleSubmit} className="create">
                <label>New item name</label>
                <input type='text' name='name' id='name' required />
                <label>Number of lottery</label>
                <input type='number' name='numLottery' id='numLottery' required />
                <input type='submit' value="Submit"/>
            </form>

            <PieChart width={700} height={700}>
                <Pie data={data} dataKey="numLottery" outerRadius={250} fill="green" /> 
            </PieChart>
        </React.Fragment>
    );
}
 
export default NormalLottery;