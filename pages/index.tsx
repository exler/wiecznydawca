import Image from "next/image";
import Link from "next/link";
import hero_image from "@/public/hero_healthcare.png";

export default function IndexPage() {
  return (
    <>
      <section>
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
          <div className="flex flex-wrap items-center mx-auto max-w-7xl">
            <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
              <div>
                <div className="relative w-full max-w-lg">
                  <div className="absolute top-0 rounded-full bg-primary -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                  <div className="absolute rounded-full bg-secondary -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                  <div className="relative">
                    <Image className="object-cover object-center mx-auto" alt="" src={hero_image} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
              <span className="mb-8 text-xs font-bold tracking-widest text-secondary uppercase">Dziennik i kalendarz donacji</span>
              <h1 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl">Zorganizuj swoje krwiodawstwo</h1>
              <p className="mb-8 text-base leading-relaxed text-left text-gray-500">
                <span className="font-bold">Wieczny Dawca</span> to aplikacja internetowa, która pozwala na śledzenie swoich donacji krwi. Aplikacja jest darmowa i wymaga jedynie adresu email.
              </p>
              <div className="flex-col mt-0 lg:mt-6 max-w-7xl sm:flex">
                <dl className="grid grid-cols-1 gap-12 md:grid-cols-2">
                  <div>
                    <dt className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5 text-primary rounded-full bg-red-50">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                      </svg>
                    </dt>
                    <dd className="flex-grow">
                      <h2 className="mb-3 text-lg font-medium tracking-tighter text-neutral-600">Dostępny wszędzie</h2>
                      <p className="text-base leading-relaxed text-gray-400">Możliwości dziennika donacji z poziomu każdej platformy</p>
                      <Link href="#funkcjonalnosc" className="inline-flex items-center mt-6 font-semibold text-primary md:mb-2 lg:mb-0 hover:text-neutral-600" title="Czytaj dalej">
                        Czytaj dalej
                        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
                        </svg>
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-5 text-primary rounded-full bg-blue-50">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                      </svg>
                    </dt>
                    <dd className="flex-grow">
                      <h2 className="mb-3 text-lg font-medium tracking-tighter text-neutral-600">Jednokrokowa rejestracja</h2>
                      <p className="text-base leading-relaxed text-gray-400">Do założenia konta wystarczy email - bez potrzeby hasła!</p>
                      <Link href="/zaloguj" className="inline-flex items-center mt-6 font-semibold text-primary md:mb-2 lg:mb-0 hover:text-neutral-600" title="Załóż konto">
                        Załóż konto
                        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
                        </svg>
                      </Link>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section >

      <section id="funkcjonalnosc">
        <div className="flex flex-col items-center px-5 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col w-full max-w-3xl mx-auto prose text-left prose-blue">
            <div className="w-full mx-auto">
              <h1 className="text-5xl text-center">Funkcjonalności</h1>
            </div>
          </div>
          <div className="flex flex-col items-center pb-10 mx-auto mt-12 border-b border-gray-200 w-3/4 sm:flex-row">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 text-primary rounded-full bg-red-50 sm:mr-10">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div className="flex-grow mt-6 prose text-center sm:text-left sm:mt-0 prose-md">
              <h2 className="text-2xl">Uzupełniaj dziennik donacji</h2>
              <p>Dodaj swoje donacje lub dyskwalifikacje, aby mieć pełną historię swojego krwiodawstwa.</p>
            </div>
          </div>
          <div className="flex flex-col items-center pb-10 mx-auto mt-12 border-b border-gray-200 w-3/4 sm:flex-row">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 text-primary rounded-full bg-red-50 sm:mr-10">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div className="flex-grow mt-6 prose text-center sm:text-left sm:mt-0 prose-md">
              <h2 className="text-2xl">Zaplanuj kolejną donację</h2>
              <p>Sprawdź terminy kolejnych donacji z podziałem na typ donacji.</p>
            </div>
          </div>
          <div className="flex flex-col items-center pb-10 mx-auto mt-12 border-b border-gray-200 w-3/4 sm:flex-row">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 text-primary rounded-full bg-red-50 sm:mr-10">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <div className="flex-grow mt-6 prose text-center sm:text-left sm:mt-0 prose-md">
              <h2 className="text-2xl">Śledź swoje postępy</h2>
              <p>Bądź na bieżąco ze statystykami donacji i sprawdź kiedy będziesz mógł odebrać swoją kolejną odznakę.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
