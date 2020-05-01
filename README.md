# &lt;laterscript&gt;

Defer & programmatically trigger loading of `<script>` tags.

This is useful for external, third party JS dependencies that you want to embed in a base HTML template but don't want to load & parse until a later, programmatically-invoked time.

## Usage

Include the laterscript JS tag above your first `<laterscript>` tag.
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/msmathers/laterscript@master/js/laterscript.js"></script>
```

Use a `<laterscript>` tag for inline or remote JS scripts.  Make sure it has an ID.
```html
<laterscript id="myscript" type="text/javascript" src="/path/to/file.js">
</laterscript>
```

Activate the script via `laterscript.load()`.  Returns a promise that resolves once the script has been loaded & parsed.
```js
laterscript.load('myscript').then(function(scriptEl) {
  console.log('script loaded!')
})
```

The `<laterscript>` element is replaced with a `<script>` element, which gets parsed and loaded once it hits the DOM.

```html
<script id="myscript" type="text/javascript" src="/path/to/file.js">
</script>
```

## Example

```html
<html>
  <head>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/msmathers/laterscript@master/js/laterscript.js"></script>
    <laterscript id="jqueryjs" type="text/javascript" src="https://code.jquery.com/jquery-3.5.0.min.js"></laterscript>
    <laterscript id="usejquery" type="text/javascript">
      $(document).ready(function() {
        $('body').html('<h1>jQuery loaded!</h1>')
      })
    </laterscript>
  </head>
  <body>
    <button id="load-query-btn">Load jQuery</button>
  </body>
  <script type="text/javascript">
    (function() {
      var btn = document.getElementById('load-query-btn');
      btn.onclick = function() {
        laterscript.load('jqueryjs')
          .then(function() { laterscript.load('usejquery') })
      }
    })()
  </script>
</html>
```

