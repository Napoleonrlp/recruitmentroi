import { useState } from 'react'
import './App.css'

function App() {
  const [form, setForm] = useState({
    gci: 100000,
    years: 3,
    cpa: 10126.99,
    monthlyFee: 144,
    royaltyRate: 0.01,
    royaltyCap: 1525
  })

  const [result, setResult] = useState<{ revenue: number; roi: number } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (key: string, value: number) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const isFormValid = Object.values(form).every(value => typeof value === 'number' && value >= 0)
  const hasChanged = JSON.stringify(form) !== JSON.stringify({
    gci: 100000,
    years: 3,
    cpa: 10126.99,
    monthlyFee: 144,
    royaltyRate: 0.01,
    royaltyCap: 1525
  })

  const calculateROI = async () => {
    if (!isFormValid) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    const { gci, years, cpa, monthlyFee, royaltyRate, royaltyCap } = form
    const annualRoyalty = Math.min(gci * royaltyRate, royaltyCap)
    const annualRevenue = monthlyFee * 12 + annualRoyalty
    const totalRevenue = annualRevenue * years
    const roi = ((totalRevenue - cpa) / cpa) * 100
    setResult({ revenue: totalRevenue, roi })
    setLoading(false)
  }

  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset all fields?')) {
      setForm({
        gci: 100000,
        years: 3,
        cpa: 10126.99,
        monthlyFee: 144,
        royaltyRate: 0.01,
        royaltyCap: 1525
      })
      setResult(null)
    }
  }

  return (
    <div className="calculator-wrapper">
      <h1>Recruitment ROI Calculator</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputBlock label="Agent Annual GCI ($)" value={form.gci} onChange={val => handleChange('gci', val)} />
        <InputBlock label="Retention (Years)" value={form.years} onChange={val => handleChange('years', val)} />
        <InputBlock label="Cost Per Agent Hired (CPA $)" value={form.cpa} onChange={val => handleChange('cpa', val)} />
        <InputBlock label="Monthly Membership Fee ($)" value={form.monthlyFee} onChange={val => handleChange('monthlyFee', val)} />
        <InputBlock label="Royalty Rate (%)" value={form.royaltyRate} onChange={val => handleChange('royaltyRate', val)} step={0.001} />
        <InputBlock label="Royalty Cap ($)" value={form.royaltyCap} onChange={val => handleChange('royaltyCap', val)} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
        <button
          onClick={calculateROI}
          disabled={!isFormValid || loading}
          style={{
            padding: '0.75rem 1.25rem',
            background: isFormValid ? '#c8102e' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: isFormValid && !loading ? 'pointer' : 'not-allowed'
          }}
        >
          {loading ? 'Calculating...' : 'Calculate ROI'}
        </button>

        <button
          onClick={resetForm}
          disabled={!hasChanged && !result}
          style={{
            padding: '0.75rem 1.25rem',
            background: '#e0e0e0',
            color: '#333',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: hasChanged || result ? 'pointer' : 'not-allowed'
          }}
          title="Reset all fields to default"
        >
          Reset
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fff', borderRadius: '8px', border: '1px solid #ddd' }}>
          <p className={result.revenue < form.cpa ? 'result-negative' : 'result-positive'}>
            <strong>Total Revenue:</strong> ${result.revenue.toLocaleString()}
          </p>
          <p className={result.roi < 0 ? 'result-negative' : 'result-positive'}>
            <strong>ROI:</strong> {result.roi.toFixed(2)}%
          </p>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6c757d', marginTop: '2rem' }}>
        Created by Napoleon Jamir for Royal LePage
      </p>
    </div>
  )
}

function InputBlock({
  label,
  value,
  onChange,
  step = 1
}: {
  label: string
  value: number
  onChange: (val: number) => void
  step?: number
}) {
  return (
    <div>
      <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>{label}</label>
      <input
        type="number"
        value={value}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          padding: '0.5rem',
          fontSize: '1rem',
          marginTop: '0.25rem',
          borderRadius: '0.375rem',
          border: '1px solid #ced4da',
          boxSizing: 'border-box'
        }}
      />
    </div>
  )
}

export default App
