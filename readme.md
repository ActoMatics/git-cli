## CLI

# What it does?
Generate all the recommended markdown documentation (pre-filled) for the Github, Gitlab and Bitbucket community standards


# How?
The user will get a question with a list of options, choosing an option will lead to different outcomes.

#How to run?
1. npm run advanced-cli

# Scripts

npm start—runs our build and global script together. Use this to start your CLI

npm run build—runs our clean:some script and transpiles our TypeScript files to JavaScript files in lib folder
‎
npm run global — installs our CLI globally and runs the CLI

npm run clean:some—removes lib and docs folders

npm run clean:all—removes node_modules, package-lock.json ,lib and docs folders and file

npm run refresh—runs our clean:all script and runs npm install

npm run tscov—checks for at least 90% type coverage

npm run tscov:d—see missing type coverage

npm run publish-package—runs our build and npm publish scripts

npm run docs—generates automated documentation in docs folder

