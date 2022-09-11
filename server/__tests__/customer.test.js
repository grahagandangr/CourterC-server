/*
    How To Run Test

    # First -> run env db test in your local

    1. npx sequelize --env test db:drop -> db:create
    2. npx sequelize --env test db:migrate
    
    # Second -> run the db test in your local

    1. npm test
*/

const request = require("supertest");
const app = require("../app");
const { sequelize, Sequelize } = require("../models");
const { queryInterface } = sequelize;
const fs = require("fs");
const { hashPassword } = require("../helpers");

const invalidToken = "123456789eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
let validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYyODkwOTEzfQ.2-v1-5JfAvbDD-xhyyp3zb8AopKHHnXyEUEJTY6jbxY";

const customerTest = {
  username: "test1",
  email: "test1@gmail.com",
  password: "12345",
  role: "customer",
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
      // console.log(products, "========");
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
      // console.log(products, "========");
      courtCategories.forEach((cc) => {
        cc.createdAt = cc.updatedAt = new Date();
      });
      return queryInterface.bulkInsert("CourtCategories", courtCategories);
    })
    .then(() => {
      let schedules = JSON.parse(
        fs.readFileSync("./data/schedule.json", "utf-8")
      );
      // console.log(products, "========");
      schedules.forEach((s) => {
        s.createdAt = s.updatedAt = new Date();
      });
      return queryInterface.bulkInsert("Schedules", schedules);
    })
    .then(() => {
      let images = JSON.parse(fs.readFileSync("./data/images.json", "utf-8"));
      // console.log(products, "========");
      images.forEach((i) => {
        i.createdAt = i.updatedAt = new Date();
      });
      return queryInterface.bulkInsert("Images", images);
    })

    .then(() => {
      let orders = JSON.parse(fs.readFileSync("./data/order.json", "utf-8"));
      // console.log(products, "========");
      orders.forEach((o) => {
        o.createdAt = o.updatedAt = new Date();
      });
      return queryInterface.bulkInsert("Orders", orders);
    })
    .then(() => {
      let orderDetails = JSON.parse(
        fs.readFileSync("./data/orderDetail.json", "utf-8")
      );
      // console.log(products, "========");
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

describe("Customer Login and register Routes Test", () => {
  describe("POST /customer/register - create new customer", () => {
    test("201 Success register - should create new Customer", (done) => {
      request(app)
        .post("/customer/register")
        .send(customerTest)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(201);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("message");
          // expect(body).toHaveProperty('email', customerTest.email);
          return done();
        });
    });

    test("400 Failed register - should return error if email is null", (done) => {
      request(app)
        .post("/customer/register")
        .send({
          username: "test1",
          password: "12345",
          role: "customer",
          phoneNumber: "0986556",
          address: "jl. earth",
          balance: 90000,
          location: [-6.287204, 106.839076],
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          //   expect(body).toHaveProperty("message");
          return done();
        });
    });

    test("400 Failed register - should return error if password is null", (done) => {
      request(app)
        .post("/customer/register")
        .send({
          username: "test1",
          email: "test1@gmail.com",
          role: "customer",
          phoneNumber: "0986556",
          address: "jl. earth",
          balance: 90000,
          location: [-6.287204, 106.839076],
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          // expect(body).toHaveProperty(
          //   "message",
          //   "Email / Password is required"
          // );
          return done();
        });
    });

    test("400 Failed register - should return error if email is already exists", (done) => {
      request(app)
        .post("/customer/register")
        .send({
          username: "test1",
          email: "customer@mail.com",
          role: "customer",
          phoneNumber: "0986556",
          address: "jl. earth",
          balance: 90000,
          location: [-6.287204, 106.839076],
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          // expect(body).arrayContaining("Email already used")
          return done();
        });
    });
  });

  describe("POST /customer/login - customer login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
        .post("/customer/login")
        .send({
          email: "customer@mail.com",
          password: "123456",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          console.log(body.access_token, "===================");
          validToken = body.access_token;
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("access_token", expect.any(String));
          return done();
        });
    });

    test("401 Failed login - should return error when password input is incorrect", (done) => {
      request(app)
        .post("/customer/login")
        .send({
          email: "customer@mail.com",
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

    test("401 Failed login - should return error when customer not found", (done) => {
      request(app)
        .post("/customer/login")
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

describe("GET /customer/venues", () => {
  test("200 Success get all venues", (done) => {
    request(app)
      .get("/customer/venues")
      .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Array));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /customer/courts", () => {
  test("200 Success get all court categories", (done) => {
    request(app)
      .get("/customer/courts")
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

  test("200 Success get all court categories by radius", (done) => {
    request(app)
      .get("/customer/courts-radius")
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

  test("200 Success get court categories detail by id", (done) => {
    request(app)
      .get(`/customer/courts/1`)
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

describe("GET /customer/profile", () => {
  test("200 Success get profile", (done) => {
    request(app)
      .get("/customer/profile")
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

describe("Customer Order Test", () => {
    test("200 Success get all customer orders", (done) => {
      request(app)
        .get("/customer/courts-orderList")
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

describe("Customer Payment Test", () => {
  test("200 Success connect to midtrans", (done) => {
    request(app)
      .post("/customer/top-up")
      .send({
        amount: 100000
      })
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

  test("200 Success update balance customer", (done) => {
    request(app)
      .post("/customer/top-up/update-balance")
      .send({
        gross_amount: 100000
      })
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

  test("200 Success pay order", (done) => {
    request(app)
      .post("/customer/pay-orders")
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

  test.only("200 Success cancel order", (done) => {
    request(app)
      .patch("/customer/courts/cancelOrder/1")
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

// describe("POST /customer/register ", () => {
//   it("should be return success message", async () => {
//     const body = {
//       username: "test3",
//       email: "test3@gmail.com",
//       password: "12345",
//       role: "customer",
//       phoneNumber: "0986556",
//       address: "jl. earth",
//       balance: 90000,
//       location: [-6.287204, 106.839076],
//     };

//     const response = await request(app).post("/customer/register").send(body);

//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty("message", expect.any(String));
//   });
// });

// describe("POST /customer/register - missing email", () => {
//   it("should be return an object with error message", async () => {
//     const body = {
//       username: "test3",
//       password: "12345",
//       role: "customer",
//       phoneNumber: "0986556",
//       address: "jl. earth",
//       balance: 90000,
//       location: [-6.287204, 106.839076],
//     };

//     const response = await request(app).post("/customer/register").send(body);

//     expect(response.status).toBe(400);
//     expect(response.body).toBeInstanceOf(Object);
//     expect(response.body).toHaveProperty("message", expect.any(String));
//   });
// });

// describe("POST /customer/register - missing password", () => {
//   it("should be return an object with error message", async () => {
//     const body = {
//       username: "test3",
//       email: "test3@gmail.com",
//       role: "customer",
//       phoneNumber: "0986556",
//       address: "jl. earth",
//       balance: 90000,
//       location: [-6.287204, 106.839076],
//     };

//     const response = await request(app).post("/customer/register").send(body);

//     expect(response.status).toBe(400);
//     expect(response.body).toBeInstanceOf(Object);
//     expect(response.body).toHaveProperty("message", expect.any(String));
//   });
// });

// describe("POST /customer/register - invalid email", () => {
//   it("should be return an object with error message", async () => {
//     const body = {
//       username: "test3",
//       email: "test3gmail.com",
//       password: "12345",
//       role: "customer",
//       phoneNumber: "0986556",
//       address: "jl. earth",
//       balance: 90000,
//       location: [-6.287204, 106.839076],
//     };

//     const response = await request(app).post("/customer/register").send(body);

//     expect(response.status).toBe(400);
//     expect(response.body).toBeInstanceOf(Object);
//     expect(response.body).toHaveProperty("message", expect.any(String));
//   });
// });

// describe("POST /customer/register - invalid password", () => {
//   it("should be return an object with error message", async () => {
//     const body = {
//       username: "test3",
//       email: "test3@gmail.com",
//       password: "",
//       role: "customer",
//       phoneNumber: "0986556",
//       address: "jl. earth",
//       balance: 90000,
//       location: [-6.287204, 106.839076],
//     };

//     const response = await request(app).post("/customer/register").send(body);

//     expect(response.status).toBe(400);
//     expect(response.body).toBeInstanceOf(Object);
//     expect(response.body).toHaveProperty("message", expect.any(String));
//   });
// });

// describe("POST /customer/register - email already exist", () => {
//   it("should be return an object with error message", async () => {
//     const body = {
//       username: "test3",
//       email: "test3@gmail.com",
//       password: "12345",
//       role: "customer",
//       phoneNumber: "0986556",
//       address: "jl. earth",
//       balance: 90000,
//       location: [-6.287204, 106.839076],
//     };

//     const response = await request(app).post("/customer/register").send(body);

//     expect(response.status).toBe(400);
//     expect(response.body).toBeInstanceOf(Object);
//     expect(response.body).toHaveProperty("message", expect.any(String));
//   });
// });

// describe("POST /customer/register - invalid email format", () => {
//   it("should be return an object with error message", async () => {
//     const body = {
//       username: "test3",
//       email: "test3",
//       password: "12345",
//       role: "customer",
//       phoneNumber: "0986556",
//       address: "jl. earth",
//       balance: 90000,
//       location: [-6.287204, 106.839076],
//     };

//     const response = await request(app).post("/customer/register").send(body);

//     expect(response.status).toBe(400);
//     expect(response.body).toBeInstanceOf(Object);
//     expect(response.body).toHaveProperty("message", expect.any(String));
//   });
// });

// describe('POST /customer/login - ok', () => {
//     it('should be return an object with success message', async() => {
//         const body = {
//             email: "abhi2@mail.com",
//             password: "12345",
//         }

//         const response = await request(app)
//         .post('/customer/login')
//         .send(body)
//         // console.log(body, '<<<<<<<<<<<<=========')
//         this.current_user_token = response.body.access_token

//         expect(response.status).toBe(200)
//         expect(response.body).toBeInstanceOf(Object)
//         expect(response.body).toHaveProperty('access_token', expect.any(String))
//         expect(response.body).toHaveProperty('name', expect.any(String))
//         expect(response.body).toHaveProperty('role', expect.any(String))
//         expect(response.body).toHaveProperty('email', expect.any(String))
//     })
// })

// describe('POST /customer/login - invalid password', () => {
//     it('should be return an object with error message', async() => {
//         const body = {
//             email: "abhi2@gmail.com",
//             password: "test1233",
//         }

//         const response = await request(app)
//         .post('/customer/login')
//         .send(body)

//         expect(response.status).toBe(400)
//         expect(response.body).toBeInstanceOf(Object)
//         expect(response.body).toHaveProperty('message', expect.any(String))
//     })
// })

// describe('POST /customer/login - invalid email', () => {
//     it('should be return an object with error message', async() => {
//         const body = {
//             email: "abhi123@email.com",
//             password: "12345",
//         }
//         const response = await request(app)
//         .post('/customer/login')
//         .send(body)

//         expect(response.status).toBe(400)
//         expect(response.body).toBeInstanceOf(Object)
//         expect(response.body).toHaveProperty('message', expect.any(String))
//     })
// })
