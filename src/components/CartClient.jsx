import React, { useEffect, useState } from 'react';

export default function CartClient() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const raw = localStorage.getItem('rr_cart');
    if (raw) setCart(JSON.parse(raw));
  }, []);
  useEffect(() => {
    localStorage.setItem('rr_cart', JSON.stringify(cart));
  }, [cart]);

  // Listen for add-to-cart clicks from ProductCard (delegated)
  useEffect(() => {
    function handler(e) {
      const btn = e.target.closest?.('.add-to-cart');
      if (!btn) return;
      const id = btn.dataset.id;
      const name = btn.closest('article')?.querySelector('h3')?.innerText || 'Producto';
      const priceText = btn.closest('article')?.querySelector('.text-lg')?.innerText || '$0';
      const price = parseFloat(priceText.replace('$','')) || 0;
      setCart(prev => {
        const found = prev.find(x => x.id===id);
        if (found) return prev.map(x => x.id===id ? {...x, qty: x.qty+1} : x);
        return [...prev, { id, name, price, qty: 1 }];
      });
    }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  function inc(id){ setCart(prev => prev.map(p => p.id===id ? {...p, qty: p.qty+1} : p)); }
  function dec(id){ setCart(prev => prev.map(p => p.id===id ? {...p, qty: Math.max(1,p.qty-1)} : p)); }
  function remove(id){ setCart(prev => prev.filter(p => p.id!==id)); }
  const total = cart.reduce((s,i)=> s + i.price * i.qty, 0);

  return (
    <aside className="bg-white p-4 rounded-2xl shadow max-w-md">
      <h3 className="font-bold mb-2">Tu carrito</h3>
      {cart.length===0 ? (
        <div className="text-sm text-gray-500">Tu carrito está vacío.</div>
      ):(
        <>
          <ul className="space-y-3">
            {cart.map(item=>(
              <li key={item.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">${item.price.toFixed(2)} · {item.qty}u</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>dec(item.id)} className="px-2 py-1 rounded bg-gray-100">-</button>
                  <button onClick={()=>inc(item.id)} className="px-2 py-1 rounded bg-gray-100">+</button>
                  <button onClick={()=>remove(item.id)} className="px-2 py-1 text-red-500">✕</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <div className="font-bold">Total</div>
            <div className="font-bold">${total.toFixed(2)}</div>
          </div>
          <div className="mt-3">
            <button className="w-full bg-orange-500 text-white py-2 rounded">Realizar pedido</button>
          </div>
        </>
      )}
    </aside>
  );
}
