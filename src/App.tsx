import { NavLink } from 'react-router'
import './App.css'
import ProductList from './components/ProductList'

function App() {
  return (
    <>
        <h1 className="header"><NavLink to="/">Music Admin</NavLink></h1>
        <NavLink to="/addProduct" className="add-button">+ Add Product</NavLink>
        <ProductList />
    </>
  )
}

export default App
