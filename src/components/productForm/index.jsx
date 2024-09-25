import { productSchema } from "../../validations/productValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

export default function ProductForm(props){
    const [product, setProduct] = useState(props.product);


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ 
        defaultValues: {...product},
        resolver: yupResolver(productSchema) });

    const onSubmit = async (data) => {
        props.editProduct(data);
    };

    useEffect(()=>{
        setProduct(props.product);
    },[])

    useEffect(()=>{
        reset(product);
    }, [product]);

    return(
        <form className="mt-4 w-[60%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <input 
                className="rounded-md bg-slate-300 p-2"
                placeholder="Título" 
                {...register("title")} />
            <p>{errors.title?.message}</p>

            <br />

            <input
                className="rounded-md bg-slate-300 p-2 break-words"
                type="text"
                placeholder="Descrição"
                {...register("description")}
            />
            <p>{errors.description?.message}</p>
            <br />

            <input
                className="rounded-md bg-slate-300 p-2"
                type="text"
                placeholder="Preço"
                {...register("price")}
            />
            <p>{errors.price?.message}</p>
            <button className="mt-2 rounded-md bg-green-300 p-2">Atualizar</button>
        </form>
    )
} 