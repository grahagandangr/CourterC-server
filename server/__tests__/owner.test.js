

const request = require("supertest");
const app = require("../app");
const { sequelize, Sequelize } = require("../models");
const { queryInterface } = sequelize;
const fs = require("fs");
const { hashPassword } = require("../helpers");

const invalidToken = "123456789eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
let validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYzMTQ4Mzg0fQ.twTt78SZkNziCYoZTi9Xt4SNjWa8OxczzGJ_VWG6G1c";

const ownerTest = {
  username: "test1",
  email: "test1@gmail.com",
  password: "12345",
  role: "owner",
  phoneNumber: "0986556",
  address: "jl. earth",
  balance: 90000,
  location: [-6.287204, 106.839076],
};

beforeAll(() => {
  let users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
  console.log(users);
  users.forEach((user) => {
    user.location = Sequelize.fn(
      "ST_GeomFromText",
      `POINT(${user.location[0]} ${user.location[1]})`
    );
    user.createdAt = user.updatedAt = new Date();

    user.password = hashPassword(user.password);
  });
  return queryInterface
    .bulkInsert("Users", users)
    .then(() => {
      let categories = JSON.parse(
        fs.readFileSync("./data/categories.json", "utf-8")
      );
      categories.forEach((category) => {
        category.createdAt = category.updatedAt = new Date();
      });
      return queryInterface.bulkInsert("Categories", categories);
    })
    .then(() => {
      let courts = JSON.parse(fs.readFileSync("./data/courts.json", "utf-8"));
      courts.forEach((court) => {
        court.location = Sequelize.fn(
          "ST_GeomFromText",
          `POINT(${court.location[0]} ${court.location[1]})`
        );
        court.createdAt = court.updatedAt = new Date();
      });
      return queryInterface.bulkInsert("Courts", courts);
    })
    .then(() => {
      let courtCategories = JSON.parse(
        fs.readFileSync("./data/courtCategories.json", "utf-8")
      );

      courtCategories.forEach((cc) => {
        cc.createdAt = cc.updatedAt = new Date();
      });
      return queryInterface.bulkInsert("CourtCategories", courtCategories);
    })
    .then(() => {
      let schedules = JSON.parse(
        fs.readFileSync("./data/schedule.json", "utf-8")
      );

      schedules.forEach((s) => {
        s.createdAt = s.updatedAt = new Date();
      });
      return queryInterface.bulkInsert("Schedules", schedules);
    })
    .then(() => {
      let images = JSON.parse(fs.readFileSync("./data/images.json", "utf-8"));

      images.forEach((i) => {
        i.createdAt = i.updatedAt = new Date();
      });
      return queryInterface.bulkInsert("Images", images);
    })

    .then(() => {
      let orders = JSON.parse(fs.readFileSync("./data/order.json", "utf-8"));

      orders.forEach((o) => {
        o.createdAt = o.updatedAt = new Date();
      });
      return queryInterface.bulkInsert("Orders", orders);
    })
    .then(() => {
      let orderDetails = JSON.parse(
        fs.readFileSync("./data/orderDetail.json", "utf-8")
      );

      orderDetails.forEach((o) => {
        o.createdAt = o.updatedAt = new Date();
      });
      return queryInterface.bulkInsert("OrderDetails", orderDetails);
    })

    .catch((err) => {
      console.log(err, "++++++");
    });
});

afterAll(() => {
  return queryInterface
    .bulkDelete(
      "Users",
      {},
      { truncate: true, restartIdentity: true, cascade: true }
    )

    .then(() => {
      return queryInterface.bulkDelete(
        "Categories",
        {},
        { truncate: true, restartIdentity: true, cascade: true }
      );
    })
    .then(() => {
      return queryInterface.bulkDelete(
        "Courts",
        {},
        { truncate: true, restartIdentity: true, cascade: true }
      );
    })
    .then(() => {
      return queryInterface.bulkDelete(
        "CourtCategories",
        {},
        { truncate: true, restartIdentity: true, cascade: true }
      );
    })
    .then(() => {
      return queryInterface.bulkDelete(
        "Schedules",
        {},
        { truncate: true, restartIdentity: true, cascade: true }
      );
    })
    .then(() => {
      return queryInterface.bulkDelete(
        "Images",
        {},
        { truncate: true, restartIdentity: true, cascade: true }
      );
    })
    .then(() => {
      return queryInterface.bulkDelete(
        "Orders",
        {},
        { truncate: true, restartIdentity: true, cascade: true }
      );
    })
    .then(() => {
      return queryInterface.bulkDelete(
        "OrderDetails",
        {},
        { truncate: true, restartIdentity: true, cascade: true }
      );
    });
});

