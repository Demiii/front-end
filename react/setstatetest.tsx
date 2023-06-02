import React, { memo, useEffect, useState, Component } from 'react'

// settimeout里是同步的
// export default class HK extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             val: 0
//         }
//     }

//     componentDidMount(){
//         this.setState({val:this.state.val + 1})
//         console.log('HK------------->1', this.state.val)
//         this.setState({val:this.state.val + 1})
//         console.log('HK------------->2', this.state.val)

//         setTimeout(() => {
//             this.setState({val:this.state.val + 1})
//             console.log('HK------------->3', this.state.val)
//             this.setState({val:this.state.val + 1})
//             console.log('HK------------->4', this.state.val)
//         }, 0)
//     }

//     render(){
//         return <div>{this.state.val}</div>
//     }
// }


// 函数组件里settimeout里不是同步的
// const index = memo(() => {
//   const [val, setVal] = useState(0)
//   useEffect(()=>{
//     setVal(val+1)
//     console.log('HK------------->1', val)
//     setVal(val+1)
//     console.log('HK------------->2', val)
  
//     setTimeout(() => {
//         setVal(val+1)
//         console.log('HK------------->3', val)
//         setVal(val+1)
//         console.log('HK------------->4', val)
//     }, 0)
//   }, [])
//   return (
//     <div>{val}</div>
//   )
// })

// export default index

// class组件里 原生事件的setstate也是同步的
class App extends Component {
  state = {
    count: 0,
  }

  componentDidMount() {
    console.log(99999)
    // document.getElementById('btn').addEventListener('click', this.handleClick)
    Promise.resolve().then(res => { // then回调是放在异步队列中执行的，当点击了一次按钮之后，该函数才会被执行，此处使用promise模拟点击按钮之后发送网络请求，then回调模拟将接收到响应数据更新到状态中
      this.setState({
        count: this.state.count + 1
      })
      console.log(this.state.count); // 2
      this.setState({
        count: this.state.count + 1
      })
      console.log(this.state.count); // 3
      this.setState({
        count: this.state.count + 1
      })
      console.log(this.state.count); // 4
    })
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    })
    console.log(this.state.count) // 2

    this.setState({
      count: this.state.count + 1,
    })
    console.log(this.state.count) // 3

    this.setState({
      count: this.state.count + 1,
    })
    console.log(this.state.count) // 4
  }

  render() {
    return (
      <>
        <button id='btn'>触发原生事件</button>
        <div>{this.state.count}</div>
      </>
    )
  }
}

export default App
