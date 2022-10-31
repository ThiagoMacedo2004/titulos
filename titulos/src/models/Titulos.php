<?php

class Titulos extends Sql {

    private $sql;

    public function __construct()
    {
        $this->sql = new Sql();
    }

    public function getTitulos($status = 'Cadastrado')
    {
        $result = $this->sql->select(
            "SELECT t.id_titulo, 
                    t.data_emissao_tit, 
                    t.data_venc_tit, 
                    t.data_entregue, 
                    t.nf_tit, 
                    t.valor_tit, 
                    t.status, 
                    t.sel,
                    ds.nome_interface,
                    f.cod_fornecedor, 
                    f.nome_fornecedor,
                    i.nome_item
            FROM titulos t
                INNER JOIN datasul ds     ON (ds.id = t.id_ds_tit)
                INNER JOIN fornecedores f ON (f.id_fornecedor = t.id_forn_tit)
                INNER JOIN itens i        ON (i.id_item = t.id_item_tit)
            WHERE t.status = :status
            ORDER BY
                ds.nome_interface DESC,
                f.nome_fornecedor,
                i.nome_item ASC,
                t.nf_tit ASC", [
                ':status' => $status
            ]);

         return $result;
    }

    public function verificarTitulo($data)
    {
        $verifica = $this->sql->select("SELECT * FROM titulos
                                        WHERE id_ds_tit = :id_ds_tit
                                            AND id_forn_tit      = :id_forn_tit
                                            AND id_item_tit      = :id_item_tit
                                            AND nf_tit           = :nf_tit", [
                                                ':id_ds_tit'        => intval($data->id_datasul),
                                                ':id_forn_tit'      => intval($data->id_fornecedor),
                                                ':id_item_tit'      => intval($data->id_item),
                                                ':nf_tit'           => $data->nf,    
                                            ]);
        
        if($verifica)
        {
           return array (
            'error'   => 'Titulo já cadastrado. Verifique as informações e tente novamente.',
            'sucesso' => ''
           );
        }

        return array (
            'error'   => '',
            'sucesso' => 'Ok'
        );

    }


    public function setTitulo($data)
    {
        $result = $this->sql->query("INSERT INTO titulos (id_ds_tit, id_forn_tit, id_item_tit, data_emissao_tit, data_venc_tit, data_entregue, nf_tit, valor_tit, status, sel)
            VALUES(
                :id_ds_tit,
                :id_forn_tit,
                :id_item_tit,
                :data_emissao_tit,
                :data_venc_tit,
                :data_entregue,
                :nf_tit,
                :valor_tit,
                :status,
                :sel
            )", [
                ':id_ds_tit'        => intval($data->id_datasul),
                ':id_forn_tit'      => intval($data->id_fornecedor),
                ':id_item_tit'      => intval($data->id_item),
                ':data_emissao_tit' => date('Y-m-d', strtotime("{$data->data_emissao}")) ,
                ':data_venc_tit'    => date('Y-m-d', strtotime("{$data->data_venc}")),
                ':data_entregue'    => $data->data_entregue ? date('Y-m-d', strtotime("{$data->data_entregue}")) : NULL,
                ':nf_tit'           => $data->nf,
                ':valor_tit'        => floatval($data->valorPgTotal),
                ':status'           => $data->status,
                ':sel'              => 0
            ]);

        return $result;
    }

    public function setItensTitulo($data)
    {
        $id_titulo_pg = $this->sql->select("SELECT MAX(id_titulo) as id FROM titulos");

        foreach($data as $key => $value)
        {
            $result = $this->sql->query("INSERT INTO itens_pg (id_titulo_item_pg, id_cf_item_pg, valor_item_pg)
            VALUES(:id_titulo_item_pg, :id_cf_item_pg, :valor_item_pg)", [
                ':id_titulo_item_pg' => intval($id_titulo_pg[0]['id']),
                ':id_cf_item_pg'     => intval($value->id_cf_item_pg),
                ':valor_item_pg'     => floatval($value->valor_item_pg) 
            ]);
            
        }

        return $result;
    }

    public function alterarStatus($data)
    {
        foreach($data as $key => $value)
        {
            $result = $this->sql->query(
                "UPDATE titulos SET status = :status, data_entregue = :data_entregue WHERE id_titulo = :id_titulo", [
                ':status'        => $value->status,
                ':id_titulo'     => $value->id_titulo,
                ':data_entregue' => $value->data_entregue
            ]);
        }

        return $result;
    }

    public function editarTitulo($data)
    {
        $result = $this->sql->query(
            "UPDATE titulos
            SET 
                data_emissao_tit = :data_emissao_tit,
                data_venc_tit    = :data_venc_tit,
                data_entregue    = :data_entregue,
                nf_tit           = :nf_tit
            WHERE
                id_titulo = :id_titulo", [
                    ':data_emissao_tit' => $data->dt_emissao,
                    ':data_venc_tit'    => $data->dt_vencimento,
                    ':data_entregue'    => $data->dt_entregue,
                    ':nf_tit'           => $data->nf,
                    ':id_titulo'        => $data->id 
                ]
        );

        return $result;
    }

    public function detelarTitulo($data)
    {
        $result = $this->sql->query("DELETE FROM itens_pg WHERE id_titulo_item_pg = :id_titulo_item_pg", [
            ':id_titulo_item_pg' => intval($data->id_titulo)
        ]);

        if($result['sucesso']){
            $result_t = $this->sql->query("DELETE FROM titulos WHERE id_titulo = :id_titulo", [
                ':id_titulo' => intval($data->id_titulo)
            ]);

            return[
                'sucesso' => "Título: {$data->nf_tit} - {$data->nome_fornecedor} - R$ {$data->valor_tit} Deletado com sucesso!"
            ];
        }

        return array(
            'error' => 'Erro ao deletar Título.'
        );
    }

    public function getTitulosAll()
    {
        $result = $this->sql->select(
        "SELECT t.id_titulo, 
            t.data_emissao_tit, 
            t.data_venc_tit, 
            t.data_entregue, 
            t.nf_tit, 
            t.valor_tit, 
            t.status, 
            t.sel,
            ds.nome_interface,
            f.cod_fornecedor, 
            f.nome_fornecedor,
            i.nome_item
        FROM titulos t
            INNER JOIN datasul ds     ON (ds.id = t.id_ds_tit)
            INNER JOIN fornecedores f ON (f.id_fornecedor = t.id_forn_tit)
            INNER JOIN itens i        ON (i.id_item = t.id_item_tit)
        ORDER BY
            ds.nome_interface DESC,
            f.nome_fornecedor,
            i.nome_item ASC,
            t.nf_tit ASC");

        return $result;
    }
}