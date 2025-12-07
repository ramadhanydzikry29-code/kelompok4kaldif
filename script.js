// script.js
// Dependencies: Chart.js, chartjs-plugin-zoom, mathjs, jspdf (all included in your HTML)

(() => {
  // --- DATA: kota (singkat, contoh) ---
  // Anda bisa mengganti/menambah kota sesuai daftar lengkap Anda.
  const cities = [
    "Aceh Barat","Aceh Besar","Aceh Jaya","Aceh Selatan","Aceh Singkil",
    "Aceh Tamiang","Aceh Tengah","Aceh Tenggara","Aceh Timur","Aceh Utara",
    "Agam","Alor","Asahan","Asmat","Badung","Balangan","Balikpapan",
    "Banda Aceh","Bandar Lampung","Bandung","Bandung Barat","Banggai",
    "Banggai Kepulauan","Bangil","Bangka","Bangka Barat","Bangka Selatan",
    "Bangka Tengah","Bangli","Banjar","Banjarbaru","Banjarmasin","Banjarnegara",
    "Bantaeng","Bantul","Banyuasin","Banyumas","Banyuwangi","Barito Kuala",
    "Barito Selatan","Barito Timur","Barito Utara","Barru","Batam","Batang",
    "Batu","Baturaja","Bau-Bau","Bekasi","Belitung","Belitung Timur","Belu",
    "Bener Meriah","Bengkalis","Bengkayang","Bengkulu","Bengkulu Selatan",
    "Bengkulu Tengah","Bengkulu Utara","Berau","Biak Numfor","Bima","Binjai",
    "Bireuen","Bitung","Blitar","Blora","Boalemo","Bogor","Bojonegoro",
    "Bolaang Mongondow","Bolaang Mongondow Selatan","Bolaang Mongondow Timur",
    "Bolaang Mongondow Utara","Bondowoso","Bone","Bone Bolango","Bontang",
    "Boven Digoel","Boyolali","Brebes","Bukittinggi","Bulukumba","Bulungan",
    "Bungo","Buol","Buru","Buru Selatan","Buton","Buton Selatan","Buton Tengah",
    "Ciamis","Cianjur","Cilacap","Cimahi","Cirebon","Dairi","Deiyai",
    "Deli Serdang","Demak","Denpasar","Depok","Dharmasraya","Dogiyai",
    "Dompu","Donggala","Enrekang","Fakfak","Flores Timur","Gayo Lues",
    "Gianyar","Gorontalo","Gorontalo Utara","Gowa","Gresik","Grobogan",
    "Gunungkidul","Gunungsitoli","Halmahera Barat","Halmahera Selatan",
    "Halmahera Tengah","Halmahera Timur","Halmahera Utara","Hambalang",
    "Hulu Sungai Selatan","Hulu Sungai Tengah","Hulu Sungai Utara","Indramayu",
    "Jayapura","Jember","Jeneponto","Jepara","Jombang","Kaimana","Karo",
    "Kediri","Kefamenanu","Kendal","Kendari","Kepulauan Aru","Kepulauan Meranti",
    "Kepulauan Sangihe","Kepulauan Seribu","Kepulauan Siau","Kepulauan Talaud",
    "Kepulauan Yapen","Kerinci","Ketapang","Klaten","Klungkung","Kolaka",
    "Kolaka Timur","Kolaka Utara","Konawe","Konawe Kepulauan","Konawe Selatan",
    "Konawe Utara","Kotabaru","Kotamobagu","Kuantan Singingi","Kubu Raya",
    "Kudus","Kulon Progo","Kuningan","Kupang","Kutai Barat","Kutai Kartanegara",
    "Kutai Timur","Labuhanbatu","Labuhanbatu Selatan","Labuhanbatu Utara",
    "Lahat","Lamandau","Lamongan","Lampung Barat","Lampung Selatan","Lampung Tengah",
    "Lampung Timur","Lampung Utara","Landak","Langkat","Langsa","Lebak",
    "Lebong","Lhokseumawe","Lima Puluh Kota","Lombok Barat","Lombok Tengah",
    "Lombok Timur","Lombok Utara","Lubuk Linggau","Madiun","Magelang","Magetan",
    "Majalengka","Majene","Makassar","Malang","Malinau","Maluku Barat Daya",
    "Maluku Tengah","Mamasa","Mamberamo","Mamuju","Mamuju Tengah","Mamuju Utara",
    "Manado","Manokwari","Maros","Medan","Melawi","Merangin","Merauke","Metro",
    "Mimika","Minahasa","Minahasa Selatan","Minahasa Tenggara","Minahasa Utara",
    "Mojokerto","Morowali","Muara Enim","Muaro Jambi","Muko-Muko","Muna","Nabire",
    "Nagan Raya","Nagekeo","Natuna","Ngada","Ngawi","Nias","Nias Barat","Nias Selatan",
    "Nias Utara","Nunukan","Ogan Ilir","Ogan Komering Ilir","Ogan Komering Ulu",
    "Padang","Padang Lawas","Padang Panjang","Padang Pariaman","Padang Sidempuan",
    "Pagar Alam","Pakpak Bharat","Palangkaraya","Palembang","Palopo","Palu","Pamekasan",
    "Pandeglang","Pangkal Pinang","Pangkep","Paniai","Parepare","Pariaman",
    "Parigi Moutong","Pasaman","Pasaman Barat","Paser","Pasuruan","Pati","Payakumbuh",
    "Pekalongan","Pekanbaru","Pelalawan","Pemalang","Penajam Paser Utara","Pesawaran",
    "Pessel","Pesisir Barat","Pesisir Selatan","Pidie","Pidie Jaya","Pinrang",
    "Pohuwato","Polewali Mandar","Ponorogo","Pontianak","Poso","Prabumulih",
    "Probolinggo","Purbalingga","Purwakarta","Purworejo","Raja Ampat","Rejang Lebong",
    "Rembang","Rokan Hilir","Rokan Hulu","Rote Ndao","Sabang","Sabu Raijua",
    "Salatiga","Samarinda","Samosir","Sampang","Sarmi","Sawahlunto","Sekadau",
    "Seluma","Semarang","Serang","Serdang Bedagai","Seruyan","Siak","Sibolga",
    "Sidoarjo","Sigi","Sikka","Simalungun","Simeulue","Singkawang","Sinjai",
    "Sintang","Situbondo","Sleman","Solok","Solok Selatan","Soppeng","Sorong",
    "Sorong Selatan","South Sorong","Subang","Sukabumi","Sukamara","Sukoharjo",
    "Sumba Barat","Sumba Tengah","Sumba Timur","Sumedang","Sumenep","Sungai Penuh",
    "Surabaya","Surakarta","Tabalong","Tabanan","Takalar","Tambrauw","Tamalate",
    "Tambun","Tana Toraja","Tanah Bumbu","Tanah Datar","Tanah Laut","Tangerang",
    "Tangerang Selatan","Tanggamus","Tanjung Balai","Tanjung Jabung Barat","Tanjung Jabung Timur",
    "Tanjung Pinang","Tapanuli Selatan","Tapanuli Tengah","Tapanuli Utara","Tapin","Tarakan",
    "Tasikmalaya","Tebing Tinggi","Tegal","Teluk Bintuni","Teluk Wondama","Temanggung",
    "Ternate","Tidore","Timika","Toba","Tojo Una-Una","Toli-Toli","Tomohon","Toraja Utara",
    "Trenggalek","Tual","Tuban","Tulang Bawang","Tulang Bawang Barat","Tulungagung","Wajo",
    "Wakatobi","Way Kanan","Wonosobo","Yogyakarta"
  ];

  const defaultItems = ["Beras","Gula","Minyak Goreng","Telur Ayam","Cabe Merah"];

  // --- DOM refs ---
  const citySelect = document.getElementById('citySelect');
  const itemSelect = document.getElementById('itemSelect');
  const unitSelect = document.getElementById('unitSelect');
  const timeSelect = document.getElementById('timeSelect');
  const userPriceInput = document.getElementById('userPrice');
  const btnSave = document.getElementById('btnSave');
  const historyList = document.getElementById('historyList');
  const clearHistoryBtn = document.getElementById('clearHistory');
  const exportPdfBtn = document.getElementById('exportPdf');
  const nationalBox = document.getElementById('nationalBox');
  const predSummary = document.getElementById('predSummary');

  const regressionFnP = document.getElementById('regressionFn');
  const derivativeInfoP = document.getElementById('derivativeInfo');
  const limitInfoP = document.getElementById('limitInfo');
  const calcForecastBtn = document.getElementById('calcForecast');
  const forecastResult = document.getElementById('forecastResult');

  const ineqValueInput = document.getElementById('ineqValue');
  const checkIneqBtn = document.getElementById('checkIneq');
  const ineqResult = document.getElementById('ineqResult');

  const funcInput = document.getElementById('funcInput');
  const deriveBtn = document.getElementById('deriveBtn');
  const deriveResult = document.getElementById('deriveResult');
  const plotFuncBtn = document.getElementById('plotFuncBtn');

  const limitFunc = document.getElementById('limitFunc');
  const limitPoint = document.getElementById('limitPoint');
  const limitBtn = document.getElementById('limitBtn');
  const limitResult = document.getElementById('limitResult');

  const explainBox = document.getElementById('explainBox');

  const helpBtn = document.getElementById('helpBtn');
  const guideOverlay = document.getElementById('guideOverlay');
  const guideClose = document.getElementById('guideClose');

  const resetZoomBtn = document.getElementById('resetZoom');

  // --- Chart setup ---
  const ctx = document.getElementById('priceChart').getContext('2d');
  let priceChart = null;

  // --- Local Storage keys ---
  const HISTORY_KEY = 'priceAppHistory_v1';

  // --- Utilities ---
  function el(tag, text){ const e = document.createElement(tag); if(text) e.textContent = text; return e; }
  function daysArray(n=30){
    const arr = [];
    const today = new Date();
    for(let i=n-1;i>=0;i--){
      const d = new Date(today);
      d.setDate(today.getDate()-i);
      arr.push(d.toISOString().slice(0,10));
    }
    return arr;
  }

  function randomAround(base, range=0.1){
    const factor = 1 + (Math.random()*2-1)*range;
    return Math.round(base * factor);
  }

  // --- populate selects ---
  function populateControls(){
    citySelect.innerHTML = cities.map(c => `<option>${c}</option>`).join('');
    itemSelect.innerHTML = defaultItems.map(it => `<option>${it}</option>`).join('');
  }

  // --- Mock data loader (30 days) ---
  function getMockSeries(item, city){
    // simplistic base price heuristics per item
    const baseMap = {
      "Beras": 12000, "Gula": 12500, "Minyak Goreng": 18000, "Telur Ayam": 21000, "Cabe Merah": 45000
    };
    const base = baseMap[item] || 10000;
    const dates = daysArray(30);
    const values = dates.map((d, idx) => {
      // add a slight trend depending on city name hash
      const cityHash = city.split('').reduce((s,ch)=>s+ch.charCodeAt(0),0);
      const trend = ((cityHash % 11) - 5) * 2; // -10..+10 over 30 days
      return Math.max(100, randomAround(base + (idx*trend/30), 0.06));
    });
    return {dates, values};
  }

  // --- Linear regression (ordinary least squares) ---
  // x will be [0..n-1], y = values
  function linearRegression(y){
    const n = y.length;
    const x = Array.from({length:n}, (_,i)=>i);
    const xMean = (n-1)/2;
    const yMean = y.reduce((a,b)=>a+b,0)/n;
    let num=0, den=0;
    for(let i=0;i<n;i++){ num += (x[i]-xMean)*(y[i]-yMean); den += (x[i]-xMean)*(x[i]-xMean); }
    const slope = den===0 ? 0 : num/den;
    const intercept = yMean - slope * xMean;
    return {slope, intercept};
  }

  // --- build chart ---
  function createChart(dates, values){
    if(priceChart) priceChart.destroy();
    priceChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Harga (Rp)',
            data: values,
            fill: false,
            tension: 0.2,
            pointRadius: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          zoom: {
            pan: { enabled: true, mode: 'x' },
            zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' }
          },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: { display: true },
          y: { display: true, beginAtZero: false }
        }
      }
    });
  }

  // --- draw regression line on chart ---
  function overlayRegression(slope, intercept, n){
    // create dataset for regression line from x=0..n-1
    const reg = [];
    for(let i=0;i<n;i++) reg.push(Math.round(intercept + slope * i));
    // remove existing regression dataset if present (label 'Regresi')
    const existingIndex = priceChart.data.datasets.findIndex(ds => ds.label === 'Regresi');
    if(existingIndex >= 0) priceChart.data.datasets.splice(existingIndex,1);
    priceChart.data.datasets.push({
      label: 'Regresi',
      data: reg,
      borderDash: [6,4],
      borderWidth: 2,
      fill: false,
      pointRadius: 0
    });
    priceChart.update();
  }

  // --- local storage history ---
  function loadHistory(){
    const raw = localStorage.getItem(HISTORY_KEY);
    try {
      return raw ? JSON.parse(raw) : [];
    } catch(e){
      return [];
    }
  }
  function saveHistory(arr){
    localStorage.setItem(HISTORY_KEY, JSON.stringify(arr));
    renderHistory();
  }
  function renderHistory(){
    const arr = loadHistory();
    historyList.innerHTML = '';
    if(!arr.length){
      historyList.innerHTML = '<p class="muted">Belum ada input user.</p>';
      return;
    }
    const ul = el('ul');
    arr.slice().reverse().forEach(item => {
      const li = el('li');
      li.innerHTML = `<strong>${item.item}</strong> — ${item.city} — ${item.price} Rp — <span class="muted small">${item.date}</span>`;
      ul.appendChild(li);
    });
    historyList.appendChild(ul);
  }

  // --- simple "national" summary (mean of mock) ---
  function updateNationalBox(values){
    const mean = Math.round(values.reduce((a,b)=>a+b,0)/values.length);
    nationalBox.textContent = `Rata-rata 30 hari terakhir: Rp ${mean.toLocaleString()}`;
    predSummary.textContent = `Nilai rata-rata dipakai sebagai acuan nasional (fallback mock).`;
  }

  // --- compute and display regression/derivative/limit info ---
  function computeAndShowCalculus(values, dates){
    const {slope, intercept} = linearRegression(values);
    regressionFnP.textContent = `f(x) = ${intercept.toFixed(2)} + ${slope.toFixed(4)}·x  (x = hari, 0 = ${dates[0]})`;
    derivativeInfoP.textContent = `f'(x) = ${slope.toFixed(4)} (konstan karena regresi linear).`;
    limitInfoP.textContent = `Limit (contoh pendekatan numerik) pada titik terakhir ≈ f(n-1) = ${Math.round(intercept + slope*(values.length-1))}`;
    overlayRegression(slope, intercept, values.length);
    // save last regression to data attribute
    priceChart._lastReg = {slope, intercept};
  }

  // --- forecast next 7 days using linear model ---
  function forecastNext7(values){
    const n = values.length;
    const reg = linearRegression(values);
    const preds = [];
    for(let i=0;i<7;i++){
      const x = n + i; // next days
      preds.push(Math.round(reg.intercept + reg.slope * x));
    }
    return {preds, reg};
  }

  // --- check inequality: compare predicted day (n+daysAhead) with user provided value ---
  function checkInequality(userVal, daysAhead = 7){
    const vals = currentSeries.values;
    const {reg} = forecastNext7(vals);
    const pred = Math.round(reg.intercept + reg.slope * (vals.length + daysAhead - 1));
    if(userVal > pred) return {result: 'lebih besar', pred};
    if(userVal < pred) return {result: 'lebih kecil', pred};
    return {result: 'sama', pred};
  }

  // --- derivative (symbolic) using math.js ---
  function deriveSymbolic(expr){
    try{
      const node = math.parse(expr);
      const d = math.derivative(node, 'x');
      return d.toString();
    }catch(e){
      console.error(e);
      return null;
    }
  }

  // --- numeric limit: approach from two sides ---
  function numericLimit(expr, a){
    try{
      const f = (x) => math.evaluate(expr, {x});
      const hvals = [1e-1,1e-2,1e-3,1e-4,1e-5];
      const left = hvals.map(h => f(a - h));
      const right = hvals.map(h => f(a + h));
      const approx = (left[left.length-1] + right[right.length-1]) / 2;
      return {left: left[ left.length-1 ], right: right[ right.length-1 ], approx};
    }catch(e){
      return null;
    }
  }

  // --- export PDF (simple) ---
  async function exportPdf(){
    if(!priceChart) return alert('Chart belum siap.');
    const pdf = new jspdf.jsPDF({orientation:'landscape'});
    pdf.setFontSize(14);
    pdf.text('Laporan Harga & Prediksi', 10, 14);
    pdf.setFontSize(10);
    pdf.text(`Kota: ${citySelect.value}    Komoditas: ${itemSelect.value}    Unit: ${unitSelect.value}`, 10, 22);
    // add chart image
    const img = priceChart.toBase64Image();
    pdf.addImage(img, 'PNG', 10, 28, 270, 110);
    // add regression and short text
    pdf.setFontSize(10);
    pdf.text(`Regresi: ${regressionFnP.textContent}`, 10, 145);
    pdf.text(`Turunan: ${derivativeInfoP.textContent}`, 10, 152);
    const hist = loadHistory();
    pdf.text(`Jumlah input user tersimpan: ${hist.length}`, 10, 160);
    pdf.save(`laporan-harga-${itemSelect.value}-${citySelect.value}.pdf`);
  }

  // --- global state ---
  let currentSeries = {dates:[], values:[]};

  // --- main load / event wiring ---
  function init(){
    populateControls();
    renderHistory();
    // initial load
    loadSeriesAndRender();

    // events
    citySelect.addEventListener('change', loadSeriesAndRender);
    itemSelect.addEventListener('change', loadSeriesAndRender);
    unitSelect.addEventListener('change', loadSeriesAndRender);
    timeSelect.addEventListener('change', () => {/* left for future; currently does not change series */});

    btnSave.addEventListener('click', () => {
      const price = Number(userPriceInput.value);
      if(!price || isNaN(price)) return alert('Masukkan harga numerik yang valid.');
      const rec = {
        date: (new Date()).toISOString().slice(0,10),
        city: citySelect.value,
        item: itemSelect.value,
        unit: unitSelect.value,
        price
      };
      const arr = loadHistory();
      arr.push(rec);
      saveHistory(arr);
      userPriceInput.value = '';
      explainBox.textContent = `Input disimpan: ${rec.item} @ ${rec.city} — Rp ${rec.price}`;
    });

    clearHistoryBtn.addEventListener('click', () => {
      if(confirm('Hapus semua history input user?')) {
        localStorage.removeItem(HISTORY_KEY);
        renderHistory();
      }
    });

    exportPdfBtn.addEventListener('click', exportPdf);

    calcForecastBtn.addEventListener('click', () => {
      const {preds, reg} = forecastNext7(currentSeries.values);
      forecastResult.innerHTML = `Prediksi 7 hari: ${preds.map(p=> 'Rp '+p.toLocaleString()).join(' — ')}`;
      explainBox.textContent = `Prediksi dibuat dengan model regresi linear sederhana. Slope = ${reg.slope.toFixed(4)} (Rp/hari). Intercept = ${reg.intercept.toFixed(2)}.`;
    });

    checkIneqBtn.addEventListener('click', () => {
      const val = Number(ineqValueInput.value);
      if(isNaN(val)) return alert('Masukkan angka untuk perbandingan.');
      const res = checkInequality(val, 7);
      ineqResult.textContent = `Nilai Anda (${val}) ${res.result} dari prediksi 7-hari (prediksi = Rp ${res.pred.toLocaleString()}).`;
    });

    deriveBtn.addEventListener('click', () => {
      const expr = funcInput.value.trim();
      if(!expr) return alert('Masukkan fungsi terlebih dahulu.');
      const d = deriveSymbolic(expr);
      deriveResult.textContent = d ? `f'(x) = ${d}` : 'Gagal menghitung turunan (periksa sintaks).';
    });

    plotFuncBtn.addEventListener('click', () => {
      const expr = funcInput.value.trim();
      if(!expr) return alert('Masukkan fungsi terlebih dahulu.');
      // plot on chart: evaluate on -10..10
      try{
        const xs = Array.from({length:41}, (_,i)=>i-20);
        const ys = xs.map(x => math.evaluate(expr, {x}));
        // show a new chart for the function (replace datasets)
        if(priceChart){
          priceChart.data.labels = xs.map(x => x.toString());
          priceChart.data.datasets = [{ label: 'f(x)', data: ys, pointRadius:2, tension:0.2 }];
          priceChart.update();
          explainBox.textContent = 'Menampilkan plot fungsi yang dimasukkan (sumbu x = -20..20).';
        }
      }catch(e){
        alert('Gagal mem-plot fungsi: periksa ekspresi (contoh: 3*x^2 + 7*x - 5).');
      }
    });

    limitBtn.addEventListener('click', () => {
      const expr = limitFunc.value.trim();
      const a = Number(limitPoint.value);
      if(!expr || isNaN(a)) return alert('Masukkan fungsi dan titik a.');
      const r = numericLimit(expr, a);
      if(!r) return limitResult.textContent = 'Gagal menghitung limit (periksa ekspresi).';
      limitResult.textContent = `Limit sekitar ${a}: kiri=${Number(r.left).toFixed(6)}, kanan=${Number(r.right).toFixed(6)}, aprox=${Number(r.approx).toFixed(6)}`;
      explainBox.textContent = `Pendekatan numerik mengambil h kecil dari kedua sisi. Untuk limit eksak simbolik, diperlukan manipulasi aljabar.`;
    });

    helpBtn.addEventListener('click', () => guideOverlay.classList.add('show'));
    guideClose.addEventListener('click', () => guideOverlay.classList.remove('show'));

    resetZoomBtn.addEventListener('click', () => {
      if(priceChart) priceChart.resetZoom();
    });
  }

  // --- load series (mock) and render chart + analytics ---
  function loadSeriesAndRender(){
    const city = citySelect.value || cities[0];
    const item = itemSelect.value || defaultItems[0];
    const series = getMockSeries(item, city);
    currentSeries = series;
    createChart(series.dates, series.values);
    updateNationalBox(series.values);
    computeAndShowCalculus(series.values, series.dates);
  }

  // init after DOM ready
  document.addEventListener('DOMContentLoaded', init);
})();

