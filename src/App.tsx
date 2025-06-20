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
  { name: "Padova", ranking: "🇮🇹 #1 IT | 🌍 US #124 | QS #236 | THE 201–250", citySize: "208.000", climate: "Subtropical úmido (Cfa) | Verão: 26–29 / 15–19 °C | Inverno: 3–7 / 0—3 °C", vagas2024: "75", notaCorte2024: "64.6 / 63.2" },
  { name: "Pavia", ranking: "🇮🇹 #8 IT | 🌍 US #275 | QS #581–590 | THE 301–350", citySize: "74.000", climate: "Subtropical úmido (Cfa) | Verão: ~32 / ~20 °C | Inverno: ~9 / ~1–2 °C", vagas2024: "103", notaCorte2024: "61.8 / –" },
  { name: "Napoli Federico II", ranking: "🇮🇹 #5 IT | 🌍 US #186 | QS #351–400 | THE 351–400", citySize: "908.000", climate: "Mediterrânico | Verão: 30–31 / 18–19 °C | Inverno: 15–16 / 9–10 °C", vagas2024: "15", notaCorte2024: "64.0 / 61.4" },
  { name: "Roma Tor Vergata", ranking: "🇮🇹 #13 IT | 🌍 US #408 | QS #601–650 | THE 301–350", citySize: "2.750.000", climate: "Mediterrânico (Csa) | Verão: 30 / 20 °C | Inverno: 12 / 3 °C", vagas2024: "40", notaCorte2024: "62.0 / –" },
  { name: "Milano Statale", ranking: "🇮🇹 #3 IT | 🌍 US #156 | QS #276 | THE 201–250", citySize: "1.370.000", climate: "Subtropical úmido (Cfa) | Verão: 30–31 / 18–20 °C | Inverno: 9–11 / 2–4 °C", vagas2024: "55", notaCorte2024: "69.2 / 67.8" },
  { name: "Milano Bicocca", ranking: "🇮🇹 #14 IT | 🌍 US #413 | QS #481–490 | THE 251–300", citySize: "1.370.000", climate: "Subtropical úmido (Cfa) | Verão: 30–31 / 18–20 °C | Inverno: 9–11 / 2–4 °C", vagas2024: "30", notaCorte2024: "66.7 / 64.8" },
  { name: "Bologna", ranking: "🇮🇹 #2 IT | 🌍 US #112 | QS #154 | THE #155", citySize: "400.000", climate: "Subtropical úmido (Cfa) | Verão: 31–32 / 17–20 °C | Inverno: ~3 / ~3 °C", vagas2024: "97", notaCorte2024: "65.6 / 64.8" },
  { name: "Bari", ranking: "🇮🇹 #31 IT | 🌍 US #603 | QS #801–850 | THE 501–600", citySize: "320.000", climate: "Mediterrânico | Verão: >27 °C", vagas2024: "69", notaCorte2024: "59.1 / –" },
  { name: "Messina", ranking: "🇮🇹 #29 IT | 🌍 US #573 | QS #751–760 | THE 501–600", citySize: "221.000", climate: "Mediterrânico | Verão: 32–35 °C | Inverno: 8–10 °C", vagas2024: "55", notaCorte2024: "57.6 / –" },
  { name: "Catania", ranking: "🇮🇹 #23 IT | 🌍 US #460 | QS #801–850 | THE 601–800", citySize: "300.000", climate: "Mediterrânico | Verão: 32–35 °C | Inverno: ~10 °C", vagas2024: "30", notaCorte2024: "58.4 / –" },
  { name: "Cagliari", ranking: "🇮🇹 #36 IT | 🌍 US #653 | QS #716 | THE 601–800", citySize: "147.000", climate: "Mediterrânico | Verão: 30 °C | Inverno: 8–10 °C", vagas2024: "80", notaCorte2024: "56.9 / –" }
];

function getUniversityData(name: string): University | undefined {
  return allUniversities.find(u => u.name === name);
}

function combineListsByPosition(lists: string[][], length: number) {
  const chosen = new Set<string>();
  const result: string[] = [];

  for (let pos = 0; pos < length; pos++) {
    const freq: Record<string, number> = {};
    for (const list of lists) {
      if (pos < list.length) {
        const uni = list[pos];
        if (!chosen.has(uni)) {
          freq[uni] = (freq[uni] || 0) + 1;
        }
      }
    }

    let maxFreq = -1;
    let candidate: string | null = null;
    for (const [uni, count] of Object.entries(freq)) {
      if (count > maxFreq) {
        maxFreq = count;
        candidate = uni;
      }
    }

    if (!candidate) {
      outer: for (const list of lists) {
        for (const uni of list) {
          if (!chosen.has(uni)) {
            candidate = uni;
            break outer;
          }
        }
      }
    }

    if (candidate) {
      chosen.add(candidate);
      result.push(candidate);
    }
  }

  return result;
}

