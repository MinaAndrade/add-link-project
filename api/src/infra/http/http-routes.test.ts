import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { db } from "@/infra/db/connections";
import { links } from "@/infra/db/schema/links";

import { buildApp } from "./app";

vi.mock("@/infra/storage/r2-storage", () => {
  return {
    R2Storage: class {
      async upload() {
        return "https://pub-example.r2.dev/reports/report-test.csv";
      }
    },
  };
});

describe("HTTP routes", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeEach(async () => {
    app = await buildApp();

    await db.delete(links);
  });

  afterEach(async () => {
    await app.close();
  });

  it("creates a link", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/links",
      payload: {
        originalUrl: "https://example.com",
      },
    });

    expect(response.statusCode).toBe(201);

    const body = response.json();

    expect(body).toEqual(
      expect.objectContaining({
        originalUrl: "https://example.com",
        accessCount: 0,
      }),
    );

    expect(body.shortCode).toHaveLength(6);
  });

  it("lists links", async () => {
    await app.inject({
      method: "POST",
      url: "/links",
      payload: {
        originalUrl: "https://example.com",
      },
    });

    const response = await app.inject({
      method: "GET",
      url: "/links",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();

    expect(body).toHaveLength(1);
    expect(body[0].originalUrl).toBe("https://example.com");
  });

  it("deletes a link", async () => {
    const createResponse = await app.inject({
      method: "POST",
      url: "/links",
      payload: {
        originalUrl: "https://example.com",
      },
    });

    const createdLink = createResponse.json();

    const deleteResponse = await app.inject({
      method: "DELETE",
      url: `/links/${createdLink.id}`,
    });

    expect(deleteResponse.statusCode).toBe(204);

    const listResponse = await app.inject({
      method: "GET",
      url: "/links",
    });

    expect(listResponse.json()).toHaveLength(0);
  });

  it("returns 404 when deleting a missing link", async () => {
    const response = await app.inject({
      method: "DELETE",
      url: "/links/missing-id",
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({
      message: "Link not found",
    });
  });

  it("redirects to original url", async () => {
    const createResponse = await app.inject({
      method: "POST",
      url: "/links",
      payload: {
        originalUrl: "https://example.com",
      },
    });

    const createdLink = createResponse.json();

    const response = await app.inject({
      method: "GET",
      url: `/${createdLink.shortCode}`,
    });

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe("https://example.com");
  });

  it("returns 404 when short code does not exist", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/missing-code",
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({
      message: "Link not found",
    });
  });

  it("generates report url", async () => {
    await app.inject({
      method: "POST",
      url: "/links",
      payload: {
        originalUrl: "https://example.com",
      },
    });

    const response = await app.inject({
      method: "GET",
      url: "/links/report",
    });

    expect(response.statusCode).toBe(200);

    expect(response.json()).toEqual({
      reportUrl: "https://pub-example.r2.dev/reports/report-test.csv",
    });
  });
});