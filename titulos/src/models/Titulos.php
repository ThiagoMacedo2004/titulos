<?php

class Titulos extends Sql {

    private $sql;

    public function __construct()
    {
        $this->sql = new Sql();
    }


    public function setTitulo($data)
    {
        $result = $this->sql->query("INSERT INTO titulos (id_ds_tit, id_forn_tit, id_item_tit, data_emissao_tit, data_venc_tit, nf_tit, valor_tit, status)
            VALUES(
                :id_ds_tit,
                :id_forn_tit,
                :id_item_tit,
                :data_emissao_tit,
                :data_venc_tit,
                :nf_tit,
                :valor_tit,
                :status
            )", [
                ':id_ds_tit'        => intval($data->id_datasul),
                ':id_forn_tit'      => intval($data->id_fornecedor),
                ':id_item_tit'      => intval($data->id_item),
                ':data_emissao_tit' => date('Y-m-d', strtotime("{$data->data_emissao}")) ,
                ':data_venc_tit'    => date('Y-m-d', strtotime("{$data->data_venc}")),
                ':nf_tit'           => $data->nf,
                ':valor_tit'        => floatval($data->valorPgTotal),
                ':status'           => $data->status
            ]);

            return $result;
    }

    public function setItensTitulo($data)
    {
        $id_titulo_pg = 1;

        $result = $this->sql->query("INSERT INTO itens_pg (id_titulo_item_pg, id_cf_item_pg, valor_item_pg)
            VALUES(:id_titulo_item_pg, :id_cf_item_pg, :valor_item_pg)", [
                ':id_titulo_item_pg' => intval($id_titulo_pg),
                ':id_cf_item_pg'     => intval($data->id_cf_item_pg),
                ':valor_item_pg'     => floatval($data->valor_item_pg) 
            ]);

        return $result;
    }
}