import React from 'react';
import './NormalLottery.css';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';
import { Tabs, List, Button } from 'antd';

const NormalLottery = () => {
    const [data, setData] = useState([]);
    const [hit, setHit] = useState([]);
    const [curId, setId] = useState(1);
    const [maxTime, setMaxTime] = useState(10000);

    const colors = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];


    const handleSubmit = (e) => {
        e.preventDefault();
        setData([...data, {name: e.target.name.value, numLottery: Number(e.target.numLottery.value), numJackpot: 0, _id: curId}]);
        setId(curId+1);
        //console.log(data);
        e.target.name.value = "";
        e.target.numLottery.value = "";
        //console.log([{name: 'fd', numLottery:8}, {name: 'fe', numLottery: 3}]);
    }

    const handleMax = (e) => {
        e.preventDefault();
        setMaxTime(Number(e.target.maxJackpot.value));
        checkMax();
        //console.log(e.target.maxJackpot.value);
        //console.log([{name: 'fd', numLottery:8}, {name: 'fe', numLottery: 3}]);
    }

    const checkMax = () => {
        const dataTmp = data.filter((it) => {
            return it.numJackpot < maxTime && it.numLottery > 0;
        });
        setData(dataTmp);
        //console.log(dataTmp);
    }

    const draw = (numDraw) => {
        for (let i = 0; i < numDraw && data.length >= 0; i++) {
            let total = 0, cumulate = 0, itemIndex = 0;
            data.forEach(it => {
                total += it.numLottery;
            });
            let itemPercentage = Math.floor(Math.random() * total);
            data.forEach(it => {
                cumulate += it.numLottery;
                if (cumulate <= itemPercentage)
                    itemIndex += 1;
            });
            const tmp1 = data.map((c, i) => {
                if (i != itemIndex) {
                    return c;
                } else {
                    if (c.numJackpot == 0) {
                        //console.log("hi")
                        setHit([...hit, c]);
                    } else {
                        const tmp3 = hit.filter(it => it._id != c._id);
                        setHit([...tmp3, {...c, numLottery: c.numLottery - 1, numJackpot: c.numJackpot + 1}]);
                    }
                    //console.log({...c, numLottery: c.numLottery - 1, numJackpot: c.numJackpot + 1});
                    return {...c, numLottery: c.numLottery - 1, numJackpot: c.numJackpot + 1};
                }
            });
            const tmp2 = tmp1.filter((it) => {
                return it.numJackpot < maxTime && it.numLottery > 0;
            });
            setData(tmp2);
            console.log(data);
            //checkMax();
            console.log(hit);
        }
    }

    const clearSelected = (_id) => {
        var tmp = [...hit];
        tmp = tmp.filter((it) => {
            if (it._id == _id)
                return false;
            else
                return true;
        });
        setHit(tmp);
    }

    return ( 
        <React.Fragment>
            <div className='normalForm'>
                <form onSubmit={handleSubmit} className="create">
                    <label>New item name</label>
                    <input type='text' name='name' id='name' required />
                    <label>Number of lottery</label>
                    <input type='number' name='numLottery' id='numLottery' required />
                    <input type='submit' value="Submit"/>
                </form>

                <button onClick={() => draw(1)}>Draw a new one!</button>
                <button onClick={() => draw(5)}>Draw 5 at once!</button>

                <form onSubmit={handleMax} className="setMax">
                    <label>Maximum jackpot times</label>
                    <input type='number' name='maxJackpot' id='maxJackpot' required />
                    <input type='submit' value="Submit"/>
                </form>
            </div>
            
            <div className='piechart'>
                <PieChart width={500} height={500}>
                    <Pie data={data} dataKey="numLottery" nameKey="name" cx="50%" cy="50%" outerRadius={200} fill="#8884d8">
                        {data.map((entry, index) => (
                            <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </div>

            <List
                dataSource={hit}
                size="small"
                renderItem={item => (
                    <List.Item key={item._id}>
                        <List.Item.Meta
                            title={item.name}
                            description={item.numJackpot}
                        />
                        <Button size="small" shape="round" type="primary" onClick={() => {clearSelected(item._id)}}
                                style={{background: "#da3768"}}>Clear this</Button>						
                    </List.Item>
                )}
            />
        </React.Fragment>
    );
}
 
export default NormalLottery;