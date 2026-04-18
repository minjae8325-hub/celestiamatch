import type { ZodiacSign } from './zodiac';

/**
 * Human-curated "Barnum-ish" copy that still feels grounded in each sign's
 * traditional archetype. Safe for AdSense — warm, romantic, never explicit.
 */

export interface SignReading {
  tagline: string;
  coreEssence: string;
  loveLanguage: string;
  romanticChemistry: string;
  hiddenStrength: string;
  attractionStyle: string;
  idealPartnerVibe: string;
  currentCycle: string;
}

export const READINGS: Record<ZodiacSign, SignReading> = {
  Aries: {
    tagline: 'The Spark that Starts the Fire',
    coreEssence:
      'You were born to initiate. Beneath your confidence lives a restless warmth that craves partners who can match your pace without dimming your flame. When you commit, you commit fully — you just need someone brave enough to keep up.',
    loveLanguage:
      'Your love language is action. You show devotion through the things you do — the late-night drives, the spontaneous plans, the way you show up before you\'re asked. Words matter to you, but deeds are where your heart speaks loudest.',
    romanticChemistry:
      'Your chemistry is electric at first sight. You\'re drawn to confidence, curiosity, and a touch of mystery. What you secretly crave is a partner who can hold their ground during your fire without trying to put it out.',
    hiddenStrength:
      'Most people only see your boldness. Few notice how tenderly you protect the people you love. Once you let someone in, you become the fiercest guardian of their softer parts.',
    attractionStyle:
      'You fall fast — and hard. You lead with your heart on your sleeve and refuse to play games. The right person will find your directness intoxicating rather than intimidating.',
    idealPartnerVibe:
      'Someone grounded enough to be your calm, but confident enough to occasionally challenge you. Partners who match your ambition and admire your spark bring out your most generous self.',
    currentCycle:
      'The stars suggest an unexpected chapter opening for you soon. A conversation that felt like nothing may return with more weight. Stay open — the cosmos is arranging something it hasn\'t told you about yet.',
  },
  Taurus: {
    tagline: 'The Keeper of Slow, Sacred Love',
    coreEssence:
      'You are loyalty given a body. Others might chase novelty — you chase depth. You understand that real love is not a firework but a steady hearth, and you build it with patience most people don\'t have.',
    loveLanguage:
      'Touch and time. You love through presence — cooking together, quiet mornings, the way you remember small preferences. Your affection smells like cedar and honey and feels like home.',
    romanticChemistry:
      'You seduce slowly. You want to be courted, not captured. The chemistry you crave burns low and long, with enough sensuality to remind you you\'re alive and enough safety to let you finally exhale.',
    hiddenStrength:
      'You have an almost supernatural ability to create stability out of chaos. The person who loves you won\'t just feel chosen — they\'ll feel safe enough to become who they really are.',
    attractionStyle:
      'You\'re drawn to beauty, competence, and people who know how to enjoy the world. You notice the texture of a voice, the patience in a gesture. You fall in love with the details.',
    idealPartnerVibe:
      'Someone who understands that consistency is romantic. Who shows up the same way on a Tuesday as they do on an anniversary. Who lets you take your time — and is worth the time you take.',
    currentCycle:
      'Venus is quietly highlighting your relationship house. A connection you\'ve been under-valuing is about to reveal itself as more important than you realized. Pay attention to who keeps reappearing.',
  },
  Gemini: {
    tagline: 'The Mind That Seduces Before the Body Does',
    coreEssence:
      'You fall in love through language first. A great conversation lights you up more than a great view. The right person for you doesn\'t just match you — they make your thoughts braver.',
    loveLanguage:
      'Words, curiosity, and shared discovery. Late-night voice notes. Inside jokes that become an entire private language. You love by being genuinely, endlessly interested.',
    romanticChemistry:
      'You crave mental chemistry so strong it feels physical. You want someone who surprises you, who has range, who reads something you sent them and replies with three new ideas.',
    hiddenStrength:
      'Behind your lightness lives a deeply feeling heart. You don\'t hide it because you\'re afraid — you hide it because you take it seriously. When you finally show it, it\'s a door few people get to walk through.',
    attractionStyle:
      'You\'re drawn to wit, unpredictability, and a certain lightness. But what actually holds you is depth dressed in humor. You stay for someone who makes intelligence feel like play.',
    idealPartnerVibe:
      'Someone who brings their own world into the relationship so you don\'t feel like yours is shrinking. Someone who can go wide with you — and then deep, when you\'re ready.',
    currentCycle:
      'Mercury is aligning to bring an old conversation back into your life. Something you thought was finished isn\'t. Trust your instinct if someone from the past resurfaces — there\'s meaning in the timing.',
  },
  Cancer: {
    tagline: 'The Heart That Remembers Everything',
    coreEssence:
      'You love with a memory. Every detail — the way someone takes their coffee, a song that played that one night — gets archived somewhere tender inside you. Love, for you, is an act of ongoing attention.',
    loveLanguage:
      'Care. You feed people. You check in. You remember. Your affection is woven out of small, specific devotions that add up, over time, to something unmistakably you.',
    romanticChemistry:
      'Your chemistry is emotional and intuitive. You\'re drawn to people whose eyes do more talking than their mouths. You want to feel them before you know them.',
    hiddenStrength:
      'Your softness is not a weakness — it\'s a kind of bravery most people can\'t match. You keep loving when it would be easier to harden. That\'s not naïveté. That\'s power.',
    attractionStyle:
      'You notice who feels safe. You notice who listens. You fall for the person whose presence calms your nervous system — and you\'re usually right about them.',
    idealPartnerVibe:
      'Someone who earns your trust gently and keeps it carefully. Someone who understands that "I\'ll take care of it" is a love letter to a person like you.',
    currentCycle:
      'The moon is illuminating your emotional landscape with unusual clarity. You may find yourself craving closeness with someone specific. Don\'t dismiss the pull — lunar timing is rarely wrong.',
  },
  Leo: {
    tagline: 'The One Who Loves Out Loud',
    coreEssence:
      'You love like you mean it — generously, visibly, without apology. Others might play it cool; you play it warm. When you choose someone, the world knows, and your person never has to wonder.',
    loveLanguage:
      'Celebration. You praise, you plan, you show off your partner because pride is a form of love for you. You make people feel like the main character in their own life.',
    romanticChemistry:
      'Your chemistry is magnetic and cinematic. You want a love that feels like a movie scene — and you\'re usually willing to write the script. Grand gestures aren\'t cliché to you; they\'re sincerity.',
    hiddenStrength:
      'Behind the brightness is an extraordinary loyalty. You remember everyone who has ever believed in you, and you repay it a hundred times over for the rest of your life.',
    attractionStyle:
      'You\'re drawn to presence. To people who walk into a room and light it up — or who walk into your life and make you feel seen for exactly who you are.',
    idealPartnerVibe:
      'Someone confident enough to share the spotlight. Someone who is proud of you publicly and tender with you privately. Someone who gets the joke — and gets you.',
    currentCycle:
      'The Sun is highlighting your 7th house of partnerships. Expect a shift in how someone sees you — or how you see them. A conversation about "where is this going" is closer than you think.',
  },
  Virgo: {
    tagline: 'The Quiet Architect of a Loving Life',
    coreEssence:
      'You love through precision. You notice what others miss. Your devotion lives in the details — the cup of tea made exactly right, the problem quietly solved before it became a problem at all.',
    loveLanguage:
      'Acts of service and thoughtful improvement. You care for the people you love by making their lives smoother. It\'s not fussy — it\'s fluent. You speak a dialect of love made of usefulness.',
    romanticChemistry:
      'Your chemistry is slow-burn intellectual. You want someone you can think alongside. The sexiest thing to you is competence; the second sexiest is humility.',
    hiddenStrength:
      'You\'re far more romantic than you let on. Underneath your analysis is a tender, almost old-fashioned belief in real love. You just refuse to settle for anything less than the real thing.',
    attractionStyle:
      'You watch before you commit. You\'re drawn to people who are kind when they don\'t have to be, and who take care of the unglamorous parts of their lives.',
    idealPartnerVibe:
      'Someone patient, self-aware, and genuinely kind. Someone who appreciates (and doesn\'t try to "fix") the care you pour into everything. Partnership as calm collaboration.',
    currentCycle:
      'Mercury\'s current placement is asking you to relax your standards just enough to let someone in. The version of love you\'re waiting for may not arrive exactly as you pictured it — and that\'s a gift.',
  },
  Libra: {
    tagline: 'The Soul That Was Built for Partnership',
    coreEssence:
      'You are wired for "we." Relationships are where your gifts come alive — and you know it. But you\'re learning that the most beautiful partnerships happen when you bring your whole self, not just your most agreeable self.',
    loveLanguage:
      'Harmony, aesthetics, and attentive gestures. You love through creating beautiful moments together — and through the kind of soft honesty that makes your person feel truly known.',
    romanticChemistry:
      'Your chemistry is graceful and magnetic. You\'re drawn to charm, beauty, and a certain ease. But the love that actually changes you comes from someone who sees past your polish.',
    hiddenStrength:
      'You have a near-telepathic sense for what other people need. Used well, it makes you an extraordinary partner. Used without boundaries, it leaves you depleted. Your growth edge is choosing you — and still being loved for it.',
    attractionStyle:
      'You fall for style, taste, and gentleness. But you stay for character. The person who wins your heart is the one who matches your elegance with depth.',
    idealPartnerVibe:
      'Someone secure enough to let you have your moods. Someone who offers beauty and truth in equal measure. A partner who says the hard thing kindly — and means it.',
    currentCycle:
      'Venus, your ruler, is subtly favoring reconnection right now. An imbalance in a past dynamic may be asking to be addressed — or rewritten. You\'re ready for a different kind of love now.',
  },
  Scorpio: {
    tagline: 'The One Who Loves Like They Mean Forever',
    coreEssence:
      'You don\'t do surface. You never have. Your love, once earned, is absolute — and you intuitively know that the depths you can offer are rare. You\'re not looking for a crush. You\'re looking for a bond.',
    loveLanguage:
      'Emotional presence and fierce loyalty. You love by being fully there — in the real conversations, the 3AM ones, the ones other people avoid. You make your partner feel truly, dangerously understood.',
    romanticChemistry:
      'Your chemistry runs deep and still. You\'re magnetic because you pay attention — really pay attention. When someone feels you seeing them, something in them wakes up.',
    hiddenStrength:
      'You understand healing. You\'ve done yours, quietly, and you recognize it in others. The right partner for you isn\'t someone without wounds — it\'s someone willing to be honest about theirs.',
    attractionStyle:
      'You\'re drawn to intensity, intelligence, and a certain stillness. You distrust performers and trust people whose eyes give them away. You fall for truth-tellers.',
    idealPartnerVibe:
      'Someone who won\'t flinch when you bring your whole self. Someone who meets your depth without fearing it. Someone loyal enough to deserve how loyal you\'ll be back.',
    currentCycle:
      'Pluto is working quietly in your chart, dissolving what no longer fits. An emotional chapter is closing whether you\'ve fully named it or not. What\'s coming next is designed to match the new you.',
  },
  Sagittarius: {
    tagline: 'The Free Spirit Who Still Believes in Love',
    coreEssence:
      'You\'re wired for wonder. You want a love that expands you, not one that shrinks you into someone\'s expectation. The right partner doesn\'t tame your fire — they carry their own torch beside it.',
    loveLanguage:
      'Adventure, honesty, and quality time. You show love through invitations — to trips, to ideas, to ways of being. You turn dating into a collaboration in enjoying life itself.',
    romanticChemistry:
      'Your chemistry is joyful and wide-open. You\'re drawn to optimism, curiosity, and a sense of humor that can hold real weight. The sexiest thing to you? A mind that wants to go somewhere new with you.',
    hiddenStrength:
      'Underneath your freedom-loving exterior, you\'re more loyal than people assume. You just need your loyalty to be chosen daily, not demanded. When it\'s chosen, you stay.',
    attractionStyle:
      'You fall for authenticity and courage. You lose interest fast with performers and fast with anything that feels like a cage. You want a door that stays unlocked — even when you both stay.',
    idealPartnerVibe:
      'Someone secure in themselves, curious about the world, and honest to a fault. A partner who brings their own horizon to the relationship so you can share one without losing either.',
    currentCycle:
      'Jupiter, your ruler, is opening a door in your love life that\'s been closed for a while. You may feel restless — it\'s not discontent, it\'s re-alignment. Something better is being made room for.',
  },
  Capricorn: {
    tagline: 'The Patient Builder of Lasting Love',
    coreEssence:
      'You love the way you build everything else — deliberately, with vision, and for the long term. You\'re not here for fleeting sparks. You\'re here for a partnership that becomes a legacy.',
    loveLanguage:
      'Reliability and quiet devotion. You love by showing up, every time, without making a show of it. Your affection is a bedrock. People don\'t always notice bedrock — until they need it.',
    romanticChemistry:
      'Your chemistry is serious, dry-witted, and slow to reveal itself. You\'re drawn to ambition, integrity, and humor that cuts clean. When someone actually gets you, the relief is a kind of aphrodisiac.',
    hiddenStrength:
      'You\'re so much warmer than you let on. You guard your softness because you\'ve seen it misused. The right person doesn\'t earn your softness with charm — they earn it by being consistently, boringly safe.',
    attractionStyle:
      'You watch. You notice how people treat servers, family, strangers. You fall for character in motion — the person whose actions, week after week, prove they\'re who they say they are.',
    idealPartnerVibe:
      'Someone who respects your drive and helps you remember your heart. Someone who\'s in it for the real thing. A teammate, a confidant, a co-architect of a life you\'re both proud of.',
    currentCycle:
      'Saturn is inviting you to re-evaluate an old belief about what you deserve in love. You\'ve outgrown a standard that no longer serves you. Revise it — the stars are backing the upgrade.',
  },
  Aquarius: {
    tagline: 'The Rebel Who Loves on Their Own Terms',
    coreEssence:
      'You\'re not interested in a love that follows a script. You want a partnership that lets you both stay strange, strong, and free — and somehow, even more yourselves together than apart.',
    loveLanguage:
      'Intellectual intimacy and unconventional loyalty. You love by thinking alongside someone, championing their weirdness, and defending their individuality — sometimes from themselves.',
    romanticChemistry:
      'Your chemistry is unexpected. You\'re rarely drawn to "the obvious one." You fall for people who think differently, speak differently, or look at the world the way no one else in the room does.',
    hiddenStrength:
      'You feel far more than you admit. Your aloofness is often protection, not distance. When you trust someone enough to let them see the real depth of your feelings, it\'s because they\'re very, very rare.',
    attractionStyle:
      'You\'re drawn to ideas before faces. You\'ll fall for a mind that can argue with yours without needing to dominate it. You stay for the person who makes you feel free to be weird.',
    idealPartnerVibe:
      'Someone confident in who they are, curious about who you are, and emotionally literate enough to name what\'s happening between you. Closeness without smothering.',
    currentCycle:
      'Uranus is shaking up your usual patterns. Expect a connection to show up from an angle you didn\'t predict. Let it — your soul has been quietly asking for a surprise.',
  },
  Pisces: {
    tagline: 'The Dreamer Who Loves Like a Poet',
    coreEssence:
      'You feel the world in high definition. Love, for you, is spiritual — almost sacred. You bring a softness into relationships that turns ordinary moments into something quietly luminous.',
    loveLanguage:
      'Emotional attunement and tender presence. You love through witnessing — through actually seeing the person in front of you, the way an artist sees a subject. It\'s rare. It\'s healing.',
    romanticChemistry:
      'Your chemistry is dreamy and intuitive. You\'re drawn to emotional depth, artistic sensibility, and anyone whose gaze makes you feel recognized in a language you didn\'t know was yours.',
    hiddenStrength:
      'You survive more than you show. There\'s steel in your softness that tends to surprise people who underestimated you. The right partner won\'t ask you to harden — they\'ll protect what\'s soft.',
    attractionStyle:
      'You fall through atmosphere. A voice, a way of moving through space, a certain energy — that\'s what pulls you in. You trust your intuition, and it\'s usually right.',
    idealPartnerVibe:
      'Someone grounded enough to hold you when you\'re in the emotional deep end, and imaginative enough to swim out with you when you want to explore. A safe harbor with a ship inside.',
    currentCycle:
      'Neptune is stirring dreams you haven\'t fully named. A person who has appeared in your thoughts more than usual is not a coincidence. Your intuition is speaking — listen softly, but listen.',
  },
};
