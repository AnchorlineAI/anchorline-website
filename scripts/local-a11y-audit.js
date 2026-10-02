// Served only by the loopback QA server when explicitly requested with ?qa=1.
(async () => {
  await document.fonts.ready;
  const results = await axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
  });
  const output = document.createElement('pre');
  output.dataset.testid = 'a11y-result';
  output.textContent = JSON.stringify({
    violations: results.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })),
    incomplete: results.incomplete.map(v => ({id:v.id, nodes:v.nodes.map(n => ({target:n.target,summary:n.failureSummary}))})),
  });
  document.body.append(output);
})();
