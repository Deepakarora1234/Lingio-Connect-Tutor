import express from "express"
import Tutor from "../models/tutor.js"

const router = express.Router()

router.post("/", async(req,res)=>{
    const {password} = req.body
    const mobileNumber = password

    const tutor = await Tutor.find({
        mobileNumber : mobileNumber
    })
    if(!tutor)
        return res.status(400).json({message:"Tutor does not exist"})

    // console.log(tutor)

    res.status(201).json(tutor)
})

export default router
