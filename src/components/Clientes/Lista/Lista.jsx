import React from "react";
import { Link } from "react-router-dom";
import clientesApi from "../../../api/clientes";
import { Query } from "react-apollo";
import { LISTA_CLIENTES } from "../../../graphql/clientes";

class Clientes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  deletarCliente(id) {
    clientesApi.removerCliente(id).then(() => this.carregarClientes());
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Clientes</h1>

          <Link to="/clientes/novo">Novo Cliente </Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            <Query query={LISTA_CLIENTES}>
              {({ data }) => {
                if (!data) return null;
                return data.clientes.map((cliente) => (
                  <tr key={cliente.cpf}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpf}</td>
                    <td>
                      <Link to={`clientes/${cliente.id}`}>visualizar</Link>
                      <Link to={`clientes/alterar/${cliente.id}`}>alterar</Link>
                      <button
                        onClick={this.deletarCliente.bind(this, cliente.id)}
                      >
                        remover
                      </button>
                    </td>
                  </tr>
                ));
              }}
            </Query>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Clientes;
