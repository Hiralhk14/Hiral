import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Header = ({ pageTitle }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-slate-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">R</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-slate-900">RedBus</h1>
            </div>
          </div>

          <div className="text-sm text-slate-800">
            {pageTitle}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
