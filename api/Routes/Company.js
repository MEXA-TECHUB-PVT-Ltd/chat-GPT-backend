const router = require("express").Router();
const controller= require("../../Services/companyServices")

router.get("/get-all" ,controller.getAllcompanys)
router.get("/get-company-by-ID/:companyId" , controller.getSpecificcompany)
router.delete("/delete/:companyId" , controller.deletecompany);
router.post("/create" , controller.createcompany);
router.put("/update" , controller.updatecompany);
router.delete("/deleteAll" , controller.deleteCompanyAll);

module.exports = router;