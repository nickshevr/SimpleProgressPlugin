const ora = require('ora');

module.exports = class SimpleProgressPlugin {
    constructor(options) {
        this.options = options || {};
        this.name = 'SimpleProgressPlugin';
    }
    apply(compiler) {
        const {buildName, onlyWatch = true} = this.options;

        if (!buildName) {
            return;
        }

        const spinner = ora(`Running ${buildName} build`)

        if (!onlyWatch) {
            compiler.hooks.thisCompilation.tap(this.name, () => {
                spinner.start();
            });
        }

        compiler.hooks.done.tap(this.name, () => {
            spinner.succeed();
        });

        compiler.hooks.invalid.tap(this.name, () => {
            spinner.start();
        });

        compiler.hooks.failed.tap(this.name, () => {
            spinner.stop();
        });
    }
};


