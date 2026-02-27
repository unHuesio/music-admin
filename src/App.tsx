import { NavLink } from 'react-router'
import './App.css'
import ProductList from './components/ProductList'

function App() {
  return (
    <>
        <h1 className="text-3xl font-bold underline"><NavLink to="/">Music Admin</NavLink></h1>
        <NavLink to="/addProduct" className="inline-block my-4 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300">+ Add Product</NavLink>
        <ProductList />
    </>
  )
}

export default App
