import { CalculatorForm } from '@/components/calculator-form';
import { Link } from '@/theme/components';
import { AppNavBar } from '@/components/app-navbar';

function App() {
  return (
    <main className='flex flex-col min-h-screen'>
      <AppNavBar />

      <div className='container mx-auto flex-1 grid grid-cols-1  my-4'>
        <CalculatorForm />

        <div className='flex gap-unit-xs items-center justify-center mt-8 self-end'>
          <p>Made By 🇪🇬</p>
          <Link href='https://www.linkedin.com/in/imoaazahmed/' isExternal color='foreground'>
            Moaaz
          </Link>
          <p>•</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </div>
    </main>
  );
}

export default App;
