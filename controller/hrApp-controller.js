var express = require("express");
var employees = require("../models/hrApp.js");
var router = express.Router();
var path = require("path")

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/employees", function (req, res) {
    employees.selectAll(function (data) {
        res.json({ employees: data });
    });
});

router.post("/employees", function (req, res) {
    employees.insertOne([
        "first_name", "last_name", "email", "phone", "hire_date", "position", "ssn", "dob", "marital", "gender", "full_time", "drivers_liscence", "gov_docs"
    ], [
        req.body.first_name, req.body.last_name, req.body.email, req.body.phone, req.body.hire_date, req.body.position, req.body.ssn, req.body.dob, req.body.marital, req.body.gender, req.body.full_time, req.body.drivers_liscence, req.body.gov_docs
    ], function (result) {
        console.log(result);
        res.json({ id: result.insertId });
    });
});

router.put("/employees/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    employees.updateOne({
        devoured: true
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        }
        else {
            res.json({ id: req.params.id });
        }
    });
});

router.delete("/employees/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    employees.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

router.get("/employees/", function (req, res) {
    var cols = req.body.column;
    var colVal = req.body.colVal;

    employees.findAllWhere(cols, colVal, function (data) {
        console.log(data);
        res.json({ employees: data });
    });
});

module.exports = router;