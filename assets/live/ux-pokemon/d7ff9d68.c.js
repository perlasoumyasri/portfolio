/* global React */
// ─────────────────────────────────────────────────────────────────────────
//  UX Gym · "The designer you already are" — drill data + scoring
//  Five archetypes (Bauhaus collectibles). Question flow + weighted scoring,
//  ported faithfully from v1. This file owns the truth; UI files just render.
// ─────────────────────────────────────────────────────────────────────────

var TYPES = ['EYE', 'HEART', 'BRAIN', 'HAND', 'FACE'];

// Each archetype carries its own colour world for the collectible card.
var ARCH = {
  EYE: {
    key: 'EYE',
    word: 'The Eye',
    name: 'Visualon',
    pos: 0,
    color: '#2F7E72',
    deep: '#13433C',
    light: '#E4F0EC',
    glowRGB: '47,126,114',
    tag: 'NOTICER',
    blurb: 'You see what everyone else walks straight past.'
  },
  HEART: {
    key: 'HEART',
    word: 'The Heart',
    name: 'Empuff',
    pos: 1,
    color: '#D14B5B',
    deep: '#6E1F29',
    light: '#F8E7E9',
    glowRGB: '209,75,91',
    tag: 'FEELER',
    blurb: 'You feel the room before a word is said.'
  },
  BRAIN: {
    key: 'BRAIN',
    word: 'The Brain',
    name: 'Thinkachu',
    pos: 2,
    color: '#4B49A6',
    deep: '#23224F',
    light: '#E7E7F4',
    glowRGB: '75,73,166',
    tag: 'QUESTIONER',
    blurb: 'You cannot leave a "why" alone until it cracks.'
  },
  HAND: {
    key: 'HAND',
    word: 'The Hand',
    name: 'Fixitron',
    pos: 3,
    color: '#E0611D',
    deep: '#7C300A',
    light: '#FBE9DC',
    glowRGB: '224,97,29',
    tag: 'MAKER',
    blurb: 'You build the thing while others are still planning it.'
  },
  FACE: {
    key: 'FACE',
    word: 'The Face',
    name: 'Storizard',
    pos: 4,
    color: '#9A4DB8',
    deep: '#4C2363',
    light: '#F1E8F6',
    glowRGB: '154,77,184',
    tag: 'TELLER',
    blurb: 'You make people care about an idea, and remember it.'
  }
};
var LABELS = {
  EYE: 'Eye',
  HEART: 'Heart',
  BRAIN: 'Brain',
  HAND: 'Hand',
  FACE: 'Face'
};
var GIFT = {
  EYE: 'notice the small details that most people completely walk past',
  HEART: 'feel what another person is feeling, even before they say it',
  BRAIN: 'keep asking why until you completely understand something',
  HAND: 'turn your ideas into real things quickly, while others are still planning',
  FACE: 'make other people truly understand and care about your ideas'
};
var GROW = {
  EYE: 'slowing down to really notice the small details',
  HEART: 'understanding people a little more deeply',
  BRAIN: 'asking why first, so you understand the real problem before you act',
  HAND: 'actually building things, instead of only planning them',
  FACE: 'learning to clearly tell the story of the work you have done'
};
var TIE = {
  BRAIN: 0,
  HEART: 1,
  EYE: 2,
  HAND: 3,
  FACE: 4
};
var RADAR_ORDER = ['HEART', 'BRAIN', 'HAND', 'FACE', 'EYE'];

// One-line descriptors for each character — shown as the result subtitle.
var TAGLINE = {
  EYE: 'The quiet noticer who catches the details everyone else misses.',
  HEART: 'The empath who senses how a room feels before a word is said.',
  BRAIN: 'The restless mind that can’t settle until a why is cracked open.',
  HAND: 'The maker who has already built it while others are still planning.',
  FACE: 'The storyteller who makes people care, and makes them remember.'
};

