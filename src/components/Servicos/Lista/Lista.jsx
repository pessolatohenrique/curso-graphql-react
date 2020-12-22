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
import { Query, Mutation } from "react-apollo";
import { LISTA_SERVICOS, DELETA_SERVICO } from "../../../graphql/servicos";

export default class Lista extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Container>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" color="primary">
                Serviços
              </Typography>
              <br />
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Preço</TableCell>
                      <TableCell>Descrição</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <Query query={LISTA_SERVICOS} fetchPolicy="no-cache">
                      {({ data, refetch }) => {
                        if (!data) return null;

                        return data.servicos.map((servico) => (
                          <TableRow key={servico.id}>
                            <TableCell component="th" scope="row">
                              {servico.nome}
                            </TableCell>
                            <TableCell>{servico.preco}</TableCell>
                            <TableCell>{servico.descricao}</TableCell>
                            <TableCell>
                              <Button
                                color="primary"
                                href={`servicos/alterar/${servico.id}`}
                              >
                                <Create />
                              </Button>
                              <Mutation mutation={DELETA_SERVICO}>
                                {(deletaServico, response) => {
                                  console.log("RESPONSE", response);
                                  if (response.error) {
                                    alert(
                                      "Este serviço está associado à um ou mais atendimentos! Verifique antes de excluir!"
                                    );
                                  }

                                  return (
                                    <Button
                                      color="secondary"
                                      onClick={() => {
                                        deletaServico({
                                          variables: { id: servico.id },
                                        });
                                        refetch();
                                      }}
                                    >
                                      <Delete />
                                    </Button>
                                  );
                                }}
                              </Mutation>
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
              <Button size="small" color="primary" href="/servicos/novo">
                Adicionar Serviço
              </Button>
            </CardActions>
          </Card>
        </Container>
      </div>
    );
  }
}
