import { pactWith } from "jest-pact";
import { Matchers } from "@pact-foundation/pact";
import { like } from "@pact-foundation/pact/src/dsl/matchers";
import axios from "axios";

const { term } = Matchers;
pactWith(
  {
    consumer: "Consumer",
    provider: "Provider",
  },
  (provider) => {
    test("will fetch animal", async () => {
      await provider.addInteraction({
        state: "there are animals",
        uponReceiving: "a request for a specific animal",
        withRequest: {
          path: "/animals",
          method: "GET",
          query: {
            id: term({
              generate: "123",
              matcher: "\\d+",
            }),
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            id: term({
              generate: "123",
              matcher: "\\d+",
            }),
            name: like("dog"),
          },
        },
      });

      const { data } = await axios.get(
        `${provider.mockService.baseUrl}/animals?id=123`
      );
      expect(data).toEqual({
        id: expect.any(String),
        name: expect.any(String),
      });
    });
  }
);
