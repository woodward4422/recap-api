const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const expect = chai.expect;
const agent = chai.request.agent(server);


const Memo = require('../models/memo');
const User = require("../models/user");

describe("Users", function () {

    const user = {
        username: 'noahtest',
    };

    User.findOneAndRemove({
        username: "testone"
    }, function () {
        agent
            .post("/sign-up")
            .send({
                username: "testone",
                password: "password"
            })
            .end(function (err, res) {
                console.log(res.body);
                res.should.have.status(200);
                agent.should.have.cookie("nToken");
                done();
            });
    });


});