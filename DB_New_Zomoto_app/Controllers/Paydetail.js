const Paydetails = require('../Models/Paydetail');

exports.postpaydetails = (req, res) => {
    var newPaydetail = new Paydetails();
    newPaydetail.name=  req.body.name;
    newPaydetail.mobile=  req.body.mobile;
    newPaydetail.email=  req.body.email;
    newPaydetail.address=  req.body.address;
    newPaydetail.amount=  req.body.amount;
    newPaydetail.shop=  req.body.shop;
    newPaydetail.shopName=  req.body.shopName;
    newPaydetail.accountuser=  req.body.accountuser;
    newPaydetail.meal1=  req.body.meal1;
    newPaydetail.cost1=  req.body.cost1;
    newPaydetail.img1=  req.body.img1;
    newPaydetail.meal2=  req.body.meal2;
    newPaydetail.cost2=  req.body.cost2;
    newPaydetail.img2=  req.body.img2;
    newPaydetail.save(function(err,inserted){
if(err){
    console.log("error");
}else{
    res.json(inserted);
}
    });

}


exports.showorderdetailsbyid = (req, res) => {
    const { accid } = req.params;
    Paydetails.find({ accountuser: accid })
        .then(response => {
            res.status(200).json({ message: "Order details Fetched Succesfully", Paydetails: response })
        }).catch(err => {
            res.status(500).json({ error: err })
        })
}