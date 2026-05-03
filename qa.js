const fs = require('fs');

let pass = 0;
let fail = 0;

function ok(condition, message) {
  if (condition) {
    pass++;
    console.log('PASS  ' + message);
  } else {
    fail++;
    console.log('FAIL  ' + message);
  }
}

const pages = [
  'index.html',
  'authors.html',
  'author-post.html',
  'magazine.html',
  'magazine-post.html',
  'podcast.html',
  'podcast-post.html'
];

for (const p of pages) {
  const t = fs.readFileSync(p, 'utf8');
  ok(t.includes('class="skip-link"'), p + ' has skip-link');
  ok(t.includes('id="main"'), p + ' main has id');
  ok(t.includes('nav.js'), p + ' loads nav.js');
  ok(t.includes('class="nav-toggle"'), p + ' has nav-toggle');
  ok(/data-collapsed=/.test(t), p + ' has data-collapsed');
}

const css = fs.readFileSync('style.css', 'utf8');
ok(!/body\s*\{[^}]*overflow-x:\s*hidden/.test(css), 'no overflow-x:hidden on body');
ok(!/min-height:\s*6025px/.test(css), 'no 6025px min-height');
ok(!/min-height:\s*4362px/.test(css), 'no 4362px min-height');
ok(!/object-fit:\s*fill/.test(css), 'no object-fit:fill');
ok(!/width:\s*105\.3/.test(css), 'no 105.3% widths');
ok(!/\.authors\s*\{[^}]*margin-left:\s*-80px/.test(css), 'authors no -80px bleed');
ok(/\.skip-link/.test(css), 'skip-link styled');
ok(/prefers-reduced-motion/.test(css), 'reduced-motion handled');
ok(/aspect-ratio/.test(css), 'aspect-ratio used');
ok(!/white-space:\s*wrap\b/.test(css), 'no invalid "white-space: wrap"');

const headingsBlock = css.match(/body\.frontpage\s+h1\s*,[\s\S]*?\}/);
ok(
  headingsBlock !== null && !/white-space:\s*nowrap/.test(headingsBlock[0]),
  'frontpage headings do not force nowrap'
);

console.log('---');
console.log('PASS ' + pass + '  FAIL ' + fail);
if (fail) {
  process.exit(1);
}
