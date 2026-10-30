import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const trimmedNama = formData.nama.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPesan = formData.pesan.trim();

    if (!trimmedNama || !trimmedEmail || !trimmedPesan) {
      setErrorMsg("Semua field wajib diisi dengan lengkap.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg("Format email tidak valid (pastikan mengandung '@' dan domain yang benar).");
      return;
    }

    setSuccessMsg("Terima kasih! Pesanmu berhasil dikirim ke ruang kita.");
    setFormData({ nama: "", email: "", pesan: "" });
  };

  return (
    <section className="contact-section bg-[#FAF7F2] px-6 py-20" id="kontak">
      <div className="mx-auto max-w-180 rounded-2xl border border-[#EBE3D5] bg-white p-8 shadow-md sm:p-12" data-reveal>
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-serif text-3xl font-bold text-[#513722] sm:text-4xl">Hubungi Kami</h2>
          <p className="text-sm leading-relaxed text-[#746658] sm:text-base">
            Punya saran, pertanyaan, atau ingin menyapa? Kirim pesan ke ruang kita.
          </p>
        </div>

        {errorMsg && (
          <div className="animate-fade-in mb-6 rounded-lg border border-[#F5C6CB] bg-[#FDF2F2] p-4 text-sm text-[#A94442]">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="animate-fade-in mb-6 rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] p-4 text-sm text-[#15803D]">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nama" className="mb-2 block text-sm font-semibold text-[#513722]">
              Nama <span className="text-amber-700">*</span>
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="w-full rounded-lg border border-[#D9CEBF] bg-[#FCFBF8] px-4 py-3 text-sm text-[#34291f] transition focus:bg-white focus:ring-2 focus:ring-[#8E6F53] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#513722]">
              Email <span className="text-amber-700">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              className="w-full rounded-lg border border-[#D9CEBF] bg-[#FCFBF8] px-4 py-3 text-sm text-[#34291f] transition focus:bg-white focus:ring-2 focus:ring-[#8E6F53] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="pesan" className="mb-2 block text-sm font-semibold text-[#513722]">
              Saran / Pesan / Masukan <span className="text-amber-700">*</span>
            </label>
            <textarea
              id="pesan"
              name="pesan"
              rows="4"
              value={formData.pesan}
              onChange={handleChange}
              placeholder="Tuliskan pesan atau masukanmu di sini..."
              className="w-full resize-y rounded-lg border border-[#D9CEBF] bg-[#FCFBF8] px-4 py-3 text-sm text-[#34291f] transition focus:bg-white focus:ring-2 focus:ring-[#8E6F53] focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="inline-flex w-full transform cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#513722] px-8 py-3.5 text-sm font-medium text-[#FFFDF8] shadow-md transition hover:-translate-y-0.5 hover:bg-[#3D2817] sm:w-auto"
          >
            Kirim Pesan <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </section>
  );
}
