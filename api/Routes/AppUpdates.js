const router = require("express").Router();
const controller= require("../../Services/appUpdatesServices")

router.get("/get-all" ,controller.getAllappUpdates)
router.get("/get/:appUpdateId" , controller.getSpecificappUpdate)
router.delete("/delete/:appUpdateId" , controller.deleteappUpdate);
router.post("/create" , controller.createappUpdate);
router.put("/update" , controller.updateappUpdate);
router.delete("/deleteAll" , controller.deleteappUpdateAll);

module.exports = router;