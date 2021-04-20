/*! For license information please see provider.js.LICENSE.txt */
module.exports = (() => {
  var e = {
      558: (e, n, t) => {
        'use strict';
        Object.defineProperty(n, '__esModule', { value: !0 });
        var r = t(87),
          o = t(129),
          a = t(747),
          i = t(622);
        function s(e) {
          return e && 'object' == typeof e && 'default' in e
            ? e
            : { default: e };
        }
        var c = s(r),
          l = s(a),
          u = s(i);
        const d = /\s+at.*(?:\(|\s)(.*)\)?/,
          p = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)\.js:\d+:\d+)|native)/,
          f = void 0 === c.default.homedir ? '' : c.default.homedir();
        class m extends Error {
          constructor(e) {
            if (!Array.isArray(e))
              throw new TypeError(
                'Expected input to be an Array, got ' + typeof e
              );
            let n = (e = [...e].map((e) =>
              e instanceof Error
                ? e
                : null !== e && 'object' == typeof e
                ? Object.assign(new Error(e.message), e)
                : new Error(e)
            ))
              .map((e) => {
                return 'string' == typeof e.stack
                  ? ((e) =>
                      e.replace(
                        /\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g,
                        ''
                      ))(
                      ((n = e.stack),
                      (t = Object.assign({ pretty: !1 }, t)),
                      n
                        .replace(/\\/g, '/')
                        .split('\n')
                        .filter((e) => {
                          const n = e.match(d);
                          if (null === n || !n[1]) return !0;
                          const t = n[1];
                          return (
                            !t.includes(
                              '.app/Contents/Resources/electron.asar'
                            ) &&
                            !t.includes(
                              '.app/Contents/Resources/default_app.asar'
                            ) &&
                            !p.test(t)
                          );
                        })
                        .filter((e) => '' !== e.trim())
                        .map((e) =>
                          t.pretty
                            ? e.replace(d, (e, n) =>
                                e.replace(n, n.replace(f, '~'))
                              )
                            : e
                        )
                        .join('\n'))
                    )
                  : String(e);
                var n, t;
              })
              .join('\n');
            (n =
              '\n' +
              ((e, n = 1, t) => {
                if (
                  ((t = { indent: ' ', includeEmptyLines: !1, ...t }),
                  'string' != typeof e)
                )
                  throw new TypeError(
                    `Expected \`input\` to be a \`string\`, got \`${typeof e}\``
                  );
                if ('number' != typeof n)
                  throw new TypeError(
                    `Expected \`count\` to be a \`number\`, got \`${typeof n}\``
                  );
                if ('string' != typeof t.indent)
                  throw new TypeError(
                    `Expected \`options.indent\` to be a \`string\`, got \`${typeof t.indent}\``
                  );
                if (0 === n) return e;
                const r = t.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
                return e.replace(r, t.indent.repeat(n));
              })(n, 4)),
              super(n),
              (this.name = 'AggregateError'),
              Object.defineProperty(this, '_errors', { value: e });
          }
          *[Symbol.iterator]() {
            for (const e of this._errors) yield e;
          }
        }
        var h = m;
        const g = (e, n, t) =>
          new Promise((r, o) => {
            if (
              ((t = Object.assign({ concurrency: 1 / 0 }, t)),
              'function' != typeof n)
            )
              throw new TypeError('Mapper function is required');
            const { concurrency: a } = t;
            if (!('number' == typeof a && a >= 1))
              throw new TypeError(
                `Expected \`concurrency\` to be a number from 1 and up, got \`${a}\` (${typeof a})`
              );
            const i = [],
              s = e[Symbol.iterator]();
            let c = !1,
              l = !1,
              u = 0,
              d = 0;
            const p = () => {
              if (c) return;
              const e = s.next(),
                t = d;
              if ((d++, e.done)) return (l = !0), void (0 === u && r(i));
              u++,
                Promise.resolve(e.value)
                  .then((e) => n(e, t))
                  .then(
                    (e) => {
                      (i[t] = e), u--, p();
                    },
                    (e) => {
                      (c = !0), o(e);
                    }
                  );
            };
            for (let e = 0; e < a && (p(), !l); e++);
          });
        var y = g,
          v = g;
        y.default = v;
        const w = async (e, n, t) =>
          (await y(e, (e, t) => Promise.all([n(e, t), e]), t))
            .filter((e) => Boolean(e[0]))
            .map((e) => e[1]);
        var E = w,
          b = w;
        E.default = b;
        const _ = 'undefined' != typeof atom,
          k =
            'undefined' != typeof atom &&
            (atom.inDevMode() || atom.inSpecMode()),
          x = 'atom-package-deps.ignored';
        var A = /["'&<>]/,
          S = function (e) {
            var n,
              t = '' + e,
              r = A.exec(t);
            if (!r) return t;
            var o = '',
              a = 0,
              i = 0;
            for (a = r.index; a < t.length; a++) {
              switch (t.charCodeAt(a)) {
                case 34:
                  n = '&quot;';
                  break;
                case 38:
                  n = '&amp;';
                  break;
                case 39:
                  n = '&#39;';
                  break;
                case 60:
                  n = '&lt;';
                  break;
                case 62:
                  n = '&gt;';
                  break;
                default:
                  continue;
              }
              i !== a && (o += t.substring(i, a)), (i = a + 1), (o += n);
            }
            return i !== a ? o + t.substring(i, a) : o;
          };
        const T = _
          ? async function (e) {
              return atom.packages.resolvePackagePath(e);
            }
          : async function (e) {
              var n;
              const t = u.default.join(
                null !== (n = process.env.ATOM_HOME) && void 0 !== n
                  ? n
                  : u.default.join(c.default.homedir(), '.atom'),
                'packages',
                e
              );
              try {
                return (
                  await l.default.promises.access(t, l.default.constants.R_OK),
                  t
                );
              } catch (e) {
                return null;
              }
            };
        function C(e, n) {
          if (!e) throw new Error(null != n ? n : 'Invariant violation');
        }
        async function P(e) {
          if (null == e.directory) return !0;
          if (null == e.minimumVersion) return !1;
          const n = await (async function (e) {
            if (_) {
              const n = await (async function (e) {
                var n;
                const t = atom.packages.getLoadedPackage(e.name);
                return null == t
                  ? null
                  : null !== (n = t.metadata.version) && void 0 !== n
                  ? n
                  : null;
              })(e);
              if (n) return n;
            }
            return (async function (e) {
              var n, t;
              const { directory: r } = e;
              if (null == r) return null;
              let o = null;
              try {
                o = JSON.parse(
                  await l.default.promises.readFile(
                    u.default.join(r, 'package.json'),
                    'utf8'
                  )
                );
              } catch (e) {
                return null;
              }
              return null !==
                (n = null === (t = o) || void 0 === t ? void 0 : t.version) &&
                void 0 !== n
                ? n
                : null;
            })(e);
          })(e);
          return (
            null == n ||
            1 ===
              (function (e, n) {
                for (
                  var t = e.split('.'), r = n.split('.'), o = 0;
                  o < 3;
                  o++
                ) {
                  var a = Number(t[o]),
                    i = Number(r[o]);
                  if (a > i) return 1;
                  if (i > a) return -1;
                  if (!isNaN(a) && isNaN(i)) return 1;
                  if (isNaN(a) && !isNaN(i)) return -1;
                }
                return 0;
              })(e.minimumVersion, n)
          );
        }
        const I = new Set(['✓', 'done']),
          N = /(?:Installing|Moving) (.*?) to .* (.*)/;
        let j = !0;
        const M = _
            ? function ({ packageName: e, dependencies: n }) {
                const t = [],
                  r = atom.notifications.addInfo(
                    `Installing ${e} dependencies`,
                    {
                      detail: `Installing ${n.map((e) => e.name).join(', ')}`,
                      dismissable: !0,
                    }
                  ),
                  o = document.createElement('progress');
                (o.max = n.length), (o.style.width = '100%');
                try {
                  var a;
                  const e = atom.views.getView(r),
                    n =
                      null !== (a = null == e ? void 0 : e.element) &&
                      void 0 !== a
                        ? a
                        : null;
                  if (null == n)
                    throw new Error(
                      'Unable to get notification element from view'
                    );
                  const t = n.querySelector('.detail-content');
                  if (null == t)
                    throw new Error(
                      'Content detail container not found inside the notification'
                    );
                  t.appendChild(o);
                } catch (e) {
                  console.error(
                    '[Package-Deps] Error during showing installation progress to user',
                    e
                  );
                }
                return {
                  handleFailure({ dependency: e, error: n }) {
                    var r;
                    t.push(e.name),
                      (o.value += 1),
                      console.error(
                        `[Package-Deps] Unable to install ${e.name}, Error:`,
                        null !== (r = null == n ? void 0 : n.stack) &&
                          void 0 !== r
                          ? r
                          : n
                      );
                  },
                  handleDependencyInstalled(e) {
                    o.value += 1;
                  },
                  handleComplete() {
                    r.dismiss(),
                      t.length > 0
                        ? atom.notifications.addWarning(
                            `Failed to install ${e} dependencies`,
                            {
                              detail: `These packages were not installed, check your console\nfor more info.\n${t.join(
                                '\n'
                              )}`,
                              dismissable: !0,
                            }
                          )
                        : atom.notifications.addSuccess(
                            `Installed ${e} dependencies`,
                            {
                              detail: `Installed ${n
                                .map((e) => e.name)
                                .join(', ')}`,
                            }
                          ),
                      Promise.all(
                        n.map((e) =>
                          t.includes(e.name)
                            ? null
                            : atom.packages.activatePackage(e.name)
                        )
                      ).catch((n) => {
                        console.error(
                          `[Package-Deps] Error activating installed packages for ${e}`,
                          n
                        );
                      });
                  },
                };
              }
            : function ({ dependencies: e }) {
                let n = !1;
                return (
                  console.log(
                    `Installing dependencies:\n${e
                      .map((e) => `  - ${e.name}`)
                      .join('\n')}`
                  ),
                  {
                    handleFailure({ dependency: e, error: t }) {
                      var r;
                      (n = !0),
                        console.error(
                          `Unable to install ${e.name}, Error:`,
                          null !== (r = null == t ? void 0 : t.stack) &&
                            void 0 !== r
                            ? r
                            : t
                        );
                    },
                    handleDependencyInstalled(e) {
                      console.log('Successfully installed', e.name);
                    },
                    handleComplete() {
                      console.log('Installation complete'),
                        n && (process.exitCode = 1);
                    },
                  }
                );
              },
          $ = _
            ? function ({ packageName: e, dependencies: n }) {
                return new Promise((t) => {
                  const r = n.filter((e) => !Array.isArray(e)),
                    o = n.filter((e) => Array.isArray(e)),
                    a = 0 === o.length,
                    i = a
                      ? r.map((e) => e.name).join(', ')
                      : 'Something went wrong. Check your developer console',
                    s = o.map((e) => e[0]),
                    c = atom.notifications.addInfo(
                      `${e} needs to install dependencies`,
                      {
                        dismissable: !0,
                        icon: 'cloud-download',
                        detail: i,
                        description: `Install dependenc${
                          1 === n.length ? 'y' : 'ies'
                        }?`,
                        buttons: [
                          {
                            text: 'Yes',
                            onDidClick: () => {
                              t(a ? [] : r.concat(s)), c.dismiss();
                            },
                          },
                          {
                            text: 'No Thanks',
                            onDidClick: () => {
                              c.dismiss();
                            },
                          },
                          {
                            text: 'Never',
                            onDidClick: () => {
                              !(function (e) {
                                var n;
                                if (!_) return;
                                const t = new Set(
                                  null !== (n = atom.config.get(x)) &&
                                  void 0 !== n
                                    ? n
                                    : []
                                );
                                t.add(e), atom.config.set(x, Array.from(t));
                              })(e),
                                j &&
                                  ((j = !1),
                                  atom.notifications.addInfo(
                                    'How to reset package-deps memory',
                                    {
                                      dismissable: !0,
                                      description:
                                        "To modify the list of ignored files invoke 'Application: Open Your Config' and change the 'atom-package-deps' section",
                                    }
                                  )),
                                c.dismiss();
                            },
                          },
                        ],
                      }
                    );
                  if ((c.onDidDismiss(() => t([])), !a))
                    try {
                      var l;
                      const e = atom.views.getView(c),
                        n =
                          null !== (l = null == e ? void 0 : e.element) &&
                          void 0 !== l
                            ? l
                            : null;
                      if (null == n)
                        throw new Error(
                          'Unable to get notification element from view'
                        );
                      const t = n.querySelector('.detail-content');
                      if (null == t)
                        throw new Error(
                          'Content detail container not found inside the notification'
                        );
                      if (((t.innerHTML = ''), r.length > 0)) {
                        const e = document.createElement('div');
                        (e.innerHTML = `Packages without choices: <br /><ul><li>${r
                          .map((e) => S(e.name))
                          .join('</li><li>')}</li></ul>`),
                          t.appendChild(e);
                      }
                      const a = document.createElement('div');
                      (a.innerHTML = 'Packages with choices:'),
                        t.appendChild(a);
                      const i = document.createElement('ul');
                      o.forEach((e, n) => {
                        const t = document.createElement('li'),
                          r = document.createElement('select');
                        (r.innerHTML = e
                          .map((e) => `<option>${S(e.name)}</option>`)
                          .join('\n')),
                          r.addEventListener('change', () => {
                            const t = e.find((e) => e.name === r.value);
                            null != t && (s[n] = t);
                          }),
                          (t.style.marginTop = '5px'),
                          t.appendChild(r),
                          i.appendChild(t);
                      }),
                        t.appendChild(i);
                    } catch (e) {
                      console.error(
                        '[Package-Deps] Error during showing package choices to user',
                        e
                      );
                    }
                });
              }
            : async function ({ dependencies: e }) {
                return e.map((e) => (Array.isArray(e) ? e[0] : e));
              };
        n.install = async function (e) {
          if (
            (C(
              'string' == typeof e && e.length > 0,
              '[Package-Deps] Package name is required'
            ),
            (n = e),
            _ &&
              ((null !== (t = atom.config.get(x)) && void 0 !== t
                ? t
                : []
              ).includes(n) ||
                (atom.packages.isPackageDisabled('notifications') &&
                  (console.warn(
                    `Enable notifications to install dependencies for ${n}`
                  ),
                  1))))
          )
            return;
          var n, t;
          const r = await (async function (e) {
            const n = await (_
              ? (async function (e) {
                  const n = atom.packages.getLoadedPackage(e),
                    t = n && n.metadata['package-deps'];
                  return Array.isArray(t) ? t : [];
                })(e)
              : (async function (e) {
                  let n = null;
                  try {
                    n = await l.default.promises.stat(e);
                  } catch (e) {}
                  if (null == n || !n.isDirectory())
                    throw new Error(
                      '[Package-Deps] Expected packageName to be a readable directory in Node.js invocation'
                    );
                  let t = null;
                  try {
                    const n = await l.default.promises.readFile(
                      u.default.join(e, 'package.json'),
                      'utf8'
                    );
                    t = JSON.parse(n);
                  } catch (e) {}
                  const r =
                    null == t || 'object' != typeof t ? [] : t['package-deps'];
                  return Array.isArray(r) ? r : [];
                })(e));
            return (
              k &&
                (C(
                  Array.isArray(n),
                  `Dependencies for ${e} are not a valid array`
                ),
                n.forEach((n, t) => {
                  if (Array.isArray(n))
                    n.forEach((n, r) => {
                      const o = `Dependency#${t}#${r} for ${e} is invalid`;
                      C('string' == typeof n.name && n.name.length > 0, o),
                        C(
                          null == n.minimumVersion ||
                            ('string' == typeof n.minimumVersion &&
                              n.minimumVersion.length > 0),
                          o
                        );
                    }),
                      C(
                        n.length > 0,
                        `Dependency#${t} for ${e} has no group items`
                      );
                  else {
                    const r = `Dependency#${t} for ${e} is invalid`;
                    C('string' == typeof n.name && n.name.length > 0, r),
                      C(
                        null == n.minimumVersion ||
                          ('string' == typeof n.minimumVersion &&
                            n.minimumVersion.length > 0),
                        r
                      );
                  }
                })),
              n
            );
          })(e);
          if (0 === r.length) return;
          const a = await Promise.all(
              r.map(async (e) =>
                Array.isArray(e)
                  ? Promise.all(
                      e.map(async (e) => ({ ...e, directory: await T(e.name) }))
                    )
                  : { ...e, directory: await T(e.name) }
              )
            ),
            i = await E(a, async function (e) {
              return Array.isArray(e)
                ? (await Promise.all(e.map((e) => P(e)))).every(Boolean)
                : P(e);
            });
          if (0 === i.length) return;
          const s = await $({ packageName: e, dependencies: i });
          if (0 === s.length) return;
          const c = M({ packageName: e, dependencies: s });
          await (async (
            e,
            n,
            { concurrency: t = 1 / 0, stopOnError: r = !0 } = {}
          ) =>
            new Promise((o, a) => {
              if ('function' != typeof n)
                throw new TypeError('Mapper function is required');
              if ((!Number.isSafeInteger(t) && t !== 1 / 0) || !(t >= 1))
                throw new TypeError(
                  `Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${t}\` (${typeof t})`
                );
              const i = [],
                s = [],
                c = e[Symbol.iterator]();
              let l = !1,
                u = !1,
                d = 0,
                p = 0;
              const f = () => {
                if (l) return;
                const e = c.next(),
                  t = p;
                if ((p++, e.done))
                  return (
                    (u = !0),
                    void (0 === d && (r || 0 === s.length ? o(i) : a(new h(s))))
                  );
                d++,
                  (async () => {
                    try {
                      const r = await e.value;
                      (i[t] = await n(r, t)), d--, f();
                    } catch (e) {
                      r ? ((l = !0), a(e)) : (s.push(e), d--, f());
                    }
                  })();
              };
              for (let e = 0; e < t && (f(), !u); e++);
            }))(
            s,
            async function (e) {
              try {
                await (async function (e) {
                  const n = _ ? atom.packages.getApmPath() : 'apm',
                    { stdout: t, stderr: r } = await (function (e, n, t) {
                      let r;
                      const a = (async function (e, n, t) {
                        const r = o.spawn(e, n, t),
                          a = new Promise((e, n) => {
                            const o = {
                              stdout: r.stdout ? [] : null,
                              stderr: r.stderr ? [] : null,
                            };
                            r.on('error', n),
                              r.stdout &&
                                r.stdout.on('data', function (e) {
                                  o.stdout.push(e),
                                    t.handleStdout && t.handleStdout(e);
                                }),
                              r.stderr &&
                                r.stderr.on('data', function (e) {
                                  o.stderr.push(e),
                                    t.handleStderr && t.handleStderr(e);
                                }),
                              r.on('close', (n) => {
                                let r = null;
                                null != o.stdout &&
                                  (r =
                                    null === t.encoding ||
                                    'buffer' === t.encoding
                                      ? Buffer.concat(o.stdout)
                                      : o.stdout.join(''));
                                let a = null;
                                null != o.stderr &&
                                  (a =
                                    null === t.encoding ||
                                    'buffer' === t.encoding
                                      ? Buffer.concat(o.stderr)
                                      : o.stderr.join('')),
                                  e({ exitCode: n, stdout: r, stderr: a });
                              });
                          });
                        return t.handleChildProcess(r), a;
                      })(e, n, {
                        ...t,
                        handleChildProcess(e) {
                          r = e;
                        },
                      });
                      return (
                        (a.kill = function (e) {
                          return r.kill(e);
                        }),
                        a
                      );
                    })(n, [
                      'install',
                      e.name,
                      '--production',
                      '--color',
                      'false',
                    ]),
                    a = N.exec(t.trim());
                  if (null != a && I.has(a[2])) return;
                  const i = new Error(`Error installing dependency: ${e.name}`);
                  throw ((i.stack = r.trim()), i);
                })(e),
                  c.handleDependencyInstalled(e);
              } catch (n) {
                c.handleFailure({ dependency: e, error: n });
              }
            },
            { concurrency: 2 }
          ),
            c.handleComplete();
        };
      },
      549: function (e, n, t) {
        'use strict';
        var r =
            (this && this.__awaiter) ||
            function (e, n, t, r) {
              return new (t || (t = Promise))(function (o, a) {
                function i(e) {
                  try {
                    c(r.next(e));
                  } catch (e) {
                    a(e);
                  }
                }
                function s(e) {
                  try {
                    c(r.throw(e));
                  } catch (e) {
                    a(e);
                  }
                }
                function c(e) {
                  var n;
                  e.done
                    ? o(e.value)
                    : ((n = e.value),
                      n instanceof t
                        ? n
                        : new t(function (e) {
                            e(n);
                          })).then(i, s);
                }
                c((r = r.apply(e, n || [])).next());
              });
            },
          o =
            (this && this.__generator) ||
            function (e, n) {
              var t,
                r,
                o,
                a,
                i = {
                  label: 0,
                  sent: function () {
                    if (1 & o[0]) throw o[1];
                    return o[1];
                  },
                  trys: [],
                  ops: [],
                };
              return (
                (a = { next: s(0), throw: s(1), return: s(2) }),
                'function' == typeof Symbol &&
                  (a[Symbol.iterator] = function () {
                    return this;
                  }),
                a
              );
              function s(a) {
                return function (s) {
                  return (function (a) {
                    if (t)
                      throw new TypeError('Generator is already executing.');
                    for (; i; )
                      try {
                        if (
                          ((t = 1),
                          r &&
                            (o =
                              2 & a[0]
                                ? r.return
                                : a[0]
                                ? r.throw || ((o = r.return) && o.call(r), 0)
                                : r.next) &&
                            !(o = o.call(r, a[1])).done)
                        )
                          return o;
                        switch (
                          ((r = 0), o && (a = [2 & a[0], o.value]), a[0])
                        ) {
                          case 0:
                          case 1:
                            o = a;
                            break;
                          case 4:
                            return i.label++, { value: a[1], done: !1 };
                          case 5:
                            i.label++, (r = a[1]), (a = [0]);
                            continue;
                          case 7:
                            (a = i.ops.pop()), i.trys.pop();
                            continue;
                          default:
                            if (
                              !(
                                (o =
                                  (o = i.trys).length > 0 && o[o.length - 1]) ||
                                (6 !== a[0] && 2 !== a[0])
                              )
                            ) {
                              i = 0;
                              continue;
                            }
                            if (
                              3 === a[0] &&
                              (!o || (a[1] > o[0] && a[1] < o[3]))
                            ) {
                              i.label = a[1];
                              break;
                            }
                            if (6 === a[0] && i.label < o[1]) {
                              (i.label = o[1]), (o = a);
                              break;
                            }
                            if (o && i.label < o[2]) {
                              (i.label = o[2]), i.ops.push(a);
                              break;
                            }
                            o[2] && i.ops.pop(), i.trys.pop();
                            continue;
                        }
                        a = n.call(e, i);
                      } catch (e) {
                        (a = [6, e]), (r = 0);
                      } finally {
                        t = o = 0;
                      }
                    if (5 & a[0]) throw a[1];
                    return { value: a[0] ? a[1] : void 0, done: !0 };
                  })([a, s]);
                };
              }
            };
        Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.readManifestSync = n.readManifest = void 0);
        var a = t(622),
          i = a.resolve,
          s = a.sep,
          c = t(747),
          l = c.promises,
          u = c.readFileSync,
          d = t(184);
        function p(e) {
          var n, t;
          e = (null == e ? void 0 : e.length)
            ? e
            : ((n = d().getFileName()),
              ((null ==
              (t = atom.packages.getPackageDirPaths().filter(function (e) {
                return n.startsWith(e);
              }))
                ? void 0
                : t.length) &&
                n
                  .replace(t[0], '')
                  .split(s)
                  .filter(function (e) {
                    return e;
                  })[0]) ||
                '');
          var r = atom.packages.resolvePackagePath(e);
          return i(r, 'package.json');
        }
        (n.readManifest = function (e) {
          return (
            void 0 === e && (e = ''),
            r(this, void 0, void 0, function () {
              var n, t;
              return o(this, function (r) {
                switch (r.label) {
                  case 0:
                    (n = p(e)), (r.label = 1);
                  case 1:
                    return r.trys.push([1, 3, , 4]), [4, l.readFile(n, 'utf8')];
                  case 2:
                    return (t = r.sent()), [2, JSON.parse(t)];
                  case 3:
                    return r.sent(), [2, null];
                  case 4:
                    return [2];
                }
              });
            })
          );
        }),
          (n.readManifestSync = function (e) {
            void 0 === e && (e = '');
            var n = p(e);
            try {
              var t = u(n, 'utf8');
              return JSON.parse(t);
            } catch (e) {
              return null;
            }
          });
      },
      142: function (e, n, t) {
        'use strict';
        var r =
            (this && this.__assign) ||
            function () {
              return (r =
                Object.assign ||
                function (e) {
                  for (var n, t = 1, r = arguments.length; t < r; t++)
                    for (var o in (n = arguments[t]))
                      Object.prototype.hasOwnProperty.call(n, o) &&
                        (e[o] = n[o]);
                  return e;
                }).apply(this, arguments);
            },
          o =
            (this && this.__awaiter) ||
            function (e, n, t, r) {
              return new (t || (t = Promise))(function (o, a) {
                function i(e) {
                  try {
                    c(r.next(e));
                  } catch (e) {
                    a(e);
                  }
                }
                function s(e) {
                  try {
                    c(r.throw(e));
                  } catch (e) {
                    a(e);
                  }
                }
                function c(e) {
                  var n;
                  e.done
                    ? o(e.value)
                    : ((n = e.value),
                      n instanceof t
                        ? n
                        : new t(function (e) {
                            e(n);
                          })).then(i, s);
                }
                c((r = r.apply(e, n || [])).next());
              });
            },
          a =
            (this && this.__generator) ||
            function (e, n) {
              var t,
                r,
                o,
                a,
                i = {
                  label: 0,
                  sent: function () {
                    if (1 & o[0]) throw o[1];
                    return o[1];
                  },
                  trys: [],
                  ops: [],
                };
              return (
                (a = { next: s(0), throw: s(1), return: s(2) }),
                'function' == typeof Symbol &&
                  (a[Symbol.iterator] = function () {
                    return this;
                  }),
                a
              );
              function s(a) {
                return function (s) {
                  return (function (a) {
                    if (t)
                      throw new TypeError('Generator is already executing.');
                    for (; i; )
                      try {
                        if (
                          ((t = 1),
                          r &&
                            (o =
                              2 & a[0]
                                ? r.return
                                : a[0]
                                ? r.throw || ((o = r.return) && o.call(r), 0)
                                : r.next) &&
                            !(o = o.call(r, a[1])).done)
                        )
                          return o;
                        switch (
                          ((r = 0), o && (a = [2 & a[0], o.value]), a[0])
                        ) {
                          case 0:
                          case 1:
                            o = a;
                            break;
                          case 4:
                            return i.label++, { value: a[1], done: !1 };
                          case 5:
                            i.label++, (r = a[1]), (a = [0]);
                            continue;
                          case 7:
                            (a = i.ops.pop()), i.trys.pop();
                            continue;
                          default:
                            if (
                              !(
                                (o =
                                  (o = i.trys).length > 0 && o[o.length - 1]) ||
                                (6 !== a[0] && 2 !== a[0])
                              )
                            ) {
                              i = 0;
                              continue;
                            }
                            if (
                              3 === a[0] &&
                              (!o || (a[1] > o[0] && a[1] < o[3]))
                            ) {
                              i.label = a[1];
                              break;
                            }
                            if (6 === a[0] && i.label < o[1]) {
                              (i.label = o[1]), (o = a);
                              break;
                            }
                            if (o && i.label < o[2]) {
                              (i.label = o[2]), i.ops.push(a);
                              break;
                            }
                            o[2] && i.ops.pop(), i.trys.pop();
                            continue;
                        }
                        a = n.call(e, i);
                      } catch (e) {
                        (a = [6, e]), (r = 0);
                      } finally {
                        t = o = 0;
                      }
                    if (5 & a[0]) throw a[1];
                    return { value: a[0] ? a[1] : void 0, done: !0 };
                  })([a, s]);
                };
              }
            };
        Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.satisfyDependencies = void 0);
        var i = t(558),
          s = t(549),
          c = { logger: console.log };
        n.satisfyDependencies = function (e, n) {
          return (
            void 0 === n && (n = {}),
            o(this, void 0, void 0, function () {
              var t, o;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    return (t = r(r({}, c), n)), [4, s.readManifest(e)];
                  case 1:
                    return (o = a.sent()), [4, i.install(o.name)];
                  case 2:
                    return (
                      a.sent(),
                      (function (e, n) {
                        n.enableDependencies &&
                          e['package-deps'].map(function (t) {
                            atom.packages.isPackageDisabled(t) &&
                              (atom.inDevMode() &&
                                n.logger(
                                  '[' +
                                    e.name +
                                    "] Enabling package dependency '" +
                                    t +
                                    "'"
                                ),
                              atom.packages.enablePackage(t));
                          });
                      })(o['package-deps'], t),
                      [2]
                    );
                }
              });
            })
          );
        };
      },
      550: (e, n, t) => {
        'use strict';
        t.r(n),
          t.d(n, {
            activate: () => f,
            config: () => o,
            provideBuilder: () => p,
          });
        const r = 'build-sassc',
          o = {
            pathToSass: {
              title: 'Path to Sass',
              description: 'Specify a custom path to the `sassc` binary',
              type: 'string',
              default: 'sassc',
              order: 0,
            },
            customArguments: {
              title: 'Custom Arguments',
              description:
                'Specify your preferred arguments for `sassc`, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders',
              type: 'string',
              default:
                '--style compressed {FILE_ACTIVE} {FILE_ACTIVE_NAME_BASE}.min.css',
              order: 1,
            },
            manageDependencies: {
              title: 'Manage Dependencies',
              description:
                'When enabled, third-party dependencies will be installed automatically',
              type: 'boolean',
              default: !0,
              order: 2,
            },
            alwaysEligible: {
              title: 'Always Eligible',
              description:
                'The build provider will be available in your project, even when not eligible',
              type: 'boolean',
              default: !1,
              order: 3,
            },
          };
        function a(e) {
          return atom.config.get(`build-sassc.${e}`);
        }
        const i = require('events');
        var s = t(142);
        function c(e, n) {
          for (var t = 0, r = n.length, o = e.length; t < r; t++, o++)
            e[o] = n[t];
          return e;
        }
        const l = new ((function () {
          function e(e) {
            void 0 === e && (e = {}),
              (this.name = e.name),
              (this.styleSheet =
                '\n      background-color: ' +
                (e.backgroundColor || 'darkgrey') +
                ';\n      border-radius: 2px;\n      color: ' +
                (e.color || 'white') +
                ';\n      line-height: 1.5;\n      padding: 1px 4px;\n      text-shadow: 0 1px 0px rgba(0, 0, 0, 0.2);\n    ');
          }
          return (
            (e.prototype.__console__ = function (e) {
              for (var n, t = [], r = 1; r < arguments.length; r++)
                t[r - 1] = arguments[r];
              (null === atom || void 0 === atom ? void 0 : atom.inDevMode()) &&
                (t.unshift('%c' + this.name + '%c', this.styleSheet, ''),
                (n = window.console)[e].apply(n, t));
            }),
            (e.prototype.debug = function () {
              for (var e = [], n = 0; n < arguments.length; n++)
                e[n] = arguments[n];
              this.__console__.apply(this, c(['debug'], e));
            }),
            (e.prototype.error = function () {
              for (var e = [], n = 0; n < arguments.length; n++)
                e[n] = arguments[n];
              this.__console__.apply(this, c(['error'], e));
            }),
            (e.prototype.info = function () {
              for (var e = [], n = 0; n < arguments.length; n++)
                e[n] = arguments[n];
              this.__console__.apply(this, c(['info'], e));
            }),
            (e.prototype.log = function () {
              for (var e = [], n = 0; n < arguments.length; n++)
                e[n] = arguments[n];
              this.__console__.apply(this, c(['log'], e));
            }),
            (e.prototype.trace = function () {
              for (var e = [], n = 0; n < arguments.length; n++)
                e[n] = arguments[n];
              this.__console__.apply(this, c(['trace'], e));
            }),
            (e.prototype.warn = function () {
              for (var e = [], n = 0; n < arguments.length; n++)
                e[n] = arguments[n];
              this.__console__.apply(this, c(['warn'], e));
            }),
            e
          );
        })())({ name: r, backgroundColor: 'rosybrown' });
        var u = t(806),
          d = t.n(u);
        function p() {
          return class extends i.EventEmitter {
            constructor(e) {
              super(),
                (this.cwd = e),
                atom.config.observe('build-sassc.customArguments', () =>
                  this.emit('refresh')
                );
            }
            getNiceName() {
              return 'SassC';
            }
            isEligible() {
              if (!0 === a('alwaysEligible'))
                return l.log('Always eligible'), !0;
              const e = a('pathToSass');
              return d().sync(e, { nothrow: !0 })
                ? (l.log('Build provider is eligible'), !0)
                : (l.error("Build provider isn't eligible"), !1);
            }
            settings() {
              const e = [
                  '(?<message>Error: .*)\\n\\s+on line (?<line>\\d+) of (?<file>.*)\\n',
                ],
                n = a('pathToSass') || 'sassc';
              return [
                {
                  name: 'SassC',
                  exec: n,
                  args: ['{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css'],
                  cwd: '{FILE_ACTIVE_PATH}',
                  sh: !1,
                  atomCommandName: 'sassc:compile',
                  errorMatch: e,
                },
                {
                  name: 'SassC (compact)',
                  exec: n,
                  args: [
                    '--style',
                    'compact',
                    '{FILE_ACTIVE}',
                    '{FILE_ACTIVE_NAME_BASE}.css',
                  ],
                  cwd: '{FILE_ACTIVE_PATH}',
                  sh: !1,
                  atomCommandName: 'sassc:compile-compact',
                  errorMatch: e,
                },
                {
                  name: 'SassC (compressed)',
                  exec: n,
                  args: [
                    '--style',
                    'compressed',
                    '{FILE_ACTIVE}',
                    '{FILE_ACTIVE_NAME_BASE}.min.css',
                  ],
                  cwd: '{FILE_ACTIVE_PATH}',
                  sh: !1,
                  atomCommandName: 'sassc:compile-compressed',
                  errorMatch: e,
                },
                {
                  name: 'SassC (expanded)',
                  exec: n,
                  args: [
                    '--style',
                    'expanded',
                    '{FILE_ACTIVE}',
                    '{FILE_ACTIVE_NAME_BASE}.css',
                  ],
                  cwd: '{FILE_ACTIVE_PATH}',
                  sh: !1,
                  atomCommandName: 'sassc:compile-compressed',
                  errorMatch: e,
                },
                {
                  name: 'SassC (user)',
                  exec: n,
                  args: a('customArguments').trim().split(' '),
                  cwd: '{FILE_ACTIVE_PATH}',
                  sh: !1,
                  atomCommandName: 'sassc:compile-with-user-settings',
                  errorMatch: e,
                },
              ];
            }
          };
        }
        async function f() {
          !0 === a('manageDependencies') && (0, s.satisfyDependencies)(r);
        }
      },
      184: (e, n, t) => {
        'use strict';
        const r = t(78);
        e.exports = ({ depth: e = 0 } = {}) => {
          const n = [],
            t = new Set();
          for (const o of r()) {
            const r = o.getFileName(),
              a = null !== o.getTypeName() && null !== r;
            if ((t.has(r) || (t.add(r), n.unshift(o)), a)) return n[e];
          }
        };
      },
      78: (e) => {
        'use strict';
        const n = () => {
          const e = Error.prepareStackTrace;
          Error.prepareStackTrace = (e, n) => n;
          const n = new Error().stack.slice(1);
          return (Error.prepareStackTrace = e), n;
        };
        (e.exports = n), (e.exports.default = n);
      },
      959: (e, n, t) => {
        var r;
        function o(e, n, t) {
          if (('function' == typeof n && ((t = n), (n = {})), !t)) {
            if ('function' != typeof Promise)
              throw new TypeError('callback not provided');
            return new Promise(function (t, r) {
              o(e, n || {}, function (e, n) {
                e ? r(e) : t(n);
              });
            });
          }
          r(e, n || {}, function (e, r) {
            e &&
              ('EACCES' === e.code || (n && n.ignoreErrors)) &&
              ((e = null), (r = !1)),
              t(e, r);
          });
        }
        t(747),
          (r =
            'win32' === process.platform || global.TESTING_WINDOWS
              ? t(429)
              : t(601)),
          (e.exports = o),
          (o.sync = function (e, n) {
            try {
              return r.sync(e, n || {});
            } catch (e) {
              if ((n && n.ignoreErrors) || 'EACCES' === e.code) return !1;
              throw e;
            }
          });
      },
      601: (e, n, t) => {
        (e.exports = o),
          (o.sync = function (e, n) {
            return a(r.statSync(e), n);
          });
        var r = t(747);
        function o(e, n, t) {
          r.stat(e, function (e, r) {
            t(e, !e && a(r, n));
          });
        }
        function a(e, n) {
          return (
            e.isFile() &&
            (function (e, n) {
              var t = e.mode,
                r = e.uid,
                o = e.gid,
                a =
                  void 0 !== n.uid ? n.uid : process.getuid && process.getuid(),
                i =
                  void 0 !== n.gid ? n.gid : process.getgid && process.getgid(),
                s = parseInt('100', 8),
                c = parseInt('010', 8);
              return (
                t & parseInt('001', 8) ||
                (t & c && o === i) ||
                (t & s && r === a) ||
                (t & (s | c) && 0 === a)
              );
            })(e, n)
          );
        }
      },
      429: (e, n, t) => {
        (e.exports = a),
          (a.sync = function (e, n) {
            return o(r.statSync(e), e, n);
          });
        var r = t(747);
        function o(e, n, t) {
          return (
            !(!e.isSymbolicLink() && !e.isFile()) &&
            (function (e, n) {
              var t = void 0 !== n.pathExt ? n.pathExt : process.env.PATHEXT;
              if (!t) return !0;
              if (-1 !== (t = t.split(';')).indexOf('')) return !0;
              for (var r = 0; r < t.length; r++) {
                var o = t[r].toLowerCase();
                if (o && e.substr(-o.length).toLowerCase() === o) return !0;
              }
              return !1;
            })(n, t)
          );
        }
        function a(e, n, t) {
          r.stat(e, function (r, a) {
            t(r, !r && o(a, e, n));
          });
        }
      },
      806: (e, n, t) => {
        const r =
            'win32' === process.platform ||
            'cygwin' === process.env.OSTYPE ||
            'msys' === process.env.OSTYPE,
          o = t(622),
          a = r ? ';' : ':',
          i = t(959),
          s = (e) =>
            Object.assign(new Error(`not found: ${e}`), { code: 'ENOENT' }),
          c = (e, n) => {
            const t = n.colon || a,
              o =
                e.match(/\//) || (r && e.match(/\\/))
                  ? ['']
                  : [
                      ...(r ? [process.cwd()] : []),
                      ...(n.path || process.env.PATH || '').split(t),
                    ],
              i = r
                ? n.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
                : '',
              s = r ? i.split(t) : [''];
            return (
              r && -1 !== e.indexOf('.') && '' !== s[0] && s.unshift(''),
              { pathEnv: o, pathExt: s, pathExtExe: i }
            );
          },
          l = (e, n, t) => {
            'function' == typeof n && ((t = n), (n = {})), n || (n = {});
            const { pathEnv: r, pathExt: a, pathExtExe: l } = c(e, n),
              u = [],
              d = (t) =>
                new Promise((a, i) => {
                  if (t === r.length) return n.all && u.length ? a(u) : i(s(e));
                  const c = r[t],
                    l = /^".*"$/.test(c) ? c.slice(1, -1) : c,
                    d = o.join(l, e),
                    f = !l && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + d : d;
                  a(p(f, t, 0));
                }),
              p = (e, t, r) =>
                new Promise((o, s) => {
                  if (r === a.length) return o(d(t + 1));
                  const c = a[r];
                  i(e + c, { pathExt: l }, (a, i) => {
                    if (!a && i) {
                      if (!n.all) return o(e + c);
                      u.push(e + c);
                    }
                    return o(p(e, t, r + 1));
                  });
                });
            return t ? d(0).then((e) => t(null, e), t) : d(0);
          };
        (e.exports = l),
          (l.sync = (e, n) => {
            n = n || {};
            const { pathEnv: t, pathExt: r, pathExtExe: a } = c(e, n),
              l = [];
            for (let s = 0; s < t.length; s++) {
              const c = t[s],
                u = /^".*"$/.test(c) ? c.slice(1, -1) : c,
                d = o.join(u, e),
                p = !u && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + d : d;
              for (let e = 0; e < r.length; e++) {
                const t = p + r[e];
                try {
                  if (i.sync(t, { pathExt: a })) {
                    if (!n.all) return t;
                    l.push(t);
                  }
                } catch (e) {}
              }
            }
            if (n.all && l.length) return l;
            if (n.nothrow) return null;
            throw s(e);
          });
      },
      129: (e) => {
        'use strict';
        e.exports = require('child_process');
      },
      747: (e) => {
        'use strict';
        e.exports = require('fs');
      },
      87: (e) => {
        'use strict';
        e.exports = require('os');
      },
      622: (e) => {
        'use strict';
        e.exports = require('path');
      },
    },
    n = {};
  function t(r) {
    if (n[r]) return n[r].exports;
    var o = (n[r] = { exports: {} });
    return e[r].call(o.exports, o, o.exports, t), o.exports;
  }
  return (
    (t.n = (e) => {
      var n = e && e.__esModule ? () => e.default : () => e;
      return t.d(n, { a: n }), n;
    }),
    (t.d = (e, n) => {
      for (var r in n)
        t.o(n, r) &&
          !t.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: n[r] });
    }),
    (t.o = (e, n) => Object.prototype.hasOwnProperty.call(e, n)),
    (t.r = (e) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    t(550)
  );
})();
//# sourceMappingURL=provider.js.map