describe("owner Login and register Routes Test", () => {
  describe("POST /owner/register - create new owner", () => {
    test("201 Success register - should create new owner", (done) => {
      request(app)
        .post("/owner/register")
        .send(ownerTest)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(201);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("message");
          expect(body).toHaveProperty("access_token");
          return done();
        });
    });

    test("401 Failed register - should return error if email is null", (done) => {
      request(app)
        .post("/owner/register")
        .send({
          username: "test1",
          password: "12345",
          role: "owner",
          phoneNumber: "0986556",
          address: "jl. earth",
          balance: 90000,
          location: [-6.287204, 106.839076],
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toEqual(expect.any(Object));
          //   expect(body).toHaveProperty("message");
          return done();
        });
    });

    test("401 Failed register - should return error if password is null", (done) => {
      request(app)
        .post("/owner/register")
        .send({
          username: "test1",
          email: "test1@gmail.com",
          role: "owner",
          phoneNumber: "0986556",
          address: "jl. earth",
          balance: 90000,
          location: [-6.287204, 106.839076],
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toEqual(expect.any(Object));
          // expect(body).toHaveProperty(
          //   "message",
          //   "Email / Password is required"
          // );
          return done();
        });
    });

  });

  describe("POST /owner/login - owner login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
        .post("/owner/login")
        .send({
          email: "owner@mail.com",
          password: "123456",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          validToken = body.access_token;
          console.log(body.access_token, "===================");
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("access_token", expect.any(String));
          return done();
        });
    });

    test("401 Failed login - should return error when password input is incorrect", (done) => {
      request(app)
        .post("/owner/login")
        .send({
          email: "owner@mail.com",
          password: "salahpassword",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("message", "Invalid Email/Password");
          return done();
        });
    });

    test("401 Failed login - should return error when owner not found", (done) => {
      request(app)
        .post("/owner/login")
        .send({
          email: "hello@mail.com",
          password: "salahpassword",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("message", "Invalid Email/Password");
          return done();
        });
    });
  });
});

describe("GET /owner/courts", () => {
  test("200 Success get all court", (done) => {
    request(app)
      .get("/owner/courts")
      .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("201 Success create court", (done) => {
    request(app)
      .post("/owner/courts")
      .set("access_token", validToken)
      .send({
        name: "GOR Suluh",
        description: "GO GO Sport",
        UserId: 1,
        openHour: 9,
        closeHour: 23,
        address: "jl. earth",
        location: [-6.287204, 106.839076],
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("403 fail get courts because invalid token", (done) => {
    request(app)
      .get("/owner/courts")
      .set("access_token", invalidToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /owner/courtsCategories", () => {
  test("200 Success get all court", (done) => {
    request(app)
      .get("/owner/courtCategories")
      .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 Success get court categories detail by id", (done) => {
    request(app)
      .get(`/owner/courtCategories/1`)
      .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 Success get court categories detail by id", (done) => {
    request(app)
      .get(`/owner/courtCategories/1`)
      .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });


  test("Should return error message", (done) => {
    request(app)
      .get("/owner/courtCategories")
      .set("access_token", invalidToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /owner/courts-orderList", () => {
  test("200 Success get courts orderList", (done) => {
    request(app)
      .get("/owner/courts-orderLists")
      .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /owner/profile", () => {
  test("200 Success get profile", (done) => {
    request(app)
      .get("/owner/profile")
      .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 Fail get profile because not logged in yet", (done) => {
    request(app)
      .get("/owner/profile")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("403 Fail get profile because invalid token", (done) => {
    request(app)
      .get("/owner/profile")
      .set("access_token", invalidToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PATCH claimPayment", () => {
  test("200 Success claim payment ", (done) => {
    request(app)
      .patch("/owner/claimPayment/2")
      .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 Fail claim payment because not logged in yet ", (done) => {
    request(app)
      .patch("/owner/claimPayment/2")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
