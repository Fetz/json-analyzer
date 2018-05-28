(function() {
  var terminalEl = document.getElementById('terminal');
  var terminalPipeEl = document.getElementById('terminal-pipe');
  var terminalVerboseEl = document.getElementById('terminal-verbose');
  var terminalDepthEl = document.getElementById('terminal-maxDepth');
  var terminalTargeEl = document.getElementById('terminal-target');

  terminalPipeEl.addEventListener('change', setTerminalText);
  terminalVerboseEl.addEventListener('change', setTerminalText);
  terminalDepthEl.addEventListener('change', setTerminalText);
  terminalTargeEl.addEventListener('change', setTerminalText);

  function setTerminalText() {
    var terminalText = terminalPipeEl.checked
      ? 'cat path/to/file.json | json-analyzer'
      : 'json-analyzer path/to/file.json';
    if (terminalVerboseEl.checked) {
      terminalText += ' --verbose';
    }

    if (Number(terminalDepthEl.value) > 0) {
      terminalText += ' --depth ' + terminalDepthEl.value;
    }

    if (terminalTargeEl.value !== '') {
      terminalText += ' --target ' + terminalTargeEl.value;
    }

    terminalEl.innerText = terminalText;
  }
})();
