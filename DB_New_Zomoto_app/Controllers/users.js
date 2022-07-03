const users = require('../Models/users');
exports.checkuserdetails = (req, res) => {
    const {
        email,
        password
    } = req.body;

    users.find({
            email: email,
            password: password
        })
        .then(response => {
            if(response.length > 0){
                res.status(200).json({
                    message: "User login successfully ",
                    isauthenticateduser:true,
                    user: response
                })
            }
            else {
                res.status(200).json({
                    message: "User login un success ",
                    isauthenticateduser:false,
                    user: response
                })
            }
            

        })
        .catch(
            err => {
                res.status(500).json({
                    message: "Error",
                    error: err
                })
            }
        )
}

exports.Postdetailsofusers = (req, res) => {
   
    const {
        email,
        password,
        firstName,
        lastName
    } = req.body;

    users.find({
        email : email,
        password : password
    }).then(response => {
        if(response.length === 0){
            users.create({
                email : email,
                password : password,
                firstName : firstName,
                lastName : lastName
            }).then(response1 => {
                    res.status(200).json({
                        message : "User Created Successfully",
                        isAuthenticated : true,
                        user : response1
                    })
            }).catch(
                err => console.log(err)
            )}else{
                res.status(200).json({
                    message : "User already exists",
                    isAuthenticated : false,
                    user : response
                })
            }
        }).catch(
            err => console.log(err)
        )

}
