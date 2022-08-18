import { createApp, close, createHttpRequest } from "@midwayjs/mock";
import { Framework } from "@midwayjs/web";
import { Application } from "egg";

describe("test/controller/user.test.ts", () => {
  let app: Application;

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>();
  });
  afterAll(async () => {
    await close(app);
  });

  it("curd user", async () => {
    // Fist create a user
    const create_result = await createHttpRequest(app)
      .post("/api/user")
      .send({
        name: 'Wang',
        description: 'New guy',
        address: 'UK'
      });
    expect(create_result.status).toBe(200);
    expect(create_result.body.code).toBe(200);
    expect(create_result.body.message).toBe("OK");
    expect(create_result.body.data.id).toBeGreaterThan(0);

    // Get Id of user
    const Id = create_result.body.data.id;

    // Next query a user
    const query_result = await createHttpRequest(app)
      .get(`/api/user/${Id}`);
    expect(query_result.status).toBe(200);
    expect(query_result.body.code).toBe(200);
    expect(query_result.body.message).toBe("OK");
    expect(query_result.body.data).toMatchObject({
      id: Id,
      name: 'Wang',
      description: 'New guy',
      address: 'UK'
    })

    // Next update a user
    const update_result = await createHttpRequest(app)
      .put(`/api/user/${Id}`)
      .send({
        name: 'Sun',
        address: 'KSA'
      });
    expect(update_result.status).toBe(200);
    expect(update_result.body.code).toBe(200);
    expect(update_result.body.message).toBe("OK");

    // Query updated user
    const query_for_update_result = await createHttpRequest(app)
      .get(`/api/user/${Id}`);
    expect(query_for_update_result.status).toBe(200);
    expect(query_for_update_result.body.code).toBe(200);
    expect(query_for_update_result.body.message).toBe("OK");
    expect(query_for_update_result.body.data).toMatchObject({
      id: Id,
      name: 'Sun',
      description: 'New guy',
      address: 'KSA'
    })

    // Delete user
    const delete_result = await createHttpRequest(app)
      .del(`/api/user/${Id}`)
    expect(delete_result.status).toBe(200);
    expect(delete_result.body.code).toBe(200);
    expect(delete_result.body.message).toBe("OK");

    // Query user again, it should not null
    const query_for_delete_result = await createHttpRequest(app)
      .get(`/api/user/${Id}`);
    expect(delete_result.status).toBe(200);
    expect(query_for_delete_result.body.code).toBe(500);
    expect(query_for_delete_result.body.message).toBe("Error");
    expect(query_for_delete_result.body.data).toBeNull();
  });

  it("failed to get a user", async () => {
    const query_result = await createHttpRequest(app)
      .get(`/api/user/${Number.MAX_SAFE_INTEGER}`);
    expect(query_result.status).toBe(200);
    expect(query_result.body.code).toBe(500);
    expect(query_result.body.message).toBe("Error");
  });

  it("failed to delete a user", async () => {
    // Delete user
    const delete_result = await createHttpRequest(app)
      .del(`/api/user/${Number.MAX_SAFE_INTEGER}`)
    expect(delete_result.status).toBe(200);
    expect(delete_result.body.code).toBe(500);
    expect(delete_result.body.message).toBe("Error");
  });

  it("failed to update a user", async () => {
    // Invalid user id
    const update_result = await createHttpRequest(app)
      .put(`/api/user/${Number.MAX_SAFE_INTEGER}`)
      .send({
        name: 'Sun',
        address: 'KSA'
      });
    expect(update_result.status).toBe(200);
    expect(update_result.body.code).toBe(500);
    expect(update_result.body.message).toBe("Error");

    // Invalid user data
    const update_invalid_data_result = await createHttpRequest(app)
      .put(`/api/user/${Number.MAX_SAFE_INTEGER}`)
      .send({
        id: 123,
        name: () => {},
        address: {
          fake: "I'm wrong"
        }
      });
      expect(update_invalid_data_result.status).toBe(500);
  });

  it("failed to create a user", async () => {
    // Create user
    const create_result = await createHttpRequest(app)
      .post("/api/user")
      .send({
        id: 123
      })
    expect(create_result.status).toBe(200);
    expect(create_result.body.code).toBe(500);
    expect(create_result.body.message).toBe("Error");
  });
});
