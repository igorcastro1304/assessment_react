import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import ProductFilter from "../../components/productFilter";
import {
  getProducts,
  getAllProducts,
  deleteProduct,
  getSuppliers,
} from "../../services/services";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function Products() {
  const navigate = useNavigate();
  const pageSize = 30;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [canLoad, setCanLoad] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const { getUserInfo } = useAuth();

  useEffect(() => {
    const { token } = getUserInfo();

    getAllProducts(token).then((res) => {
      setProducts(res.data);
      setFilteredProducts(res.data);
    });

    getSuppliers(token).then((res) => {
      setSuppliers(res);
    });
  }, []);

  function filter(selectedSupplier) {
    if (selectedSupplier) {
      console.log(selectedSupplier);
      const filtered = products.filter(
        (product) => product.fornecedor === selectedSupplier
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }

  function loadMore(event) {
    event.preventDefault();
    let page = currentPage;
    page++;
    getProducts(page, pageSize).then((res) => {
      let newProducts = [...products, ...res.products];
      setProducts(newProducts);
      setFilteredProducts(newProducts);
      if (currentPage * pageSize > res.total) {
        setCanLoad(false);
      } else {
        setCanLoad(true);
      }
    });
    setCurrentPage(page);
  }

  const handleDeleteProduct = async (id) => {
    const { token } = getUserInfo();
    try {
      await deleteProduct(id, token);
      setProducts(products.filter((product) => product._id !== id));
      setFilteredProducts(
        filteredProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ProductFilter suppliers={suppliers} filter={(v) => filter(v)} />

      <div className="flex justify-between w-full max-w-6xl px-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={() => navigate("/create-product")}
        >
          Criar Produto
        </button>

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={() => setIsGridView(!isGridView)}
        >
          {isGridView ? "Exibir em Lista" : "Exibir em Grade"}
        </button>
      </div>

      <div
        className={`${
          isGridView
            ? "grid grid-cols-1 md:grid-cols-3 gap-4 "
            : "flex flex-col gap-2"
        } justify-center p-4`}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            productDetail={(_id) => navigate("/productDetail/" + _id)}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>

      {canLoad ? (
        <button
          className="mb-4 bg-green-400 rounded-md w-44"
          onClick={(e) => loadMore(e)}
        >
          Carregar mais
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
