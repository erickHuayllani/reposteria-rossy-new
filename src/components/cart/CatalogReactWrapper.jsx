import React from "react";
import { CartProvider } from "../../contexts/CartContext.jsx";
import Catalog from "../catalog/Catalog.jsx";

export default function CatalogReactWrapper() {
  return (
    <CartProvider>
      <Catalog />
    </CartProvider>
  );
}
