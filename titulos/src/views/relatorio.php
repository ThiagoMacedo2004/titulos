<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="css/tabela.css">
</head>

<style>

  .tabela {
    border-collapse: collapse;
  }

  .tabela tr td {
    border: solid 1px black;
    border-collapse: collapse;
    font-size: 0.8rem;
  }

  .tabela thead tr th {
    border: 1px solid black;
    border-collapse: collapse;
  }
</style>
  <body>
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
                <td><?=$value->data_emissao_tit ?></td>
                <td><?=$value->data_venc_tit ?></td>
                <td><?=$value->valor_tit ?></td>
            </tr>
        <?php endforeach ?>
      </tbody>
    </table>
      
  </body>
</html>

