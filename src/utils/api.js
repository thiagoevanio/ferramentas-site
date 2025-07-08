// API configuration
const RAPIDAPI_KEY = 'demo-key' // Em produção, usar variável de ambiente
const RAPIDAPI_HOST = 'business-name-generator.p.rapidapi.com'

// Business Name Generator API
export const generateBusinessNames = async (keyword) => {
  try {
    // Para demonstração, vamos simular a API com nomes gerados localmente
    // Em produção, descomente o código abaixo e use uma chave real da RapidAPI
    
    /*
    const response = await fetch(`https://${RAPIDAPI_HOST}/?q=${encodeURIComponent(keyword)}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      }
    })
    
    if (!response.ok) {
      throw new Error('Erro ao gerar nomes')
    }
    
    const data = await response.json()
    return data
    */

    // Simulação da API para demonstração
    const prefixes = ['Smart', 'Pro', 'Tech', 'Digital', 'Inova', 'Meta', 'Ultra', 'Prime', 'Elite', 'Next']
    const suffixes = ['Solutions', 'Labs', 'Works', 'Hub', 'Studio', 'Group', 'Systems', 'Tech', 'Pro', 'Plus']
    const variations = ['', 'X', 'AI', '360', 'Max', 'Go', 'Now', 'One', 'Core', 'Edge']
    
    const names = []
    
    // Gerar nomes baseados na palavra-chave
    for (let i = 0; i < 10; i++) {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
      const variation = variations[Math.floor(Math.random() * variations.length)]
      
      const nameOptions = [
        `${keyword} ${suffix}`,
        `${prefix} ${keyword}`,
        `${keyword}${variation}`,
        `${prefix}${keyword}`,
        `${keyword} ${prefix}`,
        `${keyword}${suffix}`,
        `${prefix}${keyword}${variation}`,
        `${keyword.charAt(0).toUpperCase() + keyword.slice(1)}${suffix}`,
        `${prefix} ${keyword} ${suffix}`,
        `${keyword} ${variation}`
      ]
      
      const randomName = nameOptions[Math.floor(Math.random() * nameOptions.length)]
      if (!names.includes(randomName)) {
        names.push(randomName)
      }
    }
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return { names: names.slice(0, 8) }
    
  } catch (error) {
    console.error('Erro ao gerar nomes:', error)
    throw new Error('Erro ao gerar nomes. Tente novamente.')
  }
}

// Função para validar entrada
export const validateKeyword = (keyword) => {
  if (!keyword || keyword.trim().length < 2) {
    return 'Digite pelo menos 2 caracteres'
  }
  
  if (keyword.length > 50) {
    return 'Máximo de 50 caracteres'
  }
  
  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(keyword)) {
    return 'Use apenas letras e espaços'
  }
  
  return null
}

