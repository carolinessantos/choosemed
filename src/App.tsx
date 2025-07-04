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
  // ... (universities list unchanged)
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
            <li key={uniName} style={{ marginBottom: 8, color: "black" }}>
              <strong>{uniName}</strong><br />
              <span style={{ fontSize: 12 }}>
                {field === "ranking" && <>Ranking: {data?.ranking}</>}
                {field === "climate" && <>Clima: {data?.climate}</>}
                {field === "citySize" && <>População: {data?.citySize}</>}
                {field === "vagas2024" && <>Vagas 2024: {data?.vagas2024}</>}
                {field === "notaCorte2024" && <>Nota de corte 2024: {data?.notaCorte2024}</>}
              </span>
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
  const [notaCorte, setNotaCorte] = useState(allUniversities.map(u => u.name));

  const [combined, setCombined] = useState<string[]>([]);

  useEffect(() => {
    const combinedList = combineListsByPosition(
      [clima, ranking, tamanhoCidade, vagas, notaCorte],
      allUniversities.length
    );
    setCombined(combinedList);
  }, [clima, ranking, tamanhoCidade, vagas, notaCorte]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20, backgroundColor: "white", color: "black" }}>
      <h1 style={{ textAlign: "center", color: "#2c7a7b" }}>ChooseMed</h1>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <ListEditor title="Clima" list={clima} setList={setClima} field="climate" />
        <ListEditor title="Ranking" list={ranking} setList={setRanking} field="ranking" />
        <ListEditor title="Tamanho Cidade" list={tamanhoCidade} setList={setTamanhoCidade} field="citySize" />
        <ListEditor title="Número de vagas 2024" list={vagas} setList={setVagas} field="vagas2024" />
        <ListEditor title="Nota de corte 2024" list={notaCorte} setList={setNotaCorte} field="notaCorte2024" />
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
                  Clima: {data?.climate} | Ranking: {data?.ranking} | Cidade: {data?.citySize} | Vagas 2024: {data?.vagas2024} | Nota corte 2024: {data?.notaCorte2024}
                </small>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
