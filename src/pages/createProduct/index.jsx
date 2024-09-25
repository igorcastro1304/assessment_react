import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { createProductSchema } from "../../validations/productValidation";
import { addProduct, getSuppliers } from "../../services/services";
import { useAuth } from "../../contexts/authContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateProduct() {
  const navigate = useNavigate();
  const { getUserInfo } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(createProductSchema),
  });

  const [descricao, setDescricao] = useState("");
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const { token } = getUserInfo();
    const fetchSuppliers = async () => {
      try {
        const data = await getSuppliers(token);
        console.log(data);
        setSuppliers(data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      }
    };
    fetchSuppliers();
  }, [getUserInfo]);

  const onSubmit = async (data) => {
    const { token } = getUserInfo();

    const productData = { ...data, descricao };

    try {
      await addProduct(productData, token);
      alert("Produto criado com sucesso!");
      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar o produto.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="mb-4 text-2xl">Criar Produto</h2>
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold" htmlFor="nome">
            Nome
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            id="nome"
            name="nome"
            type="text"
            {...register("nome")}
          />
          {errors.nome && (
            <p className="mt-1 text-sm text-red-500">{errors.nome.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold" htmlFor="preco">
            Preço
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            id="preco"
            name="preco"
            type="number"
            step="0.01"
            {...register("preco")}
          />
          {errors.preco && (
            <p className="mt-1 text-sm text-red-500">{errors.preco.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold" htmlFor="fornecedor">
            Fornecedor
          </label>
          <select
            id="fornecedor"
            name="fornecedor"
            className="w-full px-3 py-2 border rounded"
            {...register("fornecedor")}
          >
            <option value="">Selecione um fornecedor</option>
            {suppliers?.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.nome}
              </option>
            ))}
          </select>
          {errors.fornecedor && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fornecedor.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold" htmlFor="url_imagem">
            URL da Imagem
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            id="url_imagem"
            name="url_imagem"
            type="url"
            {...register("url_imagem")}
          />
          {errors.url_imagem && (
            <p className="mt-1 text-sm text-red-500">
              {errors.url_imagem.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold" htmlFor="descricao">
            Descrição
          </label>
          <ReactQuill
            value={descricao}
            onChange={setDescricao}
            className="border rounded"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
          {errors.descricao && (
            <p className="mt-1 text-sm text-red-500">
              {errors.descricao.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Criar Produto
        </button>
      </form>
    </div>
  );
}
