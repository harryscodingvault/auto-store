import app from "../../src/app";
import request from "supertest";
import User from "../../src/models/UserModel";

const userOne = {
  username: "banana",
  email: "banana@mail.com",
  password: "banana@mail.com",
};

beforeAll(async () => {
  await User.deleteMany();
});

describe("USER ROUTE", () => {
  describe("create new user", () => {
    it("it should return a new user", async () => {
      await request(app).post("/api/auth/signup").send(userOne).expect(200);
    });
  });
  describe("login user", () => {
    it("it should return a non existing user error", async () => {
      await request(app).post("/api/auth/login").send(userOne).expect(200);
    });
  });
  describe("user profile", () => {
    it("should return user profile", async () => {
      const user = await User.findOne({ email: userOne.email });
      await request(app)
        .get("/api/user/me")
        .set("Authorization", `Bearer ${user?.tokens[0].token}`)
        .send()
        .expect(200);
    });
    it("should no return  profile to unauthenticated user", async () => {
      await request(app)
        .get("/api/user/me")
        .set("Authorization", `Bearer w45aw5`)
        .send()
        .expect(401);
    });
  });
  describe("delete user", () => {
    it("should delete user profile", async () => {
      const user = await User.findOne({ email: userOne.email });
      await request(app)
        .delete("/api/user/me")
        .set("Authorization", `Bearer ${user?.tokens[0].token}`)
        .send()
        .expect(200);
    });
    it("should no delete an unauthenticated user", async () => {
      await request(app)
        .delete("/api/user/me")
        .set("Authorization", `Bearer w45aw5`)
        .send()
        .expect(401);
    });
  });
});
