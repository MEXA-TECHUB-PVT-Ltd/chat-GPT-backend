const router = require("express").Router();
const controller= require("../../Services/userSubscriptionServices")

router.get("/get-all" ,controller.getAlluserSubscriptions)
router.get("/get/:userSubscriptionId" , controller.getSpecificuserSubscription)
router.delete("/delete/:userSubscriptionId" , controller.deleteuserSubscription);
router.post("/create" , controller.createuserSubscription);
router.put("/update" , controller.updateuserSubscription);
router.delete("/deleteAll" , controller.deleteuserSubscriptionAll);
router.post("/getByUserId" , controller.getSpecificuserSubscriptionByUserId)
router.get("/getTotalSubscriptions" , controller.getTotalSubscriptionsActive)

module.exports = router;