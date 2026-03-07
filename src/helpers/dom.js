const getRawHtml = (strings, ...values) =>
  String.raw({ raw: strings }, ...values);

function parseHtml(strings, ...values) {
  const template = document.createElement('template');
  const html = getRawHtml(strings, ...values);

  template.innerHTML = html;

  return template.content.firstElementChild;
}

export { parseHtml };
