const router = require("express").Router();
const controller= require("../../Services/subscriptionPlanServices")

router.get("/get-all" ,controller.getAllsubscriptionPlans)
router.get("/get/:subscriptionPlanId" , controller.getSpecificsubscriptionPlan)
router.delete("/delete/:subscriptionPlanId" , controller.deletesubscriptionPlan);
router.post("/create" , controller.createsubscriptionPlan);
router.put("/update" , controller.updatesubscriptionPlan);
router.delete("/deleteAll" , controller.deletesubscriptionPlanAll);

module.exports = router;