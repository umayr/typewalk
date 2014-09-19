#!/bin/sh
if [ -z "$1" ]
then
  echo "Provide the name of folder you want to deploy to GitHub Pages."
  exit 1
fi

echo "Deleting existing remote gh-pages branch...";
git push origin :gh-pages

echo "Deploying to Github Pages...";
git subtree push --prefix $1 origin gh-pages