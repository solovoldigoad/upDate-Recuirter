const bodyParser = require("body-parser");
const ApplyForJob = require("../models/Applied");
const job = require("../models/jobs");
const User = require("../models/user");
const IsAuthenticated = require("../utils/IsAuthenticated");
const express = require("express");

require("dotenv").config();

const UserRouter = express.Router();

UserRouter.get("/Profile/", IsAuthenticated, (req, res) => {
  try {
    const { _id, name, ProfileURL, BgURL, WhoIAm, skills, email } = req.user;
    res.json({ _id, name, skills, ProfileURL, WhoIAm, BgURL, email });
  } catch (error) {
    res.send("something wne t wrong");
  }
});

// UserRouter.post("/api/apply/:jobId",IsAuthenticated,async(req,res)=>{
//     try {

//       const Job_ID=req.params.jobId;
//        const u_id=req.user._id
//     const user=req.user;
//     const jobdetails=await job.findOne({_id:Job_ID})

//        const appliedJob = new ApplyForJob({jobID:Job_ID ,UID:u_id,UserName:user.name,jobTitle:jobdetails.title})

//        if(appliedJob){
//          await appliedJob.save()
//      return  res.send( u_id +"applyeid "+Job_ID)
//        }
//        res.json({
//         message:"try again later"
//        })

//     } catch (error) {
//       return res.json({
//         message:"something went wrong"
//       })
//     }
//   })

UserRouter.get("/MarketPlace", IsAuthenticated, async (req, res) => {
   const limit=req.query.limit||10;
   const page=req.query.page||1
   const skip =(page-1)*limit ;
  try {
    const jobs = await job.find().skip(skip).limit(limit);
    return res.send(jobs);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error fetching jobs");
  }
});


UserRouter.patch("/Profile/edit", IsAuthenticated,async(req, res) => {
  try {
    const userUpdates = req.body;
    const allowedUpdates = ["name", "skills", "ProfileURL", "BgURL","Education", "Experince"];
 
  
    // Check if all keys in the update are allowed
    const isAllowed = Object.keys(userUpdates).every(key => allowedUpdates.includes(key));
    if (!isAllowed) {
      return res.status(400).json({ message: "Invalid update keys provided." });
    }
  
    // Check if ProfileURL or BgURL size exceeds the allowed limit
  
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.user._id },
      userUpdates,
      {
        new: true, // Return the updated document
        runValidators: true,
      }
    );
    return res.json("success")
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "An error occurred while updating the profile." });
  }
  
  
    });
  


UserRouter.get("/job/:jobid", IsAuthenticated, async (req, res) => {
  try {
    const jobid = req.params.jobid;
    const jobdetails = await job.findOne({ _id: jobid });

    res.send(jobdetails);
  } catch (error) {
    res.status(400).send("seems like your jobid is not exist");
  }
});

module.exports = UserRouter;
