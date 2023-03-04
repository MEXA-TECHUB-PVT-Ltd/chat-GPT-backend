const router = require("express").Router();
const controller= require("../../Services/faqsServices")

router.get("/get-all" ,controller.getAllfaqss)
router.get("/get/:faqsId" , controller.getSpecificfaqs)
router.delete("/delete/:faqsId" , controller.deletefaqs);
router.post("/create" , controller.createfaqs);
router.put("/update" , controller.updatefaqs);
router.delete("/deleteAll" , controller.deletefaqsAll);

module.exports = router;