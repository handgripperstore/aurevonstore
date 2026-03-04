import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(200).send('OK')
  }

  const message = req.body.message?.text

  if (!message) {
    return res.status(200).send('No message')
  }

  const parts = message.trim().split(" ")

  if (parts.length !== 2) {
    return res.status(200).send('Invalid format')
  }

  const action = parts[0].toLowerCase()
  const orderCode = parts[1]

  if (action !== "yes" && action !== "no") {
    return res.status(200).send('Invalid command')
  }

  const newStatus = action === "yes" ? "approved" : "rejected"

  await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('order_code', orderCode)

  return res.status(200).send('Updated')
}
