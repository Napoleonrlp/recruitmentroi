import { useState } from 'react'

function App() {
  const [gci, setGCI] = useState<number>(100000)
  const [years, setYears] = useState<number>(3)
  const [cpa, setCPA] = useState<number>(10126.99)
  const [monthlyFee, setMonthlyFee] = useState<number>(144)
  const [royaltyRate, setRoyaltyRate] = useState<number>(0.01)
  const [royaltyCap, setRoyaltyCap] = useState<number>(1525)

  const annualRoyalty = Math.min(gci * royaltyRate, royaltyCap)
  const annualRevenue = monthlyFee * 12 + annualRoyalty
  const totalRevenue = annualRevenue * years
  const roi = ((totalRevenue - cpa) / cpa) * 100

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#f9fafb", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", color: "#1f2937" }}>
          Recruitment ROI Calculator
        </h1>
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "0.5rem", boxShadow: "0 4px 14px rgba(0,0,0,0.1)", marginTop: "1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Agent Annual GCI ($)</label>
            <input
              type="number"
              value={gci}
              onChange={(e) => setGCI(Number(e.target.value))}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Retention (Years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Cost Per Agent Hired (CPA $)</label>
            <input
              type="number"
              value={cpa}
              onChange={(e) => setCPA(Number(e.target.value))}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Monthly Membership Fee ($)</label>
            <input
              type="number"
              value={monthlyFee}
              onChange={(e) => setMonthlyFee(Number(e.target.value))}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Royalty Rate (%)</label>
            <input
              type="number"
              step="0.001"
              value={royaltyRate}
              onChange={(e) => setRoyaltyRate(Number(e.target.value))}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Royalty Cap ($)</label>
            <input
              type
