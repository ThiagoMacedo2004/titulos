<?php

require_once 'src/config/config.php';

$data = json_decode(file_get_contents("php://input"));

$formulario = new Formulario;
$titulos    = new Titulos;

// $result = $formulario->getContasFluxo();
// echo json_encode($result);

switch($_GET['acao'])
{
    case 'getFornecedores':
        $result = $formulario->getFornecedores();
        echo json_encode($result);
        break;

    case 'getDatasul':
        $result = $formulario->getDatasul();
        echo json_encode($result);
        break;

    case 'getContasFluxo':
        $result = $formulario->getContasFluxo();
        echo json_encode($result);
        break;

    case 'setFornecedor':
        $result = $formulario->setFornecedor($data);
        echo json_encode($result);
        break;

}



