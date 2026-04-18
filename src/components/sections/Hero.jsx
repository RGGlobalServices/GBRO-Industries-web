import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero() {
  const canvasRef = useRef(null);

  /* ─── Three.js Scene ───────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const clock = new THREE.Clock();
    let W = canvas.parentElement?.clientWidth  || window.innerWidth;
    let H = canvas.parentElement?.clientHeight || window.innerHeight;

    // Scene + Camera
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    // Scene group for mouse parallax
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // Lights
    scene.add(new THREE.AmbientLight(0x111133, 0.8));
    const pLight1 = new THREE.PointLight(0x00d4ff, 2.5, 50);
    pLight1.position.set(4, 4, 4);
    scene.add(pLight1);
    const pLight2 = new THREE.PointLight(0x7c3aed, 2, 40);
    pLight2.position.set(-4, -2, 3);
    scene.add(pLight2);
    const pLight3 = new THREE.PointLight(0xa855f7, 1.5, 30);
    pLight3.position.set(0, 6, -4);
    scene.add(pLight3);

    // Central AI Sphere
    const sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.8, 5),
      new THREE.MeshPhongMaterial({ color: 0x0d1f3c, emissive: 0x0d0d24, specular: 0x00d4ff, shininess: 80, transparent: true, opacity: 0.85 })
    );
    sceneGroup.add(sphere);

    // Wireframe overlay
    const wireMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.82, 2),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.08 })
    );
    sceneGroup.add(wireMesh);

    // Outer glow
    const glowSphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.04, side: THREE.BackSide })
    );
    sceneGroup.add(glowSphere);

    // Orbital Rings
    const makeRing = (r1, r2, color, op, rx, rz) => {
      const m = new THREE.Mesh(
        new THREE.RingGeometry(r1, r2, 64),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op, side: THREE.DoubleSide })
      );
      m.rotation.x = rx;
      m.rotation.z = rz;
      return m;
    };
    const ring1 = makeRing(2.4, 2.45, 0x00d4ff, 0.35, Math.PI / 2.5, 0.4);
    const ring2 = makeRing(2.8, 2.84, 0x7c3aed, 0.25, 1.2, -0.3);
    const ring3 = makeRing(3.2, 3.23, 0xa855f7, 0.18, 0.5, 0.8);
    sceneGroup.add(ring1, ring2, ring3);

    // Orbital dots
    const dotGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const dots = [
      { radius: 2.42, mat: new THREE.MeshBasicMaterial({ color: 0x00d4ff }), speed: 0.8,  offset: 0 },
      { radius: 2.42, mat: new THREE.MeshBasicMaterial({ color: 0x00d4ff }), speed: 0.8,  offset: Math.PI },
      { radius: 2.82, mat: new THREE.MeshBasicMaterial({ color: 0x7c3aed }), speed: -0.5, offset: Math.PI / 3 },
      { radius: 2.82, mat: new THREE.MeshBasicMaterial({ color: 0x7c3aed }), speed: -0.5, offset: Math.PI + Math.PI / 3 },
      { radius: 3.22, mat: new THREE.MeshBasicMaterial({ color: 0xa855f7 }), speed: 0.3,  offset: Math.PI / 5 },
    ].map(cfg => {
      const dot = new THREE.Mesh(dotGeo, cfg.mat);
      dot.userData = cfg;
      sceneGroup.add(dot);
      return dot;
    });

    // Floating cubes
    const cubes = [
      { size: 0.25, x: -4,   y: 1.5,  z: -1, color: 0x00d4ff },
      { size: 0.2,  x:  4.5, y: -1,   z:  1, color: 0x7c3aed },
      { size: 0.18, x: -3,   y: -2.5, z:  0, color: 0xa855f7 },
      { size: 0.3,  x:  3.5, y:  2.5, z: -2, color: 0x00d4ff },
      { size: 0.15, x: -5,   y: -0.5, z:  1, color: 0x7c3aed },
      { size: 0.22, x:  5,   y:  0.5, z: -1, color: 0xa855f7 },
    ].map(s => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(s.size, s.size, s.size),
        new THREE.MeshPhongMaterial({ color: s.color, emissive: s.color, emissiveIntensity: 0.3, transparent: true, opacity: 0.5 })
      );
      mesh.position.set(s.x, s.y, s.z);
      mesh.userData = { initY: s.y, floatOffset: Math.random() * Math.PI * 2, floatSpeed: 0.4 + Math.random() * 0.4, rotSpeed: (Math.random() - 0.5) * 0.02 };
      scene.add(mesh);
      return mesh;
    });

    // Particles
    const PARTICLES = 280;
    const positions = new Float32Array(PARTICLES * 3);
    const pColors   = new Float32Array(PARTICLES * 3);
    const palette   = [new THREE.Color(0x00d4ff), new THREE.Color(0x7c3aed), new THREE.Color(0xa855f7)];
    for (let i = 0; i < PARTICLES; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 4 + Math.random() * 8;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 4;
      const c = palette[Math.floor(Math.random() * 3)];
      pColors[i * 3] = c.r; pColors[i * 3 + 1] = c.g; pColors[i * 3 + 2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pColors, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(particles);

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      W = canvas.parentElement?.clientWidth  || window.innerWidth;
      H = canvas.parentElement?.clientHeight || window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta   = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      // Parallax
      targetX += (mouseX * 0.4 - targetX) * 0.05;
      targetY += (-mouseY * 0.3 - targetY) * 0.05;
      sceneGroup.rotation.y = targetX * 0.3;
      sceneGroup.rotation.x = targetY * 0.2;

      // Sphere
      sphere.rotation.y += delta * 0.15;
      sphere.rotation.x += delta * 0.05;
      const pulse = 1 + Math.sin(elapsed * 1.2) * 0.015;
      sphere.scale.set(pulse, pulse, pulse);
      glowSphere.scale.set(pulse * 1.05, pulse * 1.05, pulse * 1.05);
      wireMesh.rotation.y = sphere.rotation.y * 0.6;
      wireMesh.rotation.x = sphere.rotation.x;

      // Rings
      ring1.rotation.z += delta * 0.2;
      ring2.rotation.z -= delta * 0.15;
      ring3.rotation.z += delta * 0.08;
      ring1.rotation.x = Math.PI / 2.5 + Math.sin(elapsed * 0.3) * 0.05;

      // Dots
      dots.forEach(dot => {
        const { radius, speed, offset } = dot.userData;
        const angle = elapsed * speed + offset;
        dot.position.x = radius * Math.cos(angle);
        dot.position.y = radius * Math.sin(angle) * 0.4;
        dot.position.z = radius * Math.sin(angle) * 0.9;
      });

      // Cubes
      cubes.forEach(c => {
        const { initY, floatOffset, floatSpeed, rotSpeed } = c.userData;
        c.position.y = initY + Math.sin(elapsed * floatSpeed + floatOffset) * 0.3;
        c.rotation.x += rotSpeed;
        c.rotation.y += rotSpeed * 1.3;
      });

      particles.rotation.y = elapsed * 0.015;
      particles.rotation.x = elapsed * 0.008;

      pLight1.position.x = Math.sin(elapsed * 0.5) * 6;
      pLight1.position.z = Math.cos(elapsed * 0.5) * 6;
      pLight2.position.x = Math.cos(elapsed * 0.4) * 5;
      pLight2.position.z = Math.sin(elapsed * 0.4) * 5;

      renderer.render(scene, camera);
    };

    animate();

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else { clock.getDelta(); animate(); }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.dispose();
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <canvas ref={canvasRef} className="hero__canvas" />
      <div className="hero__grid-overlay" />

      <div className="container hero__content">
        <div className="hero__text">
          <div className="hero__badge">
            <span className="badge__dot" />
            <span>AI-Powered Solutions</span>
          </div>

          <h1 className="hero__headline">
            Building{' '}
            <span className="gradient-text">Future-Ready</span>
            <br />Digital Solutions
          </h1>

          <p className="hero__subheadline">
            AI, Web Development &amp; Automation for Business Growth
          </p>

          <p className="hero__desc">
            We craft intelligent, scalable digital products that transform ideas into
            high-performance realities. Trusted by businesses in Nashik &amp; beyond.
          </p>

          <div className="hero__cta">
            <a href="#contact" className="btn btn--primary btn--lg" onClick={(e) => handleNavClick(e, '#contact')}>
              <span>Get Started</span>
              <i className="fa-solid fa-arrow-right btn__icon" />
            </a>
            <a href="https://wa.me/917058682657" target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--lg">
              <i className="fa-brands fa-whatsapp" />
              <span>Contact Us</span>
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero-stat">
              <span className="hero-stat__num">10+</span>
              <span className="hero-stat__label">Projects Delivered</span>
            </div>
            <div className="hero-stat__divider" />
            <div className="hero-stat">
              <span className="hero-stat__num">10+</span>
              <span className="hero-stat__label">Happy Clients</span>
            </div>
            <div className="hero-stat__divider" />
            <div className="hero-stat">
              <span className="hero-stat__num">2+</span>
              <span className="hero-stat__label">Years of Excellence</span>
            </div>
          </div>
        </div>

        {/* Floating tech cards */}
        <div className="hero__visual">
          <div className="tech-card tech-card--1">
            <i className="fa-solid fa-brain" />
            <span>AI Solutions</span>
          </div>
          <div className="tech-card tech-card--2">
            <i className="fa-solid fa-code" />
            <span>Web Dev</span>
          </div>
          <div className="tech-card tech-card--3">
            <i className="fa-solid fa-robot" />
            <span>Automation</span>
          </div>
          <div className="tech-card tech-card--4">
            <i className="fa-solid fa-chart-line" />
            <span>Growth</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
