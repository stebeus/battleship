const serializeHtml = (value) =>
  value instanceof Element ? value.outerHTML : value;

const getRawHtml = (strings, ...values) =>
  String.raw({ raw: strings }, ...values.map(serializeHtml));

function parseHtml(strings, ...values) {
  const template = document.createElement('template');
  const html = getRawHtml(strings, ...values);

  template.innerHTML = html;

  return template.content.firstElementChild;
}

export { parseHtml };
