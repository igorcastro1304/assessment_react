import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  getProductInfoById,
  updateProduct,
} from "../../services/services";
import ProductForm from "../../components/productForm";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/authContext";

export default function EditProduct() {
  const { id } = useParams();
  const { getUserInfo } = useAuth();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const { token } = getUserInfo();

    getProductInfoById(id, token).then((res) => {
      console.log(res);
      setProduct(res);
    });
  }, []);

  function editProductReq(prod) {
    const { token } = getUserInfo();

    updateProduct(prod, token).then(() => {
      toast.success("Informações atualizadas com sucesso!");
      navigate("/products");
    });
  }

  return (
    <div>
      {product ? (
        <ProductForm editProduct={(p) => editProductReq(p)} product={product} />
      ) : (
        ""
      )}
    </div>
  );
}
