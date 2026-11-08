(() => {
  'use strict';
  try {
    const root = document.documentElement;
    const report = document.getElementById('decisionReport');
    const overviewButton = document.querySelector('.nd-overview-toggle');
    const hint = document.querySelector('.nd-cursor');
    const logo = document.querySelector('.logo-icon');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = matchMedia('(pointer: coarse)').matches;
    const lowData = navigator.hardwareConcurrency <= 4 || navigator.connection?.saveData || matchMedia('(prefers-reduced-data: reduce)').matches;
    if (lowData) root.classList.add('nd-lite');

    const themeButton = document.querySelector('[data-nd-action="theme"]');
    try {
      const savedTheme = localStorage.getItem('nd-theme');
      if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
    } catch (_) { /* Theme preference is optional. */ }
    const activeTheme = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    themeButton?.setAttribute('aria-pressed', String(activeTheme === 'dark'));

    document.querySelectorAll('[data-nd-action]').forEach((control) => control.addEventListener('click', () => {
      const action = control.dataset.ndAction;
      if (action === 'design' || action === 'review') {
        document.querySelectorAll('.mode-tab')[action === 'design' ? 0 : 1]?.click();
        document.querySelector('#heroSection')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      } else if (action === 'studio' || action === 'evidence') {
        const details = document.getElementById(action === 'studio' ? 'campaignMaterialsDetails' : 'evidenceDetails');
        if (details) { details.open = true; details.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }
      } else if (action === 'settings') {
        document.getElementById('settingsModal')?.classList.add('open');
      } else if (action === 'check') {
        document.getElementById('settingsModal')?.classList.add('open');
        document.querySelector('#settingsModal .btn-action')?.click();
      }
    }));

    const connector = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    connector.classList.add('nd-connection');
    connector.setAttribute('aria-hidden', 'true');
    connector.innerHTML = '<path></path><circle r="4"></circle>';
    document.body.append(connector);
    const connectorPath = connector.querySelector('path');
    const connectorDot = connector.querySelector('circle');
    const overlay = document.createElement('div');
    overlay.className = 'nd-dive-layer';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.append(overlay);

    let hoverTarget = null;
    let selectedAccent = '';
    let animationFrame = 0;
    let cursorFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const reportTiles = () => {
      if (!report) return;
      const tiles = report.querySelectorAll(':scope > .report-lead, :scope > .report-section');
      root.classList.toggle('nd-has-report', tiles.length > 0);
      tiles.forEach((tile, index) => {
        tile.classList.add('nd-map-tile');
        tile.style.setProperty('--nd-order', String(index));
        tile.dataset.ndMapTile = String(index + 1);
      });
    };
    const setMapFocus = (enabled) => report?.querySelectorAll('.nd-map-tile').forEach((tile) => {
      if (enabled) tile.tabIndex = 0;
      else tile.removeAttribute('tabindex');
    });
    reportTiles();
    if (report && 'MutationObserver' in window) {
      new MutationObserver(reportTiles).observe(report, { childList: true });
    }

    const getTarget = (node) => node instanceof Element ? node.closest('.domain-pill,.chan-tab,.lang-tab,.field-group,.nd-map-tile') : null;
    const labelFor = (el) => {
      if (el.classList.contains('domain-pill')) {
        const index = [...document.querySelectorAll('.domain-pill')].indexOf(el) + 1;
        const label = el.textContent.replace(/^\s*[^A-Za-z0-9]+/, '').replace(/\s+/g, ' ').trim();
        return { text: `${String(index).padStart(2, '0')} · ${label}`.toUpperCase(), accent: `domain-${index}` };
      }
      const heading = el.querySelector('.field-label,h2,h3');
      const text = (heading?.textContent || el.textContent || '').replace(/\s+/g, ' ').trim();
      const tileIndex = el.dataset.ndMapTile;
      return { text: text.slice(0, 76).toUpperCase(), accent: tileIndex ? `map-${tileIndex}` : '' };
    };
    const drawConnector = () => {
      animationFrame = 0;
      if (!hoverTarget || coarse || reduced) return;
      const end = logo?.getBoundingClientRect();
      const start = hoverTarget.getBoundingClientRect();
      if (!end || !start || start.bottom < 0 || start.top > innerHeight) { connector.classList.remove('nd-visible'); return; }
      connector.setAttribute('viewBox', `0 0 ${innerWidth} ${innerHeight}`);
      const x1 = start.left + start.width / 2;
      const y1 = hoverTarget.classList.contains('nd-map-tile') ? start.top : start.top + Math.min(22, start.height / 2);
      const x2 = end.left + end.width / 2;
      const y2 = end.top + end.height / 2;
      const bend = Math.max(42, Math.abs(y2 - y1) * .28);
      connectorPath.setAttribute('d', `M ${x1} ${y1} C ${x1} ${y1 - bend}, ${x2} ${y2 + bend}, ${x2} ${y2}`);
      connectorDot.setAttribute('cx', x1);
      connectorDot.setAttribute('cy', y1);
      connector.classList.add('nd-visible');
    };
    const scheduleConnector = () => { if (!animationFrame) animationFrame = requestAnimationFrame(drawConnector); };
    const showTarget = (target) => {
      hoverTarget = target;
      const info = labelFor(target);
      if (info.accent) root.dataset.ndActive = info.accent;
      if (hint && !coarse && !reduced) { hint.textContent = info.text; hint.style.opacity = '1'; }
      scheduleConnector();
    };
    const clearTarget = () => {
      hoverTarget = null;
      connector.classList.remove('nd-visible');
      if (hint) hint.style.opacity = '0';
      if (selectedAccent) root.dataset.ndActive = selectedAccent;
      else root.removeAttribute('data-nd-active');
    };

    if (!coarse && !reduced) {
      document.addEventListener('pointermove', (event) => {
        pointerX = event.clientX + 14;
        pointerY = event.clientY + 22;
        if (!hint || cursorFrame) return;
        cursorFrame = requestAnimationFrame(() => {
          hint.style.setProperty('--nd-x', `${pointerX}px`);
          hint.style.setProperty('--nd-y', `${pointerY}px`);
          cursorFrame = 0;
        });
      }, { passive: true });
      document.addEventListener('pointerover', (event) => {
        const target = getTarget(event.target);
        if (target && target !== hoverTarget) showTarget(target);
      }, { passive: true });
      document.addEventListener('pointerout', (event) => {
        const next = getTarget(event.relatedTarget);
        if (hoverTarget && next !== hoverTarget) clearTarget();
      }, { passive: true });
      window.addEventListener('scroll', scheduleConnector, { passive: true });
      window.addEventListener('resize', scheduleConnector, { passive: true });
    }

    const closeOverview = (tile) => {
      if (!root.classList.contains('nd-overview')) return;
      const finish = () => {
        root.classList.remove('nd-overview');
        root.classList.remove('nd-dimming');
        setMapFocus(false);
        overviewButton?.setAttribute('aria-pressed', 'false');
        if (tile) tile.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        const active = document.activeElement;
        if (active instanceof HTMLElement && active.hasAttribute('data-nd-map-tile')) active.blur();
      };
      if (reduced) finish();
      else { root.classList.add('nd-dimming'); setTimeout(finish, 170); }
    };
    overviewButton?.addEventListener('click', () => {
      const entering = !root.classList.contains('nd-overview');
      const finish = () => {
        root.classList.toggle('nd-overview', entering);
        root.classList.remove('nd-dimming');
        setMapFocus(entering);
        overviewButton.setAttribute('aria-pressed', String(entering));
        if (entering) document.getElementById('results')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      };
      if (reduced) finish();
      else { root.classList.add('nd-dimming'); setTimeout(finish, 150); }
    });
    report?.addEventListener('click', (event) => {
      if (!root.classList.contains('nd-overview')) return;
      if (event.target.closest('a,button,input,select,textarea')) return;
      const tile = event.target.closest('.nd-map-tile');
      if (tile) closeOverview(tile);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && root.classList.contains('nd-overview')) closeOverview();
      if (event.key === 'Enter' && root.classList.contains('nd-overview') && event.target.closest?.('.nd-map-tile')) closeOverview(event.target.closest('.nd-map-tile'));
    });

    document.addEventListener('click', (event) => {
      const domain = event.target.closest?.('.domain-pill');
      if (!domain) return;
      const index = [...document.querySelectorAll('.domain-pill')].indexOf(domain) + 1;
      selectedAccent = `domain-${index}`;
      root.dataset.ndActive = selectedAccent;
      const dive = () => {
        root.classList.remove('nd-dimming');
        document.getElementById('compilerPanel')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      };
      if (reduced) dive();
      else { root.classList.add('nd-dimming'); setTimeout(dive, 190); }
    });

    themeButton?.addEventListener('click', () => {
      const active = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = active === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      themeButton.setAttribute('aria-pressed', String(next === 'dark'));
      try { localStorage.setItem('nd-theme', next); } catch (_) { /* Theme preference is optional. */ }
    });

    if (report && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('nd-seen'); revealObserver.unobserve(entry.target); }
      }), { threshold: .08 });
      new MutationObserver(() => report.querySelectorAll('.report-lead,.report-section').forEach((tile) => revealObserver.observe(tile))).observe(report, { childList: true });
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { connector.classList.remove('nd-visible'); hoverTarget = null; }
    });
  } catch (_) { /* Motion is optional; the app remains usable without it. */ }
})();
