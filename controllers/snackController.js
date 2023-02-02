const {getSnacks, getSnack, removeSnack, createSnack, putSnack} = require("../queries/snacks.js");

const snacks = async (req, res) => {
  try {
    const snacks = await getSnacks();
    return res.json(snacks);
  } catch(err) {
    console.log(err);
    res.status(500).json({error: "Internal server error"})
  }
}

const singleSnack = async (req, res) => {
  try {
    const snack = await getSnack(req.params.id);
    if (!snack) return res.status(400).json({error: "no snack with given id was found"})
    return res.json(snack);
  } catch(err) {
    console.log(err);
    res.status(500).json({error: "Internal server error"})
  }
}

const deleteSnack = async (req, res) => {
  try {
    const snack = await removeSnack(req.params.id);
    if (!snack) return res.status(400).json({error: "no snack with given id was found"})
    return res.json(snack);
  } catch(err) {
    console.log(err);
    res.status(500).json({error: "Internal server error"})
  }
}

const newSnack = async (req, res) => {
  try {
    if (!validateInput(req.body)) return res.status(400).json({error: "Invalid input please check your input again"});
    const snack = await createSnack(req.body);
    return res.json(snack);
  } catch(err) {
    console.log(err);
    res.status(500).json({error: "Internal server error"})
  }
}

const updateSnack = async (req, res) => {
  try {
    if (!validateInput(req.body)) return res.status(400).json({error: "Invalid input please check your input again"});
    const snack = await putSnack(req.body, req.params.id);
    return res.json(snack);
  } catch(err) {
    console.log(err);
    res.status(500).json({error: "Internal server error"})
  }
}

function validateInput(snack) {
  console.log(snack.fiber, typeof snack.fiber)
  return ((snack.name && typeof snack.name === "string") && 
    Number(snack.fiber) !== "NaN" && 
    Number(snack.protein) !== "NaN"
  )
}

module.exports = {snacks, singleSnack, deleteSnack, newSnack, updateSnack};