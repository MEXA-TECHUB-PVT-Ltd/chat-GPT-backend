const router = require("express").Router();
const controller= require("../../Services/userServices")

router.get("/get-all" ,controller.getAllusers)

router.get("/get-user-by-ID/:userId" , controller.getUserById)
router.delete("/delete/:userId" , controller.deleteuser);
router.delete("/deleteAll" , controller.deleteuserAll);

router.post("/create" , controller.createuser);
router.post("/otpEmail" , controller.forgetPassworduser);

router.put("/update-password" , controller.updateuser);
router.put("/update-profile" , controller.updateProfile);

router.put("/logout" , controller.logoutuser);
router.put("/login" , controller.loginuser);
router.put("/verify_profile" , controller.verifyProfile);

// router.post("/forget-password" , controller.forgetPassworduser);

module.exports = router;