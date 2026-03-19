/* BizFlow — customers.js */

console.log("CUSTOMERS MODULE LOADING...");

        const avColors = ['linear-gradient(135deg,#c9a84c,#8b5e1a)', 'linear-gradient(135deg,#3ecf8e,#1a7a52)', 'linear-gradient(135deg,#60a5fa,#1e4fa3)', 'linear-gradient(135deg,#f87171,#a83030)', 'linear-gradient(135deg,#a78bfa,#5b3db5)', 'linear-gradient(135deg,#fb923c,#b05420)', 'linear-gradient(135deg,#34d399,#0f6b44)', 'linear-gradient(135deg,#f472b6,#9d1f60)'];

        const groups = [
            { id: 'all', lbl: 'All Customers', cnt: 156, ico: '⊞', sub: false },
            { id: 'wholesale', lbl: 'Wholesale', cnt: 45, ico: '📁', sub: false },
            { id: 'gold', lbl: 'Gold', cnt: 12, ico: '⭐', sub: true },
            { id: 'platinum', lbl: 'Platinum', cnt: 8, ico: '⭐⭐', sub: true },
            { id: 'diamond', lbl: 'Diamond', cnt: 5, ico: '⭐⭐⭐', sub: true },
            { id: 'retail', lbl: 'Retail', cnt: 78, ico: '📁', sub: false },
            { id: 'corporate', lbl: 'Corporate', cnt: 23, ico: '📁', sub: false },
            { id: 'international', lbl: 'International', cnt: 10, ico: '📁', sub: false },
        ];

        const custs = [
            { id: 1, code: 'CUST001', nm: 'ABC Corporation', type: 'Business', grp: 'Wholesale', phone: '+1 212 555 0100', email: 'abc@corp.com', credit: 10000, rev: 42450, due: 0, _cust_tags: ['VIP', 'Net30'], st: 'Active', ini: 'AC', col: 0 },
            { id: 2, code: 'CUST002', nm: 'John Smith', type: 'Individual', grp: 'Retail', phone: '+1 617 555 0142', email: 'john@smith.com', credit: 1000, rev: 8200, due: 3200, _cust_tags: ['Retail'], st: 'Active', ini: 'JS', col: 1 },
            { id: 3, code: 'CUST003', nm: 'XYZ Industries Ltd', type: 'Business', grp: 'Corporate', phone: '+1 312 555 0187', email: 'contact@xyz.com', credit: 25000, rev: 86700, due: 0, _cust_tags: ['Enterprise', 'VIP'], st: 'Active', ini: 'XI', col: 2 },
            { id: 4, code: 'CUST004', nm: 'Metro Supplies Co.', type: 'Business', grp: 'Wholesale', phone: '+1 512 555 0221', email: 'info@metro.com', credit: 8000, rev: 18340, due: 2670, _cust_tags: ['Wholesale'], st: 'Active', ini: 'MS', col: 3 },
            { id: 5, code: 'CUST005', nm: 'Global Traders LLC', type: 'Business', grp: 'International', phone: '+1 305 555 0099', email: 'trade@global.com', credit: 15000, rev: 29800, due: 5800, _cust_tags: ['International'], st: 'Active', ini: 'GT', col: 4 },
            { id: 6, code: 'CUST006', nm: 'Sarah Johnson', type: 'Individual', grp: 'Retail', phone: '+1 415 555 0312', email: 'sarah@email.com', credit: 500, rev: 2300, due: 0, _cust_tags: ['Retail'], st: 'Active', ini: 'SJ', col: 5 },
            { id: 7, code: 'CUST007', nm: 'Pacific Rim Exports', type: 'Business', grp: 'International', phone: '+65 6555 1234', email: 'pacific@rim.sg', credit: 20000, rev: 54200, due: 0, _cust_tags: ['International', 'VIP'], st: 'Active', ini: 'PR', col: 6 },
            { id: 8, code: 'CUST008', nm: 'David Chen', type: 'Individual', grp: 'Corporate', phone: '+1 650 555 0444', email: 'dchen@co.com', credit: 2000, rev: 6700, due: 0, _cust_tags: ['Corporate'], st: 'Active', ini: 'DC', col: 7 },
            { id: 9, code: 'CUST009', nm: 'Alpine Solutions AG', type: 'Business', grp: 'International', phone: '+41 44 555 0009', email: 'info@alpine.ch', credit: 30000, rev: 103400, due: 12000, _cust_tags: ['International', 'Enterprise'], st: 'Active', ini: 'AS', col: 0 },
            { id: 10, code: 'CUST010', nm: 'Maria Garcia', type: 'Individual', grp: 'Retail', phone: '+34 91 555 0010', email: 'maria@garcia.es', credit: 800, rev: 1200, due: 0, _cust_tags: ['Retail'], st: 'Inactive', ini: 'MG', col: 1 },
            { id: 11, code: 'CUST011', nm: 'TechCorp Solutions', type: 'Business', grp: 'Corporate', phone: '+1 408 555 0111', email: 'tech@corp.com', credit: 50000, rev: 215000, due: 0, _cust_tags: ['Enterprise', 'VIP', 'Credit'], st: 'Active', ini: 'TC', col: 2 },
            { id: 12, code: 'CUST012', nm: 'Omar Farouk', type: 'Individual', grp: 'Wholesale', phone: '+971 4 555 0012', email: 'omar@farouk.ae', credit: 3000, rev: 12800, due: 0, _cust_tags: ['Wholesale', 'Gold'], st: 'Blocked', ini: 'OF', col: 3 },
        ];

        let curFilt = 'all', curGrp = 'all', curView = 'table', selId = null, fmTags = [], fmSt = 'Active', fmType = 'Individual', editingId_cust = null;

        function updateBreadcrumb_cust() {
            if (curGrp === 'all') {
                document.getElementById('crumbCurr').textContent = 'Customers';
            } else {
                const grp = groups.find(g => g.id === curGrp);
                if (grp) {
                    document.getElementById('crumbCurr').textContent = 'Customers › ' + grp.lbl;
                } else {
                    document.getElementById('crumbCurr').textContent = 'Customers';
                }
            }
        }

        function renderTree() {
            const b = document.getElementById('treeBody'); b.innerHTML = '';
            groups.forEach(g => {
                const d = document.createElement('div');
                d.className = 'ti' + (g.sub ? ' sub' : '') + (g.id === curGrp ? ' active' : '');
                d.innerHTML = `<span style="font-size:11px">${g.ico}</span><span>${g.lbl}</span><span class="ti-cnt">${g.cnt}</span>`;
                d.onclick = () => { curGrp = g.id; renderTree(); updateBreadcrumb_cust(); filterAll_cust(); };
                b.appendChild(d);
            });
        }

        function renderTable_cust(data) {
            console.log("Rendering Customer Table with", data.length, "items");
            const b = document.getElementById('cust-tBody'); if(!b){console.error('MISSING cust-tBody');return;} b.innerHTML = '';
            try {
            data.forEach((c, i) => {
                const sc = { Active: 'p-active', Inactive: 'p-inactive', Blocked: 'p-blocked' }[c.st] || 'p-active';
                const tr = document.createElement('tr');
                tr.style.animationDelay = (i * .04) + 's';
                tr.dataset.id = c.id;
                tr.onclick = e => { if (!e.target.closest('.ra')) openDetail(c.id); };
                tr.innerHTML = `
      <td style="padding-left:16px"><input type="checkbox" style="accent-color:var(--gold);cursor:pointer" onclick="event.stopPropagation()" onchange="updateBulkBar_cust()"></td>
      <td><div class="c-cell"><div class="c-av" style="background:${avColors[c.col]}">${c.ini}</div><div><div class="c-nm">${c.nm}</div><div class="c-sub">${c.code}</div></div></div></td>
      <td><span style="font-size:11px;color:var(--text3);font-family:'DM Mono',monospace">${c.type}</span></td>
      <td style="width:90px;max-width:90px"><span style="font-size:11px;color:var(--text2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;max-width:82px">${c.grp}</span></td>
      <td><div style="font-size:12px">${c.phone}</div><div style="font-size:10px;color:var(--text3)">${c.email}</div></td>
      <td style="font-family:'DM Mono',monospace;font-size:12px">$${c.credit.toLocaleString()}</td>
      <td><div style="font-family:'DM Mono',monospace;font-size:13px;font-weight:500">$${c.rev.toLocaleString()}</div>${c.due > 0 ? `<div style="font-size:10px;color:var(--orange);font-family:'DM Mono',monospace">$${c.due.toLocaleString()} due</div>` : ''}</td>
      <td>${c._cust_tags.slice(0, 2).map(t => `<span class="tag${t === 'VIP' || t === 'Enterprise' ? ' g' : ''}">${t}</span>`).join('')}${c._cust_tags.length > 2 ? `<span class="tag">+${c._cust_tags.length - 2}</span>` : ''}</td>
      <td><span class="pill ${sc}">${c.st}</span></td>
      <td onclick="event.stopPropagation()"><div class="ra">
        <div class="ib" title="View" onclick="openDetail(${c.id})">◉</div>
        <div class="ib" title="Edit" onclick="editCust(${c.id})">✎</div>
        <div class="ib" title="Invoice" onclick="showToast('New invoice…')">◼</div>
        <div class="ib del" title="Delete" onclick="showDel(${c.id})">🗑</div>
      </div></td>`;
                b.appendChild(tr);
            });
            } catch(e) { console.error('renderTable_cust ERROR:', e.message, e.stack); }
        }

        function renderCards_cust(data) {
            const w = document.getElementById('cust-cardsWrap'); w.innerHTML = '';
            data.forEach((c, i) => {
                const sc = { Active: 'p-active', Inactive: 'p-inactive', Blocked: 'p-blocked' }[c.st] || 'p-active';
                const d = document.createElement('div');
                d.className = 'c-card'; d.style.animationDelay = (i * .05) + 's';
                d.onclick = () => openDetail(c.id);
                d.innerHTML = `
      <div class="card-av" style="background:${avColors[c.col]}">${c.ini}</div>
      <div class="card-nm">${c.nm}</div>
      <div class="card-tp">${c.code} · ${c.type}</div>
      <div class="card-meta"><span>📞</span> ${c.phone}<br><span>✉</span> ${c.email}<br><span>📁</span> ${c.grp}</div>
      <div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:3px">${c._cust_tags.slice(0, 3).map(t => `<span class="tag${t === 'VIP' || t === 'Enterprise' ? ' g' : ''}">${t}</span>`).join('')}</div>
      <div class="card-foot">
        <div><div style="font-size:9px;color:var(--text3);font-family:'DM Mono',monospace;margin-bottom:2px">Revenue</div><div class="card-rev">$${c.rev.toLocaleString()}</div></div>
        <div style="display:flex;align-items:center;gap:6px"><span class="pill ${sc}">${c.st}</span><div class="card-acts"><div class="ib" onclick="event.stopPropagation();editCust(${c.id})">✎</div><div class="ib del" onclick="event.stopPropagation();showDel(${c.id})">🗑</div></div></div>
      </div>`;
                w.appendChild(d);
            });
        }

        function filterAll_cust() {
            const q = document.getElementById('cust-searchInput').value.toLowerCase();
            let data = custs;
            if (curFilt !== 'all') data = data.filter(c => c.st === curFilt);
            if (curGrp !== 'all') data = data.filter(c => c.grp.toLowerCase().includes(curGrp.replace('_', ' ')));
            if (q) data = data.filter(c => c.nm.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
            renderTable_cust(data); renderCards_cust(data);
        }

        function fStatus(s, el) { document.querySelectorAll('.sf-t').forEach(t => t.classList.remove('active')); el.classList.add('active'); curFilt = s; filterAll_cust(); }
        function setView_cust(v, el) { curView = v; document.querySelectorAll('.vt-b').forEach(b => b.classList.remove('active')); el.classList.add('active'); document.getElementById('tableWrap').style.display = v === 'table' ? 'block' : 'none'; document.getElementById('cardGrid').style.display = v === 'card' ? 'block' : 'none'; }
        function selAll_cust(cb) { document.querySelectorAll('#cust-tBody input[type=checkbox]').forEach(c => c.checked = cb.checked); updateBulkBar_cust(); }

        // DETAIL
        function openDetail(id) {
            selId = id; const c = custs.find(x => x.id === id); if (!c) return;
            const dp = document.getElementById('detailPanel'); dp.style.display = 'flex';
            document.getElementById('dpAv').style.background = avColors[c.col];
            document.getElementById('dpAv').textContent = c.ini;
            document.getElementById('dpNm').textContent = c.nm;
            document.getElementById('dpCode').textContent = c.code + ' · ' + c.type;
            const sc = { Active: 'p-active', Inactive: 'p-inactive', Blocked: 'p-blocked' }[c.st] || 'p-active';
            document.getElementById('dpSt').innerHTML = `<span class="pill ${sc}">${c.st}</span>`;
            document.getElementById('dpStats').innerHTML = `
    <div class="stat-box"><div class="stat-lbl">Revenue</div><div class="stat-val" style="color:var(--gold2)">$${(c.rev / 1000).toFixed(1)}k</div></div>
    <div class="stat-box"><div class="stat-lbl">Outstanding</div><div class="stat-val" style="color:${c.due > 0 ? 'var(--orange)' : 'var(--green)'}">$${c.due.toLocaleString()}</div></div>
    <div class="stat-box"><div class="stat-lbl">Credit</div><div class="stat-val">$${(c.credit / 1000).toFixed(0)}k</div></div>
    <div class="stat-box"><div class="stat-lbl">Group</div><div class="stat-val" style="font-size:13px">${c.grp}</div></div>`;
            document.getElementById('dpContact').innerHTML = `
    <div class="dp-row"><span class="dp-lbl">Phone</span><span class="dp-val">${c.phone}</span></div>
    <div class="dp-row"><span class="dp-lbl">Email</span><span class="dp-val">${c.email}</span></div>`;
            document.getElementById('dpComm').innerHTML = `
    <div class="dp-row"><span class="dp-lbl">Credit</span><span class="dp-val mono" style="color:var(--gold2)">$${c.credit.toLocaleString()}</span></div>
    <div class="dp-row"><span class="dp-lbl">Terms</span><span class="dp-val mono">Net 30</span></div>
    <div class="dp-row"><span class="dp-lbl">Currency</span><span class="dp-val mono">USD ($)</span></div>
    <div class="dp-row"><span class="dp-lbl">Discount</span><span class="dp-val mono">0%</span></div>`;
            document.getElementById('dpTags').innerHTML = c._cust_tags.map(t => `<span class="tag${t === 'VIP' || t === 'Enterprise' ? ' g' : ''}">${t}</span>`).join('');
            // docs
            const docsEl = document.getElementById('dpDocs'); docsEl.innerHTML = '';
            [{ num: 'INV-2024-0018', type: 'Invoice', amt: 12450, st: 'Paid', sc: 'p-paid' }, { num: 'QUOT-2024-0012', type: 'Quote', amt: 8200, st: 'Pending', sc: 'p-pending' }, { num: 'INV-2024-0013', type: 'Invoice', amt: 4100, st: 'Paid', sc: 'p-paid' }].forEach(d => {
                const el = document.createElement('div');
                el.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer;';
                el.onmouseover = () => el.style.opacity = '.8'; el.onmouseout = () => el.style.opacity = '1';
                el.innerHTML = `<div><div style="font-family:'DM Mono',monospace;color:var(--gold);font-size:11px">${d.num}</div><div style="font-size:10px;color:var(--text3)">${d.type}</div></div><div style="text-align:right"><div style="font-family:'DM Mono',monospace;font-size:12px">$${d.amt.toLocaleString()}</div><span class="pill ${d.sc}" style="font-size:9px;padding:2px 7px">${d.st}</span></div>`;
                docsEl.appendChild(el);
            });
        }
        function closeDetail_cust() { document.getElementById('detailPanel').style.display = 'none'; selId = null; }
        function editFromDetail() { if (selId) editCust(selId); }

        // VIEWS
        function showList() {
            document.getElementById('cust-listView').style.display = 'flex';
            document.getElementById('cust-formView').style.display = 'none';
            document.getElementById('listBtns').style.display = 'flex';
            document.getElementById('formBtns').style.display = 'none';
            document.getElementById('groupTree').style.display = 'flex';
            updateBreadcrumb_cust();
            // update badge to match actual list count
            const badge = document.getElementById('cust-badge');
            if (badge) badge.textContent = custs.length;
            renderTree(); filterAll_cust();
        }
        function showCreate() {
            editingId_cust = null;
            fmTags = []; fmSt = 'Active'; fmType = 'Individual'; renderTags();
            document.getElementById('cust-listView').style.display = 'none';
            document.getElementById('cust-formView').style.display = 'flex';
            document.getElementById('listBtns').style.display = 'none';
            document.getElementById('formBtns').style.display = 'flex';
            document.getElementById('groupTree').style.display = 'none';
            document.getElementById('detailPanel').style.display = 'none';
            document.getElementById('crumbCurr').textContent = 'New Customer';
            fmTags = []; renderTags();
            document.getElementById('fName').value = '';
            sTab('basic', document.querySelector('.f-tab'));
            upPrev();
        }
        function editCust(id) {
            showCreate();
            const c = custs.find(x => x.id === id); if (!c) return;
            editingId_cust = id;
            document.getElementById('crumbCurr').textContent = 'Edit: ' + c.nm;
            document.getElementById('fName').value = c.nm;
            document.getElementById('fCode').value = c.code;
            document.getElementById('fGrp').value = c.grp;
            fmTags = [...c._cust_tags]; renderTags();
            setSt(c.st); setType(c.type);
            if (document.getElementById('fCredit')) document.getElementById('fCredit').value = c.credit;
            upPrev();
        }

        // FORM HELPERS
        function sTab(t, el) {
            document.querySelectorAll('.f-tab').forEach(x => x.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(x => x.classList.remove('active'));
            if (el) el.classList.add('active');
            const p = document.getElementById('tab-' + t); if (p) p.classList.add('active');
        }
        function upPrev() {
            const nm = document.getElementById('fName').value || 'New Customer';
            const code = document.getElementById('fCode').value || 'CUST006';
            const grp = document.getElementById('fGrp').value || '';
            const credit = document.getElementById('fCredit') ? document.getElementById('fCredit').value : '5000';
            const ini = nm.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase() || '?';
            document.getElementById('prevNm').textContent = nm;
            document.getElementById('prevCode').textContent = code;
            document.getElementById('prevType').textContent = fmType;
            document.getElementById('prevCredit').textContent = '$' + parseInt(credit || 0).toLocaleString();
            document.getElementById('prevGrp').innerHTML = grp ? `<span class="tag">${grp}</span>` : '';
            document.getElementById('fmAv').textContent = ini;
            document.getElementById('prevAv').textContent = ini;
        }
        function setType(t) {
            fmType = t;
            document.getElementById('ttInd').classList.toggle('active', t === 'Individual');
            document.getElementById('ttBiz').classList.toggle('active', t === 'Business');
            upPrev();
        }
        function setSt(s) {
            fmSt = s;
            const map = { 'Active': ['rsA', 'grn'], 'Inactive': ['rsI', ''], 'Blocked': ['rsB', 'red'] };
            ['rsA', 'rsI', 'rsB'].forEach(id => { const b = document.getElementById(id); if (b) b.className = 'ro'; });
            const m = map[s]; if (m) { const b = document.getElementById(m[0]); if (b) b.className = 'ro active ' + (m[1] || ''); }
            const sc = { Active: 'p-active', Inactive: 'p-inactive', Blocked: 'p-blocked' }[s] || 'p-active';
            document.getElementById('prevSt').innerHTML = `<span class="pill ${sc}">${s}</span>`;
        }
        function setRG(el) { const p = el.closest('.rg'); p.querySelectorAll('.ro').forEach(b => { b.classList.remove('active', 'grn', 'gld', 'red'); }); el.classList.add('active'); }
        function handleTag_cust(e) {
            if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); const v = e.target.value.trim().replace(',', ''); if (v && !fmTags.includes(v)) { fmTags.push(v); renderTags(); } e.target.value = ''; }
            else if (e.key === 'Backspace' && !e.target.value && fmTags.length > 0) { fmTags.pop(); renderTags(); }
        }
        function renderTags() {
            const w = document.getElementById('tagsWrap'), inp = document.getElementById('tagInp');
            w.innerHTML = '';
            fmTags.forEach((t, i) => { const s = document.createElement('span'); s.className = 'tag-item'; s.innerHTML = `${t}<button class="tag-rm" onclick="rmTag(${i})">×</button>`; w.appendChild(s); });
            w.appendChild(inp);
        }
        function rmTag(i) { fmTags.splice(i, 1); renderTags(); document.getElementById('tagInp').focus(); }

        // MODAL / ACTIONS
        let delTargetId = null;
        function showDel(id) { delTargetId = id || selId; const c = custs.find(x => x.id === delTargetId); document.getElementById('delTarget').textContent = c ? c.nm : 'this customer'; document.getElementById('delModal').classList.add('show'); }
        function closeModal_cust() { document.getElementById('delModal').classList.remove('show'); }
        function confirmDel_cust() {
            closeModal_cust();
            if (delTargetId) {
                const idx = custs.findIndex(x => x.id === delTargetId);
                if (idx >= 0) custs.splice(idx, 1);
                delTargetId = null;
            }
            closeDetail_cust(); showList(); filterAll_cust(); showToast('Customer deleted');
        }
        function doSave_cust() {
            const nm = document.getElementById('fName').value.trim();
            if (!nm) { showToast('Customer name is required', 'err'); return; }
            const code = document.getElementById('fCode').value.trim() || 'CUST' + Date.now().toString().slice(-4);
            const grp  = document.getElementById('fGrp').value || 'Retail';
            const credit = parseFloat(document.getElementById('fCredit') ? document.getElementById('fCredit').value : 0) || 0;
            const ini  = nm.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase() || '??';
            if (editingId_cust) {
                const idx = custs.findIndex(x => x.id === editingId_cust);
                if (idx >= 0) {
                    custs[idx] = { ...custs[idx], nm, code, grp, credit, ini, st: fmSt, type: fmType, _cust_tags: [...fmTags] };
                }
                editingId_cust = null;
            } else {
                const newId = Math.max(0, ...custs.map(c => c.id)) + 1;
                custs.push({ id: newId, code, nm, type: fmType, grp, phone: '', email: '', credit, rev: 0, due: 0, _cust_tags: [...fmTags], st: fmSt, ini, col: newId % avColors.length });
            }
            upPrev(); showList(); showToast('Customer saved', true);
            filterAll_cust();
        }

        let _cust_toastTimer;
        
        // ── Bulk selection ──
        function updateBulkBar_cust() {
            const checked = document.querySelectorAll('#cust-tBody input[type=checkbox]:checked');
            const bar = document.getElementById('cust-bulk-bar');
            const countEl = document.getElementById('cust-bulk-count');
            if (!bar || !countEl) return;
            const n = checked.length;
            if (n > 0) {
                bar.style.display = 'flex';
                countEl.textContent = n + ' selected';
            } else {
                bar.style.display = 'none';
            }
        }
        function clearSelection_cust() {
            document.querySelectorAll('#cust-tBody input[type=checkbox]').forEach(cb => cb.checked = false);
            const hdr = document.querySelector('#view-customers thead input[type=checkbox]');
            if (hdr) hdr.checked = false;
            updateBulkBar_cust();
        }
        function getSelectedIds_cust() {
            const checked = document.querySelectorAll('#cust-tBody input[type=checkbox]:checked');
            return Array.from(checked).map(cb => parseInt(cb.closest('tr').dataset.id)).filter(Boolean);
        }
        function bulkEmail_cust() {
            const ids = getSelectedIds_cust();
            const emails = ids.map(id => custs.find(x => x.id === id)?.email).filter(Boolean);
            showToast('Opening email to ' + emails.length + ' customer' + (emails.length !== 1 ? 's' : '') + '…');
            window.open('mailto:' + emails.join(','));
        }
        function bulkExport_cust() {
            const ids = getSelectedIds_cust();
            const rows = ids.map(id => {
                const c = custs.find(x => x.id === id);
                if (!c) return '';
                return [c.code, c.nm, c.type, c.grp, c.phone, c.email, c.credit, c.rev, c.due, c.st].join(',');
            }).filter(Boolean);
            const csv = 'Code,Name,Type,Group,Phone,Email,Credit,Revenue,Due,Status\n' + rows.join('\n');
            const a = document.createElement('a');
            a.href = 'data:text/csv,' + encodeURIComponent(csv);
            a.download = 'customers_export.csv'; a.click();
            showToast('Exported ' + rows.length + ' customers', true);
        }
        function bulkChangeGroup_cust() {
            const groups_list = ['Wholesale', 'Retail', 'Corporate', 'International'];
            const choice = prompt('Change group to:\n' + groups_list.map((g,i) => (i+1)+'. '+g).join('\n') + '\n\nEnter number (1-4):');
            const idx = parseInt(choice) - 1;
            if (idx >= 0 && idx < groups_list.length) {
                const newGrp = groups_list[idx];
                document.querySelectorAll('#cust-tBody input[type=checkbox]:checked').forEach(cb => {
                    const id = parseInt(cb.closest('tr').dataset.id);
                    const c = custs.find(x => x.id === id);
                    if (c) c.grp = newGrp;
                });
                filterAll_cust(); clearSelection_cust();
                showToast('Group updated to ' + newGrp, true);
            }
        }
        function bulkChangeStatus_cust() {
            const statuses = ['Active', 'Inactive', 'Blocked'];
            const choice = prompt('Change status to:\n1. Active\n2. Inactive\n3. Blocked\n\nEnter number (1-3):');
            const idx = parseInt(choice) - 1;
            if (idx >= 0 && idx < statuses.length) {
                const newSt = statuses[idx];
                document.querySelectorAll('#cust-tBody input[type=checkbox]:checked').forEach(cb => {
                    const id = parseInt(cb.closest('tr').dataset.id);
                    const c = custs.find(x => x.id === id);
                    if (c) c.st = newSt;
                });
                filterAll_cust(); clearSelection_cust();
                showToast('Status updated to ' + newSt, true);
            }
        }
        function bulkDelete_cust() {
            const n = document.querySelectorAll('#cust-tBody input[type=checkbox]:checked').length;
            if (confirm('Delete ' + n + ' customer' + (n > 1 ? 's' : '') + '?')) {
                clearSelection_cust();
                showToast(n + ' customer' + (n > 1 ? 's' : '') + ' deleted');
            }
        }

        function toast_cust_orig(msg, ok) { const el = document.createElement('div'); el.className = 'toast' + (ok ? ' ok' : ''); el.innerHTML = `<span>${ok ? '✓' : 'ℹ'}</span> ${msg}`; document.body.appendChild(el); clearTimeout(_cust_toastTimer); _cust_toastTimer = setTimeout(() => el.remove(), 3000); }

        // INIT: deferred to navTo()
