rm -rf dist
parcel build ${@:1} src/*.html src/*.ts src/assets/*.png
cp manifest.json dist/