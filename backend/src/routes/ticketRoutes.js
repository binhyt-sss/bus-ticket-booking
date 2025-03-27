const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

router.get("/timve", ticketController.findTicket);
router.delete("/huyve/:mave", ticketController.cancelTicket);
module.exports = router;
