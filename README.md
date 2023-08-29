# Screenly Clock App

**Warning:** This project has been abandoned in favor of the [Clock Edge App](https://github.com/Screenly/Playground/tree/master/edge-apps/clock).

![Clock App Screenshot](https://github.com/Screenly/standalone-app-store/blob/master/_assets/img/app-clock-digital.jpg?raw=true)

This is an example asset for Screenly as part of the [Screenly Playground](https://github.com/Screenly/playground).

You can view the live demo at [clock.srly.io](https://clock.srly.io/). The clock should automatically detect your local time zone and display the correct time.

## Requirements

Install [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

```bash
$ npm install -g wrangler
```

Login to Cloudflare

```bash
$ wrangler login
```

Run the project in dev mode

```bash
$ wrangler dev
```

Publish worker

```bash
$ wrangler publish --env [environment name]
```
