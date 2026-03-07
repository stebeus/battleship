function parseHTML(strings, ...values) {
  const template = document.createElement('template');
  const rawHTML = String.raw({ raw: strings }, ...values);

  template.innerHTML = rawHTML;

  return template.content.firstElementChild;
}

export { parseHTML };
