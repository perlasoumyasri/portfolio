/* global React, window */
// ─────────────────────────────────────────────────────────────────────────
//  UX Pokémon · v2 — THE READ (content).
//  Everything below the card: the fixed, UX-Anudeep-voice reading, selected by
//  the person's result. Two parts are assembled live (the thread of their own
//  answers, and their gift/growth shape); the rest is fixed prose per type.
//  This file owns the words only. pk2-read.jsx renders them.
// ─────────────────────────────────────────────────────────────────────────

// ── per-answer "thread" lines — their own answers, handed back ───────────────
// Keyed by FLOW item key (q0…q31), then by the option's identity. Scales carry a
// single line under their own type, shown only when the answer points to the trait.
var PK2_THREAD = {
  q0: {
    HAND: 'When you imagined a completely free Sunday, you wanted to make something, or fix something, with your own hands.',
    BRAIN: 'When you imagined a completely free Sunday, you wanted to get lost in understanding something.',
    HEART: 'When you imagined a completely free Sunday, you wanted to spend it with the people who matter to you.',
    EYE: 'When you imagined a completely free Sunday, you wanted to go somewhere and simply take it all in.',
    FACE: 'When you imagined a completely free Sunday, you wanted to be around people and share what is going on in your life.'
  },
  q1: {
    HEART: 'When you met someone new, what pulled you in was who they really are as a person.',
    BRAIN: 'When you met someone new, what pulled you in was how their mind works and what they think.',
    HAND: 'When you met someone new, what pulled you in was the things they make and do.',
    EYE: 'When you met someone new, what pulled you in was the small details about them that others would miss.',
    FACE: 'When you met someone new, what pulled you in was their stories, and the way they tell them.'
  },
  q3: {
    BRAIN: 'Given a free hour, you would rather take something apart and understand how it really works.',
    HAND: 'Given a free hour, you would rather make something completely new from scratch.'
  },
  q4: {
    HEART: 'At a gathering full of strangers, you would rather find one person and have a real conversation.',
    FACE: 'At a gathering full of strangers, you would rather move around and meet as many people as you can.'
  },
  q5: {
    EYE: 'Walking through a new place, your attention went to how everything looked and was arranged.',
    HEART: 'Walking through a new place, your attention went to the people, and the way they live.'
  },
  q6: {
    EYE: 'You were clear that you notice the very small details that most people completely walk past.'
  },
  q7: {
    HEART: 'You made it clear that understanding what other people are feeling comes easily to you.'
  },
  q8: {
    BRAIN: 'You agreed that you cannot leave a question alone until you completely understand the answer.'
  },
  q9: {
    HAND: 'You agreed that you would much rather try something yourself than read about it first.'
  },
  q10: {
    FACE: 'You agreed that you are completely comfortable speaking up, even when your view is the only one in the room.'
  },
  q11: {
    HAND: 'When the flat-pack instructions were useless, you set them aside and worked it out with your hands.',
    BRAIN: 'When the flat-pack instructions were useless, you first worked out how the whole thing fits together.',
    EYE: 'When the flat-pack instructions were useless, you noticed at once the part that was scratched or did not line up.',
    HEART: 'When the flat-pack instructions were useless, you brought someone in to do it together.',
    FACE: 'When the flat-pack instructions were useless, you ended up telling the whole funny story of it afterwards.'
  },
  q12: {
    EYE: 'Waiting in a new coffee shop, you were taking in the light, the colours, and how the place was put together.',
    HEART: 'Waiting in a new coffee shop, you were quietly watching the people and getting a sense of them.',
    BRAIN: 'Waiting in a new coffee shop, you were wondering how the whole place runs, and why it was busy or empty.',
    HAND: 'Waiting in a new coffee shop, you were noticing all the things you would change about how it works.',
    FACE: 'Waiting in a new coffee shop, you were half ready to talk to whoever you ended up beside.'
  },
  q14: {
    EYE: 'You picked out that people always say you notice everything.',
    HEART: 'You picked out that people always say you really listen.',
    BRAIN: 'You picked out that people always say you ask a lot of questions.',
    HAND: 'You picked out that people always say you cannot sit quietly without making something.',
    FACE: 'You picked out that people always say you can talk to absolutely anyone.'
  },
  q15: {
    EYE: 'You remembered being the child who spotted the tiny details everyone else missed.',
    HEART: 'You remembered being the child who comforted a friend whenever they were sad.',
    BRAIN: 'You remembered being the child who kept asking why, again and again.',
    HAND: 'You remembered being the child who was always building forts, models, or contraptions.',
    FACE: 'You remembered being the child who was always performing, joking, or telling stories.'
  },
  q16: {
    EYE: 'You agreed that when you walk into a room, you very quickly spot what is out of place.'
  },
  q17: {
    HEART: 'You agreed that you can usually sense exactly how someone is feeling, even when they say nothing.'
  },
  q18: {
    BRAIN: 'You made it clear that you cannot use something every day without wondering how it actually works.'
  },
  q19: {
    HAND: 'You agreed that you very often start making something before you have worked out the whole plan.'
  },
  q20: {
    FACE: 'You made it clear that you are happy to be the one talking, rather than staying in the background.'
  },
  q21: {
    HAND: 'When the group trip was chaos, you became the one who actually started booking things and got it moving.',
    HEART: 'When the group trip was chaos, you became the one who made sure nobody was left out.',
    BRAIN: 'When the group trip was chaos, you became the one who turned all the chaos into a clear plan.',
    EYE: 'When the group trip was chaos, you became the one who found the place everyone fell in love with.',
    FACE: 'When the group trip was chaos, you became the one who kept the energy up and everyone excited.'
  },
  q22: {
    BRAIN: 'When the website kept getting in your way, you kept wondering why on earth they made it this confusing.',
    HEART: 'When the website kept getting in your way, you kept thinking of someone less patient struggling through it.',
    EYE: 'When the website kept getting in your way, you kept spotting every single thing that was done badly.',
    HAND: 'When the website kept getting in your way, you were itching to rebuild the whole thing so it just works.',
    FACE: 'When the website kept getting in your way, you were already putting together the story you would tell about it.'
  },
  q24: {
    BRAIN: 'When something went wrong, you would rather first understand exactly why it happened.',
    HAND: 'When something went wrong, you would rather get straight into fixing it.'
  },
  q25: {
    EYE: 'After a really good holiday, you kept picturing how beautiful all the places looked.',
    FACE: 'After a really good holiday, you could not wait to tell everyone the stories from it.'
  },
  q26: {
    EYE: 'You made it clear that the little details others catch are exactly the ones you catch too.'
  },
  q27: {
    HEART: 'You agreed that when a friend is going through something hard, you feel it almost as your own.'
  },
  q28: {
    BRAIN: 'You agreed that you very often ask yourself why things are actually the way they are.'
  },
  q29: {
    HAND: 'You made it clear that you would rather start doing than plan everything out first.'
  },
  q30: {
    FACE: 'You agreed that you find it very easy to put your thoughts into words others clearly understand.'
  },
  q31: {
    EYE: 'You chose that you feel most satisfied when something you made looks exactly right.',
    HEART: 'You chose that you feel most satisfied when you have truly helped another person.',
    BRAIN: 'You chose that you feel most satisfied when you finally understand something difficult.',
    HAND: 'You chose that you feel most satisfied when you have built something that actually works.',
    FACE: 'You chose that you feel most satisfied when you explain something and people finally understand.'
  }
};

