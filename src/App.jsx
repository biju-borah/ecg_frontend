import React from 'react'
import { io } from 'socket.io-client'
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis } from 'recharts'

const App = () => {
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    const socket = io('http://localhost:5000')
    socket.on('connect', () => console.log(socket.id))
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000)
    })
    socket.on('time', (graphData) => {
      setData(graphData);
    })
    socket.on('disconnect', () => setData('server disconnected'))

  }, [])
  return (
    <LineChart width={1200} height={480} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
      <XAxis dataKey="name" />
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone" dataKey="x" stroke="#ff7300" yAxisId={0} />
      {/* <Line type="monotone" dataKey="y" stroke="#387908" yAxisId={1} /> */}
      {/* <YAxis type="number" domain={[-1, 1]} /> */}
    </LineChart>
  )
}
export default App;
