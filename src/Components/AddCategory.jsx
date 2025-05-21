import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const [category, setCategory] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        console.log(category)
        e.preventDefault()
        axios.post('https://veterinariacliente.onrender.com/auth/add-category', {category})
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/categories')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
    <div className='p-3 rounded w-25 border'>
        <div className='text-warning'>
        <h3>Agregar Categoria</h3>
        </div>
        
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                
                <input type='text' name='category' autoComplete='off' placeholder='Categoria...' className='form-control rounded-0' onChange={(e) => setCategory(e.target.value)}/>
            </div>
            <button className='btn btn-success w-100 rounded-0 mb-2'>Agregar</button>
        </form>
    </div>
</div>
  )
}

export default AddCategory