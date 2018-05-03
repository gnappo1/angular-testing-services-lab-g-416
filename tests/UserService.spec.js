describe('UserService', function () {

  beforeEach(module("app"));
  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get("UserService");
    $httpBackend = $injector.get("$httpBackend");

    $httpBackend.when('GET', '/rest/user').respond({first_name: "Tom", last_name: "Hanks"});
  }));

  it("Should get the user's logged in information from /rest/user", function (done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (resp) {
        if (resp.data.first_name === "Tom" && resp.data.last_name === "Hanks") {
          done();
        }
      });
      $httpBackend.flush();
  });

  it("Should join the user's first name with their last name, with a space in between", function (done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(resp => UserService.createFullName(resp.data))
      .then(function (resp) {
        if (resp  === "Tom Hanks") {
          done();
        }
      });
      $httpBackend.flush();
  });

});
