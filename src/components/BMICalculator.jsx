import { useState } from 'react'
import { Heart, Scale, Ruler, Activity, Target, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { calculateBMI, validateBMIData, formatNumber } from '@/utils/calculations'

const BMICalculator = () => {
  const [formData, setFormData] = useState({
    weight: '',
    height: ''
  })
  const [result, setResult] = useState(null)
  const [errors, setErrors] = useState({})

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
    const weight = parseFloat(formData.weight)
    const height = parseFloat(formData.height)

    const validationErrors = validateBMIData(weight, height)
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setResult(null)
      return
    }

    const calculation = calculateBMI(weight, height)
    setResult(calculation)
    setErrors({})
  }

  const handleReset = () => {
    setFormData({
      weight: '',
      height: ''
    })
    setResult(null)
    setErrors({})
  }

  const bmiRanges = [
    { range: 'Abaixo de 18,5', category: 'Abaixo do peso', color: 'bg-blue-100 text-blue-800' },
    { range: '18,5 - 24,9', category: 'Peso normal', color: 'bg-green-100 text-green-800' },
    { range: '25,0 - 29,9', category: 'Sobrepeso', color: 'bg-yellow-100 text-yellow-800' },
    { range: '30,0 - 34,9', category: 'Obesidade Grau I', color: 'bg-orange-100 text-orange-800' },
    { range: '35,0 - 39,9', category: 'Obesidade Grau II', color: 'bg-red-100 text-red-800' },
    { range: '40,0 ou mais', category: 'Obesidade Grau III', color: 'bg-red-200 text-red-900' }
  ]

  const healthTips = [
    {
      icon: Activity,
      title: 'Exercite-se regularmente',
      description: 'Pratique pelo menos 150 minutos de atividade física moderada por semana'
    },
    {
      icon: Target,
      title: 'Alimentação equilibrada',
      description: 'Mantenha uma dieta rica em frutas, vegetais e proteínas magras'
    },
    {
      icon: TrendingUp,
      title: 'Acompanhamento médico',
      description: 'Consulte profissionais de saúde para orientação personalizada'
    }
  ]

  return (
    <section id="bmi-calculator" className="py-20 bg-gradient-to-br from-red-50 to-pink-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6">
            <Heart size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Calculadora de IMC
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calcule seu Índice de Massa Corporal e descubra se você está no peso ideal. 
            Receba dicas personalizadas para manter uma vida saudável.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Seus Dados
            </h3>

            <div className="space-y-6">
              {/* Peso */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="70.5"
                    className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg ${
                      errors.weight ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <Scale className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {errors.weight && (
                  <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
                )}
              </div>

              {/* Altura */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Altura (cm)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    placeholder="175"
                    className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg ${
                      errors.height ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <Ruler className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {errors.height && (
                  <p className="mt-1 text-sm text-red-600">{errors.height}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handleCalculate}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  size="lg"
                >
                  <Heart className="mr-2" size={20} />
                  Calcular IMC
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
                Seu Resultado
              </h3>

              <div className="space-y-6">
                {/* IMC Value */}
                <div className="bg-red-50 rounded-lg p-6 text-center">
                  <p className="text-sm font-medium text-red-800 mb-2">Seu IMC é</p>
                  <p className="text-4xl font-bold text-red-900 mb-2">
                    {formatNumber(result.bmi, 1)}
                  </p>
                  <p className={`text-lg font-semibold ${result.color}`}>
                    {result.category}
                  </p>
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {result.description}
                  </p>
                </div>

                {/* Health Tips */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Dicas para uma vida saudável:
                  </h4>
                  {healthTips.map((tip, index) => {
                    const IconComponent = tip.icon
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="text-red-600" size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{tip.title}</p>
                          <p className="text-sm text-gray-600">{tip.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BMI Reference Table */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Tabela de Referência do IMC
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bmiRanges.map((range, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 ${range.color} ${
                  result && result.category === range.category ? 'ring-2 ring-red-500' : ''
                }`}
              >
                <div className="text-center">
                  <p className="font-semibold text-lg">{range.range}</p>
                  <p className="text-sm">{range.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Importante:</strong> O IMC é uma ferramenta de triagem e não um diagnóstico. 
              Para uma avaliação completa da sua saúde, consulte sempre um profissional médico.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BMICalculator

