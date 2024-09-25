import { useEffect, useState } from "react";
import { getProductById } from "../../services/services";
import { useNavigate, useParams } from "react-router-dom";
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function ProductDetail() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        getProductById(id).then(
            res => {
                setProduct(res);
            }
        )
    })

    function goToEdit() {
        navigate("/editProduct/" + product.id);
    }

    function deleteItem(){
        navigate("/products")
    }

    return (
        <div id="container">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <p>Deseja realmente excluir o item?</p>
                <div className="flex gap-2">
                    <button className="rounded-md bg-green-200 p-2" onClick={deleteItem}>Sim</button>
                    <button className="rounded-md bg-red-200 p-2" onClick={closeModal}>Não</button>
                </div>
            </Modal>
            {/* <img className="w-48" src={product?.images[0]}/> */}
            <p>{product.title}</p>
            <p>{product.description}</p>
            <p>R$ {product.price}</p>
            <div className="flex flex-col items-start justify-center">
                <p>Avaliações</p>
                {product.reviews?.map((review, index) => {
                    return (
                        <div key={index} className="border">
                            <p>{review.reviewerName}</p>
                            <p>{review.rating}</p>
                            <p>{review.comment}</p>
                        </div>)
                }
                )}
            </div>
            <div>
                <button onClick={goToEdit} className="rounded-md bg-green-200 p-2">Editar</button>
                <button onClick={openModal} className="rounded-md bg-red-200 p-2">Excluir</button>
            </div>
        </div>
    )
}