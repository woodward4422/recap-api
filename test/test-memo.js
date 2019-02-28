const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const expect = chai.expect;
const agent = chai.request.agent(server);



const Memo = require('../models/memo');
const User = require("../models/user");


describe("Memos", function () {

    it("should be able to get Memos for a User", function (done) {
        agent
            .get("/memos")
            .set("Authorization", process.env.TEST_TOKEN + '')
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                console.log("Body: " + res.body);
                res.should.have.status(200);
                expect(res).to.be.json;
                done();
            });

    });

    it("should be able to create a Memo for a User", function (done) {
        agent
            .post("/memos/new")
            .set("Authorization", process.env.TEST_TOKEN + '')
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                console.log("Body: " + res.body);
                res.should.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });




});