/* BizFlow — invoice.js */

const invCustomers = [
            { id: 1, name: 'ABC Corporation', meta: 'abc@corp.com · Net 30', addr: '123 Business Ave, New York, NY 10001', init: 'AC' },
            { id: 2, name: 'John Smith', meta: 'john@smith.com · Due on Receipt', addr: '45 Maple St, Boston, MA 02101', init: 'JS' },
            { id: 3, name: 'XYZ Industries Ltd', meta: 'contact@xyz.com · Net 15', addr: '789 Industrial Blvd, Chicago, IL', init: 'XI' },
            { id: 4, name: 'Metro Supplies Co.', meta: 'info@metro.com · Net 45', addr: '22 Market Rd, Austin, TX 78701', init: 'MS' },
            { id: 5, name: 'Global Traders LLC', meta: 'trade@global.com · 2/10 Net 30', addr: '1 Harbor View, Miami, FL 33101', init: 'GT' },
        ];

        const invProducts = [
            { name: 'MacBook Pro 14"', price: 1999.00, tax: 10 },
            { name: 'iPhone 15 Pro', price: 999.00, tax: 10 },
            { name: 'UX Design Services', price: 150.00, tax: 18 },
            { name: 'Annual Maintenance', price: 500.00, tax: 5 },
            { name: 'Office Chair Ergo', price: 349.00, tax: 12 },
            { name: 'Wireless Keyboard', price: 89.00, tax: 12 },
        ];

        const invoices = [
            { id: 1, num: 'INV-2024-0018', cust: 'ABC Corporation', date: '2024-12-10', due: '2025-01-09', amount: 12450.00, paid: 12450.00, status: 'Paid' },
            { id: 2, num: 'INV-2024-0017', cust: 'John Smith', date: '2024-12-08', due: '2025-01-07', amount: 3200.00, paid: 0, status: 'Unpaid' },
            { id: 3, num: 'INV-2024-0016', cust: 'XYZ Industries Ltd', date: '2024-12-05', due: '2025-01-04', amount: 8900.00, paid: 4450.00, status: 'Partially Paid' },
            { id: 4, num: 'INV-2024-0015', cust: 'Metro Supplies Co.', date: '2024-11-20', due: '2023-12-20', amount: 2670.00, paid: 0, status: 'Overdue' },
            { id: 5, num: 'INV-2024-0014', cust: 'Global Traders LLC', date: '2024-11-18', due: '2023-12-18', amount: 5800.00, paid: 0, status: 'Overdue' },
            { id: 6, num: 'INV-2024-0013', cust: 'ABC Corporation', date: '2024-11-15', due: '2024-12-15', amount: 4100.00, paid: 4100.00, status: 'Paid' },
            { id: 7, num: 'INV-2024-0012', cust: 'John Smith', date: '2024-11-10', due: '2024-12-10', amount: 999.00, paid: 999.00, status: 'Paid' },
            { id: 8, num: 'INV-2024-0011', cust: 'Metro Supplies Co.', date: '2024-11-08', due: '2024-12-08', amount: 3340.00, paid: 750.00, status: 'Partially Paid' },
            { id: 9, num: 'INV-2024-0010', cust: 'XYZ Industries Ltd', date: '2024-11-05', due: '2024-12-05', amount: 15600.00, paid: 15600.00, status: 'Paid' },
            { id: 10, num: 'INV-2024-0009', cust: 'Global Traders LLC', date: '2024-10-28', due: '2024-11-27', amount: 1260.00, paid: 1260.00, status: 'Paid' },
            { id: 11, num: 'INV-2024-0008', cust: 'ABC Corporation', date: '2024-10-25', due: '2024-11-24', amount: 7800.00, paid: 7800.00, status: 'Paid' },
            { id: 12, num: 'INV-2024-0007', cust: 'Metro Supplies Co.', date: '2024-10-20', due: '2023-11-19', amount: 900.00, paid: 0, status: 'Overdue' },
            { id: 13, num: 'INV-2024-0006', cust: 'John Smith', date: '2024-10-15', due: '2024-11-14', amount: 2100.00, paid: 2100.00, status: 'Paid' },
            { id: 14, num: 'INV-2024-0005', cust: 'XYZ Industries Ltd', date: '2024-10-10', due: '2024-11-09', amount: 6300.00, paid: 6300.00, status: 'Paid' },
            { id: 15, num: 'INV-2024-0004', cust: 'ABC Corporation', date: '2024-09-28', due: '2024-10-28', amount: 1450.00, paid: 1450.00, status: 'Paid' },
            { id: 16, num: 'INV-2024-0003', cust: 'Global Traders LLC', date: '2024-09-20', due: '2024-10-20', amount: 3200.00, paid: 0, status: 'Cancelled' },
            { id: 17, num: 'INV-2024-0002', cust: 'Metro Supplies Co.', date: '2024-09-15', due: '2024-10-15', amount: 880.00, paid: 880.00, status: 'Paid' },
            { id: 18, num: 'INV-2024-0001', cust: 'XYZ Industries Ltd', date: '2024-09-10', due: '2024-10-10', amount: 4750.00, paid: 4750.00, status: 'Paid' },
        ];

        let _inv_currentFilter = 'all';
        let _inv_selCustIdx = -1;
        let _inv_currentStatus = 'Unpaid';
        let _inv__inv_payments = [];
        let _inv_grandTotal = 0;
        let _inv_selectedMethod = 'Bank Transfer';
        let _inv_deleteTargetId = null;

        // ── Table ──
        
        // ── Invoice bulk actions ──
        function updateBulkBar_inv() {
            const n = document.querySelectorAll('#inv-tBody input[type=checkbox]:checked').length;
            const bar = document.getElementById('inv-bulk-bar');
            const cnt = document.getElementById('inv-bulk-count');
            if (bar) bar.style.display = n > 0 ? 'flex' : 'none';
            if (cnt) cnt.textContent = n + ' selected';
        }
        function clearSel_inv() {
            document.querySelectorAll('#inv-tBody input[type=checkbox]').forEach(cb => cb.checked = false);
            const hdr = document.querySelector('#view-invoice thead input[type=checkbox]');
            if (hdr) hdr.checked = false;
            updateBulkBar_inv();
        }
        function getSelInv() {
            return Array.from(document.querySelectorAll('#inv-tBody input[type=checkbox]:checked'))
                .map(cb => invoices.find(x => x.id == cb.closest('tr').dataset.id)).filter(Boolean);
        }
        function bulkPreview_inv() {
            const sel = getSelInv(); clearSel_inv();
            sel.forEach((doc,i) => setTimeout(() => previewDoc('invoice', doc), i * 100));
        }
        function bulkSend_inv() {
            const sel = getSelInv(); clearSel_inv();
            showToast('Sending ' + sel.length + ' invoice' + (sel.length>1?'s':'') + '…');
        }
        function bulkPayment_inv() {
            const sel = getSelInv(); clearSel_inv();
            const unpaid = sel.filter(x => x.status !== 'Paid');
            unpaid.forEach(inv => { inv.paid = inv.amount; inv.status = 'Paid'; });
            if (typeof renderTable_inv === 'function') renderTable_inv(invoices);
            showToast(unpaid.length + ' marked as paid ✓', true);
        }
        function bulkExport_inv() {
            const sel = getSelInv(); clearSel_inv();
            const csv = 'Number,Customer,Date,Due,Amount,Paid,Status\n' + sel.map(i => [i.num,i.cust,i.date,i.due,i.amount,i.paid||0,i.status].join(',')).join('');
            const a = document.createElement('a'); a.href = 'data:text/csv,' + encodeURIComponent(csv); a.download = 'invoices.csv'; a.click();
            showToast('Exported ' + sel.length + ' invoices', true);
        }
        function bulkDelete_inv() {
            const sel = getSelInv();
            if (!confirm('Delete ' + sel.length + ' invoice' + (sel.length>1?'s':'') + '?')) return;
            sel.forEach(inv => { const i = invoices.findIndex(x=>x.id===inv.id); if(i>=0) invoices.splice(i,1); });
            clearSel_inv();
            if (typeof renderTable_inv === 'function') renderTable_inv(invoices);
            showToast(sel.length + ' deleted');
        }

        // ── Bulk Share Functions ──
        function showBulkShare_inv() {
            const modal = document.getElementById('inv-bulkShareModal');
            if (modal) modal.classList.add('show');
        }

        function closeBulkShare_inv() {
            const modal = document.getElementById('inv-bulkShareModal');
            if (modal) modal.classList.remove('show');
        }

        function bulkDownloadPDF_inv() {
            const sel = getSelInv();
            if (sel.length === 0) { showToast('Select invoices to download', 'err'); return; }
            sel.forEach((inv, i) => setTimeout(() => {
                previewDoc('invoice', inv);
                setTimeout(() => {
                    const preview = document.getElementById('preview-page');
                    if (preview) {
                        const wrapper = preview.querySelector('[data-doc-type]');
                        const docNum = wrapper ? wrapper.getAttribute('data-doc-num') : inv.num;
                        const customer = wrapper ? wrapper.getAttribute('data-customer') : inv.cust;
                        downloadPDFDirect('invoice', { num: docNum, cust: customer });
                    }
                }, 200);
            }, i * 1500));
            closeBulkShare_inv();
            showToast('Downloading ' + sel.length + ' invoice' + (sel.length>1?'s':'') + '…', true);
        }

        function bulkPrintDocs_inv() {
            const sel = getSelInv();
            if (sel.length === 0) { showToast('Select invoices to print', 'err'); return; }
            sel.forEach((inv, i) => setTimeout(() => {
                previewDoc('invoice', inv);
                setTimeout(() => printDoc(), 200);
            }, i * 1500));
            closeBulkShare_inv();
            showToast('Opening print dialog for ' + sel.length + ' invoice' + (sel.length>1?'s':'') + '…', true);
        }

        function bulkShareEmail_inv() {
            const sel = getSelInv();
            if (sel.length === 0) { showToast('Select invoices to share', 'err'); return; }
            const emails = sel.map(inv => inv.cust).join(', ');
            const subject = 'Invoice' + (sel.length > 1 ? 's' : '') + ': ' + sel.map(i => i.num).join(', ');
            const mailtoLink = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent('Please find attached invoice(s)');
            window.location.href = mailtoLink;
            closeBulkShare_inv();
            showToast('Opening email client for ' + sel.length + ' invoice' + (sel.length>1?'s':'') + '…', true);
        }

        function bulkShareWhatsApp_inv() {
            const sel = getSelInv();
            if (sel.length === 0) { showToast('Select invoices to share', 'err'); return; }
            const invoiceList = sel.map(inv => inv.num + ' - ' + inv.cust + ' ($' + inv.amount.toFixed(2) + ')').join('%0A');
            const message = 'Invoice Details:%0A' + invoiceList;
            const whatsappLink = 'https://wa.me/?text=' + message;
            window.open(whatsappLink, '_blank');
            closeBulkShare_inv();
            showToast('Opening WhatsApp for ' + sel.length + ' invoice' + (sel.length>1?'s':'') + '…', true);
        }

        function renderTable_inv(data) {
            console.log("Rendering Invoice Table with", data.length, "items");
            const body = document.getElementById('inv-tBody');
            body.innerHTML = '';
            data.forEach((inv, i) => {
                const sc = { Paid: 'p-paid', Unpaid: 'p-unpaid', 'Partially Paid': 'p-partial', Overdue: 'p-overdue', Cancelled: 'p-cancelled' }[inv.status] || 'p-unpaid';
                const balance = inv.amount - inv.paid;
                const pctPaid = inv.amount > 0 ? (inv.paid / inv.amount * 100) : 0;
                const isOverdue = new Date(inv.due) < new Date() && inv.status !== 'Paid' && inv.status !== 'Cancelled';
                const dueDisplay = isOverdue
                    ? `<span style="color:var(--orange)">${formatDate_inv(inv.due)}</span>`
                    : formatDate_inv(inv.due);
                const tr = document.createElement('tr');
                tr.dataset.id = inv.id;
                tr.style.animationDelay = (i * 0.035) + 's';
                tr.innerHTML = `
      <td style="padding-left:16px"><input type="checkbox" style="accent-color:var(--gold);cursor:pointer" onclick="event.stopPropagation()" onchange="updateBulkBar_inv()"></td>
      <td class="doc-num" onclick="editInvoice(${inv.id})">${inv.num}</td>
      <td onclick="editInvoice(${inv.id})">
        <div class="c-name">${inv.cust}</div>
        <div class="c-ref">${inv.num.replace('INV', 'REF')}</div>
      </td>
      <td onclick="editInvoice(${inv.id})" style="font-family:'DM Mono',monospace;font-size:11px;color:var(--text2)">${formatDate_inv(inv.date)}</td>
      <td onclick="editInvoice(${inv.id})" style="font-family:'DM Mono',monospace;font-size:11px">${dueDisplay}</td>
      <td onclick="editInvoice(${inv.id})"><span class="amount">$${inv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></td>
      <td onclick="editInvoice(${inv.id})">
        <div style="font-family:'DM Mono',monospace;font-size:12px;color:var(--green)">$${inv.paid.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        ${inv.paid > 0 && inv.paid < inv.amount ? `<div class="pay-bar-wrap"><div class="pay-bar" style="width:${pctPaid}%"></div></div>` : ''}
      </td>
      <td onclick="editInvoice(${inv.id})" style="font-family:'DM Mono',monospace;font-size:12px;color:${balance > 0 ? 'var(--orange)' : 'var(--text3)'}">
        ${balance > 0 ? '$' + balance.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '—'}
      </td>
      <td onclick="editInvoice(${inv.id})"><span class="pill ${sc}">${inv.status}</span></td>
      <td>
        <div class="row-actions">
          <div class="ib" title="Preview" onclick="previewDoc('invoice',${JSON.stringify(inv)})">👁</div>
          <div class="ib pay" title="Record Payment" onclick="showRecordPayment(${inv.id})">$</div>
          <div class="ib" title="Edit" onclick="editInvoice(${inv.id})">✎</div>
          <div class="ib" title="Duplicate" onclick="doDuplicate_inv(${inv.id})">⧉</div>
          <div class="ib" title="Download" onclick="downloadInvoicePDF(${inv.id})">↓</div>
          <div class="ib del" title="Delete" onclick="showDeleteModal_inv(${inv.id})">🗑</div>
        </div>
      </td>`;
                body.appendChild(tr);
            });
        }

        function formatDate_inv(d) {
            if (!d) return '—';
            return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }

        function filterTable_inv() {
            const el = document.getElementById('inv-searchInput');
            const q = el ? el.value.toLowerCase() : '';
            let data = _inv_currentFilter === 'all' ? invoices : invoices.filter(r => r.status === _inv_currentFilter);
            if (q) data = data.filter(r => r.num.toLowerCase().includes(q) || r.cust.toLowerCase().includes(q));
            renderTable_inv(data);
        }

        function filterStatus_inv(s, el) {
            document.querySelectorAll('#view-invoice .s-tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
            _inv_currentFilter = s;
            filterTable_inv();
        }

        function selAll_inv(cb) { document.querySelectorAll('#inv-tBody input[type=checkbox]').forEach(c => c.checked = cb.checked); updateBulkBar_inv(); }

        // ── Views ──
        function showList_invoice() {
            document.getElementById('inv-listView').style.display = 'flex';
            document.getElementById('inv-formView').style.display = 'none';
            document.getElementById('inv-list-btns').style.display = 'flex';
            document.getElementById('inv-form-btns').style.display = 'none';
            document.getElementById('inv-crumb').textContent = 'Invoices';
            renderTable_inv(invoices);
        }

        function showCreate_invoice() {
            document.getElementById('inv-listView').style.display = 'none';
            document.getElementById('inv-formView').style.display = 'flex';
            document.getElementById('inv-list-btns').style.display = 'none';
            document.getElementById('inv-form-btns').style.display = 'flex';
            document.getElementById('inv-crumb').textContent = 'New Invoice';
            const today = new Date().toISOString().split('T')[0];
            const due = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];
            document.getElementById('inv-fDate').value = today;
            document.getElementById('inv-fDue').value = due;
            _inv_selCustIdx = -1;
            _inv__inv_payments = [];
            resetCustomer_inv();
            document.getElementById('inv-itemsBody').innerHTML = '';
            renderPayments();
            setStatus_inv('Unpaid');
            addItem_inv(); addItem_inv();
            recalc_inv();
        }

        function editInvoice(id) {
            showCreate_invoice();
            const inv = invoices.find(r => r.id === id);
            if (!inv) return;
            document.getElementById('inv-crumb').textContent = inv.num;
            document.getElementById('inv-fNum').value = inv.num;
            document.getElementById('inv-sumDocNum').textContent = inv.num;
            const ci = invCustomers.findIndex(c => c.name === inv.cust);
            if (ci >= 0) { _inv_selCustIdx = ci; applyCust(invCustomers[ci]); }
            setStatus_inv(inv.status);
            if (inv.paid > 0) {
                _inv__inv_payments = [{ method: 'Bank Transfer', amount: inv.paid, date: inv.date, ref: 'TXN-001', note: '' }];
                renderPayments();
            }
            recalc_inv();
        }

        // ── Customer ──
        
        // ── Customer search dropdown ──
        function toggleCustSearch_inv() {
            const dd = document.getElementById('inv-cust-dropdown');
            const isOpen = dd.style.display !== 'none';
            if (isOpen) { closeCustSearch_inv(); return; }
            dd.style.display = 'block';
            renderCustList_inv('');
            setTimeout(() => {
                const inp = document.getElementById('inv-cust-search');
                if (inp) inp.focus();
            }, 50);
            document.addEventListener('click', closeCustSearch_inv_outside, { once: true });
        }
        function closeCustSearch_inv() {
            const dd = document.getElementById('inv-cust-dropdown');
            if (dd) dd.style.display = 'none';
        }
        function closeCustSearch_inv_outside(e) {
            const wrap = document.getElementById('inv-cust-wrap');
            if (wrap && !wrap.contains(e.target)) closeCustSearch_inv();
        }
        function searchCust_inv(q) {
            renderCustList_inv(q.toLowerCase());
        }
        function renderCustList_inv(q) {
            const list = document.getElementById('inv-cust-list');
            if (!list) return;
            const filtered = q
                ? invCustomers.filter(c =>
                    c.name.toLowerCase().includes(q) ||
                    c.code.toLowerCase().includes(q) ||
                    c.meta.toLowerCase().includes(q))
                : invCustomers;
            if (filtered.length === 0) {
                list.innerHTML = '<div style="padding:12px 14px;color:var(--text3);font-size:12px">No customers found</div>';
                return;
            }
            list.innerHTML = filtered.map(c => `
                <div class="cust-drop-item" onclick="selectCust_inv(${c.id})">
                    <div class="cust-av" style="width:30px;height:30px;font-size:11px;flex-shrink:0">${c.init}</div>
                    <div style="min-width:0">
                        <div style="font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.name}</div>
                        <div style="font-size:11px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.meta}</div>
                    </div>
                </div>`).join('');
        }
        function selectCust_inv(id) {
            const c = invCustomers.find(x => x.id === id);
            if (!c) return;
            _inv_selCustIdx = invCustomers.indexOf(c);
            applyCust(c);
            closeCustSearch_inv();
            const inp = document.getElementById('inv-cust-search');
            if (inp) inp.value = '';
        }
        function cycleCustomer_inv() {
            _inv_selCustIdx = (_inv_selCustIdx + 1) % invCustomers.length;
            applyCust(invCustomers[_inv_selCustIdx]);
        }
        function applyCust(c) {
            document.getElementById('inv-custAv').textContent = c.init;
            document.getElementById('inv-custNm').textContent = c.name;
            document.getElementById('inv-custMt').textContent = c.meta;
            document.getElementById('inv-fBill').value = c.addr;
            document.getElementById('inv-fShip').value = c.addr;
            document.getElementById('inv-custSel').classList.add('has-cust');
        }
        function resetCustomer_inv() {
            document.getElementById('inv-custAv').textContent = '?';
            document.getElementById('inv-custNm').textContent = 'Select a customer…';
            document.getElementById('inv-custMt').textContent = 'Click to choose';
            document.getElementById('inv-fBill').value = '';
            document.getElementById('inv-fShip').value = '';
            document.getElementById('inv-custSel').classList.remove('has-cust');
        }

        // ── Items ──
        let _inv_itemCounter = 0;
        function addItem_inv() {
            _inv_itemCounter++;
            const id = 'inv_item_' + _inv_itemCounter;
            const p = products[(_inv_itemCounter - 1) % products.length];
            const div = document.createElement('div');
            div.className = 'item-row'; div.id = id;
            div.innerHTML = `
    <div class="ic"><input type="text" value="${p.name}" placeholder="Product…" oninput="autoFill_inv('${id}',this.value)"></div>
    <div class="ic"><input type="number" value="1" min="0" step="1" oninput="calcRow_inv('${id}')" class="qty"></div>
    <div class="ic"><select onchange="calcRow_inv('${id}')"><option>Pcs</option><option>Kg</option><option>Ltr</option><option>Hrs</option><option>Box</option></select></div>
    <div class="ic"><input type="number" value="${p.price.toFixed(2)}" min="0" step="0.01" oninput="calcRow_inv('${id}')" class="uprice"></div>
    <div class="ic"><input type="number" value="0" min="0" max="100" step="0.1" oninput="calcRow_inv('${id}')" class="disc"></div>
    <div class="ic"><input type="number" value="${p.tax}" min="0" max="100" step="0.1" oninput="calcRow_inv('${id}')" class="tax"></div>
    <div class="ic"><input type="text" class="ro tot" readonly tabindex="-1"></div>
    <div class="ic"><button class="del-btn" onclick="removeItem_inv('${id}')">×</button></div>`;
            document.getElementById('inv-itemsBody').appendChild(div);
            calcRow_inv(id);
        }

        function removeItem_inv(id) {
            const el = document.getElementById(id);
            if (el) el.remove();
            recalc_inv();
        }

        function autoFill_inv(id, val) {
            const p = invProducts.find(x => x.name.toLowerCase().startsWith(val.toLowerCase()));
            if (p) {
                const row = document.getElementById(id);
                row.querySelector('.uprice').value = p.price.toFixed(2);
                row.querySelector('.tax').value = p.tax;
            }
            calcRow_inv(id);
        }

        function calcRow_inv(id) {
            const row = document.getElementById(id);
            if (!row) return;
            const qty = parseFloat(row.querySelector('.qty').value) || 0;
            const price = parseFloat(row.querySelector('.uprice').value) || 0;
            const disc = parseFloat(row.querySelector('.disc').value) || 0;
            const tax = parseFloat(row.querySelector('.tax').value) || 0;
            const base = price * qty * (1 - disc / 100);
            row.querySelector('.tot').value = '$' + (base * (1 + tax / 100)).toFixed(2);
            recalc_inv();
        }

        function recalc_inv() {
            let subtotal = 0, itemDisc = 0, taxTotal = 0;
            document.querySelectorAll('#inv-itemsBody .item-row').forEach(row => {
                const qty = parseFloat(row.querySelector('.qty').value) || 0;
                const price = parseFloat(row.querySelector('.uprice').value) || 0;
                const disc = parseFloat(row.querySelector('.disc').value) || 0;
                const tax = parseFloat(row.querySelector('.tax').value) || 0;
                const gross = price * qty;
                const dAmt = gross * disc / 100;
                const base = gross - dAmt;
                subtotal += gross; itemDisc += dAmt; taxTotal += base * tax / 100;
            });
            const afterItemDisc = subtotal - itemDisc;
            const oDiscPct = parseFloat(document.getElementById('inv-fODisc') ? document.getElementById('inv-fODisc').value : 0) || 0;
            const oDiscAmt = afterItemDisc * oDiscPct / 100;
            const shipping = parseFloat(document.getElementById('inv-fShipping') ? document.getElementById('inv-fShipping').value : 0) || 0;
            const adjust = parseFloat(document.getElementById('inv-fAdjust') ? document.getElementById('inv-fAdjust').value : 0) || 0;
            const lateFeeEl = document.getElementById('inv-fLateFee');
            const lateFeeRate = lateFeeEl ? (parseFloat(lateFeeEl.value) || 0) : 0;
            const lateFee = afterItemDisc * lateFeeRate / 100;
            _inv_grandTotal = Math.max(0, afterItemDisc - oDiscAmt + taxTotal + shipping + adjust + lateFee);
            const totalPaid = _inv__inv_payments.reduce((a, p) => a + p.amount, 0);
            const balance = Math.max(0, _inv_grandTotal - totalPaid);

            const f = v => '$' + Math.abs(v).toFixed(2);
            document.getElementById('cSub').textContent = f(subtotal);
            document.getElementById('cIDisc').textContent = '−' + f(itemDisc);
            document.getElementById('cODisc').textContent = '−' + f(oDiscAmt);
            document.getElementById('cTax').textContent = '+' + f(taxTotal);
            document.getElementById('cShip').textContent = f(shipping);
            document.getElementById('cLate').textContent = lateFee > 0 ? '+' + f(lateFee) : '$0.00';
            document.getElementById('cAdj').textContent = (adjust >= 0 ? '+' : '−') + f(adjust);
            document.getElementById('inv-cGrand').textContent = '$' + _inv_grandTotal.toFixed(2);
            document.getElementById('inv-cDue').textContent = '$' + balance.toFixed(2);
            document.getElementById('inv-cWords').textContent = toWords_inv(_inv_grandTotal);

            const pct = _inv_grandTotal > 0 ? Math.min(100, totalPaid / _inv_grandTotal * 100) : 0;
            document.getElementById('inv-ppPaid').textContent = '$' + totalPaid.toFixed(2);
            document.getElementById('inv-ppBar').style.width = pct + '%';
            document.getElementById('inv-ppPct').textContent = Math.round(pct) + '% of total paid';
            document.getElementById('inv-payModalSub').textContent =
                `Invoice ${document.getElementById('inv-fNum').value} · Balance: $${balance.toFixed(2)}`;
            document.getElementById('inv-payRemain').textContent = '$' + balance.toFixed(2);
        }

        // ── Payments ──
        function renderPayments() {
            const el = document.getElementById('inv-paymentsList');
            if (!el) return;
            if (_inv__inv_payments.length === 0) {
                el.innerHTML = '<div style="padding:20px 16px;text-align:center;color:var(--text3);font-size:12px;font-family:\'DM Mono\',monospace">No payments recorded yet</div>';
                return;
            }
            el.innerHTML = '';
            const icons = { 'Bank Transfer': '🏦', 'Cash': '💵', 'Card': '💳', 'UPI': '📱', 'Cheque': '📄', 'PayPal': '🅿', 'Crypto': '₿', 'Other': '⚬' };
            _inv__inv_payments.forEach((p, i) => {
                const div = document.createElement('div');
                div.className = 'pt-row';
                div.style.animationDelay = (i * 0.05) + 's';
                div.innerHTML = `
      <div class="pt-method">
        <div class="method-icon" style="background:rgba(62,207,142,.1)">${icons[p.method] || '⚬'}</div>
        <div>
          <div style="font-weight:500">${p.method}</div>
          <div class="pt-date">${p.ref ? p.ref + ' · ' : ''}${formatDate_inv(p.date)}</div>
        </div>
      </div>
      <span class="pt-amount">+$${p.amount.toFixed(2)}</span>
      <button class="pt-del" onclick="removePayment(${i})">×</button>`;
                el.appendChild(div);
            });
        }

        function removePayment(i) {
            _inv__inv_payments.splice(i, 1);
            renderPayments();
            recalc_inv();
        }

        // ── Status ──
        function setStatus_inv(s) {
            _inv_currentStatus = s;
            const map = { Paid: 'spaid', Unpaid: 'sunpaid', 'Partially Paid': 'spartial', Cancelled: 'scancel' };
            ['inv-sPaid', 'inv-sUnpaid', 'inv-sPartial', 'inv-sCancel'].forEach(id => {
                document.getElementById(id).className = 's-btn';
            });
            const idMap = { Paid: 'inv-sPaid', Unpaid: 'inv-sUnpaid', 'Partially Paid': 'inv-sPartial', Cancelled: 'inv-sCancel' };
            const el = document.getElementById(idMap[s]);
            if (el) el.className = 's-btn ' + map[s];
        }

        // ── Payment modal ──
        let _inv_activePayInvoiceId = null;
        function showRecordPayment(id) {
            // If called from list view with a real invoice id, open that invoice first
            if (id && id !== 'current' && typeof editInvoice === 'function') {
                const inv = invoices.find(x => x.id === id);
                if (inv) {
                    editInvoice(id);
                    setTimeout(() => showRecordPayment('current'), 300);
                    return;
                }
            }
            _inv_activePayInvoiceId = id;
            const payAmtEl = document.getElementById('inv-payAmount');
            const payRefEl = document.getElementById('inv-payRef');
            const payNoteEl = document.getElementById('inv-payNote');
            const payDateEl = document.getElementById('inv-payDate');
            const payModal = document.getElementById('inv-payModal');
            if (!payModal) { showToast('Payment modal not available. Open an invoice first.'); return; }
            if (payAmtEl) payAmtEl.value = '';
            if (payRefEl) payRefEl.value = '';
            if (payNoteEl) payNoteEl.value = '';
            if (payDateEl) payDateEl.value = new Date().toISOString().split('T')[0];
            const balance = Math.max(0, _inv_grandTotal - _inv__inv_payments.reduce((a, p) => a + p.amount, 0));
            const payRemainEl = document.getElementById('inv-payRemain');
            if (payRemainEl) payRemainEl.textContent = '$' + balance.toFixed(2);
            payModal.classList.add('show');
        }

        function selMethod(el, name) {
            document.querySelectorAll('.method-opt').forEach(m => m.classList.remove('selected'));
            el.classList.add('selected');
            _inv_selectedMethod = name;
        }

        function updatePayBalance() {
            const amt = parseFloat(document.getElementById('inv-payAmount').value) || 0;
            const balance = Math.max(0, _inv_grandTotal - _inv__inv_payments.reduce((a, p) => a + p.amount, 0));
            const remain = Math.max(0, balance - amt);
            const el = document.getElementById('inv-payRemain');
            if (el) { el.textContent = '$' + remain.toFixed(2); el.style.color = remain <= 0 ? 'var(--green)' : 'var(--text)'; }
        }

        function confirmPayment() {
            const amt = parseFloat(document.getElementById('inv-payAmount').value) || 0;
            if (amt <= 0) { showToast('Enter a valid payment amount', false); return; }
            const p = {
                method: _inv_selectedMethod,
                amount: amt,
                date: document.getElementById('inv-payDate').value,
                ref: document.getElementById('inv-payRef').value,
                note: document.getElementById('inv-payNote').value
            };
            _inv__inv_payments.push(p);
            renderPayments();
            recalc_inv();
            closeModal_inv();
            const totalPaid = _inv__inv_payments.reduce((a, x) => a + x.amount, 0);
            if (totalPaid >= _inv_grandTotal) setStatus_inv('Paid');
            else if (totalPaid > 0) setStatus_inv('Partially Paid');
            showToast(`Payment of $${amt.toFixed(2)} recorded via ${_inv_selectedMethod}`, true);
        }

        // ── Modals ──
        function showDeleteModal_inv(id) {
            _inv_deleteTargetId = id;
            const inv = invoices.find(r => r.id === id);
            document.getElementById('inv-deleteTarget').textContent = inv ? inv.num : 'this invoice';
            document.getElementById('deleteModal').classList.add('show');
        }
        function closeModal_inv() {
            document.getElementById('inv-payModal').classList.remove('show');
            document.getElementById('inv-deleteModal').classList.remove('show');
        }
        function confirmDelete_inv() {
            if (_inv_deleteTargetId) {
                const idx = invoices.findIndex(x => x.id === _inv_deleteTargetId);
                if (idx >= 0) invoices.splice(idx, 1);
                _inv_deleteTargetId = null;
            }
            closeModal_inv(); showToast('Invoice deleted'); showList_invoice();
        }

        // ── Actions ──
        function doSave_inv(t) {
            const num  = document.getElementById('inv-fNum').value.trim();
            const date = document.getElementById('inv-fDate').value;
            const due  = document.getElementById('inv-fDue').value;
            const cust = document.getElementById('inv-custNm').textContent;
            if (cust === 'Select a customer…' && t !== 'draft') {
                showToast('Please select a customer first', 'err'); return;
            }
            const totalPaid = _inv__inv_payments.reduce((a,p) => a + p.amount, 0);
            const status = t === 'draft' ? 'Unpaid'
                : totalPaid >= _inv_grandTotal && _inv_grandTotal > 0 ? 'Paid'
                : totalPaid > 0 ? 'Partially Paid' : _inv_currentStatus;
            const existing = invoices.find(x => x.num === num);
            if (existing) {
                existing.date = date; existing.due = due; existing.cust = cust;
                existing.amount = _inv_grandTotal; existing.paid = totalPaid; existing.status = status;
            } else {
                const newId = Math.max(0, ...invoices.map(x => x.id)) + 1;
                invoices.unshift({ id: newId, num, cust, date, due, amount: _inv_grandTotal, paid: totalPaid, status });
                // bump next invoice number
                const nextNum = parseInt(num.replace(/[^0-9]/g,'')) + 1;
                document.getElementById('inv-fNum').value = 'INV-2024-' + String(nextNum).padStart(4,'0');
            }
            showToast(t === 'draft' ? 'Draft saved' : 'Invoice saved ✓', true);
            if (t !== 'draft') showList_invoice();
        }
        function doShare_inv() {
            // Get current invoice data from the form
            const custEl = document.getElementById('inv-custNm');
            if (custEl && custEl.textContent === 'Select a customer…') {
                showToast('Please select a customer first', 'err');
                return;
            }
            const items = getFormItems_inv();
            const inv = {
                num: document.getElementById('inv-fNum').value,
                cust: custEl ? custEl.textContent : 'Unknown',
                date: document.getElementById('inv-fDate').value,
                due: document.getElementById('inv-fDue').value,
                amount: _inv_grandTotal,
                paid: _inv__inv_payments.reduce((a,p) => a + p.amount, 0),
                status: _inv_currentStatus,
                items: items
            };
            previewDoc('invoice', inv);
            setTimeout(() => {
                downloadPDFDirect('invoice', { num: inv.num, cust: inv.cust });
            }, 100);
        }
        
        function getFormItems_inv() {
            const items = [];
            document.querySelectorAll('#inv-itemsBody .item-row').forEach(row => {
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
        function doDuplicate_inv(invId) {
            let num, cust, amount;
            if (invId) {
                // Called from row actions - find the invoice and duplicate it
                const inv = invoices.find(x => x.id === invId);
                if (!inv) { showToast('Invoice not found', 'err'); return; }
                num = inv.num;
                cust = inv.cust;
                amount = inv.amount;
            } else {
                // Called from form - use form values
                num = document.getElementById('inv-fNum').value;
                cust = document.getElementById('inv-custNm').textContent;
                amount = _inv_grandTotal;
            }
            const newId  = Math.max(0, ...invoices.map(x => x.id)) + 1;
            const newNum = 'INV-2024-' + String(newId + 18).padStart(4,'0');
            const date   = new Date().toISOString().split('T')[0];
            const due    = new Date(Date.now() + 30*86400000).toISOString().split('T')[0];
            invoices.unshift({ id: newId, num: newNum, cust, date, due, amount, paid: 0, status: 'Unpaid' });
            showToast('Duplicated as ' + newNum, true);
            showList_invoice();
        }
        function downloadInvoicePDF(invId) {
            const inv = invoices.find(x => x.id === invId);
            if (!inv) { showToast('Invoice not found', 'err'); return; }
            previewDoc('invoice', inv);
            setTimeout(() => {
                downloadPDFDirect('invoice', { num: inv.num, cust: inv.cust });
            }, 100);
        }

        // ── Helpers ──
        function toWords_inv(n) {
            if (n === 0) return 'Zero Dollars';
            const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
            const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
            function chunk_inv(num) {
                if (num === 0) return '';
                if (num < 20) return ones[num] + ' ';
                if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '') + ' ';
                return ones[Math.floor(num / 100)] + ' Hundred ' + chunk_inv(num % 100);
            }
            const d = Math.floor(n), c = Math.round((n - d) * 100);
            let w = '';
            if (d >= 1000000) w += chunk_inv(Math.floor(d / 1000000)) + 'Million ';
            if (d >= 1000) w += chunk_inv(Math.floor((d % 1000000) / 1000)) + 'Thousand ';
            w += chunk_inv(d % 1000);
            w = w.trim() + ' Dollar' + (d !== 1 ? 's' : '');
            if (c > 0) w += ' and ' + chunk_inv(c).trim() + ' Cent' + (c !== 1 ? 's' : '');
            return w.replace(/\s+/g, ' ').trim();
        }

        let _inv_toastTimer;
        function toast_inv_orig(msg, ok) {
            const el = document.createElement('div');
            el.className = 'toast' + (ok ? ' ok' : ok === false ? ' err' : '');
            el.innerHTML = `<span>${ok ? '✓' : 'ℹ'}</span> ${msg}`;
            document.body.appendChild(el);
            clearTimeout(_inv_toastTimer);
            _inv_toastTimer = setTimeout(() => el.remove(), 3000);
        }

        // ── Init: deferred to navTo ──
