/* BizFlow — quotation.js */

console.log("QUOTATIONS MODULE LOADING...");

        // ── Data ──
        const quotCustomers = [
            { id: 1, code: 'CUST001', name: 'ABC Corporation', meta: 'abc@corp.com · Net 30', addr: '123 Business Ave, New York, NY 10001', init: 'AC' },
            { id: 2, code: 'CUST002', name: 'John Smith', meta: 'john@smith.com · Due on Receipt', addr: '45 Maple St, Boston, MA 02101', init: 'JS' },
            { id: 3, code: 'CUST003', name: 'XYZ Industries Ltd', meta: 'contact@xyz.com · Net 15', addr: '789 Industrial Blvd, Chicago, IL 60601', init: 'XI' },
            { id: 4, code: 'CUST004', name: 'Metro Supplies Co.', meta: 'info@metro.com · Net 45', addr: '22 Market Rd, Austin, TX 78701', init: 'MS' },
            { id: 5, code: 'CUST005', name: 'Global Traders LLC', meta: 'trade@global.com · 2/10 Net 30', addr: '1 Harbor View, Miami, FL 33101', init: 'GT' },
        ];

        const products = [
            { name: 'MacBook Pro 14"', price: 1999.00, tax: 10 },
            { name: 'iPhone 15 Pro', price: 999.00, tax: 10 },
            { name: 'UX Design Services', price: 150.00, tax: 18 },
            { name: 'Annual Maintenance', price: 500.00, tax: 5 },
            { name: 'Office Chair Ergo', price: 349.00, tax: 12 },
            { name: 'Wireless Keyboard', price: 89.00, tax: 12 },
        ];

        const quotations = [
            { id: 1, num: 'QUOT-2024-0012', cust: 'ABC Corporation', date: '2024-12-10', expiry: '2025-01-09', items: 4, amount: 12450.00, status: 'Approved' },
            { id: 2, num: 'QUOT-2024-0011', cust: 'John Smith', date: '2024-12-08', expiry: '2025-01-07', items: 2, amount: 3200.00, status: 'Pending' },
            { id: 3, num: 'QUOT-2024-0010', cust: 'XYZ Industries Ltd', date: '2024-12-05', expiry: '2025-01-04', items: 6, amount: 28900.00, status: 'Approved' },
            { id: 4, num: 'QUOT-2024-0009', cust: 'Metro Supplies Co.', date: '2024-12-01', expiry: '2023-12-31', items: 3, amount: 5670.00, status: 'Rejected' },
            { id: 5, num: 'QUOT-2024-0008', cust: 'Global Traders LLC', date: '2024-11-28', expiry: '2024-12-28', items: 5, amount: 9800.00, status: 'Rejected' },
            { id: 6, num: 'QUOT-2024-0007', cust: 'ABC Corporation', date: '2024-11-25', expiry: '2024-12-25', items: 2, amount: 4100.00, status: 'Pending' },
            { id: 7, num: 'QUOT-2024-0006', cust: 'John Smith', date: '2024-11-20', expiry: '2024-12-20', items: 1, amount: 999.00, status: 'Approved' },
            { id: 8, num: 'QUOT-2024-0005', cust: 'Metro Supplies Co.', date: '2024-11-18', expiry: '2024-12-18', items: 3, amount: 2340.00, status: 'Re-edited' },
            { id: 9, num: 'QUOT-2024-0004', cust: 'XYZ Industries Ltd', date: '2024-11-15', expiry: '2024-12-15', items: 7, amount: 15600.00, status: 'Approved' },
            { id: 10, num: 'QUOT-2024-0003', cust: 'Global Traders LLC', date: '2024-11-12', expiry: '2024-12-12', items: 2, amount: 1260.00, status: 'Pending' },
            { id: 11, num: 'QUOT-2024-0002', cust: 'ABC Corporation', date: '2024-11-10', expiry: '2024-12-10', items: 4, amount: 7800.00, status: 'Approved' },
            { id: 12, num: 'QUOT-2024-0001', cust: 'Metro Supplies Co.', date: '2024-11-05', expiry: '2024-12-05', items: 2, amount: 1200.00, status: 'Re-edited' },
        ];

        let _quot_currentFilter = 'all';
        let _quot_selCustIdx = -1;
        let deleteTargetId = null;
        let _quot_currentStatus = 'Pending';

        // ── Render table ──
        
        // ── Quotation bulk actions ──
        function updateBulkBar_quot() {
            const n = document.querySelectorAll('#quot-tBody input[type=checkbox]:checked').length;
            const bar = document.getElementById('quot-bulk-bar');
            const cnt = document.getElementById('quot-bulk-count');
            if (bar) bar.style.display = n > 0 ? 'flex' : 'none';
            if (cnt) cnt.textContent = n + ' selected';
        }
        function clearSel_quot() {
            document.querySelectorAll('#quot-tBody input[type=checkbox]').forEach(cb => cb.checked = false);
            const hdr = document.querySelector('#view-quotation thead input[type=checkbox]');
            if (hdr) hdr.checked = false;
            updateBulkBar_quot();
        }
        function getSelQuot() {
            return Array.from(document.querySelectorAll('#quot-tBody input[type=checkbox]:checked'))
                .map(cb => quotations.find(q => q.id == cb.closest('tr').dataset.id)).filter(Boolean);
        }
        function bulkPreview_quot() {
            const sel = getSelQuot();
            if (sel.length) { clearSel_quot(); sel.forEach((doc,i) => setTimeout(() => previewDoc('quotation', doc), i * 100)); }
        }
        function bulkSend_quot() {
            const sel = getSelQuot(); clearSel_quot();
            sel.forEach(q => q.status = 'Pending');
            renderTable_quot(quotations); showToast(sel.length + ' quotation' + (sel.length>1?'s':'') + ' sent ✓', true);
        }
        function bulkDuplicate_quot() {
            const sel = getSelQuot(); clearSel_quot();
            sel.forEach(q => {
                const newId = Math.max(...quotations.map(x=>x.id)) + 1;
                const num = 'QUOT-2024-' + String(newId).padStart(4,'0');
                quotations.unshift({...q, id:newId, num, status:'Pending', date:new Date().toISOString().slice(0,10)});
            });
            renderTable_quot(quotations); showToast(sel.length + ' duplicated', true);
        }
        function bulkDuplicate_quot_single(id) {
            const q = quotations.find(x => x.id === id);
            if (!q) return;
            const newId = Math.max(...quotations.map(x=>x.id)) + 1;
            const num = 'QUOT-2024-' + String(newId).padStart(4,'0');
            quotations.unshift({...q, id:newId, num, status:'Pending', date:new Date().toISOString().slice(0,10)});
            renderTable_quot(quotations);
            showToast('Quotation duplicated as ' + num, true);
        }
        function bulkApprove_quot() {
            const sel = getSelQuot(); clearSel_quot();
            sel.forEach(q => q.status = 'Approved');
            renderTable_quot(quotations); showToast(sel.length + ' approved ✓', true);
        }
        function bulkExport_quot() {
            const sel = getSelQuot(); clearSel_quot();
            const csv = 'Number,Customer,Date,Expiry,Amount,Status\n' + sel.map(q => [q.num,q.cust,q.date,q.expiry,q.amount,q.status].join(',')).join('');
            const a = document.createElement('a'); a.href = 'data:text/csv,' + encodeURIComponent(csv); a.download = 'quotations.csv'; a.click();
            showToast('Exported ' + sel.length + ' quotations', true);
        }
        function bulkDelete_quot() {
            const sel = getSelQuot();
            if (!confirm('Delete ' + sel.length + ' quotation' + (sel.length>1?'s':'') + '?')) return;
            sel.forEach(q => { const i = quotations.findIndex(x=>x.id===q.id); if(i>=0) quotations.splice(i,1); });
            clearSel_quot(); renderTable_quot(quotations); showToast(sel.length + ' deleted');
        }

        // ── Bulk Share Functions ──
        function showBulkShare_quot() {
            const modal = document.getElementById('quot-bulkShareModal');
            if (modal) modal.classList.add('show');
        }

        function closeBulkShare_quot() {
            const modal = document.getElementById('quot-bulkShareModal');
            if (modal) modal.classList.remove('show');
        }

        function bulkDownloadPDF_quot() {
            const sel = getSelQuot();
            if (sel.length === 0) { showToast('Select quotations to download', 'err'); return; }
            sel.forEach((q, i) => setTimeout(() => {
                previewDoc('quotation', q);
                setTimeout(() => {
                    const preview = document.getElementById('preview-page');
                    if (preview) {
                        const wrapper = preview.querySelector('[data-doc-type]');
                        const docNum = wrapper ? wrapper.getAttribute('data-doc-num') : q.num;
                        const customer = wrapper ? wrapper.getAttribute('data-customer') : q.cust;
                        downloadPDFDirect('quotation', { num: docNum, cust: customer });
                    }
                }, 200);
            }, i * 1500));
            closeBulkShare_quot();
            showToast('Downloading ' + sel.length + ' quotation' + (sel.length>1?'s':'') + '…', true);
        }

        function bulkPrintDocs_quot() {
            const sel = getSelQuot();
            if (sel.length === 0) { showToast('Select quotations to print', 'err'); return; }
            sel.forEach((q, i) => setTimeout(() => {
                previewDoc('quotation', q);
                setTimeout(() => printDoc(), 200);
            }, i * 1500));
            closeBulkShare_quot();
            showToast('Opening print dialog for ' + sel.length + ' quotation' + (sel.length>1?'s':'') + '…', true);
        }

        function bulkShareEmail_quot() {
            const sel = getSelQuot();
            if (sel.length === 0) { showToast('Select quotations to share', 'err'); return; }
            const subject = 'Quotation' + (sel.length > 1 ? 's' : '') + ': ' + sel.map(q => q.num).join(', ');
            const mailtoLink = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent('Please find attached quotation(s)');
            window.location.href = mailtoLink;
            closeBulkShare_quot();
            showToast('Opening email client for ' + sel.length + ' quotation' + (sel.length>1?'s':'') + '…', true);
        }

        function bulkShareWhatsApp_quot() {
            const sel = getSelQuot();
            if (sel.length === 0) { showToast('Select quotations to share', 'err'); return; }
            const quotationList = sel.map(q => q.num + ' - ' + q.cust + ' ($' + q.amount.toFixed(2) + ')').join('%0A');
            const message = 'Quotation Details:%0A' + quotationList;
            const whatsappLink = 'https://wa.me/?text=' + message;
            window.open(whatsappLink, '_blank');
            closeBulkShare_quot();
            showToast('Opening WhatsApp for ' + sel.length + ' quotation' + (sel.length>1?'s':'') + '…', true);
        }

        function getFormItems_quot() {
            const items = [];
            document.querySelectorAll('#q-itemsBody .item-row').forEach(row => {
                items.push({
                    name: row.querySelector('.ic input[type="text"]')?.value || 'Item',
                    qty: parseFloat(row.querySelector('.qty')?.value) || 0,
                    unit: row.querySelector('.ic select')?.value || 'Pcs',
                    price: parseFloat(row.querySelector('.uprice')?.value) || 0,
                    disc: parseFloat(row.querySelector('.disc')?.value) || 0,
                    tax: parseFloat(row.querySelector('.tax')?.value) || 0,
                });
            });
            return items;
        }

        function renderTable_quot(data) {
            console.log("Rendering Quotation Table with", data.length, "items");
            const body = document.getElementById('quot-tBody');
            body.innerHTML = '';
            data.forEach((q, i) => {
                const statusClass = {
                    'Approved': 'p-approved', 'Pending': 'p-pending', 'Rejected': 'p-rejected', 'Re-edited': 'p-reedited'
                }[q.status] || 'p-pending';
                const isExpired = new Date(q.expiry) < new Date();
                const expiryStr = isExpired
                    ? `<span style="color:var(--red)">${formatDate_quot(q.expiry)}</span>`
                    : formatDate_quot(q.expiry);
                const tr = document.createElement('tr');
                tr.dataset.id = q.id;
                tr.style.animationDelay = (i * 0.04) + 's';
                tr.innerHTML = `
      <td style="padding-left:16px"><input type="checkbox" style="accent-color:var(--gold);cursor:pointer" onclick="event.stopPropagation()" onchange="updateBulkBar_quot()"></td>
      <td class="doc-num" onclick="editQuotation(${q.id})">${q.num}</td>
      <td onclick="editQuotation(${q.id})">
        <div class="c-name">${q.cust}</div>
        <div class="c-ref">${q.num.replace('QUOT', 'REF')}</div>
      </td>
      <td onclick="editQuotation(${q.id})" style="font-family:'DM Mono',monospace;font-size:11px;color:var(--text2)">${formatDate_quot(q.date)}</td>
      <td onclick="editQuotation(${q.id})" style="font-family:'DM Mono',monospace;font-size:11px">${expiryStr}</td>
      <td onclick="editQuotation(${q.id})" style="font-family:'DM Mono',monospace;font-size:11px;color:var(--text2)">${q.items} items</td>
      <td onclick="editQuotation(${q.id})"><span class="amount">$${q.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></td>
      <td onclick="editQuotation(${q.id})"><span class="pill ${statusClass}">${q.status}</span></td>
      <td>
        <div class="row-actions">
          <div class="ib" title="Preview" onclick="previewDoc('quotation',quotations.find(x=>x.id===${q.id}))">👁</div>
          <div class="ib" title="Edit" onclick="editQuotation(${q.id})">✎</div>
          <div class="ib" title="Duplicate" onclick="bulkDuplicate_quot_single(${q.id})">⧉</div>
          <div class="ib" title="Download" onclick="downloadQuotationPDF(${q.id})">↓</div>
          <div class="ib" title="Print" onclick="previewDoc('quotation',quotations.find(x=>x.id===${q.id}));setTimeout(()=>printDoc(),800)">🖨</div>
          <div class="ib del" title="Delete" onclick="showDeleteModal_quot(${q.id})">🗑</div>
        </div>
      </td>`;
                body.appendChild(tr);
            });
        }

        function formatDate_quot(d) {
            if (!d) return '—';
            const dt = new Date(d + 'T00:00:00');
            return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }

        function filterTable_quot() {
            const q = document.getElementById('quot-searchInput') ? document.getElementById('quot-searchInput').value.toLowerCase() : '';
            let data = _quot_currentFilter === 'all' ? quotations : quotations.filter(r => r.status === _quot_currentFilter);
            if (q) data = data.filter(r => r.num.toLowerCase().includes(q) || r.cust.toLowerCase().includes(q));
            renderTable_quot(data);
        }

        function filterStatus_quot(s, el) {
            document.querySelectorAll('.s-tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
            _quot_currentFilter = s;
            filterTable_quot();
        }

        function selAll_quot(cb) { document.querySelectorAll('#quot-tBody input[type=checkbox]').forEach(c => c.checked = cb.checked); updateBulkBar_quot(); }

        // ── Views ──
        function showList_q() {
            document.getElementById('quot-listView').style.display = 'flex';
            document.getElementById('quot-formView').style.display = 'none';
            document.getElementById('quot-list-btns').style.display = 'flex';
            document.getElementById('quot-form-btns').style.display = 'none';
            document.getElementById('quot-crumb').textContent = 'Quotations';
            renderTable_quot(quotations);
        }

        function showCreate_q() {
            document.getElementById('quot-listView').style.display = 'none';
            document.getElementById('quot-formView').style.display = 'flex';
            document.getElementById('quot-list-btns').style.display = 'none';
            document.getElementById('quot-form-btns').style.display = 'flex';
            document.getElementById('quot-crumb').textContent = 'New Quotation';
            const today = new Date().toISOString().split('T')[0];
            const exp = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];
            document.getElementById('quot-fDate').value = today;
            document.getElementById('quot-fExpiry').value = exp;
            _quot_selCustIdx = -1;
            resetCustomer_quot();
            document.getElementById('quot-itemsBody').innerHTML = '';
            addItem_quot();
            addItem_quot();
            recalc_quot();
        }

        function editQuotation(id) {
            showCreate_q();
            const q = quotations.find(r => r.id === id);
            if (!q) return;
            document.getElementById('quot-crumb').textContent = q.num;
            document.getElementById('quot-fNum').value = q.num;
            document.getElementById('quot-sumDocNum').textContent = q.num;
            const ci = quotCustomers.findIndex(c => c.name === q.cust);
            if (ci >= 0) { _quot_selCustIdx = ci; applyCustomer(quotCustomers[ci]); }
            setStatus_quot(q.status);
        }

        // ── Customer ──
        
        // ── Customer search dropdown ──
        function toggleCustSearch_quot() {
            const dd = document.getElementById('quot-cust-dropdown');
            const isOpen = dd.style.display !== 'none';
            if (isOpen) { closeCustSearch_quot(); return; }
            dd.style.display = 'block';
            renderCustList_quot('');
            setTimeout(() => {
                const inp = document.getElementById('quot-cust-search');
                if (inp) inp.focus();
            }, 50);
            document.addEventListener('click', closeCustSearch_quot_outside, { once: true });
        }
        function closeCustSearch_quot() {
            const dd = document.getElementById('quot-cust-dropdown');
            if (dd) dd.style.display = 'none';
        }
        function closeCustSearch_quot_outside(e) {
            const wrap = document.getElementById('quot-cust-wrap');
            if (wrap && !wrap.contains(e.target)) closeCustSearch_quot();
        }
        function searchCust_quot(q) {
            renderCustList_quot(q.toLowerCase());
        }
        function renderCustList_quot(q) {
            const list = document.getElementById('quot-cust-list');
            if (!list) return;
            const filtered = q
                ? quotCustomers.filter(c =>
                    c.name.toLowerCase().includes(q) ||
                    c.code.toLowerCase().includes(q) ||
                    c.meta.toLowerCase().includes(q))
                : quotCustomers;
            if (filtered.length === 0) {
                list.innerHTML = '<div style="padding:12px 14px;color:var(--text3);font-size:12px">No customers found</div>';
                return;
            }
            list.innerHTML = filtered.map(c => `
                <div class="cust-drop-item" onclick="selectCust_quot(${c.id})">
                    <div class="cust-av" style="width:30px;height:30px;font-size:11px;flex-shrink:0">${c.init}</div>
                    <div style="min-width:0">
                        <div style="font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.name}</div>
                        <div style="font-size:11px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.meta}</div>
                    </div>
                </div>`).join('');
        }
        function selectCust_quot(id) {
            const c = quotCustomers.find(x => x.id === id);
            if (!c) return;
            _quot_selCustIdx = quotCustomers.indexOf(c);
            applyCustomer(c);
            closeCustSearch_quot();
            const inp = document.getElementById('quot-cust-search');
            if (inp) inp.value = '';
        }
        function cycleCustomer_quot() {
            _quot_selCustIdx = (_quot_selCustIdx + 1) % quotCustomers.length;
            applyCustomer(quotCustomers[_quot_selCustIdx]);
        }

        function applyCustomer(c) {
            document.getElementById('custAv').textContent = c.init;
            document.getElementById('custNm').textContent = c.name;
            document.getElementById('custMt').textContent = c.meta;
            document.getElementById('quot-fBill').value = c.addr;
            document.getElementById('quot-fShip').value = c.addr;
            document.getElementById('custSel').classList.add('has-cust');
        }

        function resetCustomer_quot() {
            document.getElementById('custAv').textContent = '?';
            document.getElementById('custNm').textContent = 'Select a customer…';
            document.getElementById('custMt').textContent = 'Click to choose';
            document.getElementById('quot-fBill').value = '';
            document.getElementById('quot-fShip').value = '';
            document.getElementById('custSel').classList.remove('has-cust');
        }

        // ── Line items ──
        let _quot_itemCounter = 0;
        function addItem_quot() {
            _quot_itemCounter++;
            const id = 'quot_item_' + _quot_itemCounter;
            const p = products[(_quot_itemCounter - 1) % products.length];
            const div = document.createElement('div');
            div.className = 'item-row';
            div.id = id;
            div.innerHTML = `
    <div class="ic">
      <input type="text" value="${p.name}" placeholder="Product / description" oninput="autoFill_quot('${id}',this.value)" style="font-size:12px">
    </div>
    <div class="ic"><input type="number" value="1" min="0" step="1" oninput="calcRow_quot('${id}')" class="qty"></div>
    <div class="ic">
      <select onchange="calcRow_quot('${id}')">
        <option>Pcs</option><option>Kg</option><option>Ltr</option><option>Mtr</option><option>Hrs</option><option>Box</option>
      </select>
    </div>
    <div class="ic"><input type="number" value="${p.price.toFixed(2)}" min="0" step="0.01" oninput="calcRow_quot('${id}')" class="uprice"></div>
    <div class="ic"><input type="number" value="0" min="0" max="100" step="0.1" oninput="calcRow_quot('${id}')" class="disc"></div>
    <div class="ic"><input type="number" value="${p.tax}" min="0" max="100" step="0.1" oninput="calcRow_quot('${id}')" class="tax"></div>
    <div class="ic"><input type="text" class="ro tot" readonly tabindex="-1"></div>
    <div class="ic"><button class="del-btn" onclick="removeItem_quot('${id}')">×</button></div>`;
            document.getElementById('quot-itemsBody').appendChild(div);
            calcRow_quot(id);
        }

        function removeItem_quot(id) {
            const el = document.getElementById(id);
            if (el) el.remove();
            recalc_quot();
        }

        function autoFill_quot(id, val) {
            const p = products.find(x => x.name.toLowerCase().startsWith(val.toLowerCase()));
            if (p) {
                const row = document.getElementById(id);
                row.querySelector('.uprice').value = p.price.toFixed(2);
                row.querySelector('.tax').value = p.tax;
            }
            calcRow_quot(id);
        }

        function calcRow_quot(id) {
            const row = document.getElementById(id);
            if (!row) return;
            const qty = parseFloat(row.querySelector('.qty').value) || 0;
            const price = parseFloat(row.querySelector('.uprice').value) || 0;
            const disc = parseFloat(row.querySelector('.disc').value) || 0;
            const tax = parseFloat(row.querySelector('.tax').value) || 0;
            const discAmt = price * qty * disc / 100;
            const base = price * qty - discAmt;
            const taxAmt = base * tax / 100;
            const total = base + taxAmt;
            row.querySelector('.tot').value = '$' + total.toFixed(2);
            recalc_quot();
        }

        function recalc_quot() {
            let subtotal = 0, itemDisc = 0, taxTotal = 0;
            document.querySelectorAll('.item-row').forEach(row => {
                const qty = parseFloat(row.querySelector('.qty').value) || 0;
                const price = parseFloat(row.querySelector('.uprice').value) || 0;
                const disc = parseFloat(row.querySelector('.disc').value) || 0;
                const tax = parseFloat(row.querySelector('.tax').value) || 0;
                const gross = price * qty;
                const dAmt = gross * disc / 100;
                const base = gross - dAmt;
                const tAmt = base * tax / 100;
                subtotal += gross;
                itemDisc += dAmt;
                taxTotal += tAmt;
            });

            const afterItemDisc = subtotal - itemDisc;
            const oDiscPct = parseFloat(document.getElementById('quot-fODisc').value) || 0;
            const oDiscAmt = afterItemDisc * oDiscPct / 100;
            const shipping = parseFloat(document.getElementById('quot-fShipping').value) || 0;
            const adjust = parseFloat(document.getElementById('quot-fAdjust').value) || 0;
            const roundOff = parseFloat(document.getElementById('quot-fRound').value) || 0;
            const grand = afterItemDisc - oDiscAmt + taxTotal + shipping + adjust + roundOff;

            const fmt = v => '$' + Math.abs(v).toFixed(2);
            document.getElementById('quot-cSub').textContent = fmt(subtotal);
            document.getElementById('quot-cIDisc').textContent = '−' + fmt(itemDisc);
            document.getElementById('quot-cODisc').textContent = '−' + fmt(oDiscAmt);
            document.getElementById('quot-cTax').textContent = '+' + fmt(taxTotal);
            document.getElementById('quot-cShip').textContent = fmt(shipping);
            document.getElementById('quot-cAdj').textContent = (adjust >= 0 ? '+' : '−') + fmt(adjust);
            document.getElementById('quot-cRound').textContent = (roundOff >= 0 ? '' : '−') + fmt(roundOff);
            document.getElementById('quot-cGrand').textContent = '$' + Math.max(0, grand).toFixed(2);
            document.getElementById('quot-cWords').textContent = toWords_quot(Math.max(0, grand));
        }

        // ── Status ──
        function setStatus_quot(s) {
            _quot_currentStatus = s;
            const map = { 'Pending': 'sp', 'Approved': 'sa', 'Rejected': 'sr', 'Re-edited': 'se' };
            const ids = { 'Pending': 'quot-sPend', 'Approved': 'quot-sAppr', 'Rejected': 'quot-sRej', 'Re-edited': 'quot-sReed' };
            ['quot-sPend', 'quot-sAppr', 'quot-sRej', 'quot-sReed'].forEach(id => {
                document.getElementById(id).className = 's-btn';
            });
            const el = document.getElementById(ids[s]);
            if (el) el.className = 's-btn ' + map[s];
        }

        // ── Amount in words ──
        function toWords_quot(n) {
            if (n === 0) return 'Zero Dollars';
            const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
            const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
            function chunk_quot(num) {
                if (num === 0) return '';
                if (num < 20) return ones[num] + ' ';
                if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '') + ' ';
                return ones[Math.floor(num / 100)] + ' Hundred ' + chunk_quot(num % 100);
            }
            const dollars = Math.floor(n);
            const cents = Math.round((n - dollars) * 100);
            let w = '';
            if (dollars >= 1000000) w += chunk_quot(Math.floor(dollars / 1000000)) + 'Million ';
            if (dollars >= 1000) w += chunk_quot(Math.floor((dollars % 1000000) / 1000)) + 'Thousand ';
            w += chunk_quot(dollars % 1000);
            w = w.trim() + ' Dollar' + (dollars !== 1 ? 's' : '');
            if (cents > 0) w += ' and ' + chunk_quot(cents).trim() + ' Cent' + (cents !== 1 ? 's' : '');
            return w.replace(/\s+/g, ' ').trim();
        }

        // ── Modal ──
        function showDeleteModal_quot(id) {
            deleteTargetId = id;
            const q = quotations.find(r => r.id === id);
            document.getElementById('deleteTarget').textContent = q ? q.num : 'this quotation';
            document.getElementById('inv-deleteModal').classList.add('show');
        }
        function closeModal_quot() { document.getElementById('deleteModal').classList.remove('show'); }
        function confirmDelete_quot() {
            closeModal_quot();
            showToast('Quotation deleted', true);
            showList_q();
        }

        // ── Actions ──
        function doSave_quot(type) {
            showToast(type === 'draft' ? 'Draft saved' : 'Quotation saved successfully', true);
        }
        function doShare_quot() {
            // Get current quotation data from the form  
            const custEl = document.getElementById('q-custNm');
            if (custEl && custEl.textContent === 'Select a customer…') {
                showToast('Please select a customer first', 'err');
                return;
            }
            const items = getFormItems_quot();
            const q = {
                num: document.getElementById('q-fNum').value,
                cust: custEl ? custEl.textContent : 'Unknown',
                date: document.getElementById('q-fDate').value,
                expiry: document.getElementById('q-fExpiry').value,
                amount: _q_grandTotal,
                status: 'Sent',
                items: items
            };
            previewDoc('quotation', q);
            setTimeout(() => {
                downloadPDFDirect('quotation', { num: q.num, cust: q.cust });
            }, 100);
        }
        function doPrint() { printDoc(); }
        function doDuplicate_quot() { showToast('Quotation duplicated as QUOT-2024-0014'); }
        function downloadQuotationPDF(quotId) {
            const q = quotations.find(x => x.id === quotId);
            if (!q) { showToast('Quotation not found', 'err'); return; }
            previewDoc('quotation', q);
            setTimeout(() => {
                downloadPDFDirect('quotation', { num: q.num, cust: q.cust });
            }, 100);
        }

        // ── Toast ──
        let _quot_toastTimer;
        function toast_quot_orig(msg, ok) {
            const el = document.createElement('div');
            el.className = 'toast' + (ok ? ' ok' : '');
            el.innerHTML = `<span>${ok ? '✓' : 'ℹ'}</span> ${msg}`;
            document.body.appendChild(el);
            clearTimeout(_quot_toastTimer);
            _quot_toastTimer = setTimeout(() => el.remove(), 3000);
        }

        // ── Init: deferred to navTo ──
