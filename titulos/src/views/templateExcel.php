<?php

header("Content-type: application/x-msexcel");
header("Content-type: application/force-download");
header("Content-Disposition: attachment; filename=teste.xls");
header("Pragma: no-cache");

?>
<meta charset="UTF-8">

<body>
    <table class="tabela">
        
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
       
        <?php foreach($data as $key => $value): ?>
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
        
    </table>
</body>