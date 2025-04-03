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

  const isNegativeROI = roi < 0
  const isNegativeRevenue = totalRevenue < cpa

  return (
    <div style={{
  minHeight: "100vh",
  backgroundColor: "#f8f9fa",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
  boxSizing: "border-box"
}}>
      <div style={{
  width: "100%",
  maxWidth: "600px",
  backgroundColor: "#fff",
  borderRadius: "0.75rem",
  padding: "2rem",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  boxSizing: "border-box"
}}>
        <h1 style={{
          fontSize: "1.75rem",
          fontWeight: "700",
          color: "#c8102e",
          textAlign: "center",
          marginBottom: "1.5rem"
        }}>Recruitment ROI Calculator</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <InputBlock label="Agent Annual GCI ($)" value={gci} onChange={setGCI} />
          <InputBlock label="Retention (Years)" value={years} onChange={setYears} />
          <InputBlock label="Cost Per Agent Hired (CPA $)" value={cpa} onChange={setCPA} />
          <InputBlock label="Monthly Membership Fee ($)" value={monthlyFee} onChange={setMonthlyFee} />
          <InputBlock label="Royalty Rate (%)" value={royaltyRate} onChange={setRoyaltyRate} step={0.001} />
          <InputBlock label="Royalty Cap ($)" value={royaltyCap} onChange={setRoyaltyCap} />
        </div>

        <hr style={{ margin: "1.5rem 0" }} />

        <p style={{
          fontWeight: 600,
          color: isNegativeRevenue ? '#c8102e' : '#198754',
          fontSize: '1rem'
        }}>
          Total Revenue: ${totalRevenue.toLocaleString()}
        </p>
        <p style={{
          fontWeight: 600,
          color: isNegativeROI ? '#c8102e' : '#198754',
          fontSize: '1rem'
        }}>
          ROI: {roi.toFixed(2)}%
        </p>

        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#6c757d", marginTop: "1.5rem" }}>
          Created by Napoleon Jamir for Royal LePage
        </p>
      </div>
    </div>
  )
}

function InputBlock({ label, value, onChange, step = 1 }: {
  label: string,
  value: number,
  onChange: (val: number) => void,
  step?: number
}) {
  return (
    <div>
      <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>{label}</label>
      <input
        type="number"
        value={value}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          padding: "0.5rem",
          fontSize: "1rem",
          marginTop: "0.25rem",
          borderRadius: "0.375rem",
          border: "1px solid #ced4da",
          boxSizing: "border-box"
        }}
      />
    </div>
  )
}

export default App
