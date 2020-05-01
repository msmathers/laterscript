/**
 * Convert <laterscript> tags to live <script> tags.
 *
 * This is useful for external, third party JS dependencies that you want to embed
 * in the base index.html template but don't want to load & parse until a later,
 * programmatically-invoked time.
 *
 * Before:
 *
 *   <laterscript id="myscript" type="text/javascript" src="/path/to/file.js">
 *   </laterscript>
 *
 * Activate (load & parse):
 *
 *   laterscript.load('myscript').then(function(scriptEl) {
 *     console.log('script loaded!')
 *   })
 *
 * After:
 *
 *   <script id="myscript" type="text/javascript" src="/path/to/file.js">
 *   </script>
 */
window.laterscript = {
  load: function(id) {
    return new Promise(function(resolve, reject) {
      const el = document.getElementById(id)
      if (!el) {
        return reject(Error('Unable to locate element with id: ' + id))
      }
      if (el.tagName !== 'LATERSCRIPT') {
        return reject(Error('Element ' + id + ' is not a <laterscript> tag'))
      }
      // Create new <script> element and attach all attributes
      const newScript = document.createElement('script')
      Array.from(el.attributes).forEach((attr) => {
        if (attr.name === 'nonce') {
          newScript.nonce = el.nonce
        } else {
          newScript.setAttribute(attr.name, attr.value)
        }
      })
      // Embed inline JS code into new script element
      if (!el.hasAttribute('src')) {
        const inlineScript = document.createTextNode(el.innerHTML)
        newScript.appendChild(inlineScript)
      }
      // Resolve promise when script has loaded
      newScript.addEventListener('load', function() { resolve(newScript) })
      // Attach new <script> to DOM, remove <laterscript> element
      el.insertAdjacentElement('afterend', newScript)
      el.remove()
    })
  }
}

/**
 * Set CSS style to hide <laterscript> tags
 */
var css = 'laterscript { display: none; }'
var head = document.head || document.getElementsByTagName('head')[0]
var style = document.createElement('style')
style.type = 'text/css'
style.appendChild(document.createTextNode(css))
head.appendChild(style)
