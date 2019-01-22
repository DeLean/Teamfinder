const server = require("../../server");
const request = require("supertest");
const assert = require("chai").assert;
var chai = require("chai");
var expect = chai.expect;

var name = "testRand";
var email = "testRandd@mail.com";
var password = "password";
var password2 = "password";

describe("Users Route testing", function() {
	//Testen von /register route
	describe("POST an /register senden", function() {
		it("Nutzer kann sich mit Name, Passwort und Email registrieren", function(done) {
			request(server)
				.post("/api/users/register")
				.set("Content-Type", "application/json")
				.send({
					email: email,
					name: name,
					password: password,
					password2: password2
				})
				.expect(200)
				.end(function(err, res) {
					if (err) return done(err);
				});

			done();
		});

		it("Leeren namen senden, antwort mit Error 400", function(done) {
			request(server)
				.post("/api/users/register")
				.set("Content-Type", "application/json")
				.send({
					email: email,
					name: "",
					password: password,
					password2: password2
				})
				.expect(400)
				.end(function(err, res) {
					if (err) return done();
				});

			done();
		});

		it("Zu kleinen namen senden, antwort mit Error 400", function(done) {
			request(server)
				.post("/api/users/register")
				.set("Content-Type", "application/json")
				.send({
					email: email,
					name: "s",
					password: password,
					password2: password2
				})
				.expect(400)
				.end(function(err, res) {
					if (err) return done(err);
				});

			done();
		});

		it("Zu langen namen senden, antwort mit Error 400", function(done) {
			request(server)
				.post("/api/users/register")
				.set("Content-Type", "application/json")
				.send({
					email: email,
					name: "testestestestestestestestestest",
					password: password,
					password2: password2
				})
				.expect(400)
				.end(function(err, res) {
					if (err) return done();
				});

			done();
		});
		it("Leeres Email-Feld senden, antwort mit Error 400", function(done) {
			request(server)
				.post("/api/users/register")
				.set("Content-Type", "application/json")
				.send({
					email: "",
					name: name,
					password: password,
					password2: password2
				})
				.expect(400)
				.end(function(err, res) {
					if (err) return done();
				});

			done();
		});

		it("Falsches Email-Format senden, antwort mit Error 400", function(done) {
			request(server)
				.post("/api/users/register")
				.set("Content-Type", "application/json")
				.send({
					email: "thisisnot.email",
					name: name,
					password: password,
					password2: password2
				})
				.expect(400)
				.end(function(err, res) {
					if (err) return done();
				});

			done();
		});

		it("Leeres Passwort senden, antwort mit Error 400", function(done) {
			request(server)
				.post("/api/users/register")
				.set("Content-Type", "application/json")
				.send({
					email: email,
					name: name,
					password: "",
					password2: password2
				})
				.expect(400)
				.end(function(err, res) {
					if (err) return done();
				});

			done();
		});

		it("Leeres Passwort2 senden, antwort mit Error 400", function(done) {
			request(server)
				.post("/api/users/register")
				.set("Content-Type", "application/json")
				.send({
					email: email,
					name: name,
					password: password,
					password2: ""
				})
				.expect(400)
				.end(function(err, res) {
					if (err) return done();
				});

			done();
		});

		it("Zu kleines Passwort senden, antwort mit Error 400", function(done) {
			request(server)
				.post("/api/users/register")
				.set("Content-Type", "application/json")
				.send({
					email: email,
					name: name,
					password: "1234",
					password2: password2
				})
				.expect(400)
				.end(function(err, res) {
					if (err) return done();
				});

			done();
		});

		it("Leeres Passwort senden, antwort mit Error 400", function(done) {
			request(server)
				.post("/api/users/register")
				.set("Content-Type", "application/json")
				.send({
					email: email,
					name: name,
					password: "",
					password2: password2
				})
				.expect(400)
				.end(function(err, res) {
					if (err) return done();
				});

			done();
		});
	});

	describe("POST an /register senden", function() {});

	//Loginfunktion testen
	describe("POST an /login senden", function() {
		it("Registrierter benutzer kann sich anmelden", function(done) {
			request(server)
				.post("/api/users/login")
				.set("Content-Type", "application/json")
				.send({ email: email, password: password })
				.expect(200)
				.end(function(err, res) {
					if (err) return done(err);
				});

			done();
		});
	});
});
