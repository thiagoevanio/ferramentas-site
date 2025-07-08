import { useState } from 'react'
import { Calculator, DollarSign, Calendar, Percent, TrendingUp, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { calculateLoan, validateLoanData, formatCurrency, formatNumber } from '@/utils/calculations'

const LoanCalculator = () => {
  const [formData, setFormData] = useState({
    principal: '',
    annualRate: '',
    months: ''
  })
  const [result, setResult] = useState(null)
  const [errors, setErrors] = useState({})
  const [showAmortization, setShowAmortization] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Limpar erro do campo específico
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleCalculate = () => {
    const principal = parseFloat(formData.principal)
    const annualRate = parseFloat(formData.annualRate)
    const months = parseInt(formData.months)

    const validationErrors = validateLoanData(principal, annualRate, months)
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setResult(null)
      return
    }

    const calculation = calculateLoan(principal, annualRate, months)
    setResult(calculation)
    setErrors({})
  }

  const handleReset = () => {
    setFormData({
      principal: '',
      annualRate: '',
      months: ''
    })
    setResult(null)
    setErrors({})
    setShowAmortization(false)
  }

  const exportAmortization = () => {
    if (!result?.amortizationTable) return

    const headers = ['Mês', 'Parcela', 'Juros', 'Amortização', 'Saldo Devedor']
    const rows = result.amortizationTable.map(row => [
      row.month,
      formatCurrency(row.monthlyPayment),
      formatCurrency(row.interestPayment),
      formatCurrency(row.principalPayment),
      formatCurrency(row.remainingBalance)
    ])

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tabela_amortizacao.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <section id="loan-calculator" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
            <Calculator size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Calculadora de Empréstimos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calcule suas parcelas, juros totais e visualize a tabela de amortização completa. 
            Planeje seu financiamento com precisão.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Dados do Empréstimo
            </h3>

            <div className="space-y-6">
              {/* Valor do Empréstimo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor do Empréstimo
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.principal}
                    onChange={(e) => handleInputChange('principal', e.target.value)}
                    placeholder="100000"
                    className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg ${
                      errors.principal ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {errors.principal && (
                  <p className="mt-1 text-sm text-red-600">{errors.principal}</p>
                )}
              </div>

              {/* Taxa de Juros */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taxa de Juros (% ao mês)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={formData.annualRate}
                    onChange={(e) => handleInputChange('annualRate', e.target.value)}
                    placeholder="12.5"
                    className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg ${
                      errors.annualRate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <Percent className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {errors.annualRate && (
                  <p className="mt-1 text-sm text-red-600">{errors.annualRate}</p>
                )}
              </div>

              {/* Período */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Período (meses)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.months}
                    onChange={(e) => handleInputChange('months', e.target.value)}
                    placeholder="60"
                    className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg ${
                      errors.months ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {errors.months && (
                  <p className="mt-1 text-sm text-red-600">{errors.months}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handleCalculate}
                  className="flex-1"
                  size="lg"
                >
                  <Calculator className="mr-2" size={20} />
                  Calcular
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                >
                  Limpar
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Resultado do Cálculo
              </h3>

              <div className="space-y-6">
                {/* Parcela Mensal */}
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-800">Parcela Mensal</p>
                      <p className="text-3xl font-bold text-green-900">
                        {formatCurrency(result.monthlyPayment)}
                      </p>
                    </div>
                    <TrendingUp className="text-green-600" size={32} />
                  </div>
                </div>

                {/* Resumo */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600">Total a Pagar</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(result.totalPayment)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600">Total de Juros</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(result.totalInterest)}
                    </p>
                  </div>
                </div>

                {/* Amortization Button */}
                <Button
                  onClick={() => setShowAmortization(!showAmortization)}
                  variant="outline"
                  className="w-full"
                >
                  {showAmortization ? 'Ocultar' : 'Ver'} Tabela de Amortização
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Amortization Table */}
        {result && showAmortization && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Tabela de Amortização
              </h3>
              <Button
                onClick={exportAmortization}
                variant="outline"
                size="sm"
              >
                <Download className="mr-2" size={16} />
                Exportar CSV
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Mês</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-900">Parcela</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-900">Juros</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-900">Amortização</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-900">Saldo Devedor</th>
                  </tr>
                </thead>
                <tbody>
                  {result.amortizationTable.slice(0, 12).map((row, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-4 py-3 text-gray-900">{row.month}</td>
                      <td className="px-4 py-3 text-right text-gray-900">
                        {formatCurrency(row.monthlyPayment)}
                      </td>
                      <td className="px-4 py-3 text-right text-red-600">
                        {formatCurrency(row.interestPayment)}
                      </td>
                      <td className="px-4 py-3 text-right text-green-600">
                        {formatCurrency(row.principalPayment)}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-900">
                        {formatCurrency(row.remainingBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {result.amortizationTable.length > 12 && (
                <p className="text-center text-gray-500 mt-4">
                  Mostrando primeiros 12 meses. Exporte para ver a tabela completa.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default LoanCalculator

