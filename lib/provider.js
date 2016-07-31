'use babel';

import {exec} from 'child_process';

// Package settings
import meta from '../package.json';
const debug = atom.config.get(`${meta.name}.debug`);
const notEligible = `**${meta.name}**: \`sassc\` is not in your PATH`;

// This package depends on build, make sure it's installed
export default {
  activate() {
    require('atom-package-deps').install(meta.name);
  },
};

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
          // No sassc installed
          if (debug === true) atom.notifications.addError(notEligible, { detail: error, dismissable: true });
          return false;
        }
        if (debug === true) atom.notifications.addInfo(`**${meta.name}**`, { detail: stdout, dismissable: false });
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
          args: [ '--style', 'compressed', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.min.css' ],
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
