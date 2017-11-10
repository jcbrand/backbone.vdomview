SED				?= sed

.PHONY: release
release:
	$(SED) -ri s/\"version\":\ \"[0-9]\+\.[0-9]\+\.[0-9]\+\"/\"version\":\ \"$(VERSION)\"/ package.json
	$(SED) -i "s/(Unreleased)/(`date +%Y-%m-%d`)/" CHANGES.md
