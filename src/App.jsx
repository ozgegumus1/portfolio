import { useState, useEffect, useRef } from 'react';
import Iridescence from './Iridescence';
import GradientWaves from './GradientWaves';
import TiltedCard from './TiltedCard';
import SpecularButton from './SpecularButton';
import './App.css';

// Proje görsellerinin içe aktarılması
import routixImg from './work/Routix.jpeg';
import vestaImg from './work/vesta-pms.jpg';
import agtaslarImg from './work/b2b-agtaslar.jpg';
import flockImg from './work/flock.jpg';
import gasoilImg from './work/gasoil.jpg';
import inkwellImg from './work/inkwell.jpg';
import intraImg from './work/intra.jpg';
import linespineImg from './work/linespine.jpg';
import noirImg from './work/noir.jpg';

const projectsData = [
  {
    id: 1,
    title: "Routix",
    caption: "Routix",
    image: routixImg,
    description: "Routix, saha ekipleri için geliştirilmiş uçtan uca satış yönetimi ve optimizasyon platformudur. PWA desteği, akıllı rota planlama, stok/kredi takibi ve SAP/Logo gibi popüler kurumsal ERP sistemleriyle tam entegrasyon altyapısı sunar.",
    tags: ["React", "TypeScript", "PWA", "MySQL"]
  },
  {
    id: 2,
    title: "Vesta PMS",
    caption: "Vesta PMS",
    image: vestaImg,
    description: "Vesta, otelcilik sektöründeki operasyonel süreçleri ve yasal yükümlülükleri frontend mimarisi üzerinde simüle eden modern bir Otel Yönetim Paneli (PMS) çalışmasıdır. Kullanıcıların oda durumlarını dinamik olarak izleyebildiği canlı bir resepsiyon matrisi ve hızlı check-in/check-out akışları barındırır. Projenin odak noktası, resepsiyona girişi yapılan misafirlerin verilerini işleyerek asenkron süreçlerle resmi onay kodları üreten sanal bir KBS modülünü merkezi bir state yönetimiyle senkronize çalıştırmasıdır. Tasarım tarafında göz yormayan, siber-koyu tonlarda ve glassmorphism efektlerine sahip modern bir kullanıcı arayüzü sunar.",
    githubUrl: "https://github.com/ozgegumus1/vesta-pms",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"]
  },
  {
    id: 3,
    title: "B2B Ağtaşlar",
    caption: "B2B Ağtaşlar",
    image: agtaslarImg,
    description: "Güvenlik sistemleri ve teknolojik altyapı çözümleri sunan bir B2B firması için geliştirilmiş modern kurumsal web sitesi. Müşteri güvenini yansıtan profesyonel tasarımıyla firmanın hizmetleri ve iletişim kanalları net biçimde hedeflendi.",
    liveUrl: "https://b2bagtaslargroup.com",
    tags: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    id: 4,
    title: "Flock - Social Media",
    caption: "Flock - Social Media",
    image: flockImg,
    description: "React, TypeScript ve Supabase altyapısıyla geliştirdiğim, Context API ile durum yönetimiyle gerçek zamanlı veri akışına ve medya yönetimine odaklanan sosyal medya uygulaması: Flock. Projede; kayıpsız medya paylaşımı, dinamik etkileşim filtreleri (hikaye ve yorum, mesajlaşma, keşfet mekanizmaları) ile Supabase Auth üzerinden güvenli oturum yönetimi süreçlerini PWA da ekleyerek kurguladım.",
    liveUrl: "https://flocksocial.vercel.app",
    githubUrl: "https://github.com/ozgegumus1",
    tags: ["React", "TypeScript", "Supabase", "Context API", "PWA"]
  },
  {
    id: 5,
    title: "GasOil",
    caption: "GasOil",
    image: gasoilImg,
    description: "Endüstriyel üretim yapan uluslararası bir B2B firması için geliştirilmiş modern web arayüzü. Ürün kataloglarının hızlı ve her cihaza tam uyumlu şekilde sergilenmesi hedeflenerek, markanın kurumsal kimliğine uygun temiz bir kod yapısı oluşturulmuştur.",
    liveUrl: "https://gasoil.com.tr",
    tags: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    id: 6,
    title: "Inkwell",
    caption: "Inkwell",
    image: inkwellImg,
    description: "Scroll ile ilerledikçe sayfa 3 boyutlu nesnelerle birlikte derinlik kazanan, kitap/yayınevi temalı bir web deneyimi. Sayfa kaydırma hareketi, sahnedeki objelerin dönüşünü ve konumunu kontrol ediyor; statik bir tanıtım sayfası yerine keşfedilen bir hikâye anlatımı kurgulandı.",
    liveUrl: "https://bookieweb.vercel.app/",
    tags: ["HTML", "CSS", "JavaScript", "WebGL"]
  },
  {
    id: 7,
    title: "Intra",
    caption: "Intra",
    image: intraImg,
    description: "Büyük işletmelerin iç iletişim ve mesai ihtiyaçlarını çözen, hazır framework kullanmadan sıfırdan geliştirdiğim full stack SaaS ürünüm Intra'yı tamamladım. Performans için HTTP isteklerini PHP (REST API) ile yönetirken, anlık mesajlaşmayı sıfır gecikmeli Node.js ve WebSocket sunucusuyla kurguladım. Bir personel sistemde pasife alındığında, açık olan WebSocket bağlantısını milisaniyeler içinde sunucudan kesen dinamik bir altyapı. Admin girişleri zamanlama saldırılarına karşı hash_equals ile doğrulanır. Kimlik taklidini engelleyen, personele özel benzersiz giriş kodları ve admin panelinden mesai kayıtlarını Excel'e aktarma seçeneği. Arayüz ve mesai manipülasyonlarını engellemek için cihaz saatini yok sayarak tüm giriş/çıkış kayıtlarını tamamen sunucu saatine endeksledim, yetkilendirmeleri de sunucu tarafında çift katmanlı doğrulattım. Geçmiş kayıtların İK raporları için korunması ve bir mobil uygulama gibi çalışan tam ekran PWA deneyimi sundum.",
    tags: ["PHP", "Node.js", "WebSocket (ws)", "MySQL", "REST API", "JavaScript", "PWA"]
  },
  {
    id: 8,
    title: "Line Spine",
    caption: "LineSpine",
    image: linespineImg,
    description: "Kullanıcı deneyimini merkeze alan, modern ve dinamik bir web projesi. Markanın dijital kimliğini ve vizyonunu öne çıkarmak amacıyla hızlı yüklenen, sade ve tamamen mobil uyumlu bir arayüz mimarisiyle geliştirilmiştir.",
    liveUrl: "https://linespine.com",
    tags: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    id: 9,
    title: "NOIRGarage",
    caption: "NOIRGarage",
    image: noirImg,
    description: "Araç sahiplerine PPF (boya koruma filmi), seramik kaplama ve profesyonel detaylandırma hizmetleri sunan bir oto bakım stüdyosu için tasarladığım karanlık ve zarif bir marka sitesi. Hizmetleri net bir akışla anlatırken, markanın premium ve sinematik kimliğini yansıtan görseller ve sade bir tipografiyle ziyaretçide güven uyandıran bir izlenim hedefledim.",
    liveUrl: "https://noirgarage.vercel.app/",
    githubUrl: "https://github.com/ozgegumus1/NOIRDETAILING.git",
    tags: ["HTML", "CSS", "JavaScript", "React"]
  }
];

