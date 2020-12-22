import gql from "graphql-tag";

export const LISTA_SERVICOS = gql`
  query {
    servicos {
      id
      nome
      preco
      descricao
    }
  }
`;

export const CONSULTA_SERVICO = gql`
  query servico($id: ID!) {
    servico(id: $id) {
      id
      nome
      preco
      descricao
    }
  }
`;

export const ADICIONA_SERVICO = gql`
  mutation adicionaServico($nome: String!, $preco: Float!, $descricao: String) {
    adicionaServico(nome: $nome, preco: $preco, descricao: $descricao) {
      id
      nome
      preco
      descricao
    }
  }
`;

export const ATUALIZA_SERVICO = gql`
  mutation atualizaServico(
    $id: ID!
    $nome: String!
    $preco: Float!
    $descricao: String
  ) {
    atualizaServico(
      id: $id
      nome: $nome
      preco: $preco
      descricao: $descricao
    ) {
      id
      nome
      preco
      descricao
    }
  }
`;

export const DELETA_SERVICO = gql`
  mutation deletaServico($id: ID!) {
    deletaServico(id: $id)
  }
`;
