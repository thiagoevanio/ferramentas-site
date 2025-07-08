import { Heart, Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">
              Ferramentas Online
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Ferramentas gratuitas e modernas para facilitar seu dia a dia. 
              Gerador de nomes para empresas, calculadoras financeiras e de saúde.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Ferramentas */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ferramentas</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#business-names"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  Gerador de Nomes
                </a>
              </li>
              <li>
                <a
                  href="#loan-calculator"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  Calculadora de Empréstimos
                </a>
              </li>
              <li>
                <a
                  href="#bmi-calculator"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  Calculadora de IMC
                </a>
              </li>
            </ul>
          </div>

          {/* Links Úteis */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Ferramentas Online. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1 mt-2 sm:mt-0">
            Feito com <Heart size={16} className="text-red-500" /> para facilitar sua vida
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

