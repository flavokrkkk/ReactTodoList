import { useState } from 'react';
import './Form.css'

const Form = ({putTodo}) => {
    const [value, setValue] = useState('')


    return (
        <form className='form' onSubmit={e => {
            e.preventDefault()
            putTodo(value)
            setValue('')
        }}>
            <input value={value} onChange={e => setValue(e.target.value)} type='text' placeholder='Введите текст...' className='input'/>
        </form>
    );
};

export default Form;