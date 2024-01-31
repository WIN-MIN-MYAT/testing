const model =require("../models/itemModel")

module.exports.showAllItems=(req,res,next)=>{
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error"
            );
        }
        else {
            res.status(200).send(results)
        }
    }
    model.showAllItems(callback);
}

module.exports.showById=(req,res,next)=>{
    const data={item_id:req.params.item_id}
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error"
            );
        }
        else {
            if(results.length==0){
                res.status(404).send("Item Id is invalid")
            }
            else{
                if(results[0].special_ability==null){
                    results[0].special_ability="-"
                }
                res.status(200).send(results[0])
            }
        }
    }
    model.showById(data,callback);
}