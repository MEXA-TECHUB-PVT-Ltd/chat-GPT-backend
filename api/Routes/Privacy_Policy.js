const router = require("express").Router();
const controller= require("../../Services/privacyPolicyServices")

router.get("/get-all" ,controller.getAllprivacyPolicys)
router.get("/get/:privacyPolicyId" , controller.getSpecificprivacyPolicy)
router.delete("/delete/:privacyPolicyId" , controller.deleteprivacyPolicy);
router.post("/create" , controller.createprivacyPolicy);
router.put("/update" , controller.updateprivacyPolicy);
router.delete("/deleteAll" , controller.deleteprivacyPolicyAll);

module.exports = router;