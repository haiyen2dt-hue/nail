(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const pad = (n) => String(n).padStart(2, '0');

  /* ---------- data ---------- */
  const MENU = [
    { id: 'sach-da-gel', name: 'Sạch da + sơn gel', price: 99, mark: '1' },
    { id: 'sach-da-mat-meo', name: 'Sạch da + mắt mèo', price: 159, mark: '2' },
    { id: 'up-mong-gel', name: 'Úp móng + sơn gel', price: 179, mark: '3' },
  ];
  const MENU_NOTE = 'Áp dụng 09:00 – 15:00, thứ 2 đến thứ 5';

  const LOOKS = [
    { img: 'n27.jpg', title: 'Sao hồng lấp lánh', sub: 'Jelly hồng, sao bạc', mood: 'Kẹo ngôi sao hồng, hạt pha lê và mặt nước hồng gợn sóng. Nền jelly trong, ánh ngọc trai và sao bạc rải đều.', tags: ['Jelly', 'Ngọc trai', 'Sao bạc'], sw: ['#f7c3d6', '#efd9e4', '#d9b2c2'] },
    { img: 'n28.jpg', title: 'Bọt biển bạc hà', sub: 'Chrome mint', mood: 'Bọt sóng xanh, mặt biển ngọc và đáy nước trong. Chrome mint xen một móng nhũ bạc như cát ướt.', tags: ['Chrome', 'Mint', 'Nhũ'], sw: ['#a9cfc0', '#d2e6dd', '#7fa898'] },
    { img: 'n29.jpg', title: 'Winetasting', sub: 'Pantone 19-2118 TCX', mood: 'Nho đỏ, đá lạnh trong ly rượu vang và mã màu Pantone Winetasting. Lớp ngọc tím phủ lên nền rượu chín.', tags: ['Pantone', 'Ngọc trai', 'Rượu vang'], sw: ['#4a2a34', '#8e5a76', '#c79bb5'] },
    { img: 'n30.jpg', title: 'Nắng trên biển', sub: 'Ombré nude', mood: 'Mặt biển lấp lánh lúc chiều muộn và làn khói trắng. Ombré nude hồng, ánh vàng nhẹ ở đầu móng.', tags: ['Ombré', 'Nude', 'Ánh vàng'], sw: ['#e9c8bd', '#f3dfd6', '#c9b8a8'] },
    { img: 'n32.jpg', title: 'Nàng tiên ngọc trai', sub: 'Stiletto trắng', mood: 'Tóc bạch kim, mi trắng và váy lông vũ. Trắng ngọc trai bóng như vỏ sò, thêm một móng vụn xà cừ.', tags: ['Ngọc trai', 'Xà cừ', 'Stiletto'], sw: ['#efeae4', '#dcd6d0', '#f8f4ef'] },
    { img: 'n33.jpg', title: 'Nhật thực chấm bi', sub: 'Mix chất liệu', mood: 'Nhật thực, vải chấm bi và rèm pha lê. Mỗi móng một chất liệu: mắt mèo bạc, khói đen, chrome, nhũ hồng.', tags: ['Mix móng', 'Chấm bi', 'Chrome'], sw: ['#9a9a9e', '#2b2628', '#d8b9c0'] },
    { img: 'n35.jpg', title: 'Hoa ly nổi', sub: 'Gel nổi 3D', mood: 'Hoa ly hồng trên nền vải hoa xanh cổ điển. Đắp gel nổi thành hoa và lá, các móng còn lại vẽ loang nhẹ.', tags: ['Gel nổi', 'Vẽ tay', 'Hoa'], sw: ['#f2b9c8', '#b9d48a', '#e8e2ea'] },
    { img: 'n36.jpg', title: 'Ceramic', sub: 'Pantone 16-5127 TCX', mood: 'Xanh ngọc Ceramic lấy đúng mã Pantone. Sơn bóng một màu, thêm thánh giá nổi cùng tông trên hai móng.', tags: ['Pantone', 'Gel nổi', 'Một màu'], sw: ['#1fa5a8', '#4cc2c4', '#127a7d'] },
    { img: 'n25.jpg', title: 'Olive obsession', sub: 'Mắt mèo xanh rêu', mood: 'Quả ô liu và giấy màu xanh rêu đậm. Mắt mèo xanh olive, ánh sáng chạy dọc giữa móng như vỏ quả.', tags: ['Mắt mèo', 'Olive', 'Tối màu'], sw: ['#5e6b33', '#8a9a4e', '#3a4220'] },
  ];

  const PRICES = [
    { group: 'Manicure', items: [
      ['Phá gel / Tháo móng', '30 – 50K'],
      ['Cắt da tay / chân', '40 – 50K'],
      ['Cứng móng', '60K'],
      ['Úp móng keo / gel', '100 – 150K'],
      ['Nối móng đắp gel', '270K'],
      ['Fill gel', '80 – 150K'],
      ['Phủ gel móng thật', '150K'],
      ['BIAB', '150 – 200K'],
      ['Dual Form', '260 – 300K'],
    ] },
    { group: 'Gel polish', items: [
      ['Sơn gel / Thạch', '100 – 120K'],
      ['Mắt mèo', '130 – 150K'],
      ['Ombré', '100 – 150K'],
      ['Tráng gương', '100K'],
      ['Vẽ / Loang / Gel nổi', '5 – 100K/pcs'],
      ['French', '5 – 15K/pcs'],
      ['Sticker', '5 – 15K/pcs'],
      ['Charm', '10 – 50K/pcs'],
      ['Đính đá', '5 – 25K/pcs'],
    ] },
  ];
  const CN2_OPEN = '2026-10-10';

  /* ---------- chạy từng khối độc lập ----------
     Mỗi khối bọc try/catch riêng: 1 khối lỗi (ví dụ thiếu
     1 phần tử HTML) chỉ in lỗi ra Console, không làm hỏng
     các khối khác (đặc biệt là hiệu ứng sparkles ở cuối file). */
  function chay(ten, fn) {
    try { return fn(); }
    catch (e) { console.error(`[Dany] Lỗi ở khối "${ten}":`, e); }
  }

  /* ---------- helpers ---------- */
  const toast = $('#toast');
  let toastTimer;
  function say(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  /* ---------- theme ---------- */
  const root = document.documentElement;
  const isLightTheme = () => (root.dataset.theme ? root.dataset.theme === 'light' : matchMedia('(prefers-color-scheme: light)').matches);
  chay('theme', () => {
    try { const t = localStorage.getItem('dany_theme'); if (t) root.dataset.theme = t; } catch (e) {}
    const btn = $('#themeBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = isLightTheme() ? 'dark' : 'light';
      root.dataset.theme = next;
      try { localStorage.setItem('dany_theme', next); } catch (e) {}
    });
  });

  /* ---------- page curtain + smooth nav ---------- */
  const curtain = $('#curtain');
  let busy = false;
  function goTo(hash) {
    const target = hash === '#top' ? document.body : $(hash);
    if (!target || busy) return;
    const y = hash === '#top' ? 0 : target.getBoundingClientRect().top + scrollY - 70;
    if (reduce || !curtain) { scrollTo(0, y); return; }
    busy = true;
    curtain.classList.remove('out');
    curtain.classList.add('in');
    setTimeout(() => {
      scrollTo(0, y);
      curtain.classList.remove('in');
      curtain.classList.add('out');
      setTimeout(() => { curtain.classList.add('instant'); curtain.classList.remove('out'); void curtain.offsetWidth; curtain.classList.remove('instant'); busy = false; }, 700);
    }, 700);
  }
  chay('curtain', () => {
    if (!curtain) return;
    function endIntro() {
      curtain.classList.remove('in');
      curtain.classList.add('out');
      setTimeout(() => { curtain.classList.add('instant'); curtain.classList.remove('out'); void curtain.offsetWidth; curtain.classList.remove('instant'); }, 750);
    }
    window.addEventListener('load', () => setTimeout(endIntro, reduce ? 0 : 500));
    setTimeout(() => { if (curtain.classList.contains('in')) endIntro(); }, 3500);
  });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-go]');
    if (!a) return;
    e.preventDefault();
    goTo(a.getAttribute('href'));
  });

  /* ---------- scroll: progress, nav hide, active link ---------- */
  chay('scroll-progress', () => {
    const bar = $('#progress');
    const nav = $('#nav');
    const navLinks = $$('.links a');
    const sections = navLinks.map((a) => $(a.getAttribute('href')));
    let lastY = 0, ticking = false;
    function onScroll() {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      if (nav) nav.classList.toggle('hide', scrollY > lastY && scrollY > 400);
      lastY = scrollY;
      let cur = -1;
      sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
      navLinks.forEach((a, i) => a.classList.toggle('active', i === cur));
      ticking = false;
    }
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
  });

  /* ---------- reveal ---------- */
  function observeReveals(scope = document) {
    const els = $$('.reveal:not(.in)', scope);
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const sibs = [...en.target.parentElement.children].filter((c) => c.classList.contains('reveal'));
          en.target.style.transitionDelay = `${Math.min(sibs.indexOf(en.target), 5) * 90}ms`;
          en.target.classList.add('in');
          const t = en.target;
          setTimeout(() => t.classList.add('settled'), 1500);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- render menu ---------- */
  const menuList = $('#menuList');
  chay('render-menu', () => {
    menuList.innerHTML = MENU.map((m) => `
      <article class="glass menu-card reveal" data-tilt>
        <span class="ico" aria-hidden="true">${m.mark}</span>
        <div><h3>${m.name}</h3><p>${MENU_NOTE}</p></div>
        <div class="price"><b>${m.price}K</b><button class="pick" type="button" data-service="${m.id}">Chọn dịch vụ</button></div>
      </article>`).join('');
  });

  /* ---------- render price list ---------- */
  chay('render-price', () => {
    $('#priceGrid').innerHTML = PRICES.map((g) => `
      <article class="glass price-card reveal" data-tilt>
        <h3>${g.group}</h3>
        <ul>${g.items.map(([name, price]) => `<li><span>${name}</span><i></i><b>${price}</b></li>`).join('')}</ul>
      </article>`).join('');
  });

  /* ---------- render BTS ---------- */
  chay('render-bts', () => {
    $('#btsGrid').innerHTML = LOOKS.map((l, i) => `
      <div class="flip card3d reveal" data-tilt tabindex="0" role="button" aria-pressed="false" aria-label="Lật thẻ ${l.title}">
        <div class="flip-inner">
          <div class="face front">
            <img src="assets/${l.img}" alt="Mẫu nail ${l.title}" loading="lazy">
            <div class="cap"><h3>${l.title}</h3><span>${l.sub}</span></div>
          </div>
          <div class="face back">
            <div class="chips">${l.tags.map((t) => `<span>${t}</span>`).join('')}</div>
            <h3>${l.title}</h3>
            <p>${l.mood}</p>
            <div class="swatches">${l.sw.map((c) => `<i style="background:${c}"></i>`).join('')}</div>
          </div>
        </div>
      </div>`).join('');
  });

  /* flip cards */
  function toggleFlip(el) {
    const on = el.classList.toggle('flipped');
    el.setAttribute('aria-pressed', on);
  }
  document.addEventListener('click', (e) => { const f = e.target.closest('.flip'); if (f) toggleFlip(f); });
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('flip')) { e.preventDefault(); toggleFlip(e.target); }
  });

  /* ---------- tilt ---------- */
  chay('tilt', () => {
    if (!(fine && !reduce)) return;
    document.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const el = e.target.closest && e.target.closest('[data-tilt]');
      $$('[data-tilt].is-tilting').forEach((o) => { if (o !== el) resetTilt(o); });
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const max = el.classList.contains('poster') || el.classList.contains('card3d') ? 12 : 7;
      el.style.setProperty('--ry', `${((px - 0.5) * 2 * max).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${((0.5 - py) * 2 * max).toFixed(2)}deg`);
      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
      el.classList.add('is-tilting');
    });
    function resetTilt(el) {
      el.classList.remove('is-tilting');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    }
    document.addEventListener('pointerleave', () => $$('[data-tilt].is-tilting').forEach(resetTilt));

    const hero = $('#top'), deck = $('#deck');
    if (!hero || !deck) return;
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      deck.style.setProperty('--ry', `${(px * 30).toFixed(1)}deg`);
      deck.style.setProperty('--rx', `${(-py * 22).toFixed(1)}deg`);
    });
    hero.addEventListener('pointerleave', () => { deck.style.removeProperty('--ry'); deck.style.removeProperty('--rx'); });
  });

  /* ---------- copy ---------- */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    const v = b.dataset.copy;
    const fallback = () => {
      const t = document.createElement('textarea');
      t.value = v; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); say(`Đã chép ${v}`); } catch (err) { say(v); }
      t.remove();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(v).then(() => say(`Đã chép ${v}`), fallback);
    else fallback();
  });

  /* ---------- open status ---------- */
  const OPEN = 9, CLOSE = 21;
  function renderOpen() {
    const now = new Date();
    const m = now.getHours() * 60 + now.getMinutes();
    const open = m >= OPEN * 60 && m < CLOSE * 60;
    const st = $('#openStatus');
    const txt = $('#openText');
    if (st) st.classList.toggle('open', open);
    if (txt) txt.textContent = open ? 'Đang mở cửa, đóng lúc 21:00' : (m < OPEN * 60 ? 'Chưa mở cửa, mở lúc 09:00' : 'Đã đóng cửa, mở lại 09:00 sáng mai');
  }

  /* ---------- booking ---------- */
  const CAP = 3;
  const HOURS = Array.from({ length: CLOSE - OPEN }, (_, i) => OPEN + i);
  const KEY = 'dany_bookings_v1';
  let mine = {};
  try { mine = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
  const saveMine = () => { try { localStorage.setItem(KEY, JSON.stringify(mine)); } catch (e) {} };

  const dKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const hashStr = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const baseCache = {};
  function base(key) {
    if (!baseCache[key]) {
      const r = rng(hashStr(key));
      baseCache[key] = HOURS.map((h) => {
        const v = r() + (h >= 17 && h <= 19 ? 0.35 : h >= 13 && h <= 15 ? 0.15 : 0);
        return v > 1.05 ? 3 : v > 0.75 ? 2 : v > 0.4 ? 1 : 0;
      });
    }
    return baseCache[key];
  }
  const remaining = (key, h) => Math.max(0, CAP - base(key)[h - OPEN] - ((mine[key] && mine[key][h]) || 0));
  function isPast(key, h) {
    const now = new Date();
    return key === dKey(now) && h * 60 <= now.getHours() * 60 + now.getMinutes();
  }

  const WD = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d; });
  let selDate = dKey(days[0]);
  let selHour = null;
  let selService = MENU[0].id;

  chay('booking', () => {
  const serviceSel = $('#fService');
  serviceSel.innerHTML =
    '<optgroup label="Combo Giáng Sinh">' +
    MENU.map((m) => `<option value="${m.id}">${m.name} (${m.price}K)</option>`).join('') +
    '</optgroup>' +
    PRICES.map((g) => `<optgroup label="${g.group}">${g.items.map(([n, p]) => `<option value="${n}">${n} (${p})</option>`).join('')}</optgroup>`).join('') +
    '<option value="khac">Chưa chắc, tư vấn tại quán</option>';

  function renderDates() {
    $('#dates').innerHTML = days.map((d, i) => {
      const k = dKey(d);
      return `<button type="button" class="date" data-date="${k}" aria-pressed="${k === selDate}"><small>${i === 0 ? 'Hôm nay' : i === 1 ? 'Ngày mai' : WD[d.getDay()]}</small><b>${pad(d.getDate())}/${pad(d.getMonth() + 1)}</b></button>`;
    }).join('');
  }

  function renderSlots() {
    let open = 0;
    $('#slots').innerHTML = HOURS.map((h) => {
      const past = isPast(selDate, h);
      const left = past ? 0 : remaining(selDate, h);
      if (left > 0) open++;
      const label = past ? 'đã qua' : left === 0 ? 'hết chỗ' : `còn ${left}`;
      const pressed = selHour === h && left > 0;
      return `<button type="button" class="slot${left === 1 ? ' low' : ''}" data-hour="${h}" aria-pressed="${pressed}" ${left === 0 ? 'disabled' : ''}>${pad(h)}:00<small>${label}</small></button>`;
    }).join('');
    if (selHour !== null && (isPast(selDate, selHour) || remaining(selDate, selHour) === 0)) selHour = null;
    $('#slotHint').textContent = open ? `${open} khung giờ còn trống` : 'Ngày này đã hết chỗ';
  }

  const gaugeBar = $('#gaugeBar');
  const CIRC = 2 * Math.PI * 58;
  let shown = 0;
  function countTo(el, from, to) {
    if (reduce || from === to) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 900;
    (function step(t) {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  function renderToday() {
    const k = dKey(new Date());
    let left = 0, total = 0;
    HOURS.forEach((h) => { if (!isPast(k, h)) { total += CAP; left += remaining(k, h); } });
    const now = new Date();
    $('#todayLabel').textContent = `Hôm nay ${pad(now.getDate())}/${pad(now.getMonth() + 1)} tại CN1`;
    gaugeBar.style.strokeDasharray = CIRC;
    gaugeBar.style.strokeDashoffset = CIRC * (1 - (total ? left / total : 0));
    countTo($('#gaugeNum'), shown, left);
    countTo($('#heroSlots'), shown, left);
    shown = left;
    $('#gaugeOf').textContent = total ? `trên ${total} slot còn lại` : 'hết giờ nhận lịch';
    $('#todayMsg').textContent = !total ? 'Hôm nay quán đã hết giờ nhận lịch, bạn chọn ngày mai nhé.' : left === 0 ? 'Hôm nay đã kín lịch, bạn chọn ngày khác nhé.' : left <= 6 ? `Chỉ còn ${left} slot, nên giữ chỗ sớm.` : `Còn ${left} slot từ bây giờ đến 21:00.`;
    $('#bars').innerHTML = HOURS.map((h) => {
      const past = isPast(k, h), r = past ? 0 : remaining(k, h);
      const cls = past ? 'past' : r === 0 ? 'full' : '';
      return `<div class="${cls}" title="${pad(h)}:00, ${past ? 'đã qua' : r ? `còn ${r}` : 'hết chỗ'}"><i style="--h:${past ? 4 : Math.max(4, (r / CAP) * 100)}%"></i></div>`;
    }).join('');
  }

  $('#dates').addEventListener('click', (e) => {
    const b = e.target.closest('.date'); if (!b) return;
    selDate = b.dataset.date; selHour = null;
    renderDates(); renderSlots();
  });
  $('#slots').addEventListener('click', (e) => {
    const b = e.target.closest('.slot'); if (!b || b.disabled) return;
    selHour = +b.dataset.hour;
    $$('.slot').forEach((s) => s.setAttribute('aria-pressed', s === b));
  });
  serviceSel.addEventListener('change', () => { selService = serviceSel.value; });
  menuList.addEventListener('click', (e) => {
    const b = e.target.closest('[data-service]'); if (!b) return;
    selService = b.dataset.service; serviceSel.value = selService;
    say('Đã chọn dịch vụ, mời bạn chọn giờ');
    goTo('#dat-lich');
  });

  const form = $('#bookForm'), done = $('#done'), err = $('#formError');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#fName').value.trim();
    const phone = $('#fPhone').value.replace(/[\s.\-]/g, '');
    err.textContent = '';
    if (selHour === null) { err.textContent = 'Bạn chọn giờ còn trống trước nhé.'; return; }
    if (name.length < 2) { err.textContent = 'Bạn nhập họ tên giúp Dany nhé.'; $('#fName').focus(); return; }
    if (!/^(0|\+84)\d{9}$/.test(phone)) { err.textContent = 'Số điện thoại cần 10 số, ví dụ 0901234567.'; $('#fPhone').focus(); return; }
    const branch = $('#fBranch').value;
    if (branch === 'cn2' && selDate < CN2_OPEN) { err.textContent = 'CN2 Hà Nội khai trương 10/10/2026, bạn chọn từ ngày 10/10 nhé.'; return; }
    if (remaining(selDate, selHour) === 0) { err.textContent = 'Khung giờ này vừa hết chỗ, bạn chọn giờ khác nhé.'; renderSlots(); return; }
    (mine[selDate] = mine[selDate] || {})[selHour] = ((mine[selDate] || {})[selHour] || 0) + 1;
    saveMine();
    const svcText = serviceSel.value === 'khac' ? 'tư vấn tại quán' : serviceSel.options[serviceSel.selectedIndex].text;
    const branchText = branch === 'cn2' ? 'CN2 Hoàn Kiếm, Hà Nội' : 'CN1 Tân Định, Q1';
    const d = days.find((x) => dKey(x) === selDate);
    $('#doneText').textContent = `${name}, ${pad(selHour)}:00 ngày ${pad(d.getDate())}/${pad(d.getMonth() + 1)} tại ${branchText}. Dịch vụ: ${svcText}. Số điện thoại ${phone}.`;
    form.hidden = true; done.hidden = false;
    renderSlots(); renderToday();
    done.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  });
  $('#againBtn').addEventListener('click', () => {
    done.hidden = true; form.hidden = false; selHour = null; form.reset(); serviceSel.value = selService;
    renderSlots();
    form.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  });

  renderDates(); renderSlots(); renderToday();
  setInterval(() => { renderOpen(); renderSlots(); renderToday(); }, 60000);
  }); // hết khối booking

  chay('open-status', renderOpen);
  chay('reveal', observeReveals);

  /* ---------- sparkles ---------- */
  const cv = $('#sparkles');
  if (cv && !reduce) {
    const ctx = cv.getContext('2d');
    let W, H, DPR;
    const parts = [];
    const HUES = [335, 270, 160, 25, 320];
    function resize() { DPR = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); }
    resize(); addEventListener('resize', resize);
    function spawn(x, y, burst) {
      parts.push({
        x, y, burst,
        vx: (Math.random() - 0.5) * (burst ? 2.4 : 0.35),
        vy: burst ? (Math.random() - 0.7) * 1.8 : -0.12 - Math.random() * 0.35,
        s: burst ? 3 + Math.random() * 5 : 2 + Math.random() * 5,
        t: 0, max: burst ? 50 + Math.random() * 40 : 260 + Math.random() * 360,
        hue: HUES[(Math.random() * HUES.length) | 0], ph: Math.random() * 6.28,
      });
    }
    for (let i = 0; i < 46; i++) { spawn(Math.random() * innerWidth, Math.random() * innerHeight, false); parts[i].t = Math.random() * parts[i].max; }
    function star(x, y, s) {
      ctx.beginPath();
      ctx.moveTo(x, y - s);
      ctx.quadraticCurveTo(x, y, x + s, y);
      ctx.quadraticCurveTo(x, y, x, y + s);
      ctx.quadraticCurveTo(x, y, x - s, y);
      ctx.quadraticCurveTo(x, y, x, y - s);
      ctx.fill();
    }
    let lastSpawn = 0;
    if (fine) addEventListener('pointermove', (e) => {
      const n = performance.now();
      if (n - lastSpawn > 45 && parts.length < 160) { lastSpawn = n; spawn(e.clientX, e.clientY, true); }
    });
    let live = true;
    document.addEventListener('visibilitychange', () => { live = !document.hidden; if (live) loop(); });
    function loop() {
      if (!live) return;
      ctx.clearRect(0, 0, W, H);
      const light = isLightTheme();
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.t++; p.x += p.vx; p.y += p.vy;
        if (p.burst) p.vy += 0.03;
        if (p.t > p.max || p.y < -20) {
          if (p.burst) { parts.splice(i, 1); continue; }
          p.x = Math.random() * W; p.y = H + 10; p.t = 0;
        }
        const life = p.t / p.max;
        const a = Math.sin(Math.PI * life) * (0.55 + 0.45 * Math.sin(p.t * 0.08 + p.ph));
        ctx.fillStyle = `hsla(${p.hue}, 90%, ${light ? 55 : 78}%, ${Math.max(a, 0) * (light ? 0.7 : 0.95)})`;
        star(p.x, p.y, p.s * (p.burst ? 1 - life * 0.5 : 1));
      }
      requestAnimationFrame(loop);
    }
    loop();
  }
})();
