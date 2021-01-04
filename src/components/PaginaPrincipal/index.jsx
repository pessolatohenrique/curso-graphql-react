import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Indicador from "./indicator";
import BarChart from "./barchart";
import { Query } from "react-apollo";
import { LISTA_INDICADORES } from "../../graphql/indicadores";
import atendimentoImg from "../../assets/images/atendimentos.jpg";
import clienteImg from "../../assets/images/clientes.jpeg";
import servicoImg from "../../assets/images/servicos.jpg";

const PaginaPrincipal = () => {
  return (
    <Container>
      <Query query={LISTA_INDICADORES}>
        {({ data }) => {
          if (!data) return null;

          const {
            totalAtendimentos,
            totalClientes,
            totalServicos,
            servicos,
            clientes,
          } = data.indicadores;

          const graficoServicos = {
            title: "Serviços",
            description: "Quais são os serviços mais buscado pelos clientes?",
            data: servicos,
          };

          const graficoClientes = {
            title: "Clientes",
            description:
              "Quais os clientes visitam o petshop mais frequentemente?",
            data: clientes,
          };

          return (
            <div>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Indicador
                    total={totalAtendimentos}
                    label="atendimentos"
                    url="atendimentos"
                    image={atendimentoImg}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Indicador
                    total={totalClientes}
                    label="clientes"
                    url="clientes"
                    image={clienteImg}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Indicador
                    total={totalServicos}
                    label="serviços"
                    url="servicos"
                    image={servicoImg}
                  />
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <BarChart {...graficoServicos} />
                </Grid>
                <Grid item xs={6}>
                  <BarChart {...graficoClientes} />
                </Grid>
              </Grid>
            </div>
          );
        }}
      </Query>
    </Container>
  );
};

export default PaginaPrincipal;
