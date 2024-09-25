import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function Header() {
  const { isLogged, logout } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isLogged) {
      logout();
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="flex justify-between p-3 border">
      <nav className="flex flex-row">
        <ul className="flex flex-row gap-5">
          <li className="border bg-orange-200 p-3 hover:cursor-pointer" onClick={()=>navigate("/saved")}>Favoritos</li>
          <li className="border bg-orange-200 p-3 hover:cursor-pointer" onClick={()=>navigate("/products")}>Produtos</li>
          <li className="border bg-orange-200 p-3 hover:cursor-pointer" onClick={()=>navigate("/user-info")}>Perfil de Usuário</li>
        </ul>
      </nav>
      <button onClick={handleButtonClick}>
        {isLogged ? "Logout" : "Login"}
      </button>
    </header>
  );
}
