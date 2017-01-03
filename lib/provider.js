'use babel';

import { EventEmitter } from 'events';
import { execSync } from 'child_process';

// Package settings
import meta from '../package.json';

this.config = {
  customArguments: {
    title: "Custom Arguments",
    description: "Specify your preferred arguments for `sassc`, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders",
    type: "string",
    "default": "--style compressed {FILE_ACTIVE} {FILE_ACTIVE_NAME_BASE}.min.css",
    order: 0
  },
  projectEligibility: {
    title: 'Project Eligibility',
    description: 'Only activate targets when project contains files eligible for this build provider. Note that this can slow down startup time significantly!',
    type: 'boolean',
    default: false,
    order: 1
  },
  manageDependencies: {
    title: 'Manage Dependencies',
    description: 'When enabled, third-party dependencies will be installed automatically',
    type: 'boolean',
    default: true,
    order: 2
  }
};

// This package depends on build, make sure it's installed
export function activate() {
  if (atom.config.get('build-sassc.manageDependencies')) {
    this.satisfyDependencies();
  }
}

export function satisfyDependencies() {
  let k;
  let v;

  require('atom-package-deps').install(meta.name);

  const ref = meta['package-deps'];
  const results = [];

  for (k in ref) {
    if (typeof ref !== 'undefined' && ref !== null) {
      v = ref[k];
      if (atom.packages.isPackageDisabled(v)) {
        if (atom.inDevMode()) {
          console.log('Enabling package \'' + v + '\'');
        }
        results.push(atom.packages.enablePackage(v));
      } else {
        results.push(void 0);
      }
    }
  }
  return results;
}

export function provideBuilder() {
  return class SasscProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
      atom.config.observe('build-sassc.projectEligibility', () => this.emit('refresh'));
      atom.config.observe('build-sassc.customArguments', () => this.emit('refresh'));
    }

    getNiceName() {
      return 'SassC';
    }

    isEligible() {
      try {
        execSync('sassc --version');
      } catch (error) {
        console.error(meta.name, error);
        return false;
      }

      if (atom.config.get('build-sassc.projectEligibility') === true) {
        return this.isProjectEligible(['sass', 'scss']);
      }

      return true;
    }

    isProjectEligible(fileTypes) {
      const globby = require('globby');
      const path = require('path');

      if (typeof fileTypes === 'string') {
        fileTypes = [fileTypes];
      }

      const projectDirs = atom.project.getPaths();
      const globPattern = [];

      for (let i = 0; i < projectDirs.length; i++) {
        fileTypes.forEach(function (fileType) {
          globPattern.push(path.join(projectDirs[i], '**/*.' + fileType));
        });
      }

      const options = {
        'cache': true
      };

      const paths = globby.sync(globPattern, options);

      if (paths.length > 0) {
        return true;
      }

      return false;
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
          atomCommandName: 'sassc:compile-with-user-settings',
          errorMatch: errorMatch
        }
      ];
    }
  };
}
