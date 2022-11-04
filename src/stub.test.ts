import { Stub } from "@pact-foundation/pact-node";
import axios from "axios";
import { readdirSync } from "node:fs";
import { join } from "node:path";

let pactStub: Stub;
beforeEach(async () => {
  const pactsDirectory = join(__dirname, "..", "pact", "pacts");
  const pactFiles = readdirSync(pactsDirectory).map((pactFile) =>
    join(pactsDirectory, pactFile)
  );
  pactStub = new Stub({ pactUrls: pactFiles, port: 4000, logLevel: "debug" });
  await pactStub.start();
});

afterEach(async () => {
  await pactStub.stop();
});

// works
test("will fetch animal with id 123", async () => {
  const { data } = await axios.get("http://localhost:4000/animals?id=123");

  expect(data).toEqual({
    id: expect.any(String),
    name: expect.any(String),
  });
});

// does not work because of
// pact-node@10.17.6: Pact Binary Error: WARN: Ignoring unsupported matching rules {"match"=>"regex", "regex"=>"\\d+"} for path $['query']$['id'][0]
test("will fetch animal with an arbitrary id", async () => {
  const { data } = await axios.get("http://localhost:4000/animals?id=999");

  expect(data).toEqual({
    id: expect.any(String),
    name: expect.any(String),
  });
});
