describe('calculatePaint', () => {
  test("POST to /api/v1/calculator should return 200 and calculate correctly", async () => {
    const requestBody = {
      walls: [
        { width: 4, height: 3, doors: 1, windows: 1 },
        { width: 5, height: 2.5, doors: 0, windows: 2 },
      ],
    };

    const response = await fetch("http://localhost:3000/api/v1/calculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.success).toBe(true);
    expect(responseBody.data).toHaveProperty("totalArea");
    expect(responseBody.data).toHaveProperty("litersRequired");
    expect(Array.isArray(responseBody.data.cans)).toBe(true);

    expect(responseBody.data.totalArea).toBeGreaterThan(0);
    expect(responseBody.data.litersRequired).toBeGreaterThan(0);

    const totalCans = responseBody.data.cans.reduce((sum, can) => sum + can.quantity, 0);
    expect(totalCans).toBeGreaterThan(0);
  });

  test("POST to /api/v1/calculator should return 200 and calculate correctly", async () => {
    const requestBody = {
      walls: [
        { width: 4, height: 3, doors: 1, windows: 1 },
        { width: 5, height: 2.5, doors: 0, windows: 2 },
      ],
    };

    const response = await fetch("http://localhost:3000/api/v1/calculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.success).toBe(true);
    expect(responseBody.data).toHaveProperty("totalArea");
    expect(responseBody.data).toHaveProperty("litersRequired");
    expect(Array.isArray(responseBody.data.cans)).toBe(true);

    expect(responseBody.data.totalArea).toBeGreaterThan(0);
    expect(responseBody.data.litersRequired).toBeGreaterThan(0);

    const totalCans = responseBody.data.cans.reduce((sum, can) => sum + can.quantity, 0);
    expect(totalCans).toBeGreaterThan(0);
  });


  test("POST to /api/v1/calculator should return 400 for walls with area < 1m² or > 50m²", async () => {
    let response = await fetch("http://localhost:3000/api/v1/calculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        walls: [
          { width: 1, height: 0.5, doors: 0, windows: 0 } // 0.5m
        ]
      })
    });

    let responseBody = await response.json();
    expect(response.status).toBe(400);
    expect(responseBody.error).toContain('Parede 1 deve ter entre 1 e 50 metros quadrados.');

    response = await fetch("http://localhost:3000/api/v1/calculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        walls: [
          { width: 10, height: 6, doors: 0, windows: 0 } // 60m
        ]
      })
    });

    responseBody = await response.json();
    expect(response.status).toBe(400);
    expect(responseBody.error).toContain('Parede 1 deve ter entre 1 e 50 metros quadrados.');

    response = await fetch("http://localhost:3000/api/v1/calculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        walls: [
          { width: 5, height: 5, doors: 0, windows: 0 } // 25m
        ]
      })
    });

    responseBody = await response.json();
    expect(response.status).toBe(200);
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.totalArea).toBe(25);
  });

  test("POST to /api/v1/calculator should return 400 for walls with opening area > 50% of wall area", async () => {
    const response = await fetch("http://localhost:3000/api/v1/calculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        walls: [
          {
            width: 5,
            height: 5,
            doors: 4,
            windows: 4
          }
        ]
      })
    });

    const responseBody = await response.json();
    expect(response.status).toBe(400);
    expect(responseBody.error).toContain('Aberturas da Parede 1 não podem exceder 50% da área da parede.');
  });

  test("POST to /api/v1/calculator should return 400 for walls with door height < 2.2m", async () => {
    const response = await fetch("http://localhost:3000/api/v1/calculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        walls: [
          {
            width: 4,
            height: 2.0,
            doors: 1,
            windows: 0
          }
        ]
      })
    });

    const responseBody = await response.json();
    expect(response.status).toBe(400);
    expect(responseBody.error).toContain('Parede 1 com portas deve ter altura mínima de 2.2 metros.');
  });

  test("POST to /api/v1/calculator should return 200 for valid walls with proper openings area and height", async () => {
    const response = await fetch("http://localhost:3000/api/v1/calculator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        walls: [
          {
            width: 4,
            height: 2.5,
            doors: 1,
            windows: 0
          }
        ]
      })
    });

    const responseBody = await response.json();
    expect(response.status).toBe(200);
    expect(responseBody.success).toBe(true);
  });

});
