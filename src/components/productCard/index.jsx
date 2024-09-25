import { useEffect, useState } from "react";

export default function ProductCard(props) {
  const product = props.product;
  const [saved, setSaved] = useState(props.saved);
  const [favStyle, setFavStyle] = useState("");

  function setFavorite() {
    let saved = JSON.parse(localStorage.getItem("saved"));
    if (saved == null) {
      saved = [];
    }

    saved.push(product.id);
    localStorage.setItem("saved", JSON.stringify(saved));
  }

  useEffect(() => {
    if (saved) {
      setFavStyle("rounded-md bg-orange-200 p-2");
    } else {
      setFavStyle("rounded-md bg-gray-200 p-2");
    }
  }, [saved]);
  return (
    <div className="flex flex-col items-center p-5 bg-gray-400 rounded-lg w-52">
      <img src={product.url_imagem} />
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
        <button className={favStyle} onClick={setFavorite}>
          Favoritar
        </button>
      </div>
    </div>
  );
}
