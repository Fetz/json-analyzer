/* global ace */
(function() {
  function setReadOnlyCode(target) {
    var code = ace.edit(target);
    code.setTheme('ace/theme/monokai');
    code.session.setMode('ace/mode/javascript');
    code.setReadOnly(true);
    return code;
  }

  setReadOnlyCode('code-example-1');
  setReadOnlyCode('code-example-2');
})();
