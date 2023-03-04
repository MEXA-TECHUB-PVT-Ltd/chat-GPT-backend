const router = require("express").Router();
const controller= require("../../Services/msgRoomServices")

router.get("/get-all" ,controller.getAllMsgRooms)
router.post("/create" , controller.createMsgRoom);
router.put("/update" , controller.updateMsgRoom);
router.delete("/deleteAll" , controller.deleteMsgRoomAll);
// router.post("/get-MsgRoom-by-user-id" ,controller.getMsgRoomByUserId)
router.post("/clear_chat" , controller.ClearChatMsgs);

module.exports = router;