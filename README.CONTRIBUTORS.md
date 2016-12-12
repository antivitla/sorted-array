# Development environment

I use Webpack/Gulp as builder CLI and Jasmine/Mocha as testing CLI, so you need them globally

  `$ npm install -g webpack gulp jasmine mocha`

When ready to develop, happy windows users have

  `$ npm run watch:win`

Others run in two separate terminal processes

  `$ webpack -w` and `$ gulp watch`

When ready, do

  `$ npm run prepublish`

And that should be the end.
