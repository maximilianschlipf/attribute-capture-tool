rm -rf dist
parcel build ${@:1} src/*.html src/*.ts
cp manifest.json dist/