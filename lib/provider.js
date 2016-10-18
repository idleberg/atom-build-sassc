'use babel';

import { install } from 'atom-package-deps';
import { execSync } from 'child_process';
import { EventEmitter } from 'events';

// Package settings
import meta from '../package.json';

this.config = {
  customArguments: {
    title: "Custom Arguments",
    description: "Specify your preferred arguments for `sassc`, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders",
    type: "string",
    "default": "--style compressed {FILE_ACTIVE} {FILE_ACTIVE_NAME_BASE}.min.css",
  },
};

// This package depends on build, make sure it's installed
export function activate() {
  if (!atom.inSpecMode()) {
    install(meta.name);
  }
}

export function provideBuilder() {
  return class SasscProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
      atom.config.observe('build-sassc.customArguments', () => this.emit('refresh'));
    }

    getNiceName() {
      return 'SassC';
    }

    isEligible() {
      try {
        stdout = execSync('sassc --version');
        if (atom.inDevMode()) atom.notifications.addInfo(meta.name, { detail: stdout, dismissable: false });
        return true;
      } catch (error) {
        if (atom.inDevMode()) atom.notifications.addError(meta.name, { detail: error, dismissable: true });
        return false;
      }
    }

    settings() {
      const errorMatch = [
        '(?<message>Error: .*)\\n\\s+on line (?<line>\\d+) of (?<file>.*)\\n'
      ];

      // User settings
      const customArguments = atom.config.get('build-sassc.customArguments').trim().split(" ");

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
        },
        {
          name: 'SassC (user)',
          exec: 'sassc',
          args: customArguments,
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'sassc:compile-user',
          errorMatch: errorMatch
        }
      ];
    }
  };
}
