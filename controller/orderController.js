const order = require('../models/orderModel')

const createOrders = async (req,res)=>{
    if(!req.body)return res.status(400).json('Post HTTP Data not Provided')
    create =await new order({...req.body,date:new Date()})
 await   create.save(err =>{
        if(!err) return res.json(create);
        return res.status(400).json({message : `Error while creating order ${err}`})
    })
}

const getOrders = async (req,res)=>{
    let data = await  order.find({})
    return res.json(data)
}
const getStoreOrCustomerOrderById = async(req,res)=>{
    const {id} = req.params
    let data = await  order.find({})
    let filterData = data.map(obg =>{
        let storeOrder =  obg.stores[0].storId 
        let customerOrder =  obg.clientId
        if (storeOrder==id || customerOrder ==id) {
         return obg
        }else if(customerOrder ==id){
            return obg
        }
        else{
            return  'We Not find any order for you'
        }
 
     })
    return res.json(filterData)
}


module.exports = {
   createOrders,
   getOrders,
   getStoreOrCustomerOrderById
 

}
