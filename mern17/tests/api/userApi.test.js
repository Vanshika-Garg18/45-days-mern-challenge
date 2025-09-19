const request = require("supertest");
const app = require("../../server"); 

describe("User API Tests", () => {

  test("GET /api/users/:id returns user", async () => {
    const res = await request(app).get("/api/users/123");
    console.log("GET RESPONSE:", res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.id).toBe("123");
    expect(res.body).toHaveProperty("name", "Test User");
  });

  test("POST /api/users creates user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Vanshika", email: "test@example.com" })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    console.log("POST RESPONSE:", res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "Vanshika");
    expect(res.body).toHaveProperty("email", "test@example.com");
  });

});
