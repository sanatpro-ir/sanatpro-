const Equipment = require("../models/Equipment");

exports.createEquipment = async (req, res) => {
  const equipment = await Equipment.create(req.body);
  res.status(201).json(equipment);
};

exports.getEquipments = async (req, res) => {
  const list = await Equipment.find().populate("supplier");
  res.json(list);
};