// ── question constructors ──────────────────────────────────────────────
var mc = function mc(prompt, opts, weight) {
  return {
    kind: 'mc',
    weight: weight,
    prompt: prompt,
    options: opts.map(function (o) {
      return {
        t: o[0],
        text: o[1]
      };
    })
  };
};
var wyr = function wyr(prompt, opts) {
  return {
    kind: 'wyr',
    weight: 0.75,
    prompt: prompt,
    options: opts.map(function (o) {
      return {
        t: o[0],
        text: o[1]
      };
    })
  };
};
var sc = function sc(t, prompt, weight, reverse) {
  return {
    kind: 'scale',
    weight: weight,
    reverse: !!reverse,
    t: t,
    prompt: prompt
  };
};
var ch = function ch(prompt, opts) {
  return {
    kind: 'choose',
    weight: 0.5,
    prompt: prompt,
    options: opts.map(function (o) {
      return {
        t: o[0],
        text: o[1]
      };
    })
  };
};
var rf = function rf(prompt) {
  return {
    kind: 'reflection',
    prompt: prompt
  };
};
var FLOW = [mc('It is a free Sunday, and you have absolutely nothing that you must do. What is the thing you naturally end up doing?', [['HAND', 'You end up making something, or fixing something, or cooking something with your own hands.'], ['BRAIN', 'You end up getting lost in a book, or a video, or some topic which you have been wanting to understand for a while.'], ['HEART', 'You end up spending the whole day with the people who actually matter to you.'], ['EYE', 'You end up going somewhere new, and you just take everything in slowly.'], ['FACE', 'You end up catching up with people, and you share what is going on in your life.']], 0.5), mc('You meet someone new and interesting for the first time. What is the thing you become most curious about?', [['HEART', 'You become curious about what they are actually like as a person, underneath everything.'], ['BRAIN', 'You become curious about how their mind works, and what they really think about things.'], ['HAND', 'You become curious about the things they make, or build, or do.'], ['EYE', 'You become curious about the small details about them which other people would never notice.'], ['FACE', 'You become curious about their stories, and the way they tell them.']], 0.5), rf('I want you to start with something real about yourself. Think about the last time you got so completely lost in something that you forgot to eat, or you forgot how much time had passed. Tell me what you were doing, and tell me what it was that actually pulled you in so deeply. Write it out properly, exactly the way it really happened.'), wyr('You have one free hour, and you can do anything you want with it. Which one is actually more you?', [['BRAIN', 'You would rather take something apart and understand how it really works.'], ['HAND', 'You would rather make something completely new from scratch.']]), wyr('You walk into a gathering where you know almost no one. What are you actually more likely to do?', [['HEART', 'You are more likely to find one person and have a proper, real conversation with them.'], ['FACE', 'You are more likely to move around the room and meet as many people as you can.']]), wyr('You are walking through a place you have never been to before. What pulls your attention much more?', [['EYE', 'Your attention goes to how everything looks, and the way it has all been arranged.'], ['HEART', 'Your attention goes to the people, and the way they live their lives.']]), sc('EYE', 'I always notice the very small details which most people completely walk past.', 1.0, false), sc('HEART', 'I actually find it very difficult to understand what other people are feeling.', 1.0, true), sc('BRAIN', 'I find it very hard to leave a question alone until I completely understand the answer.', 1.5, false), sc('HAND', 'When I want to learn something new, I would much rather try it myself than read about it first.', 1.0, false), sc('FACE', 'I am completely comfortable speaking up in a group, even when my opinion is the only different one in the room.', 1.5, false), mc('You buy something which comes flat-packed in a box, and the instructions are barely any help at all. What actually happens when you sit down to build it?', [['HAND', 'You keep the instructions aside, and you work it out just by handling the pieces yourself.'], ['BRAIN', 'You first try to understand how the whole thing fits together, and only then you start.'], ['EYE', 'You immediately notice if even one part is scratched, or if something does not line up properly.'], ['HEART', 'You call someone to do it along with you, and the two of you talk it through together.'], ['FACE', 'You end up telling the whole funny story of it to someone afterwards.']], 1.0), mc('You are sitting in a coffee shop you have never been to before, and you are waiting for your order. In those few minutes, what are you mostly doing?', [['EYE', 'You are taking in the light, the colours, and the way the whole place has been put together.'], ['HEART', 'You are quietly watching the people around you, and getting a sense of them.'], ['BRAIN', 'You are wondering how the whole place runs, and why it is so busy or so empty.'], ['HAND', 'You are noticing all the things you would change about how it works.'], ['FACE', 'You are half ready to start a conversation with whoever you end up sitting beside.']], 1.0), rf('Think about a real time when everyone around you seemed to agree on something, but it just did not sit right with you. Tell me what you actually did about it. Write out the whole thing, exactly the way it happened.'), ch('Which of these are the things that people have actually said about you over the years?', [['EYE', 'People always say that you notice everything.'], ['HEART', 'People always say that you really listen to them.'], ['BRAIN', 'People always say that you ask a lot of questions.'], ['HAND', 'People always say that you cannot sit quietly without making something.'], ['FACE', 'People always say that you can talk to absolutely anyone.']]), ch('Think about the kind of child you were. Which of these were actually you?', [['EYE', 'You were the one who always spotted the tiny details that everyone else missed.'], ['HEART', 'You were the one who went and comforted a friend whenever they were sad.'], ['BRAIN', 'You were the one who kept asking why, again and again.'], ['HAND', 'You were the one who was always building forts, or models, or some contraption.'], ['FACE', 'You were the one who was always performing, joking, or telling stories.']]), sc('EYE', 'When I walk into a room, I very quickly spot what is out of place, or what could look better.', 1.5, false), sc('HEART', 'I can usually sense exactly how someone is feeling, even when they do not say a single word about it.', 1.5, false), sc('BRAIN', 'I am completely happy to use something every single day without ever wondering how it actually works.', 1.0, true), sc('HAND', 'I very often start making something, or doing something, before I have worked out the whole plan.', 1.5, false), sc('FACE', 'I would usually much rather stay in the background than be the person who is talking.', 1.0, true), mc('A group of your friends is planning a trip together, and the group chat is complete chaos. Without anyone deciding it, which role do you naturally slip into?', [['HAND', 'You become the one who actually starts booking things and gets it all moving.'], ['HEART', 'You become the one who makes sure everyone is happy and nobody is left out.'], ['BRAIN', 'You become the one who turns all that chaos into a clear plan.'], ['EYE', 'You become the one who finds the one place that everyone falls in love with.'], ['FACE', 'You become the one who keeps the energy up and keeps everyone excited.']], 1.0), mc('You are using a website to do something very simple, like paying a bill, and it keeps getting in your way. What is mostly going on inside your head?', [['BRAIN', 'You keep wondering why on earth they made it this confusing.'], ['HEART', 'You keep thinking about someone older, or less patient, trying to get through this same thing.'], ['EYE', 'You keep spotting every single specific thing that has been done badly.'], ['HAND', 'You are itching to rebuild the whole thing in your head so that it just works.'], ['FACE', 'You are already putting together the story you will tell someone about it later.']], 1.0), rf('Think about a real time when someone criticised something you had made, or something you had done, and you really cared about it. Tell me what you felt, and tell me what you actually did next. Write me the real story.'), wyr('Something has gone wrong, and you have to deal with it. What would you actually rather do first?', [['BRAIN', 'You would rather first understand exactly why it happened.'], ['HAND', 'You would rather get straight into fixing it.']]), wyr('There is something you really love and care about. What are you actually more likely to do with it?', [['EYE', 'You are more likely to quietly perfect every single detail of it.'], ['FACE', 'You are more likely to tell everyone about it.']]), sc('EYE', 'I quite often miss the little details which other people seem to catch very easily.', 1.0, true), sc('HEART', 'When a friend is going through something very hard, I feel it almost as if it were happening to me.', 1.0, false), sc('BRAIN', 'I very often ask myself why things are actually the way they are.', 1.0, false), sc('HAND', 'I would much rather plan everything out carefully before I begin anything.', 1.0, true), sc('FACE', 'I find it very easy to put my thoughts into words that other people clearly understand.', 1.0, false), ch('Which of these gives you the most satisfaction?', [['EYE', 'You feel the most satisfied when something you made looks exactly right.'], ['HEART', 'You feel the most satisfied when you have truly helped another person.'], ['BRAIN', 'You feel the most satisfied when you finally understand something difficult.'], ['HAND', 'You feel the most satisfied when you have built something that actually works.'], ['FACE', 'You feel the most satisfied when you explain something and people finally understand it.']])];
FLOW.forEach(function (it, i) {
  it.key = 'q' + i;
});

