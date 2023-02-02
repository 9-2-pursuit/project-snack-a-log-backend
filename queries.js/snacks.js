const confirmHealth = require("../confirmHealth.js");
const db = require("../db/dbConfig.js");

const getSnacks = async () => {
  try {
    const snacks = await db.any("SELECT * FROM snacks");
    return snacks;
  } catch(err) {
    console.error(err)
  }
}

const getSnack = async (id) => {
  try {
    const snack = await db.oneOrNone("SELECT * FROM snacks WHERE id = ${id}", {id});
    return snack;
  } catch(err) {
    console.error(err)
  }
}

const removeSnack = async (id) => {
  try {
    const snack = await db.oneOrNone("DELETE FROM snacks WHERE id = ${id} RETURNING id", {id});
    return snack;
  } catch(err) {
    console.error(err)
  }
}

const createSnack = async (snack) => {
  try {
    snack.name = capitalize(snack.name);
    snack.is_healthy = confirmHealth(snack);

    let query = 'INSERT INTO snacks ';
    const fields = `(name, fiber, protein, added_sugar, is_healthy${snack.image ? ", image" : ""})`;

    let values = 'VALUES (${name}, ${fiber}, ${protein}, ${added_sugar}, ${is_healthy}';
    if (snack.image)
      values += ', ${snack.image}';
    values += ")";

    query += fields;
    query += values;
    query += " RETURNING id";

    const result = await db.one(query, snack);
    return result;
  } catch(err) {
    console.error(err)
  }
}

const putSnack = async (snack, id) => {
  try {
    snack.name = capitalize(snack.name);
    snack.is_healthy = confirmHealth(snack);

    let query = 'UPDATE snacks SET name = ${name}, fiber = ${fiber}, protein = ${protein}, added_sugar = ${added_sugar}, is_healthy = ${is_healthy}, image = ${image} WHERE id = ${id} RETURNING id';

    const result = await db.one(query, {id, ...snack});
    return result;
  } catch(err) {
    console.error(err)
  }
}

function capitalize(str) {
   return str.split(" ").map(itm => `${itm[0].toUpperCase()}${itm.slice(1).toLowerCase()}`).join(" ");
}


module.exports = { getSnacks, getSnack, removeSnack, createSnack, putSnack };
