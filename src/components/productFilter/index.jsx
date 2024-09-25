import { useState } from "react"

export default function ProductFilter(props){
    const [value, setValue] = useState('');

    return (
        <div className="mt-3 flex gap-4">
            <input className="rounded-md bg-gray-200 p-2" value={value} onChange={(e)=>setValue(e.target.value)} placeholder="buscar"/>
            <button className="rounded-md bg-green-200 p-2" onClick={()=>props.filter(value)}>Buscar</button>
        </div>
    )
}