// ==== ADDITIONAL EXPLANATION MODULE (TAMBAHAN) ====
// NOTE: kode tambahan ini tidak mengubah kode asli di atas.
// Ia berdiri sendiri, membaca DOM dan Chart.js public API untuk membuat
// penjelasan kalkulus, interpretasi, dan analisis grafik.

(function(){
  // small helpers (local, do not touch original state)
  function getChart(){
    // Chart.js v4 provides Chart.getChart(canvasId) — try that first.
    try {
      const chart = Chart.getChart('priceChart');
      if(chart) return chart;
    } catch(e) {}
    // fallback: get the first Chart instance that references canvas id 'priceChart'
    const canv = document.getElementById('priceChart');
    if(!canv) return null;
    return Chart.getChart(canv) || null;
  }

  function parseNumbers(arr){
    return arr.map(v => {
      const n = Number(v);
      return isNaN(n) ? null : n;
    }).filter(v => v !== null);
  }

  function ols(y){
    // compute slope & intercept for x = 0..n-1
    const n = y.length;
    if(n === 0) return {slope:0, intercept:0};
    const xMean = (n-1)/2;
    const yMean = y.reduce((a,b)=>a+b,0)/n;
    let num = 0, den = 0;
    for(let i=0;i<n;i++){
      num += (i - xMean) * (y[i] - yMean);
      den += (i - xMean) * (i - xMean);
    }
    const slope = den === 0 ? 0 : num/den;
    const intercept = yMean - slope * xMean;
    return {slope, intercept};
  }

  function stddev(arr){
    const n = arr.length;
    if(n === 0) return 0;
    const mean = arr.reduce((a,b)=>a+b,0)/n;
    const v = arr.reduce((a,b)=>a + (b-mean)*(b-mean), 0) / n;
    return Math.sqrt(v);
  }

  function formatRp(n){
    return 'Rp ' + (Math.round(n)).toLocaleString();
  }

  // numeric limit approach (local copy) using math.js
  function numericLimitLocal(expr, a){
    try{
      const f = (x) => math.evaluate(expr, {x});
      const hvals = [1e-1,1e-2,1e-3,1e-4,1e-5];
      const left = hvals.map(h => f(a - h));
      const right = hvals.map(h => f(a + h));
      const approx = (left[left.length-1] + right[right.length-1]) / 2;
      return {left: left[left.length-1], right: right[right.length-1], approx};
    }catch(e){
      return null;
    }
  }

  // build explanation text (detailed)
  function buildExplanation(){
    const chart = getChart();
    if(!chart){
      return 'Grafik belum siap — penjelasan kalkulus akan muncul setelah grafik dimuat.';
    }

    // get raw price series from first dataset (assuming dataset 0 is harga)
    const labels = chart.data.labels ? chart.data.labels.slice() : [];
    const ds = chart.data.datasets && chart.data.datasets[0] ? chart.data.datasets[0].data.slice() : [];
    const y = parseNumbers(ds);
    if(y.length === 0) return 'Data harga tidak tersedia untuk dianalisis.';

    // compute regression (OLS) and present function
    const reg = ols(y);
    const intercept = reg.intercept;
    const slope = reg.slope;

    // interpret slope
    let slopeInterpret;
    const eps = 1e-6;
    if(Math.abs(slope) < eps) slopeInterpret = 'Turunan (slope) sangat mendekati 0 → harga relatif stabil dalam periode ini.';
    else if(slope > 0) slopeInterpret = `f'(x) = ${slope.toFixed(4)} > 0 → harga cenderung naik rata-rata sekitar ${slope.toFixed(2)} Rp per hari.`;
    else slopeInterpret = `f'(x) = ${slope.toFixed(4)} < 0 → harga cenderung turun rata-rata sekitar ${Math.abs(slope).toFixed(2)} Rp per hari.`;

    // trend summary (overall)
    const first = y[0], last = y[y.length-1];
    const pctChange = ((last - first)/first) * 100;
    const trendLabel = pctChange > 2 ? 'naik' : pctChange < -2 ? 'turun' : 'relatif stabil';

    // volatility
    const sd = stddev(y);
    const relVol = (sd / (y.reduce((a,b)=>a+b,0)/y.length)) * 100;
    const volLabel = relVol < 2 ? 'rendah' : relVol < 6 ? 'sedang' : 'tinggi';

    // recent 7-day slope (simple OLS on last 7 days)
    const lastWindow = y.slice(Math.max(0, y.length - 7));
    const reg7 = ols(lastWindow);
    const recentSlope = reg7.slope;
    let recentInterpret = '';
    if(Math.abs(recentSlope) < eps) recentInterpret = 'Dalam 7 hari terakhir, perubahan rata-rata kecil (mendekati 0).';
    else if(recentSlope > 0) recentInterpret = `Dalam 7 hari terakhir, harga naik rata-rata ≈ ${recentSlope.toFixed(2)} Rp/hari.`;
    else recentInterpret = `Dalam 7 hari terakhir, harga turun rata-rata ≈ ${Math.abs(recentSlope).toFixed(2)} Rp/hari.`;

    // prediction example: next day and 7-day forecast (simple)
    const n = y.length;
    const nextDayPred = intercept + slope * (n); // x = n is next day (since data uses 0..n-1)
    // create quick 7-day preds
    const preds7 = [];
    for(let i=0;i<7;i++){
      preds7.push(Math.round(intercept + slope * (n + i)));
    }

    // build explanation text
    let text = '';
    text += `Analisis Data & Kalkulus — Komoditas: ${itemSelect.value}  |  Lokasi: ${citySelect.value}\n\n`;

    text += '1) Ringkasan trend & volatilitas\n';
    text += `- Periode data: ${labels.length} hari (terbaru: ${labels[labels.length-1]}).\n`;
    text += `- Harga awal: ${formatRp(first)}, harga akhir: ${formatRp(last)} → perubahan ≈ ${pctChange.toFixed(2)}% (${trendLabel}).\n`;
    text += `- Volatilitas (standar deviasi): ${Math.round(sd)} Rp (${relVol.toFixed(2)}% relatif) → ${volLabel} fluktuasi.\n\n`;

    text += '2) Regresi linear (aproksimasi)\n';
    text += `- Fungsi aproksimasi (OLS) dari data: f(x) = ${intercept.toFixed(2)} + ${slope.toFixed(4)}·x  (x = hari, 0 = ${labels[0]}).\n`;
    text += `- Interpretasi slope: ${slopeInterpret}\n`;
    text += `- Contoh prediksi: hari berikutnya ≈ ${formatRp(nextDayPred)}. Prediksi 7 hari: ${preds7.map(p=>formatRp(p)).join(' — ')}\n\n`;

    text += '3) Turunan (makna dan contoh)\n';
    text += `- Turunan f'(x) untuk fungsi regresi linear = slope (konstan): ${slope.toFixed(4)}.\n`;
    text += `- Makna: f'(x) memberi laju perubahan harga per hari. Jika positif → harga naik; negatif → turun; besar mutlak → perubahan cepat.\n`;
    text += `- Contoh interpretasi: ${slopeInterpret}\n\n`;

    text += '4) Limit (penjelasan & numerik)\n';
    text += `- Konsep: limit f(x) untuk x → a melihat perilaku fungsi mendekati titik a dari kiri/kanan.\n`;
    text += `- Untuk data diskrit harga, kita menggunakan aproksimasi numerik pada fungsi yang diminta oleh pengguna (jika ada).\n`;
    text += `- (Gunakan panel 'Kalkulator Limit' untuk melihat contoh numerik dari fungsi yang Anda masukkan.)\n\n`;

    text += '5) Analisis 7-hari terakhir\n';
    text += `- ${recentInterpret}\n\n`;

    text += '6) Pertidaksamaan & Perbandingan (cara interpretasi)\n';
    text += `- Jika Anda membandingkan nilai yang Anda bayar terhadap prediksi 7-hari: nilai lebih besar berarti kemungkinan Anda membayar di atas ekspektasi pasar dalam model linear sederhana.\n`;
    text += `- Model sederhana ini tidak mempertimbangkan variabel lain (musiman, pasokan, kebijakan).\n\n`;

    text += '7) Rekomendasi singkat untuk pengguna\n';
    text += `- Jika slope > 0 dan prediksi terus naik: pertimbangkan menunda pembelian bila memungkinkan atau mencari alternatif más murah.\n`;
    text += `- Jika slope < 0: kemungkinan harga menurun; monitor 3–7 hari untuk konfirmasi.\n`;
    text += `- Perhatikan volatilitas: jika volatilitas tinggi, prediksi jangka pendek kurang dapat diandalkan.\n\n`;

    text += 'Catatan teknis singkat\n';
    text += '- Model yang digunakan: regresi linear sederhana (OLS) pada indeks hari.\n';
    text += '- Untuk analisis lebih kuat: tambahkan model musiman, moving average, atau model time-series (ARIMA/Prophet).\n';

    return text;
  }

  // update explainBox content by recomputing analysis
  function updateExplainBox(){
    const box = document.getElementById('explainBox');
    if(!box) return;
    box.textContent = buildExplanation();
  }

  // Hook events: whenever user requests calc, derive, limit, inequality, or switches city/item, update explanation.
  function attachHooks(){
    const updateTriggers = [
      'calcForecast', 'deriveBtn', 'limitBtn', 'checkIneq', 'btnSave', 'citySelect', 'itemSelect', 'unitSelect'
    ];
    updateTriggers.forEach(id => {
      const el = document.getElementById(id);
      if(!el) return;
      el.addEventListener('click', () => {
        // small timeout so original handlers update DOM first
        setTimeout(updateExplainBox, 120);
      });
      // also update on change for selects
      if(el.tagName === 'SELECT'){
        el.addEventListener('change', () => setTimeout(updateExplainBox, 120));
      }
    });

    // chart update: listen for canvas clicks/updates and refresh explanation
    const canv = document.getElementById('priceChart');
    if(canv){
      canv.addEventListener('mousemove', () => {
        // throttle
        if(window._explainThrottle) return;
        window._explainThrottle = true;
        setTimeout(()=>{ updateExplainBox(); window._explainThrottle = false; }, 600);
      });
    }

    // also update when DOM content loads
    document.addEventListener('DOMContentLoaded', () => setTimeout(updateExplainBox, 300));
    // and do an initial call (in case script runs after DOMContentLoaded)
    setTimeout(updateExplainBox, 500);
  }

  // additional: when user computes derivative symbolik via deriveBtn, add a short explanation inserted near deriveResult
  function attachDeriveExplanation(){
    const deriveBtnEl = document.getElementById('deriveBtn');
    const deriveResultEl = document.getElementById('deriveResult');
    if(!deriveBtnEl || !deriveResultEl) return;
    deriveBtnEl.addEventListener('click', () => {
      setTimeout(()=>{
        const expr = (document.getElementById('funcInput') || {}).value || '';
        if(!expr) return;
        try{
          const node = math.parse(expr);
          const dnode = math.derivative(node, 'x');
          const derivStr = dnode.toString();
          // create friendly explanation
          const explanation = `Penjelasan Turunan\n- Fungsi yang dimasukkan: f(x) = ${expr}\n- Turunan simbolik: f'(x) = ${derivStr}\n- Interpretasi: f'(x) dinyatakan sebagai fungsi baru; untuk nilai x tertentu, substitusi x ke f'(x) memberi laju perubahan pada titik itu.\nContoh: jika ingin tahu laju pada x = 2, gunakan f'(2) dengan mengganti x=2.`;
          // append explanation (non-destructive)
          const nodeExists = document.getElementById('deriveExplain');
          if(nodeExists) nodeExists.textContent = explanation;
          else {
            const p = document.createElement('div');
            p.id = 'deriveExplain';
            p.style.marginTop = '8px';
            p.style.whiteSpace = 'pre-wrap';
            p.className = 'small muted';
            p.textContent = explanation;
            deriveResultEl.parentNode.appendChild(p);
          }
        }catch(e){
          // ignore
        }
      }, 120);
    });
  }

  // additional: when user computes limit, add explanation
  function attachLimitExplanation(){
    const limitBtnEl = document.getElementById('limitBtn');
    const limitResultEl = document.getElementById('limitResult');
    if(!limitBtnEl || !limitResultEl) return;
    limitBtnEl.addEventListener('click', () => {
      setTimeout(()=>{
        const expr = (document.getElementById('limitFunc') || {}).value || '';
        const aStr = (document.getElementById('limitPoint') || {}).value || '';
        if(!expr || aStr==='') return;
        const a = Number(aStr);
        const r = numericLimitLocal(expr, a);
        if(!r) return;
        const explanation = `Penjelasan Limit numerik untuk f(x) = ${expr} pada x → ${a}\n- Nilai dari kiri ≈ ${Number(r.left).toFixed(6)}\n- Nilai dari kanan ≈ ${Number(r.right).toFixed(6)}\n- Aproksimasi limit ≈ ${Number(r.approx).toFixed(6)}\nInterpretasi: jika kiri ≈ kanan maka limit ada dan nilainya seperti di atas. Jika berbeda signifikan, limit tidak ada atau tidak terdefinisi secara biasa.`;
        const nodeExists = document.getElementById('limitExplain');
        if(nodeExists) nodeExists.textContent = explanation;
        else {
          const p = document.createElement('div');
          p.id = 'limitExplain';
          p.style.marginTop = '8px';
          p.style.whiteSpace = 'pre-wrap';
          p.className = 'small muted';
          p.textContent = explanation;
          limitResultEl.parentNode.appendChild(p);
        }
      }, 140);
    });
  }

  // additional: when user checks inequality, add explanation
  function attachIneqExplanation(){
    const checkBtn = document.getElementById('checkIneq');
    if(!checkBtn) return;
    checkBtn.addEventListener('click', () => {
      setTimeout(()=>{
        const valStr = (document.getElementById('ineqValue') || {}).value || '';
        const val = Number(valStr);
        if(isNaN(val)) return;
        // compute prediction (7 days)
        const chart = getChart();
        if(!chart) return;
        const ds = chart.data.datasets && chart.data.datasets[0] ? chart.data.datasets[0].data.slice() : [];
        const y = parseNumbers(ds);
        if(y.length === 0) return;
        const reg = ols(y);
        const n = y.length;
        const pred7 = Math.round(reg.intercept + reg.slope * (n + 6)); // day n+6 is 7th day ahead (as used in checkIneq)
        const comparison = val > pred7 ? 'lebih tinggi' : val < pred7 ? 'lebih rendah' : 'sama dengan';
        const explanation = `Pertidaksamaan & Interpretasi\n- Nilai Anda: ${formatRp(val)}\n- Prediksi model (hari ke-7): ${formatRp(pred7)}\n- Hasil: nilai Anda ${comparison} prediksi.\nInterpretasi: model linear sederhana memprediksi nilai rata-rata; perbedaan bisa disebabkan oleh faktor lokal, kualitas barang, atau variasi pasokan.`;
        const nodeExists = document.getElementById('ineqExplain');
        if(nodeExists) nodeExists.textContent = explanation;
        else {
          const p = document.createElement('div');
          p.id = 'ineqExplain';
          p.style.marginTop = '8px';
          p.style.whiteSpace = 'pre-wrap';
          p.className = 'small muted';
          const parent = document.getElementById('ineqResult') || document.body;
          parent.parentNode.appendChild(p);
          p.textContent = explanation;
        }
      }, 140);
    });
  }

  // initialize
  function initAddOn(){
    attachHooks();
    attachDeriveExplanation();
    attachLimitExplanation();
    attachIneqExplanation();
    // one-time update after slight delay
    setTimeout(()=>{ try{ updateExplainBox(); }catch(e){} }, 600);
  }

  // run
  initAddOn();

})(); // end additional module
