beforeEach(() => {
  cy.resetSession();
});

afterEach(function () {
  const titlePath = this.currentTest?.titlePath;
  const rawTitle = Array.isArray(titlePath)
    ? titlePath.join(' - ')
    : typeof titlePath === 'string'
      ? titlePath
      : this.currentTest?.title || 'unknown-test';

  const safeTitle = String(rawTitle)
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, ' ')
    .trim() || 'unknown-test';

  cy.screenshot(safeTitle);
  cy.resetSession();
});
