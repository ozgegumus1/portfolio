import { useState, useEffect, useRef } from 'react';
import Iridescence from './Iridescence';
import GradientWaves from './GradientWaves';
import TiltedCard from './TiltedCard';
import WarpText from './WarpText';
import ErrorBoundary from './ErrorBoundary';
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
  const darkBgContainerRef = useRef(null);
  const lightBgContainerRef = useRef(null);
  const strokesRef = useRef([]);
  const lastPos = useRef({ x: null, y: null });
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };

    resize();
    window.addEventListener('resize', resize);

    let animationFrameId;

    const render = () => {
      const activeContainer = themeRef.current === 'dark' ? darkBgContainerRef.current : lightBgContainerRef.current;
      const activeCanvas = activeContainer?.querySelector('canvas');

      // Aktif temanın canlı WebGL karesini ham piksel çözünürlüğünde kopyala
      // (Retina ekranlarda net görünmesi için).
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // GradientWaves shader'ı sis/ufuk nedeniyle bazı bölgelerde kasıtlı
      // olarak saydamlaşıyor; bunu olduğu gibi kopyalarsak altındaki diğer
      // tema her yerden sızar (sadece kazınan yerde değil). Bu yüzden önce
      // temaya uygun solid bir zemin koyup WebGL karesini onun üstüne
      // çiziyoruz — böylece aktif tema HER ZAMAN tam opak görünür.
      if (themeRef.current === 'dark') {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#5227ff');
        grad.addColorStop(0.45, '#a855f7');
        grad.addColorStop(1, '#ff9ffc');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (activeCanvas && activeCanvas.width > 0 && activeCanvas.height > 0) {
        ctx.drawImage(activeCanvas, 0, 0, canvas.width, canvas.height);
      }

      strokesRef.current.forEach((p) => {
        p.opacity -= 0.05;
      });
      strokesRef.current = strokesRef.current.filter((p) => p.opacity > 0);

      if (strokesRef.current.length > 0) {
        // Silme dairelerini CSS piksel koordinat sistemine geçerek çiz
        // (fare/dokunuş konumlarıyla birebir eşleşsin diye).
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        strokesRef.current.forEach((p) => {
          // Kuyruk efekti: opaklık düştükçe yarıçap da küçülür,
          // böylece iz kayarken sivrilerek sönümlenir.
          const r = p.radius * p.opacity;
          if (r <= 0.5) return;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
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
          radius: 34
        });
      }

      lastPos.current = { x, y };
    };

    const handleMouseMove = (e) => {
      scratchAt(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (!e.touches[0]) return;
      scratchAt(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleReset = () => {
      lastPos.current = { x: null, y: null };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleReset);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleReset);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleReset);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleReset);
    };
  }, []);

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
      {/* Arkaplan Katmanı: viewport'a sabit, sayfa üzerinden kayar.
          Her iki tema arkaplanı da HER ZAMAN yüklü kalır; aktif olan üstte
          tam görünür, diğeri altta gizlenir. Kazıma efekti üstteki katmana
          gerçek bir delik açarak alttaki (diğer tema) arkaplanı gösterir. */}
      <div className="bg-layer">
        {/* İnaktif tema arkaplanı: her zaman tam görünür, altta durur.
            Aktif temanın arkaplanı ise görsel olarak GİZLİDİR (opacity:0)
            ama WebGL'i çalışmaya devam eder — kazıma canvas'ı onun canlı
            görüntüsünü her karede kopyalar ve delik açtığı yerlerde bu
            inaktif katmanı gösterir. Bu, tüm tarayıcılarda (Safari dahil)
            güvenilir çalışan klasik Canvas2D yöntemidir. */}
        <div
          ref={darkBgContainerRef}
          className="bg-instance bg-instance-waves"
          style={{ zIndex: 1, opacity: theme === 'dark' ? 0 : 1 }}
        >
          <GradientWaves mouseInteraction={false} />
        </div>
        <div
          ref={lightBgContainerRef}
          className="bg-instance"
          style={{ zIndex: 1, opacity: theme === 'light' ? 0 : 1 }}
        >
          <Iridescence mouseReact={false} />
        </div>
        <canvas ref={scratchCanvasRef} className="scratch-canvas" />
      </div>

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
          <span className="small-name">
            <ErrorBoundary fallback="Özge Gümüş">
              <WarpText
                text="Özge Gümüş"
                className="warp-small-name"
                color={theme === 'dark' ? '#ffffff' : '#111111'}
                fontSize="clamp(0.85rem, 4vw, 1rem)"
                fontWeight={600}
                letterSpacing="-0.01em"
                lineHeight={1}
                warpStrength={0.05}
                pointerInfluence={0.32}
                pointerStrength={0.26}
                refraction={0.012}
              />
            </ErrorBoundary>
          </span>
          <h1 className="main-title">
            <ErrorBoundary fallback="SOFTWARE DEVELOPER">
              <WarpText
                text={'SOFTWARE\nDEVELOPER'}
                className="warp-main-title"
                color={theme === 'dark' ? '#ffffff' : '#111111'}
                fontSize="clamp(1.9rem, 9.5vw, 4.5rem)"
                fontWeight={900}
                letterSpacing="-0.04em"
                lineHeight={0.95}
                warpStrength={0.07}
                pointerInfluence={0.38}
                pointerStrength={0.34}
                refraction={0.016}
              />
            </ErrorBoundary>
          </h1>
          <p className="hero-desc">
            Building high-performance websites with<br />
            more to discover beneath the surface.
          </p>
        </div>

        {/* Projeler Grid — normal sayfa akışında */}
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

        {/* Hakkımda ve Stack Bölümü — projelerin hemen altında, normal sayfa akışında */}
        <div className="about-stack-container">
          <div className="about-section">
            <h2 className="section-title">
              <ErrorBoundary fallback="Hakkımda">
                <WarpText
                  text="Hakkımda"
                  className="warp-section-title warp-heading-about"
                  color={theme === 'dark' ? '#ffffff' : '#111111'}
                  fontSize="clamp(1.5rem, 6vw, 2rem)"
                  fontWeight={800}
                  letterSpacing="-0.02em"
                  lineHeight={1}
                  warpStrength={0.05}
                  pointerInfluence={0.32}
                  pointerStrength={0.26}
                  refraction={0.012}
                />
              </ErrorBoundary>
            </h2>
            <p className="about-text">
              Siyaset Bilimi ve İşletme Yönetimi mezunuyum. Geliştirme sürecinde ön yüzde dinamik yapılara ve tip güvenliğine, arka planda ise veri tabanı yönetimi ile otomasyonlara odaklanıyorum. Projeleri, kullanıcı deneyiminden veri akışına kadar tüm teknik gereksinimleriyle bir bütün olarak ele alıyorum. Projelerimde dinamik veri yönetimi için API entegrasyonlarını ve Supabase'i aktif kullanıyor; arka plan süreçlerinde Python'dan yararlanıyorum. İş akışımda yapay zeka araçlarıyla geliştirme sürecini ve kod kalitesini optimize ediyorum. Ethical Hacker (siber güvenlik) eğitimim devam ediyor; Linux ve sanal makine (VirtualBox) ortamlarında rahatım. Sıfırdan tam fonksiyonel web uygulamaları geliştirebilecek teknik bağımsızlığa sahibim; temiz ve sürdürülebilir koda odaklanıyorum.
            </p>
          </div>

          <div className="stack-section">
            <h2 className="section-title">
              <ErrorBoundary fallback="Stack">
                <WarpText
                  text="Stack"
                  className="warp-section-title warp-heading-stack"
                  color={theme === 'dark' ? '#ffffff' : '#111111'}
                  fontSize="clamp(1.5rem, 6vw, 2rem)"
                  fontWeight={800}
                  letterSpacing="-0.02em"
                  lineHeight={1}
                  warpStrength={0.05}
                  pointerInfluence={0.32}
                  pointerStrength={0.26}
                  refraction={0.012}
                />
              </ErrorBoundary>
            </h2>
            <div className="stack-tags">
              {techStack.map((tech, index) => (
                <span key={index} className="stack-tag">{tech}</span>
              ))}
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