import axios from "axios";
import { useDebugValue } from "react";

const BASE_URL = "https://api-infnet-produtos-privado.vercel.app";

export async function userLogin(userData) {
  return await axios
    .post(
      `${BASE_URL}/auth`,
      {
        email: userData.email,
        password: userData.password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => res.data);
}

export async function getAllProducts(token) {
  console.log(token);
  return await axios.get(`${BASE_URL}/produtos`, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });
}

export function getProducts(page, pageSize) {
  return axios
    .get(
      `https://dummyjson.com/products?skip=${
        (page - 1) * pageSize
      }&limit=${pageSize}`
    )
    .then((res) => {
      return res.data;
    });
}

export async function addProduct(produto, token) {
  return await axios
    .post(
      `${BASE_URL}/produtos`,
      {
        nome: produto.nome,
        preco: produto.preco,
        fornecedor: produto.fornecedor,
        url_imagem: produto.url_imagem,
        descricao: produto.descricao,
      },
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);
}

export function filterProducts(text) {
  return axios
    .get(`https://dummyjson.com/products/search?q=${text}`)
    .then((res) => {
      return res.data;
    });
}

export function getProductById(id) {
  return axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
    return res.data;
  });
}

export function updateProduct(product) {
  console.log(product);
  return axios
    .put(`https://dummyjson.com/products/${product.id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product,
      }),
    })
    .then((res) => res.data);
}
