import { connection } from "../configs/Database.js";
import { Pedido } from "../models/Pedidos.js";

const pedidoRepository = {
    criar: async (pedido, itemPedidos) => {
        const conn = await connection.getConnection();
        console.log(pedido)
        try {
            await conn.beginTransaction();

            // Inserir pedido
            const sqlPedido = "INSERT INTO pedidos (ClienteId, Subtotal, Status) VALUES (?, ?, ?)";
            const valuesPedido = [pedido.clienteId, pedido.subtotal, pedido.status];
            const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);

            const idpedido = rowsPedido.insertId;

            console.log("Itens recebidos:", itemPedidos);
            // Inserir itemPedidos
            itemPedidos.forEach(async element => {
                console.log("Inserindo item:", element.produtoId);
                const sqlItemPedidos = "INSERT INTO itemPedidos (PedidoId, ProdutoId, Quantidade, ValorItem) VALUES (?, ?, ?, ?)";
                const valuesItemPedidos = [rowsPedido.insertId, element.produtoId, element.quantidade, element.valorItem];
                await conn.execute(sqlItemPedidos, valuesItemPedidos);
            })



            await conn.commit();

            return {
                idpedido,
                rowsPedido,
            };

        } catch (error) {
            await conn.rollback();
            throw new Error(error.message);

        } finally {
            conn.release();
        }
    },

    selecionar: async () => {
        const sql = "SELECT * FROM pedidos";
        const [rows] = await connection.execute(sql);
        return rows;
    },

    selecionarPorIdCompleto: async (idPedido) => {
        const sql = `
    SELECT 
        -- Pedido
        p.Id AS PedidoId,
        p.SubTotal,
        p.Status,
        p.DataCad AS PedidoData,

        -- Cliente
        c.Id AS ClienteId,
        c.Nome AS ClienteNome,
        c.Cpf AS ClienteCpf,

        -- Itens
        ip.Id AS ItemPedidoId,
        ip.Quantidade,
        ip.ValorItem,

        -- Produto
        pr.Nome AS ProdutoNome,
        pr.Valor AS ProdutoValor,

        -- Categoria
        cat.Id AS CategoriaId,
        cat.Nome AS CategoriaNome,
        cat.Descricao AS CategoriaDescricao

    FROM pedidos p
    INNER JOIN clientes c ON c.Id = p.ClienteId
    INNER JOIN itempedidos ip ON ip.PedidoId = p.Id
    INNER JOIN produtos pr ON pr.Id = ip.ProdutoId
    INNER JOIN categorias cat ON cat.Id = pr.IdCategoria
    WHERE p.Id = ?
    `;

        const [rows] = await connection.execute(sql, [idPedido]);

        if (rows.length === 0) {
            return { message: "Pedido não encontrado" };
        }

        // Montar objeto estruturado
        const pedido = {
            cliente: {
                idCliente: rows[0].ClienteId,
                nome: rows[0].ClienteNome,
                cpf: rows[0].ClienteCpf
            },
            pedido: {
                id: rows[0].PedidoId,
                subtotal: rows[0].SubTotal,
                status: rows[0].Status,
                data: rows[0].PedidoData,
            },

            itens: rows.map(r => ({
                idItem: r.ItemPedidoId,
                quantidade: r.Quantidade,
                valorItem: r.ValorItem,

                produto: {
                    nome: r.ProdutoNome,
                    valor: r.ProdutoValor,
                    categoria: {
                        id: r.CategoriaId,
                        nome: r.CategoriaNome,
                        descricao: r.CategoriaDescricao
                    }
                }
            }))
        };

        return pedido;
    },
    atualizar: async (id, pedido, itemPedidos, endereco) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            // Atualizar pedido (obrigatório)
            const sqlPedido = `
            UPDATE pedidos
            SET Nome = ?, Cpf = ?, 
            WHERE Id = ?
        `;

            const valuesPedido = [
                pedido.nome,
                pedido.cpf,
                id
            ];

            const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);

            let rowsItemPedidos = null;
            let rowsEnd = null;

            // Atualizar itemPedidos (opcional)
            if (itemPedidos) {
                const sqlItemPedidos = `
                UPDATE itemPedidoss
                SET Numero = ?
                WHERE Idpedido = ?
            `;

                const valuesItemPedidos = [
                    itemPedidos.numero,
                    id
                ];

                [rowsItemPedidos] = await conn.execute(sqlItemPedidos, valuesItemPedidos);
            }

            // Atualizar endereço (opcional)
            if (endereco) {
                const sqlEnd = `
                UPDATE enderecos
                SET Cep = ?, Logradouro = ?, Numero = ?, Bairro = ?,
                    Cidade = ?, Estado = ?, Complemento = ?
                WHERE Idpedido = ?
            `;

                const valuesEnd = [
                    endereco.cep,
                    endereco.logradouro,
                    endereco.numero,
                    endereco.bairro,
                    endereco.cidade,
                    endereco.estado,
                    endereco.complemento ?? null,
                    id
                ];

                [rowsEnd] = await conn.execute(sqlEnd, valuesEnd);
            }

            await conn.commit();

            return {
                idpedido: id,
                rowsPedido,
                rowsItemPedidos,
                rowsEnd
            };

        } catch (error) {
            await conn.rollback();
            throw new Error(error.message);
        }
    },

    deletar: async (id) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            await conn.execute(
                "DELETE FROM itemPedidoss WHERE Idpedido = ?",
                [id]
            );

            await conn.execute(
                "DELETE FROM enderecos WHERE Idpedido = ?",
                [id]
            );

            const [result] = await conn.execute(
                "DELETE FROM pedidos WHERE Id = ?",
                [id]
            );

            await conn.commit();

            return result;

        } catch (error) {
            await conn.rollback();
            throw new Error(error.message);

        } finally {
            conn.release();
        }
    }
};

export default pedidoRepository;