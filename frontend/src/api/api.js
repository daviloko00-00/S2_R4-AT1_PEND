const API_URL = "http://10.87.169.112/:8081";

export async function getProdutos() {
    const res = await fetch(`${API_URL}/produtos`);
    return res.json();
}

export async function enviarPedido(pedido) {
    await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido)
    });
}