const router = require("express").Router();
const Events = require("../model/Events");

const { eventsValidation } = require("../validation");

router.post("/", async (req, res) => {
  const { error } = eventsValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  const eventExist = await Events.findOne({ evento: req.body.evento });
  if (eventExist) return res.status(400).send("El evento ya existe");

  const events = new Events({
    evento: req.body.evento,
    participantes: req.body.participantes,
  });

  try {
    const saveEvent = await events.save();
    res.status(200);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  //get all events
  const events = await Events.find({});
  res.send(events);
});

module.exports = router;
