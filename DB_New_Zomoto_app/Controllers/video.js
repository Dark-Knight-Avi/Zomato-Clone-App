const Video = require('../Models/video');


exports.checkvideodetails = (req, res) => {
    Video.find({})
    .exec(function(err,videos){
        if(err){
            console.log("error")
        }else{
            res.json(videos);
        }
    });
}

exports.checkvideodetailsbyid = (req, res) => {
    Video.findById(req.params.id)
    .exec(function(err,video){
        if(err){
            console.log("error");
        }else{
            res.json(video);
        }
    });
}


exports.postvideodetails = (req, res) => {
    var newVideo = new Video();
    newVideo.title=  req.body.title;
    newVideo.des=  req.body.des;
    newVideo.save(function(err,inserted){
if(err){
    console.log("error");
}else{
    res.json(inserted);
}
    });

}

exports.deletevideodetails = (req, res) => {
    Video.findByIdAndRemove(req.params.id,function(err,deletedVideo){

if(err){
    res.send("Error deleting");
}else{
    res.json(deletedVideo);
}
    });

}