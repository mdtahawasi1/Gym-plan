/* ============================================
   🏋️ EXERCISE ANIMATION ENGINE
   Draws animated stick figures showing exercise form
   Start → Movement → End → Repeat
   ============================================ */

// Exercise animation definitions — each has phases showing how to do the exercise
const EXERCISE_ANIMATIONS = {
  // === CHEST ===
  'bench-press': {
    label: 'Flat Bench Press', muscle: 'Chest', color: '#ff6b35',
    draw: (ctx, w, h, t) => drawPress(ctx, w, h, t, 0, '#ff6b35')
  },
  'incline-press': {
    label: 'Incline Press', muscle: 'Upper Chest', color: '#ff6b35',
    draw: (ctx, w, h, t) => drawPress(ctx, w, h, t, 30, '#ff6b35')
  },
  'decline-press': {
    label: 'Decline Press', muscle: 'Lower Chest', color: '#ff6b35',
    draw: (ctx, w, h, t) => drawPress(ctx, w, h, t, -20, '#ff6b35')
  },
  'fly': {
    label: 'Chest Fly', muscle: 'Inner Chest', color: '#ff6b35',
    draw: (ctx, w, h, t) => drawFly(ctx, w, h, t, '#ff6b35')
  },
  'cable-cross': {
    label: 'Cable Crossover', muscle: 'Chest', color: '#ff6b35',
    draw: (ctx, w, h, t) => drawCableCross(ctx, w, h, t, '#ff6b35')
  },
  'pushup': {
    label: 'Push-Up', muscle: 'Chest + Core', color: '#ff6b35',
    draw: (ctx, w, h, t) => drawPushup(ctx, w, h, t, '#ff6b35')
  },
  // === BACK ===
  'lat-pulldown': {
    label: 'Lat Pulldown', muscle: 'Lats (Width)', color: '#00d4ff',
    draw: (ctx, w, h, t) => drawPulldown(ctx, w, h, t, '#00d4ff')
  },
  'barbell-row': {
    label: 'Barbell Row', muscle: 'Mid Back', color: '#00d4ff',
    draw: (ctx, w, h, t) => drawRow(ctx, w, h, t, '#00d4ff')
  },
  'cable-row': {
    label: 'Cable Row', muscle: 'Mid Back', color: '#00d4ff',
    draw: (ctx, w, h, t) => drawCableRow(ctx, w, h, t, '#00d4ff')
  },
  'dumbbell-row': {
    label: 'Dumbbell Row', muscle: 'Lats', color: '#00d4ff',
    draw: (ctx, w, h, t) => drawDBRow(ctx, w, h, t, '#00d4ff')
  },
  'straight-arm-pull': {
    label: 'Straight Arm Pulldown', muscle: 'Lats', color: '#00d4ff',
    draw: (ctx, w, h, t) => drawStraightArmPull(ctx, w, h, t, '#00d4ff')
  },
  // === BICEPS ===
  'barbell-curl': {
    label: 'Barbell Curl', muscle: 'Biceps', color: '#f59e0b',
    draw: (ctx, w, h, t) => drawCurl(ctx, w, h, t, '#f59e0b', 'barbell')
  },
  'dumbbell-curl': {
    label: 'Dumbbell Curl', muscle: 'Biceps', color: '#f59e0b',
    draw: (ctx, w, h, t) => drawCurl(ctx, w, h, t, '#f59e0b', 'dumbbell')
  },
  'hammer-curl': {
    label: 'Hammer Curl', muscle: 'Brachialis', color: '#f59e0b',
    draw: (ctx, w, h, t) => drawCurl(ctx, w, h, t, '#f59e0b', 'hammer')
  },
  'preacher-curl': {
    label: 'Preacher Curl', muscle: 'Short Head', color: '#f59e0b',
    draw: (ctx, w, h, t) => drawPreacherCurl(ctx, w, h, t, '#f59e0b')
  },
  // === TRICEPS ===
  'rope-pushdown': {
    label: 'Rope Pushdown', muscle: 'Lateral Head', color: '#10b981',
    draw: (ctx, w, h, t) => drawPushdown(ctx, w, h, t, '#10b981')
  },
  'overhead-ext': {
    label: 'Overhead Extension', muscle: 'Long Head', color: '#10b981',
    draw: (ctx, w, h, t) => drawOverheadExt(ctx, w, h, t, '#10b981')
  },
  'skull-crusher': {
    label: 'Skull Crusher', muscle: 'All 3 Heads', color: '#10b981',
    draw: (ctx, w, h, t) => drawSkullCrusher(ctx, w, h, t, '#10b981')
  },
  'tricep-dip': {
    label: 'Tricep Dips', muscle: 'Triceps', color: '#10b981',
    draw: (ctx, w, h, t) => drawDip(ctx, w, h, t, '#10b981')
  },
  'tricep-kickback': {
    label: 'Kickback', muscle: 'Lateral Head', color: '#10b981',
    draw: (ctx, w, h, t) => drawKickback(ctx, w, h, t, '#10b981')
  },
  // === SHOULDERS ===
  'shoulder-press': {
    label: 'Shoulder Press', muscle: 'Front + Side Delts', color: '#7c3aed',
    draw: (ctx, w, h, t) => drawShoulderPress(ctx, w, h, t, '#7c3aed')
  },
  'lateral-raise': {
    label: 'Lateral Raise', muscle: 'Side Delts', color: '#7c3aed',
    draw: (ctx, w, h, t) => drawLateralRaise(ctx, w, h, t, '#7c3aed')
  },
  'face-pull': {
    label: 'Face Pull', muscle: 'Rear Delts', color: '#7c3aed',
    draw: (ctx, w, h, t) => drawFacePull(ctx, w, h, t, '#7c3aed')
  },
  'rear-delt-fly': {
    label: 'Rear Delt Fly', muscle: 'Rear Delts', color: '#7c3aed',
    draw: (ctx, w, h, t) => drawRearDeltFly(ctx, w, h, t, '#7c3aed')
  },
  'shrug': {
    label: 'Shrugs', muscle: 'Traps', color: '#7c3aed',
    draw: (ctx, w, h, t) => drawShrug(ctx, w, h, t, '#7c3aed')
  },
  'front-raise': {
    label: 'Front Raise', muscle: 'Front Delts', color: '#7c3aed',
    draw: (ctx, w, h, t) => drawFrontRaise(ctx, w, h, t, '#7c3aed')
  },
  // === LEGS ===
  'squat': {
    label: 'Barbell Squat', muscle: 'Quads + Glutes', color: '#ef4444',
    draw: (ctx, w, h, t) => drawSquat(ctx, w, h, t, '#ef4444')
  },
  'leg-press': {
    label: 'Leg Press', muscle: 'Quads', color: '#ef4444',
    draw: (ctx, w, h, t) => drawLegPress(ctx, w, h, t, '#ef4444')
  },
  'leg-extension': {
    label: 'Leg Extension', muscle: 'Quads', color: '#ef4444',
    draw: (ctx, w, h, t) => drawLegExtension(ctx, w, h, t, '#ef4444')
  },
  'leg-curl': {
    label: 'Leg Curl', muscle: 'Hamstrings', color: '#ef4444',
    draw: (ctx, w, h, t) => drawLegCurl(ctx, w, h, t, '#ef4444')
  },
  'rdl': {
    label: 'Romanian Deadlift', muscle: 'Hamstrings + Glutes', color: '#ef4444',
    draw: (ctx, w, h, t) => drawRDL(ctx, w, h, t, '#ef4444')
  },
  'calf-raise': {
    label: 'Calf Raise', muscle: 'Calves', color: '#ef4444',
    draw: (ctx, w, h, t) => drawCalfRaise(ctx, w, h, t, '#ef4444')
  },
  'lunge': {
    label: 'Lunge', muscle: 'Quads + Glutes', color: '#ef4444',
    draw: (ctx, w, h, t) => drawLunge(ctx, w, h, t, '#ef4444')
  },
  // === ABS ===
  'hanging-leg-raise': {
    label: 'Hanging Leg Raise', muscle: 'Lower Abs', color: '#06b6d4',
    draw: (ctx, w, h, t) => drawHangingLegRaise(ctx, w, h, t, '#06b6d4')
  },
  'cable-crunch': {
    label: 'Cable Crunch', muscle: 'Upper Abs', color: '#06b6d4',
    draw: (ctx, w, h, t) => drawCableCrunch(ctx, w, h, t, '#06b6d4')
  },
  'plank': {
    label: 'Plank Hold', muscle: 'Core', color: '#06b6d4',
    draw: (ctx, w, h, t) => drawPlank(ctx, w, h, t, '#06b6d4')
  },
};

