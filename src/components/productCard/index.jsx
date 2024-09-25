import { useEffect, useState } from "react";

export default function ProductCard(props) {
  const product = props.product;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteConfirmation = () => {
    props.onDelete(product._id);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-400 rounded-lg w-52">
      <img src={product.url_imagem} alt={product.nome} />
      <p className="text-center">{product.nome}</p>
      <p className="text-center">R$ {product.preco}</p>
      <p>{product.rating}/5</p>
      <div>
        <button
          className="p-2 bg-green-200 rounded-md"
          onClick={() => props.productDetail(product._id)}
        >
          Ver mais
        </button>
        <button onClick={() => setIsModalOpen(true)} className="text-red-500">
          Excluir
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-5 bg-white rounded-lg">
            <h2 className="text-lg font-semibold">Confirmação de Exclusão</h2>
            <p>Você tem certeza que deseja excluir este produto?</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 mr-2 bg-gray-300 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-md"
                onClick={handleDeleteConfirmation}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
