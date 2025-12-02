import supabase from "../../lib/supabase.js";
import supabaseAdmin from "../../lib/supabaseAdmin.js";

export async function POST({ request }) {
  const form = await request.formData();
  const order_id = form.get("order_id");
  const status = form.get("status");

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", order_id);

  if (error) {
    return new Response("Error actualizando estado", { status: 500 });
  }

  return new Response(null, {
    status: 303,
    headers: { Location: "/admin/pedidos" },
  });
}
