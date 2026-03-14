import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { translations, type Lang } from './utils';
import avatarImg from './assets/avatar.jpg';



const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <div
      className="fade-in-section"
      style={{ transitionDelay: `${delay}ms` }}
      ref={(el) => {
        if (!el) return;
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });
        observer.observe(el);
      }}
    >
      {children}
    </div>
  );
};

function App() {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('appLang') as Lang;
    const browserLang = navigator.language.slice(0, 2).toLowerCase() as Lang;

    let currentLang: Lang = 'en';
    if (savedLang && translations[savedLang]) {
      currentLang = savedLang;
    } else if (translations[browserLang]) {
      currentLang = browserLang;
    }

    setLang(currentLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('appLang', lang);
  }, [lang]);

  const t = (key: string) => translations[lang][key] || key;

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("Форма собрана:");
    console.log("Имя:", formData.get('name'));
    console.log("Email:", formData.get('email'));
    console.log("Сообщение:", formData.get('message'));
    alert('Please write to email: al.k.84.de@gmail.com - thankyou!');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <nav id="navbar" className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">{t("nav-brand")}</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="#about">{t("nav-about")}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#stack">{t("nav-stack")}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#projects">{t("nav-projects")}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#github">{t("nav-open-source")}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">{t("nav-contact")}</a>
              </li>

              <li className="nav-item ms-lg-4 mt-3 mt-lg-0 border-start ps-lg-3 d-flex">
                <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
                <button className={`lang-btn ${lang === 'ru' ? 'active' : ''}`} onClick={() => setLang('ru')}>RU</button>
                <button className={`lang-btn ${lang === 'de' ? 'active' : ''}`} onClick={() => setLang('de')}>DE</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-section">
          <div className="container">
            <div className="row align-items-center flex-column-reverse flex-md-row">
              <div className="col-md-7 col-lg-8">
                <FadeInSection>
                  <h1 className="hero-title">{t("nav-brand")}</h1>
                  <h2 className="h3 mb-4 text-primary">{t("hero-role")}</h2>
                  <p className="hero-tagline">{t("hero-tagline")}</p>
                  <div className="d-flex gap-3">
                    <a href="#projects" className="btn btn-primary">{t("btn-projects")}</a>
                    <a href="#contact" className="btn btn-outline-primary">{t("btn-contact")}</a>
                  </div>
                </FadeInSection>
              </div>
              <div className="col-md-5 col-lg-4 text-center mb-5 mb-md-0">
                <FadeInSection>
                  <img src={avatarImg} alt={t("nav-brand")} className="img-fluid rounded-circle shadow" style={{ width: '250px', height: '250px', objectFit: 'cover', backgroundColor: '#e9ecef' }} onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22250%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20250%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22250%22%20height%3D%22250%22%20fill%3D%22%23e9ecef%22%20%2F%3E%3Cpath%20d%3D%22M125%20140c-25%200-45-20-45-45s20-45%2045-45%2045%2020%2045%2045-20%2045-45%2045zm0-20c13.8%200%2025-11.2%2025-25s-11.2-25-25-25-25%2011.2-25%2025%2011.2%2025%2025%2025zm0%2030c-35%200-75%2017.5-75%2050v10h150v-10c0-32.5-40-50-75-50z%22%20fill%3D%22%23adb5bd%22%2F%3E%3C%2Fsvg%3E';
                  }} />
                </FadeInSection>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-3 bg-light-alt">
          <div className="container py-3">
            <FadeInSection>
              <div className="row">
                <div className="col-lg-8 mx-auto text-center">
                  <h2 className="mb-3">{t("section-about")}</h2>
                  <p className="lead">{t("about-text")}</p>
                  <div className="d-flex justify-content-center gap-5 mt-3">
                    <div>
                      <h3 className="fw-bold text-primary">7</h3>
                      <span className="text-muted">{t("stats-exp")}</span>
                    </div>
                    <div>
                      <h3 className="fw-bold text-primary">50+</h3>
                      <span className="text-muted">{t("stats-projects")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        <section id="stack" className="py-5">
          <div className="container py-4 text-center">
            <FadeInSection>
              <h2 className="mb-5">{t("section-stack")}</h2>
              <div className="d-flex flex-wrap justify-content-center gap-2 max-w-75 mx-auto">
                <span className="badge-stack">Golang</span>
                <span className="badge-stack">Java</span>
                <span className="badge-stack">Spring Boot</span>
                <span className="badge-stack">React</span>
                <span className="badge-stack">Node.js</span>
                <span className="badge-stack">TypeScript</span>
                <span className="badge-stack">PostgreSQL</span>
                <span className="badge-stack">Docker</span>
                <span className="badge-stack">Express.js</span>
                <span className="badge-stack">NestJS</span>
                <span className="badge-stack">HTML5</span>
                <span className="badge-stack">CSS3</span>
                <span className="badge-stack">Git</span>
                <span className="badge-stack">REST API</span>
                <span className="badge-stack">DevOps</span>
                <span className="badge-stack">SaaS</span>
                <span className="badge-stack">FaaS</span>
                <span className="badge-stack">Microservices</span>
                <span className="badge-stack">AI MCP Server</span>
              </div>
            </FadeInSection>
          </div>
        </section>

        <section id="projects" className="py-5 bg-light-alt">
          <div className="container py-4">
            <FadeInSection>
              <h2 className="text-center mb-5">{t("section-projects")}</h2>
            </FadeInSection>
            <div className="row g-4">
              <div className="col-md-4">
                <FadeInSection>
                  <div className="project-card p-4 d-flex flex-column">
                    <div className="mb-3 text-primary">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>
                    <h3 className="card-title">{t("project-1-name")}</h3>
                    <p className="text-muted flex-grow-1">{t("project-1-desc")}</p>
                    <div className="mt-auto pt-3 border-top">
                      <a href="https://shk-info.de/" className="project-link">{t("link-view")}</a>
                    </div>
                  </div>
                </FadeInSection>
              </div>

              <div className="col-md-4">
                <FadeInSection delay={100}>
                  <div className="project-card p-4 d-flex flex-column">
                    <div className="mb-3 text-primary">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                    </div>
                    <h3 className="card-title">{t("project-2-name")}</h3>
                    <p className="text-muted flex-grow-1">{t("project-2-desc")}</p>
                    <div className="mt-auto pt-3 border-top">
                      <a href="https://heizreport.dev/map.html" className="project-link">{t("link-view")}</a>
                    </div>
                  </div>
                </FadeInSection>
              </div>

              <div className="col-md-4">
                <FadeInSection delay={200}>
                  <div className="project-card p-4 d-flex flex-column">
                    <div className="mb-3 text-primary">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    </div>
                    <h3 className="card-title">{t("project-3-name")}</h3>
                    <p className="text-muted flex-grow-1">{t("project-3-desc")}</p>
                    <div className="mt-auto pt-3 border-top">
                      <a href="https://heizreport.dev/webapp.html" className="project-link">{t("link-view")}</a>
                    </div>
                  </div>
                </FadeInSection>
              </div>
            </div>
          </div>
        </section>

        <section id="github" className="py-5">
          <div className="container py-4">
            <FadeInSection>
              <h2 className="text-center mb-5">{t("section-github")}</h2>
              <div className="list-group max-w-75 mx-auto" style={{ maxWidth: '800px' }}>
                <a href="https://github.com/alexshmidt/microservices-core" target="_blank" className="list-group-item list-group-item-action p-4 border-light shadow-sm mb-3 rounded">
                  <div className="d-flex w-100 justify-content-between align-items-center mb-2">
                    <h5 className="mb-1 text-primary d-flex align-items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      <span>{t("github-1")}</span>
                    </h5>
                    <small className="text-muted border rounded px-2 py-1">NestJs</small>
                  </div>
                  <p className="mb-0 text-muted">{t("github-1-desc")}</p>
                </a>
                <a href="https://github.com/AlexKovalovSHK/go-ai-chat-desctop-mcp" target="_blank" className="list-group-item list-group-item-action p-4 border-light shadow-sm mb-3 rounded">
                  <div className="d-flex w-100 justify-content-between align-items-center mb-2">
                    <h5 className="mb-1 text-primary d-flex align-items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      <span>{t("github-2")}</span>
                    </h5>
                    <small className="text-muted border rounded px-2 py-1">Go</small>
                  </div>
                  <p className="mb-0 text-muted">{t("github-2-desc")}</p>
                </a>
                <a href="https://github.com/AlexKovalovSHK/js-vanile-extands-translator" target="_blank" className="list-group-item list-group-item-action p-4 border-light shadow-sm mb-0 rounded">
                  <div className="d-flex w-100 justify-content-between align-items-center mb-2">
                    <h5 className="mb-1 text-primary d-flex align-items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      <span>{t("github-3")}</span>
                    </h5>
                    <small className="text-muted border rounded px-2 py-1">VanillaJS</small>
                  </div>
                  <p className="mb-0 text-muted">{t("github-3-desc")}</p>
                </a>
              </div>
            </FadeInSection>
          </div>
        </section>

        <section id="contact" className="py-5">
          <div className="container py-4">
            <FadeInSection>
              <div className="row">
                <div className="col-lg-5 mb-5 mb-lg-0">
                  <h2 className="mb-4">{t("section-contact")}</h2>
                  <p className="text-muted mb-4">{t("contact-desc")}</p>

                  <div className="d-flex flex-column gap-3 mb-4">
                    <a href="mailto:alex@example.com" className="text-decoration-none text-body">
                      <strong className="text-primary me-2">Email:</strong> al.k.84.de@gmail.com
                    </a>
                    <a href="https://t.me/alex84_k" className="text-decoration-none text-body" target="_blank">
                      <strong className="text-primary me-2">Telegram:</strong> @@alex84_k
                    </a>
                    <a href="https://github.com/AlexKovalovSHK" className="text-decoration-none text-body" target="_blank">
                      <strong className="text-primary me-2">GitHub:</strong> https://github.com/AlexKovalovSHK
                    </a>
                    <a href="https://www.linkedin.com/in/alex-kovalov-developer" className="text-decoration-none text-body" target="_blank">
                      <strong className="text-primary me-2">LinkedIn:</strong> linkedin.com/in/alex-kovalov-developer
                    </a>
                  </div>
                </div>

                <div className="col-lg-6 offset-lg-1">
                  <form onSubmit={handleContactSubmit} className="p-4 bg-white border border-light rounded shadow-sm">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label text-muted">{t("label-name")}</label>
                      <input type="text" className="form-control" id="name" name="name" placeholder={t("label-name")} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label text-muted">{t("label-email")}</label>
                      <input type="email" className="form-control" id="email" name="email" placeholder={t("label-email")} required />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="form-label text-muted">{t("label-message")}</label>
                      <textarea className="form-control" id="message" name="message" rows={4} placeholder={t("label-message")} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">{t("btn-send")}</button>
                  </form>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      <footer className="bg-light-alt py-4 mt-auto">
        <div className="container text-center">
          <p className="mb-0 text-muted">{t("footer-text")}</p>
        </div>
      </footer>
    </>
  );
}

export default App;
