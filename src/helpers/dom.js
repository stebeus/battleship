function parseHtml(strings, ...values) {
  const template = document.createElement('template');
  const html = String.raw({ raw: strings }, ...values);

  template.innerHTML = html;

  return template.content.firstElementChild;
}

export { parseHtml };
