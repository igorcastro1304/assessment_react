import * as yup from "yup";

const registerSchema = yup.object().shape({
    name: yup.string().required("Por favor, preencha o campo de nome."),
    password: yup.string().required("Por favor, preencha o campo com a sua senha.").min(6, "A senha deve ter ao menos 6 caracteres."),
    email: yup.string().email("Por favor, digite um e-mail válido.").required("O campo e-mail é obrigatório!"),
})

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Por favor, digite um e-mail válido.")
        .required("O campo e-mail é obrigatório!"),
    password: yup
        .string()
        .required("Por favor, preencha o campo com a sua senha.")
        .min(6, "A senha deve ter ao menos 6 caracteres."),
})

const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email("Por favor, digite um e-mail válido.").required("O campo e-mail é obrigatório!"),
})

export {
    registerSchema,
    loginSchema,
    forgotPasswordSchema
}