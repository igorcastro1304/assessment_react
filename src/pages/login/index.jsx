import { loginSchema } from "../../validations/userValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useEffect } from "react";

export default function Login() {
  const { login, isLogged } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    await login(data);
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="E-mail" {...register("email")} />
        <p>{errors.email?.message}</p>

        <br />
        <br />

        <input
          type="password"
          placeholder="Digite sua senha"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>

        <input type="submit" value={"Enviar"} />
      </form>

      <button onClick={() => navigate("/forgot-password")}>
        Esqueci minha senha
      </button>
    </div>
  );
}
