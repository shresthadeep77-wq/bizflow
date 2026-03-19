        // ═══════════════════════════════════════════
        // TERMS MODULE
        // ═══════════════════════════════════════════

        let termsData = [
            { id: 1, name: 'Standard Net 30', paymentTerm: 'Net 30', description: 'Payment due within 30 days of invoice', lateFee: 1.5, discount: 0, created: '2024-01-15', status: 'Active' },
            { id: 2, name: 'Net 60 - Enterprise', paymentTerm: 'Net 60', description: 'Extended terms for enterprise customers', lateFee: 1.0, discount: 2, created: '2024-01-20', status: 'Active' },
            { id: 3, name: 'Immediate Payment', paymentTerm: 'Due on Receipt', description: 'Payment required upon invoice receipt', lateFee: 0, discount: 3, created: '2024-02-01', status: 'Active' },
            { id: 4, name: 'Net 15 - Discount', paymentTerm: 'Net 15 / 2% 10', description: '2% discount if paid within 10 days, otherwise Net 15', lateFee: 2, discount: 2, created: '2024-02-05', status: 'Active' }
        ];

        let _terms_currentFilter = 'all';
        let termsSelectedId = null;
        let _terms_deleteTargetId = null;

        // ── Filters ──
        function filterStatus_terms(status, el) {
            document.querySelectorAll('#view-terms .s-tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
            _terms_currentFilter = status;
            filterTable_terms();
        }

        function filterTable_terms() {
            const q = document.getElementById('terms-searchInput')?.value.toLowerCase() || '';
            let data = _terms_currentFilter === 'all' ? termsData : termsData.filter(t => t.status === _terms_currentFilter);
            if (q) data = data.filter(t => t.name.toLowerCase().includes(q) || t.paymentTerm.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
            renderTable_terms(data);
        }

        function searchTerms(query) {
            filterTable_terms();
        }

        // ── Table ──
        function renderTable_terms(data) {
            const tbody = document.getElementById('terms-tBody');
            if (!tbody) return;
            tbody.innerHTML = '';
            data.forEach((term, i) => {
                const tr = document.createElement('tr');
                tr.dataset.id = term.id;
                tr.style.animationDelay = (i * 0.035) + 's';
                tr.innerHTML = `
      <td style="padding-left:16px"><input type="checkbox" style="accent-color:var(--gold);cursor:pointer" onclick="event.stopPropagation()" onchange="updateTermsBulk()"></td>
      <td class="doc-num" onclick="editTerm(${term.id})">${term.name}</td>
      <td onclick="editTerm(${term.id})">
        <div class="c-name">${term.paymentTerm}</div>
        <div class="c-ref">${term.description.substring(0, 40)}…</div>
      </td>
      <td onclick="editTerm(${term.id})" style="font-family:'DM Mono',monospace;font-size:11px;color:var(--text2)">${term.created}</td>
      <td onclick="editTerm(${term.id})" style="text-align:center">
        <span style="font-family:'DM Mono',monospace;font-size:12px;color:var(--orange)">${term.lateFee}%</span>
      </td>
      <td onclick="editTerm(${term.id})" style="text-align:center">
        <span style="font-family:'DM Mono',monospace;font-size:12px;color:var(--green)">-${term.discount}%</span>
      </td>
      <td onclick="editTerm(${term.id})"><span class="pill p-active">${term.status}</span></td>
      <td>
        <div class="row-actions">
          <div class="ib" title="Edit" onclick="editTerm(${term.id})">✎</div>
          <div class="ib" title="Duplicate" onclick="duplicateTerm(${term.id})">⧉</div>
          <div class="ib del" title="Delete" onclick="showDeleteModal_terms(${term.id})">🗑</div>
        </div>
      </td>`;
                tbody.appendChild(tr);
            });
        }

        // ── VIEWS ──
        function showList_terms() {
            document.getElementById('terms-listView').style.display = 'flex';
            document.getElementById('terms-formView').style.display = 'none';
            document.getElementById('terms-list-btns').style.display = 'flex';
            document.getElementById('terms-form-btns').style.display = 'none';
            filterTable_terms();
        }

        function showCreate_terms() {
            termsSelectedId = null;
            _terms_deleteTargetId = null;
            document.getElementById('terms-fName').value = '';
            document.getElementById('terms-fPayTerm').value = 'Net 30';
            document.getElementById('terms-fDesc').value = '';
            document.getElementById('terms-fLateFee').value = 0;
            document.getElementById('terms-fDiscount').value = 0;
            document.getElementById('terms-formView').style.display = 'flex';
            document.getElementById('terms-listView').style.display = 'none';
            document.getElementById('terms-list-btns').style.display = 'none';
            document.getElementById('terms-form-btns').style.display = 'flex';
            document.getElementById('terms-title').textContent = 'Create Payment Term';
        }

        function editTerm(id) {
            const term = termsData.find(t => t.id === id);
            if (!term) return;
            termsSelectedId = id;
            document.getElementById('terms-fName').value = term.name;
            document.getElementById('terms-fPayTerm').value = term.paymentTerm;
            document.getElementById('terms-fDesc').value = term.description;
            document.getElementById('terms-fLateFee').value = term.lateFee;
            document.getElementById('terms-fDiscount').value = term.discount;
            document.getElementById('terms-formView').style.display = 'flex';
            document.getElementById('terms-listView').style.display = 'none';
            document.getElementById('terms-list-btns').style.display = 'none';
            document.getElementById('terms-form-btns').style.display = 'flex';
            document.getElementById('terms-title').textContent = 'Edit Payment Term';
        }

        // ── Actions ──
        function doSave_terms() {
            const name = document.getElementById('terms-fName').value.trim();
            const payTerm = document.getElementById('terms-fPayTerm').value;
            const desc = document.getElementById('terms-fDesc').value.trim();
            const lateFee = parseFloat(document.getElementById('terms-fLateFee').value) || 0;
            const discount = parseFloat(document.getElementById('terms-fDiscount').value) || 0;

            if (!name) { showToast('Please enter a term name', 'err'); return; }

            if (termsSelectedId) {
                // Update existing
                const term = termsData.find(t => t.id === termsSelectedId);
                if (term) {
                    term.name = name;
                    term.paymentTerm = payTerm;
                    term.description = desc;
                    term.lateFee = lateFee;
                    term.discount = discount;
                }
            } else {
                // Create new
                const newId = Math.max(0, ...termsData.map(t => t.id)) + 1;
                const today = new Date().toISOString().split('T')[0];
                termsData.unshift({ id: newId, name, paymentTerm: payTerm, description: desc, lateFee, discount, created: today, status: 'Active' });
            }

            showToast(termsSelectedId ? 'Term updated ✓' : 'Term created ✓', true);
            showList_terms();
        }

        function duplicateTerm(id) {
            const term = termsData.find(t => t.id === id);
            if (!term) return;
            const newId = Math.max(0, ...termsData.map(t => t.id)) + 1;
            const today = new Date().toISOString().split('T')[0];
            termsData.unshift({
                id: newId,
                name: term.name + ' (Copy)',
                paymentTerm: term.paymentTerm,
                description: term.description,
                lateFee: term.lateFee,
                discount: term.discount,
                created: today,
                status: 'Active'
            });
            showToast('Term duplicated ✓', true);
            showList_terms();
        }

        function showDeleteModal_terms(id) {
            _terms_deleteTargetId = id;
            const modal = document.getElementById('terms-deleteModal');
            if (modal) modal.classList.add('show');
        }

        function closeModal_terms() {
            const payModal = document.getElementById('terms-payModal');
            const deleteModal = document.getElementById('terms-deleteModal');
            if (payModal) payModal.classList.remove('show');
            if (deleteModal) deleteModal.classList.remove('show');
        }

        function confirmDelete_terms() {
            if (_terms_deleteTargetId) {
                const idx = termsData.findIndex(t => t.id === _terms_deleteTargetId);
                if (idx >= 0) termsData.splice(idx, 1);
                _terms_deleteTargetId = null;
            }
            closeModal_terms();
            showToast('Term deleted', true);
            showList_terms();
        }

        // ── Bulk ──
        function updateTermsBulk() {
            const n = document.querySelectorAll('#terms-tBody input[type=checkbox]:checked').length;
            const bar = document.getElementById('terms-bulk-bar');
            const cnt = document.getElementById('terms-bulk-count');
            if (bar) bar.style.display = n > 0 ? 'flex' : 'none';
            if (cnt) cnt.textContent = n + ' selected';
        }

        function clearSelTerms() {
            document.querySelectorAll('#terms-tBody input[type=checkbox]').forEach(cb => cb.checked = false);
            const hdr = document.querySelector('#view-terms thead input[type=checkbox]');
            if (hdr) hdr.checked = false;
            updateTermsBulk();
        }

        function getSelTerms() {
            return Array.from(document.querySelectorAll('#terms-tBody input[type=checkbox]:checked'))
                .map(cb => termsData.find(t => t.id == cb.closest('tr').dataset.id)).filter(Boolean);
        }

        function bulkDelete_terms() {
            const sel = getSelTerms();
            if (!confirm('Delete ' + sel.length + ' term' + (sel.length > 1 ? 's' : '') + '?')) return;
            sel.forEach(term => { const i = termsData.findIndex(t => t.id === term.id); if (i >= 0) termsData.splice(i, 1); });
            clearSelTerms();
            showList_terms();
            showToast(sel.length + ' deleted', true);
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', () => {
            const listView = document.getElementById('terms-listView');
            if (listView) showList_terms();
        });
