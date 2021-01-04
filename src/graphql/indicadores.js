import gql from "graphql-tag";

export const LISTA_INDICADORES = gql`
  query {
    indicadores {
      totalAtendimentos
      totalClientes
      totalServicos
      servicos {
        label
        data
      }
      clientes {
        label
        data
      }
    }
  }
`;
