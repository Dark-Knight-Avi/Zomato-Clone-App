const Locations = require('../Models/locations');

exports.getLocations = (req, res) => {
    Locations.find().then(
        response => {
            res.status(200).json({ message: "Locations Fetched Succesfully", locations: response })
        }
    ).catch(
        err => {
            res.status(500).json({ message: "Error", error: err })
        }
    )
}

exports.getLocationById = (req, res) => {
    const locationId = req.params.locId;
    const filteredLocations = locations.find(item => item.id == locationId);
    res.status(200).json({ message: "Locations Fetched Succesfully", location: filteredLocations })
}