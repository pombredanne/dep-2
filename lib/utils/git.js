const which = require('which')
const { execFile, execFileSync } = require('child_process')
const prefix = process.platform === 'win32' ? ['-c', 'core.longpaths=true'] : []

module.exports = (cmds, opt) => {
  opt = Object.assign({encoding: 'utf8'}, opt)
  return new Promise((resolve, reject) => {
    which('git', function (e, git) {
      if (e) return reject(e)
      const args = prefix.concat(cmds)
      execFile(git, args, opt, (e, stdout) => {
        if (e) return reject(e)
        resolve(stdout)
      })
    })
  })
}

module.exports.sync = (cmds, opt) => {
  opt = Object.assign({encoding: 'utf8'}, opt)
  const git = which.sync('git')
  const args = prefix.concat(cmds)
  return execFileSync(git, args, opt)
}