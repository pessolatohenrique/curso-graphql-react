import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Indicador from "./indicator";
import BarChart from "./barchart";
import atendimentoImg from "../../assets/images/atendimentos.jpg";
import clienteImg from "../../assets/images/clientes.jpeg";
import servicoImg from "../../assets/images/servicos.jpg";

const PaginaPrincipal = () => {
  const graficoServicos = {
    title: "Serviços",
    description: "Quais são os serviços mais buscado pelos clientes?",
    data: [
      { label: "Banho e tosa", data: 9 },
      { label: "Consulta", data: 5 },
    ],
  };

  const graficoClientes = {
    title: "Clientes",
    description: "Quais os clientes visitam o petshop mais frequentemente?",
    data: [
      { label: "Cliente 1", data: 7 },
      { label: "Cliente 2", data: 10 },
    ],
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Indicador
            total={50}
            label="atendimentos"
            url="atendimentos"
            image={atendimentoImg}
          />
        </Grid>
        <Grid item xs={4}>
          <Indicador
            total={50}
            label="clientes"
            url="clientes"
            image={clienteImg}
          />
        </Grid>
        <Grid item xs={4}>
          <Indicador
            total={50}
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
    </Container>
  );
};

export default PaginaPrincipal;
