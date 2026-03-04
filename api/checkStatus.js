import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req,res){

const { order_code } = req.query

if(!order_code){
return res.json({status:"order missing"})
}

const { data, error } = await supabase
.from("orders")
.select("status")
.eq("order_code", order_code)
.limit(1)

if(!data || data.length === 0){
return res.json({status:"order missing"})
}

return res.json({status:data[0].status})

}
