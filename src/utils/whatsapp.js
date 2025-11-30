// src/utils/whatsapp.js
export async function enviarWhatsApp(pedido) {
  const telefonoDueña = import.meta.env.PUBLIC_TELEFONO_DUEÑA;
  const mensaje = `Nuevo pedido ID ${pedido.id} por $${pedido.total}\n\nProductos:\n${pedido.productos.map(p => `• ${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}`).join('\n')}\n\nCliente: ${pedido.user_email}`;
  
  const url = `https://api.whatsapp.com/send?phone=${telefonoDueña}&text=${encodeURIComponent(mensaje)}`;
  
  // Esto abrirá WhatsApp Web/App con el mensaje predefinido
  window.open(url, '_blank');
}
