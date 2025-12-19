# ignite-json
A json server that can runs on cloudflare workers
# What you will need?
First you will need to install `json-server` package and make your JSON API as normal, then use `create-ignite-json` to turn your JSON database file into `Cloudflare KV` database and deploying an `ignite-json` server to `Cloudflare Workers`

**It means you will only need a `.json` file that has you routes as same as `json-server` package**

# Get started
Run the following command and follow the instructions:
```bash
npx create-ignite-json
```

after you finish your JSON API server will be ready

# Developers only
If you don't want to use `create-ignite-json` 

### Do the following:

1. Clone this repo. `git clone https://github.com/almodheshplus/ignite-json.git`
2. Run `cd ignite-json`
3. Run `npm i`
4. Run these commands:
```bash
npm run login # login to Cloudflare
npm run create-db ignite-json
npm run cf-typegen
# you will need to turn you .json database file into a valid KV before runing the commands below
npm run push-db
npm run deploy ignite-json
```