function ListEditor({
  title,
  list,
  setList,
  field
}: {
  title: string;
  list: string[];
  setList: React.Dispatch<React.SetStateAction<string[]>>;
  field: keyof University;
}) {
  const moveUp = (index: number) => {
    if (index === 0) return;
    const newList = [...list];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setList(newList);
  };

  const moveDown = (index: number) => {
    if (index === list.length - 1) return;
    const newList = [...list];
    [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    setList(newList);
  };

  return (
    <div style={{
      minWidth: 300,
      border: "1px solid #ccc",
      padding: 12,
      borderRadius: 8,
      margin: 8,
      flex: 1,
      overflowY: "auto",
      maxHeight: 500,
      backgroundColor: "white",
      color: "black"
    }}>
      <h3 style={{ textAlign: "center", fontWeight: "bold", color: "#2c7a7b" }}>{title}</h3>
      <ol>
        {list.map((uniName, i) => {
          const data = getUniversityData(uniName);
          return (
            <li key={uniName} style={{
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              color: "black"
            }}>
              <div style={{ flex: 1 }}>
                <strong>{uniName}</strong>
                <div style={{ fontSize: 12 }}>
                  {field === "ranking" && <>Ranking: {data?.ranking}</>}
                  {field === "climate" && <>Clima: {data?.climate}</>}
                  {field === "citySize" && <>População: {data?.citySize}</>}
                  {field === "vagas2024" && <>Número de vagas 2024: {data?.vagas2024}<br />Nota de corte 2024: {data?.notaCorte2024}</>}
                </div>
              </div>
              <div>
                <button onClick={() => moveUp(i)} disabled={i === 0}
                  style={{
                    marginRight: 4,
                    backgroundColor: "#4caf50",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 8px",
                    cursor: i === 0 ? "not-allowed" : "pointer"
                  }}>↑</button>
                <button onClick={() => moveDown(i)} disabled={i === list.length - 1}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 8px",
                    cursor: i === list.length - 1 ? "not-allowed" : "pointer"
                  }}>↓</button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function App() {
  const [clima, setClima] = useState(allUniversities.map(u => u.name));
  const [ranking, setRanking] = useState(allUniversities.map(u => u.name));
  const [tamanhoCidade, setTamanhoCidade] = useState(allUniversities.map(u => u.name));
  const [vagas, setVagas] = useState(allUniversities.map(u => u.name));

  const [combined, setCombined] = useState<string[]>([]);

  useEffect(() => {
    const combinedList = combineListsByPosition(
      [clima, ranking, tamanhoCidade, vagas],
      allUniversities.length
    );
    setCombined(combinedList);
  }, [clima, ranking, tamanhoCidade, vagas]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20, backgroundColor: "white", color: "black" }}>
      <h1 style={{ textAlign: "center", color: "#2c7a7b" }}>ChooseMed</h1>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <ListEditor title="Clima" list={clima} setList={setClima} field="climate" />
        <ListEditor title="Ranking" list={ranking} setList={setRanking} field="ranking" />
        <ListEditor title="Tamanho Cidade" list={tamanhoCidade} setList={setTamanhoCidade} field="citySize" />
        <ListEditor title="Número de vagas 2024" list={vagas} setList={setVagas} field="vagas2024" />
      </div>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ textAlign: "center" }}>Lista Combinada</h2>
        <ol>
          {combined.map((uni, i) => {
            const data = getUniversityData(uni);
            return (
              <li key={uni} style={{
                marginBottom: 8,
                padding: "4px 8px",
                borderRadius: 6,
                backgroundColor: i % 2 === 0 ? "#e0f7fa" : "#f1f8e9",
                color: "black"
              }}>
                <strong>{i + 1}. {uni}</strong><br />
                <small>
                  Clima: {data?.climate} | Ranking: {data?.ranking} | Cidade: {data?.citySize} | Número de vagas 2024: {data?.vagas2024} | Nota de corte 2024: {data?.notaCorte2024}
                </small>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