// ── scoring ─────────────────────────────────────────────────────────────
function computeResult(answers) {
  var acc = {},
    strong = {};
  TYPES.forEach(function (t) {
    acc[t] = {
      cw: 0,
      w: 0
    };
    strong[t] = {
      s: 0,
      n: 0
    };
  });
  var add = function add(t, c, w) {
    acc[t].cw += c * w;
    acc[t].w += w;
  };
  FLOW.forEach(function (it) {
    var v = answers[it.key];
    if (v == null) return;
    if (it.kind === 'scale') {
      var base = it.reverse ? 6 - v : v;
      add(it.t, base, it.weight);
      if (it.weight === 1.5) {
        strong[it.t].s += base;
        strong[it.t].n += 1;
      }
    } else if (it.kind === 'mc') {
      var o = it.options[v];
      if (o) add(o.t, 5, it.weight);
    } else if (it.kind === 'wyr') {
      var _o = it.options[v],
        other = it.options[1 - v];
      if (_o) add(_o.t, 5, it.weight);
      if (other) add(other.t, 2, it.weight);
    } else if (it.kind === 'choose') {
      (v || []).forEach(function (i) {
        var o = it.options[i];
        if (o) add(o.t, 5, 0.5);
      });
    }
  });
  var score = {},
    sAvg = {};
  TYPES.forEach(function (t) {
    score[t] = acc[t].w > 0 ? acc[t].cw / acc[t].w : 0;
    sAvg[t] = strong[t].n > 0 ? strong[t].s / strong[t].n : 0;
  });
  var ranked = TYPES.slice().sort(function (x, y) {
    if (score[y] !== score[x]) return score[y] - score[x];
    if (sAvg[y] !== sAvg[x]) return sAvg[y] - sAvg[x];
    return TIE[x] - TIE[y];
  });
  return {
    score: score,
    ranked: ranked,
    top: ranked[0],
    second: ranked[1],
    low: ranked[4],
    secondLow: ranked[3]
  };
}

