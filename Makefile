JSFILES=backend/*.js watcher.js
TESTFILES=test/*/*Tests.js

JSHINT=node_modules/.bin/jshint
MOCHA=node_modules/.bin/mocha

all:
	@make npm
	@make test

npm:
	@npm install

jshint:
#	@( $(JSHINT) --verbose --reporter node_modules/jshint-stylish/ $(TESTFILES) $(JSFILES) )
	@( $(JSHINT) --verbose --reporter node_modules/jshint-stylish/ $(JSFILES) )

test:
	@( export OAUTH_ENV=test ; $(MOCHA) $(TESTFILES) )
	@( make jshint )

test-short:
	@( export OAUTH_ENV=test ; $(MOCHA) --reporter dot $(TESTFILES) )

watch:
	@( ./watcher.js )

version:
	@( cd app ; node app --version )


.PHONY:	npm
.PHONY:	watch
.PHONY:	test
.PHONY:	docs
.PHONY:	version
