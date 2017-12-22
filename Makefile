SED				?= sed
BABEL			?= ./node_modules/.bin/babel

.PHONY: release
release:
	$(SED) -ri s/\"version\":\ \"[0-9]\+\.[0-9]\+\.[0-9]\+\"/\"version\":\ \"$(VERSION)\"/ package.json
	$(SED) -i "s/(Unreleased)/(`date +%Y-%m-%d`)/" CHANGES.md

stamp-npm: package.json
	npm install
	touch stamp-npm

.PHONY: dist
dist: stamp-npm
	$(BABEL) --source-maps --out-file=./dist/backbone.vdomview.js backbone.vdomview.js
