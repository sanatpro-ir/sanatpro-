const express = require("express");
const router = express.Router();

const Supplier = require("../models/Supplier");


router.get("/", async (req,res)=>{
  const suppliers = await Supplier.find();
  res.json(suppliers);
});


router.post("/", async(req,res)=>{
  const supplier = await Supplier.create(req.body);
  res.json(supplier);
});


module.exports = router;