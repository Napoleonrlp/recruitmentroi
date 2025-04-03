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
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "600px",
        background: "#ffffff",
        padding: "1.5rem",
        borderRadius: "0.75rem",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
        boxSizing: "border-box"
      }}>
        <h1 style={{
          fontSize: "2rem",
          fontWeight: 700,
          textAlign: "center",
          color: "#c8102e",
          marginBottom: "1.5rem"
        }}>
          Recruitment ROI Calculator
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>Agent Annual GCI ($)</label>
            <input type="number" value={gci} onChange={e => setGCI(Number(e.target.value))} style={inputStyle} />
          </div>

          <div>
            <label>Retention (Years)</label>
            <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} style={inputStyle} />
          </div>

          <div>
            <label>Cost Per Agent Hired (CPA $)</label>
            <input type="number" value={cpa} onChange={e => setCPA(Number(e.target.value))} style={inputStyle} />
          </div>

          <div>
            <label>Monthly Membership Fee ($)</label>
            <input type="number" value={monthlyFee} onChange={e => setMonthlyFee(Number(e.target.value))} style={inputStyle} />
          </div>

          <div>
            <label>Royalty Rate (%)</label>
            <input type="number" step="0.001" value={royaltyRate} onChange={e => setRoyaltyRate(Number(e.target.value))} style={inputStyle} />
          </div>

          <div>
            <label>Royalty Cap ($)</label>
            <input type="number" value={royaltyCap} onChange={e => setRoyaltyCap(Number(e.target.value))} style={inputStyle} />
          </div>

          <hr style={{ margin: "1rem 0" }} />

          <p><strong>Total Revenue:</strong> ${totalRevenue.toLocaleString()}</p>
          <p><strong>ROI:</strong> {roi.toFixed(2)}%</p>
        </div>

        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#6b7280", marginTop: "1.5rem" }}>
          Created by Napoleon Jamir for Royal LePage
        </p>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "0.375rem",
  fontSize: "1rem",
  marginTop: "0.25rem",
  boxSizing: "border-box"
}

export default App
