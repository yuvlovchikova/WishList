const router = require("express").Router();
const pool = require("../database");
const authorization = require("../middleware/authorization");

module.exports = router;

//create list
router.post("/", authorization, async(req, res) => {
  try {
    const { name } = req.body;

    const newList = await pool.query('INSERT INTO lists (list_name, user_id) VALUES ($1, $2) RETURNING *', [name, req.user]);

    const { desires } = req.body;
    for (let desire of desires) {
      const currentDesire = await pool.query('INSERT INTO desires (desire_description) VALUES ($1) RETURNING *', [desire]);

      await pool.query('INSERT INTO list_desire (list_id, desire_id) VALUES ($1, $2)',
        [newList.rows[0].list_id, currentDesire.rows[0].desire_id]);
    }

    res.json(true);
  } catch(error) {
    console.error(error.message);
  }
})

//get lists of certain user
router.get("/", authorization, async(req, res) => {
  try {
    const lists = await pool.query('SELECT * from lists WHERE user_id = $1', [req.user]);
    res.json(lists.rows);
  } catch(error) {
    console.error(error.message);
  }
})

//get specific list
router.get("/:id/", async(req, res) => {
  const { id } = req.params;
  try {
    const list = await pool.query('SELECT * from lists WHERE list_id = $1', [id]);

    const desires = await pool.query('SELECT * from list_desire ' +
      'INNER JOIN desires ON list_desire.desire_id = desires.desire_id ' +
      'WHERE list_desire.list_id = $1', [id]);

    res.json({list: list.rows[0], desires: desires.rows});
  } catch(error) {
    console.error(error.message);
  }
})

//book a desire
router.post("/book", authorization, async(req, res) => {
  const { desireId, listId } = req.body;
  try {
    const desire = await pool.query('SELECT * from desires WHERE desire_id = $1', [desireId]);
    if (!desire.rows[0].desire_selected_by) {
      await pool.query('UPDATE desires SET desire_selected_by = $1 WHERE desire_id = $2', [req.user, desireId]);
      const desires =  await pool.query('SELECT * from list_desire ' +
        'INNER JOIN desires ON list_desire.desire_id = desires.desire_id ' +
        'WHERE list_desire.list_id = $1', [listId]);
      res.json(desires.rows);
    } else {
      res.json(false);
    }
  } catch(error) {
    console.error(error.message);
  }
})

//unbook a desire
router.post("/unbook", authorization, async(req, res) => {
  const { desireId, listId } = req.body;
  try {
    await pool.query('UPDATE desires SET desire_selected_by = $1 WHERE desire_id = $2', [null, desireId]);
    const desires =  await pool.query('SELECT * from list_desire ' +
      'INNER JOIN desires ON list_desire.desire_id = desires.desire_id ' +
      'WHERE list_desire.list_id = $1', [listId]);
    res.json(desires.rows);
  } catch(error) {
    console.error(error.message);
  }
})
