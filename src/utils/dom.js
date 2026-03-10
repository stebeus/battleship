const serializeHtml = (value) =>
  value instanceof Element ? value.outerHTML : value;

function parseHtml(strings, ...values) {
  const template = document.createElement('template');
  const html = String.raw({ raw: strings }, ...values.map(serializeHtml));

  template.innerHTML = html;

  return template.content.firstElementChild;
}

export { parseHtml };