// ============================================
// UTILITY DRAWING FUNCTIONS
// ============================================
function lerp(a, b, t) { return a + (b - a) * t; }
function easeInOut(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
function cycleT(time, speed=1) { return easeInOut((Math.sin(time * speed) + 1) / 2); }

function drawStickFigure(ctx, x, y, opts = {}) {
  const s = opts.scale || 1;
  const headR = 12 * s;
  const bodyLen = 40 * s;
  const armLen = 30 * s;
  const legLen = 35 * s;
  const color = opts.color || '#e0e0e0';
  const armAngle = opts.armAngle || 0;
  const legAngle = opts.legAngle || 0;
  const bodyAngle = opts.bodyAngle || 0;
  const forearmAngle = opts.forearmAngle || 0;
  const lowerLegAngle = opts.lowerLegAngle || 0;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(bodyAngle * Math.PI / 180);
  ctx.lineWidth = 3 * s;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  // Head
  ctx.beginPath();
  ctx.arc(0, -bodyLen - headR, headR, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.beginPath();
  ctx.moveTo(0, -bodyLen);
  ctx.lineTo(0, 0);
  ctx.stroke();

  // Arms
  const armRad = armAngle * Math.PI / 180;
  const forearmRad = forearmAngle * Math.PI / 180;
  [-1, 1].forEach(side => {
    const ax = side * Math.sin(armRad) * armLen;
    const ay = -bodyLen + Math.cos(armRad) * armLen;
    ctx.beginPath();
    ctx.moveTo(0, -bodyLen);
    ctx.lineTo(ax, ay);
    // Forearm
    const fx = ax + side * Math.sin(armRad + forearmRad) * (armLen * 0.8);
    const fy = ay + Math.cos(armRad + forearmRad) * (armLen * 0.8);
    ctx.lineTo(fx, fy);
    ctx.stroke();

    // Draw weight in hands if specified
    if (opts.weight === 'barbell' || opts.weight === 'dumbbell') {
      ctx.fillStyle = opts.weightColor || '#888';
      ctx.beginPath();
      ctx.arc(fx, fy, 4 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color;
    }
  });

  // Legs
  const legRad = legAngle * Math.PI / 180;
  const lowerRad = lowerLegAngle * Math.PI / 180;
  [-1, 1].forEach(side => {
    const lx = side * Math.sin(legRad) * legLen;
    const ly = Math.cos(legRad) * legLen;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(lx, ly);
    // Lower leg
    const llx = lx + side * Math.sin(legRad + lowerRad) * (legLen * 0.9);
    const lly = ly + Math.cos(legRad + lowerRad) * (legLen * 0.9);
    ctx.lineTo(llx, lly);
    ctx.stroke();
  });

  ctx.restore();
}

function drawBarbell(ctx, x, y, width, color = '#888') {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  // Bar
  ctx.beginPath();
  ctx.moveTo(x - width/2, y);
  ctx.lineTo(x + width/2, y);
  ctx.stroke();
  // Plates
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(x - width/2, y - 8);
  ctx.lineTo(x - width/2, y + 8);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + width/2, y - 8);
  ctx.lineTo(x + width/2, y + 8);
  ctx.stroke();
  ctx.restore();
}

function drawDumbbell(ctx, x, y, color = '#888') {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 8, y);
  ctx.lineTo(x + 8, y);
  ctx.stroke();
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(x - 8, y - 5); ctx.lineTo(x - 8, y + 5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + 8, y - 5); ctx.lineTo(x + 8, y + 5); ctx.stroke();
  ctx.restore();
}

function drawBench(ctx, x, y, w, h, angle = 0, color = '#444') {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle * Math.PI / 180);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(-w/2, -h/2, w, h, 4);
  ctx.fill();
  // Legs
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-w/2 + 5, h/2); ctx.lineTo(-w/2 + 5, h/2 + 20); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w/2 - 5, h/2); ctx.lineTo(w/2 - 5, h/2 + 20); ctx.stroke();
  ctx.restore();
}

