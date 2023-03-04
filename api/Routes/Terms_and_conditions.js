const router = require("express").Router();
const controller= require("../../Services/termsAndConditionsServices")

router.get("/get-all" ,controller.getAllTermsAndConditions)
router.get("/get/:TermsAndConditionId" , controller.getSpecificTermsAndCondition)
router.delete("/delete/:TermsAndConditionId" , controller.deleteTermsAndCondition);
router.post("/create" , controller.createTermsAndCondition);
router.put("/update" , controller.updateTermsAndCondition);
router.delete("/deleteAll" , controller.deleteTermsAndConditionAll);

module.exports = router;