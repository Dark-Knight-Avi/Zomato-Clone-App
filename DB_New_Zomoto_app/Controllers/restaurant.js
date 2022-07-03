const Restaurant = require('../Models/restaurant');

exports.filterRestaurants = (req, res) => {
    let filterPayload = {};

        const reqBody = req.body;
        const location = reqBody.location;
        const mealtype = reqBody.mealtype;
        const cuisine = reqBody.cuisine;
        const lcost = reqBody.lcost;
        const hcost = reqBody.hcost;
        const lrate = reqBody.lrate;
        const hrate = reqBody.hrate;
        const sort = reqBody.sort ? reqBody.sort : 1;
        const page = reqBody.page ? reqBody.page : 1;

        const perPageCount = reqBody.perPageCount ? reqBody.perPageCount :2 ;
        const startIndex = (page * perPageCount) - perPageCount;
        const endIndex = (page * perPageCount);


    if (mealtype) {
        filterPayload = {
            mealtype_id: mealtype
        }
    }
    if (mealtype && cuisine) {
        filterPayload = {
            mealtype_id: mealtype,
            cuisine_id: { $in: cuisine }
        }
    }
    if (mealtype && lrate && hrate ) {
        filterPayload = {
            mealtype_id: mealtype,
            aggregate_rating: { $lte: lrate, $gte: hrate }
            
        }
    }
   if (mealtype && hcost && lcost) {
        filterPayload = {
            mealtype_id: mealtype,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealtype && hcost && lcost && lrate && hrate) {
        filterPayload = {
            mealtype_id: mealtype,
            min_price: { $lte: hcost, $gte: lcost },
            aggregate_rating: { $lte: lrate, $gte: hrate }
        }
    }
    
    if (mealtype && cuisine && lcost && hcost) {
        filterPayload = {
            mealtype_id: mealtype,
            cuisine_id: { $in: cuisine },
            min_price: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealtype && cuisine && lcost && hcost && lrate && hrate) {
        filterPayload = {
            mealtype_id: mealtype,
            cuisine_id: { $in: cuisine },
            min_price: { $lte: hcost, $gte: lcost },
            aggregate_rating: { $lte: lrate, $gte: hrate }
        }
    }
    if (mealtype && location) {
        filterPayload = {
            mealtype_id: mealtype,
            location_id: location
        }
    }
    if (mealtype && location && lrate && hrate) {
        filterPayload = {
            mealtype_id: mealtype,
            location_id: location,
            aggregate_rating: { $lte: lrate, $gte: hrate }
        }
    }
    if (mealtype && location && cuisine) {
        filterPayload = {
            mealtype_id: mealtype,
            location_id: location,
            cuisine_id: { $in: cuisine }
        }
    }
    if (mealtype && location && cuisine && lrate && hrate) {
        filterPayload = {
            mealtype_id: mealtype,
            location_id: location,
            cuisine_id: { $in: cuisine },
            aggregate_rating: { $lte: lrate, $gte: hrate }
        }
    }
    if (mealtype && location && lcost && hcost) {
        filterPayload = {
            mealtype_id: mealtype,
            location_id: location,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealtype && location && lcost && hcost && lrate && hrate) {
        filterPayload = {
            mealtype_id: mealtype,
            location_id: location,
            min_price: { $lte: hcost, $gte: lcost },
            aggregate_rating: { $lte: lrate, $gte: hrate }
        }
    }
    if (mealtype && location && cuisine && lcost && hcost) {
        filterPayload = {
            mealtype_id: mealtype,
            location_id: location,
            cuisine_id: { $in: cuisine },
            min_price: { $lte: hcost, $gte: lcost }
        }
    } 

    if (mealtype && location && cuisine && lcost && hcost && lrate && hrate) {
        filterPayload = {
            mealtype_id: mealtype,
            location_id: location,
            cuisine_id: { $in: cuisine },
            min_price: { $lte: hcost, $gte: lcost },
            aggregate_rating: { $lte: lrate, $gte: hrate }
        }
    } 

    Restaurant.find(filterPayload).sort({ min_price: sort })
        .then(response => {
            // Pagination Logic 
            const count = Math.ceil(response.length / perPageCount);
            const pageCountArr = [];
            const filteredResponse = response.slice(startIndex, endIndex);
            for (var i = 1; i <= count; i++) 
            {           
                pageCountArr.push(i);       
             }
            res.status(200).json({ message: "Restaurants Fetched Succesfully", restaurants: filteredResponse,pageCount: pageCountArr, totalCount: response.length })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}


exports.getRestaurantsByLocation = (req, res) => {
    const { locationId } = req.params;
    Restaurant.find({ location_id: locationId })
        .then(response => {
            res.status(200).json({ message: "Restaurants Fetched Succesfully", restaurants: response })
        }).catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getRestaurantsDetailsById = (req, res) => {
    const { resId } = req.params;
    Restaurant.findById(resId)
        .then(response => {
            res.status(200).json({ message: "Restaurants Fetched Succesfully", restaurant: response })
        }).catch(err => {
            res.status(500).json({ error: err })
        })
}



