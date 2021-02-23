const express = require("express");
const passport = require("passport");
const controller = require("../controllers/thingsController");

const router = express.Router();

router.param("thingId", async (req, res, next, thingId) => {
  const foundThing = await controller.fetchThing(thingId, next);
  if (foundThing) {
    req.thing = foundThing;
    next();
  } else next({ status: 404, message: "Not Found" });
});

router.get("/garbages", controller.fetchGarbage);

router.get(
  "/treasures",
  passport.authenticate("jwt", { session: false }),
  controller.fetchTreasure
);

router.post("/", controller.createThing);

router.get("/:thingId", controller.thingDetail);

module.exports = router;
