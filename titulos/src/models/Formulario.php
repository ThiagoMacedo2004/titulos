<?php

class Formulario extends Sql {
    
    private $sql;

    public function __construct()
    {
        $this->sql = new Sql;
        
    }

    public function getFornecedores($id_datasul)
    {
        if(!$id_datasul || $id_datasul == '') {
            $result = $this->sql->select(
                "SELECT f.*, dt.*, dt.id as id_ds, id_fornecedor FROM fornecedores f
                inner join datasul dt on (f.id_datasul = dt.id)
                order by nome_fornecedor ASC"
            );
    
           return $result;
        }

        $result = $this->sql->select(
            "SELECT f.*, dt.*, dt.id as id_ds, id_fornecedor FROM fornecedores f
            inner join datasul dt on (f.id_datasul = dt.id)
            WHERE dt.id =" . intval($id_datasul) . "
            order by nome_fornecedor ASC"
        );

       return $result;

        
    }

    public function getDatasul()
    {
        $result = $this->sql->select("SELECT * FROM datasul order by(nome_interface) ASC");

        return $result;

    }

    public function getContasFluxo($id_ds)

    {   
        $id_ds = intval($id_ds);
        if($id_ds == 0) {
        
            $result = $this->sql->select("SELECT cf.*, dt.nome_interface FROM contas_fluxo cf
                INNER JOIN datasul dt on (cf.id_ds = dt.id)
                order by(nome_cf) ASC");
    
            return $result;
        }

        $result = $this->sql->select("SELECT cf.*, dt.nome_interface FROM contas_fluxo cf
            INNER JOIN datasul dt on (cf.id_ds = dt.id)
            WHERE cf.id_ds = $id_ds 
            order by(nome_cf) ASC");

        return $result;

    }

    public function getDetalheContas($id_pg)
    {
        $result = $this->sql->select("SELECT
                                        ipg.valor_item_pg,
                                        cf.nome_cf,
                                        cf.num_cf
                                    FROM itens_pg ipg
                                        INNER JOIN titulos t       ON (t.id_titulo = :id_pg)
                                        INNER JOIN contas_fluxo cf ON (cf.id_cf = ipg.id_cf_item_pg)
                                    WHERE
                                        ipg.id_titulo_item_pg = :id_pg 
                                    AND
                                        ipg.id_cf_item_pg = cf.id_cf ", [
                                            ':id_pg' => intval($id_pg)                                        
                                        ]
        );

        return $result;
    }

    public function getItens($data)
    {
        if(!$data->id_datasul) {
            $result = $this->sql->select("SELECT i.*, dt.nome_interface, f.cod_fornecedor, f.nome_fornecedor, f.cnpj_fornecedor FROM itens i
                INNER JOIN datasul dt     on (dt.id = i.id_ds)
                INNER JOIN fornecedores f on (f.id_fornecedor = i.id_fn)
                WHERE i.id_ds = dt.id AND i.id_fn = f.id_fornecedor
                ORDER BY 
                    nome_interface DESC, 
                    f.nome_fornecedor ASC,
                    i.nome_item ASC",
            );

            return $result;

        }

        $result = $this->sql->select("SELECT i.*, dt.nome_interface, f.cod_fornecedor, f.nome_fornecedor, f.cnpj_fornecedor FROM itens i
                INNER JOIN datasul dt     on (dt.id = :id_datasul)
                INNER JOIN fornecedores f on (f.id_fornecedor = :id_fornecedor)
                WHERE i.id_ds = :id_datasul AND i.id_fn = :id_fornecedor
                ORDER BY
                    nome_interface DESC, 
                    f.nome_fornecedor ASC,
                    i.nome_item ASC",[
                    ':id_datasul'    => intval($data->id_datasul),
                    ':id_fornecedor' => intval($data->id_fornecedor)
                ]
            );

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

    public function setContaFluxo($data)
    {
        $result = $this->sql->query("INSERT INTO contas_fluxo (nome_cf, num_cf, id_ds)
            VALUES(:nome_cf, :num_cf, :id_ds)", [
                ':nome_cf' =>  trim($data->nome_cf),
                ':num_cf'  =>  $data->num_cf,
                ':id_ds'   =>  $data->id_datasul
            ]
        );

        return $result;
    }

    public function setItem($data)
    {
        $result = $this->sql->query("INSERT INTO itens (nome_item, id_fn, id_ds)
            VALUES(:nome_item, :id_fn, :id_ds)", [
                'nome_item' => $data->nome_item,
                ':id_fn'    => intval($data->id_fn),
                ':id_ds'    => intval($data->id_ds)
            ]
        );

        return $result;
    }
}