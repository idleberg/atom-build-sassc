import { configSchema, getConfig } from './config';
import { EventEmitter } from 'events';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import Logger from './log';
import meta from '../package.json';
import which from 'which';

export { configSchema as config };

export function provideBuilder() {
  return class SasscProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
      atom.config.observe(`${meta.name}.customArguments`, () =>
        this.emit('refresh')
      );
    }

    getNiceName() {
      return 'SassC';
    }

    isEligible() {
      if (getConfig('alwaysEligible') === true) {
        Logger.log('Always eligible');
        return true;
      }

      const pathToSass = getConfig('pathToSass');

      if (which.sync(pathToSass, { nothrow: true })) {
        Logger.log('Build provider is eligible');
        return true;
      }

      Logger.error("Build provider isn't eligible");
      return false;
    }

    settings() {
      const errorMatch = [
        '(?<message>Error: .*)\\n\\s+on line (?<line>\\d+) of (?<file>.*)\\n'
      ];

      const pathToSass = getConfig('pathToSass') || 'sassc';
      const customArguments = getConfig('customArguments').trim().split(' ');

      return [
        {
          name: 'SassC',
          exec: pathToSass,
          args: ['{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css'],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sassc:compile',
          errorMatch
        },
        {
          name: 'SassC (compact)',
          exec: pathToSass,
          args: [
            '--style',
            'compact',
            '{FILE_ACTIVE}',
            '{FILE_ACTIVE_NAME_BASE}.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sassc:compile-compact',
          errorMatch
        },
        {
          name: 'SassC (compressed)',
          exec: pathToSass,
          args: [
            '--style',
            'compressed',
            '{FILE_ACTIVE}',
            '{FILE_ACTIVE_NAME_BASE}.min.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sassc:compile-compressed',
          errorMatch
        },
        {
          name: 'SassC (expanded)',
          exec: pathToSass,
          args: [
            '--style',
            'expanded',
            '{FILE_ACTIVE}',
            '{FILE_ACTIVE_NAME_BASE}.css'
          ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sassc:compile-compressed',
          errorMatch
        },
        {
          name: 'SassC (user)',
          exec: pathToSass,
          args: customArguments,
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sassc:compile-with-user-settings',
          errorMatch
        }
      ];
    }
  };
}

// This package depends on build, make sure it's installed
export async function activate() {
  if (getConfig('manageDependencies') === true) {
    satisfyDependencies(meta.name);
  }
}
