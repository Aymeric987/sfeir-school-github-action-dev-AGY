const glob = require('@actions/glob');
const core = require('@actions/core');
const path = require('path');
const fs = require('fs');
const patterns = ['**/package.json', '!node_modules/**/package.json'];

async function run() {
    try {
        core.info('Search for missing package-lock.json files');
        const globber = await glob.create(patterns.join('\n'));
        const files = await globber.glob();
        let analysedPackageJsonCount = files.length
        let missingPackageLockJsonCount = 0
        files.forEach(file => {
            try {
                fs.accessSync(path.join(path.dirname(file), 'package-lock.json'));
            } catch (err) {
                missingPackageLockJsonCount++;
                core.warning('Consider to generate it and commit it', {
                    file: file,
                    title: 'Missing package-lock.json'
                })
            }
        });
        let message = '';
        if (analysedPackageJsonCount === 0) {
            message = 'No package.json found';
        } else if (missingPackageLockJsonCount === 0) {
            message = `No missing package-lock.json files based on ${analysedPackageJsonCount} package.json files analysed`;
        } else {
            message = `Missing ${missingPackageLockJsonCount} package-lock.json files based on ${analysedPackageJsonCount} package.json files analysed`;
        }
        core.summary.addHeading("Package.json analysis");
        core.summary.addRaw(message);
    } catch (error) {
        core.setFailed(error.message);
    }

}

run()