// controllers/salesController.js
const db = require("../models");
const Sale = db.Sale;

exports.createSale = async (req, res) => {
  const { item, price, quantity } = req.body;
  try {
    const newSale = await Sale.create({ item, price, quantity });
    res.status(201).json(newSale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSale = async (req, res) => {
  const { item, price, quantity } = req.body;
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });
    sale.item = item;
    sale.price = price;
    sale.quantity = quantity;
    await sale.save();
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });
    await sale.destroy();
    res.json({ message: "Sale deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSalesByPeriod = async (req, res) => {
  const { period } = req.params;
  let startDate, endDate;

  const currentDate = new Date();
  switch (period) {
    case "daily":
      startDate = new Date(currentDate.setHours(0, 0, 0, 0));
      endDate = new Date(currentDate.setHours(23, 59, 59, 999));
      break;
    case "weekly":
      startDate = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay())
      );
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)
      );
      endDate.setHours(23, 59, 59, 999);
      break;
    case "monthly":
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      endDate.setHours(23, 59, 59, 999);
      break;
    default:
      return res.status(400).json({ message: "Invalid period" });
  }

  try {
    const sales = await Sale.findAll({
      where: { date: { [db.Sequelize.Op.between]: [startDate, endDate] } },
    });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
