import React from 'react';
import {render} from 'react-dom';
// import { useState } from 'react'
import { Button } from 'antd';

let stateList:any[] = []
let index = 0

const useState = (initialValue:any)=>{
    let curState:any = {}
    // 已初始化
    if(!stateList[index]) {
        stateList[index] = {value: initialValue, index:index}
    }
    curState = stateList[index]
    let setCurState = (value:any)=>{
        curState.value = value
        index = 0
        render(<Count/>, document.getElementById('root'))
    }
    index++;
    return [curState.value, setCurState]
}

const Count = ()=>{
    console.log('render')

    const [count, setCount] = useState(0)
    const [lala, setLala] = useState(7)

    console.log(count, lala)
    return (
        <div>
            <span>{count}</span>
            <Button onClick={()=>{
                setCount(count+1)
            }}>add</Button>
            <hr />
            <span>{lala}</span>
            <Button onClick={()=>{
                setLala(lala+1)
            }}>add</Button>
        </div>
    )
}

export default Count;