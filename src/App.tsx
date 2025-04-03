import { useState } from "react"

export default function RecruitmentROICalculator() {
  const [gci, setGCI] = useState(100000)
  const [years, setYears] = useState(3)
  const [cpa, setCPA] = useState(10126.99)
  const [monthlyFee, setMonthlyFee] = useState(144)
  const [royaltyRate, setRoyaltyRate] = useState(0.01)
  const [royaltyCap, setRoyaltyCap] = useState(1525)

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
          {[
            ["Agent Annual GCI ($)", gci, setGCI],
            ["Agent Retention (Years)", years, setYears],
            ["Cost Per Agent Hired (CPA $)", cpa, setCPA],
            ["Monthly Membership Fee ($)", monthlyFee, setMonthlyFee],
            ["Royalty Rate (%)", royaltyRate, setRoyaltyRate],
            ["Royalty Cap ($)", royaltyCap, setRoyaltyCap]
          ].map(([label, value, setter], index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <label>{label}</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setter(Number(e.target.value))}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db", marginTop: "0.25rem" }}
              />
            </div>
          ))}

          <hr style={{ marginTop: "1.5rem", marginBottom: "1rem" }} />

          <p><strong>Total Revenue:</strong> ${totalRevenue.toLocaleString()}</p>
          <p><strong>ROI:</strong> {roi.toFixed(2)}%</p>
        </div>

        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#6b7280", marginTop: "1rem" }}>
          Created by Napoleon Jamir for Royal LePage
        </p>
      </div>
    </div>
  )
}
