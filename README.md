# Reproduce the issue
- Run `pnpm i` to install the dependencies
- Run `pnpm test:stub` to run the tests that spin up the stub server based on the PACT file under `pact/pacts`
  - You should see `pact-node@10.17.6: Pact Binary Error: WARN: Ignoring unsupported matching rules {"match"=>"regex", "regex"=>"\\d+"} for path $['query']$['id'][0]` in the console and the second test failing
- (Optional) Run `pnpm test:pact` in case you want to recreate the PACT files