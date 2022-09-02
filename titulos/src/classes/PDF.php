<?php

use \Mpdf\Mpdf;

class PDF {

    private $pdf;
    private $html;

    public function __construct($template, $formato = 'A4', $orientacao = 'L', $modo = 'utf-8')
    {
        $this->pdf = new Mpdf([
            'format'      => $formato,
            'orientation' => $orientacao,
            'mode'        => $modo
        ]);

        $this->inicar_pdf($template);
    }

    public function reiniciar_html()
    {
        $this->html = '';
    }

    public function inicar_pdf($template = '')
    {
        $this->html = $template;
    }

    public function exibir_pdf(){

        $this->pdf->WriteHTML($this->html);
        try {
            echo json_encode('Relatório Gerado com Sucesso!');
            $this->pdf->Output("C:\\Users\\00217314\\Desktop\\TI_ADM\\Protocolo Contas\\protocolos\\protocolo_contas.pdf");            
            pclose(popen("C:\\Users\\00217314\\Desktop\\TI_ADM\\Protocolo Contas\\protocolos\\protocolo_contas.pdf", 'r')) ;
            
            
        }catch(Exception $e) {
            return json_encode($e);
        }
        
    }
}

