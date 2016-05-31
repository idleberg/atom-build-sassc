'use babel';

const self = '[build-sassc] ';
const debug = atom.config.get('build-sassc.debug');

import {exec} from 'child_process';

export function provideBuilder() {
  return class SasscProvider {
    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'SassC';
    }

    isEligible() {
      exec('sassc --version', function (error, stdout, stderr) {
        if (error !== null) {
          if (debug === true) console.log(self + error);
          // No sassc installed
          return false;
        }
        if (debug === true) console.log(self + stdout);
      });
      // Let's go!
      return true;
    }

    settings() {
      const errorMatch = [
        '(?<message>Error: .*)\\n\\s+on line (?<line>\\d+) of (?<file>.*)\\n'
      ];

      return [
        {
          name: 'SassC',
          exec: 'sassc',
          args: [ '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sassc:compile',
          errorMatch: errorMatch
        },
        {
          name: 'SassC (compact)',
          exec: 'sassc',
          args: [ '--style', 'compact', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sassc:compile-compact',
          errorMatch: errorMatch
        },
        {
          name: 'SassC (compressed)',
          exec: 'sassc',
          args: [ '--style', 'compressed', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sassc:compile-compressed',
          errorMatch: errorMatch
        },
        {
          name: 'SassC (expanded)',
          exec: 'sassc',
          args: [ '--style', 'expanded', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sassc:compile-compressed',
          errorMatch: errorMatch
        }
      ];
    }
  };
}