function drawPhaseText(ctx, w, t, phases) {
  const idx = Math.floor(t * 2) % phases.length;
  const phase = phases[Math.min(idx, phases.length - 1)];
  ctx.save();
  ctx.fillStyle = 'rgba(255,107,53,0.9)';
  ctx.font = 'bold 11px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(phase, 12, 20);
  ctx.restore();
}

function drawMuscleGlow(ctx, x, y, r, color) {
  ctx.save();
  const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
  grad.addColorStop(0, color + '60');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawArrow(ctx, x1, y1, x2, y2, color = '#ff6b35') {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.setLineDash([]);
  // Arrowhead
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 8 * Math.cos(angle - 0.5), y2 - 8 * Math.sin(angle - 0.5));
  ctx.lineTo(x2 - 8 * Math.cos(angle + 0.5), y2 - 8 * Math.sin(angle + 0.5));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawLabel(ctx, x, y, text, color = '#999', size = 10) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `${size}px Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(text, x, y);
  ctx.restore();
}

// ============================================
// EXERCISE-SPECIFIC DRAW FUNCTIONS
// ============================================

function drawPress(ctx, w, h, time, benchAngle, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  // Bench
  drawBench(ctx, cx, cy + 30, 120, 14, benchAngle, '#3a3a4a');
  // Person lying on bench
  const armAngle = lerp(15, 75, t);
  const forearmAngle = lerp(-100, -20, t);
  drawMuscleGlow(ctx, cx, cy - 10, 30, color);
  drawStickFigure(ctx, cx, cy + 20, {
    bodyAngle: -90 + benchAngle,
    armAngle: armAngle,
    forearmAngle: forearmAngle,
    legAngle: 25,
    lowerLegAngle: 30,
    color: '#e0e0e0',
    scale: 0.9,
  });
  // Barbell
  const barY = cy - 10 - lerp(10, 55, t);
  drawBarbell(ctx, cx, barY, 100, '#aaa');
  // Phase labels
  drawPhaseText(ctx, w, t, ['⬇️ LOWER — Chest tak laao', '⬆️ PUSH — Upar press karo']);
  drawArrow(ctx, cx + 60, barY, cx + 60, barY + (t > 0.5 ? 20 : -20), color);
  drawLabel(ctx, cx, h - 10, benchAngle > 0 ? 'Bench 30-45° Incline' : benchAngle < 0 ? 'Bench 15-20° Decline' : 'Flat Bench', '#666');
}

function drawFly(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  drawBench(ctx, cx, cy + 30, 120, 14, 0, '#3a3a4a');
  const armAngle = lerp(80, 20, t);
  drawMuscleGlow(ctx, cx, cy - 5, 25, color);
  drawStickFigure(ctx, cx, cy + 20, {
    bodyAngle: -90,
    armAngle: armAngle,
    forearmAngle: -10,
    legAngle: 25,
    lowerLegAngle: 30,
    color: '#e0e0e0',
    scale: 0.9,
    weight: 'dumbbell',
  });
  drawPhaseText(ctx, w, t, ['⬅️➡️ OPEN — Arms bahar', '➡️⬅️ SQUEEZE — Andar laao']);
}

function drawCableCross(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  // Cable towers
  ctx.fillStyle = '#2a2a3a';
  ctx.fillRect(20, 20, 10, h - 40);
  ctx.fillRect(w - 30, 20, 10, h - 40);
  // Cables
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 1.5;
  const handX = lerp(45, cx - 5, t);
  const handX2 = lerp(w - 45, cx + 5, t);
  const handY = cy + lerp(-20, 20, t);
  ctx.beginPath(); ctx.moveTo(25, 30); ctx.lineTo(handX, handY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w - 25, 30); ctx.lineTo(handX2, handY); ctx.stroke();
  // Person
  drawMuscleGlow(ctx, cx, cy, 30, color);
  drawStickFigure(ctx, cx, cy + 30, {
    armAngle: lerp(60, 15, t),
    forearmAngle: lerp(-30, -5, t),
    color: '#e0e0e0',
    scale: 0.85,
  });
  drawPhaseText(ctx, w, t, ['⬅️➡️ START — Arms wide open', '🤝 SQUEEZE — Cross karo center pe']);
}

function drawPushup(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  // Ground
  ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(30, h - 30); ctx.lineTo(w - 30, h - 30); ctx.stroke();
  const dip = lerp(0, 25, t);
  drawMuscleGlow(ctx, cx - 10, cy + 10, 25, color);
  drawStickFigure(ctx, cx, cy + 10 + dip, {
    bodyAngle: -75,
    armAngle: lerp(15, 50, t),
    forearmAngle: lerp(-80, -30, t),
    legAngle: 5,
    color: '#e0e0e0',
    scale: 0.85,
  });
  drawPhaseText(ctx, w, t, ['⬇️ DOWN — Chest floor tak', '⬆️ UP — Push karo']);
}

function drawPulldown(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  // Machine
  ctx.fillStyle = '#2a2a3a';
  ctx.fillRect(cx - 5, 10, 10, 30);
  // Bar
  const barY = lerp(45, cy + 10, t);
  drawBarbell(ctx, cx, barY, 80, '#aaa');
  // Cables
  ctx.strokeStyle = '#555'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx, 40); ctx.lineTo(cx, barY); ctx.stroke();
  // Person seated
  drawMuscleGlow(ctx, cx, cy + 10, 30, color);
  drawStickFigure(ctx, cx, cy + 40, {
    armAngle: lerp(160, 70, t),
    forearmAngle: lerp(10, -90, t),
    legAngle: 25,
    lowerLegAngle: 60,
    color: '#e0e0e0',
    scale: 0.85,
  });
  drawPhaseText(ctx, w, t, ['⬆️ START — Arms upar stretched', '⬇️ PULL — Chest tak laao']);
  drawLabel(ctx, cx, h - 8, 'Wide Grip — Lats Target', '#666');
}

function drawRow(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  const barY = cy + 20 - lerp(0, 35, t);
  drawMuscleGlow(ctx, cx, cy - 10, 25, color);
  drawStickFigure(ctx, cx, cy + 15, {
    bodyAngle: -45,
    armAngle: lerp(0, 60, t),
    forearmAngle: lerp(-10, -80, t),
    legAngle: 15,
    lowerLegAngle: 10,
    color: '#e0e0e0',
    scale: 0.85,
    weight: 'barbell',
  });
  drawBarbell(ctx, cx, barY + 40, 70, '#aaa');
  drawPhaseText(ctx, w, t, ['⬇️ HANG — Bar neeche latkao', '⬆️ ROW — Belly tak pull karo']);
  drawLabel(ctx, cx, h - 8, 'Back Straight — 45° bend', '#666');
}

function drawCableRow(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  ctx.fillStyle = '#2a2a3a';
  ctx.fillRect(w - 20, cy - 30, 15, 60);
  ctx.strokeStyle = '#555'; ctx.lineWidth = 1.5;
  const handleX = lerp(w - 25, cx + 20, t);
  ctx.beginPath(); ctx.moveTo(w - 20, cy); ctx.lineTo(handleX, cy); ctx.stroke();
  drawMuscleGlow(ctx, cx - 10, cy, 25, color);
  drawStickFigure(ctx, cx - 20, cy + 35, {
    armAngle: lerp(10, 55, t),
    forearmAngle: lerp(-15, -70, t),
    legAngle: 25,
    lowerLegAngle: 50,
    color: '#e0e0e0',
    scale: 0.8,
  });
  drawPhaseText(ctx, w, t, ['➡️ STRETCH — Arms extend karo', '⬅️ PULL — Belly tak kheencho']);
}

function drawDBRow(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  drawBench(ctx, cx - 10, cy + 15, 90, 10, 0, '#3a3a4a');
  drawMuscleGlow(ctx, cx + 20, cy, 25, color);
  drawStickFigure(ctx, cx + 15, cy + 15, {
    bodyAngle: -60,
    armAngle: lerp(0, 70, t),
    forearmAngle: lerp(-5, -90, t),
    legAngle: 15,
    color: '#e0e0e0',
    scale: 0.8,
    weight: 'dumbbell',
  });
  drawPhaseText(ctx, w, t, ['⬇️ HANG — DB neeche', '⬆️ ROW — Hip tak pull karo']);
}

function drawStraightArmPull(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  ctx.fillStyle = '#2a2a3a';
  ctx.fillRect(cx - 5, 5, 10, 25);
  ctx.strokeStyle = '#555'; ctx.lineWidth = 1.5;
  const handleY = lerp(35, cy + 25, t);
  ctx.beginPath(); ctx.moveTo(cx, 30); ctx.lineTo(cx, handleY); ctx.stroke();
  drawMuscleGlow(ctx, cx, cy + 10, 25, color);
  drawStickFigure(ctx, cx, cy + 35, {
    armAngle: lerp(150, 20, t),
    forearmAngle: 0,
    color: '#e0e0e0',
    scale: 0.8,
  });
  drawPhaseText(ctx, w, t, ['⬆️ START — Arms upar', '⬇️ PULL — Thighs tak laao']);
}

function drawCurl(ctx, w, h, time, color, type) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  drawMuscleGlow(ctx, cx - 15, cy - 15, 20, color);
  drawMuscleGlow(ctx, cx + 15, cy - 15, 20, color);
  drawStickFigure(ctx, cx, cy + 30, {
    armAngle: 5,
    forearmAngle: lerp(-5, -140, t),
    legAngle: 5,
    color: '#e0e0e0',
    scale: 0.9,
    weight: type === 'barbell' ? 'barbell' : 'dumbbell',
    weightColor: color,
  });
  drawPhaseText(ctx, w, t, ['⬇️ DOWN — Arms straight', '⬆️ CURL — Squeeze bicep!']);
  drawLabel(ctx, cx, h - 8, type === 'hammer' ? 'Neutral Grip — Thumbs Up' : type === 'barbell' ? 'EZ Bar — Shoulder Width' : 'Supinated Grip — Palms Up', '#666');
}

function drawPreacherCurl(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  // Preacher pad
  ctx.fillStyle = '#3a3a4a';
  ctx.beginPath();
  ctx.moveTo(cx - 40, cy - 20);
  ctx.lineTo(cx + 10, cy + 10);
  ctx.lineTo(cx + 10, cy + 20);
  ctx.lineTo(cx - 40, cy - 10);
  ctx.closePath();
  ctx.fill();
  drawMuscleGlow(ctx, cx - 10, cy - 15, 20, color);
  drawStickFigure(ctx, cx - 20, cy + 30, {
    armAngle: 30,
    forearmAngle: lerp(-10, -130, t),
    legAngle: 20,
    color: '#e0e0e0',
    scale: 0.8,
    weight: 'dumbbell',
    weightColor: color,
  });
  drawPhaseText(ctx, w, t, ['⬇️ STRETCH — Full extension', '⬆️ CURL — Squeeze top pe']);
}

function drawPushdown(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  ctx.fillStyle = '#2a2a3a';
  ctx.fillRect(cx - 5, 5, 10, 25);
  ctx.strokeStyle = '#555'; ctx.lineWidth = 1.5;
  const ry = lerp(cy - 20, cy + 30, t);
  ctx.beginPath(); ctx.moveTo(cx, 30); ctx.lineTo(cx, ry); ctx.stroke();
  drawMuscleGlow(ctx, cx, cy + 5, 20, color);
  drawStickFigure(ctx, cx, cy + 35, {
    armAngle: 5,
    forearmAngle: lerp(-70, -5, t),
    color: '#e0e0e0',
    scale: 0.85,
  });
  drawPhaseText(ctx, w, t, ['⬆️ START — Elbows 90°', '⬇️ PUSH — Full extend + split rope']);
}

function drawOverheadExt(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  drawMuscleGlow(ctx, cx, cy - 25, 20, color);
  drawStickFigure(ctx, cx, cy + 30, {
    armAngle: 165,
    forearmAngle: lerp(130, 10, t),
    legAngle: 5,
    color: '#e0e0e0',
    scale: 0.85,
    weight: 'dumbbell',
    weightColor: color,
  });
  drawPhaseText(ctx, w, t, ['⬇️ LOWER — Sir ke peeche', '⬆️ EXTEND — Upar push karo']);
}

function drawSkullCrusher(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  drawBench(ctx, cx, cy + 25, 120, 12, 0, '#3a3a4a');
  drawMuscleGlow(ctx, cx + 20, cy - 10, 20, color);
  drawStickFigure(ctx, cx, cy + 18, {
    bodyAngle: -90,
    armAngle: lerp(80, 110, t),
    forearmAngle: lerp(-60, -140, t),
    legAngle: 25,
    lowerLegAngle: 30,
    color: '#e0e0e0',
    scale: 0.85,
    weight: 'barbell',
    weightColor: color,
  });
  drawPhaseText(ctx, w, t, ['⬇️ LOWER — Forehead tak', '⬆️ EXTEND — Lock out top pe']);
}

function drawDip(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  // Dip bars
  ctx.strokeStyle = '#444'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(cx - 35, cy - 15); ctx.lineTo(cx - 35, cy + 40); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx + 35, cy - 15); ctx.lineTo(cx + 35, cy + 40); ctx.stroke();
  const dip = lerp(0, 30, t);
  drawMuscleGlow(ctx, cx, cy - 10 + dip, 20, color);
  drawStickFigure(ctx, cx, cy - 15 + dip, {
    armAngle: lerp(25, 60, t),
    forearmAngle: lerp(-100, -50, t),
    legAngle: 10,
    lowerLegAngle: 20,
    color: '#e0e0e0',
    scale: 0.8,
  });
  drawPhaseText(ctx, w, t, ['⬆️ TOP — Arms locked', '⬇️ DIP — 90° elbows']);
}

function drawKickback(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  drawMuscleGlow(ctx, cx + 20, cy - 5, 18, color);
  drawStickFigure(ctx, cx, cy + 15, {
    bodyAngle: -45,
    armAngle: 5,
    forearmAngle: lerp(-80, 5, t),
    legAngle: 15,
    color: '#e0e0e0',
    scale: 0.85,
    weight: 'dumbbell',
    weightColor: color,
  });
  drawPhaseText(ctx, w, t, ['⬇️ START — Elbow 90°', '➡️ KICK — Full extend peeche']);
}

function drawShoulderPress(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  drawMuscleGlow(ctx, cx - 25, cy - 20, 18, color);
  drawMuscleGlow(ctx, cx + 25, cy - 20, 18, color);
  drawStickFigure(ctx, cx, cy + 35, {
    armAngle: lerp(80, 160, t),
    forearmAngle: lerp(-100, -10, t),
    legAngle: 20,
    lowerLegAngle: 40,
    color: '#e0e0e0',
    scale: 0.85,
    weight: 'dumbbell',
    weightColor: color,
  });
  drawPhaseText(ctx, w, t, ['⬇️ DOWN — Ear level', '⬆️ PRESS — Upar push karo']);
}

function drawLateralRaise(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  drawMuscleGlow(ctx, cx - 35, cy - 5, 15, color);
  drawMuscleGlow(ctx, cx + 35, cy - 5, 15, color);
  drawStickFigure(ctx, cx, cy + 30, {
    armAngle: lerp(5, 85, t),
    forearmAngle: -5,
    legAngle: 5,
    color: '#e0e0e0',
    scale: 0.9,
    weight: 'dumbbell',
    weightColor: color,
  });
  drawPhaseText(ctx, w, t, ['⬇️ DOWN — Arms sides pe', '⬆️ RAISE — Shoulder height tak']);
  drawLabel(ctx, cx, h - 8, 'Light weight — Pinky up', '#666');
}

function drawFrontRaise(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  drawMuscleGlow(ctx, cx, cy - 15, 18, color);
  // Single arm front raise
  drawStickFigure(ctx, cx, cy + 30, {
    armAngle: lerp(5, 90, t),
    forearmAngle: -3,
    legAngle: 5,
    color: '#e0e0e0',
    scale: 0.9,
    weight: 'dumbbell',
    weightColor: color,
  });
  drawPhaseText(ctx, w, t, ['⬇️ DOWN — Thighs pe', '⬆️ RAISE — Eye level tak']);
}

function drawFacePull(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  ctx.fillStyle = '#2a2a3a';
  ctx.fillRect(w - 20, cy - 40, 15, 80);
  ctx.strokeStyle = '#555'; ctx.lineWidth = 1.5;
  const px = lerp(w - 25, cx + 30, t);
  ctx.beginPath(); ctx.moveTo(w - 20, cy); ctx.lineTo(px, cy - 10); ctx.stroke();
  drawMuscleGlow(ctx, cx + 10, cy - 15, 18, color);
  drawStickFigure(ctx, cx - 10, cy + 30, {
    armAngle: lerp(30, 85, t),
    forearmAngle: lerp(-20, -110, t),
    legAngle: 8,
    color: '#e0e0e0',
    scale: 0.85,
  });
  drawPhaseText(ctx, w, t, ['➡️ START — Arms front', '⬅️ PULL — Face ke paas + external rotate']);
}

function drawRearDeltFly(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  drawMuscleGlow(ctx, cx - 30, cy, 15, color);
  drawMuscleGlow(ctx, cx + 30, cy, 15, color);
  drawStickFigure(ctx, cx, cy + 20, {
    bodyAngle: -45,
    armAngle: lerp(5, 80, t),
    forearmAngle: -5,
    legAngle: 10,
    color: '#e0e0e0',
    scale: 0.85,
    weight: 'dumbbell',
    weightColor: color,
  });
  drawPhaseText(ctx, w, t, ['⬇️ TOGETHER — Arms neeche', '⬆️ FLY — Wings spread karo']);
}

function drawShrug(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  const shrug = lerp(0, -15, t);
  drawMuscleGlow(ctx, cx - 15, cy - 25 + shrug, 15, color);
  drawMuscleGlow(ctx, cx + 15, cy - 25 + shrug, 15, color);
  drawStickFigure(ctx, cx, cy + 30 + shrug, {
    armAngle: 5,
    forearmAngle: -2,
    legAngle: 5,
    color: '#e0e0e0',
    scale: 0.9,
    weight: 'dumbbell',
    weightColor: '#888',
  });
  drawPhaseText(ctx, w, t, ['⬇️ RELAX — Shoulders neeche', '⬆️ SHRUG — Kaan tak squeeze']);
}

function drawSquat(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  // Rack
  ctx.strokeStyle = '#444'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(cx - 50, 20); ctx.lineTo(cx - 50, h - 20); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx + 50, 20); ctx.lineTo(cx + 50, h - 20); ctx.stroke();
  const squat = lerp(0, 30, t);
  drawMuscleGlow(ctx, cx - 15, cy + 20 + squat, 20, color);
  drawMuscleGlow(ctx, cx + 15, cy + 20 + squat, 20, color);
  drawStickFigure(ctx, cx, cy + 10 + squat, {
    armAngle: 80,
    forearmAngle: -60,
    legAngle: lerp(8, 40, t),
    lowerLegAngle: lerp(0, 35, t),
    color: '#e0e0e0',
    scale: 0.85,
  });
  drawBarbell(ctx, cx, cy - 30 + squat, 90, '#aaa');
  drawPhaseText(ctx, w, t, ['⬆️ STAND — Hips locked', '⬇️ SQUAT — Thighs parallel tak']);
  drawLabel(ctx, cx, h - 8, 'Feet shoulder width — Toes out 15-30°', '#666');
}

function drawLegPress(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  // Machine sled
  ctx.fillStyle = '#3a3a4a';
  const sledY = cy - 20 + lerp(30, 0, t);
  ctx.beginPath(); ctx.roundRect(cx - 30, sledY - 5, 60, 10, 3); ctx.fill();
  // Seat
  drawBench(ctx, cx - 40, cy + 30, 60, 10, -45, '#3a3a4a');
  drawMuscleGlow(ctx, cx, cy + 10, 20, color);
  drawStickFigure(ctx, cx - 30, cy + 20, {
    bodyAngle: -60,
    armAngle: 20,
    legAngle: lerp(50, 15, t),
    lowerLegAngle: lerp(40, 5, t),
    color: '#e0e0e0',
    scale: 0.75,
  });
  drawPhaseText(ctx, w, t, ['⬇️ LOWER — Knees 90°', '⬆️ PUSH — Legs extend (lock mat karo)']);
}

function drawLegExtension(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  // Seat
  ctx.fillStyle = '#3a3a4a';
  ctx.beginPath(); ctx.roundRect(cx - 40, cy, 80, 12, 4); ctx.fill();
  // Machine pivot
  ctx.strokeStyle = '#444'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(cx + 30, cy + 12); ctx.lineTo(cx + 30, cy + 50); ctx.stroke();
  // Pad position
  const padAngle = lerp(80, 10, t);
  const padX = cx + 30 + Math.sin(padAngle * Math.PI / 180) * 35;
  const padY = cy + 12 + Math.cos(padAngle * Math.PI / 180) * 35;
  ctx.strokeStyle = '#666'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(cx + 30, cy + 12); ctx.lineTo(padX, padY); ctx.stroke();
  drawMuscleGlow(ctx, cx + 15, cy - 5, 18, color);
  drawStickFigure(ctx, cx - 10, cy - 5, {
    armAngle: 20,
    forearmAngle: -25,
    legAngle: 20,
    lowerLegAngle: lerp(70, 5, t),
    color: '#e0e0e0',
    scale: 0.75,
  });
  drawPhaseText(ctx, w, t, ['⬇️ BENT — Knees 90°', '⬆️ EXTEND — Quads squeeze top pe']);
}

function drawLegCurl(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  // Bench
  ctx.fillStyle = '#3a3a4a';
  ctx.beginPath(); ctx.roundRect(cx - 50, cy + 5, 100, 12, 4); ctx.fill();
  drawMuscleGlow(ctx, cx + 30, cy - 5, 18, color);
  drawStickFigure(ctx, cx - 10, cy + 5, {
    bodyAngle: -85,
    armAngle: 20,
    legAngle: 5,
    lowerLegAngle: lerp(5, 80, t),
    color: '#e0e0e0',
    scale: 0.8,
  });
  drawPhaseText(ctx, w, t, ['⬇️ STRAIGHT — Legs extended', '⬆️ CURL — Heels glutes tak']);
}

function drawRDL(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  const hinge = lerp(0, 50, t);
  drawMuscleGlow(ctx, cx, cy + 10, 22, color);
  drawStickFigure(ctx, cx, cy + 20, {
    bodyAngle: lerp(-90, -40, t),
    armAngle: 5,
    forearmAngle: -3,
    legAngle: 8,
    lowerLegAngle: 3,
    color: '#e0e0e0',
    scale: 0.85,
    weight: 'barbell',
    weightColor: '#888',
  });
  drawPhaseText(ctx, w, t, ['⬆️ STAND — Hips locked, chest up', '⬇️ HINGE — Hips peeche push, back straight']);
  drawLabel(ctx, cx, h - 8, 'Hip Hinge — Knees soft, bar close to body', '#666');
}

function drawCalfRaise(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  // Step
  ctx.fillStyle = '#3a3a4a';
  ctx.beginPath(); ctx.roundRect(cx - 25, cy + 50, 50, 10, 2); ctx.fill();
  const rise = lerp(0, -20, t);
  drawMuscleGlow(ctx, cx - 10, cy + 35 + rise, 12, color);
  drawMuscleGlow(ctx, cx + 10, cy + 35 + rise, 12, color);
  drawStickFigure(ctx, cx, cy + 15 + rise, {
    armAngle: 5,
    legAngle: 5,
    color: '#e0e0e0',
    scale: 0.85,
  });
  drawPhaseText(ctx, w, t, ['⬇️ STRETCH — Heels neeche drop', '⬆️ RAISE — Tippy toes pe squeeze']);
}

function drawLunge(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  const dip = lerp(0, 25, t);
  drawMuscleGlow(ctx, cx - 10, cy + 10 + dip, 18, color);
  drawStickFigure(ctx, cx, cy + 5 + dip, {
    armAngle: 5,
    legAngle: lerp(10, 35, t),
    lowerLegAngle: lerp(5, 30, t),
    color: '#e0e0e0',
    scale: 0.85,
    weight: 'dumbbell',
    weightColor: '#888',
  });
  drawPhaseText(ctx, w, t, ['⬆️ STAND — Upright position', '⬇️ LUNGE — Step forward, knee 90°']);
}

function drawHangingLegRaise(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  // Bar
  ctx.strokeStyle = '#555'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(cx - 40, 20); ctx.lineTo(cx + 40, 20); ctx.stroke();
  drawMuscleGlow(ctx, cx, cy + 15, 20, color);
  drawStickFigure(ctx, cx, cy - 15, {
    armAngle: 170,
    forearmAngle: 5,
    legAngle: lerp(5, 85, t),
    lowerLegAngle: lerp(0, 10, t),
    color: '#e0e0e0',
    scale: 0.8,
  });
  drawPhaseText(ctx, w, t, ['⬇️ HANG — Legs straight neeche', '⬆️ RAISE — Legs upar — core squeeze']);
}

function drawCableCrunch(ctx, w, h, time, color) {
  const t = cycleT(time);
  const cx = w/2, cy = h/2;
  ctx.fillStyle = '#2a2a3a';
  ctx.fillRect(cx - 5, 5, 10, 20);
  ctx.strokeStyle = '#555'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx, 25); ctx.lineTo(cx, cy - 20); ctx.stroke();
  drawMuscleGlow(ctx, cx, cy + 10, 18, color);
  const crunch = lerp(0, 35, t);
  drawStickFigure(ctx, cx, cy + 20, {
    bodyAngle: lerp(-80, -40, t),
    armAngle: 150,
    forearmAngle: -10,
    legAngle: 35,
    lowerLegAngle: 50,
    color: '#e0e0e0',
    scale: 0.8,
  });
  drawPhaseText(ctx, w, t, ['⬆️ START — Upright knees pe', '⬇️ CRUNCH — Curl down, abs squeeze']);
}

function drawPlank(ctx, w, h, time, color) {
  const cx = w/2, cy = h/2;
  // Ground
  ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(30, h - 25); ctx.lineTo(w - 30, h - 25); ctx.stroke();
  // Subtle breathing motion
  const breathe = Math.sin(time * 2) * 2;
  drawMuscleGlow(ctx, cx, cy + 15 + breathe, 25, color);
  drawStickFigure(ctx, cx, cy + 15 + breathe, {
    bodyAngle: -80,
    armAngle: 5,
    forearmAngle: -85,
    legAngle: 5,
    color: '#e0e0e0',
    scale: 0.85,
  });
  drawLabel(ctx, cx, 20, '⏱️ HOLD — Core tight, body straight', '#ff6b35', 11);
  drawLabel(ctx, cx, h - 8, 'Hips na upar na neeche — straight line', '#666');
}


// ============================================
// ANIMATION ENGINE
// ============================================
const activeAnimations = new Map();

function initExerciseAnimations() {
  document.querySelectorAll('.exercise-anim-container').forEach(container => {
    const canvas = container.querySelector('canvas');
    if (!canvas) return;
    const animType = container.dataset.anim;
    const animDef = EXERCISE_ANIMATIONS[animType];
    if (!animDef) return;

    const ctx = canvas.getContext('2d');
    let startTime = performance.now();
    let running = true;

    function resize() {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();

    function animate(timestamp) {
      if (!running) return;
      const elapsed = (timestamp - startTime) / 1000;
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animDef.draw(ctx, w, h, elapsed);

      requestAnimationFrame(animate);
    }

    // Use IntersectionObserver to only animate visible cards
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          running = true;
          startTime = performance.now();
          resize();
          requestAnimationFrame(animate);
        } else {
          running = false;
        }
      });
    }, { threshold: 0.1 });

    observer.observe(container);
    activeAnimations.set(container, { running, observer });
  });
}

// ============================================
// AUTO-ASSIGN ANIMATIONS TO EXERCISE CARDS
// ============================================
const EXERCISE_NAME_TO_ANIM = {
  'Flat Barbell Bench Press': 'bench-press',
  'Barbell Bench Press': 'bench-press',
  'Incline Dumbbell Press': 'incline-press',
  'Pec Deck': 'fly',
  'Machine Flyes': 'fly',
  'Cable Crossover': 'cable-cross',
  'Dumbbell Flyes': 'fly',
  'Dumbbell Bench Press': 'bench-press',
  'Decline Bench Press': 'decline-press',
  'Incline Cable Flyes': 'fly',
  'Push-Ups': 'pushup',
  'Wide Grip Lat Pulldown': 'lat-pulldown',
  'Close Grip Lat Pulldown': 'lat-pulldown',
  'Barbell Bent-Over Row': 'barbell-row',
  'Seated Cable Row': 'cable-row',
  'Wide Grip Seated Cable Row': 'cable-row',
  'Single Arm Dumbbell Row': 'dumbbell-row',
  'Straight Arm Lat Pulldown': 'straight-arm-pull',
  'T-Bar Row': 'barbell-row',
  'Chest Supported Row': 'barbell-row',
  'Hyperextensions': 'rdl',
  'Standing Barbell Curl': 'barbell-curl',
  'EZ Bar Curl': 'barbell-curl',
  'Incline Dumbbell Curl': 'dumbbell-curl',
  'Concentration Curl': 'preacher-curl',
  'Hammer Curl': 'hammer-curl',
  'Cross-Body Hammer Curl': 'hammer-curl',
  'Preacher Curl': 'preacher-curl',
  'Cable Curl': 'barbell-curl',
  'Reverse Curl': 'barbell-curl',
  'Cable Rope Pushdown': 'rope-pushdown',
  'Overhead Dumbbell Extension': 'overhead-ext',
  'Cable Overhead Extension': 'overhead-ext',
  'Overhead Cable Extension': 'overhead-ext',
  'Skull Crushers': 'skull-crusher',
  'Tricep Dips': 'tricep-dip',
  'Close Grip Bench Press': 'bench-press',
  'Tricep Kickbacks': 'tricep-kickback',
  'Cable Kickbacks': 'tricep-kickback',
  'Seated Dumbbell Shoulder Press': 'shoulder-press',
  'Arnold Press': 'shoulder-press',
  'Machine Shoulder Press': 'shoulder-press',
  'Dumbbell Lateral Raises': 'lateral-raise',
  'Cable Lateral Raise': 'lateral-raise',
  'Face Pulls': 'face-pull',
  'Rear Delt Flyes': 'rear-delt-fly',
  'Dumbbell Shrugs': 'shrug',
  'Barbell Upright Row': 'shoulder-press',
  'Front Dumbbell Raise': 'front-raise',
  'Dumbbell Front Raises': 'front-raise',
  'Barbell Back Squat': 'squat',
  'Hack Squat': 'squat',
  'Bulgarian Split Squat': 'lunge',
  'Leg Press': 'leg-press',
  'Leg Extension': 'leg-extension',
  'Lying Leg Curl': 'leg-curl',
  'Seated Leg Curl': 'leg-curl',
  'Romanian Deadlift': 'rdl',
  'Standing Calf Raises': 'calf-raise',
  'Seated Calf Raise': 'calf-raise',
  'Walking Lunges': 'lunge',
  'Hanging Leg Raises': 'hanging-leg-raise',
  'Cable Crunches': 'cable-crunch',
  'Russian Twists': 'cable-crunch',
  'Bicycle Crunches': 'cable-crunch',
  'Plank': 'plank',
};

function autoAssignAnimations() {
  document.querySelectorAll('.exercise-card').forEach(card => {
    // Skip if already has animation
    if (card.querySelector('.exercise-anim-container')) return;

    const nameEl = card.querySelector('.exercise-name');
    if (!nameEl) return;
    const name = nameEl.textContent.trim();

    // Find matching animation
    let animType = null;
    for (const [key, val] of Object.entries(EXERCISE_NAME_TO_ANIM)) {
      if (name.includes(key)) {
        animType = val;
        break;
      }
    }

    if (!animType) return;

    // Create animation container and insert it
    const animContainer = document.createElement('div');
    animContainer.className = 'exercise-anim-container';
    animContainer.dataset.anim = animType;

    const canvas = document.createElement('canvas');
    animContainer.appendChild(canvas);

    const animDef = EXERCISE_ANIMATIONS[animType];
    if (animDef) {
      const badge = document.createElement('div');
      badge.className = 'anim-badge';
      badge.textContent = '🎬 3D Form Guide';
      animContainer.appendChild(badge);

      const label = document.createElement('div');
      label.className = 'anim-label';
      label.textContent = `🎯 ${animDef.muscle}`;
      animContainer.appendChild(label);
    }

    // Insert before the visual or header
    const visual = card.querySelector('.exercise-card-visual') || card.querySelector('.exercise-card-image');
    if (visual) {
      card.insertBefore(animContainer, visual);
    } else {
      const header = card.querySelector('.exercise-card-header');
      if (header) card.insertBefore(animContainer, header);
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    autoAssignAnimations();
    initExerciseAnimations();
  });
} else {
  autoAssignAnimations();
  initExerciseAnimations();
}
