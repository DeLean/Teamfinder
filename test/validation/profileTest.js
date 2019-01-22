const app = require("../../validation/profile");
const chai = require("chai");
const expect = chai.expect;


describe("Test validateLoginInput()", function() {
	it("Leere Email angeben -> Antwort mit korrekter Fehlermeldung", function() {
		expect(app({ email: "", password: "test" }).errors.email).to.equal(
			"Feld leer, geben Sie bitte Ihre Email an"
		);
	});

urlRight = "http://testme.url/";

describe("Test validateProfileInput()", function() {
  it("Zu kurze ProfileURL angeben -> Antwort mit korrekter Fehlermeldung", function() {
    expect(
      app({
        status: "testStatus",
        skills: "nodejs",
        profileURL: "d",
        website: urlRight,
        youtube: urlRight,
        twitter: urlRight,
        instagram: urlRight,
        facebook: urlRight
      }).errors.profileURL
    ).to.equal("Profil URL muss zwischen 2 und 4 Zeichen lang sein");
  });

  it("Leere ProfileURL angeben -> Antwort mit korrekter Fehlermeldung", function() {
    expect(
      app({
        status: "testStatus",
        skills: "nodejs",
        profileURL: "",
        website: urlRight,
        youtube: urlRight,
        twitter: urlRight,
        instagram: urlRight,
        facebook: urlRight
      }).errors.profileURL
    ).to.equal("Feld ist leer, bitte URL eingeben");
  });

  it("Leeres Skills-Feld angeben -> Antwort mit korrekter Fehlermeldung", function() {
    expect(
      app({
        status: "testStatus",
        skills: "",
        profileURL: urlRight,
        website: urlRight,
        youtube: urlRight,
        twitter: urlRight,
        instagram: urlRight,
        facebook: urlRight
      }).errors.skills
    ).to.equal("Feld leer, bitte Skills eingeben");
  });

  it("Leeres Status-Feld angeben -> Antwort mit korrekter Fehlermeldung", function() {
    expect(
      app({
        status: "",
        skills: "nodejs",
        profileURL: urlRight,
        website: urlRight,
        youtube: urlRight,
        twitter: urlRight,
        instagram: urlRight,
        facebook: urlRight
      }).errors.status
    ).to.equal("Feld leer, bitte Status eingeben");
  });

  it("Keine gültige URL für die Website angeben -> Antwort mit korrekter Fehlermeldung", function() {
    expect(
      app({
        status: "testStatus",
        skills: "nodejs",
        profileURL: urlRight,
        website: "notValid",
        youtube: urlRight,
        twitter: urlRight,
        instagram: urlRight,
        facebook: urlRight
      }).errors.website
    ).to.equal("Keine gültige URL");
  });

  it("Keine gültige URL für youtube -> Antwort mit korrekter Fehlermeldung", function() {
    expect(
      app({
        status: "testStatus",
        skills: "nodejs",
        profileURL: urlRight,
        website: urlRight,
        youtube: "notValid",
        twitter: urlRight,
        instagram: urlRight,
        facebook: urlRight
      }).errors.youtube
    ).to.equal("Keine gültige URL");
  });

  it("Keine gültige URL für Twitter -> Antwort mit korrekter Fehlermeldung", function() {
    expect(
      app({
        status: "testStatus",
        skills: "nodejs",
        profileURL: urlRight,
        website: urlRight,
        youtube: urlRight,
        twitter: "notValid",
        instagram: urlRight,
        facebook: urlRight
      }).errors.twitter
    ).to.equal("Keine gültige URL");
  });

  it("Keine gültige URL für instagram -> Antwort mit korrekter Fehlermeldung", function() {
    expect(
      app({
        status: "testStatus",
        skills: "nodejs",
        profileURL: urlRight,
        website: urlRight,
        youtube: urlRight,
        twitter: urlRight,
        instagram: "notValid",
        facebook: urlRight
      }).errors.instagram
    ).to.equal("Keine gültige URL");
  });

  it("Keine gültige URL für facebook -> Antwort mit korrekter Fehlermeldung", function() {
    expect(
      app({
        status: "testStatus",
        skills: "nodejs",
        profileURL: urlRight,
        website: urlRight,
        youtube: urlRight,
        twitter: urlRight,
        instagram: urlRight,
        facebook: "notValid"
      }).errors.facebook
    ).to.equal("Keine gültige URL");
  });
});
