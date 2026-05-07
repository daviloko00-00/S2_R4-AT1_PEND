import { getPedidos } from "../api/api.js";

const statusConfig = {
    "Aberto": { cor: "#5edf55c7", label: "Aberto" },
    "Finalizado": { cor: "#f31111bc", label: "Finalizado" },
    "Pendente": { cor: "#cec12ebd", label: "Pendente" }
};

export async function renderPedidos(root) {
    root.innerHTML = `
        <section class="page-heading">
            <div class="page-title">
                <span class="eyebrow">Pedidos</span>
                <h2>Seus pedidos realizados</h2>
                <p>Acompanhe o status de suas compras e veja os detalhes de cada pedido.</p>
            </div>
        </section>
        <section class="pedidos-list" id="lista"></section>
    `;

    const lista = document.getElementById("lista");
    const pedidos = await getPedidos();

    if (pedidos.length === 0) {
        lista.innerHTML = '<p class="empty-state">Você ainda não realizou nenhum pedido. Faça suas compras agora!</p>';
        return;
    }

    pedidos.forEach(pedido => {
        const statusInfo = statusConfig[pedido.status] || {
            cor: "#999",
            label: pedido.status || "Desconhecido"
        };

        const dataPedido = pedido.dataCad 
            ? new Date(pedido.dataCad).toLocaleDateString('pt-BR')
            : 'Data não disponível';

        const div = document.createElement("div");
        div.className = "pedido-card";
        div.innerHTML = `
            <div class="pedido-header">
                <div>
                    <h3>Pedido #${pedido.id}</h3>
                    <p class="pedido-data">${dataPedido}</p>
                </div>
                <span class="status-badge" style="background-color: ${statusInfo.cor}">
                    ${statusInfo.label}
                </span>
            </div>
            <div class="pedido-info">
                <div class="info-item">
                    <p class="label">ID do Cliente</p>
                    <p class="value">${pedido.clienteId}</p>
                </div>
                <div class="info-item">
                    <p class="label">Subtotal</p>
                    <p class="value">R$ ${parseFloat(pedido.subtotal).toFixed(2)}</p>
                </div>
            </div>
        `;

        lista.appendChild(div);
    });
}
