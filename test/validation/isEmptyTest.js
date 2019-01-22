const app = require("../../validation/isEmpty");
const chai = require("chai");
const expect = chai.expect;

describe("Test isEmpty()", function() {
	it("Lerren String übergeben -> Antwort mit true", function() {
		expect(app("")).to.be.true;
	});

	it("String \"test\" übergeben -> Antwort mit false", function() {
		expect(app("test")).to.be.false;
	});
});
