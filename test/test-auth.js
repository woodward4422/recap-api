const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const expect = chai.expect;
const agent = chai.request.agent(server);


const Memo = require('../models/memo');
const User = require("../models/user");


describe("Users", function () {


    it("should not be able to login if they have not registered", function (done) {
        agent.post("/users/login", {
            email: "wrong@wrong.com",
            password: "nope"
        }).end(function (err, res) {
            res.status.should.be.equal(401);
            done();
        });
    });

    it("should be able to signup", function (done) {
        User.findOneAndRemove({
            username: "testone"
        }, function () {
            agent
                .post("/users/new")
                .send({
                    username: "testone",
                })
                .end(function (err, res) {
                    console.log("Body: " + res.body);
                    res.should.have.status(200);
                    // TODO: Verify that the response returned me a token
                    done();
                });
        });
    });

    //TODO: Write Tests to test the delete functionality


});