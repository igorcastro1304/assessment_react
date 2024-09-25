import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/services";
import ProductForm from "../../components/productForm";
import { toast } from "react-toastify";



export default function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getProductById(id).then(res => {
            setProduct(res);
        })
    }, [])

    function editProductReq(prod){
        updateProduct(prod).then(()=>{
            toast.success("Informações atualizadas com sucesso!");
            navigate("/products");
        })
    }

    return (
        <div>
        { product ? 
            <ProductForm editProduct={(p)=>editProductReq(p)}  product={product}/>
            : ''
        }
        </div>
    )
}