const router = require("express").Router();
const controller= require("../../Services/roomServices")

router.get("/get-all" ,controller.getAllrooms)
router.get("/get/:roomId" , controller.getSpecificroom)
router.delete("/delete/:roomId" , controller.deleteroom);
router.post("/create" , controller.createroom);
router.put("/update" , controller.updateroom);
router.delete("/deleteAll" , controller.deleteroomAll);
router.post("/get-room-by-user-id" ,controller.getroomByUserId)
router.delete("/deleteAllByUserId" ,controller.deleteroomAllByUserId)

module.exports = router;