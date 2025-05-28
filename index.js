const glob = require('@actions/glob');
const core = require('@actions/core');

const pattern = '*/package-lock.json'

async function run() {
    try {
        core.info('Search for missing package-lock.json files');
        const globber = await glob.create(pattern);
        const files = await globber.glob();
        files.forEach(file => {
            core.info(file);
        })
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run()