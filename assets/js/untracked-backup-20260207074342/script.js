// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false
    });

    // Deteksi halaman: jika index.html, gunakan limit; jika pengurus.html atau katalog.html, tampilkan semua
    const isHomePage = !window.location.pathname.includes('pengurus.html') && !window.location.pathname.includes('katalog.html');

    // Load Data
    if (isHomePage) {
        loadPengurus(5);  // Tampilkan 5 pengurus di halaman awal
        loadBuku('', 8);  // Tampilkan 8 buku di halaman awal
    } else {
        loadPengurus();   // Tampilkan semua pengurus
        loadBuku();       // Tampilkan semua buku
    }
    loadKomentar();

    // Setup Event Listeners
    setupEventListeners();

    // Hover card effects
    setupCardHoverEffects();
});

// ============ LOAD DATA FUNCTIONS ============

function loadPengurus(limit = 0) {
    const container = document.getElementById('container-pengurus');
    if (!container) return;
    container.innerHTML = '';

    // Jika limit > 0, tampilkan hanya sebanyak limit; jika 0 atau tidak ada, tampilkan semua
    const penguruxsToShow = limit > 0 ? pengurus.slice(0, limit) : pengurus;

    penguruxsToShow.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-md-2 mb-3';
        col.innerHTML = `
            <div class="card text-center border-0 shadow-sm h-100 hover-card">
                <div class="card-body">
                    <img src="assets/img/${p.foto}" class="rounded-circle mb-3 shadow" width="80" height="80" alt="${p.nama}" style="object-fit:cover; border: 3px solid #0f766e;">
                    <h5 class="card-title" style="font-size: 1rem;">${p.nama}</h5>
                    <p class="text-muted small">${p.jabatan}</p>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function loadBuku(filter = '', limit = 0) {
    const container = document.getElementById('container-buku');
    if (!container) return;
    container.innerHTML = '';

    let bukuFiltered = buku.filter(b => 
        b.judul.toLowerCase().includes(filter.toLowerCase()) ||
        b.penulis.toLowerCase().includes(filter.toLowerCase()) ||
        b.kategori.toLowerCase().includes(filter.toLowerCase()) ||
        (b.penerbit || '').toLowerCase().includes(filter.toLowerCase())
    );

    if (bukuFiltered.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="text-center text-muted">Buku tidak ditemukan</p></div>';
        return;
    }

    // Jika limit > 0, tampilkan hanya sebanyak limit; jika 0 atau tidak ada, tampilkan semua
    const bukuToShow = limit > 0 ? bukuFiltered.slice(0, limit) : bukuFiltered;

    bukuToShow.forEach(b => {
        const col = document.createElement('div');
        col.className = 'col-md-3 mb-4';
        const btnClass = 'btn-outline-success';
        const btnDisabled = '';
        col.innerHTML = `
            <div class="card h-100 shadow-sm hover-card">
                <div class="position-relative">
                    <img src="assets/img/${b.gambar}" class="card-img-top" alt="${b.judul}" style="height: 250px; object-fit: cover; border: 1px solid #e2e8f0;">
                </div>
                <div class="card-body">
                    <h6 class="card-title text-truncate">${b.judul}</h6>
                    <small class="text-muted d-block mb-2"><strong>Penulis:</strong> ${b.penulis}</small>
                    <small class="text-muted d-block mb-3"><strong>Kategori:</strong> ${b.kategori}</small>
                    <button class="btn btn-sm ${btnClass} w-100 btn-detail" data-id="${b.id}">
                        Lihat Detail
                    </button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });

    // Setup detail buttons
    document.querySelectorAll('.btn-detail').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            showDetailBuku(id);
        });
    });
}

function loadKomentar() {
    const container = document.getElementById('container-komentar');
    if (!container) return;
    container.innerHTML = '';

    if (komentar.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Belum ada komentar. Jadilah yang pertama!</p>';
        return;
    }

    // Show only latest 5 comments
    const komentarTerbaru = komentar.slice(0, 5);

    komentarTerbaru.forEach(k => {
        const div = document.createElement('div');
        div.className = 'list-group-item list-group-item-action flex-column align-items-start';
        
        const tanggal = new Date(k.tanggal);
        const tanggalFormat = tanggal.toLocaleDateString('id-ID', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        div.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1 fw-bold">${k.nama}</h6>
                <small class="text-muted">${tanggalFormat}</small>
            </div>
            <p class="mb-1 small">${k.pesan}</p>
        `;
        container.appendChild(div);
    });
}

// ============ EVENT LISTENERS ============

function setupEventListeners() {
    // Search buku
    const searchInput = document.getElementById('keyword');
    if (searchInput) {
        // use 'input' for better UX and include kategori/penerbit in filter
        searchInput.addEventListener('input', function() {
            loadBuku(this.value);
        });
    }

    // Submit komentar
    const formKomentar = document.getElementById('formKomentar');
    if (formKomentar) {
        formKomentar.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nama = this.querySelector('input[name="nama"]').value;
            const pesan = this.querySelector('input[name="pesan"]').value;

            if (nama.trim() && pesan.trim()) {
                simpanKomentar(nama, pesan);
                loadKomentar();
                
                // Reset form
                this.reset();
                
                // Show success message
                alert('Terima kasih atas masukan Anda!');
                
                // Scroll to comments
                document.getElementById('komentar').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ============ DETAIL BUKU MODAL ============

function showDetailBuku(id) {
    const book = buku.find(b => b.id == id);
    if (!book) return;

    // Create modal if not exists
    let modal = document.getElementById('detailBukuModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'detailBukuModal';
        modal.className = 'modal fade';
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-labelledby', 'detailBukuLabel');
        modal.setAttribute('aria-hidden', 'true');
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="detailBukuLabel">${book.judul}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="assets/img/${book.gambar}" class="img-fluid rounded shadow-sm" alt="${book.judul}">
                        </div>
                        <div class="col-md-8">
                            <p><strong>Penulis:</strong> ${book.penulis}</p>
                            <p><strong>Penerbit:</strong> ${book.penerbit}</p>
                            <p><strong>Tahun Terbit:</strong> ${book.tahun}</p>
                            <p><strong>Kategori:</strong> <span class="badge bg-primary">${book.kategori}</span></p>
                            <p style="display:none;"><strong>Status:</strong></p>
                            <hr>
                            <h6>Deskripsi:</h6>
                            <p style="text-align: justify;">${book.deskripsi}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                </div>
            </div>
        </div>
    `;

    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}

// ============ CARD HOVER EFFECTS ============

function setupCardHoverEffects() {
    document.querySelectorAll('.hover-card').forEach(function(el) {
        el.addEventListener('mousemove', function(e) {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            el.style.transform = `perspective(900px) rotateX(${(y - 0.5) * 6}deg) rotateY(${(x - 0.5) * 6}deg) translateY(-5px)`;
        });
        el.addEventListener('mouseleave', function() {
            el.style.transform = '';
        });
    });
}