const techStack = [
  "HTML", "CSS", "JavaScript", "React", "TypeScript", 
  "Tailwind CSS", "Sanal Makineler", "Node.js", "Nest.js", 
  "MySQL", "Python", "Supabase", "Vercel", "PostgreSQL", 
  "Git & GitHub", "Linux"
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [selectedProject, setSelectedProject] = useState(null);
  const scratchCanvasRef = useRef(null);
  const strokesRef = useRef([]);
  const lastPos = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = theme === 'dark' ? '#0a0a0c' : '#f4f4f6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      strokesRef.current.forEach((p) => {
        p.opacity -= 0.05;
      });
      strokesRef.current = strokesRef.current.filter((p) => p.opacity > 0);

      if (strokesRef.current.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        strokesRef.current.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 0, 0, ${p.opacity})`;
          ctx.fill();
        });
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const scratchAt = (x, y) => {
      if (lastPos.current.x === null || lastPos.current.y === null) {
        lastPos.current = { x, y };
      }

      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.floor(dist / 6));

      for (let i = 0; i <= steps; i++) {
        const nx = lastPos.current.x + (dx * i) / steps;
        const ny = lastPos.current.y + (dy * i) / steps;
        strokesRef.current.push({
          x: nx,
          y: ny,
          opacity: 1,
          radius: 45
        });
      }

      lastPos.current = { x, y };
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      scratchAt(x, y);
    };

    const handleTouchMove = (e) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      scratchAt(x, y);
    };

    const handleReset = () => {
      lastPos.current = { x: null, y: null };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleReset);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleReset);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleReset);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleReset);
    };
  }, [theme]);

  // CV İndirme Fonksiyonu
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Ozge_Gumus_CV.pdf';
    link.download = 'Ozge_Gumus_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`app-container ${theme}`}>
      {theme === 'dark' ? (
        <Iridescence color1="#ff7eb3" color2="#7afcff" speed={1.2} />
      ) : (
        <GradientWaves
          horizonColor="#5227FF"
          waveColor="#FF9FFC"
          crestColor="#FFFFFF"
          speed={0.4}
        />
      )}

      <canvas ref={scratchCanvasRef} className="scratch-canvas" />

      {/* Üst Sağ: CV İndir Butonu ve Tema Değiştirici */}
      <div className="top-right-nav">
        <SpecularButton
          size="sm"
          radius={14}
          tint={theme === 'dark' ? '#ffffff' : '#000000'}
          tintOpacity={0.06}
          textColor={theme === 'dark' ? '#ffffff' : '#111111'}
          lineColor={theme === 'dark' ? '#ffffff' : '#444444'}
          baseColor={theme === 'dark' ? '#525252' : '#939393'}
          intensity={1.1}
          onClick={handleDownloadCV}
        >
          CV İndir
        </SpecularButton>

        <button
          className="theme-toggle"
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light');
            strokesRef.current = [];
          }}
          title="Tema Değiştir"
        >
          <span className="icon">{theme === 'light' ? '⏾' : '☼'}</span>
        </button>
      </div>

      {/* İçerik Katmanı */}
      <div className="content-layout">
        {/* Sol Üst Başlık */}
        <div className="hero-section">
          <span className="small-name">Özge Gümüş</span>
          <h1 className="main-title">SOFTWARE<br />DEVELOPER</h1>
          <p className="hero-desc">
            Building high-performance websites with<br />
            more to discover beneath the surface.
          </p>
        </div>

        {/* Projeler Grid ve İçerik Alanı (Scrollable) */}
        <div className="projects-grid-container">
          <div className="projects-grid">
            {projectsData.map((project) => (
              <div 
                key={project.id} 
                onClick={() => setSelectedProject(project)} 
                style={{ cursor: 'pointer' }}
              >
                <TiltedCard
                  imageSrc={project.image}
                  altText={project.title}
                  captionText={project.caption}
                  containerHeight="260px"
                  containerWidth="100%"
                  imageHeight="240px"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.06}
                  showMobileWarning={false}
                  showTooltip={true}
                />
              </div>
            ))}
          </div>

          {/* Hakkımda ve Stack Bölümü (Projelerin Altı) */}
          <div className="about-stack-container">
            <div className="about-section">
              <h2 className="section-title">Hakkımda</h2>
              <p className="about-text">
                Siyaset Bilimi ve İşletme Yönetimi mezunuyum. Geliştirme sürecinde ön yüzde dinamik yapılara ve tip güvenliğine, arka planda ise veri tabanı yönetimi ile otomasyonlara odaklanıyorum. Projeleri, kullanıcı deneyiminden veri akışına kadar tüm teknik gereksinimleriyle bir bütün olarak ele alıyorum. Projelerimde dinamik veri yönetimi için API entegrasyonlarını ve Supabase'i aktif kullanıyor; arka plan süreçlerinde Python'dan yararlanıyorum. İş akışımda yapay zeka araçlarıyla geliştirme sürecini ve kod kalitesini optimize ediyorum. Ethical Hacker (siber güvenlik) eğitimim devam ediyor; Linux ve sanal makine (VirtualBox) ortamlarında rahatım. Sıfırdan tam fonksiyonel web uygulamaları geliştirebilecek teknik bağımsızlığa sahibim; temiz ve sürdürülebilir koda odaklanıyorum.
              </p>
            </div>

            <div className="stack-section">
              <h2 className="section-title">Stack</h2>
              <div className="stack-tags">
                {techStack.map((tech, index) => (
                  <span key={index} className="stack-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proje Detay Modal Ekranı */}
      {selectedProject !== null && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="project-modal-header">
              <h2>{selectedProject.title}</h2>
              <button 
                className="close-modal-btn" 
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
            </div>
            <div className="project-modal-body">
              <p className="modal-project-desc">
                {selectedProject.description}
              </p>

              {selectedProject.tags && (
                <div className="modal-tags">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className="modal-tag">{tag}</span>
                  ))}
                </div>
              )}

              <div className="modal-links">
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn live-btn">
                    Canlı Siteyi Gör ↗
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn github-btn">
                    GitHub İncele ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}