/* BizFlow — dashboard.js */

// ── Date ──
        const _dash_d = new Date();
        (document.getElementById('currentDate') || {}).textContent =
            _dash_d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

        // ── Sales Bar Chart ──
        const salesCanvas = document.getElementById('salesChart');
        const ctx = salesCanvas.getContext('2d');

        const datasets = {
            monthly: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                revenue: [28000, 32000, 27000, 41000, 38000, 45000, 43000, 51000, 48000, 55000, 42000, 46000],
                invoices: [18, 22, 19, 28, 25, 30, 29, 34, 31, 36, 28, 32]
            },
            weekly: {
                labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'],
                revenue: [7200, 8100, 6900, 9400, 8800, 10200, 9700, 11300, 10600, 12100, 9800, 10500],
                invoices: [5, 6, 5, 7, 6, 8, 7, 9, 8, 9, 7, 8]
            },
            quarterly: {
                labels: ['Q1 22', 'Q2 22', 'Q3 22', 'Q4 22', 'Q1 23', 'Q2 23', 'Q3 23', 'Q4 23', 'Q1 24', 'Q2 24', 'Q3 24', 'Q4 24'],
                revenue: [82000, 96000, 104000, 121000, 98000, 115000, 128000, 142000, 112000, 124000, 138000, 156000],
                invoices: [54, 68, 72, 88, 65, 79, 88, 98, 74, 84, 95, 108]
            },
            yearly: {
                labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
                revenue: [210000, 185000, 260000, 380000, 420000, 460000],
                invoices: [180, 155, 220, 310, 345, 378]
            }
        };

        let currentPeriod = 'monthly';

        function setPeriod(el, period) {
            document.querySelectorAll('.period-tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
            currentPeriod = period;
            drawChart();
        }

        function drawChart() {
            const data = datasets[currentPeriod];
            const W = salesCanvas.width, H = salesCanvas.height;
            const pad = { top: 16, right: 16, bottom: 32, left: 52 };
            const chartW = W - pad.left - pad.right;
            const chartH = H - pad.top - pad.bottom;
            const n = data.labels.length;
            const barW = Math.min((chartW / n) * 0.55, 30);
            const gap = chartW / n;

            ctx.clearRect(0, 0, W, H);

            const maxRev = Math.max(...data.revenue);
            const steps = 5;

            // Grid lines + Y labels
            ctx.textAlign = 'right';
            ctx.font = '9px DM Mono';
            ctx.fillStyle = '#5c5a56';
            for (let i = 0; i <= steps; i++) {
                const y = pad.top + chartH - (i / steps) * chartH;
                const val = (maxRev * i / steps);
                ctx.fillStyle = 'rgba(255,255,255,0.04)';
                ctx.fillRect(pad.left, y, chartW, 0.5);
                ctx.fillStyle = '#5c5a56';
                ctx.fillText('$' + (val >= 1000 ? Math.round(val / 1000) + 'k' : val), pad.left - 8, y + 3);
            }

            // Bars
            data.revenue.forEach((rev, i) => {
                const x = pad.left + i * gap + gap / 2 - barW / 2;
                const barH = (rev / maxRev) * chartH;
                const y = pad.top + chartH - barH;
                const isLast = i === n - 1;

                // Bar gradient
                const grad = ctx.createLinearGradient(0, y, 0, pad.top + chartH);
                grad.addColorStop(0, isLast ? 'rgba(201,168,76,0.9)' : 'rgba(201,168,76,0.55)');
                grad.addColorStop(1, isLast ? 'rgba(201,168,76,0.3)' : 'rgba(201,168,76,0.1)');
                ctx.fillStyle = grad;

                // Rounded top
                const r = 4;
                ctx.beginPath();
                ctx.moveTo(x + r, y);
                ctx.lineTo(x + barW - r, y);
                ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
                ctx.lineTo(x + barW, pad.top + chartH);
                ctx.lineTo(x, pad.top + chartH);
                ctx.lineTo(x, y + r);
                ctx.quadraticCurveTo(x, y, x + r, y);
                ctx.closePath();
                ctx.fill();

                if (isLast) {
                    ctx.strokeStyle = 'rgba(201,168,76,0.8)';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                // X label
                ctx.fillStyle = '#5c5a56';
                ctx.font = '9px DM Mono';
                ctx.textAlign = 'center';
                ctx.fillText(data.labels[i], x + barW / 2, pad.top + chartH + 16);
            });

            // Trend line
            const linePoints = data.revenue.map((rev, i) => ({
                x: pad.left + i * gap + gap / 2,
                y: pad.top + chartH - (rev / maxRev) * chartH
            }));
            ctx.beginPath();
            linePoints.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
            ctx.strokeStyle = 'rgba(62,207,142,0.5)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Dots
            linePoints.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = 'var(--green, #3ecf8e)';
                ctx.fill();
            });
        }
        drawChart();

        // ── Donut Chart ──
        const donutCanvas = document.getElementById('donutChart');
        const dctx = donutCanvas.getContext('2d');
        const slices = [
            { val: 89, color: '#3ecf8e' },
            { val: 28, color: '#c9a84c' },
            { val: 32, color: '#60a5fa' },
            { val: 7, color: '#f87171' }
        ];
        const total = slices.reduce((a, s) => a + s.val, 0);
        const cx = 80, cy = 80, outerR = 68, innerR = 46;
        let startAngle = -Math.PI / 2;

        slices.forEach(s => {
            const sweep = (s.val / total) * Math.PI * 2;
            dctx.beginPath();
            dctx.moveTo(cx, cy);
            dctx.arc(cx, cy, outerR, startAngle, startAngle + sweep);
            dctx.closePath();
            dctx.fillStyle = s.color;
            dctx.fill();
            startAngle += sweep;
        });

        // Cut inner circle
        dctx.beginPath();
        dctx.arc(cx, cy, innerR, 0, Math.PI * 2);
        dctx.fillStyle = '#141415';
        dctx.fill();

        // Gaps
        startAngle = -Math.PI / 2;
        slices.forEach(s => {
            const sweep = (s.val / total) * Math.PI * 2;
            dctx.beginPath();
            dctx.moveTo(cx, cy);
            dctx.arc(cx, cy, outerR + 2, startAngle - 0.01, startAngle + 0.01);
            dctx.closePath();
            dctx.fillStyle = '#141415';
            dctx.lineWidth = 2;
            dctx.stroke();
            startAngle += sweep;
        });
