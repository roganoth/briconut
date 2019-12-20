var orm = require("../config/orm.js");

var employees = {
    selectAll: function (cb) {
        orm.selectAll("employees", function (res) {
            cb(res);
        });
    },
    insertOne: function (cols, vals, cb) {
        orm.insertOne("employees", cols, vals, function (res) {
            cb(res);
        });
    },
    updateOne: function (objColVals, condition, cb) {
        orm.updateOne("employees", objColVals, condition, function (res) {
            cb(res);
        });
    },
    delete: function (condition, cb) {
        orm.delete("employees", condition, function (res) {
            cb(res);
        });
    }, 
    findAllWhere: function (cols, colVal, cb) {
        orm.findAllWhere("employees", cols, colVal, function (res) {
            cb(res);
        });
    }
};

module.exports = employees;