const router = require("express").Router();
const History = require("../model/History");

//historyValidation
const { historyValidation } = require("../validation");

router.post("/", async (req, res) => {
  const { error } = historyValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const history = new History({
    idUser: req.body.idUser,
    participantes: req.body.participantes,
    apuesta: req.body.apuesta,
    ganador: req.body.ganador,
    ganancia: req.body.ganancia,
    perdida: req.body.perdida,
  });

  try {
    const saveHistory = await history.save();
    res.status(200).send("ok");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  //get all events
  const history = await History.find({});
  res.send(history);
});

module.exports = router;
