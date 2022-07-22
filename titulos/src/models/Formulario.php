<?php

class Formulario extends Sql {
    
    private $sql;

    public function __construct()
    {
        $this->sql = new Sql;
        
    }

    public function getFornecedores() {

        $result = $this->sql->select(
            "SELECT f.*, dt.*, dt.id as id_ds, id_fornecedor FROM fornecedores f
            inner join datasul dt on (f.id_datasul = dt.id)
            order by nome_fornecedor ASC"
        );

       return $result;
    }

    public function getDatasul()
    {
        $result = $this->sql->select("SELECT * FROM datasul order by(nome_interface) ASC");

        return $result;

    }

    public function getContasFluxo()
    {
        $result = $this->sql->select("SELECT cf.*, dt.nome_interface FROM contas_fluxo cf
            INNER JOIN datasul dt on (cf.id_ds = dt.id)
            order by(nome_cf) ASC");

        return $result;

    }

    public function setFornecedor($data)
    {
        $result = $this->sql->query("INSERT INTO fornecedores (cod_fornecedor, nome_fornecedor, cnpj_fornecedor, id_datasul)
            VALUES(:cod_fornecedor, :nome_fornecedor, :cnpj_fornecedor, :id_datasul)", [
                ':cod_fornecedor'  => intval($data->cod_fornecedor),
                ':nome_fornecedor' => trim(strtoupper($data->nome_fornecedor)),
                ':cnpj_fornecedor' => $data->cnpj_fornecedor,
                ':id_datasul'  => intval($data->id_datasul) 
            ]
        );

      
        return $result;
    }
}