const router = require("express").Router();
const { setContact, getAllContacts, updateContact, deleteContact, filterContacts } = require("../controllers/contactController");

router.post("/createContact", setContact);
router.get("/allContacts", getAllContacts);
router.put("/updateContact", updateContact);
router.delete("/deleteContact", deleteContact);
router.get("/filterContacts", filterContacts)

module.exports = router;