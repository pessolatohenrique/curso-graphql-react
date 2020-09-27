import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import { Create, Delete } from "@material-ui/icons";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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
        <Container>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" color="primary">
                Clientes
              </Typography>
              <br />
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>CPF</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <Query query={LISTA_CLIENTES}>
                      {({ data }) => {
                        if (!data) return null;
                        return data.clientes.map((cliente) => (
                          <TableRow key={cliente.cpf}>
                            <TableCell component="th" scope="row">
                              {cliente.nome}
                            </TableCell>
                            <TableCell>{cliente.cpf}</TableCell>
                            <TableCell>
                              <Button
                                color="primary"
                                href={`clientes/alterar/${cliente.id}`}
                              >
                                <Create />
                              </Button>
                              <Button
                                color="secondary"
                                onClick={this.deletarCliente.bind(
                                  this,
                                  cliente.id
                                )}
                              >
                                <Delete />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ));
                      }}
                    </Query>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" href="/clientes/novo">
                Adicionar Cliente
              </Button>
            </CardActions>
          </Card>
        </Container>
      </div>
    );
  }
}

export default Clientes;
