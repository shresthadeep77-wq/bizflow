/* BizFlow — app.js */

/* ═══════════════════════════════════════
           UNIFIED ROUTER & SHARED UTILITIES
        ═══════════════════════════════════════ */

        const MODULES = ['dashboard', 'quotation', 'invoice', 'proforma', 'po', 'dn', 'receipt', 'customers', 'products', 'terms', 'reports', 'backup', 'settings', 'bizswitch'];
        let currentModule = 'dashboard';

        
        // ══════════════════════════════════════════════════
        //  STUB MODULE DATA & RENDERERS
        // ══════════════════════════════════════════════════

        const proformaData = [
            { id:1, num:'PRO-2024-0005', cust:'ABC Corporation', date:'2024-12-12', expiry:'2025-01-11', items:4, amount:12450.00, status:'Sent' },
            { id:2, num:'PRO-2024-0004', cust:'XYZ Industries Ltd', date:'2024-12-08', expiry:'2025-01-07', items:6, amount:28900.00, status:'Approved' },
            { id:3, num:'PRO-2024-0003', cust:'Global Traders LLC', date:'2024-12-02', expiry:'2025-01-01', items:3, amount:9800.00, status:'Pending' },
            { id:4, num:'PRO-2024-0002', cust:'Metro Supplies Co.', date:'2024-11-28', expiry:'2024-12-28', items:2, amount:3200.00, status:'Expired' },
            { id:5, num:'PRO-2024-0001', cust:'John Smith', date:'2024-11-20', expiry:'2024-12-20', items:1, amount:999.00, status:'Approved' },
        ];

        const poData = [
            { id:1, num:'PO-2024-0008', cust:'TechSupply Corp', date:'2024-12-10', due:'2024-12-25', items:5, amount:45600.00, status:'Approved' },
            { id:2, num:'PO-2024-0007', cust:'Global Parts Ltd', date:'2024-12-08', due:'2024-12-20', items:3, amount:12300.00, status:'Pending' },
            { id:3, num:'PO-2024-0006', cust:'Alpha Suppliers Inc', date:'2024-12-05', due:'2024-12-18', items:7, amount:8750.00, status:'Delivered' },
            { id:4, num:'PO-2024-0005', cust:'TechSupply Corp', date:'2024-11-30', due:'2024-12-15', items:2, amount:6200.00, status:'Approved' },
            { id:5, num:'PO-2024-0004', cust:'Metro Parts Co.', date:'2024-11-25', due:'2024-12-10', items:4, amount:15400.00, status:'Delivered' },
        ];

        const dnData = [
            { id:1, num:'DN-2024-0010', cust:'ABC Corporation', date:'2024-12-11', ref:'INV-2024-0018', items:4, amount:12450.00, status:'Delivered' },
            { id:2, num:'DN-2024-0009', cust:'XYZ Industries Ltd', date:'2024-12-09', ref:'INV-2024-0016', items:6, amount:28900.00, status:'In Transit' },
            { id:3, num:'DN-2024-0008', cust:'Metro Supplies Co.', date:'2024-12-06', ref:'INV-2024-0015', items:3, amount:5670.00, status:'Delivered' },
            { id:4, num:'DN-2024-0007', cust:'Global Traders LLC', date:'2024-12-02', ref:'INV-2024-0014', items:5, amount:9800.00, status:'Pending' },
            { id:5, num:'DN-2024-0006', cust:'John Smith', date:'2024-11-28', ref:'INV-2024-0013', items:2, amount:3200.00, status:'Delivered' },
        ];

        const receiptData = [
            { id:1, num:'REC-2024-0015', cust:'ABC Corporation', date:'2024-12-10', ref:'INV-2024-0018', method:'Bank Transfer', amount:12450.00, status:'Paid' },
            { id:2, num:'REC-2024-0014', cust:'XYZ Industries Ltd', date:'2024-12-07', ref:'INV-2024-0015', method:'Cheque', amount:28900.00, status:'Paid' },
            { id:3, num:'REC-2024-0013', cust:'Metro Supplies Co.', date:'2024-12-03', ref:'INV-2024-0014', method:'UPI', amount:5670.00, status:'Paid' },
            { id:4, num:'REC-2024-0012', cust:'Global Traders LLC', date:'2024-11-29', ref:'INV-2024-0013', method:'Card', amount:9800.00, status:'Paid' },
            { id:5, num:'REC-2024-0011', cust:'John Smith', date:'2024-11-24', ref:'INV-2024-0012', method:'Cash', amount:3200.00, status:'Paid' },
        ];

        const statusColors = {
            Paid:'#3ecf8e',Approved:'#3ecf8e',Delivered:'#3ecf8e',Sent:'#60a5fa',
            Pending:'#f59e0b',Draft:'#f59e0b','In Transit':'#60a5fa',
            Rejected:'#f87171',Expired:'#f87171',Overdue:'#f87171'
        };

        
        // ── Stub module bulk actions ──
        function updateStubBulkBar(docType) {
            const bar = document.getElementById(docType + '-bulk-bar');
            const cnt = document.getElementById(docType + '-bulk-count');
            const n = document.querySelectorAll('#' + docType + '-tBody input[type=checkbox]:checked').length;
            if (bar) bar.style.display = n > 0 ? 'flex' : 'none';
            if (cnt) cnt.textContent = n + ' selected';
        }
        function selectAllStub(cb, tbodyId, docType) {
            document.querySelectorAll('#' + tbodyId + ' input[type=checkbox]').forEach(c => c.checked = cb.checked);
            updateStubBulkBar(docType);
        }
        function clearStubSel(docType) {
            document.querySelectorAll('#' + docType + '-tBody input[type=checkbox]').forEach(cb => cb.checked = false);
            document.querySelectorAll('#view-' + docType + ' thead input[type=checkbox]').forEach(cb => cb.checked = false);
            updateStubBulkBar(docType);
        }
        function getStubSel(docType) {
            const dataMap = { proforma: proformaData, po: poData, dn: dnData, receipt: receiptData };
            const data = dataMap[docType] || [];
            return Array.from(document.querySelectorAll('#' + docType + '-tBody input[type=checkbox]:checked'))
                .map(cb => data.find(d => d.id == cb.closest('tr').dataset.id)).filter(Boolean);
        }
        function bulkPreviewStub(docType) {
            getStubSel(docType).forEach((doc,i) => setTimeout(() => previewDoc(docType, doc), i*100));
            clearStubSel(docType);
        }
        function bulkDeleteStub(docType) {
            const sel = getStubSel(docType);
            if (!confirm('Delete ' + sel.length + ' document' + (sel.length>1?'s':'') + '?')) return;
            const dataMap = { proforma: proformaData, po: poData, dn: dnData, receipt: receiptData };
            const data = dataMap[docType];
            sel.forEach(d => { const i = data.findIndex(x=>x.id===d.id); if(i>=0) data.splice(i,1); });
            clearStubSel(docType);
            const fnMap = { proforma:()=>renderStubTable(proformaData,'proforma-tBody','proforma','expiry','Expiry'), po:()=>renderStubTable(poData,'po-tBody','po','due','Due'), dn:()=>renderStubTable(dnData,'dn-tBody','dn','ref','Ref'), receipt:()=>renderStubTable(receiptData,'receipt-tBody','receipt',null,null) };
            if (fnMap[docType]) fnMap[docType]();
            showToast(sel.length + ' deleted');
        }
        function bulkExportStub(docType) {
            const sel = getStubSel(docType); clearStubSel(docType);
            const csv = 'Number,Customer,Date,Amount,Status\n' + sel.map(d => [d.num,d.cust,d.date,d.amount,d.status].join(',')).join('');
            const a = document.createElement('a'); a.href = 'data:text/csv,' + encodeURIComponent(csv); a.download = docType + '_export.csv'; a.click();
            showToast('Exported ' + sel.length + ' documents', true);
        }

        function renderStubTable(data, tbodyId, docType, dateKey, dateLabel) {
            const tbody = document.getElementById(tbodyId);
            if (!tbody) return;
            const countEl = document.getElementById(tbodyId.replace('-tBody','-count'));
            if (countEl) countEl.textContent = data.length + ' documents';
            tbody.innerHTML = '';
            data.forEach((doc, i) => {
                const pillColor = statusColors[doc.status] || '#888';
                const tr = document.createElement('tr');
                tr.style.cssText = 'border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s';
                tr.onmouseover = () => tr.style.background = 'var(--bg3)';
                tr.onmouseout  = () => tr.style.background = '';
                tr.dataset.id = doc.id;
                tr.innerHTML = `
                    <td style="padding:12px 16px;width:36px"><input type="checkbox" style="accent-color:var(--gold);cursor:pointer" onclick="event.stopPropagation()" onchange="updateStubBulkBar('${docType}')"></td>
                    <td style="padding:12px 16px;font-family:'DM Mono',monospace;font-size:12px;color:var(--gold)">
                        ${doc.num}
                    </td>
                    <td style="padding:12px">
                        <div style="font-size:13px;font-weight:500">${doc.cust}</div>
                        ${doc.ref ? `<div style="font-size:10px;color:var(--text3)">${doc.ref}</div>` : ''}
                    </td>
                    <td style="padding:12px;font-size:12px;color:var(--text2)">
                        ${fmtDate(doc.date)}
                        ${doc[dateKey] ? `<div style="font-size:10px;color:var(--text3)">${dateLabel}: ${fmtDate(doc[dateKey])}</div>` : ''}
                    </td>
                    <td style="padding:12px;text-align:right;font-family:'DM Mono',monospace;font-size:13px;font-weight:500">
                        ${fmtMoney(doc.amount)}
                    </td>
                    <td style="padding:12px">
                        <span style="display:inline-block;padding:3px 10px;border-radius:12px;font-size:10px;font-weight:700;background:${pillColor}22;color:${pillColor};letter-spacing:.5px">${doc.status}</span>
                    </td>
                    <td style="padding:12px;text-align:center">
                        <div style="display:flex;gap:6px;justify-content:center">
                            <div class="ib" title="Preview" onclick="previewDoc('${docType}',${docType}Data.find(x=>x.id===${doc.id}))">👁</div>
                            <div class="ib" title="Download" onclick="previewDoc('${docType}',${docType}Data.find(x=>x.id===${doc.id}));setTimeout(()=>downloadDocPDF(),100)">↓</div>
                            <div class="ib" title="Print" onclick="previewDoc('${docType}',${docType}Data.find(x=>x.id===${doc.id}));setTimeout(()=>printDoc(),800)">🖨</div>
                            <div class="ib del" title="Delete" onclick="showToast('Delete ${docType}?')">🗑</div>
                        </div>
                    </td>`;
                tbody.appendChild(tr);
            });
        }

        function filterProforma(q) { renderStubTable(proformaData.filter(d => d.num.toLowerCase().includes(q.toLowerCase()) || d.cust.toLowerCase().includes(q.toLowerCase())), 'proforma-tBody','proforma','expiry','Expiry'); }
        function filterPo(q)       { renderStubTable(poData.filter(d => d.num.toLowerCase().includes(q.toLowerCase()) || d.cust.toLowerCase().includes(q.toLowerCase())), 'po-tBody','po','due','Due'); }
        function filterDn(q)       { renderStubTable(dnData.filter(d => d.num.toLowerCase().includes(q.toLowerCase()) || d.cust.toLowerCase().includes(q.toLowerCase())), 'dn-tBody','dn','ref','Ref'); }
        function filterReceipt(q)  { renderStubTable(receiptData.filter(d => d.num.toLowerCase().includes(q.toLowerCase()) || d.cust.toLowerCase().includes(q.toLowerCase())), 'receipt-tBody','receipt',null,null); }

        function navTo(id) {
            // normalize singular→plural
            if (id === "customer") id = "customers";
            if (id === "product") id = "products";
            console.log("navTo called with ID:", id);
            // hide all
            MODULES.forEach(m => {
                const v = document.getElementById('view-' + m);
                if (v) v.classList.remove('active');
                const n = document.getElementById('nav-' + m);
                if (n) n.classList.remove('active');
            });
            const view = document.getElementById('view-' + id);
            const nav = document.getElementById('nav-' + id);
            if (view) view.classList.add('active');
            if (nav) nav.classList.add('active');
            currentModule = id;

            // Module-specific init
            if (id === 'dashboard') initDashboard();
            if (id === 'quotation') { if (typeof renderTable_quot === 'function' && typeof quotations !== 'undefined') renderTable_quot(quotations); showList_quot(); }
            if (id === 'invoice') { if (typeof renderTable_inv === 'function' && typeof invoices !== 'undefined') renderTable_inv(invoices); showList_inv(); }
            if (id === 'customer' || id === 'customers') { if (typeof showList === 'function') showList(); }
            if (id === 'product' || id === 'products') { if (typeof showList_prod === 'function') showList_prod(); else { renderGroups_prod(); filterProducts_prod(); } populateCatFilter(); }
            if (id === 'bizswitch') renderBizSwitch();
            if (id === 'proforma') renderStubTable(proformaData, 'proforma-tBody','proforma','expiry','Expiry');
            if (id === 'po')       renderStubTable(poData, 'po-tBody','po','due','Due');
            if (id === 'dn')       renderStubTable(dnData, 'dn-tBody','dn','ref','Ref');
            if (id === 'receipt')  renderStubTable(receiptData, 'receipt-tBody','receipt',null,null);
        }

        // ── Toast ──
        let _toastTimer;
        function showToast(msg, ok) {
            document.querySelectorAll('.toast').forEach(t => t.remove());
            const el = document.createElement('div');
            el.className = 'toast' + (ok === true ? ' ok' : ok === 'err' ? ' err' : '');
            el.innerHTML = `<span>${ok === true ? '✓' : 'ℹ'}</span> ${msg}`;
            el.style.cssText = 'position:fixed;bottom:26px;right:26px;background:var(--bg3);border:1px solid var(--border2);border-radius:10px;padding:12px 18px;font-size:13px;display:flex;align-items:center;gap:10px;box-shadow:0 8px 32px rgba(0,0,0,.5);z-index:9000;animation:toastIn .3s ease;pointer-events:none;';
            if (ok === true) el.style.borderColor = 'rgba(62,207,142,.35)';
            if (ok === 'err') el.style.borderColor = 'rgba(248,113,113,.35)';
            document.body.appendChild(el);
            clearTimeout(_toastTimer);
            _toastTimer = setTimeout(() => el.remove(), 3000);
        }

        // formatting
        function formatDate(d) {
            if (!d) return '';
            const date = new Date(d);
            if (isNaN(date)) return d;
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }

        // make toast available under all aliases used in modules
        function toast(msg, ok) { showToast(msg, ok); }

        // ── Dashboard init ──
        function initDashboard() {
            const _router_d = new Date();
            const el = document.getElementById('topbar-date');
            if (el) el.textContent = _router_d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
            if (typeof drawChart === 'function') drawChart();
            if (typeof drawDonut === 'function') drawDonut();
            else drawDonutFallback();
        }

        function drawDonutFallback() {
            const canvas = document.getElementById('donutChart');
            if (!canvas) return;
            const dctx = canvas.getContext('2d');
            const slices = [{ val: 89, color: '#3ecf8e' }, { val: 28, color: '#c9a84c' }, { val: 32, color: '#60a5fa' }, { val: 7, color: '#f87171' }];
            const total = slices.reduce((a, s) => a + s.val, 0);
            const cx = 80, cy = 80, outerR = 68, innerR = 46;
            let sa = -Math.PI / 2;
            slices.forEach(s => {
                const sw = (s.val / total) * Math.PI * 2;
                dctx.beginPath(); dctx.moveTo(cx, cy); dctx.arc(cx, cy, outerR, sa, sa + sw); dctx.closePath();
                dctx.fillStyle = s.color; dctx.fill(); sa += sw;
            });
            dctx.beginPath(); dctx.arc(cx, cy, innerR, 0, Math.PI * 2); dctx.fillStyle = '#141415'; dctx.fill();
        }

        // ── Business switch ──
        const businesses = [
            { id: 1, init: 'MB', name: 'Main Business Ltd.', meta: '245 docs · 89 customers', active: true, grad: 'linear-gradient(135deg,#c9a84c,#8b5e1a)' },
            { id: 2, init: 'SB', name: 'Second Business Co.', meta: '67 docs · 23 customers', active: false, grad: 'linear-gradient(135deg,#60a5fa,#2563eb)' },
            { id: 3, init: 'TB', name: 'Test Business', meta: '12 docs · 5 customers', active: false, grad: 'linear-gradient(135deg,#a78bfa,#7c3aed)' },
        ];

        function renderBizSwitch() {
            const el = document.getElementById('biz-switch-list');
            if (!el) return;
            el.innerHTML = '';
            businesses.forEach(b => {
                const div = document.createElement('div');
                const bg = b.active ? 'rgba(201,168,76,.06)' : 'var(--bg3)';
                const border = b.active ? 'rgba(201,168,76,.35)' : 'var(--border)';
                div.style.cssText = 'display:flex;align-items:center;gap:14px;padding:16px;background:' + bg + ';border:1px solid ' + border + ';border-radius:12px;cursor:pointer;transition:all .2s;margin-bottom:10px;';
                const badge = b.active
                    ? '<span style="font-size:9px;font-family:var(--mono,monospace);padding:2px 8px;border-radius:4px;background:rgba(201,168,76,.15);color:var(--gold)">ACTIVE</span>'
                    : '<button style="font-size:11px;background:var(--bg4);border:1px solid var(--border);border-radius:6px;padding:4px 12px;color:var(--text2);cursor:pointer" onclick="switchBiz(' + b.id + ')">Switch \u2192</button>';
                div.innerHTML = '<div style="width:44px;height:44px;border-radius:12px;background:' + b.grad + ';display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#0e0e0f;flex-shrink:0">' + b.init + '</div>'
                    + '<div style="flex:1"><div style="font-size:14px;font-weight:600;margin-bottom:2px">' + b.name + '</div><div style="font-size:10px;color:var(--text3)">' + b.meta + '</div></div>'
                    + badge;
                el.appendChild(div);
            });
        }
        function switchBiz(id) {
            const b = businesses.find(x => x.id === id);
            if (!b) return;
            businesses.forEach(x => x.active = (x.id === id));
            document.getElementById('activeBizName').textContent = b.name;
            document.getElementById('activeBizMeta').textContent = b.meta;
            renderBizSwitch();
            showToast(`Switched to ${b.name}`, true);
            setTimeout(() => navTo('dashboard'), 800);
        }

        // ── Quotation module wiring ──
        function showList_quot() {
            const lv = document.getElementById('quot-listView');
            const fv = document.getElementById('quot-formView');
            const lb = document.getElementById('quot-list-btns');
            const fb = document.getElementById('quot-form-btns');
            if (lv) lv.style.display = 'flex';
            if (fv) { fv.style.display = 'none'; }
            if (lb) lb.style.display = 'flex';
            if (fb) fb.style.display = 'none';
            document.getElementById('quot-crumb').textContent = 'Quotations';
            if (typeof renderTable_quot === 'function' && typeof quotations !== 'undefined') renderTable_quot(quotations);
        }

        function showCreate_quot() {
            const lv = document.getElementById('quot-listView');
            const fv = document.getElementById('quot-formView');
            const lb = document.getElementById('quot-list-btns');
            const fb = document.getElementById('quot-form-btns');
            if (lv) lv.style.display = 'none';
            if (fv) { fv.style.display = 'flex'; }
            if (lb) lb.style.display = 'none';
            if (fb) fb.style.display = 'flex';
            document.getElementById('quot-crumb').textContent = 'New Quotation';
            if (typeof showCreate_q === 'function') showCreate_q();
        }

        // doSave_quot is defined in the quotations module block below

        // ── Invoice module wiring ──
        function showList_inv() { if (typeof showList_invoice === 'function') showList_invoice(); }

        function showCreate_inv() {
            const lv = document.getElementById('inv-listView');
            const fv = document.getElementById('inv-formView');
            const lb = document.getElementById('inv-list-btns');
            const fb = document.getElementById('inv-form-btns');
            if (lv) lv.style.display = 'none';
            if (fv) fv.style.display = 'flex';
            if (lb) lb.style.display = 'none';
            if (fb) fb.style.display = 'flex';
            document.getElementById('inv-crumb').textContent = 'New Invoice';
            if (typeof showCreate_invoice === 'function') showCreate_invoice();
        }

        function doSave_inv(t) { showToast(t === 'draft' ? 'Draft saved' : 'Invoice saved!', true); }
        function showRecordPayment_inv(id) { showRecordPayment(id); }

        // Customer wiring
        function openForm_cust(id) { if (id && typeof editFromDetail === 'function') editFromDetail(); else if (typeof openFormCust === 'function') openFormCust(id); }
        // Product wiring
        // openForm_prod is defined in products module block 7

        // Settings wiring
        function saveSettings_s() { if (typeof saveSettings === 'function') saveSettings(); else showToast('Settings saved!', true); }


        // ══════════════════════════════════════════════════
        //  DOCUMENT PREVIEW ENGINE
        // ══════════════════════════════════════════════════

        const COMPANY = {
            name: 'Main Business Ltd.',
            addr: '100 Commerce Street, New York, NY 10001',
            phone: '+1 212 555 0100',
            email: 'hello@mainbusiness.com',
            tax: 'GST: 22AAAAA0000A1Z5',
            bank: 'Chase Bank · A/C: 1234567890 · IFSC: CHAS0001234',
        };

        // Shared line item generator (realistic demo data based on doc)
        function makeItems(doc, type) {
            const pools = {
                Electronics: [
                    { name: 'MacBook Pro 14" M3', desc: 'Space Grey, 16GB RAM, 512GB SSD', qty: 2, price: 1999.00, tax: 10 },
                    { name: 'iPhone 15 Pro', desc: '256GB, Titanium Natural', qty: 5, price: 999.00, tax: 10 },
                    { name: 'AirPods Pro (2nd Gen)', desc: 'With MagSafe Charging Case', qty: 10, price: 249.00, tax: 10 },
                    { name: 'iPad Pro 12.9"', desc: 'Wi-Fi + Cellular, 256GB', qty: 3, price: 1099.00, tax: 10 },
                ],
                General: [
                    { name: 'Premium Consulting Services', desc: 'Strategy & Implementation, 40hrs', qty: 1, price: 4500.00, tax: 18 },
                    { name: 'Annual Software Licence', desc: 'Enterprise plan, 50 seats', qty: 1, price: 2400.00, tax: 18 },
                    { name: 'Custom Development', desc: 'Module integration & testing', qty: 20, price: 150.00, tax: 18 },
                    { name: 'Training & Onboarding', desc: 'On-site, 2-day workshop', qty: 1, price: 1800.00, tax: 0 },
                ],
            };
            const pool = doc.amount > 5000 ? pools.Electronics : pools.General;
            const count = doc.items || 3;
            const items = pool.slice(0, count);
            // Adjust prices to roughly match doc.amount
            const rawTotal = items.reduce((s, i) => s + i.qty * i.price, 0);
            const factor = rawTotal > 0 ? doc.amount / rawTotal * 0.9 : 1;
            return items.map((it, idx) => ({
                ...it,
                price: parseFloat((it.price * factor).toFixed(2)),
                disc: idx === 0 ? 5 : 0,
            }));
        }

        function calcTotals(items) {
            let subtotal = 0, discTotal = 0, taxTotal = 0;
            items.forEach(it => {
                const gross = it.qty * it.price;
                const disc  = gross * (it.disc || 0) / 100;
                const base  = gross - disc;
                const tax   = base * (it.tax || 0) / 100;
                subtotal += gross; discTotal += disc; taxTotal += tax;
            });
            const afterDisc = subtotal - discTotal;
            const grand = afterDisc + taxTotal;
            return { subtotal, discTotal, taxTotal, afterDisc, grand };
        }

        function statusBadge(st) {
            const cls = { Paid:'paid', Unpaid:'unpaid', 'Partially Paid':'partial', Overdue:'overdue',
                          Approved:'approved', Pending:'pending', Rejected:'rejected', 'Re-edited':'pending',
                          Delivered:'approved', Draft:'pending' }[st] || 'pending';
            return `<span class="prev-status-badge ${cls}">${st}</span>`;
        }

        function fmtDate(d) {
            if (!d) return '—';
            const dt = new Date(d); if (isNaN(dt)) return d;
            return dt.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
        }

        function fmtMoney(n) { return '$' + parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 }); }

        function buildItemsTable(items, docType) {
            // Determine visible columns in order from docSettings (per doc type)
            const s = (docType && docSettings.perDoc[docType]) ? docSettings.perDoc[docType] : docSettings.columns;
            const visCols = Object.entries(s)
                .filter(([k,c]) => c.vis)
                .sort((a,b) => a[1].order - b[1].order);

            const alignStyle = (a) => a === 'Right' ? 'text-align:right' : a === 'Center' ? 'text-align:center' : 'text-align:left';

            const headerCells = visCols.map(([k,c]) =>
                `<th class="num" style="${alignStyle(c.align)}">${c.label}</th>`
            ).join('');

            const rows = items.map((it, i) => {
                const gross = it.qty * it.price;
                const disc  = gross * (it.disc || 0) / 100;
                const net   = gross - disc;
                const tax   = net * (it.tax || 0) / 100;
                const totalInc = net + tax;
                const totalEx  = net;
                const taxAmt   = tax;
                const discAmt  = disc;
                const margin   = it.cost > 0 ? Math.round((it.price - it.cost) / it.price * 100) : null;

                const cellMap = {
                    code:      `<td style="${alignStyle('Left')};font-family:monospace;font-size:11px;color:#888">${it.sku || it.code || '—'}</td>`,
                    name:      `<td style="${alignStyle('Left')}"><div style="font-weight:600;color:#1a1a1a">${it.name}</div>${s.desc && s.desc.vis ? '' : `<div class="item-desc">${it.desc||''}</div>`}</td>`,
                    desc:      `<td style="${alignStyle('Left')};font-size:11px;color:#666">${it.desc||'—'}</td>`,
                    qty:       `<td class="num" style="${alignStyle('Right')}">${it.qty}</td>`,
                    unit:      `<td class="num" style="${alignStyle('Center')}">${it.unit||'Pcs'}</td>`,
                    price:     `<td class="num" style="${alignStyle('Right')}">${fmtMoney(it.price)}</td>`,
                    discpct:   `<td class="num" style="${alignStyle('Right')};color:#888">${it.disc||0}%</td>`,
                    discamt:   `<td class="num" style="${alignStyle('Right')};color:#888">${fmtMoney(discAmt)}</td>`,
                    discprice: `<td class="num" style="${alignStyle('Right')}">${fmtMoney(net)}</td>`,
                    taxrate:   `<td class="num" style="${alignStyle('Right')};color:#888">${it.tax||0}%</td>`,
                    taxamt:    `<td class="num" style="${alignStyle('Right')};color:#888">${fmtMoney(taxAmt)}</td>`,
                    totalex:   `<td class="num" style="${alignStyle('Right')}">${fmtMoney(totalEx)}</td>`,
                    totalinc:  `<td class="num" style="${alignStyle('Right')};font-weight:600">${fmtMoney(totalInc)}</td>`,
                    margin:    `<td class="num" style="${alignStyle('Right')};color:#888">${margin !== null ? margin + '%' : '—'}</td>`,
                    rack:      `<td style="${alignStyle('Left')};font-size:11px;color:#888">${it.rack||'—'}</td>`,
                    notes:     `<td style="${alignStyle('Left')};font-size:11px;color:#888">${it.note||'—'}</td>`,
                };

                const cells = visCols.map(([k]) => cellMap[k] || '<td>—</td>').join('');
                return `<tr><td style="width:28px;color:#aaa;font-size:11px">${i+1}</td>${cells}</tr>`;
            }).join('');

            return `<table class="prev-table">
                <thead><tr><th>#</th>${headerCells}</tr></thead>
                <tbody>${rows}</tbody>
            </table>`;
        }

        function buildTotalsBox(totals, extra) {
            const rows = [
                ['Subtotal', fmtMoney(totals.subtotal)],
                totals.discTotal > 0 ? ['Discount', '− ' + fmtMoney(totals.discTotal)] : null,
                ['Tax', '+ ' + fmtMoney(totals.taxTotal)],
                ...(extra || []),
            ].filter(Boolean);
            const rowHtml = rows.map(([l,v]) =>
                `<div class="prev-total-row"><span>${l}</span><span class="mono">${v}</span></div>`
            ).join('');
            return `<div class="prev-totals"><div class="prev-totals-box">
                ${rowHtml}
                <div class="prev-total-row grand"><span>Grand Total</span><span class="mono">${fmtMoney(totals.grand)}</span></div>
            </div></div>`;
        }

        function buildHeader(type, num, dates) {
            const h = docSettings.header;
            const l = docSettings.labels;
            // Resolve custom document title
            const docTitle = type === 'Quotation' ? l.quotTitle
                           : type === 'Invoice'   ? l.invTitle
                           : type.toUpperCase();
            const dateRows = Object.entries(dates)
                .map(([lbl,v]) => `<div>${lbl}: <strong>${v}</strong></div>`).join('');
            const companyBlock = `
                ${h.showLogo    ? `<div class="prev-logo-mark"></div>` : ''}
                ${h.showBizName ? `<div class="prev-company-name">${COMPANY.name}</div>` : ''}
                ${h.showBizAddr ? `<div class="prev-company-sub">${COMPANY.addr}</div>` : ''}
                ${h.showContact ? `<div class="prev-company-sub">${COMPANY.phone} · ${COMPANY.email}</div>` : ''}
                ${h.showTax     ? `<div class="prev-company-sub" style="margin-top:4px;color:#c9a84c">${COMPANY.tax}</div>` : ''}
            `;
            return `<div class="prev-header">
                <div class="prev-company">${companyBlock}</div>
                <div class="prev-doc-info">
                    <div class="prev-doc-type">${docTitle}</div>
                    <div class="prev-doc-num">${num}</div>
                    <div class="prev-doc-dates" style="margin-top:12px">${dateRows}</div>
                </div>
            </div>`;
        }

        function buildParties(custName, billAddr, shipAddr, type) {
            const isSupplier = type === 'Purchase Order';
            const billToLabel = docSettings.labels.billTo;
            return `<div class="prev-parties">
                <div>
                    <div class="prev-party-label">${isSupplier ? 'SUPPLIER' : billToLabel}</div>
                    <div class="prev-party-name">${custName}</div>
                    <div class="prev-party-addr">${billAddr || '—'}</div>
                </div>
                ${shipAddr && !isSupplier ? `<div>
                    <div class="prev-party-label">SHIP TO</div>
                    <div class="prev-party-name">${custName}</div>
                    <div class="prev-party-addr">${shipAddr}</div>
                </div>` : `<div>
                    <div class="prev-party-label">FROM</div>
                    <div class="prev-party-name">${COMPANY.name}</div>
                    <div class="prev-party-addr">${COMPANY.addr}</div>
                </div>`}
            </div>`;
        }

        function buildFooter(notes, showSigParam) {
            const f = docSettings.footer;
            const showSig = showSigParam && f.showSig;
            return `
            ${notes && f.showTerms ? `<div class="prev-notes"><div class="prev-notes-label">Notes & Terms</div>${notes}</div>` : ''}
            <div class="prev-footer">
                <div>
                    ${f.showBank    ? `<div class="prev-company-sub">${COMPANY.bank}</div>` : ''}
                    ${f.showThankYou? `<div class="prev-company-sub" style="margin-top:4px">Thank you for your business!</div>` : ''}
                    ${f.showWatermark ? `<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:64px;opacity:.05;font-weight:900;color:#000;pointer-events:none;z-index:0">DRAFT</div>` : ''}
                </div>
                ${showSig ? `<div style="text-align:right">
                    <div class="prev-sig-line"></div>
                    <div style="font-size:11px;color:#aaa">Authorised Signature</div>
                </div>` : ''}
            </div>
            ${f.showPageNum ? `<div style="text-align:center;font-size:10px;color:#aaa;margin-top:8px">Page 1 of 1</div>` : ''}`;
        }

        // ── Individual document builders ──

        function buildQuotationPreview(doc) {
            const cust = quotCustomers ? quotCustomers.find(c => c.name === doc.cust) : null;
            const addr = cust ? cust.addr : '—';
            // Use form items if available, otherwise generate mock sample
            const items = (doc.items && doc.items.length > 0) ? doc.items : makeItems(doc, 'quotation');
            const totals = calcTotals(items);
            return buildHeader('Quotation', doc.num, { Date: fmtDate(doc.date), 'Valid Until': fmtDate(doc.expiry), Status: doc.status })
                + `<div style="display:flex;justify-content:flex-end;margin-bottom:16px">${statusBadge(doc.status)}</div>`
                + buildParties(doc.cust, addr, addr, 'Quotation')
                + buildItemsTable(items, 'quotation')
                + buildTotalsBox(totals)
                + buildFooter('Prices valid until ' + fmtDate(doc.expiry) + '. Payment terms: Net 30. All prices in USD.', true);
        }

        function buildInvoicePreview(doc) {
            const paid = doc.paid || 0;
            const balance = doc.amount - paid;
            // Use form items if available, otherwise generate mock sample
            const items = (doc.items && doc.items.length > 0) ? doc.items : makeItems(doc, 'invoice');
            const totals = calcTotals(items);
            const paymentSection = paid > 0 ? `<div class="prev-payment-box">
                <div class="prev-payment-label">Payment History</div>
                <div class="prev-payment-row"><span>Payment received ${fmtDate(doc.date)}</span><span>${fmtMoney(paid)}</span></div>
            </div>` : '';
            const balanceSection = balance > 0 ? `<div class="prev-balance-due">
                <div class="prev-balance-label">Balance Due</div>
                <div class="prev-balance-amount">${fmtMoney(balance)}</div>
            </div>` : '';
            return buildHeader('Invoice', doc.num, { 'Invoice Date': fmtDate(doc.date), 'Due Date': fmtDate(doc.due), Status: doc.status })
                + `<div style="display:flex;justify-content:flex-end;margin-bottom:16px">${statusBadge(doc.status)}</div>`
                + buildParties(doc.cust, null, null, 'Invoice')
                + buildItemsTable(items, 'invoice')
                + buildTotalsBox(totals)
                + paymentSection + balanceSection
                + buildFooter('Payment due by ' + fmtDate(doc.due) + '. Late payments subject to 2% monthly interest.', false);
        }

        function buildProformaPreview(doc) {
            // Use form items if available, otherwise generate mock sample
            const items = (doc.items && doc.items.length > 0) ? doc.items : makeItems(doc, 'proforma');
            const totals = calcTotals(items);
            return buildHeader('Proforma Invoice', doc.num || 'PRO-2024-0001', { Date: fmtDate(doc.date || new Date().toISOString().slice(0,10)), 'Valid Until': fmtDate(doc.expiry || '2025-02-01'), Reference: doc.ref || '—' })
                + buildParties(doc.cust || 'Sample Customer', '456 Industrial Ave, Chicago, IL 60601', null, 'Proforma')
                + `<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:10px 14px;margin-bottom:20px;font-size:11px;color:#92400e">⚠ This is a Proforma Invoice and is not a demand for payment. It is for estimation purposes only.</div>`
                + buildItemsTable(items, 'proforma')
                + buildTotalsBox(totals)
                + buildFooter('This proforma is valid for 30 days from the date of issue.', true);
        }

        function buildPOPreview(doc) {
            // Use form items if available, otherwise generate mock sample
            const items = (doc.items && doc.items.length > 0) ? doc.items : makeItems(doc, 'po');
            const totals = calcTotals(items);
            return buildHeader('Purchase Order', doc.num || 'PO-2024-0001', { 'PO Date': fmtDate(doc.date || new Date().toISOString().slice(0,10)), 'Expected Delivery': fmtDate(doc.due || '2025-02-15'), 'Payment Terms': 'Net 45' })
                + buildParties(doc.cust || 'ABC Suppliers Ltd', '789 Supply Road, Dallas, TX 75201', null, 'Purchase Order')
                + `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:10px 14px;margin-bottom:20px;font-size:11px;color:#14532d">Please reference the PO number on all invoices, packing slips, and correspondence.</div>`
                + buildItemsTable(items, 'po')
                + buildTotalsBox(totals)
                + buildFooter('Delivery must comply with specified dates. Partial shipments require prior approval.', true);
        }

        function buildDNPreview(doc) {
            // Use form items if available, otherwise generate mock sample
            const baseItems = (doc.items && doc.items.length > 0) ? doc.items : makeItems(doc, 'dn');
            const items = baseItems.map(it => ({ ...it, price: undefined }));
            const rows = items.map((it, i) => `<tr>
                <td style="width:28px;color:#aaa;font-size:11px">${i+1}</td>
                <td><div style="font-weight:600;color:#1a1a1a">${it.name}</div><div class="item-desc">${it.desc||''}</div></td>
                <td class="num">${it.qty}</td>
                <td class="num">—</td>
                <td class="num" style="color:#888">Good condition</td>
            </tr>`).join('');
            return buildHeader('Delivery Note', doc.num || 'DN-2024-0001', { Date: fmtDate(doc.date || new Date().toISOString().slice(0,10)), 'Reference Invoice': doc.ref || 'INV-2024-0018', Driver: 'John Doe' })
                + buildParties(doc.cust || 'ABC Corporation', '123 Business Ave, New York, NY 10001', '123 Business Ave, New York, NY 10001', 'DN')
                + `<table class="prev-table"><thead><tr><th>#</th><th>Item Description</th><th class="num">Qty</th><th class="num">Batch/Serial</th><th class="num">Condition</th></tr></thead><tbody>${rows}</tbody></table>`
                + `<div class="prev-parties" style="margin-top:28px;margin-bottom:0">
                    <div><div class="prev-sig-line"></div><div style="font-size:11px;color:#aaa">Delivered By</div></div>
                    <div><div class="prev-sig-line"></div><div style="font-size:11px;color:#aaa">Received By (Customer Signature)</div></div>
                </div>`
                + buildFooter('Goods once delivered are non-returnable without prior written approval.', false);
        }

        function buildReceiptPreview(doc) {
            // Use form items if available, otherwise generate mock sample
            const items = (doc.items && doc.items.length > 0) ? doc.items : makeItems(doc, 'receipt');
            const totals = calcTotals(items);
            return buildHeader('Receipt', doc.num || 'REC-2024-0001', { Date: fmtDate(doc.date || new Date().toISOString().slice(0,10)), 'Payment Method': doc.method || 'Bank Transfer', Reference: doc.ref || 'TXN-' + Math.random().toString(36).slice(2,8).toUpperCase() })
                + buildParties(doc.cust || 'ABC Corporation', null, null, 'Receipt')
                + `<div class="prev-payment-box" style="margin-bottom:20px">
                    <div class="prev-payment-label">Payment Confirmed</div>
                    <div class="prev-payment-row"><span>Amount Received</span><span>${fmtMoney(doc.amount || totals.grand)}</span></div>
                    <div class="prev-payment-row"><span>Payment Method</span><span>${doc.method || 'Bank Transfer'}</span></div>
                    <div class="prev-payment-row"><span>Transaction Date</span><span>${fmtDate(doc.date)}</span></div>
                </div>`
                + buildItemsTable(items, 'dn')
                + buildTotalsBox(totals)
                + `<div style="text-align:center;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:18px;margin-bottom:24px">
                    <div style="font-size:28px;margin-bottom:6px">✓</div>
                    <div style="font-weight:700;color:#14532d;font-size:14px">Payment Received — Thank You!</div>
                    <div style="color:#15803d;font-size:12px;margin-top:4px">This receipt is your proof of payment.</div>
                </div>`
                + buildFooter(null, false);
        }

        // ── Entry point ──

        function previewDoc(type, doc) {
            let html = '';
            let label = '';
            if (type === 'quotation')  { html = buildQuotationPreview(doc); label = 'Quotation Preview'; }
            else if (type === 'invoice')  { html = buildInvoicePreview(doc); label = 'Invoice Preview'; }
            else if (type === 'proforma') { html = buildProformaPreview(doc); label = 'Proforma Invoice Preview'; }
            else if (type === 'po')       { html = buildPOPreview(doc); label = 'Purchase Order Preview'; }
            else if (type === 'dn')       { html = buildDNPreview(doc); label = 'Delivery Note Preview'; }
            else if (type === 'receipt')  { html = buildReceiptPreview(doc); label = 'Receipt Preview'; }
            const page = document.getElementById('preview-page');
            const overlay = document.getElementById('doc-preview-overlay');
            if (!page || !overlay) { showToast('Preview not available', 'err'); return; }
            // Wrap with metadata attributes for PDF generation
            page.innerHTML = `<div data-doc-type="${type}" data-doc-num="${doc.num || 'Document'}" data-customer="${doc.cust || 'Customer'}">${html}</div>`;
            document.getElementById('preview-doc-label').textContent = label;
            overlay.style.display = 'flex';
            overlay.scrollTop = 0;
        }

        function closeDocPreview() {
            const ov = document.getElementById('doc-preview-overlay');
            if (ov) ov.style.display = 'none';
        }

        // ── Print / PDF via isolated portal ──
        
        function getThemeColors() {
            const root = document.documentElement;
            const style = getComputedStyle(root);
            return {
                bg: style.getPropertyValue('--bg').trim() || '#fefdfb',
                bg2: style.getPropertyValue('--bg2').trim() || '#f9f7f3',
                bg3: style.getPropertyValue('--bg3').trim() || '#ede8e3',
                bg4: style.getPropertyValue('--bg4').trim() || '#f0ede8',
                text: style.getPropertyValue('--text').trim() || '#1a1a1a',
                text2: style.getPropertyValue('--text2').trim() || '#4a4a4a',
                text3: style.getPropertyValue('--text3').trim() || '#787878',
                gold: style.getPropertyValue('--gold').trim() || '#d4a574',
                border: style.getPropertyValue('--border').trim() || '#e0dcd6',
            };
        }
        
        function generatePDFFilename(docType, doc) {
            const timestamp = new Date().toISOString().split('T')[0];
            const customerName = (doc.cust || 'Customer').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
            const businessName = (COMPANY.name || 'BizFlow').replace(/[^a-zA-Z0-9]/g, '_');
            const docNum = (doc.num || '').replace(/[^a-zA-Z0-9]/g, '-');
            return `${businessName}_${docType.toUpperCase()}_${docNum}_${customerName}_${timestamp}.pdf`;
        }
        
        function printDoc() {
            const content = document.getElementById('preview-page');
            if (!content || content.innerHTML.trim() === '') {
                showToast('No document to print', 'err');
                return;
            }
            
            const themes = getThemeColors();
            const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>BizFlow Document</title>
    <style>
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        }
        html, body { 
            width: 100%; 
            height: 100%; 
        }
        body { 
            background: ${themes.bg};
            color: ${themes.text};
            font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            font-size: 11px;
            line-height: 1.5;
            padding: 0;
            margin: 0;
        }
        @page { 
            size: A4;
            margin: 15mm;
        }
        @media print {
            body { 
                margin: 0;
                padding: 15mm;
                background: ${themes.bg} !important;
            }
            .prev-page { page-break-after: always; }
            .prev-table { page-break-inside: avoid; }
        }
        .prev-header { 
            margin-bottom: 20px; 
            padding-bottom: 12px;
            border-bottom: 2px solid ${themes.gold};
        }
        .prev-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 12px 0; 
        }
        .prev-table th { 
            background: ${themes.bg3};
            color: ${themes.text};
            padding: 8px 10px;
            text-align: left;
            font-weight: 600;
            border-bottom: 1px solid ${themes.border};
            font-size: 10px;
        }
        .prev-table td { 
            padding: 8px 10px;
            border-bottom: 1px solid ${themes.border};
            color: ${themes.text};
        }
        .prev-table tr:hover { 
            background: ${themes.bg2};
        }
        .prev-footer { 
            margin-top: 20px; 
            padding-top: 12px; 
            border-top: 1px solid ${themes.border};
            font-size: 10px;
            color: ${themes.text2};
        }
        .prev-payment-box {
            background: ${themes.bg3};
            border: 1px solid ${themes.border};
            border-radius: 4px;
            padding: 12px;
            margin: 12px 0;
        }
        .prev-payment-label {
            font-weight: 600;
            color: ${themes.text};
            font-size: 11px;
            margin-bottom: 8px;
        }
        .prev-payment-row {
            display: flex;
            justify-content: space-between;
            padding: 4px 0;
            color: ${themes.text2};
        }
        .prev-balance-due {
            background: ${themes.bg3};
            padding: 12px;
            border-radius: 4px;
            margin: 12px 0;
        }
        .prev-balance-label {
            font-size: 11px;
            color: ${themes.text2};
            margin-bottom: 6px;
        }
        .prev-balance-amount {
            font-size: 18px;
            font-weight: 700;
            color: ${themes.gold};
        }
        h1, h2, h3 { 
            margin: 8px 0; 
            color: ${themes.text};
        }
        h1 { font-size: 16px; }
        h2 { font-size: 13px; }
        .amount { 
            font-weight: 600; 
            color: ${themes.text};
            font-family: 'Courier New', monospace;
        }
        .pill {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="prev-page">
        ${content.innerHTML}
    </div>
</body>
</html>`;
            
            const w = window.open('', '_blank', 'width=950,height=700');
            if (!w) { 
                showToast('Pop-ups blocked — allow pop-ups and try again', 'err'); 
                return; 
            }
            w.document.write(html);
            w.document.close();
            w.focus();
            setTimeout(() => { w.print(); }, 800);
        }
        
        function downloadPDFDirect(docType, doc) {
            const content = document.getElementById('preview-page');
            if (!content || content.innerHTML.trim() === '') {
                showToast('No document to download', 'err');
                return;
            }
            
            try {
                const themes = getThemeColors();
                const filename = generatePDFFilename(docType, doc);
                
                // Get clean content
                let contentHTML = '';
                const wrapper = content.querySelector('[data-doc-type]');
                if (wrapper) {
                    contentHTML = wrapper.innerHTML;
                } else {
                    contentHTML = content.innerHTML;
                }
                
                const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${doc.num || 'Document'}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { height: 100%; }
        body { 
            background: ${themes.bg};
            color: ${themes.text};
            font-family: 'Segoe UI', Arial, sans-serif;
            font-size: 11px;
            line-height: 1.5;
        }
        @page { size: A4; margin: 15mm; }
        @media print { 
            body { margin: 0; padding: 15mm; } 
        }
        .prev-header { margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid ${themes.gold}; }
        .prev-table { width: 100%; border-collapse: collapse; margin: 12px 0; }
        .prev-table th { background: ${themes.bg3}; color: ${themes.text}; padding: 8px 10px; text-align: left; font-weight: 600; border-bottom: 1px solid ${themes.border}; font-size: 10px; }
        .prev-table td { padding: 8px 10px; border-bottom: 1px solid ${themes.border}; color: ${themes.text}; }
        .prev-footer { margin-top: 20px; padding-top: 12px; border-top: 1px solid ${themes.border}; font-size: 10px; color: ${themes.text2}; }
        .prev-payment-box { background: ${themes.bg3}; border: 1px solid ${themes.border}; border-radius: 4px; padding: 12px; margin: 12px 0; }
        .prev-payment-label { font-weight: 600; color: ${themes.text}; font-size: 11px; margin-bottom: 8px; }
        .prev-payment-row { display: flex; justify-content: space-between; padding: 4px 0; color: ${themes.text2}; }
        .prev-balance-due { background: ${themes.bg3}; padding: 12px; border-radius: 4px; margin: 12px 0; }
        .prev-balance-label { font-size: 11px; color: ${themes.text2}; margin-bottom: 6px; }
        .prev-balance-amount { font-size: 18px; font-weight: 700; color: ${themes.gold}; }
        h1, h2, h3 { margin: 8px 0; color: ${themes.text}; }
        h1 { font-size: 16px; } h2 { font-size: 13px; }
        .amount { font-weight: 600; color: ${themes.text}; font-family: 'Courier New', monospace; }
        .pill { display: inline-block; padding: 3px 8px; border-radius: 3px; font-size: 9px; font-weight: 600; }
    </style>
</head>
<body style="padding: 20px;">
    ${contentHTML}
</body>
</html>`;

                const w = window.open('', '_blank', 'width=950,height=700');
                if (!w) {
                    showToast('Pop-ups blocked — please allow pop-ups to save as PDF', 'err');
                    return;
                }
                
                w.document.write(html);
                w.document.close();
                w.focus();
                
                // Auto-trigger print after short delay
                setTimeout(() => {
                    w.print();
                }, 500);
                
                showToast(`Saving as: ${filename}`, true);
                
            } catch (err) {
                console.error('PDF Generation Error:', err);
                showToast('Error generating PDF', 'err');
            }
        }
        
        function downloadDocPDF() { 
            const preview = document.getElementById('preview-page');
            if (!preview) return;
            
            // Try to extract document info from preview
            const docTypeEl = preview.dataset.docType || 'invoice';
            const docNumEl = preview.querySelector('[data-doc-num]');
            const docNum = docNumEl ? docNumEl.getAttribute('data-doc-num') : 'Document';
            const custEl = preview.querySelector('[data-customer]');
            const customer = custEl ? custEl.getAttribute('data-customer') : 'Customer';
            
            const doc = { 
                num: docNum, 
                cust: customer 
            };
            
            downloadPDFDirect(docTypeEl, doc);
        }

        // Close on backdrop click
        (function(){ const ov = document.getElementById('doc-preview-overlay'); if(ov) ov.addEventListener('click', function(e){ if(e.target===this) closeDocPreview(); }); })();

        // ── Splash ──
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('splash').classList.add('fade');
                setTimeout(() => {
                    document.getElementById('splash').style.display = 'none';
                    navTo('dashboard');
                }, 400);
            }, 1000);
        });

        // Date
        document.addEventListener('DOMContentLoaded', () => {
            const _router_d = new Date();
            const el = document.getElementById('topbar-date');
            if (el) el.textContent = _router_d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        });

        // ── Global filterTable alias (used in search inputs) ──
        function filterTable() {
            if (currentModule === 'quotation' && typeof filterTable_quot === 'function') filterTable_quot();
            else if (currentModule === 'invoice' && typeof filterTable_inv === 'function') filterTable_inv();
        }

        // ── Global renderGroups_cust alias ──
        function renderGroups_cust() {
            if (typeof renderTree === 'function') renderTree();
        }
