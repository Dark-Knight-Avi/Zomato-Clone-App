const Items = require('../Models/menuItems');

exports.getMenuItemsByRestaurant = (req, res) => {
    const { resId } = req.params;
    Items.find({ restaurantId:resId })
        .then(response => {
            res.status(200).json({ message: "Menu Items Fetched Succesfully", items: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
    }


        exports.addMenuItems = (req, res) => {
            var newItems = new Items();
            newItems.name=  req.body.name;
            newItems.description=  req.body.description;
            newItems.restaurantId=  req.body.restaurantId;
            newItems.price=  req.body.price;
            newItems.qty=  req.body.qty;
            newItems.image=  req.body.image;

            
            newItems.save(function(err,inserted){
        if(err){
            console.log("error");
        }else{
            res.json(inserted);
        }
            });
        
        }
