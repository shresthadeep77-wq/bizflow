/* BizFlow — settings.js */

function showSection(id, el) {
                    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                    document.querySelectorAll('.sn-item').forEach(s => s.classList.remove('active'));
                    const sec = document.getElementById('s-' + id);
                    if (sec) sec.classList.add('active');
                    el.classList.add('active');
                    const dcMap = { dq: { pfx: 'QUOT-', start: 1001, extras: 'validity' }, di: { pfx: 'INV-', start: 1001, extras: 'invoice' }, dp: { pfx: 'PRO-', start: 1001, extras: 'proforma' }, dpo: { pfx: 'PO-', start: 1001, extras: 'po' }, ddn: { pfx: 'DN-', start: 1001, extras: 'dn' }, dr: { pfx: 'RCP-', start: 1001, extras: 'receipt' } };
                    if (dcMap[id] && !document.getElementById('dc-' + id).innerHTML) renderDocSettings(id, dcMap[id]);
                }
                const docConfigs = {
                    validity: `<div class="fg fg-3"><div class="fld"><label>Validity Period (days)</label><input type="number" value="30" min="1"></div><div class="fld"><label>Default Tax %</label><input type="number" value="20"></div><div class="fld"><label>Terms Template</label><select><option>Standard</option><option>International</option><option>Service</option></select></div></div><div class="fld" style="margin-top:12px"><label>Default Footer Note</label><input type="text" value="Thank you for your business!"></div><div class="toggle-row" style="margin-top:12px"><div class="toggle-info"><div class="toggle-label">Show Expiry Alert</div><div class="toggle-desc">Alert <input type="number" value="5" style="width:42px;height:22px;background:var(--bg4);border:1px solid var(--border);border-radius:4px;padding:0 6px;color:var(--text);font-size:11px;font-family:'DM Mono',monospace;outline:none;text-align:center"> days before expiry</div></div><label class="toggle"><input type="checkbox" checked><div class="toggle-track"></div><div class="toggle-thumb"></div></label></div>`,
                    invoice: `<div class="fg fg-3"><div class="fld"><label>Due Days</label><input type="number" value="30"></div><div class="fld"><label>Payment Terms</label><select><option>Net 30</option><option>Net 15</option><option>Net 45</option></select></div><div class="fld"><label>Default Payment Method</label><select><option>Bank Transfer</option><option>Cash</option><option>Card</option></select></div></div><div class="div-lbl" style="margin-top:14px">Late Fee</div><div class="fg fg-2"><div class="fld"><label>Late Fee %</label><input type="number" value="2" step="0.1"></div><div class="fld"><label>Apply After (days)</label><input type="number" value="15"></div></div><div class="toggle-row" style="margin-top:10px"><div class="toggle-info"><div class="toggle-label">Send Payment Reminder</div><div class="toggle-desc"><input type="number" value="3" style="width:42px;height:22px;background:var(--bg4);border:1px solid var(--border);border-radius:4px;padding:0 6px;color:var(--text);font-size:11px;font-family:'DM Mono',monospace;outline:none;text-align:center"> days before due</div></div><label class="toggle"><input type="checkbox" checked><div class="toggle-track"></div><div class="toggle-thumb"></div></label></div>`,
                    proforma: `<div class="fg fg-2"><div class="fld"><label>Validity Period (days)</label><input type="number" value="60"></div></div><div class="toggle-row" style="margin-top:12px"><div class="toggle-info"><div class="toggle-label">Auto-convert to Invoice on Payment</div></div><label class="toggle"><input type="checkbox" checked><div class="toggle-track"></div><div class="toggle-thumb"></div></label></div>`,
                    po: `<div class="fg fg-2"><div class="fld"><label>Delivery Terms</label><select><option>FOB</option><option>CIF</option><option>EXW</option><option>DDP</option></select></div><div class="fld"><label>Payment Terms</label><select><option>Net 30</option><option>Net 15</option><option>Net 45</option></select></div></div><div class="toggle-row" style="margin-top:12px"><div class="toggle-info"><div class="toggle-label">Require Approval Before Sending</div></div><label class="toggle"><input type="checkbox" checked><div class="toggle-track"></div><div class="toggle-thumb"></div></label></div>`,
                    dn: `<div class="toggle-row"><div class="toggle-info"><div class="toggle-label">Require Customer Signature</div></div><label class="toggle"><input type="checkbox" checked><div class="toggle-track"></div><div class="toggle-thumb"></div></label></div><div class="toggle-row"><div class="toggle-info"><div class="toggle-label">Track Delivery Status</div></div><label class="toggle"><input type="checkbox" checked><div class="toggle-track"></div><div class="toggle-thumb"></div></label></div><div class="fld" style="margin-top:12px"><label>Default Delivery Terms</label><select><option>Free Delivery</option><option>FOB</option><option>Customer Pickup</option></select></div>`,
                    receipt: `<div class="toggle-row"><div class="toggle-info"><div class="toggle-label">Print Automatically on Save</div></div><label class="toggle"><input type="checkbox"><div class="toggle-track"></div><div class="toggle-thumb"></div></label></div><div class="toggle-row"><div class="toggle-info"><div class="toggle-label">Email Receipt to Customer</div></div><label class="toggle"><input type="checkbox" checked><div class="toggle-track"></div><div class="toggle-thumb"></div></label></div><div class="fld" style="margin-top:12px"><label>Accepted Payment Methods</label><select><option>All Methods</option><option>Bank Transfer Only</option></select></div>`
                };
                function renderDocSettings(id, cfg) {
                    const preview = cfg.pfx + '2025-' + String(cfg.start).padStart(4, '0');
                    document.getElementById('dc-' + id).innerHTML = `
    <div class="scard"><div class="scard-header"><div class="scard-title">Document Numbering</div></div><div class="scard-body">
      <div class="fg fg-3"><div class="fld"><label>Prefix</label><input type="text" value="${cfg.pfx}" style="font-family:'DM Mono',monospace;color:var(--gold2)"></div><div class="fld"><label>Starting Number</label><input type="number" value="${cfg.start}" style="font-family:'DM Mono',monospace"></div><div class="fld"><label>Suffix (optional)</label><input type="text" placeholder="e.g. -A"></div></div>
      <div class="fg fg-2" style="margin-top:12px"><div class="fld"><label>Number Format</label><select style="font-family:'DM Mono',monospace"><option>${cfg.pfx}YYYY-####</option><option>${cfg.pfx}YY-####</option><option>${cfg.pfx}####</option></select></div><div class="fld"><label>Reset Counter</label><select><option>Annually</option><option>Monthly</option><option>Never</option></select></div></div>
      <div style="margin-top:12px"><span style="font-size:11px;color:var(--text3);font-family:'DM Mono',monospace">Preview: </span><span class="num-preview">${preview}</span></div>
    </div></div>
    <div class="scard"><div class="scard-header"><div class="scard-title">Defaults</div></div><div class="scard-body">${docConfigs[cfg.extras] || ''}</div></div>`;
                }
                function selRadio(opt, name) {
                    document.querySelectorAll(`.radio-option input[name="${name}"]`).forEach(i => i.closest('.radio-option').classList.remove('selected'));
                    opt.classList.add('selected');
                    opt.querySelector('input[type=radio]').checked = true;
                }
                function buildCurrGrid() {
                    const el = document.getElementById('currGrid');
                    [['$', 'USD'], ['€', 'EUR'], ['£', 'GBP'], ['¥', 'JPY'], ['₹', 'INR'], ['₨', 'NPR'], ['₩', 'KRW'], ['₿', 'BTC']].forEach(([v, l], i) => {
                        const d = document.createElement('div');
                        d.className = 'grid-opt' + (i === 0 ? ' sel' : '');
                        d.innerHTML = `<span class="go-val">${v}</span><span class="go-lbl">${l}</span>`;
                        d.onclick = () => { el.querySelectorAll('.grid-opt').forEach(g => g.classList.remove('sel')); d.classList.add('sel'); };
                        el.appendChild(d);
                    });
                }
                function buildDecGrid() {
                    const el = document.getElementById('decGrid');
                    ['0', '1', '2', '3', '4'].forEach((v, i) => {
                        const d = document.createElement('div');
                        d.className = 'grid-opt' + (i === 2 ? ' sel' : '');
                        d.innerHTML = `<span class="go-val" style="font-size:15px;font-family:'DM Mono',monospace">${v}</span><span class="go-lbl">dp</span>`;
                        d.onclick = () => { el.querySelectorAll('.grid-opt').forEach(g => g.classList.remove('sel')); d.classList.add('sel'); };
                        el.appendChild(d);
                    });
                }
                function buildColTable(docTypeArg) {
                    const activeType = docTypeArg || docSettings._activeDocType || 'quotation';
                    docSettings._activeDocType = activeType;
                    // Saved config for this doc type (or default)
                    const savedCols = docSettings.perDoc[activeType] || docSettings.perDoc.quotation;
                    const colDefs = [
                        { key:'code',      label:'Item Code',       vis:false, w:80  },
                        { key:'name',      label:'Item Name',       vis:true,  w:200 },
                        { key:'desc',      label:'Description',     vis:true,  w:150 },
                        { key:'qty',       label:'Qty',             vis:true,  w:60  },
                        { key:'unit',      label:'Unit',            vis:true,  w:50  },
                        { key:'price',     label:'Unit Price',      vis:true,  w:90  },
                        { key:'discpct',   label:'Disc %',          vis:true,  w:70  },
                        { key:'discamt',   label:'Disc Amount',     vis:false, w:80  },
                        { key:'discprice', label:'Net Price',       vis:false, w:90  },
                        { key:'taxrate',   label:'Tax %',           vis:true,  w:60  },
                        { key:'taxamt',    label:'Tax Amount',      vis:false, w:80  },
                        { key:'totalex',   label:'Total excl. Tax', vis:false, w:90  },
                        { key:'totalinc',  label:'Amount',          vis:true,  w:90  },
                        { key:'margin',    label:'Margin %',        vis:false, w:70  },
                        { key:'rack',      label:'Location/Rack',   vis:false, w:80  },
                        { key:'notes',     label:'Notes',           vis:false, w:120 },
                    ];
                    const body = document.getElementById('colBody');
                    body.innerHTML = '';
                    colDefs.forEach((c, i) => {
                        const saved = savedCols[c.key] || {};
                        const tr = document.createElement('tr');
                        tr.dataset.col = c.key;
                        tr.innerHTML = `
                          <td><input type="text" value="${saved.label || c.label}"
                            style="width:130px;height:26px;background:var(--bg4);border:1px solid var(--border);border-radius:4px;padding:0 8px;color:var(--text);font-size:11px;font-family:'Instrument Sans',sans-serif;outline:none"
                            onchange="readDocSettings()" oninput="readDocSettings()"></td>
                          <td style="text-align:center"><input type="checkbox" ${(saved.vis !== undefined ? saved.vis : c.vis) ? 'checked' : ''} style="accent-color:var(--gold);width:14px;height:14px;cursor:pointer" onchange="readDocSettings()"></td>
                          <td><input type="number" value="${c.w}" min="30" max="400"
                            style="width:60px;height:26px;background:var(--bg4);border:1px solid var(--border);border-radius:4px;padding:0 8px;color:var(--text);font-size:11px;font-family:'DM Mono',monospace;outline:none"
                            onchange="readDocSettings()"></td>
                          <td><input type="number" value="${saved.order || (i+1)}" min="1" max="${colDefs.length}"
                            style="width:48px;height:26px;background:var(--bg4);border:1px solid var(--border);border-radius:4px;padding:0 8px;color:var(--text);font-size:11px;font-family:'DM Mono',monospace;outline:none"
                            onchange="readDocSettings()"></td>
                          <td><select onchange="readDocSettings()"
                            style="height:26px;background:var(--bg4);border:1px solid var(--border);border-radius:4px;padding:0 6px;color:var(--text2);font-size:11px;outline:none">
                            <option>Left</option><option>Center</option><option>Right</option></select></td>`;
                        // Set default alignment for numeric cols
                        const numericCols = ['qty','price','discpct','discamt','discprice','taxrate','taxamt','totalex','totalinc','margin'];
                        const centerCols  = ['unit'];
                        const sel = tr.querySelector('select');
                        // Restore alignment: saved value > default by column type
                        if (saved.align) sel.value = saved.align;
                        else if (numericCols.includes(c.key)) sel.value = 'Right';
                        else if (centerCols.includes(c.key)) sel.value = 'Center';
                        body.appendChild(tr);
                        // Sync initial values into active doc type's config
                        const activeCols = docSettings.perDoc[activeType] || docSettings.perDoc.quotation;
                        activeCols[c.key] = { vis: (saved.vis !== undefined ? saved.vis : c.vis), label: saved.label || c.label, order: saved.order || (i+1), align: sel.value };
                    });
                    // Initial sync
                    readDocSettings();
                }
                function buildBackupList() {
                    const el = document.getElementById('backupList');
                    [['auto_backup_2025-03-15.biz', '15 Mar 2025, 02:00 AM', '4.2 MB', '🔒'], ['auto_backup_2025-03-14.biz', '14 Mar 2025, 02:00 AM', '4.1 MB', '🔒'], ['manual_backup_2025-03-12.biz', '12 Mar 2025, 11:34 AM', '4.0 MB', '💾'], ['auto_backup_2025-03-13.biz', '13 Mar 2025, 02:00 AM', '4.1 MB', '🔒'], ['auto_backup_2025-03-11.biz', '11 Mar 2025, 02:00 AM', '3.9 MB', '🔒']].forEach(b => {
                        const d = document.createElement('div');
                        d.className = 'backup-item';
                        d.innerHTML = `<div class="backup-icon">${b[3]}</div><div><div class="backup-name">${b[0]}</div><div class="backup-meta">${b[1]}</div></div><div style="font-family:'DM Mono',monospace;font-size:11px;color:var(--text2);margin-left:auto">${b[2]}</div><div style="display:flex;gap:6px;margin-left:12px"><button class="btn ghost" style="height:28px;padding:0 10px;font-size:11px" onclick="showToast('Restoring…')">↑ Restore</button><button class="btn danger" style="height:28px;padding:0 10px;font-size:11px" onclick="showToast('Deleted')">×</button></div>`;
                        el.appendChild(d);
                    });
                }
                function buildReportGrid() {
                    const el = document.getElementById('rptGrid');
                    [['📈', 'Sales'], ['🛒', 'Purchase'], ['🧾', 'Tax'], ['👥', 'Customer'], ['📦', 'Product'], ['💰', 'P&L'], ['💧', 'Cash Flow'], ['⏱', 'Aging']].forEach((t, i) => {
                        const d = document.createElement('div');
                        d.className = 'grid-opt' + (i === 0 ? ' sel' : '');
                        d.innerHTML = `<span class="go-val">${t[0]}</span><span class="go-lbl">${t[1]}</span>`;
                        d.onclick = () => { el.querySelectorAll('.grid-opt').forEach(g => g.classList.remove('sel')); d.classList.add('sel'); };
                        el.appendChild(d);
                    });
                    const rng = document.getElementById('rptRange');
                    ['This Month', 'Last Month', 'This Quarter', 'This Year', 'Last Year', 'Custom Range'].forEach((lbl, i) => {
                        const d = document.createElement('div');
                        d.className = 'radio-option' + (i === 0 ? ' selected' : '');
                        d.innerHTML = `<input type="radio" name="rdate" ${i === 0 ? 'checked' : ''}><span class="radio-label">${lbl}</span>`;
                        d.onclick = () => { rng.querySelectorAll('.radio-option').forEach(r => r.classList.remove('selected')); d.classList.add('selected'); };
                        rng.appendChild(d);
                    });
                }
                let drawing = false, lx = 0, ly = 0;
                function startDraw(e) { drawing = true; const r = e.target.getBoundingClientRect(); lx = e.clientX - r.left; ly = e.clientY - r.top; }
                function draw(e) { if (!drawing) return; const c = document.getElementById('sigCanvas'); const ctx = c.getContext('2d'); const r = c.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(x, y); ctx.strokeStyle = '#e8c96a'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.stroke(); lx = x; ly = y; }
                function stopDraw() { drawing = false; }
                function clearSig() { const c = document.getElementById('sigCanvas'); c.getContext('2d').clearRect(0, 0, c.width, c.height); }
                function setSigTab(el, id) { document.querySelectorAll('.sig-tab').forEach(t => t.classList.remove('active')); el.classList.add('active');['sigDraw', 'sigType', 'sigUpload'].forEach(s => document.getElementById(s).style.display = 'none'); document.getElementById({ draw: 'sigDraw', type: 'sigType', upload: 'sigUpload' }[id]).style.display = 'block'; }
                let tt;
                function toast(msg, ok) {
                    const el = document.createElement('div'); el.className = 'toast' + (ok === true ? ' ok' : ''); el.innerHTML = `<span>${ok === true ? '✓' : 'ℹ'}</span> ${msg}`; document.body.appendChild(el); clearTimeout(_sett_toastT);
                    _sett_toastT = setTimeout(() => el.remove(), 3000);
                }
                function saveSettings() { showToast('All settings saved successfully', true); }
                buildCurrGrid(); buildDecGrid(); buildColTable(); buildBackupList(); buildReportGrid();
