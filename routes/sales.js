// routes/sales.js
const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");

router.post("/", salesController.createSale);
router.get("/", salesController.getSales);
router.get("/:id", salesController.getSaleById);
router.put("/:id", salesController.updateSale);
router.delete("/:id", salesController.deleteSale);
router.get("/period/:period", salesController.getSalesByPeriod);

module.exports = router;
