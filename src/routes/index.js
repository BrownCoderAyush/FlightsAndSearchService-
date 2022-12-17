const express = require("express");
const router = express.Router();

const v1ApiRoutes = require("./V1/index");

router.use("/v1" , v1ApiRoutes);
// router.use("v2",v2ApiRoutes);
module.exports = router;