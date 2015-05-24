echo > app/bower_components/bootstrap/dist/js/bootstrap.js

sed -i 's/<script src="bower_components\/bootstrap\/dist\/js\/bootstrap.js"><\/script>//g' app/index.html

grunt build

cat .tmp/concat/scripts/vendor.js > dist/scripts/main.js
cat  dist/scripts/script* >> dist/scripts/main.js

head -n -1 dist/index.html > dist/head.html
mv dist/head.html dist/index.html

echo '<![endif]--><script src="scripts/main.js"></script>' >> dist/index.html

echo '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>' >> dist/index.html
echo '<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>' >> dist/index.html

cp app/styles/angucomplete-alt.css dist/styles/angucomplete.css
cp -r app/bower_components/fontawesome/fonts dist/

cp -r dist/* ../szs-release

cd ../szs-release

# Switch to release repo and commit changes as new release
# Push to github
# Push files to production server via FTP - yes really.