// Radar geometry — pentagon, ordered RADAR_ORDER, value 1..5 → radius.
function buildRadar(score) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 320;
  var maxR = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 116;
  var c = size / 2;
  var axes = [],
    pts = [];
  RADAR_ORDER.forEach(function (t, i) {
    var ang = (-90 + i * 72) * Math.PI / 180;
    var v = Math.max(1, Math.min(5, score[t] || 1));
    var r = v / 5 * maxR;
    var dx = c + Math.cos(ang) * r,
      dy = c + Math.sin(ang) * r;
    var ox = c + Math.cos(ang) * maxR,
      oy = c + Math.sin(ang) * maxR;
    var lr = maxR + 24,
      lx = c + Math.cos(ang) * lr,
      ly = c + Math.sin(ang) * lr;
    var cos = Math.cos(ang);
    var anchor = Math.abs(cos) < 0.3 ? 'middle' : cos > 0 ? 'start' : 'end';
    pts.push(dx.toFixed(1) + ',' + dy.toFixed(1));
    axes.push({
      t: t,
      label: LABELS[t],
      color: ARCH[t].color,
      ox: ox.toFixed(1),
      oy: oy.toFixed(1),
      dx: dx.toFixed(1),
      dy: dy.toFixed(1),
      lx: lx.toFixed(1),
      ly: ly.toFixed(1),
      anchor: anchor,
      idx: i
    });
  });
  var rings = [0.25, 0.5, 0.75, 1].map(function (f) {
    return {
      pts: RADAR_ORDER.map(function (t, i) {
        var ang = (-90 + i * 72) * Math.PI / 180;
        return (c + Math.cos(ang) * maxR * f).toFixed(1) + ',' + (c + Math.sin(ang) * maxR * f).toFixed(1);
      }).join(' ')
    };
  });
  return {
    axes: axes,
    polyPoints: pts.join(' '),
    rings: rings,
    c: c,
    maxR: maxR
  };
}
function resultCopy(r) {
  return {
    gift: 'You naturally ' + GIFT[r.ranked[0]] + ', and you also ' + GIFT[r.ranked[1]] + '. That is your real gift as a designer.',
    growth: 'You will grow the most by ' + GROW[r.low] + ', and by ' + GROW[r.secondLow] + '.',
    blend: 'You lead with ' + LABELS[r.ranked[0]] + ', backed by strong ' + LABELS[r.ranked[1]] + ' and ' + LABELS[r.ranked[2]] + ', with a real touch of ' + LABELS[r.ranked[3]] + ' and ' + LABELS[r.ranked[4]] + '. Every designer carries all five. This is simply how yours come together.'
  };
}

