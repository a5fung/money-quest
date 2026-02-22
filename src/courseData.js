export const courseData = [
  // ═══════════════════════════════════════════════════
  // ACT 1: AWAKENING — What Money Really Is
  // ═══════════════════════════════════════════════════
  {
    id: 1,
    act: 1,
    actName: "AWAKENING",
    emoji: "🎭",
    color: "#f472b6",
    title: "The Player",
    description: "Wealth ≠ Rich. The invisible game most people never see.",
    locked: false,
    content: {
      videoUrl: "https://www.youtube.com/embed/TtJXl6pk0Z4",
      article: `## The Man in the Car Paradox

Imagine you see someone driving a bright red Ferrari. Here's the truth nobody talks about: you don't actually think, "Wow, that person is cool." You think, "If *I* had that car, people would think *I'm* cool."

Nobody is as impressed with your stuff as you are. That's the Man in the Car Paradox — and it changes everything about how you should think about money.

## Wealth Is What You Don't See

Here's the most important sentence in personal finance: **Rich is a current income. Wealth is income not spent.**

Wealth is the nice car *not* purchased. The designer clothes *not* bought. The first-class upgrade *not* taken. Wealth is financial assets that haven't yet been converted into stuff you can show off.

The person driving the $100,000 car might actually have *less* wealth than the person in jeans and a Honda — because the Honda driver kept the difference and invested it.

## Why This Matters For You

Most people play a game they don't understand. They earn money, spend it on things that look impressive, and wonder why they never feel secure. The Freedom Architect plays a different game entirely.

**Your first mission:** Stop trying to *look* rich. Start trying to *be* wealthy. The scoreboard is invisible — and that's exactly the point.`,
      challenge: {
        question: "According to the 'Man in the Car Paradox,' what is wealth?",
        options: [
          { text: "Having a high salary and expensive possessions.", correct: false },
          { text: "Financial assets that haven't been converted into visible stuff.", correct: true },
          { text: "Making more money than everyone around you.", correct: false },
          { text: "Owning a house, a car, and having zero debt.", correct: false }
        ]
      }
    }
  },
  {
    id: 2,
    act: 1,
    actName: "AWAKENING",
    emoji: "🏰",
    color: "#f472b6",
    title: "The Fortress",
    description: "Your emergency fund is armor against chaos.",
    locked: true,
    content: {
      videoUrl: "https://www.youtube.com/embed/eDLGUj5ijQI",
      article: `## The Turkey Problem

Nassim Taleb tells this story: A turkey is fed by a farmer every single day for 1,000 days. Each day, the turkey's confidence grows — "This farmer loves me!" On day 1,001, just before Thanksgiving, the turkey learns the painful truth.

**The lesson:** Just because nothing bad has happened *yet* doesn't mean it won't. Your past is not a reliable map of your future.

## Room For Error

Morgan Housel calls it "room for error." Taleb calls it "antifragility." The idea is the same: **the most important part of any financial plan is planning for things that can't be planned for.**

An emergency fund isn't just savings — it's a fortress. It's 3-6 months of expenses sitting in cash, boring and untouched, waiting for the day you need it. And you *will* need it. Everyone does.

A car breaks down. A job disappears. A medical bill arrives. Without a fortress, these events become catastrophes. With one, they become inconveniences.

## How to Build Your Fortress

Start small. Even $500 set aside changes your psychology. You stop making decisions from fear and start making them from strength. That shift — from reactive to proactive — is the first real step toward freedom.

**Your mission:** The Architect doesn't hope for the best. The Architect builds walls *before* the storm arrives.`,
      challenge: {
        question: "Why does the 'Turkey Problem' matter for your finances?",
        options: [
          { text: "It proves that investing in farms is risky.", correct: false },
          { text: "It shows that past stability doesn't guarantee future safety.", correct: true },
          { text: "It means you should never trust anyone with your money.", correct: false },
          { text: "It suggests keeping all your money under your mattress.", correct: false }
        ]
      }
    }
  },
  {
    id: 3,
    act: 1,
    actName: "AWAKENING",
    emoji: "⚡",
    color: "#f472b6",
    title: "The Engine",
    description: "Compounding is the 8th wonder of the world.",
    locked: true,
    content: {
      videoUrl: "https://www.youtube.com/embed/rri9dQg7O_g",
      article: `## Warren Buffett's Real Secret

Warren Buffett's net worth is over $100 billion. Here's the part that will surprise you: **$99.7 billion of it came after his 50th birthday.** And $97 billion came after he turned 65.

Buffett isn't the world's greatest investor because he gets the highest returns. He's the richest because he started investing at age 11 and never stopped. His real skill? *Patience.*

## The Magic Penny

Here's a riddle: Would you rather have $1 million today, or a magic penny that doubles every day for 30 days?

- Day 1: $0.01
- Day 10: $5.12
- Day 20: $5,242.88
- Day 25: $167,772.16
- **Day 30: $5,368,709.12**

The penny wins — and it's not even close. But here's the catch: on Day 20, you only have $5,000. Most people would panic and quit. The magic only happens if you *don't interrupt the process.*

## Why Compounding Feels Broken

Compounding is unintuitive because the results are backloaded. The first 10 years feel like nothing. The next 10 feel okay. The last 10 feel like magic. This is why so many people give up — they quit right before the exponential curve kicks in.

**Your mission:** The Architect doesn't need to get rich quick. You just need to start the engine, then *refuse to turn it off.* Time does the rest.`,
      challenge: {
        question: "What is the MOST important factor in the power of compounding?",
        options: [
          { text: "Picking the single best investment.", correct: false },
          { text: "Starting with a large sum of money.", correct: false },
          { text: "Time — letting it work without interruption.", correct: true },
          { text: "Moving money between investments frequently.", correct: false }
        ]
      }
    }
  },

  // ═══════════════════════════════════════════════════
  // ACT 2: BUILDING — Core Money Skills
  // ═══════════════════════════════════════════════════
  {
    id: 4,
    act: 2,
    actName: "BUILDING",
    emoji: "📐",
    color: "#38bdf8",
    title: "The Blueprint",
    description: "Simple budgeting & the pay-yourself-first system.",
    locked: true,
    content: {
      videoUrl: "https://www.youtube.com/embed/g7vGrynFrps",
      article: `## The 50/30/20 Framework

Most budgets fail because they're too complicated. You don't need a spreadsheet with 47 categories. You need a blueprint — simple, clear, and automatic.

The 50/30/20 rule splits your after-tax income into three buckets:

- **50% Needs:** Rent, groceries, insurance, minimum debt payments — the non-negotiables.
- **30% Wants:** Dining out, entertainment, hobbies, subscriptions — the things that make life fun.
- **20% Future You:** Savings, investments, extra debt payments — the wealth-building engine.

That's it. No tracking every coffee. No guilt spirals.

## Pay Yourself First

Here's where most people go wrong: they earn money, spend it, and save whatever's left. The problem? There's never anything left.

The Architect flips this. **The moment money arrives, 20% moves to savings automatically.** Before rent. Before Netflix. Before that impulse purchase. You pay yourself first, then live on what remains.

This isn't about deprivation — it's about sequence. When saving comes first, spending takes care of itself.

## The Power of Automation

Set up an automatic transfer from your checking to your savings account on payday. You'll adjust to the smaller checking balance within a month. After that, wealth builds on autopilot.

**Your mission:** Build the blueprint. Automate the 20%. Then forget about it and live your life.`,
      challenge: {
        question: "What does 'Pay Yourself First' actually mean?",
        options: [
          { text: "Buy something nice for yourself before paying bills.", correct: false },
          { text: "Automatically save/invest before spending on anything else.", correct: true },
          { text: "Make sure you earn more than your friends.", correct: false },
          { text: "Pay off all your debt before saving any money.", correct: false }
        ]
      }
    }
  },
  {
    id: 5,
    act: 2,
    actName: "BUILDING",
    emoji: "🪤",
    color: "#38bdf8",
    title: "The Trap",
    description: "Debt, lifestyle inflation & the hedonic treadmill.",
    locked: true,
    content: {
      videoUrl: "https://www.youtube.com/embed/j3txNYHC5_k",
      article: `## The Hedonic Treadmill

You get a raise. You feel amazing — for about two weeks. Then you upgrade your apartment, your car, your wardrobe. Now you need the *new* salary just to stay afloat. Another raise comes. The cycle repeats.

This is the hedonic treadmill. **No matter how much more you earn, your lifestyle expands to consume it.** You're running faster but staying in the same place.

## The Lifestyle Inflation Trap

Charlie Munger once said: "The first rule of compounding is to never interrupt it unnecessarily." Lifestyle inflation is the #1 way people interrupt it.

Every raise is a fork in the road. You can either:
- **Upgrade your lifestyle** (bigger apartment, nicer car) — which resets your happiness baseline
- **Keep your lifestyle the same** and invest the difference — which builds permanent wealth

The person earning $200K who spends $190K is in worse shape than the person earning $60K who spends $40K. Income doesn't matter. **The gap between earning and spending is everything.**

## How Debt Becomes a Prison

Consumer debt (credit cards, car loans) works like compounding in reverse. Instead of your money growing, someone else's money grows — using yours. A $5,000 credit card balance at 20% APR costs you $1,000 per year in interest. That's money working *against* you.

**Your mission:** Recognize the trap. When your income goes up, keep your lifestyle where it is. The gap between earning and spending is your freedom.`,
      challenge: {
        question: "What is the 'hedonic treadmill'?",
        options: [
          { text: "A type of exercise equipment that costs too much.", correct: false },
          { text: "A government tax on luxury goods.", correct: false },
          { text: "The cycle where lifestyle expands to match every income increase.", correct: true },
          { text: "A method for paying off debt faster.", correct: false }
        ]
      }
    }
  },
  {
    id: 6,
    act: 2,
    actName: "BUILDING",
    emoji: "🌱",
    color: "#38bdf8",
    title: "The Seed",
    description: "Investing 101 — index funds & the power of patience.",
    locked: true,
    content: {
      videoUrl: "https://www.youtube.com/embed/5gIXpkQkX8A",
      article: `## Buffett's Million-Dollar Bet

In 2007, Warren Buffett made a $1 million bet. He wagered that a simple S&P 500 index fund would beat a collection of hand-picked hedge funds over 10 years. These hedge funds charged massive fees and employed the smartest people on Wall Street.

**Buffett won — and it wasn't close.** The index fund returned 125.8%. The hedge funds averaged 36%.

## What Is an Index Fund?

An index fund is a basket that holds a tiny piece of every company in a market. Instead of picking individual winners (which almost nobody can do consistently), you own *all of them.*

When you buy an S&P 500 index fund, you own a slice of Apple, Google, Amazon, and 497 other companies. If one fails, the others carry you. Over time, the market as a whole has averaged about 10% per year.

## Why Most People Fail at Investing

The average investor earns far less than the market average. Why? They buy when stocks are going up (excitement) and sell when stocks are going down (fear). They try to time the market instead of giving the seed time to grow.

Charlie Munger said: "The big money is not in the buying or the selling, but in the waiting."

## Plant the Seed

You don't need to be smart. You don't need to pick stocks. You just need to buy a low-cost index fund regularly and *never sell in a panic.*

**Your mission:** Stop trying to find the needle in the haystack. Buy the whole haystack. Then wait.`,
      challenge: {
        question: "Why did Buffett's simple index fund beat the Wall Street hedge funds?",
        options: [
          { text: "Buffett had insider trading information.", correct: false },
          { text: "The hedge funds weren't trying their hardest.", correct: false },
          { text: "Low fees + owning the whole market beats most stock-pickers over time.", correct: true },
          { text: "Index funds always go up and never lose value.", correct: false }
        ]
      }
    }
  },

  // ═══════════════════════════════════════════════════
  // ACT 3: GROWING — Intermediate Mastery
  // ═══════════════════════════════════════════════════
  {
    id: 7,
    act: 3,
    actName: "GROWING",
    emoji: "🌳",
    color: "#a3e635",
    title: "The Garden",
    description: "Diversification & the barbell strategy.",
    locked: true,
    content: {
      videoUrl: "https://www.youtube.com/embed/d0sLe3tE5Ro",
      article: `## Don't Put All Your Seeds in One Pot

Imagine a garden with only one type of plant. If a disease hits that species, your entire garden dies. But a garden with dozens of different plants? Some will struggle, but the garden survives.

Your money works the same way. **Diversification means spreading your investments so that no single failure can destroy you.**

## The Barbell Strategy

Nassim Taleb introduced a powerful idea: the barbell strategy. Instead of putting everything in "medium risk" investments, you split into two extremes:

- **One end: Ultra-safe.** Cash, treasury bonds, your emergency fund. This money is boring and untouchable. It protects your downside.
- **Other end: High-growth.** Index funds, and maybe a small portion in higher-risk opportunities. This money has maximum upside potential.

Nothing in the middle. The barbell gives you *safety AND growth* — without the mushy middle that does neither well.

## Munger's First Rule

Charlie Munger distilled decades of investing wisdom into one sentence: **"Rule number one: don't lose money. Rule number two: don't forget rule number one."**

This doesn't mean never take risks. It means structure your portfolio so that even the worst-case scenario doesn't knock you out of the game. You can lose a battle and still win the war — as long as you survive.

**Your mission:** Build a garden, not a single bet. Protect the downside. Let the upside take care of itself.`,
      challenge: {
        question: "What is the 'barbell strategy'?",
        options: [
          { text: "Investing everything in medium-risk assets for balance.", correct: false },
          { text: "Splitting between ultra-safe assets and high-growth assets, nothing in between.", correct: true },
          { text: "Lifting weights to build financial discipline.", correct: false },
          { text: "Buying equal amounts of stocks and bonds.", correct: false }
        ]
      }
    }
  },
  {
    id: 8,
    act: 3,
    actName: "GROWING",
    emoji: "🛡️",
    color: "#a3e635",
    title: "The Shield",
    description: "Risk, Black Swans & protecting your downside.",
    locked: true,
    content: {
      videoUrl: "https://www.youtube.com/embed/9sXQXq9wJPU",
      article: `## The Black Swan

Before 1697, every European believed all swans were white. They had centuries of data to prove it. Then explorers reached Australia and found black swans. One observation destroyed a belief held for thousands of years.

Nassim Taleb uses this story to explain **Black Swan events** — rare, unpredictable events with massive consequences. The 2008 financial crisis. COVID-19. They seem impossible *until they happen.*

## Inversion: Munger's Secret Weapon

Charlie Munger's favorite mental tool is **inversion** — instead of asking "How do I succeed?", ask "How would I guarantee failure?" Then avoid those things.

Applied to money:
- How to guarantee financial ruin? Take on massive debt. Put all money in one stock. Have no emergency fund. Panic-sell during crashes.
- **How to guarantee financial survival?** Do the opposite of everything above.

You don't need to be brilliant. You just need to avoid being stupid.

## The Fragile vs. The Antifragile

Fragile things break under stress (like a glass vase). Robust things resist stress (like a rock). But **antifragile** things actually get *stronger* under stress — like your immune system after fighting an infection.

Your financial life should be antifragile:
- Crashes become buying opportunities (you buy more when prices are low)
- Job loss becomes a pivot point (your emergency fund gives you time to find something better)
- Setbacks become lessons (each mistake makes your system stronger)

**Your mission:** Build your Shield. Assume Black Swans will happen. Use inversion. Make your finances antifragile.`,
      challenge: {
        question: "What is Munger's 'inversion' technique?",
        options: [
          { text: "Investing in the opposite of what everyone else is buying.", correct: false },
          { text: "Instead of asking how to succeed, ask how to guarantee failure — then avoid those things.", correct: true },
          { text: "Turning your portfolio upside down every quarter.", correct: false },
          { text: "Selling all investments during a market downturn.", correct: false }
        ]
      }
    }
  },
  {
    id: 9,
    act: 3,
    actName: "GROWING",
    emoji: "🚀",
    color: "#a3e635",
    title: "The Multiplier",
    description: "Growing your income & investing in human capital.",
    locked: true,
    content: {
      videoUrl: "https://www.youtube.com/embed/09ROXp69_GU",
      article: `## The Earn-More Side of the Equation

Budgeting and saving are powerful — but they have a floor. You can only cut expenses so much before life becomes miserable. Your income, on the other hand, has **no ceiling.**

Most financial advice focuses on spending less. The Architect also focuses on *earning more.*

## Your Most Valuable Asset

Your greatest financial asset isn't your savings account or your stock portfolio. It's **you** — your skills, knowledge, reputation, and ability to create value for others.

Charlie Munger said: "The best thing a human being can do is to help another human being know more." He also said something even more direct: **"To get what you want, you have to deserve what you want."**

This isn't fluffy motivation. It's practical: the more valuable you become, the more options you have. Skills compound just like money.

## Three Ways to Multiply

1. **Get better at what you do.** The top 10% in any field earn dramatically more than average. Invest in learning — books, courses, mentors.
2. **Solve bigger problems.** Your income is roughly proportional to the size and number of problems you solve. Seek out bigger challenges.
3. **Build assets that work without you.** Side projects, content, intellectual property. Create once, earn repeatedly.

## The Multiplier Mindset

Spending an hour learning a high-value skill can be worth more than an hour of overtime. A $20 book that changes how you think about business can return thousands.

**Your mission:** Don't just save your way to freedom. Multiply. Invest in yourself — you're the asset with the highest ceiling.`,
      challenge: {
        question: "According to Munger, what's the best way to get what you want?",
        options: [
          { text: "Network aggressively and promote yourself constantly.", correct: false },
          { text: "Wait for the right opportunity to present itself.", correct: false },
          { text: "Deserve what you want by becoming genuinely valuable.", correct: true },
          { text: "Take big financial risks to generate large returns.", correct: false }
        ]
      }
    }
  },

  // ═══════════════════════════════════════════════════
  // ACT 4: MASTERY — Philosophy & Freedom
  // ═══════════════════════════════════════════════════
  {
    id: 10,
    act: 4,
    actName: "MASTERY",
    emoji: "🏗️",
    color: "#fb923c",
    title: "The Architect",
    description: "Spend with purpose — time is worth more than money.",
    locked: true,
    content: {
      videoUrl: "https://www.youtube.com/embed/n1b7piSmmME",
      article: `## The Richest Corpse in the Cemetery

Bill Perkins asks a haunting question in *Die With Zero*: "What's the point of having all this money if you never use it to live?"

He tells the story of people who save their entire lives, die with millions in the bank, and never took the trip. Never had the experience. Never spent time with the people they love while they still could.

**Dying with too much money means you worked years of your life for free.**

## Time Buckets

Here's a framework that changes how you think about spending: **time buckets.** Your life is divided into phases, and each phase has experiences that only work *during that phase.*

- **Ages 20-35:** Backpacking, adventures, late nights, physical challenges. Your body cooperates. Do these NOW.
- **Ages 35-55:** Family experiences, career risks, building something meaningful.
- **Ages 55+:** Reflection, mentoring, legacy, comfort.

You can't backpack Southeast Asia on a shoestring at 75. You can't play on the floor with your toddler when they're 30. Some experiences have expiration dates.

## Spending With Purpose

This isn't about being reckless. It's about being *intentional.* The Architect saves AND spends — but every dollar has a purpose. "I'm saving this for future freedom" is just as valid as "I'm spending this because this experience matters now."

The goal isn't to hoard the most money. The goal is to extract the most *life* from your money.

**Your mission:** You are the Architect of your life, not just your bank account. Design both.`,
      challenge: {
        question: "What are 'time buckets' in the context of spending?",
        options: [
          { text: "Savings accounts that unlock at specific dates.", correct: false },
          { text: "Phases of life where certain experiences are best lived, before they expire.", correct: true },
          { text: "A method for dividing your day into productive hours.", correct: false },
          { text: "Investment funds that mature at different time periods.", correct: false }
        ]
      }
    }
  },
  {
    id: 11,
    act: 4,
    actName: "MASTERY",
    emoji: "🧭",
    color: "#fb923c",
    title: "The Compass",
    description: "Behavioral traps & staying the course.",
    locked: true,
    content: {
      videoUrl: "https://www.youtube.com/embed/EZjOYeZnQYA",
      article: `## Your Brain Is Working Against You

You've now learned the mechanics of money: save, invest, compound, diversify. The hard part isn't knowing what to do — **it's doing it when your brain is screaming at you to stop.**

Morgan Housel writes: "Doing well with money has little to do with how smart you are and a lot to do with how you behave."

## The Five Traps

**1. Fear of Missing Out (FOMO).** Your friend made 300% on a crypto coin. The market is booming. Everyone is getting rich. You panic-buy at the top. This is how bubbles work.

**2. Loss Aversion.** Losing $100 feels twice as painful as gaining $100 feels good. This is why people sell investments at the worst time — the pain of watching a loss is unbearable.

**3. Confirmation Bias.** You bought a stock. Now you only read articles that say it's a great stock. You ignore every warning sign. You become blind to reality.

**4. Herd Mentality.** If everyone is doing it, it must be right — right? The 2008 housing crisis proved that millions of people can all be wrong at the same time.

**5. Overconfidence.** After a few wins, you think you've figured out the system. You take bigger risks. You stop following your blueprint. This is when the biggest losses happen.

## Munger's Antidote

Charlie Munger spent decades studying human biases. His antidote is simple: **create systems that don't rely on willpower.** Automate your investments. Write down your rules. Don't watch the market daily. Remove yourself from the decision loop.

**Your mission:** Know the traps. Build systems that protect you from your own worst instincts. The Compass keeps you on course when emotions try to steer you off a cliff.`,
      challenge: {
        question: "Why is human behavior the BIGGEST challenge in personal finance?",
        options: [
          { text: "Because the math is too complicated for most people.", correct: false },
          { text: "Because good financial products are hard to find.", correct: false },
          { text: "Because our brains have biases that push us to make emotional, irrational decisions.", correct: true },
          { text: "Because financial advisors give intentionally bad advice.", correct: false }
        ]
      }
    }
  },
  {
    id: 12,
    act: 4,
    actName: "MASTERY",
    emoji: "♾️",
    color: "#fb923c",
    title: "The Infinite Game",
    description: "Enough, generosity & playing the long game.",
    locked: true,
    content: {
      videoUrl: "https://www.youtube.com/embed/I0YEL6fw3Ks",
      article: `## The Concept of Enough

Rajat Gupta had everything — CEO of McKinsey, net worth of $100 million, respect of the business world. But he wanted to be a *billionaire.* So he traded on insider information, got caught, and lost everything. His career. His reputation. His freedom.

Morgan Housel uses this story to illustrate the most dangerous idea in finance: **not knowing when you have enough.**

The goalpost keeps moving. $1 million becomes $10 million becomes $100 million. Each new level of wealth creates a new comparison group. If "enough" is always "a little more," you'll never feel free.

## The Rational Life

Charlie Munger lived to 99. He wasn't just a great investor — he was a great *thinker about living.* His principles were simple:

- **Don't be envious.** Envy is the only deadly sin that isn't even fun.
- **Be reliable.** Reliability is the easiest way to earn trust and opportunity.
- **Keep learning.** Go to bed a little wiser than when you woke up.
- **Be generous.** Not as charity, but as identity. Generous people attract generous lives.

## The Infinite Game

Finite games are played to win — there's a clear endpoint. But **life is an infinite game.** The goal isn't to "win" at money. The goal is to keep playing — to have freedom, options, and the ability to do what you want, with who you want, for as long as you want.

Morgan Housel's definition of wealth: "The ability to wake up every morning and say, 'I can do whatever I want today.'" That's it. That's freedom.

## Your Final Mission

You started this course as a player. You learned the invisible rules of money. You built a fortress, planted seeds, avoided traps, and designed a life with purpose.

**You are now the Architect.** Not of a bank account — but of a life worth living. The game isn't over. It never is. But now you have the blueprint.

Go build something extraordinary.`,
      challenge: {
        question: "What is the 'Infinite Game' of personal finance?",
        options: [
          { text: "Accumulating as much money as possible before you die.", correct: false },
          { text: "Beating the stock market's returns every single year.", correct: false },
          { text: "Maintaining freedom, options, and the ability to live on your terms — indefinitely.", correct: true },
          { text: "Never spending any money so your wealth grows forever.", correct: false }
        ]
      }
    }
  }
];
