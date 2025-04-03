import { useState } from 'react'
import './App.css'

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
    <div className="bg-[#f8f9fa] min-h-screen flex items-center justify-center px-4">
      <div className="calculator-wrapper">
        <h1 className="text-[1.75rem] font-bold text-[#c8102e] text-center mb-6">
          Recruitment ROI Calculator
        </h1>

        <div className="flex flex-col gap-4">
          <InputBlock label="Agent Annual GCI ($)" value={gci} onChange={setGCI} />
          <InputBlock label="Retention (Years)" value={years} onChange={setYears} />
          <InputBlock label="Cost Per Agent Hired (CPA $)" value={cpa} onChange={setCPA} />
          <InputBlock label="Monthly Membership Fee ($)" value={monthlyFee} onChange={setMonthlyFee} />
          <InputBlock label="Royalty Rate (%)" value={royaltyRate} onChange={setRoyaltyRate} step={0.001} />
          <InputBlock label="Royalty Cap ($)" value={royaltyCap} onChange={setRoyaltyCap} />
        </div>

        <hr className="my-6" />

        <p className={`result ${isNegativeRevenue ? 'negative' : 'positive'}`}>
          <strong>Total Revenue:</strong> ${totalRevenue.toLocaleString()}
        </p>
        <p className={`result ${isNegativeROI ? 'negative' : 'positive'}`}>
          <strong>ROI:</strong> {roi.toFixed(2)}%
        </p>

        <p className="text-center text-sm text-gray-500 mt-6">
          Created by Napoleon Jamir for Royal LePage
        </p>
      </div>
    </div>
  )
}

interface InputBlockProps {
  label: string
  value: number
  onChange: (val: number) => void
  step?: number
}

function InputBlock({ label, value, onChange, step = 1 }: InputBlockProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        value={value}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
        className="mt-1 w-full p-2 text-base border border-gray-300 rounded-md box-border"
      />
    </div>
  )
}

export default App
