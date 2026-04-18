/**
 * GBRO Industries — Three.js Hero Scene
 * Animated AI sphere + floating particles + orbital rings + cubes
 */

(function () {
  'use strict';

  // ─── Setup ──────────────────────────────────────────────────
  const canvas  = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene    = new THREE.Scene();
  const clock    = new THREE.Clock();
  let   W        = canvas.clientWidth  || window.innerWidth;
  let   H        = canvas.clientHeight || window.innerHeight;

  // Camera
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
  camera.position.set(0, 0, 8);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha:     true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);

  // ─── Scene Group (for mouse parallax) ─────────────────────
  const sceneGroup = new THREE.Group();
  scene.add(sceneGroup);

  // ─── Lighting ───────────────────────────────────────────────
  const ambientLight = new THREE.AmbientLight(0x111133, 0.8);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00d4ff, 2.5, 50);
  pointLight1.position.set(4, 4, 4);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x7c3aed, 2, 40);
  pointLight2.position.set(-4, -2, 3);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xa855f7, 1.5, 30);
  pointLight3.position.set(0, 6, -4);
  scene.add(pointLight3);

  // ─── Central AI Sphere ─────────────────────────────────────
  const sphereGeo = new THREE.IcosahedronGeometry(1.8, 5);
  const sphereMat = new THREE.MeshPhongMaterial({
    color:       0x0d1f3c,
    emissive:    0x0d0d24,
    specular:    0x00d4ff,
    shininess:   80,
    wireframe:   false,
    transparent: true,
    opacity:     0.85,
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  sceneGroup.add(sphere);

  // Wireframe overlay on sphere
  const wireGeo = new THREE.IcosahedronGeometry(1.82, 2);
  const wireMat = new THREE.MeshBasicMaterial({
    color:       0x00d4ff,
    wireframe:   true,
    transparent: true,
    opacity:     0.08,
  });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  sceneGroup.add(wireMesh);

  // Outer glow sphere
  const glowGeo = new THREE.SphereGeometry(2.2, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color:       0x00d4ff,
    transparent: true,
    opacity:     0.04,
    side:        THREE.BackSide,
  });
  const glowSphere = new THREE.Mesh(glowGeo, glowMat);
  sceneGroup.add(glowSphere);

  // ─── Orbital Rings ─────────────────────────────────────────
  function createRing(innerR, outerR, color, opacity, rotX, rotZ) {
    const geo = new THREE.RingGeometry(innerR, outerR, 64);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = rotX;
    mesh.rotation.z = rotZ;
    return mesh;
  }

  const ring1 = createRing(2.4, 2.45, 0x00d4ff, 0.35, Math.PI / 2.5, 0.4);
  const ring2 = createRing(2.8, 2.84, 0x7c3aed, 0.25, 1.2, -0.3);
  const ring3 = createRing(3.2, 3.23, 0xa855f7, 0.18, 0.5, 0.8);
  sceneGroup.add(ring1, ring2, ring3);

  // ─── Orbital Dots on Ring 1 ────────────────────────────────
  const dotGeo  = new THREE.SphereGeometry(0.06, 8, 8);
  const dotMat1 = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
  const dotMat2 = new THREE.MeshBasicMaterial({ color: 0x7c3aed });
  const dotMat3 = new THREE.MeshBasicMaterial({ color: 0xa855f7 });

  const orbitalDots = [];
  const DOT_CONFIGS = [
    { radius: 2.42, mat: dotMat1, speed: 0.8,  offset: 0 },
    { radius: 2.42, mat: dotMat1, speed: 0.8,  offset: Math.PI },
    { radius: 2.82, mat: dotMat2, speed: -0.5, offset: Math.PI / 3 },
    { radius: 2.82, mat: dotMat2, speed: -0.5, offset: Math.PI + Math.PI / 3 },
    { radius: 3.22, mat: dotMat3, speed: 0.3,  offset: Math.PI / 5 },
  ];

  DOT_CONFIGS.forEach(cfg => {
    const dot = new THREE.Mesh(dotGeo, cfg.mat);
    dot.userData = cfg;
    sceneGroup.add(dot);
    orbitalDots.push(dot);
  });

  // ─── Floating Cubes ────────────────────────────────────────
  const cubeData = [];
  const CUBE_SPECS = [
    { size: 0.25, x: -4,   y: 1.5,  z: -1, color: 0x00d4ff, opacity: 0.6 },
    { size: 0.2,  x:  4.5, y: -1,   z:  1, color: 0x7c3aed, opacity: 0.5 },
    { size: 0.18, x: -3,   y: -2.5, z:  0, color: 0xa855f7, opacity: 0.55 },
    { size: 0.3,  x:  3.5, y:  2.5, z: -2, color: 0x00d4ff, opacity: 0.4 },
    { size: 0.15, x: -5,   y: -0.5, z:  1, color: 0x7c3aed, opacity: 0.45 },
    { size: 0.22, x:  5,   y:  0.5, z: -1, color: 0xa855f7, opacity: 0.5 },
  ];

  CUBE_SPECS.forEach(spec => {
    const geo  = new THREE.BoxGeometry(spec.size, spec.size, spec.size);
    const mat  = new THREE.MeshPhongMaterial({
      color:       spec.color,
      emissive:    spec.color,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity:     spec.opacity,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(spec.x, spec.y, spec.z);
    mesh.userData.floatOffset = Math.random() * Math.PI * 2;
    mesh.userData.floatSpeed  = 0.4 + Math.random() * 0.4;
    mesh.userData.rotSpeed    = (Math.random() - 0.5) * 0.02;
    mesh.userData.initY       = spec.y;
    scene.add(mesh);
    cubeData.push(mesh);
  });

  // ─── Particle Field ────────────────────────────────────────
  const PARTICLE_COUNT = 280;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const pSizes    = new Float32Array(PARTICLE_COUNT);
  const pColors   = new Float32Array(PARTICLE_COUNT * 3);

  // Color palette for particles
  const paletteCyan   = new THREE.Color(0x00d4ff);
  const palettePurple = new THREE.Color(0x7c3aed);
  const paletteViolet = new THREE.Color(0xa855f7);
  const palette = [paletteCyan, palettePurple, paletteViolet];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Spherical distribution
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 4 + Math.random() * 8;

    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi) - 4;

    pSizes[i] = 1.5 + Math.random() * 3;

    const col = palette[Math.floor(Math.random() * palette.length)];
    pColors[i * 3]     = col.r;
    pColors[i * 3 + 1] = col.g;
    pColors[i * 3 + 2] = col.b;
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('size',     new THREE.BufferAttribute(pSizes, 1));
  pGeo.setAttribute('color',    new THREE.BufferAttribute(pColors, 3));

  const pMat = new THREE.PointsMaterial({
    size:         0.06,
    vertexColors: true,
    transparent:  true,
    opacity:      0.7,
    sizeAttenuation: true,
    blending:     THREE.AdditiveBlending,
    depthWrite:   false,
  });

  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // ─── Data Line Connections ──────────────────────────────────
  const lineGroup = new THREE.Group();
  scene.add(lineGroup);

  function createDataLine() {
    const pts = [];
    const numPoints = 4 + Math.floor(Math.random() * 4);
    let x = (Math.random() - 0.5) * 14;
    let y = (Math.random() - 0.5) * 8;
    let z = (Math.random() - 0.5) * 4 - 2;

    for (let i = 0; i < numPoints; i++) {
      pts.push(new THREE.Vector3(x, y, z));
      x += (Math.random() - 0.5) * 2;
      y += (Math.random() - 0.5) * 1.5;
      z += (Math.random() - 0.5) * 1;
    }

    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color:       Math.random() > 0.5 ? 0x00d4ff : 0x7c3aed,
      transparent: true,
      opacity:     0.1 + Math.random() * 0.1,
      blending:    THREE.AdditiveBlending,
    });
    return new THREE.Line(geo, mat);
  }

  for (let i = 0; i < 12; i++) {
    lineGroup.add(createDataLine());
  }

  // ─── Mouse Parallax ────────────────────────────────────────
  let   mouseX    = 0;
  let   mouseY    = 0;
  const TARGET    = { x: 0, y: 0 };

  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ─── Resize Handler ────────────────────────────────────────
  function onResize() {
    W = canvas.parentElement ? canvas.parentElement.clientWidth  : window.innerWidth;
    H = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  }
  window.addEventListener('resize', onResize);
  onResize();

  // ─── Animation Loop ────────────────────────────────────────
  let   frameId   = null;
  const MAX_DELTA = 0.05;

  function animate() {
    frameId = requestAnimationFrame(animate);

    const delta = Math.min(clock.getDelta(), MAX_DELTA);
    const elapsed = clock.getElapsedTime();

    // Smooth mouse follow for scene group parallax
    TARGET.x += (mouseX * 0.4 - TARGET.x) * 0.05;
    TARGET.y += (-mouseY * 0.3 - TARGET.y) * 0.05;
    sceneGroup.rotation.y = TARGET.x * 0.3;
    sceneGroup.rotation.x = TARGET.y * 0.2;

    // Sphere pulse + rotation
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

    // Update ring tilts slightly
    ring1.rotation.x = Math.PI / 2.5 + Math.sin(elapsed * 0.3) * 0.05;
    ring2.rotation.x = 1.2 + Math.cos(elapsed * 0.25) * 0.04;

    // Orbital dots
    orbitalDots.forEach(dot => {
      const cfg     = dot.userData;
      const angle   = elapsed * cfg.speed + cfg.offset;
      const tiltFactor = 0.4; // ring tilt
      dot.position.x = cfg.radius * Math.cos(angle);
      dot.position.y = cfg.radius * Math.sin(angle) * Math.sin(tiltFactor);
      dot.position.z = cfg.radius * Math.sin(angle) * Math.cos(tiltFactor);
    });

    // Floating cubes
    cubeData.forEach(cube => {
      const { floatOffset, floatSpeed, rotSpeed, initY } = cube.userData;
      cube.position.y = initY + Math.sin(elapsed * floatSpeed + floatOffset) * 0.3;
      cube.rotation.x += rotSpeed;
      cube.rotation.y += rotSpeed * 1.3;
    });

    // Particles slow rotation
    particles.rotation.y = elapsed * 0.015;
    particles.rotation.x = elapsed * 0.008;

    // Light orbit
    pointLight1.position.x = Math.sin(elapsed * 0.5) * 6;
    pointLight1.position.z = Math.cos(elapsed * 0.5) * 6;
    pointLight2.position.x = Math.cos(elapsed * 0.4) * 5;
    pointLight2.position.z = Math.sin(elapsed * 0.4) * 5;

    // Line subtle fade
    lineGroup.children.forEach((line, i) => {
      line.material.opacity = 0.06 + Math.abs(Math.sin(elapsed * 0.3 + i * 0.5)) * 0.1;
    });

    renderer.render(scene, camera);
  }

  // Start when page is loaded
  animate();

  // Cleanup on page visibility change to save resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(frameId);
    } else {
      clock.getDelta(); // flush stale delta
      animate();
    }
  });

})();
