import * as yup from "yup";

const productSchema = yup.object().shape({
    title: yup.string().required("Por favor, preencha o campo de título."),
    description: yup.string().required("Por favor, preencha a descrição.").min(6, "A descrião deve ter ao menos 6 caracteres."),
    price: yup.number().min(1).typeError("Por favor, digite um valor número maior que 1.").required("O campo e-mail é obrigatório!"),
})

const createProductSchema = yup.object().shape({
    nome: yup.string().required("Por favor, preencha o nome do produto"),
    preco: yup.number("O preço deve ser numérico").required("Por favor, insira o preço do produto"),
    fornecedor: yup.string().required("Por favor, preencha o fornecedor"),
    url_imagem: yup
    .string()
    .required("Por favor, preencha a URL do produto"),
    descricao: yup.string().required("Por favor, preencha a descriçaõ do produto"),
})


export {
    productSchema,
    createProductSchema
}