import React, { useState, useEffect } from "react";

interface University {
  name: string;
  ranking: string;
  citySize: string;
  climate: string;
  vagas2024: string;
  notaCorte2024: string;
}

const allUniversities: University[] = [
  { name: "Padova", ranking: "🇮🇹 #1 IT | 🌍 US #124 | QS #236 | THE 201–250", citySize: "Pádua – 208.000", climate: "Subtropical úmido (Cfa) | Verão: 26–29 / 15–19 °C | Inverno: 3–7 / 0–3 °C", vagas2024: "75", notaCorte2024: "64.6 / 63.2" },
  { name: "Pavia", ranking: "🇮🇹 #8 IT | 🌍 US #275 | QS #581–590 | THE 301–350", citySize: "Pavia – 74.000", climate: "Subtropical úmido (Cfa) | Verão: ~32 / ~20 °C | Inverno: ~9 / ~1–2 °C", vagas2024: "103", notaCorte2024: "61.8 / –" },
  { name: "Napoli Federico II", ranking: "🇮🇹 #5 IT | 🌍 US #186 | QS #351–400 | THE 351–400", citySize: "Nápoles – 908.000", climate: "Mediterrânico | Verão: 30–31 / 18–19 °C | Inverno: 15–16 / 9–10 °C", vagas2024: "15", notaCorte2024: "64.0 / 61.4" },
  { name: "Roma Tor Vergata", ranking: "🇮🇹 #13 IT | 🌍 US #408 | QS #601–650 | THE 301–350", citySize: "Roma – 2.750.000", climate: "Mediterrânico (Csa) | Verão: 30 / 20 °C | Inverno: 12 / 3 °C", vagas2024: "40", notaCorte2024: "62.0 / –" },
  { name: "Milano Statale", ranking: "🇮🇹 #3 IT | 🌍 US #156 | QS #276 | THE 201–250", citySize: "Milão – 1.370.000", climate: "Subtropical úmido (Cfa) | Verão: 30–31 / 18–20 °C | Inverno: 9–11 / 2–4 °C", vagas2024: "55", notaCorte2024: "69.2 / 67.8" },
  { name: "Milano Bicocca", ranking: "🇮🇹 #14 IT | 🌍 US #413 | QS #481–490 | THE 251–300", citySize: "Milão – 1.370.000", climate: "Subtropical úmido (Cfa) | Verão: 30–31 / 18–20 °C | Inverno: 9–11 / 2–4 °C", vagas2024: "30", notaCorte2024: "66.7 / 64.8" },
  { name: "Bologna", ranking: "🇮🇹 #2 IT | 🌍 US #112 | QS #154 | THE #155", citySize: "Bolonha – 400.000", climate: "Subtropical úmido (Cfa) | Verão: 31–32 / 17–20 °C | Inverno: ~3 / ~3 °C", vagas2024: "97", notaCorte2024: "65.6 / 64.8" },
  { name: "Bari", ranking: "🇮🇹 #31 IT | 🌍 US #603 | QS #801–850 | THE 501–600", citySize: "Bari – 320.000", climate: "Mediterrânico | Verão: >27 °C", vagas2024: "69", notaCorte2024: "59.1 / –" },
  { name: "Messina", ranking: "🇮🇹 #29 IT | 🌍 US #573 | QS #751–760 | THE 501–600", citySize: "Messina – 221.000", climate: "Mediterrânico | Verão: 32–35 °C | Inverno: 8–10 °C", vagas2024: "55", notaCorte2024: "57.6 / –" },
  { name: "Catania", ranking: "🇮🇹 #23 IT | 🌍 US #460 | QS #801–850 | THE 601–800", citySize: "Catania – 300.000", climate: "Mediterrânico | Verão: 32–35 °C | Inverno: ~10 °C", vagas2024: "30", notaCorte2024: "58.4 / –" },
  { name: "Cagliari", ranking: "🇮🇹 #36 IT | 🌍 US #653 | QS #716 | THE 601–800", citySize: "Cagliari – 147.000", climate: "Mediterrânico | Verão: 30 °C | Inverno: 8–10 °C", vagas2024: "80", notaCorte2024: "56.9 / –" },
  { name: "Parma", ranking: "🇮🇹 #26 IT | 🌍 US #487 | QS #701–750 | THE 501–600", citySize: "Parma – 199.000", climate: "Subtropical úmido (Cfa) | Verão: ~30 °C | Inverno: ~0–3 °C", vagas2024: "75", notaCorte2024: "60.3 / –" },
  { name: "Luigi Vanvitelli", ranking: "🇮🇹 — | 🌍 — | QS #1201–1400 | THE 501–600", citySize: "Caserta – ~75.000–80.000", climate: "Mediterrânico | Sem dados específicos", vagas2024: "60", notaCorte2024: "59.5 / –" },
  { name: "Turin", ranking: "🇮🇹 #6 IT | 🌍 US #209 | QS #252 | THE 401–500", citySize: "Turim – 857.000", climate: "Subtropical úmido (Cfa) | Verão: 25–28 °C | Inverno: 6–9 / 0–1 °C", vagas2024: "70", notaCorte2024: "62.4 / –" },
  { name: "La Sapienza", ranking: "🇮🇹 #4 IT | 🌍 US #128 | QS #134 | THE #181", citySize: "Roma – 2.750.000", climate: "Mediterrânico (Csa) | Verão: 30 / 20 °C | Inverno: 12 / 3 °C", vagas2024: "45", notaCorte2024: "65.5 / 65.1" },
  { name: "Marche (Ancona)", ranking: "🇮🇹 — | 🌍 — | QS — | THE —", citySize: "Ancona – 100.000", climate: "Subtropical úmido (Cfa) | Verão: 28–29 / 19 °C | Inverno: 9 / 3 °C", vagas2024: "20", notaCorte2024: "60.2 / –" }
];