// gather the person's own chosen lines that match a given identity
function gatherThread(answers, ident) {
  var FLOW = window.POKEMON.FLOW;
  var out = [];
  FLOW.forEach(function (it) {
    var v = answers[it.key];
    if (v == null) return;
    var map = PK2_THREAD[it.key];
    if (!map) return;
    if (it.kind === 'mc' || it.kind === 'wyr') {
      var opt = it.options[v];
      if (opt && opt.t === ident && map[ident]) out.push({
        fmt: 'concrete',
        line: map[ident]
      });
    } else if (it.kind === 'choose') {
      (Array.isArray(v) ? v : []).forEach(function (i) {
        var opt = it.options[i];
        if (opt && opt.t === ident && map[ident]) out.push({
          fmt: 'concrete',
          line: map[ident]
        });
      });
    } else if (it.kind === 'scale') {
      var points = it.reverse ? v <= 2 : v >= 4;
      if (points && it.t === ident && map[ident]) out.push({
        fmt: 'soft',
        line: map[ident]
      });
    }
  });
  return out;
}

// 3–4 lines, concrete formats first, topped up from the second type if needed
function buildThread(answers, result) {
  var lead = gatherThread(answers, result.top);
  var ordered = lead.filter(function (l) {
    return l.fmt === 'concrete';
  }).concat(lead.filter(function (l) {
    return l.fmt === 'soft';
  }));
  if (ordered.length < 3) {
    var more = gatherThread(answers, result.second).filter(function (e) {
      return !ordered.find(function (o) {
        return o.line === e.line;
      });
    });
    ordered = ordered.concat(more.filter(function (l) {
      return l.fmt === 'concrete';
    }), more.filter(function (l) {
      return l.fmt === 'soft';
    }));
  }
  var seen = {},
    uniq = [];
  ordered.forEach(function (l) {
    if (!seen[l.line]) {
      seen[l.line] = 1;
      uniq.push(l.line);
    }
  });
  return uniq.slice(0, 4);
}

