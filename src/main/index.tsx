import React, { Fragment, useState } from "react";
import { fetchChatCompletion } from "../api/openai";
import "../styles/global.css";

const DEFAULT_PROMP = `\n\nApakah puisi itu termasuk jenis metafora, personifikasi, atau hiperbola?, dan apakah baris dan bait sudah sesuai standar puisi? jelaskan secara detail. Jika struktur puisinya salah tolong koreksi dan berikan contoh yang benar.`;

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    if (loading) return;

    const lines = input
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    if (lines.length < 8) {
      setResponse(
        `<p class="wrong" >Puisi harus memiliki setidaknya 2 bait atau 8 baris (1 bait = 4 baris)</p>`
      );
      return;
    }

    const longLines = lines.filter((line) => line.length > 120);

    if (longLines.length > 0) {
      setResponse(
        `<p class="wrong" >Beberapa baris terlalu panjang (maksimal 120 karakter per baris).</p>`
      );
      return;
    }

    const shortLines = lines.filter((line) => line.length < 10);

    console.log("lines >>", lines);

    if (shortLines.length > 0) {
      setResponse(
        `<p class="wrong" >Beberapa baris terlalu pendek (minimal 10 karakter per baris). Harap periksa kembali.</p>`
      );
      return;
    }

    setLoading(true);

    try {
      const result = await fetchChatCompletion(input + DEFAULT_PROMP);
      setResponse(result);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setResponse(error.message);
    }
  };

  return (
    <div className="App">
      <div className="p-4">
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Cek jenis gaya bahasa dan struktur puisi
          </h2>

          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition"
            placeholder="Tulis puisimu di sini..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition active:scale-[0.98]"
          >
            Cek
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center flex-col gap-5">
          {loading ? <p>Puisi sedang diperiksa...</p> : null}

          {!loading && response ? (
            <Fragment>
              <div
                className="w-1/2"
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{ __html: response }}
              />
            </Fragment>
          ) : null}

          {!loading && !response && (
            <div className="text-blue-400 text-xl">
              Hasil akan di tampilkan di sini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
