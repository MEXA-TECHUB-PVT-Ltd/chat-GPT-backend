const router = require("express").Router();
const controller= require("../../Services/adminServices")
// const htmlFile= require("../../Services/helloWorld.html")


router.get("/get-all" ,controller.getAlladmins)
router.get("/get-admin-by-ID/:adminId" , controller.getSpecificadmin)
router.delete("/delete/:adminId" , controller.deleteadmin);
router.post("/create" , controller.createadmin);
router.put("/update-credentials" , controller.updateadmin);
router.put("/logout" , controller.logoutAdmin);
router.put("/login" , controller.loginAdmin);
router.put("/update-profile" , controller.updateadminProfile);

// router.post("/admin" , htmlFile);

router.post("/otpEmail" , controller.forgetPasswordAdmin);

module.exports = router;