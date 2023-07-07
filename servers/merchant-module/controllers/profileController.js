const User = require('../models/gamingMerchantModel')
const gfsPromise = require('../config/gridfsDb')
const mongoose = require('mongoose');

const deleteImage = async(id) => {
  if (!id || id === 'undefined') return res.status(400).send('no image id');
  const _id = new mongoose.Types.ObjectId(id);
  try{
      const gfs = await gfsPromise;
      // console.log("merchant0",gfs)
      gfs.delete(_id, (err) => {
        if (err) return res.status(500).send('image deletion error');
      });
  }
  catch(error){
      console.log("trying err",err)
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user, status: true, msg: "Profile found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.updateProfile = async(req,res) =>{
  try{
    const {id , prevImgId} = req.query
    console.log(prevImgId)
    const file = req.file 
    let fid;
    if(file) fid = file.id;
    console.log(fid)
    await User.findByIdAndUpdate({_id:id},{...req.body,image:fid?fid:prevImgId},{ new: true }).then((user)=>{
      if(fid && prevImgId) deleteImage(prevImgId)
      res.status(200).json({user,status:true,msg:"Profile Updated successfully"})
    })
  }
  catch(err){
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.getProfilePic = async (req, res) => {
  try {
    const { id } = req.params;
    const _id = new mongoose.Types.ObjectId(id);
    const gfs = await gfsPromise;

    const file = await gfs.find({ _id }).toArray();
    if (!file || file.length === 0) {
      return res.status(400).send('No file exists');
    }

    const readStream = gfs.openDownloadStream(_id);
    readStream.on('error', (err) => {
      console.error(err);
      return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    });

    res.set('Content-Type', file[0].contentType);
    readStream.pipe(res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: 'Internal Server Error' });
  }
};