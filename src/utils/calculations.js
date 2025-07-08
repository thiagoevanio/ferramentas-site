// Cálculos de Empréstimo
export const calculateLoan = (principal, monthlyRate, months) => {
  const monthlyRateDecimal = monthlyRate / 100
  
  if (monthlyRateDecimal === 0) {
    return {
      monthlyPayment: principal / months,
      totalPayment: principal,
      totalInterest: 0,
      amortizationTable: []
    }
  }
  
  // Fórmula PMT: P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthlyPayment = principal * (monthlyRateDecimal * Math.pow(1 + monthlyRateDecimal, months)) / 
                        (Math.pow(1 + monthlyRateDecimal, months) - 1)
  
  const totalPayment = monthlyPayment * months
  const totalInterest = totalPayment - principal
  
  // Tabela de amortização
  const amortizationTable = []
  let remainingBalance = principal
  
  for (let month = 1; month <= months; month++) {
    const interestPayment = remainingBalance * monthlyRateDecimal
    const principalPayment = monthlyPayment - interestPayment
    remainingBalance -= principalPayment
    
    amortizationTable.push({
      month,
      monthlyPayment: monthlyPayment,
      principalPayment: principalPayment,
      interestPayment: interestPayment,
      remainingBalance: Math.max(0, remainingBalance)
    })
  }
  
  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    amortizationTable
  }
}

// Validação de dados do empréstimo
export const validateLoanData = (principal, monthlyRate, months) => {
  const errors = {}
  
  if (!principal || principal <= 0) {
    errors.principal = 'Valor deve ser maior que zero'
  } else if (principal > 10000000) {
    errors.principal = 'Valor máximo é R$ 10.000.000'
  }
  
  if (monthlyRate === null || monthlyRate === undefined || monthlyRate < 0) {
    errors.monthlyRate = 'Taxa deve ser maior ou igual a zero'
  } else if (monthlyRate > 20) {
    errors.monthlyRate = 'Taxa máxima é 20% ao mês'
  }
  
  if (!months || months <= 0) {
    errors.months = 'Período deve ser maior que zero'
  } else if (months > 600) {
    errors.months = 'Período máximo é 600 meses'
  }
  
  return errors
}

// Cálculos de IMC
export const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  
  let category = ''
  let description = ''
  let color = ''
  
  if (bmi < 18.5) {
    category = 'Abaixo do peso'
    description = 'Você está abaixo do peso ideal. Considere consultar um nutricionista.'
    color = 'text-blue-600'
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Peso normal'
    description = 'Parabéns! Você está com o peso ideal para sua altura.'
    color = 'text-green-600'
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Sobrepeso'
    description = 'Você está com sobrepeso. Considere uma dieta equilibrada e exercícios.'
    color = 'text-yellow-600'
  } else if (bmi >= 30 && bmi < 35) {
    category = 'Obesidade Grau I'
    description = 'Obesidade grau I. Recomenda-se acompanhamento médico e nutricional.'
    color = 'text-orange-600'
  } else if (bmi >= 35 && bmi < 40) {
    category = 'Obesidade Grau II'
    description = 'Obesidade grau II. É importante buscar acompanhamento médico.'
    color = 'text-red-600'
  } else {
    category = 'Obesidade Grau III'
    description = 'Obesidade grau III. Procure acompanhamento médico urgente.'
    color = 'text-red-800'
  }
  
  return {
    bmi: parseFloat(bmi.toFixed(1)),
    category,
    description,
    color
  }
}

// Validação de dados do IMC
export const validateBMIData = (weight, height) => {
  const errors = {}
  
  if (!weight || weight <= 0) {
    errors.weight = 'Peso deve ser maior que zero'
  } else if (weight > 500) {
    errors.weight = 'Peso máximo é 500kg'
  }
  
  if (!height || height <= 0) {
    errors.height = 'Altura deve ser maior que zero'
  } else if (height < 50) {
    errors.height = 'Altura mínima é 50cm'
  } else if (height > 250) {
    errors.height = 'Altura máxima é 250cm'
  }
  
  return errors
}

// Formatação de valores
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export const formatNumber = (value, decimals = 2) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value)
}

