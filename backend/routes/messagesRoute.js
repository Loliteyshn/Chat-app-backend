const router = require("express").Router();
const { addMessage, getAllMessages } = require("../controllers/messagesController");

router.post("/addMessage", addMessage);
router.post("/getMessages", getAllMessages)

module.exports = router;