import axios from 'axios'
import { useEffect } from 'react'

function App() {
  async function search() {
    const res = await axios.get('/search')
    console.log(res)
  }
  useEffect(() => {
    search()
  }, [])
  return (
    <>
      hello world
    </>
  )
}

export default App
