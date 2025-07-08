import { useState } from 'react'
import { Search, Copy, RefreshCw, Building, Sparkles, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { generateBusinessNames, validateKeyword } from '@/utils/api'

const BusinessNameGenerator = () => {
  const [keyword, setKeyword] = useState('')
  const [names, setNames] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copiedName, setCopiedName] = useState('')

  const handleGenerate = async () => {
    const validationError = validateKeyword(keyword)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')
    setNames([])

    try {
      const result = await generateBusinessNames(keyword.trim())
      setNames(result.names || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (name) => {
    try {
      await navigator.clipboard.writeText(name)
      setCopiedName(name)
      setTimeout(() => setCopiedName(''), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGenerate()
    }
  }

  return (
    <section id="business-names" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
            <Building size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gerador de Nomes para Empresas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Crie nomes únicos e memoráveis para sua empresa usando inteligência artificial. 
            Digite uma palavra-chave e receba sugestões criativas instantaneamente.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
                Palavra-chave para sua empresa
              </label>
              <div className="relative">
                <input
                  id="keyword"
                  type="text"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value)
                    setError('')
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Ex: tecnologia, consultoria, design..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  disabled={loading}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
            <div className="flex flex-col justify-end">
              <Button
                onClick={handleGenerate}
                disabled={loading || !keyword.trim()}
                size="lg"
                className="px-8 py-3 text-lg"
              >
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 animate-spin" size={20} />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" size={20} />
                    Gerar Nomes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {names.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Sugestões de Nomes
              </h3>
              <Button
                variant="outline"
                onClick={handleGenerate}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Gerar Novos
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {names.map((name, index) => (
                <div
                  key={index}
                  className="group bg-gray-50 hover:bg-blue-50 rounded-lg p-4 transition-colors duration-200 border border-gray-200 hover:border-blue-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900 group-hover:text-blue-900">
                      {name}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      {copiedName === name ? (
                        <CheckCircle className="text-green-600" size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Dica:</strong> Clique em qualquer nome para copiá-lo. 
                Lembre-se de verificar a disponibilidade do domínio e registro da marca antes de usar.
              </p>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Dicas para escolher o nome perfeito
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-700">
                  <strong>Seja memorável:</strong> Escolha nomes fáceis de lembrar e pronunciar
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-700">
                  <strong>Verifique disponibilidade:</strong> Confirme se o domínio e redes sociais estão livres
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-700">
                  <strong>Pense no futuro:</strong> Escolha um nome que permita crescimento
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-700">
                  <strong>Teste com outros:</strong> Peça opinião de amigos e potenciais clientes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BusinessNameGenerator

