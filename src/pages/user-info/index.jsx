import { useAuth } from "../../contexts/authContext";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../validations/userValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

import { toast } from "react-toastify";

export default function UserInfo() {
  const { getUserInfo, updateUserInfo } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(loginSchema) });

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setValue("email", userInfo.email);
      setValue("password", userInfo.password);
    }
  }, [getUserInfo, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateUserInfo(data);
      toast.success("Informações atualizadas com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar as informações.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="E-mail" {...register("email")} />
        <p>{errors.email?.message}</p>

        <input
          placeholder="Digite sua senha"
          {...register("password")}
          type="password"
        />
        <p>{errors.password?.message}</p>

        <button>Enviar</button>
      </form>

      <ToastContainer />
    </div>
  );
}