// ── shared prose ─────────────────────────────────────────────────────────────
var PK2_SHARED = {
  threadLeadIn: 'A few things ran right through the way you answered.',
  fiveParts: ['Long before you ever learn a single design tool, you already carry a designer inside you, and that designer is built from five parts. There is the way you see things. There is the way you feel things. There is the way you think about things. There is the way you build things. And there is the way you tell other people about them. At UX Gym we call these the Eye, the Heart, the Brain, the Hand and the Face of a designer, and your whole training here is built on them.', 'Every single person leans on some of these five more than the others, and the one you lean on the most quietly becomes the heart of who you are as a designer. Your answers have shown the one you lead with. That is your strength, and that is your Pokémon.'],
  shapeIntro: 'Your Pokémon is your strongest part, but it is not your only one. When you answered, a fuller shape came through, and that shape is what makes you you, and not just any other person who shares your Pokémon.',
  shapeClose: 'This is only your starting shape. It is not fixed, and it is not a verdict. It is simply where you begin, and every part of you has room to grow from here.',
  shareInvite: 'This is your first drill at UX Gym, and it is the first thing you get to show the world. Share your card, and let people see the designer you already are. You might be surprised how many people around you have been wondering about the very same thing.'
};

// ── the five reads ───────────────────────────────────────────────────────────
var PK2_READ = {
  EYE: {
    revealBody: 'You have just answered very honestly about yourself, and a clear picture has come through. Out of all the different ways a person can be wired, the way you see the world is your strongest one. This is your Eye, and it is a very real and very powerful thing. What follows is the truth about how you are built, and why it matters so much more for design than most people ever realise.',
    move: ['You notice things. You always have. While other people walk straight past a room, you have already taken in the light, the colours, the spacing, and the one thing that is slightly out of place. The world comes to you in detail, and you cannot really switch it off, because this is not something you do, it is something you are.', 'When something looks wrong, you feel it before you can even explain it. A poster with the wrong spacing, a sign that is slightly crooked, an app where nothing quite lines up, all of these bother you in a way they simply do not bother most people. And when something is made beautifully, you feel that very deeply too.', 'For you, the small details have never actually been small. They are the whole thing. Somewhere deep down, you understand that the difference between something ordinary and something beautiful is almost always hiding in the details that everyone else ignored.'],
    superpower: ['This is the part that should genuinely excite you. At UX Gym, the very first thing we build in a designer is what we call the third eye. Most people go through life seeing products only as users, asking how do I use this. A designer learns to see the same product a second way at the same time, asking how was this designed for me to use it. You already do this naturally. Your third eye is, in a way, already open.', 'This is the single most important shift a designer ever makes, and most people have to be trained for years to make it. There is a hard truth in our field, which is that if you cannot see the world as a designer, the world will never see you as a designer. You came in already seeing it. That is a very real head start, and it is completely yours.', "There is a thing we teach called the UX behind the UI. Behind every screen you have ever used, there are layers, the thing you see, the thing you do, and the reason a designer made it that way. Every small element on a screen was placed there on purpose, and a person with your Eye can learn to read all of it. As a designer, this is what will make your work feel finished when other people\u2019s work still feels rough. It is the quiet quality that separates work that is fine from work that is genuinely good."],
    otherSide: ['Every strength has another side, and yours is no exception. The same eye that notices everything can also become very hard to satisfy. You can get so completely lost in making something look exactly right that you forget to ask whether it actually works for the person using it. You can polish one small detail for an hour while the bigger problem sits there untouched.', 'There will be moments when good enough is genuinely the right answer, and your Eye will fight you on it. There will be times when you need to pull back from the details and look at the whole, and that will not come to you as naturally.', 'None of this is a flaw. It is simply the cost that comes attached to your gift, and the best designers with your wiring are the ones who learn to manage it. Knowing this about yourself is already half of the work.'],
    pokedex: {
      title: 'Visualon, the Noticing Pokémon. Eye type.',
      body: "Visualon\u2019s eyes never fully close, even when it sleeps, because it is always quietly scanning for the one thing that is out of place. It is said that a Visualon can sense a crooked frame from across a room and will not rest until it is straightened. It is calm in beautiful spaces and restless in messy ones. A Visualon grows stronger every time it stops to truly look at something well made, and it evolves when it learns to see not only what is wrong, but why it is wrong and what could be built instead. It works beautifully alongside Fixitron, who builds the things that Visualon sees."
    },
    whereYouGo: ['So what do you actually do with all of this. You lean into your Eye, hard, because it is your edge and you should never once apologise for it. At UX Gym, your training will sharpen it even further, until you can look at any screen and explain it through real design principles, and until people trust your work without even knowing why.', 'At the same time, you will slowly build the parts of you that are quieter right now. You will learn to build with your hands, so that the beautiful things you see can actually become real. You will learn to tell the story of your work, so that other people understand the quality you have put into it. This is exactly what your training here is built to do, and you are starting it from a real and rare strength.'],
    anudeep: 'I want you to remember one thing as you begin. The designer you are going to become is already inside you, and it started long before today, in the way you have always seen the world. You are not starting from nothing. You are starting from a real strength, and that is a very good place to begin. The strongest designers are not the ones who arrive already complete. They are the ones who know exactly what they lead with, sharpen it completely, and then patiently build everything around it. You now know what you lead with. So let us build the rest of it together.'
  },
  HEART: {
    revealBody: 'You have just answered very honestly about yourself, and a clear picture has come through. Out of all the different ways a person can be wired, the way you feel things, and the way you feel for other people, is your strongest one. This is your Heart, and in design it is worth far more than most people realise. What follows is the truth about how you are built, and why it matters so much.',
    move: ["You feel people. You always have. You can walk into a room and sense the mood in it before anyone has said a word. When a friend is quietly upset, you notice it while everyone else carries on, and you go and check on them. Other people\u2019s feelings are real to you, almost as real as your own.", 'You care, honestly and naturally, about whether the people around you are okay. You listen properly, not while waiting for your turn to speak, but to actually understand. And you carry other people with you in your decisions, because the idea of leaving someone out, or making something harder for them, genuinely bothers you.', 'This care is not a soft skill that sits on the side. For you it is the centre of everything, and it is the exact place where great design begins.'],
    superpower: ['This is the part that should genuinely excite you. At UX Gym, the Heart is where we teach the real core of what a designer does, which is not making screens, it is creating experiences for people. We say it plainly, we are experiential designers, not screen designers. And an experience is something you can only design if you can feel what another person feels.', "There is a simple truth we teach. A person has an experience by going on a journey, and at every step of that journey they are feeling something. A journey plus those emotions is what an experience actually is, and your ability to understand a person\u2019s journey is what decides how good a designer you become. You feel those emotions naturally. Most people have to be trained to even notice them.", 'And this is the thing that surprises people the most. The Heart is exactly why good designers are paid so well. A designer who can feel the user, and keep that user at the centre, is the one who creates real value for a business, not just pretty screens. You came in already able to do the hardest part of that. That is a very real gift, and it is completely yours.'],
    otherSide: ['Every strength has another side, and yours is no exception. The same heart that feels for everyone can also make some things very hard for you. You can care so much about people, and about keeping everyone happy, that you find it difficult to say the hard thing, or to make a tough call that someone will not like.', 'There will be moments when the kindest thing is actually to be direct, and your Heart will pull you the other way. There will be times when a good decision will upset someone, and you will feel that weight more heavily than most people would.', 'None of this is a flaw. It is simply the cost that comes attached to your gift, and the best designers with your wiring learn to pair their warmth with honesty. Knowing this about yourself is already half of the work.'],
    pokedex: {
      title: 'Empuff, the Feeling Pokémon. Heart type.',
      body: "Empuff is said to glow a little warmer whenever someone nearby is happy, and to grow quiet and soft whenever someone nearby is sad. It cannot walk past another Pok\xE9mon in distress, and it will sit with them for as long as it takes. An Empuff always seems to know how everyone in a group is feeling, often before they know it themselves. It grows stronger every time it truly listens to someone, and it evolves when it learns to hold its warmth and its honesty at the very same time. It works beautifully alongside Thinkachu, whose sharp questions give Empuff\u2019s deep care a clear direction."
    },
    whereYouGo: ['So what do you actually do with all of this. You lean into your Heart, hard, because it is your edge and you should never once apologise for it. At UX Gym, your training will take that natural empathy and turn it into a real design skill, mapping journeys, reading emotions, and connecting what people feel to what a business actually needs.', 'At the same time, you will slowly build the parts of you that are quieter right now. You will learn to think sharply, so your care is aimed at the real problem. You will learn to build, so the experiences you feel can actually become real. This is exactly what your training here is built to do, and you are starting it from a real and rare strength.'],
    anudeep: 'I want you to remember one thing as you begin. The designer you are going to become is already inside you, and it started long before today, in the way you have always cared about people. The world has plenty of people who can make a screen. It has very few who can truly feel the person on the other side of it. You are one of them. The strongest designers are not the ones who arrive already complete. They are the ones who know exactly what they lead with, sharpen it completely, and then patiently build everything around it. You now know what you lead with. So let us build the rest of it together.'
  },
  BRAIN: {
    revealBody: 'You have just answered very honestly about yourself, and a clear picture has come through. Out of all the different ways a person can be wired, the way you think, and the way you keep digging until something makes sense, is your strongest one. This is your Brain, and in design it is one of the most valuable things you can possibly have. What follows is the truth about how you are built, and why it matters so much.',
    move: ['You ask why. You always have. As a child you very probably drove the adults around you a little mad with your questions, and that part of you never really switched off. When something does not add up, you cannot just leave it alone. You have to understand it.', 'You are comfortable in a place that makes most people uneasy, which is the place where things are still unclear. While other people want a quick answer so they can stop thinking, you are happy to sit with a hard problem and turn it over until the real shape of it appears. You do not trust the first easy answer, because you have learnt that the first easy answer is usually not the real one.', 'This is not restlessness. It is a mind that genuinely needs to understand, and in design that need is the beginning of everything good.'],
    superpower: ['This is the part that should genuinely excite you. At UX Gym, we teach that the real job of a designer is to take something messy and unclear and move it, step by step, into something clear. We call it going from ambiguity to clarity, and it is the heart of what the Brain of a designer does. You already do this naturally.', 'Everything we teach in research sits on the one quality you already have, which is genuine curiosity. We teach people to stop assuming, to go and ask, to dig past what someone first says, and to keep asking why like a curious child. We even teach designers to go in trying to prove their own idea wrong, because that is how the truth comes out. For most people this is hard and uncomfortable. For you it is close to natural.', 'A designer with your Brain is the one who solves the right problem, and not just the obvious one. You will be the person who asks the question in the room that nobody else thought to ask, the one that quietly changes everything. That is a very real gift, and it is completely yours.'],
    otherSide: ['Every strength has another side, and yours is no exception. The same mind that keeps asking why can also keep asking for too long. You can think and question and explore so thoroughly that you struggle to actually start, or to decide and move when the moment calls for it.', 'There will be times when a good decision now is worth more than a perfect decision later, and your Brain will want to keep digging. There will be moments when you have understood enough, and the real next step is to build something, not to think about it more.', 'None of this is a flaw. It is simply the cost that comes attached to your gift, and the best designers with your wiring learn when to stop thinking and start making. Knowing this about yourself is already half of the work.'],
    pokedex: {
      title: 'Thinkachu, the Questioning Pokémon. Brain type.',
      body: "Thinkachu is famous for never accepting the first answer it is given, and for following a single why with another why, and then another, until it reaches the very bottom of a thing. It goes quiet and still when it is thinking, and Pok\xE9mon nearby learn not to mistake that silence for inattention, because a Thinkachu is usually three questions ahead of everyone else. It grows stronger every time it understands something that once confused it, and it evolves when it learns to stop, decide, and move, even without every single answer in hand. It works beautifully alongside Fixitron, who turns Thinkachu\u2019s clear thinking into something real."
    },
    whereYouGo: ['So what do you actually do with all of this. You lean into your Brain, hard, because it is your edge and you should never once apologise for it. At UX Gym, your training will turn that natural curiosity into real research skill, asking the right questions, reading real behaviour, and pulling clear insight out of messy reality.', 'At the same time, you will slowly build the parts of you that are quieter right now. You will learn to build with your hands, so your thinking becomes something people can actually use. You will learn to tell the story of your thinking, so others can follow the path you saw. This is exactly what your training here is built to do, and you are starting it from a real and rare strength.'],
    anudeep: 'I want you to remember one thing as you begin. The designer you are going to become is already inside you, and it started long before today, in the way you have always needed to understand things. The world has plenty of people who accept the first answer. It has very few who keep asking until they find the real one. You are one of them. The strongest designers are not the ones who arrive already complete. They are the ones who know exactly what they lead with, sharpen it completely, and then patiently build everything around it. You now know what you lead with. So let us build the rest of it together.'
  },
  HAND: {
    revealBody: 'You have just answered very honestly about yourself, and a clear picture has come through. Out of all the different ways a person can be wired, the way you build, and the way you simply make things real, is your strongest one. This is your Hand, and in design it is the part that actually turns ideas into something people can hold. What follows is the truth about how you are built, and why it matters so much.',
    move: ['You make things. You always have. As a child you were very probably the one building forts, taking apart the remote to see inside it, or quietly fixing the thing that everyone else had given up on. Your hands have always needed something to do.', 'When you want to learn something, you do not want to read about it for very long. You want to try it, get it wrong, and try again, because that is how it actually goes into you. While other people are still planning and discussing, you have already made a rough first version, just to see what happens. A blank page does not frighten you, because your instinct is to start.', 'This is not impatience. It is the instinct of a maker, and in design it is the instinct that turns all the thinking and feeling into something real.'],
    superpower: ['This is the part that should genuinely excite you. At UX Gym, the Hand is where all the craft lives, because in the end you cannot hand someone a research report and call it design. You have to deliver the experience through real screens, and that takes building. There are four different crafts here, interaction design, UI design, visual design, and the tool itself, and a person who loves to build takes to all of them.', 'Here is the thing that holds most people back, and that barely touches you. Most beginners are quietly afraid of the tools. They freeze in front of Figma, waiting to be taught every button. We teach a completely different way, which is to stop being afraid, to start poking at the tool like a curious maker, and to learn it by actually building. That is already how you are wired. You learn by doing, and that is exactly how the craft is meant to be learnt.', 'A designer with your Hand is the one who ships, the one who turns an idea into something real while other people are still talking about it. That is a very real gift, and it is completely yours.'],
    otherSide: ['Every strength has another side, and yours is no exception. The same instinct that makes you start building fast can also make you start before you have fully understood the problem. You can build something quickly and well, only to find you have built the wrong thing.', 'There will be times when the right move is to slow down, to ask why, and to understand the real problem before your hands touch anything. There will be moments when a little more thinking up front would have saved a lot of building later.', 'None of this is a flaw. It is simply the cost that comes attached to your gift, and the best designers with your wiring learn to think first and then build. Knowing this about yourself is already half of the work.'],
    pokedex: {
      title: 'Fixitron, the Building Pokémon. Hand type.',
      body: "Fixitron is never seen sitting still with empty hands, because if there is nothing to build, it will happily take something apart just to put it back together better. It learns by doing, not by watching, and it would rather make ten rough attempts than wait for one perfect plan. Other Pok\xE9mon bring their broken things to Fixitron, who fixes them almost without thinking. It grows stronger every time it builds something with its own hands, and it evolves when it learns to pause and understand the real problem before it starts. It works beautifully alongside Visualon, whose sharp eye guides Fixitron\u2019s hands toward what truly looks right."
    },
    whereYouGo: ['So what do you actually do with all of this. You lean into your Hand, hard, because it is your edge and you should never once apologise for it. At UX Gym, your training will turn that natural drive to build into real craft, the tools, the interactions, the screens, until you can make almost anything you imagine.', 'At the same time, you will slowly build the parts of you that are quieter right now. You will learn to think first, so you build the right thing and not just a thing. You will learn to tell the story of what you built, so people understand the work inside it. This is exactly what your training here is built to do, and you are starting it from a real and rare strength.'],
    anudeep: 'I want you to remember one thing as you begin. The designer you are going to become is already inside you, and it started long before today, in the way you have always needed to make things with your hands. The world has plenty of people who talk about what they would build. It has very few who simply go and build it. You are one of them. The strongest designers are not the ones who arrive already complete. They are the ones who know exactly what they lead with, sharpen it completely, and then patiently build everything around it. You now know what you lead with. So let us build the rest of it together.'
  },
  FACE: {
    revealBody: 'You have just answered very honestly about yourself, and a clear picture has come through. Out of all the different ways a person can be wired, the way you tell things, and the way you make other people understand and care, is your strongest one. This is your Face, and in design it is the part that carries all the work out into the world. What follows is the truth about how you are built, and why it matters so much.',
    move: ['You make people understand. You always have. You are the one who can take something complicated and explain it so simply that everyone finally gets it. You are very probably the one who tells the story at the table, the one who can hold a room, the one people turn to when something needs to be said well.', 'You are comfortable speaking up, even when your view is the only one of its kind in the room. When you care about something, you do not keep it to yourself, you tell people about it, and you make them feel why it matters. Words come to you, and so does the confidence to use them.', "This is not just being talkative. It is a real ability to carry an idea from your head into someone else\u2019s, fully, so that they understand it and care about it. In design, that ability is worth a great deal."],
    superpower: ['This is the part that should genuinely excite you. At UX Gym, the Face is the part where you finally go and show the world that you are a designer. We teach that doing great work is not enough on its own, you have to be able to tell its story, and most designers are quietly terrible at this. You are not.', "A huge amount of a designer\u2019s success comes down to telling the story of their work, in a portfolio, in a case study, and out loud in an interview. We even teach five different ways to tell a single project, from a long written case study, to a presentation, to a video, to a few sharp decision stories, all the way to simply narrating it live with no slides at all. That last one, telling the story of your work out loud with nothing to hide behind, is the hardest of all, and it is exactly the kind of thing you are built for.", 'A designer with your Face is the one whose work gets noticed, the one who can walk into an interview and make people believe in what they did. The plain truth is that good work which nobody understands loses to good work which is told well. You can do the telling. That is a very real gift, and it is completely yours.'],
    otherSide: ['Every strength has another side, and yours is no exception. The same gift that lets you tell a great story can also let you lean on the telling a little too much. You can make something sound wonderful, and in doing so, skip some of the hard, quiet depth that should sit underneath it.', 'There will be times when the story is strong but the thinking beneath it is thin, and a sharp person will notice. There will be moments when the real work is not in how you say it, but in doing the difficult thing you are describing.', 'None of this is a flaw. It is simply the cost that comes attached to your gift, and the best designers with your wiring learn to put real substance behind every story they tell. Knowing this about yourself is already half of the work.'],
    pokedex: {
      title: 'Storizard, the Storytelling Pokémon. Face type.',
      body: "Storizard cannot keep a good thing to itself, and will happily gather a crowd to tell the tale of something it has seen or made. It has a gift for making the complicated feel simple, and the ordinary feel exciting, and Pok\xE9mon will follow a Storizard simply to hear how it explains things. It is most alive when it has a room\u2019s full attention. It grows stronger every time it makes someone truly understand something, and it evolves when it learns to put real depth and real substance behind the stories it tells. It works beautifully alongside Thinkachu, whose deep thinking gives Storizard\u2019s stories something solid to stand on."
    },
    whereYouGo: ['So what do you actually do with all of this. You lean into your Face, hard, because it is your edge and you should never once apologise for it. At UX Gym, your training will turn that natural gift for telling into real career skill, case studies, a portfolio, and the confidence to narrate your work in any room.', 'At the same time, you will slowly build the parts of you that are quieter right now. You will learn to think deeply, so there is real substance behind your stories. You will learn to build, so you have real work worth talking about. This is exactly what your training here is built to do, and you are starting it from a real and rare strength.'],
    anudeep: 'I want you to remember one thing as you begin. The designer you are going to become is already inside you, and it started long before today, in the way you have always been able to make people understand and care. The world has plenty of people who do good work that nobody ever hears about. It has very few who can carry their work out into the world and make it land. You are one of them. The strongest designers are not the ones who arrive already complete. They are the ones who know exactly what they lead with, sharpen it completely, and then patiently build everything around it. You now know what you lead with. So let us build the rest of it together.'
  }
};
window.PK2ReadContent = {
  THREAD: PK2_THREAD,
  SHARED: PK2_SHARED,
  READ: PK2_READ,
  buildThread: buildThread
};