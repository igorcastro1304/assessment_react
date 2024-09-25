import { createProductSchema } from "../../validations/productValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill"; // Importando o editor de rich text
import "react-quill/dist/quill.snow.css"; // Importando o estilo do Quill

export default function ProductForm(props) {
  const [description, setDescription] = useState(""); // Estado para a descrição

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createProductSchema),
  });

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      descricao: description,
    };
    await props.editProduct(productData);
    reset();
  };

  useEffect(() => {
    reset(props.product);
    setDescription(props.product.descricao || "");
  }, [props.product, reset]);

  return (
    <form className="mt-4 w-[60%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          className="w-full p-2 rounded-md bg-slate-300"
          placeholder="Nome do produto"
          {...register("nome")}
        />
        <p className="text-red-500">{errors.nome?.message}</p>
      </div>

      <div className="mt-4">
        <ReactQuill
          className="w-full"
          value={description}
          onChange={setDescription} // Atualiza o estado da descrição ao mudar
          placeholder="Descrição"
        />
        <p className="text-red-500">{errors.descricao?.message}</p>
      </div>

      <div className="mt-4">
        <input
          className="w-full p-2 rounded-md bg-slate-300"
          placeholder="Preço"
          {...register("preco")}
        />
        <p className="text-red-500">{errors.preco?.message}</p>
      </div>

      <div className="mt-4">
        <input
          className="w-full p-2 rounded-md bg-slate-300"
          type="text"
          placeholder="Fornecedor"
          {...register("fornecedor")}
        />
        <p className="text-red-500">{errors.fornecedor?.message}</p>
      </div>

      <div className="mt-4">
        <input
          className="w-full p-2 rounded-md bg-slate-300"
          type="text"
          placeholder="URL da Imagem"
          {...register("url_imagem")}
        />
        <p className="text-red-500">{errors.url_imagem?.message}</p>
      </div>

      <button className="p-2 mt-4 bg-green-300 rounded-md">Atualizar</button>
    </form>
  );
}
