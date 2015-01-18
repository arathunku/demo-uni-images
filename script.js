function toArray(arrayLike) {
  return [].slice.call(arrayLike);
}
function countLoaded() {
  var loaded = window.performance.getEntries().map(function(e) {
    var match = e.name.match(/(http:\/\/.*\/)?(.*)/);
    return match[match.length - 1]
  });

  return toArray(document.querySelectorAll('img')).filter(function(e) {
    var match = (e.getAttribute('src') || '').match(/(http:\/\/.*\/)?(.*)/);
    return e.getBoundingClientRect().top >= (window.pageYOffset + window.innerHeight) && loaded.indexOf(match[match.length - 1]) >= 0
  }).length
}

function refreshLoaded() {
  setTimeout(function() {
    document.querySelector('.loaded-images').innerHTML = 'Loaded more than needed: ' + countLoaded();
  }, 100)
}

function checkImages() {
  toArray(document.querySelectorAll('img')).filter(function(e) {
    return e.getAttribute('lazy-src') && e.getBoundingClientRect().top <= (window.pageYOffset + window.innerHeight)
  }).forEach(function(e) {
    e.setAttribute('src', e.getAttribute('lazy-src'))
    e.removeAttribute('lazy-src');
  })
}

function observeImages() {
  document.addEventListener('scroll', checkImages);
}

window.onload = function() {
  refreshLoaded();
  checkImages();
  observeImages();
}
