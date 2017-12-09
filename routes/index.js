var express = require ("express");
var router = express.Router();
var filterProcess = require ("../controllers/filterProcess");
var authentication = require ("../controllers/authentication");
var watching = require ("../controllers/watchingEmail");
var settings = require ("../controllers/settings");

router.post("/login", authentication.check);
router.post("/watching", watching.check );
router.post("/addWatching", watching.add);
router.post("/forwarding", watching.string);
router.post("/adminSetting", settings.admin);
router.post("/userSetting", settings.user);
router.get("/allUsers", settings.allUsers);

module.exports = router;
