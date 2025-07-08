import { ArrowRight, Building, Calculator, Heart, Zap, Shield, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Home = () => {
  const features = [
    {
      icon: Building,
      title: 'Gerador de Nomes',
      description: 'Crie nomes únicos e criativos para sua empresa ou startup usando inteligência artificial.',
      href: '#business-names',
      color: 'text-blue-600'
    },
    {
      icon: Calculator,
      title: 'Calculadora de Empréstimos',
      description: 'Calcule parcelas, juros e valor total de empréstimos de forma rápida e precisa.',
      href: '#loan-calculator',
      color: 'text-green-600'
    },
    {
      icon: Heart,
      title: 'Calculadora de IMC',
      description: 'Monitore sua saúde calculando seu Índice de Massa Corporal com dicas personalizadas.',
      href: '#bmi-calculator',
      color: 'text-red-600'
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: 'Rápido e Eficiente',
      description: 'Resultados instantâneos sem complicações'
    },
    {
      icon: Shield,
      title: 'Seguro e Confiável',
      description: 'Seus dados são processados localmente'
    },
    {
      icon: Smartphone,
      title: 'Responsivo',
      description: 'Funciona perfeitamente em qualquer dispositivo'
    }
  ]

  return (
    <div id="home" className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Ferramentas Online
              <span className="text-blue-600"> Gratuitas</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Simplifique sua vida com nossas ferramentas modernas e intuitivas. 
              Gerador de nomes, calculadoras e muito mais, tudo em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-3"
                onClick={() => document.getElementById('tools').scrollIntoView({ behavior: 'smooth' })}
              >
                Explorar Ferramentas
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-3"
                onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossas Ferramentas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha a ferramenta que você precisa e comece a usar agora mesmo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50 mb-6`}>
                    <IconComponent className={`${feature.color}`} size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => document.querySelector(feature.href).scrollIntoView({ behavior: 'smooth' })}
                  >
                    Usar Agora
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher nossas ferramentas?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desenvolvidas com foco na experiência do usuário e resultados precisos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Todas as ferramentas são gratuitas e não requerem cadastro. 
            Comece a usar agora mesmo!
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-3"
            onClick={() => document.getElementById('tools').scrollIntoView({ behavior: 'smooth' })}
          >
            Explorar Ferramentas
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Home

