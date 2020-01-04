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
        "first_name", "last_name", "email", "phone", "hire_date", "position", "ssn", "dob", "marital", "gender", "full_time", "drivers_license", "gov_docs"
    ], [
        req.body.first_name, req.body.last_name, req.body.email, req.body.phone, req.body.hire_date, req.body.position, req.body.ssn, req.body.dob, req.body.marital, req.body.gender, req.body.full_time, req.body.drivers_license, req.body.gov_docs
    ], function (result) {
        console.log(result);
        res.json({ id: result.insertId });
    });
});

router.put("/employees/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    employees.updateOne({
        first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, phone: req.body.phone, hire_date: req.body.hire_date, position: req.body.position, ssn: req.body.ssn, dob: req.body.dob, marital: req.body.marital, gender: req.body.gender, full_time: req.body.full_time, drivers_license: req.body.drivers_license, gov_docs: req.body.gov_docs
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

router.get("/employees/:column/:colVal", function (req, res) {
    var cols = req.params.column;
    var colVal = req.params.colVal;
    console.log(cols);
    console.log(colVal);
    employees.findAllWhere(cols, colVal, function (data) {
        console.log(data);
        res.json({ employees: data });
    });
});

module.exports = router;