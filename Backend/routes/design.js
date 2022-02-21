const express = require('express');
const router = express.Router();

const {newDesign, getDesigns, getDesignDetails} = require("../controllers/desing-controller");
const { isAuthenticatedUser } = require("../middlewares/checkUserAuth");
const {isAuthenticatedSeller} = require("../middlewares/checkSellerAuth");
const {isAdmin} = require("../middlewares/checkAdmin")

router.post("/newDesign",isAuthenticatedUser,newDesign);
router.get("/getDesigns",isAuthenticatedSeller,isAdmin,getDesigns);
router.get("/design/:id",isAuthenticatedSeller,isAdmin,getDesignDetails);

module.exports = router