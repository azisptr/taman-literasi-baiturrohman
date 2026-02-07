// DATA PERPUSTAKAAN - Ganti dengan data Anda sendiri

const perpustakaanData = {
    nama: "Taman Literasi Baiturrahman",
    email: "info@tamanliterasi.id",
    noHp: "+62 857-0371-5047",
    alamat: "Jl. Raya Kadugede No. 123, Kuningan, Jawa Barat"
};

// DATA PENGURUS
const pengurus = [
    {
        id: 1,
        nama: "Fariz",
        jabatan: "Ketua",
        foto: "images.png"
    },
    {
        id: 2,
        nama: "Budi Santoso",
        jabatan: "Wakil Ketua",
        foto: "images.png"
    },
    {
        id: 3,
        nama: "Ani Wijaya",
        jabatan: "Sekretaris",
        foto: "images.png"
    },
    {
        id: 4,
        nama: "Rudi Hartono",
        jabatan: "Bendahara",
        foto: "images.png"
    },
    {
        id: 5,
        nama: "Dewi Kusuma",
        jabatan: "Koordinator Koleksi",
        foto: "images.png"
    }
];

// DATA BUKU
const buku = [
    {
        id: 1,
        judul: "Laskar Pelangi",
        penulis: "Andrea Hirata",
        penerbit: "Bentang Pustaka",
        tahun: 2005,
        kategori: "Fiksi",
        deskripsi: "Novel tentang persahabatan sepuluh anak sekolah dari keluarga yang kurang mampu di sebuah pulau kecil.",
        gambar: "atomic.png",
        tersedia: true
    },
    {
        id: 2,
        judul: "Negeri 5 Menara",
        penulis: "Ahmad Fuadi",
        penerbit: "Gramedia Pustaka Utama",
        tahun: 2009,
        kategori: "Fiksi",
        deskripsi: "Kisah lima orang santri yang bersahabat dengan mimpi menjadi pemimpin masa depan.",
        gambar: "atomic.png",
        tersedia: true
    },
    {
        id: 3,
        judul: "Bumi Manusia",
        penulis: "Pramoedya Ananta Toer",
        penerbit: "Lentera Dipantara",
        tahun: 1980,
        kategori: "Fiksi Sejarah",
        deskripsi: "Novel klasik yang menceritakan tentang perjuangan nasional dan pendidikan di era kolonial.",
        gambar: "atomic.png",
        tersedia: false
    },
    {
        id: 4,
        judul: "Pemrograman Web dengan HTML, CSS, dan JavaScript",
        penulis: "Achmad Sobarudin",
        penerbit: "Elex Media Komputindo",
        tahun: 2020,
        kategori: "Teknologi",
        deskripsi: "Panduan lengkap untuk belajar web development dari dasar hingga mahir.",
        gambar: "atomic.png",
        tersedia: true
    },
    {
        id: 5,
        judul: "Filosofi Teras",
        penulis: "Henry Manampiring",
        penerbit: "Kompas",
        tahun: 2017,
        kategori: "Self-Help",
        deskripsi: "Menggabungkan filosofi Yunani kuno dengan kehidupan modern untuk menemukan kebahagiaan sejati.",
        gambar: "atomic.png",
        tersedia: true
    },
    {
        id: 6,
        judul: "Pergi",
        penulis: "Tere Liye",
        penerbit: "Sabak Grip",
        tahun: 2014,
        kategori: "Fiksi",
        deskripsi: "Novel tentang perjalanan seorang gadis dan penemuan dirinya di tengah petualangan.",
        gambar: "atomic.png",
        tersedia: true
    },
    {
        id: 7,
        judul: "Ayah Aku Sakit",
        penulis: "Fira Basuki",
        penerbit: "Bentang Pustaka",
        tahun: 2015,
        kategori: "Fiksi",
        deskripsi: "Cerita menyentuh tentang hubungan seorang anak dengan ayahnya yang sedang sakit.",
        gambar: "atomic.png",
        tersedia: false
    },
    {
        id: 8,
        judul: "Cerita Rakyat Indonesia",
        penulis: "Berbagai Penulis",
        penerbit: "Gramedia",
        tahun: 2010,
        kategori: "Sastra Tradisional",
        deskripsi: "Kumpulan cerita rakyat dari berbagai daerah di Indonesia yang kaya budaya.",
        gambar: "atomic.png",
        tersedia: true
    }
];

// DATA KOMENTAR (Simpan otomatis di localStorage)
let komentar = JSON.parse(localStorage.getItem('komentar')) || [
    {
        id: 1,
        nama: "Ahmad Hidayat",
        pesan: "Perpustakaan yang sangat informatif dan pelayanannya luar biasa!",
        tanggal: new Date(2026, 0, 15)
    },
    {
        id: 2,
        nama: "Siti Nurhaliza",
        pesan: "Koleksi bukunya lengkap dan staf sangat membantu dalam mencari buku yang saya cari.",
        tanggal: new Date(2026, 0, 20)
    },
    {
        id: 3,
        nama: "Budi Santoso",
        pesan: "Tempat yang nyaman untuk membaca dan belajar. Akan datang lagi!",
        tanggal: new Date(2026, 0, 25)
    }
];

// Fungsi untuk simpan komentar ke localStorage
function simpanKomentar(nama, pesan) {
    const id = Math.max(...komentar.map(k => k.id), 0) + 1;
    const komentarBaru = {
        id: id,
        nama: nama,
        pesan: pesan,
        tanggal: new Date()
    };
    komentar.unshift(komentarBaru);
    localStorage.setItem('komentar', JSON.stringify(komentar));
    return komentarBaru;
}
