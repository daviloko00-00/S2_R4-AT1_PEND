import pedidoRepository from "../repositories/pedidoRepository.js";
import { statusPedido } from "../enum/statusPedido.js";
import { Pedido } from "../models/Pedidos.js";
import { itemPedidos } from "../models/itensPedidos.js";
const pedidoController = {

    criar: async (req, res) => {
        try {
            let { clienteId, itens } = req.body;

            
            
            
            //  CRIA OBJETOS 
            console.log("criação dos itens" )
            const itensPedido = itens.map(item =>
                itemPedidos.criar({
                    produtoId: item.produtoId,
                    quantidade: item.quantidade,
                    valorItem : item.valorItem
                })
            )
            console.log(itensPedido)
            
            const subtotalItens = itemPedidos.calcularSubTotal(itensPedido);
            //método pro calculo desse pedido
            // primeiro os itens e depois a cabaça do pedido
            const pedido = Pedido.criar({
                clienteId,
                subtotalItens,
                status: statusPedido.ABERTO
            });
        
            //  REPOSITORY 
            const result = await pedidoRepository.criar(
                pedido,
                itensPedido
                
            );

            return res.status(201).json({ result });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    atualizar: async (req, res) => {
    try {
        const id = Number(req.query.id);

        let {
            nome,
            cpf,
            numeroTelefone,
            numeroCasa,
            cep
        } = req.body;

        // pedidos obrigatório
        if (!id || !nome || !cpf) {
            return res.status(400).json({
                message: "ID, nome e CPF são obrigatórios"
            });
        }

        // Limpeza
        cpf = limparNumero(cpf);

        if (numeroTelefone) {
            numeroTelefone = limparNumero(numeroTelefone);
        }

        if (cep) {
            cep = limparNumero(cep);
        }

        // Validar CPF
        if (!validarCPF(cpf)) {
            return res.status(400).json({
                message: "CPF inválido"
            });
        }

        // pedidos obrigatório
        const pedidos = pedidos.editar({
            nome,
            cpf
        }, id);

        // Telefone opcional
        const telefone = numeroTelefone
            ? Telefone.editar({
                numero: numeroTelefone
            }, id)
            : null;

        let endereco = null;

        // Endereço  usando ViaCEP
        if (cep && numeroCasa) {
            const enderecoViaCep = await respostaViaCep(cep);

            if (!enderecoViaCep || enderecoViaCep.erro) {
                return res.status(400).json({
                    message: "CEP inválido"
                });
            }

            endereco = Enderecos.editar({
                cep,
                logradouro: enderecoViaCep.logradouro,
                numero: numeroCasa,
                bairro: enderecoViaCep.bairro,
                cidade: enderecoViaCep.localidade,
                estado: enderecoViaCep.estado,
                complemento: enderecoViaCep.complemento || null
            }, id);
        }

        const result = await pedidosRepository.atualizar(
            id,
            pedidos,
            telefone,
            endereco
        );

        return res.status(200).json({ result });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Ocorreu um erro no servidor",
            errorMessage: error.message
        });
    }
},

    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);

            if (!id) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }

            const result = await pedidosRepository.deletar(id);

            return res.status(200).json({ result });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    selecionar: async (req, res) => {
    try {
        const id = req.params.id ? Number(req.params.id) : null;

        if (id) {
            const pedido = await pedidoRepository.selecionarPorIdCompleto(id);
            return res.status(200).json(pedido);
        }

        const result = await pedidoRepository.selecionar();
        return res.status(200).json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Ocorreu um erro no servidor",
            errorMessage: error.message
        });
    }
}
};

export default pedidoController;



