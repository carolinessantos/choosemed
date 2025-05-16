import React, { useState, useEffect } from "react";

interface University {
  name: string;
  ranking: string;
  citySize: string;
  climate: string;
  classSize: string;
}

const allUniversities: University[] = [
  { name: "Padova", ranking: "#131 QS / 151–175 THE", citySize: "Pádua (~200 mil)", climate: "Norte, frio", classSize: "~75 UE vagas" },
  { name: "Pavia", ranking: "201–250 QS / 201–250 THE", citySize: "Pavia (~70 mil)", climate: "Norte, frio", classSize: "~103 UE vagas" },
  { name: "Napoli Federico II", ranking: "201–250 QS / 201–250 THE", citySize: "Nápoles (~1 milhão)", climate: "Sul, ameno", classSize: "~15 UE vagas" },
  { name: "Roma Tor Vergata", ranking: "251–300 QS / 201–250 THE", citySize: "Roma (~2,8 milhões)", climate: "Centro, ameno", classSize: "~40 UE vagas" },
  { name: "Milano Statale", ranking: "148 QS / 201–250 THE", citySize: "Milão (~1,3 milhão)", climate: "Norte, frio", classSize: "~46 UE vagas" },
  { name: "Milano Bicocca", ranking: "392 QS / 351–400 THE", citySize: "Milão (~1,3 milhão)", climate: "Norte, frio", classSize: "~25 UE vagas" },
  { name: "Bologna", ranking: "154 QS / 161–170 THE", citySize: "Bolonha (~400 mil)", climate: "Centro-Norte, frio", classSize: "~35 UE vagas" },
  { name: "Bari", ranking: "601–650 QS / 301–400 THE", citySize: "Bari (~320 mil)", climate: "Sul, ameno", classSize: "~69 UE vagas" },
  { name: "Messina", ranking: "501–550 QS / 301–400 THE", citySize: "Messina (~230 mil)", climate: "Sul, quente", classSize: "~55 UE vagas" },
  { name: "Catania", ranking: "401–450 QS / — THE", citySize: "Catania (~300 mil)", climate: "Sul, quente", classSize: "~30 UE vagas" },
  { name: "Cagliari", ranking: "601–800 QS / 301–400 THE", citySize: "Cagliari (~150 mil)", climate: "Sul/ilha, ameno", classSize: "~80 UE vagas" }
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
}: {
  title: string;
  list: string[];
  setList: React.Dispatch<React.SetStateAction<string[]>>;
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
      maxHeight: 500
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
            }}>
              <div style={{ flex: 1 }}>
                <strong>{uniName}</strong>
                <div style={{ fontSize: 12, color: "#555" }}>
                  Clima: {data?.climate} | Ranking: {data?.ranking} | Cidade: {data?.citySize} | Turma: {data?.classSize}
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
  const [ranking, setRanking] = useState([
    "Milano Statale", "Padova", "Bologna", "Pavia",
    "Napoli Federico II", "Roma Tor Vergata", "Milano Bicocca",
    "Messina", "Bari", "Catania", "Cagliari"
  ]);
  const [tamanhoCidade, setTamanhoCidade] = useState([
    "Roma Tor Vergata", "Milano Statale", "Napoli Federico II",
    "Bari", "Padova", "Messina", "Pavia",
    "Bologna", "Milano Bicocca", "Catania", "Cagliari"
  ]);
  const [tamanhoTurma, setTamanhoTurma] = useState([
    "Pavia", "Padova", "Milano Statale", "Roma Tor Vergata",
    "Bari", "Napoli Federico II", "Bologna",
    "Milano Bicocca", "Messina", "Catania", "Cagliari"
  ]);

  const [combined, setCombined] = useState<string[]>([]);

  useEffect(() => {
    const combinedList = combineListsByPosition(
      [clima, ranking, tamanhoCidade, tamanhoTurma],
      allUniversities.length
    );
    setCombined(combinedList);
  }, [clima, ranking, tamanhoCidade, tamanhoTurma]);

  const copyCombinedToClipboard = () => {
    const text = combined.map((uni, i) => {
      const data = getUniversityData(uni);
      return `${i + 1}. ${uni} — Clima: ${data?.climate}, Ranking: ${data?.ranking}, Cidade: ${data?.citySize}, Turma: ${data?.classSize}`;
    }).join("\n");
    navigator.clipboard.writeText(text);
    alert("Lista combinada copiada para a área de transferência!");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      <h1 style={{ textAlign: "center", color: "#2c7a7b" }}>ChooseMed</h1>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <ListEditor title="Clima" list={clima} setList={setClima} />
        <ListEditor title="Ranking" list={ranking} setList={setRanking} />
        <ListEditor title="Tamanho Cidade" list={tamanhoCidade} setList={setTamanhoCidade} />
        <ListEditor title="Tamanho Turma" list={tamanhoTurma} setList={setTamanhoTurma} />
      </div>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ textAlign: "center" }}>Lista Combinada</h2>
        <button
          onClick={copyCombinedToClipboard}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "8px 16px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Copiar Lista Combinada
        </button>

        <ol>
          {combined.map((uni, i) => {
            const data = getUniversityData(uni);
            return (
              <li key={uni} style={{
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                padding: "4px 8px",
                borderRadius: 6,
                backgroundColor: i % 2 === 0 ? "#e0f7fa" : "#f1f8e9"
              }}>
                <span style={{ fontWeight: "bold", color: "#001f3f" }}>{i + 1}.</span>
                <span style={{ flex: 1, color: "#001f3f" }}>{uni}</span>
                <span>
                  <small style={{ color: "#001f3f" }}>
                    Clima: {data?.climate} | Ranking: {data?.ranking} | Cidade: {data?.citySize} | Turma: {data?.classSize}
                  </small>
                </span>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
