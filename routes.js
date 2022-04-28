var express = require("express");
var router = express.Router();

const { Pool } = require("pg");

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "nirmal",
  port: 5432,
};

const pool = new Pool(credentials);

router.post("/boards", async (req, res) => {
  try {
    const { title } = req.body;
    let response = {};
    if (title) {
      let resp = await pool.query(
        `INSERT INTO boards (title) VALUES ($1) RETURNING *`,
        [title]
      );
      // console.log(resp.rows[0]);
      response = {
        success: true,
        createdKanban: resp.rows[0],
      };
    } else {
      response = {
        success: false,
        errMsg: "something went worng",
      };
    }
    res.status(201).send(response);
  } catch (e) {
    res.status(400).send({
      success: false,
      errMsg: e,
    });
  }
});

router.put("/boards/:id", async (req, res) => {
  try {
    const { stage } = req.body;
    const { id } = req.params;
    let response = {};
    if (stage >= 1 && stage <= 3) {
      let resp = await pool.query(
        "UPDATE boards SET stage = $1 WHERE id = $2 RETURNING *",
        [stage, id]
      );
      response = {
        success: true,
        updatedKanban: resp.rows[0],
      };
    } else {
      response = {
        success: false,
        errMsg: "stage must be 1, 2, or 3",
      };
    }
    res.status(201).send(response);
  } catch (e) {
    res.status(400).send({
      success: false,
      errMsg: e,
    });
  }
});

module.exports = router;
