import { useEffect, useState } from "react";
import { getProducts } from "../../services/services";
import ProductCard from "../../components/productCard";


export default function Saved(){
    const [saved, setSaved] = useState([]);

    useEffect(()=>{
        getProducts(1, 300)
        .then(res=>{
            let itensSaved = [];
            const localSaved = JSON.parse(localStorage.getItem('saved'));
            for(let i = 0; i < res.products.length; i++){
                if(localSaved.includes(res.products[i].id)){
                    itensSaved.push(res.products[i]);
                    if(itensSaved.length == localSaved.length){
                        break;
                    }
                }
            }
            setSaved(itensSaved);
        })
    }, [])

    {saved.map(product =>
        <ProductCard key={product.id} product={product} productDetail={(id)=>navigate('/productDetail/'+id)}/>
    )}
}