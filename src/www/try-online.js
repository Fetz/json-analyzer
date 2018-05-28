/* global ace */
(function() {
  function setInfityEditor(target) {
    var editor = ace.edit(target);
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/json');
    editor.setOptions({
      autoScrollEditorIntoView: true,
      minLines: 8,
      maxLines: Infinity
    });
    return editor;
  }

  var editor = setInfityEditor('input');
  var result = setInfityEditor('output');
  result.setReadOnly(true);

  var button = document.getElementById('analyze');
  var verbose = document.getElementById('verbose');
  var target = document.getElementById('target');
  var maxDepth = document.getElementById('maxDepth');
  var jsonAnalyzer = window['json-analyzer'];

  button.addEventListener('click', function() {
    var options = {
      json: JSON.parse(editor.getValue()),
      verbose: verbose.checked,
      target: target.value || undefined,
      maxDepth: maxDepth.value || undefined
    };

    result.setValue(JSON.stringify(jsonAnalyzer(options), null, '\t'));
  });
})();
