import main from "./column";

test("We have an API key", () => {
  expect(process.env.GENERATED_IMAGES_API_KEY).toBeTruthy();
});

test("We can get a sample image", async () => {
  const image = await main(
    { type: "string", value: "John Smith" },
    { type: "string", value: process.env.GENERATED_IMAGES_API_KEY }
  );
  expect(image).toBeDefined();
});
