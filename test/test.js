var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var chaiHttp = require('chai-http');
const app = require('../config/app');
const ejs = require('ejs');

chai.should();
chai.use(chaiHttp);
chai.use(sinonChai);

describe("Controller", function() {
    describe("GET Routes", function() {

        var spy;

        afterEach(function() {
            spy.restore();
        })

        it("Rendered Restaurant List", done => {
            spy = sinon.spy(ejs, '__express');
            chai.request(app)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
                spy.should.have.been.calledOnce;
                done();
            });
        });

        it("Rendered Filtered Indian Restaurants", done => {
            chai.request(app)
            .get("/restaurant/Indian")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

        it("Rendered Bar Chef's Restaurant Page", done => {
            chai.request(app)
            .get("/restaurant/details/6376bdac6e8f50a726373917")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

        it("Rendered Vendor Reservation List", done => {
            chai.request(app)
            .get("/reservation/list/6376bdac6e8f50a726373917")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

        it("Rendered Vendor Reservation Dashboard", done => {
            chai.request(app)
            .get("/reservation/dashboard/6376bdac6e8f50a726373917")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
            
    });     
});