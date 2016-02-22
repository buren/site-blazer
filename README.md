# Site Blazer

Track web pages speed index.

## Getting started

```
$ git clone git@github.com:young-skilled/site-blazer.git
$ cd site-blazer
$ npm install
$ cp .sample.env .env
# Now go to .env and update the values
```

1. Goto [Google developer console](https://console.developers.google.com/projectselector/apis/credentials)
2. Create a new project in Google developer console
3. Create new server API key
4. Goto to "Overview", click "PageSpeed Insights API"
5. Click "Enable"

:warning: If you don't setup an API key this app wont work!

## Usage

You can invoke Site Blazer using the very simple CLI:

```
$ npm start google.com
```
