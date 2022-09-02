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
        $result = $formulario->getFornecedores($_GET['id_datasul']);
        echo json_encode($result);
        break;

    
    case 'getDatasul':
        $result = $formulario->getDatasul();
        echo json_encode($result);
        break;

        
    case 'getContasFluxo':
        $result = $formulario->getContasFluxo($_GET['id_ds']);
        echo json_encode($result);
        break;

    
    case 'getDetalheContas':
        $result = $formulario->getDetalheContas($_GET['id_titulo']);
        echo json_encode($result);
        break;


    case 'getItens':
        $result = $formulario->getItens($data);
        echo json_encode($result);
        break;

        

    case 'getTitulos':
        $result = $titulos->getTitulos($_GET['status']);
        echo json_encode($result);
        break;



    case 'getTitulosAll':
        $result = $titulos->getTitulosAll();
        echo json_encode($result);
        break;

    case 'setFornecedor':
        $result = $formulario->setFornecedor($data);
        echo json_encode($result);
        break;

        

    case 'setContaFluxo':
        $result = $formulario->setContaFluxo($data);
        echo json_encode($result);
        break;

        

    case 'setItem' :
        $result = $formulario->setItem($data);
        echo json_encode($result);
        break;

        

    case 'setTitulo':
        $verificarTitulo = $titulos->verificarTitulo($data);

        if($verificarTitulo['error']) {
            echo json_encode($verificarTitulo);
        } else {
            $result = $titulos->setTitulo($data);
            echo json_encode($result);
        }
        break;

    case 'setItensTitulo':
        $result = $titulos->setItensTitulo($data);
        echo json_encode($result);
        break;

    case 'alterarStatus':
        $result = $titulos->alterarStatus($data);
        echo json_encode($result);
        break;

    
    case 'detelarTitulo':
        $result = $titulos->detelarTitulo($data);
        echo json_encode($result);
        break;

    case 'gerarRelatorio':
        ob_start();
        $titulos = $data;
        $total   = $_GET['total'];
        require_once 'src/views/relatorio.php';
        $pdf = new PDF(ob_get_clean());
        $pdf->exibir_pdf();
        break;

}   



