# TMGC-JS

A little Tamagotchi game for the web. It isn't complete yet, but playable.

See the last stable version in [Firefox Marketplace](https://marketplace.firefox.com/app/tmgc-js/).
This is a rewrite and extended version.

## How To Contribute

So you want to join the team? Great!
Here's how to get a working set-up:

```bash
$ git clone https://github.com/kurai021/TMGC-JS.git TMGC-JS.git
$ cd TMGC-JS.git
$ npm install
```

Easy, isn't it?

### Development dependencies

The following programs are needed for development. Further are managed by Bower:

 * git
 * npm
 * jQuery >= v1.7.2
 * jQueryUI >= v1.8.18
 * l10n.js
 * …

### Install jQuery, jQueryUI and Font Awesome:

If you have errors with JQuery, jQueryUI or Font Awesome, you can install them again in this way:

```bash
$ sudo npm -g install bower
$ cd TMGC-JS/src
$ bower install jquery jqueryui fontawesome
```

### Start testing

We're going to use Jasmine 2 as BDD Testing Framework.

### Grunt jobs

Grunt does all the ugly work for us.
To have a live reloading version, just run `grunt server`.

## License

This project was released unter BSD 2-Clause license. Check out LICENSE.txt for further information.
