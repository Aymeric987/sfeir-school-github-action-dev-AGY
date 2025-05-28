const glob = require('@actions/glob');
const core = require('@actions/core');
const path = require('path');
const fs = require('fs');
const pattern = ['*package.json', '!**/node_modules/**'];

async function run() {
    try {
        core.info('Search for missing package-lock.json files');
        const globber = await glob.create(pattern.join('\n'));
        const files = await globber.glob();
        files.forEach(file => {
            core.info(file);
        })
        files.forEach(file => {
            try {
                fs.accessSync(path.join(path.dirname(file), 'package-lock.json'));
            } catch (err) {
                core.warning('Consider to generate it and commit it', {
                    file: file,
                    title: 'Missing package-lock.json'
                })
            }
        });
    } catch (error) {
        core.setFailed(error.message);
    }

}

run()