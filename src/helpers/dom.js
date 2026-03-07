function parseHtml(strings, ...values) {
  const template = document.createElement('template');
  const rawHtml = String.raw({ raw: strings }, ...values);

  template.innerHTML = rawHtml;

  return template.content.firstElementChild;
}

export { parseHtml };
