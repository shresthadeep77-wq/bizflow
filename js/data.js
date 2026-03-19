/* BizFlow — data.js */

/* ═══════════════════════════════════════
       GLOBAL DOCUMENT SETTINGS STATE
       Per-document-type columns + shared header/footer/labels
    ═══════════════════════════════════════ */

    // Default column definitions — cloned per doc type
    function defaultCols() {
        return {
            code:      { vis: false, label: 'Item Code',       align: 'Left',   order: 1  },
            name:      { vis: true,  label: 'Item Name',       align: 'Left',   order: 2  },
            desc:      { vis: true,  label: 'Description',     align: 'Left',   order: 3  },
            qty:       { vis: true,  label: 'Qty',             align: 'Right',  order: 4  },
            unit:      { vis: true,  label: 'Unit',            align: 'Center', order: 5  },
            price:     { vis: true,  label: 'Unit Price',      align: 'Right',  order: 6  },
            discpct:   { vis: true,  label: 'Disc %',          align: 'Right',  order: 7  },
            discamt:   { vis: false, label: 'Disc Amount',     align: 'Right',  order: 8  },
            discprice: { vis: false, label: 'Net Price',       align: 'Right',  order: 9  },
            taxrate:   { vis: true,  label: 'Tax %',           align: 'Right',  order: 10 },
            taxamt:    { vis: false, label: 'Tax Amount',      align: 'Right',  order: 11 },
            totalex:   { vis: false, label: 'Total excl. Tax', align: 'Right',  order: 12 },
            totalinc:  { vis: true,  label: 'Amount',          align: 'Right',  order: 13 },
            margin:    { vis: false, label: 'Margin %',        align: 'Right',  order: 14 },
            rack:      { vis: false, label: 'Location/Rack',   align: 'Left',   order: 15 },
            notes:     { vis: false, label: 'Notes',           align: 'Left',   order: 16 },
        };
    }

    const docSettings = {
        header: { showLogo:true, showBizName:true, showBizAddr:true, showContact:true, showTax:false },
        footer: { showTerms:true, showBank:true, showThankYou:true, showSig:true, showPageNum:false, showWatermark:false },
        labels: { quotTitle:'QUOTATION', invTitle:'INVOICE', billTo:'BILL TO', itemsSection:'ITEMS' },
        // Per-document-type column configs
        perDoc: {
            quotation: defaultCols(),
            invoice:   defaultCols(),
            proforma:  defaultCols(),
            po:        (()=>{ const c=defaultCols(); c.price.label='Unit Cost'; c.totalinc.label='Line Total'; return c; })(),
            dn:        (()=>{ const c=defaultCols(); c.price.vis=false; c.discpct.vis=false; c.taxrate.vis=false; c.totalinc.vis=false; c.totalinc.label='Line Total'; return c; })(),
            receipt:   defaultCols(),
            all:       defaultCols(),
        },
        // Active doc type for the column settings panel
        _activeDocType: 'quotation',
        // Convenience getter: returns columns for currently active doc type
        get columns() { return this.perDoc[this._activeDocType] || this.perDoc.quotation; }
    };

    // Called whenever any settings control changes — reads DOM → updates docSettings
    function readDocSettings() {
        const toggleMap = {
            'tog-show-logo':    ['header','showLogo'],
            'tog-show-bizname': ['header','showBizName'],
            'tog-show-bizaddr': ['header','showBizAddr'],
            'tog-show-contact': ['header','showContact'],
            'tog-show-tax':     ['header','showTax'],
            'tog-footer-terms': ['footer','showTerms'],
            'tog-footer-bank':  ['footer','showBank'],
            'tog-footer-thanks':['footer','showThankYou'],
            'tog-footer-sig':   ['footer','showSig'],
            'tog-footer-pgnum': ['footer','showPageNum'],
            'tog-footer-water': ['footer','showWatermark'],
        };
        Object.entries(toggleMap).forEach(([id,[section,key]]) => {
            const el = document.getElementById(id);
            if (el) docSettings[section][key] = el.checked;
        });
        const labelMap = {
            'sel-quot-title':   ['labels','quotTitle'],
            'sel-inv-title':    ['labels','invTitle'],
            'sel-billto-label': ['labels','billTo'],
            'sel-items-label':  ['labels','itemsSection'],
        };
        Object.entries(labelMap).forEach(([id,[section,key]]) => {
            const el = document.getElementById(id);
            if (el) docSettings[section][key] = el.value;
        });
        // Columns — save into the active doc type's config
        const cols = docSettings.perDoc[docSettings._activeDocType] || docSettings.perDoc.quotation;
        Object.keys(cols).forEach(key => {
            const row = document.querySelector(`#colBody tr[data-col="${key}"]`);
            if (!row) return;
            const cb       = row.querySelector('input[type=checkbox]');
            const labelInp = row.querySelector('input[type=text]');
            const orderInp = row.querySelector('input[type=number]');
            const alignSel = row.querySelector('select');
            if (cb)       cols[key].vis   = cb.checked;
            if (labelInp && labelInp.value) cols[key].label = labelInp.value;
            if (orderInp) cols[key].order = parseInt(orderInp.value) || cols[key].order;
            if (alignSel) cols[key].align = alignSel.value;
        });
        refreshMiniPreview();
    }

    // Switch which doc type the column table is editing
    function switchColDocType(val) {
        docSettings._activeDocType = val;
        // Rebuild the table with that doc type's saved values
        buildColTable(val);
    }

    function refreshMiniPreview() {
        const s = docSettings;
        const tog = (id, show) => { const el=document.getElementById(id); if(el) el.style.display=show?'':'none'; };
        tog('mp-logo',     s.header.showLogo);
        tog('mp-bizname',  s.header.showBizName);
        tog('mp-bizaddr',  s.header.showBizAddr);
        tog('mp-contact',  s.header.showContact);
        tog('mp-taxnum',   s.header.showTax);
        const docTitleEl = document.getElementById('mp-doc-title');
        if (docTitleEl) docTitleEl.textContent = s.labels.quotTitle;
        const billToEl = document.getElementById('mp-billto-label');
        if (billToEl) billToEl.textContent = s.labels.billTo;
        tog('mp-footer-terms',  s.footer.showTerms);
        tog('mp-footer-bank',   s.footer.showBank);
        tog('mp-footer-thanks', s.footer.showThankYou);
        tog('mp-footer-sig',    s.footer.showSig);
        const mpTable = document.getElementById('mp-items-thead');
        if (mpTable) {
            const cols = docSettings.columns;
            const visibleCols = Object.entries(cols)
                .filter(([k,c]) => c.vis)
                .sort((a,b) => a[1].order - b[1].order);
            mpTable.innerHTML = '<th>#</th>' + visibleCols.map(([k,c]) =>
                `<th style="text-align:${c.align==='Right'?'right':c.align==='Center'?'center':'left'};font-size:8px">${c.label}</th>`
            ).join('');
        }
    }
