import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { forgotPasswordSchema } from "../../validations/userValidation";
import { useEffect } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const { isLogged } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, []);

  const onSubmit = (data) => {
    toast.success(`Link de recuperação enviado para o e-mail ${data.email}.`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="E-mail" {...register("email")} />
        <p>{errors.email?.message}</p>

        <button>Enviar</button>
      </form>
    </div>
  );
}
