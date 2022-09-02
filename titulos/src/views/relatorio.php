<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="css/tabela.css">
</head>

<style>

  body, h1, h2, h3, * {
    margin: 0;
  }

  .tabela {
    border-collapse: collapse;
    width: 100%;
  }

  .tabela tr td {
    border: solid 1px black;
    border-collapse: collapse;
    font-size: 0.8rem;
    text-align: center;
  }

  .tabela thead tr th {
    border: 1px solid black;
    font-size: 0.9rem;
  }

  .tabela-titulo {
    margin-bottom: 20px;
    width: 100%;
  }

  .tabela-titulo tr td {
    text-align: center;
  }

  .tabela-titulo tr td:nth-child(4) {
    text-align: right;
  }

  .tabela-titulo tr td:nth-child(1) {
    text-align: left;
  }

  .container-ass {
    margin-top: 100px;
  }

  .tabela-ass {
    width: 100%;
    
  }

  .tabela-ass tr td {
    
  }

  .tabela-ass tr td:nth-child(2) {
    text-align: right;
  }

  .tabela-ass tr:nth-child(2) td{
    height: 80px;
    border: none;
  }

  .tabela-ass tr .linha-ass{
    border-top: 1px solid black;
    
  }

  .tabela-ass tr:nth-child(1) td,
  .tabela-ass tr:nth-child(2) td{
    width: 30%;
  }

  
</style>

  <body>
    <table class="tabela-titulo">
      <tbody>
        <tr>
          <td>
            <h2>PROTOCOLO INFRAESTRUTURA</h2>
            <h3>Contas a Pagar</h3>
          </td>
          <td>
            <h4>Data:</h4>
            <h4>
              <?=date('d/m/Y'); ?>
            </h4>
          </td>
          <td>
            <h4>Qtd de Títulos:</h4>
            <h4><?php print(count($titulos)) ; ?></h4>
          </td>
          <td>
            <h4>Total em Títulos:</h4>
            <h4><?= $total ?></h4>
          </td>
        </tr>
      </tbody>
    </table>

    <table class="tabela">
      <thead>
        <tr>
          <th scope="col">DATASUL</th>
          <th scope="col">EMPRESA</th>
          <th scope="col">DESCRIÇÃO</th>
          <th scope="col">FORNECEDOR</th>
          <th scope="col">NUM NF</th>
          <th scope="col">EMISSÃO</th>
          <th scope="col">VENCIMENTO</th>
          <th scope="col">VALOR</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach($titulos as $key => $value): ?>
          <tr>
            <td><?=$value->nome_interface ?></td>
            <td><?=$value->nome_fornecedor ?></td>
            <td><?=$value->nome_item ?></td>
            <td><?=$value->cod_fornecedor ?></td>
            <td><?=$value->nf_tit ?></td>
            <td><?= date('d/m/Y', strtotime("{$value->data_emissao_tit}")) ?></td>
            <td><?= date('d/m/Y', strtotime("{$value->data_venc_tit}")) ?></td>
            <td><?='R$ ' . number_format($value->valor_tit, 2, ',', '.')?></td>
          </tr>
        <?php endforeach ?>
      </tbody>
    </table>
<!-- 
    <table class="assinaturas">
      <tr>
        <td></td>
        <td>Assinatura Infraestrutura</td>
        <td></td>
        <td>Assinatura Contas a Pagar</td>
      </tr>
      <tr class="espaco">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>Data Infraestrutura</td>
        <td></td>
        <td>Data Contas a Pagar</td>
      </tr>
    </table> -->

    <div class="container-ass">
      <table class="tabela-ass">
        <tr>
          <td class="linha-ass">Assinatura Infraestrutura</td>
          <td></td>
          <td class="linha-ass">Assinatura Contas a Pagar</td>
        </tr>
        <tr>
          <td></td>
        </tr>
        <tr>
          <td class="linha-ass">Data Infraestrutura</td>
          <td></td>
          <td class="linha-ass">Data Contas a Pagar</td>
        </tr>
          
      </table>
      <!-- <div class="ass-infra"></div>
      Assinatura Infraestrutura
  
      <div class="data-infra"></div>
      Data Infraestrutura
    </div> -->
      
  </body>
</html>

