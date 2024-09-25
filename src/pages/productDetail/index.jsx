import { useEffect, useState } from "react";
import { getProductInfoById } from "../../services/services";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { useAuth } from "../../contexts/authContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function ProductDetail() {
  const navigate = useNavigate();
  const { getUserInfo } = useAuth();
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const { token } = getUserInfo();

    getProductInfoById(id, token).then((res) => {
      console.log(res);
      setProduct(res);
    });
  }, [id, getUserInfo]);

  function goToEdit() {
    navigate("/editProduct/" + product._id);
  }

  function deleteItem() {
    // Adicione a lógica para deletar o produto aqui
    navigate("/products");
  }

  return (
    <div id="container" className="p-4">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Confirmar Exclusão"
      >
        <p>Deseja realmente excluir o item?</p>
        <div className="flex gap-2">
          <button className="p-2 bg-green-200 rounded-md" onClick={deleteItem}>
            Sim
          </button>
          <button className="p-2 bg-red-200 rounded-md" onClick={closeModal}>
            Não
          </button>
        </div>
      </Modal>

      <div className="flex flex-col items-center">
        <h2 className="mb-2 text-2xl font-bold">{product.nome}</h2>
        <img
          className="w-48 mb-4"
          src={product.url_imagem}
          alt={product.nome}
        />
        <p className="text-lg font-semibold">Preço: R$ {product.preco}</p>
        <p className="text-md">Fornecedor: {product.fornecedor}</p>
        <div className="mt-4">
          <h3 className="text-lg font-bold">Descrição</h3>
          <div
            className="p-2 border"
            dangerouslySetInnerHTML={{ __html: product.descricao }}
          />
        </div>
        <div className="flex flex-col items-start justify-center mt-4">
          <h3 className="text-lg font-bold">Avaliações</h3>
          {product.avaliacoes?.map((avaliacao, index) => (
            <div key={index} className="p-2 mb-2 border">
              <p className="font-semibold">{avaliacao.reviewerName}</p>
              <p>Avaliação: {avaliacao.rating}</p>
              <p>Comentário: {avaliacao.comment}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button onClick={goToEdit} className="p-2 bg-green-200 rounded-md">
            Editar
          </button>
          <button onClick={openModal} className="p-2 bg-red-200 rounded-md">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
