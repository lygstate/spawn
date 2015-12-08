'use strict';

const ChildProcess = require('child_process');
const defer = require('./Deferred.js').defer;

exports.exec = (command, options)=>{
  options = options || {};
  let deferred = defer();
  if (options.echo) {
    console.log(command);
  }
  let result = ChildProcess.exec(command, options, function(error, stdout, stderr){
    if (options.echoStdout) {
      console.log(stdout);
    }
    if (options.echoError) {
      console.log(stderr);
    }
    deferred.resolve({
      result: result,
      error: error,
      stdout: stdout,
      stderr: stderr,
      command: command,
    });
  });
  return deferred.promise;
}