// Demo answers (lean EYE) for jumping straight to a stage during design.
function sampleAnswers() {
  var a = {};
  FLOW.forEach(function (it) {
    if (it.kind === 'mc') {
      var i = it.options.findIndex(function (o) {
        return o.t === 'EYE';
      });
      a[it.key] = i < 0 ? 0 : i;
    } else if (it.kind === 'wyr') {
      var _i = it.options.findIndex(function (o) {
        return o.t === 'EYE' || o.t === 'HEART';
      });
      a[it.key] = _i < 0 ? 0 : _i;
    } else if (it.kind === 'scale') {
      a[it.key] = it.reverse ? 2 : it.t === 'EYE' || it.t === 'HEART' ? 5 : 4;
    } else if (it.kind === 'choose') {
      a[it.key] = [0, 1];
    }
  });
  return a;
}

// Answers biased toward a given archetype — used by the Tweaks character preview.
function sampleAnswersFor(type) {
  var a = {};
  FLOW.forEach(function (it) {
    if (it.kind === 'mc') {
      var i = it.options.findIndex(function (o) {
        return o.t === type;
      });
      a[it.key] = i < 0 ? 0 : i;
    } else if (it.kind === 'wyr') {
      var _i2 = it.options.findIndex(function (o) {
        return o.t === type;
      });
      a[it.key] = _i2 < 0 ? 0 : _i2;
    } else if (it.kind === 'scale') {
      a[it.key] = it.t === type ? it.reverse ? 1 : 5 : 3;
    } else if (it.kind === 'choose') {
      var idx = [];
      it.options.forEach(function (o, i) {
        if (o.t === type && idx.length < 3) idx.push(i);
      });
      a[it.key] = idx.length ? idx : [0];
    }
  });
  return a;
}
window.POKEMON = {
  TYPES: TYPES,
  ARCH: ARCH,
  LABELS: LABELS,
  GIFT: GIFT,
  GROW: GROW,
  TAGLINE: TAGLINE,
  RADAR_ORDER: RADAR_ORDER,
  FLOW: FLOW,
  computeResult: computeResult,
  buildRadar: buildRadar,
  resultCopy: resultCopy,
  sampleAnswers: sampleAnswers,
  sampleAnswersFor: sampleAnswersFor
};