/* BizFlow — products.js */

// ── DATA ──
        const catGroups = [
            { id: 'all', name: 'All Products', icon: '⊟', count: 245, parent: null },
            { id: 'elec', name: 'Electronics', icon: '⚡', count: 89, parent: null },
            { id: 'mobile', name: 'Mobile Phones', icon: '📱', count: 34, parent: 'elec' },
            { id: 'laptops', name: 'Laptops', icon: '💻', count: 23, parent: 'elec' },
            { id: 'acc', name: 'Accessories', icon: '🎧', count: 32, parent: 'elec' },
            { id: 'cloth', name: 'Clothing', icon: '👕', count: 67, parent: null },
            { id: 'men', name: 'Men', icon: '👔', count: 28, parent: 'cloth' },
            { id: 'women', name: 'Women', icon: '👗', count: 31, parent: 'cloth' },
            { id: 'kids', name: 'Kids', icon: '🧒', count: 8, parent: 'cloth' },
            { id: 'svc', name: 'Services', icon: '🔧', count: 89, parent: null },
            { id: 'consult', name: 'Consulting', icon: '💼', count: 45, parent: 'svc' },
            { id: 'maint', name: 'Maintenance', icon: '🛠', count: 44, parent: 'svc' },
        ];

        const prodData = [
            { id: 1, code: 'PRD001', name: 'MacBook Pro 14"', emoji: '💻', cat: 'Electronics', grp: 'Laptops', price: 1999.00, cost: 1400.00, taxRate: 10, stock: 24, lowAlert: 5, rack: 'B-04', barcode: '100001', hsn: '8471', sku: 'MBP-14-2024', status: 'Active', _prod_tags: ['Popular', 'New'], taxInc: false, wholesale: 1799, wholeQty: 3, special: 0, specialDate: '', desc: 'Apple M3 Pro chip, 14-inch Liquid Retina XDR display.' },
            { id: 2, code: 'PRD002', name: 'iPhone 15 Pro', emoji: '📱', cat: 'Electronics', grp: 'Mobile Phones', price: 999.00, cost: 720.00, taxRate: 10, stock: 48, lowAlert: 10, rack: 'A-01', barcode: '100002', hsn: '8517', sku: 'IP15P-256', status: 'Active', _prod_tags: ['Popular', 'Sale'], taxInc: false, wholesale: 920, wholeQty: 5, special: 899, specialDate: '2025-01-31', desc: 'Titanium design, A17 Pro chip, 48MP main camera.' },
            { id: 3, code: 'PRD003', name: 'AirPods Pro 2', emoji: '🎧', cat: 'Electronics', grp: 'Accessories', price: 249.00, cost: 160.00, taxRate: 10, stock: 67, lowAlert: 15, rack: 'A-05', barcode: '100003', hsn: '8518', sku: 'APP2-2024', status: 'Active', _prod_tags: ['Popular'], taxInc: false, wholesale: 229, wholeQty: 10, special: 0, specialDate: '', desc: 'Active Noise Cancellation, Adaptive Audio, USB-C.' },
            { id: 4, code: 'PRD004', name: 'UX Design Services', emoji: '🎨', cat: 'Services', grp: 'Consulting', price: 150.00, cost: 0, taxRate: 18, stock: 999, lowAlert: 0, rack: '—', barcode: '', hsn: '9983', sku: 'SVC-UX-HR', status: 'Active', _prod_tags: ['Service'], taxInc: true, wholesale: 130, wholeQty: 20, special: 0, specialDate: '', desc: 'Professional UX/UI design consultation per hour.' },
            { id: 5, code: 'PRD005', name: 'Annual Maintenance Plan', emoji: '🛠', cat: 'Services', grp: 'Maintenance', price: 500.00, cost: 0, taxRate: 5, stock: 999, lowAlert: 0, rack: '—', barcode: '', hsn: '9985', sku: 'SVC-MAINT-Y', status: 'Active', _prod_tags: ['Service'], taxInc: true, wholesale: 450, wholeQty: 5, special: 0, specialDate: '', desc: 'Comprehensive annual maintenance and support plan.' },
            { id: 6, code: 'PRD006', name: 'Ergo Office Chair', emoji: '🪑', cat: 'Furniture', grp: 'Accessories', price: 349.00, cost: 210.00, taxRate: 12, stock: 8, lowAlert: 10, rack: 'W-12', barcode: '100006', hsn: '9401', sku: 'CHAIR-ERG-01', status: 'Active', _prod_tags: ['Sale'], taxInc: false, wholesale: 299, wholeQty: 5, special: 319, specialDate: '2025-01-15', desc: 'Lumbar support, adjustable armrests, mesh back.' },
            { id: 7, code: 'PRD007', name: 'Wireless Keyboard MX', emoji: '⌨', cat: 'Electronics', grp: 'Accessories', price: 89.00, cost: 52.00, taxRate: 12, stock: 3, lowAlert: 10, rack: 'A-08', barcode: '100007', hsn: '8471', sku: 'KB-MX-BLK', status: 'Active', _prod_tags: ['Low Stock'], taxInc: false, wholesale: 75, wholeQty: 10, special: 0, specialDate: '', desc: 'Logitech MX Keys, multi-device, backlit keys.' },
            { id: 8, code: 'PRD008', name: 'USB-C Hub 7-in-1', emoji: '🔌', cat: 'Electronics', grp: 'Accessories', price: 59.00, cost: 28.00, taxRate: 12, stock: 0, lowAlert: 20, rack: 'A-09', barcode: '100008', hsn: '8544', sku: 'HUB-7C-SLV', status: 'Active', _prod_tags: ['Out of Stock'], taxInc: false, wholesale: 49, wholeQty: 20, special: 0, specialDate: '', desc: '4K HDMI, 3×USB-A, SD card, 100W PD charging.' },
            { id: 9, code: 'PRD009', name: 'Men\'s Classic Tee', emoji: '👕', cat: 'Clothing', grp: 'Men', price: 29.00, cost: 12.00, taxRate: 5, stock: 145, lowAlert: 30, rack: 'C-01', barcode: '100009', hsn: '6109', sku: 'TEE-M-CLK-L', status: 'Active', _prod_tags: ['Popular'], taxInc: true, wholesale: 22, wholeQty: 20, special: 0, specialDate: '', desc: '100% organic cotton, pre-washed, relaxed fit.' },
            { id: 10, code: 'PRD010', name: 'Samsung 27" Monitor', emoji: '🖥', cat: 'Electronics', grp: 'Accessories', price: 449.00, cost: 310.00, taxRate: 10, stock: 12, lowAlert: 5, rack: 'B-02', barcode: '100010', hsn: '8528', sku: 'MON-27-4K', status: 'Active', _prod_tags: ['New'], taxInc: false, wholesale: 399, wholeQty: 3, special: 429, specialDate: '2025-02-28', desc: '4K UHD IPS panel, 144Hz, USB-C, FreeSync.' },
            { id: 11, code: 'PRD011', name: 'Tech Support (Per Hr)', emoji: '💬', cat: 'Services', grp: 'Maintenance', price: 80.00, cost: 0, taxRate: 18, stock: 999, lowAlert: 0, rack: '—', barcode: '', hsn: '9983', sku: 'SVC-TECH-HR', status: 'Active', _prod_tags: ['Service'], taxInc: true, wholesale: 70, wholeQty: 10, special: 0, specialDate: '', desc: 'On-site or remote technical support.' },
            { id: 12, code: 'PRD012', name: 'Vintage Denim Jacket', emoji: '🧥', cat: 'Clothing', grp: 'Men', price: 119.00, cost: 65.00, taxRate: 5, stock: 22, lowAlert: 10, rack: 'C-08', barcode: '100012', hsn: '6201', sku: 'DJKT-M-VTG', status: 'Inactive', _prod_tags: [], taxInc: true, wholesale: 99, wholeQty: 5, special: 0, specialDate: '', desc: 'Washed denim, oversized fit, vintage wash finish.' },
            { id: 13, code: 'PRD013', name: 'iPad Air 5th Gen', emoji: '📲', cat: 'Electronics', grp: 'Mobile Phones', price: 749.00, cost: 540.00, taxRate: 10, stock: 18, lowAlert: 5, rack: 'A-03', barcode: '100013', hsn: '8471', sku: 'IPAIR5-64', status: 'Active', _prod_tags: ['New'], taxInc: false, wholesale: 699, wholeQty: 3, special: 0, specialDate: '', desc: 'M1 chip, 10.9-inch Liquid Retina, Touch ID.' },
            { id: 14, code: 'PRD014', name: 'Standing Desk Motor', emoji: '🖥', cat: 'Furniture', grp: 'Accessories', price: 699.00, cost: 420.00, taxRate: 12, stock: 6, lowAlert: 5, rack: 'W-05', barcode: '100014', hsn: '9403', sku: 'DESK-SIT-STD', status: 'Discontinued', _prod_tags: ['Discontinued'], taxInc: false, wholesale: 0, wholeQty: 0, special: 0, specialDate: '', desc: 'Dual motor, anti-collision, programmable heights.' },
            { id: 15, code: 'PRD015', name: 'Women\'s Summer Dress', emoji: '👗', cat: 'Clothing', grp: 'Women', price: 69.00, cost: 32.00, taxRate: 5, stock: 55, lowAlert: 20, rack: 'C-15', barcode: '100015', hsn: '6204', sku: 'DRESS-W-SUM', status: 'Active', _prod_tags: ['Popular', 'Sale'], taxInc: true, wholesale: 55, wholeQty: 10, special: 59, specialDate: '2025-01-20', desc: 'Floral print, wrap style, midi length, breathable.' },
        ];

        const emojis = [
    // Tech & Electronics
    '📦','💻','📱','🎧','⌨','🖥','📲','🖨','🔌','🖱','💾','📡','🔋','📺','📻','🎙','📸','📷','🎥','⌚',
    // Food & Grocery
    '🍎','🥦','🧴','☕','🍕','🥤','🍫','🍞','🥩','🧀','🍳','🫙','🧂','🫒','🥗',
    // Fashion & Apparel
    '👕','👔','👗','🧥','👟','👠','👒','🧤','🧢','👜','👓','💍','⌚','🧣','🎩',
    // Home & Furniture
    '🪑','🛋','🪞','🛏','🪴','🕯','🖼','🪟','🚿','🪣','🧺','🔑','🛁','🚪','💡',
    // Tools & Hardware
    '🛠','🔧','🔨','⚙','🪛','🪚','🔩','🧲','🪜','🔦','🔬','🧰','🪝','🔭','🪤',
    // Health & Beauty
    '💊','🧴','🩺','🩹','🧪','💉','🪥','🧼','🧹','🪒','💄','🫀','🧬','🩻','🌡',
    // Sports & Outdoors
    '⚽','🏀','🎮','🎯','🏋','🚴','⛺','🏊','🎸','🎺','🏄','🤸','🎽','🏆','🎣',
    // Books & Office
    '📚','📓','📋','📌','✏','📐','🗂','🗃','📎','✂','🖊','📝','🗄','📁','🗑',
    // Services & Business
    '💼','🏢','💰','📊','📈','💳','🤝','📣','🎯','🏪','🏭','🚚','✈','🛳','🏗',
    // Nature & Animals
    '🌿','🌱','🌸','🍃','🌍','♻','🌊','🌈','⭐','🌙','☀','🐾','🦋','🐝','🌺',
];

        // ── STATE ──
        let _prod_selectedGroup = 'all';
        let selectedProdId = null;
        let _prod_editingId = null;
        let _prod_tags = [];
        let _prod_taxMode = 'inc';
        let _prod_selectedEmoji = '📦';
        let _prod_currentView = 'table';
        let _prod_delTargetId = null;

        // ── GROUP TREE ──
        function renderGroups_prod(filter) {
            filter = filter || '';
            const tree = document.getElementById('prod-groupTree');
            if (!tree) return;
            tree.innerHTML = '';
            const allCount = prodData.length;
            const topGroups = catGroups.filter(function(g) {
                return g.parent === null && (!filter || g.name.toLowerCase().includes(filter.toLowerCase()));
            });
            topGroups.forEach(function(g) {
                const children = catGroups.filter(function(ch) { return ch.parent === g.id; });
                const gCount = g.id === 'all' ? allCount
                    : prodData.filter(function(p) {
                        return p.cat === g.name || children.some(function(ch){ return ch.name === p.grp; });
                      }).length;

                const node = document.createElement('div');
                node.className = 'group-node';

                // Parent row
                const row = document.createElement('div');
                row.className = 'group-row' + (_prod_selectedGroup === g.id ? ' active' : '');
                row.innerHTML = '<span class="g-icon">' + g.icon + '</span>'
                    + '<span class="g-name">' + g.name + '</span>'
                    + '<span class="g-count">' + gCount + '</span>';
                row.onclick = (function(gid){ return function(){ selectGroup_prod(gid); }; })(g.id);
                node.appendChild(row);

                // Children
                if (children.length) {
                    const childWrap = document.createElement('div');
                    childWrap.className = 'g-children';
                    children.forEach(function(ch) {
                        const chCount = prodData.filter(function(p){ return p.grp === ch.name; }).length;
                        const chRow = document.createElement('div');
                        chRow.className = 'group-row' + (_prod_selectedGroup === ch.id ? ' active' : '');
                        chRow.innerHTML = '<span class="g-icon" style="font-size:11px">' + ch.icon + '</span>'
                            + '<span class="g-name">' + ch.name + '</span>'
                            + '<span class="g-count">' + chCount + '</span>';
                        chRow.onclick = (function(cid){ return function(){ selectGroup_prod(cid); }; })(ch.id);
                        childWrap.appendChild(chRow);
                    });
                    node.appendChild(childWrap);
                }
                tree.appendChild(node);
            });
        }

        function selectGroup_prod(id) {
            _prod_selectedGroup = id;
            renderGroups_prod();
            filterProducts_prod();
        }

        function showList_prod() {
            document.getElementById('prod-tableView').style.display = 'block';
            document.getElementById('prod-cardView').style.display = 'none';
            document.getElementById('prod-tvBtn').classList.add('active');
            document.getElementById('prod-cvBtn').classList.remove('active');
            updateProdBadge();
            try { renderGroups_prod(); } catch(e) { console.error('renderGroups_prod error:', e); }
            filterProducts_prod();
        }
        function updateProdBadge() {
            const b = document.getElementById('prod-badge');
            if (b) b.textContent = prodData.length;
        }

        // ── FILTER ──
        function filterProducts_prod() {
            const qEl = document.getElementById('prod-searchInput');
            const sfEl = document.getElementById('prod-statusFilter');
            const cfEl = document.getElementById('prod-catFilter');
            const q  = qEl  ? qEl.value.toLowerCase()  : '';
            const sf = sfEl ? sfEl.value                : 'all';
            const cf = cfEl ? cfEl.value                : 'all';
            let data = [...prodData];

            if (_prod_selectedGroup !== 'all') {
                const grp = catGroups.find(g => g.id === _prod_selectedGroup);
                if (grp) data = data.filter(p =>
                    (p.grp || '').includes(grp.name) || (p.cat || '').includes(grp.name));
            }
            if (sf === 'low') data = data.filter(p => p.stock <= p.lowAlert && p.stock > 0);
            else if (sf !== 'all') data = data.filter(p => p.status === sf);
            if (cf !== 'all') data = data.filter(p => p.cat === cf);
            if (q) data = data.filter(p =>
                (p.name  || '').toLowerCase().includes(q) ||
                (p.code  || '').toLowerCase().includes(q) ||
                (p.desc  || '').toLowerCase().includes(q) ||
                (p.barcode || '').toLowerCase().includes(q)
            );
            renderTable_prod(data);
            renderCards_prod(data);
            const lbl = document.getElementById('prod-countLbl');
            if (lbl) lbl.textContent = data.length + ' product' + (data.length !== 1 ? 's' : '');
        }

        // ── TABLE ──
        function renderTable_prod(data) {
            const body = document.getElementById('prod-tBody');
            if(!body){console.error('MISSING prod-tBody');return;}
            body.innerHTML = '';
            try {
            data.forEach((p, i) => {
                const margin = p.cost > 0 ? Math.round((p.price - p.cost) / p.price * 100) : null;
                const isLow = p.stock <= p.lowAlert && p.stock > 0;
                const isOut = p.stock === 0;
                const stockColor = isOut ? 'var(--red)' : isLow ? 'var(--orange)' : 'var(--green)';
                const sc = { Active: 'p-active', Inactive: 'p-inactive', Discontinued: 'p-disc' }[p.status] || 'p-active';
                const stockMax = Math.max(p.stock, p.lowAlert * 3) || 100;
                const stockPct = Math.min(100, p.stock / stockMax * 100);
                const tr = document.createElement('tr');
                tr.dataset.id = p.id;
                tr.style.animationDelay = (i * 0.03) + 's';
                if (p.id === selectedProdId) tr.className = 'sel';
                tr.innerHTML = `
      <td style="padding-left:16px"><input type="checkbox" style="accent-color:var(--gold);cursor:pointer" onclick="event.stopPropagation()" onchange="updateBulkBar_prod()"></td>
      <td onclick="selectProduct_prod(${p.id})">
        <div class="prod-cell">
          <div class="prod-thumb" style="background:var(--bg3)">${p.emoji}</div>
          <div>
            <div class="prod-name">${p.name}</div>
            <div class="prod-code">${p.code} · ${p.sku || '—'}</div>
            <div class="prod-desc">${p.desc||''}</div>
          </div>
        </div>
      </td>
      <td onclick="selectProduct_prod(${p.id})" style="font-size:11px;color:var(--text2)">${p.grp}<div style="color:var(--text3);font-size:10px">${p.cat}</div></td>
      <td onclick="selectProduct_prod(${p.id})">
        <div class="price-main">$${(+p.price||0).toFixed(2)}</div>
        <div class="price-cost">${p.taxInc ? 'incl.' : 'excl.'} ${p.taxRate}% tax</div>
      </td>
      <td onclick="selectProduct_prod(${p.id})" style="font-family:'DM Mono',monospace;font-size:12px;color:var(--text2)">
        ${p.cost > 0 ? '$' + (+p.cost||0).toFixed(2) : '<span style="color:var(--text3)">—</span>'}
      </td>
      <td onclick="selectProduct_prod(${p.id})">
        ${margin !== null ? `<span class="margin-badge">${margin}%</span>` : '<span style="color:var(--text3);font-size:11px">—</span>'}
      </td>
      <td onclick="selectProduct_prod(${p.id})">
        <div class="stock-wrap">
          <span class="stock-num" style="color:${stockColor}">${p.stock === 999 ? '∞' : p.stock}</span>
          ${p.stock !== 999 ? `<div class="stock-bar-bg"><div class="stock-bar" style="width:${stockPct}%;background:${stockColor}"></div></div>` : ''}
        </div>
      </td>
      <td onclick="selectProduct_prod(${p.id})" style="font-family:'DM Mono',monospace;font-size:11px;color:var(--text2)">${p.taxRate}%</td>
      <td onclick="selectProduct_prod(${p.id})"><span class="pill ${sc}">${p.status}</span>${isOut ? '<div style="margin-top:2px"><span class="pill p-low" style="font-size:9px">Out of Stock</span></div>' : isLow ? '<div style="margin-top:2px"><span class="pill p-low" style="font-size:9px">Low Stock</span></div>' : ''}</td>
      <td>
        <div class="row-actions">
          <div class="ib" title="View" onclick="selectProduct_prod(${p.id})">👁</div>
          <div class="ib" title="Edit" onclick="openForm_prod(${p.id})">✎</div>
          <div class="ib" title="Add to Invoice" onclick="addProdToInvoice_prod(${p.id})">◼</div>
          <div class="ib" title="Duplicate" onclick="duplicateProduct_prod(${p.id})">⧉</div>
          <div class="ib del" title="Delete" onclick="showDelModal_prod(${p.id})">🗑</div>
        </div>
      </td>`;
                body.appendChild(tr);
            });
            } catch(e) { console.error('renderTable_prod ERROR:', e.message, e.stack); }
        }

        // ── CARD VIEW ──
        function renderCards_prod(data) {
            const grid = document.getElementById('prod-cardView');
            grid.innerHTML = '';
            data.forEach((p, i) => {
                const isLow = p.stock <= p.lowAlert && p.stock > 0;
                const isOut = p.stock === 0;
                const margin = p.cost > 0 ? Math.round((p.price - p.cost) / p.price * 100) : null;
                const sc = { Active: 'p-active', Inactive: 'p-inactive', Discontinued: 'p-disc' }[p.status];
                const badgeBg = isOut ? 'rgba(248,113,113,.15)' : isLow ? 'rgba(251,146,60,.15)' : 'rgba(62,207,142,.12)';
                const badgeC = isOut ? 'var(--red)' : isLow ? 'var(--orange)' : 'var(--green)';
                const badgeTxt = isOut ? 'OUT' : isLow ? 'LOW' : p.stock === 999 ? '∞' : p.stock;
                const div = document.createElement('div');
                div.className = 'prod-card' + (p.id === selectedProdId ? ' sel' : '');
                div.style.animationDelay = (i * 0.04) + 's';
                div.onclick = () => selectProduct_prod(p.id);
                div.innerHTML = `
      <div class="pc-image">
        ${p.emoji}
        <span class="pc-stock-badge" style="background:${badgeBg};color:${badgeC}">${badgeTxt}</span>
      </div>
      <div class="pc-body">
        <div class="pc-name">${p.name}</div>
        <div class="pc-code">${p.code || ''}</div>
        <div class="pc-price">$${p.price.toFixed(2)}</div>
        <div class="pc-footer">
          <span class="pill ${sc}" style="font-size:9px">${p.status}</span>
          ${margin !== null ? `<span class="margin-badge">${margin}% margin</span>` : ''}
        </div>
      </div>`;
                grid.appendChild(div);
            });
        }

        function setView_prod(v) {
            _prod_currentView = v;
            document.getElementById('prod-tableView').style.display = v === 'table' ? 'block' : 'none';
            document.getElementById('prod-cardView').style.display = v === 'card' ? 'grid' : 'none';
            document.getElementById('prod-tvBtn').classList.toggle('active', v === 'table');
            document.getElementById('prod-cvBtn').classList.toggle('active', v === 'card');
            filterProducts_prod();
            filterProducts_prod();
        }

        function selAll_prod(cb) {
            document.querySelectorAll('#prod-tBody input[type=checkbox]').forEach(c => c.checked = cb.checked); updateBulkBar_prod();
        }

        // ── DETAIL PANEL ──
        function selectProduct_prod(id) {
            selectedProdId = id;
            const p = prodData.find(x => x.id === id);
            if (!p) return;
            filterProducts_prod();

            document.getElementById('prod-detailPanel').classList.remove('hidden');
            document.getElementById('prod-dpImg').textContent = p.emoji;
            document.getElementById('prod-dpName').textContent = p.name;
            document.getElementById('prod-dpCode').textContent = p.code + ' · ' + p.sku;

            const tagHtml = p._prod_tags.map(t => `<span class="tag ${t === 'Sale' ? 'sale' : t === 'New' ? 'new' : t === 'Popular' ? 'pop' : ''}">${t}</span>`).join('');
            const sc = { Active: 'p-active', Inactive: 'p-inactive', Discontinued: 'p-disc' }[p.status];
            document.getElementById('prod-dpTags').innerHTML = tagHtml + `<span class="pill ${sc}" style="font-size:9px">${p.status}</span>`;

            // Pricing
            const margin = p.cost > 0 ? Math.round((p.price - p.cost) / p.price * 100) : null;
            const priceExcl = p.taxInc ? p.price / (1 + p.taxRate / 100) : p.price;
            const priceIncl = p.taxInc ? p.price : p.price * (1 + p.taxRate / 100);
            document.getElementById('prod-dpPricing').innerHTML = `
    <div class="price-tier"><div><div class="tier-label">Standard Price</div><div class="tier-cond">${p.taxInc ? 'Incl.' : 'Excl.'} ${p.taxRate}% tax</div></div><div class="tier-val" style="color:var(--gold2)">$${p.price.toFixed(2)}</div></div>
    <div class="price-tier"><div><div class="tier-label">Excl. Tax</div></div><div class="tier-val">$${priceExcl.toFixed(2)}</div></div>
    <div class="price-tier"><div><div class="tier-label">Incl. Tax</div></div><div class="tier-val">$${priceIncl.toFixed(2)}</div></div>
    ${p.wholesale ? `<div class="price-tier"><div><div class="tier-label">Wholesale</div><div class="tier-cond">Min qty: ${p.wholeQty}</div></div><div class="tier-val" style="color:var(--blue)">$${p.wholesale.toFixed(2)}</div></div>` : ''}
    ${p.special ? `<div class="price-tier"><div><div class="tier-label">Special Price</div><div class="tier-cond">Until ${p.specialDate || '—'}</div></div><div class="tier-val" style="color:var(--green)">$${p.special.toFixed(2)}</div></div>` : ''}
    ${p.cost ? `<div class="price-tier"><div><div class="tier-label">Cost Price</div></div><div class="tier-val" style="color:var(--text2)">$${p.cost.toFixed(2)}</div></div>` : ''}
    ${margin !== null ? `<div class="price-tier"><div><div class="tier-label">Gross Margin</div></div><div class="tier-val" style="color:var(--green)">${margin}%</div></div>` : ''}`;

            // Stock gauge
            const isLow = p.stock <= p.lowAlert && p.stock > 0;
            const isOut = p.stock === 0;
            const maxStock = Math.max(p.stock, p.lowAlert * 4) || 100;
            const pct = p.stock === 999 ? 100 : Math.min(100, p.stock / maxStock * 100);
            const barC = isOut ? 'var(--red)' : isLow ? 'var(--orange)' : 'var(--green)';
            document.getElementById('prod-dpStock').innerHTML = `
    <div class="sg-numbers">
      <div><div class="sg-num" style="color:${barC}">${p.stock === 999 ? '∞' : p.stock}</div><div class="sg-lbl">In Stock</div></div>
      <div style="text-align:right"><div class="sg-num" style="color:var(--text3)">${p.lowAlert}</div><div class="sg-lbl">Alert Level</div></div>
    </div>
    <div class="sg-bar-bg"><div class="sg-bar" style="width:${pct}%;background:${barC}"></div></div>
    <div class="sg-zones"><span class="sg-zone">0</span><span class="sg-zone" style="color:${isLow ? 'var(--orange)' : 'var(--text3)'}">Low: ${p.lowAlert}</span><span class="sg-zone">${maxStock}</span></div>
    </div>`;

            // Details
            document.getElementById('prod-dpDetails').innerHTML = `
    <div class="dp-row"><span class="dp-key">Category</span><span class="dp-val">${p.cat}</span></div>
    <div class="dp-row"><span class="dp-key">Sub-Group</span><span class="dp-val">${p.grp}</span></div>
    <div class="dp-row"><span class="dp-key">Unit</span><span class="dp-val">Piece</span></div>
    <div class="dp-row"><span class="dp-key">SKU</span><span class="dp-val mono">${p.sku || '—'}</span></div>`;

            // Tax
            document.getElementById('prod-dpTax').innerHTML = `
    <div class="dp-row"><span class="dp-key">Tax Rate</span><span class="dp-val mono">${p.taxRate}%</span></div>
    <div class="dp-row"><span class="dp-key">HSN / SAC Code</span><span class="dp-val mono">${p.hsn || '—'}</span></div>
    <div class="dp-row"><span class="dp-key">Tax Inclusive</span><span class="dp-val" style="color:${p.taxInc ? 'var(--green)' : 'var(--text2)'}">${p.taxInc ? 'Yes' : 'No'}</span></div>`;
        }

        function closeDetail_prod() {
            selectedProdId = null;
            document.getElementById('prod-detailPanel').classList.add('hidden');
            filterProducts_prod();
        }

        function editSelected_prod() { if (selectedProdId) openForm_prod(selectedProdId); }
        function deleteSelected_prod() { if (selectedProdId) showDelModal_prod(selectedProdId); }

        // ── FORM ──
        function buildEmojiPicker_prod() {
            const row = document.getElementById('prod-emojiRow');
            row.innerHTML = '';
            emojis.forEach(e => {
                const div = document.createElement('div');
                div.className = 'emoji-pick' + (e === _prod_selectedEmoji ? ' sel' : '');
                div.textContent = e;
                div.onclick = () => { _prod_selectedEmoji = e; buildEmojiPicker_prod(); };
                row.appendChild(div);
            });
        }

        function setTaxMode_prod(m) {
            _prod_taxMode = m;
            document.getElementById('prod-taxInc').classList.toggle('sel', m === 'inc');
            document.getElementById('prod-taxExc').classList.toggle('sel', m === 'exc');
            recalcPrice_prod();
        }

        function recalcPrice_prod() {
            const price = parseFloat(document.getElementById('prod-fPrice').value) || 0;
            const tax = parseFloat(document.getElementById('prod-fTaxRate').value) || 0;
            if (_prod_taxMode === 'inc') {
                const excl = price / (1 + tax / 100);
                document.getElementById('prod-calcLabel').textContent = 'Price excl. tax';
                document.getElementById('prod-calcValue').textContent = price > 0 ? '$' + excl.toFixed(2) : '—';
            } else {
                const incl = price * (1 + tax / 100);
                document.getElementById('prod-calcLabel').textContent = 'Price incl. tax';
                document.getElementById('prod-calcValue').textContent = price > 0 ? '$' + incl.toFixed(2) : '—';
            }
            const cost = parseFloat(document.getElementById('prod-fCost').value) || 0;
            if (price > 0 && cost > 0) {
                const margin = Math.round((price - cost) / price * 100);
                // Show margin hint next to cost (if calc label not overwritten)
            }
        }

        function openForm_prod(id = null) {
            _prod_editingId = id; _prod_tags = [];
            document.getElementById('prod-tagWrap').querySelectorAll('.tag-item').forEach(el => el.remove());
            _prod_selectedEmoji = '📦';
            document.getElementById('prod-formTitle').textContent = id ? 'Edit Product' : 'Add New Product';
            setTaxMode_prod('inc');
            buildEmojiPicker_prod();
            if (id) {
                const p = prodData.find(x => x.id === id);
                if (p) {
                    _prod_selectedEmoji = p.emoji;
                    document.getElementById('prod-fName').value = p.name;
                    document.getElementById('prod-fCode').value = p.code;
                    document.getElementById('prod-fDesc').value = p.desc || '';
                    document.getElementById('prod-fPrice').value = p.price;
                    document.getElementById('prod-fTaxRate').value = p.taxRate;
                    document.getElementById('prod-fCost').value = p.cost;
                    document.getElementById('prod-fStock').value = p.stock === 999 ? '' : p.stock;
                    document.getElementById('prod-fLowAlert').value = p.lowAlert;
                    document.getElementById('prod-fRack').value = p.rack;
                    document.getElementById('prod-fBarcode').value = p.barcode;
                    document.getElementById('fHsn').value = p.hsn;
                    document.getElementById('prod-fStatus').value = p.status;
                    document.getElementById('prod-fWhole').value = p.wholesale || '';
                    document.getElementById('prod-fWholeQty').value = p.wholeQty || '';
                    document.getElementById('prod-fSpecial').value = p.special || '';
                    document.getElementById('prod-fSpecialDate').value = p.specialDate || '';
                    p._prod_tags.forEach(t => addTag_prod(t));
                    setTaxMode_prod(p.taxInc ? 'inc' : 'exc');
                    buildEmojiPicker_prod();
                    recalcPrice_prod();
                }
            } else {
                document.getElementById('prod-fName').value = '';
                const nextId = Math.max(0, ...prodData.map(p => p.id)) + 1;
                document.getElementById('prod-fCode').value = 'PRD' + String(nextId).padStart(3, '0');
                document.getElementById('prod-fPrice').value = '';
                document.getElementById('prod-fTaxRate').value = '20';
                document.getElementById('prod-fCost').value = '';
                document.getElementById('prod-fStock').value = '';
                document.getElementById('prod-fLowAlert').value = '10';
                document.getElementById('prod-fRack').value = '';
                document.getElementById('prod-fBarcode').value = '';
                document.getElementById('fHsn').value = '';
                document.getElementById('prod-calcValue').textContent = '—';
            }
            document.getElementById('prod-formOverlay').classList.add('show');
            populateProdCatSelect();
            // Restore cat/grp values after populating dropdowns
            if (id) {
                const p = prodData.find(x => x.id === id);
                if (p) {
                    const catSel = document.getElementById('prod-fCat');
                    if (catSel) { catSel.value = p.cat; updateProdGrpSelect(); }
                    const grpSel = document.getElementById('prod-fGrp');
                    if (grpSel) grpSel.value = p.grp;
                }
            }
            setTimeout(() => document.getElementById('prod-fName').focus(), 200);
        }

        function closeForm_prod() { document.getElementById('prod-formOverlay').classList.remove('show'); }

        function handleTag_prod(e) {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                const v = e.target.value.trim().replace(',', '');
                if (v && !_prod_tags.includes(v)) addTag_prod(v);
                e.target.value = '';
            } else if (e.key === 'Backspace' && !e.target.value && _prod_tags.length) {
                removeTag_prod(_prod_tags[_prod_tags.length - 1]);
            }
        }
        function addTag_prod(v) {
            if (_prod_tags.includes(v)) return;
            _prod_tags.push(v);
            const s = document.createElement('span');
            s.className = 'tag-item'; s.dataset.tag = v;
            s.innerHTML = `${v}<button type="button" onclick="removeTag_prod('${v}')">×</button>`;
            document.getElementById('prod-tagWrap').insertBefore(s, document.getElementById('prod-tagInp'));
        }
        function removeTag_prod(v) {
            _prod_tags = _prod_tags.filter(t => t !== v);
            const wrap = document.getElementById('prod-tagWrap');
            const el = wrap ? wrap.querySelector(`.tag-item[data-tag="${v}"]`) : document.querySelector(`.tag-item[data-tag="${v}"]`);
            if (el) el.remove();
        }

        function saveProduct_prod() {
            const name = document.getElementById('prod-fName').value.trim();
            if (!name) { showToast('Product name is required', 'err'); return; }
            const price = parseFloat(document.getElementById('prod-fPrice').value) || 0;
            const cost  = parseFloat(document.getElementById('prod-fCost').value) || 0;
            const taxRate = parseFloat(document.getElementById('prod-fTaxRate').value) || 0;
            const stockVal = document.getElementById('prod-fStock').value; const stock = stockVal === '' || stockVal === '∞' ? 999 : (parseInt(stockVal) || 0);
            const lowAlert = parseInt(document.getElementById('prod-fLowAlert').value) || 5;
            const code  = document.getElementById('prod-fCode').value.trim();
            const desc  = document.getElementById('prod-fDesc').value.trim();
            const rack  = document.getElementById('prod-fRack').value.trim();
            const barcode = document.getElementById('prod-fBarcode').value.trim();
            const hsn   = document.getElementById('fHsn').value.trim();
            const status = document.getElementById('prod-fStatus').value;
            const wholesale = parseFloat(document.getElementById('prod-fWhole').value) || null;
            const wholeQty  = parseInt(document.getElementById('prod-fWholeQty').value) || null;
            const special   = parseFloat(document.getElementById('prod-fSpecial').value) || null;
            const specialDate = document.getElementById('prod-fSpecialDate').value || null;
            const taxInc    = _prod_taxMode === 'inc';
            // Read cat/grp from the form dropdowns
            const catSel = document.getElementById('prod-fCat');
            const grpSel = document.getElementById('prod-fGrp');
            const cat = catSel ? catSel.value : 'Uncategorised';
            const grp = grpSel ? grpSel.value : cat;
            const entry = { name, code, desc, emoji: _prod_selectedEmoji, cat, grp, price, cost, taxRate, taxInc, stock, lowAlert, rack, barcode, hsn, status, wholesale, wholeQty, special, specialDate, _prod_tags: [..._prod_tags], sku: code };
            if (_prod_editingId) {
                const idx = prodData.findIndex(x => x.id === _prod_editingId);
                if (idx >= 0) prodData[idx] = { ...prodData[idx], ...entry };
            } else {
                const newId = Math.max(0, ...prodData.map(p => p.id)) + 1;
                prodData.push({ id: newId, ...entry });
            }
            closeForm_prod(); filterProducts_prod(); updateProdBadge();
            showToast(_prod_editingId ? name + ' updated' : name + ' added', true);
        }
        function saveAndNew_prod() { saveProduct_prod(); setTimeout(() => openForm_prod(), 300); }

        // ── DELETE ──
        function showDelModal_prod(id) {
            _prod_delTargetId = id;
            const p = prodData.find(x => x.id === id);
            document.getElementById('delTargetName').textContent = p ? p.name : 'this product';
            document.getElementById('delOverlay').classList.add('show');
        }
        function closeDelModal_prod() { document.getElementById('delOverlay').classList.remove('show'); }
        function confirmDel_prod() {
            closeDelModal_prod();
            if (_prod_delTargetId) {
                const idx = prodData.findIndex(x => x.id === _prod_delTargetId);
                if (idx >= 0) prodData.splice(idx, 1);
                _prod_delTargetId = null;
            }
            closeDetail_prod(); filterProducts_prod(); updateProdBadge(); showToast('Product deleted');
        }

        // ── TOAST ──
        let _prod_toastT;
        
        // ── Bulk selection ──
        function updateBulkBar_prod() {
            const checked = document.querySelectorAll('#prod-tBody input[type=checkbox]:checked');
            const bar = document.getElementById('prod-bulk-bar');
            const countEl = document.getElementById('prod-bulk-count');
            if (!bar || !countEl) return;
            const n = checked.length;
            if (n > 0) {
                bar.style.display = 'flex';
                countEl.textContent = n + ' selected';
            } else {
                bar.style.display = 'none';
            }
        }
        function clearSelection_prod() {
            document.querySelectorAll('#prod-tBody input[type=checkbox]').forEach(cb => cb.checked = false);
            const hdr = document.querySelector('#view-products thead input[type=checkbox]');
            if (hdr) hdr.checked = false;
            updateBulkBar_prod();
        }


        function addProdToInvoice_prod(id) {
            const p = prodData.find(x => x.id === id);
            if (!p) return;
            // Navigate to invoice create and pre-fill the product
            navTo('invoice');
            setTimeout(() => {
                if (typeof showCreate_invoice === 'function') showCreate_invoice();
                setTimeout(() => {
                    // Find the last empty item row and fill it with this product
                    const rows = document.querySelectorAll('#inv-itemsBody .item-row');
                    const target = rows.length ? rows[rows.length - 1] : null;
                    if (target) {
                        const nameInp = target.querySelector('input[type=text]');
                        const priceInp = target.querySelector('.uprice');
                        const taxInp   = target.querySelector('.tax');
                        if (nameInp)  nameInp.value  = p.name;
                        if (priceInp) priceInp.value = p.price.toFixed(2);
                        if (taxInp)   taxInp.value   = p.taxRate;
                        // trigger recalc
                        const rowId = target.id;
                        if (rowId && typeof calcRow_inv === 'function') calcRow_inv(rowId);
                    }
                    showToast(p.name + ' added to invoice', true);
                }, 400);
            }, 200);
        }

                function duplicateProduct_prod(id) {
            const p = prodData.find(x => x.id === id);
            if (!p) return;
            const newId = Math.max(0, ...prodData.map(x => x.id)) + 1;
            const newCode = 'PRD' + String(newId).padStart(3, '0');
            prodData.push({ ...p, id: newId, code: newCode, sku: newCode, name: p.name + ' (Copy)', _prod_tags: [...p._prod_tags] });
            filterProducts_prod(); updateProdBadge();
            showToast(p.name + ' duplicated', true);
        }

                function bulkExport_prod() {
            const checked = document.querySelectorAll('#prod-tBody input[type=checkbox]:checked');
            const ids = Array.from(checked).map(cb => parseInt(cb.closest('tr').dataset.id)).filter(Boolean);
            const rows = ids.map(id => {
                const p = prodData.find(x => x.id === id);
                if (!p) return '';
                return [p.code, p.name, p.cat, p.grp, p.price, p.cost, p.stock, p.status].join(',');
            }).filter(Boolean);
            const csv = 'Code,Name,Category,Group,Price,Cost,Stock,Status\n' + rows.join('\n');
            const a = document.createElement('a'); a.href = 'data:text/csv,' + encodeURIComponent(csv);
            a.download = 'products_export.csv'; a.click();
            showToast('Exported ' + rows.length + ' products', true);
        }
        function bulkChangeCategory_prod() {
            const cats = [...new Set(catGroups.filter(g => g.parent === null && g.id !== 'all').map(g => g.name))];
            const choice = prompt('Move to category:\n' + cats.map((c,i) => (i+1)+'. '+c).join('\n') + '\n\nEnter number:');
            const idx = parseInt(choice) - 1;
            if (idx >= 0 && idx < cats.length) {
                const newCat = cats[idx];
                document.querySelectorAll('#prod-tBody input[type=checkbox]:checked').forEach(cb => {
                    const id = parseInt(cb.closest('tr').dataset.id);
                    const p = prodData.find(x => x.id === id);
                    if (p) { p.cat = newCat; p.grp = newCat; }
                });
                updateProdBadge();
                filterProducts_prod(); clearSelection_prod();
                showToast('Moved to ' + newCat, true);
            }
        }
        function bulkChangeStatus_prod() {
            const choice = prompt('Set status:\n1. Active\n2. Inactive\n3. Discontinued\n\nEnter number:');
            const statuses = ['Active', 'Inactive', 'Discontinued'];
            const idx = parseInt(choice) - 1;
            if (idx >= 0 && idx < statuses.length) {
                const newSt = statuses[idx];
                document.querySelectorAll('#prod-tBody input[type=checkbox]:checked').forEach(cb => {
                    const id = parseInt(cb.closest('tr').dataset.id);
                    const p = prodData.find(x => x.id === id);
                    if (p) p.status = newSt;
                });
                filterProducts_prod(); clearSelection_prod();
                showToast('Status updated to ' + newSt, true);
            }
        }
        function bulkDelete_prod() {
            const cbs = document.querySelectorAll('#prod-tBody input[type=checkbox]:checked');
            const ids = Array.from(cbs).map(cb => parseInt(cb.closest('tr').dataset.id)).filter(Boolean);
            const n = ids.length;
            if (!n) return;
            if (confirm('Delete ' + n + ' product' + (n > 1 ? 's' : '') + '? This cannot be undone.')) {
                ids.forEach(id => {
                    const idx = prodData.findIndex(x => x.id === id);
                    if (idx >= 0) prodData.splice(idx, 1);
                });
                clearSelection_prod();
                if (selectedProdId && ids.includes(selectedProdId)) closeDetail_prod();
                filterProducts_prod(); updateProdBadge();
                showToast(n + ' product' + (n > 1 ? 's' : '') + ' deleted');
            }
        }

        function toast_prod_orig(msg, type) {
            const el = document.createElement('div');
            el.className = 'toast' + (type === true ? ' ok' : type === 'err' ? ' err' : '');
            el.innerHTML = `<span>${type === true ? '✓' : 'ℹ'}</span> ${msg}`;
            document.body.appendChild(el);
            clearTimeout(_prod_toastT);
            _prod_toastT = setTimeout(() => el.remove(), 3000);
        }

        // ── ADD CATEGORY MODAL ──
        function openAddCategoryModal() {
            const parentSel = document.getElementById('newCatParent');
            parentSel.innerHTML = '<option value="">— None (top-level category) —</option>';
            catGroups.filter(g => g.parent === null && g.id !== 'all').forEach(g => {
                const opt = document.createElement('option');
                opt.value = g.id;
                opt.textContent = g.icon + ' ' + g.name;
                parentSel.appendChild(opt);
            });
            document.getElementById('newCatName').value = '';
            document.getElementById('newCatIcon').value = '';
            const overlay = document.getElementById('addCatOverlay');
            overlay.style.display = 'flex';
            setTimeout(() => document.getElementById('newCatName').focus(), 100);
        }
        function closeAddCategoryModal() {
            document.getElementById('addCatOverlay').style.display = 'none';
        }
        function confirmAddCategory() {
            const name = document.getElementById('newCatName').value.trim();
            if (!name) { showToast('Category name is required', 'err'); return; }
            const parentVal = document.getElementById('newCatParent').value;
            const icon = document.getElementById('newCatIcon').value.trim() || '📁';
            const newId = name.toLowerCase().replace(/\s+/g,'_') + '_' + Date.now();
            catGroups.push({ id: newId, name, icon, count: 0, parent: parentVal || null });
            // Auto-update prodData items that match this category name from another source

            // refresh category filter dropdown in toolbar
            populateCatFilter();
            // refresh category select in form
            populateProdCatSelect();
            // refresh sidebar tree
            renderGroups_prod();
            closeAddCategoryModal();
            showToast('Category "' + name + '" added', true);
        }

        // Populate the cat filter dropdown in toolbar from catGroups
        function populateCatFilter() {
            const sel = document.getElementById('prod-catFilter');
            if (!sel) return;
            const cur = sel.value;
            sel.innerHTML = '<option value="all">All Categories</option>';
            catGroups.filter(g => g.parent === null && g.id !== 'all').forEach(g => {
                const opt = document.createElement('option');
                opt.value = g.name;
                opt.textContent = g.name;
                sel.appendChild(opt);
            });
            if (cur) sel.value = cur;
        }

        // Populate the Category select in product form from catGroups
        function populateProdCatSelect() {
            const catSel = document.getElementById('prod-fCat');
            const grpSel = document.getElementById('prod-fGrp');
            if (!catSel || !grpSel) return;
            const curCat = catSel.value;
            catSel.innerHTML = '';
            catGroups.filter(g => g.parent === null && g.id !== 'all').forEach(g => {
                const opt = document.createElement('option');
                opt.value = g.name;
                opt.textContent = g.name;
                catSel.appendChild(opt);
            });
            if (curCat) catSel.value = curCat;
            updateProdGrpSelect();
        }

        // Update subcategory/group dropdown based on selected category
        function updateProdGrpSelect() {
            const catSel = document.getElementById('prod-fCat');
            const grpSel = document.getElementById('prod-fGrp');
            if (!catSel || !grpSel) return;
            const selectedCatName = catSel.value;
            const parentGroup = catGroups.find(g => g.name === selectedCatName && g.parent === null);
            grpSel.innerHTML = '';
            const children = parentGroup ? catGroups.filter(g => g.parent === parentGroup.id) : [];
            if (children.length === 0) {
                const opt = document.createElement('option');
                opt.value = selectedCatName;
                opt.textContent = '— Same as category —';
                grpSel.appendChild(opt);
            } else {
                children.forEach(g => {
                    const opt = document.createElement('option');
                    opt.value = g.name;
                    grpSel.appendChild(opt);
                });
            }
        }
