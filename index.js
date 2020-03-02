const ora = require('ora');

module.exports = class SimpleProgressPlugin {
    constructor(options) {
        this.options = options || {};
        this.name = 'SimpleProgressPlugin';
    }
    apply(compiler) {
        const {buildName, onlyWatch = false} = this.options;

        if (!buildName) {
            return;
        }

        const spinner = ora({
            text: `Running ${buildName} build`,
            discardStdin: false,
            stream: process.stdout,
        });

        if (onlyWatch) {
            compiler.hooks.invalid.tap(this.name, () => {
                spinner.start();
            });
        } else {
            compiler.hooks.thisCompilation.tap(this.name, () => {
                spinner.start();
            });
        }

        compiler.hooks.done.tap(this.name, () => {
            spinner.succeed();
        });

        compiler.hooks.failed.tap(this.name, () => {
            spinner.fail();
        });
    }
};

