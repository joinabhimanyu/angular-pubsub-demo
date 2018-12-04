export const welcomeMap = {
  none: 'welcomea',
  one: 'welcomeb',
  all: 'welcomec'
};
export const allMessages = {
  'pageRouting': 'page:routing',
};
export const email = 'neuroSHARE@Sutterhealth.org';
export const phone = '001-0000987765';
export const sutterHealthUrl = 'https://www.sutterhealth.org/';
export const reviewPageDelay = 1000;
export const navMap = {
  q1a: {
    name: 'Q1.1',
    descr1: `The first set of questions ask about symptoms that you may have. Each person has a different experience with MS,
        so you may not have – or ever have – all of the symptoms we ask about.`,
    descr2: `Please do your best to pick an answer from the choices that are offered.
         You may skip any questions you don’t want to answer.
        Just keep in mind that we may not be able to calculate your EDSS score if you skip questions.`,
    text: `Which of the following best describes your ability to walk?`,
    jumpTo: 'q4',
    progress: 0,
    weight: 0,
    jumpBack: 'start',
    edss: 'Yes',
    deleteItems: ['Q1.2', 'Q2', 'Q1.3', 'Q1.4.1', 'Q1.4.2', 'Q1.4.3', 'Q1.4.4'],
    options: [
      {
        text: `I can walk without any problem`,
        score: 1,
        jumpTo: 'q4',
      }, {
        text: `I have difficulties with walking`,
        score: 2,
        jumpTo: 'q1b',
      }, {
        text: `I use a wheelchair for almost all activities`,
        score: 3,
        jumpTo: 'q2',
      }, {
        text: `I spend most of my time in bed`,
        score: 4,
        jumpTo: 'q2',
      }
    ],
    type: 'radio',
    answer: '',
  },
  q1b: {
    text: `How far can you walk without needing to use an aid (cane, crutch, walker)?`,
    name: 'Q1.2',
    jumpTo: 'q4',
    progress: 5,
    weight: 1,
    jumpBack: '',
    edss: 'Yes',
    skipLogic: true,
    deleteItems: ['Q2', 'Q1.3', 'Q1.4'],
    options: [
      {
        text: `More than 1500 feet (500 meters or about 5 football fields)`,
        score: 1,
        jumpTo: 'q2'
      }, {
        text: `About 900 to 1500 feet (300 meters or about 3 football fields)`,
        score: 2,
        jumpTo: 'q2'
      }, {
        text: `About 600 to 900 feet (200 meters or about 2 football fields)`,
        score: 3,
        jumpTo: 'q2'
      }, {
        text: `About 300 to 600 feet (100 meters or about 1 football field)`,
        score: 4,
        jumpTo: 'q1d'
      }, {
        text: `Less than 300 feet`,
        score: 5,
        jumpTo: 'q1c'
      }
    ],
    type: 'radio',
    answer: '',
  },
  q1c: {
    text: `When you use an aid (cane, crutch, walker), you can walk: `,
    progress: 7,
    name: 'Q1.3',
    jumpTo: 'q4',
    weight: 2,
    jumpBack: '',
    edss: 'Yes',
    skipLogic: true,
    options: [
      {
        text: `About 300 feet or 100 meters`,
        score: 1,
        jumpTo: 'q1d',
      }, {
        text: `About 60 feet or 20 meters`,
        score: 2,
        jumpTo: 'q1d',
      }, {
        text: `About 24 feet or 8 meters`,
        score: 3,
        jumpTo: 'q1d',
      }
    ],
    type: 'radio',
    answer: '',
  },
  q1d: {
    text: `When you move about, how often do you...`,
    name: 'Q1.4',
    jumpTo: 'q4',
    progress: 9,
    weight: 3,
    jumpBack: '',
    type: 'selectOptions',
    edss: 'Yes',
    skipLogic: true,
    sub: [
      {
        text: `Walk without aid?`,
        name: 'Q1.4.1',
        score: 1,
        jumpTo: 'q2',
        value: ''
      },
      {
        text: `Use a cane, a single crutch, or hold onto another person?`,
        name: 'Q1.4.2',
        score: 1,
        jumpTo: 'q2',
        value: ''
      },
      {
        text: `Use a walker or other bilateral support?`,
        name: 'Q1.4.3',
        score: 1,
        jumpTo: 'q2',
        value: ''
      },
      {
        text: `Use a wheel chair?`,
        name: 'Q1.4.4',
        score: 1,
        jumpTo: 'q2',
        value: ''
      },
    ],
    selectOptions: [
      '0%',
      '10%',
      '20%',
      '30%',
      '40%',
      '50%',
      '60%',
      '70%',
      '80%',
      '90%',
      '100%']
  },
  q2: {
    text: `Which of the following best describes your functional abilities?`,
    name: 'Q2',
    progress: 12,
    jumpTo: 'q4',
    weight: 4,
    jumpBack: '',
    edss: 'Yes',
    skipLogic: true,
    options: [
      {
        text: `I am able to carry out my usual daily activities without limitation`,
        score: 1,
      }, {
        text: 'I have limitations but can carry out most of my usual daily activities, ' +
          'even if I may require some special provisions such as altered work hours or naps',
        score: 2,
      }, {
        text: `I am able to carry out about only half of my usual daily activities even with special provisions`,
        score: 3,
      }, {
        text: `I am severely limited in my ability to carry out my usual daily activities`,
        score: 4,
      }, {
        text: 'I require assistance with even my basic self care activities such ' +
          'as dressing, bathing, transferring and going to the bathroom',
        score: 5,
      }
    ],
    type: 'radio',
    answer: '',
  },
  q4: {
    descr1: ``,
    descr2: ``,
    progress: 16,
    name: 'Q4',
    weight: 5,
    jumpBack: '',
    edss: 'Yes',
    text: 'On an average day, check the answer that best describes your sensation ' +
      '(feeling, numbness, ability to sense touch or hot or cold) in your:',
    jumpTo: 'q5',
    type: 'table',
    commonOptions: [
      {
        text: `My feeling is very good - No problems`,
        score: 0,
        checked: false
      }, {
        text: `My feeling is mildly impaired`,
        score: 1,
        checked: false
      }, {
        text: `My feeling is clearly impaired`,
        score: 2,
        checked: false
      }, {
        text: `My feeling is very poor or completely gone`,
        score: 3,
        checked: false
      }
    ],
    sub: [
      {
        text: `Right hand or arm`,
        name: 'Q4.1',
      }, {
        text: `Left hand or arm`,
        name: 'Q4.2',
      }, {
        text: `Right foot or leg`,
        name: 'Q4.3',
      }, {
        text: `Left foot or leg`,
        name: 'Q4.4',
      }
    ],
    answer: '',
  },
  q5: {
    text: `In general, how much strength do you have to raise each arm and leg in the air?`,
    jumpTo: 'q6',
    progress: 18,
    name: 'Q5',
    weight: 6,
    jumpBack: '',
    edss: 'Yes',
    type: 'table',
    answer: '',
    commonOptions: [
      {
        text: `I can easily raise it and keep it raised`,
        score: 0,
        checked: false
      }, {
        text: `I can raise it, but have mild or occasional trouble with  my full strength`,
        score: 1,
        checked: false
      }, {
        text: `I have to make some effort to raise it`,
        score: 2,
        checked: false
      }, {
        text: `I can barely raise it`,
        score: 3,
        checked: false
      }, {
        text: `I can move my limb, but I cannot raise it`,
        score: 4,
        checked: false
      }
      , {
        text: `I cannot move it at all `,
        score: 5,
        checked: false
      }
    ],
    sub: [
      {
        text: `Right Arm`,
        name: 'Q5.1',
      }, {
        text: `Left Arm`,
        name: 'Q5.2',
      }, {
        text: `Right Leg`,
        name: 'Q5.3',
      }, {
        text: `Left Leg`,
        name: 'Q5.4',
      }
    ]
  },
  q6: {
    text: `In general, do muscle spasms or stiffness ("spasticity")
        make it hard for you to use (bend or straighten) your arms and legs?`,
    header: `Stiffness and spasms…`,
    type: 'header',
    name: 'Q6',
    weight: 7,
    jumpBack: '',
    jumpTo: 'q7',
    progress: 22,
    edss: 'Yes',
    answer: '',
    commonOptions: [
      {
        text: `I do not have stiffness or spasms`,
        score: 0,
        checked: false
      }, {
        text: `Mild, do not make it hard for me to use it`,
        score: 1,
        checked: false
      }, {
        text: `Moderate stiffness, but with effort I can use it`,
        score: 2,
        checked: false
      }, {
        text: `Sometimes I cannot overcome the stiffness to use it`,
        score: 3,
        checked: false
      }, {
        text: `My arm or leg is so contracted that I cannot use it at all`,
        score: 4,
        checked: false
      }
    ],
    sub: [
      {
        text: `Right Arm`,
        name: 'Q6.1',
      }, {
        text: `Left Arm`,
        name: 'Q6.2',
      }, {
        text: `Right Leg`,
        name: 'Q6.3',
      }, {
        text: `Left Leg`,
        name: 'Q6.4',
      }
    ]
  },
  q7: {
    division: true,
    jumpTo: 'q8',
    name: 'Q7',
    weight: 8,
    jumpBack: '',
    progress: 26,
    edss: 'Yes',
    type: 'division',
    answer: '',
    sub: [
      {
        text: `In general, how is your balance when standing?`,
        name: 'Q7.1',
        options: [
          {
            text: `Very good. I never or rarely lose my balance`,
            score: 0,
          }, {
            text: `Good. I sometimes lose my balance or sway when my eyes are closed`,
            score: 1,
          }, {
            text: `Poor. I often lose my balance or sway, even when my eyes are open`,
            score: 2,
          }, {
            text: `Very poor. I always or almost always lose my balance`,
            score: 3,
          }
        ],
        answer: '',
      }, {
        text: `In general, how is your balance when walking a straight line?`,
        name: 'Q7.2',
        options: [
          {
            text: `I can easily walk a straight line`,
            score: 0,
          }, {
            text: `I occasionally lose my balance`,
            score: 1,
          }, {
            text: `I usually have to concentrate to keep my balance`,
            score: 2,
          }, {
            text: `I lose my balance after a few steps`,
            score: 3,
          }, {
            text: `I need help to hold my balance`,
            score: 4,
          }
        ],
        answer: '',
      }, {
        text: `In general, how is your balance when sitting?`,
        name: 'Q7.3',
        options: [
          {
            text: `I am very steady when I sit`,
            score: 0,
          }, {
            text: `I sway once in a while when I sit`,
            score: 1,
          }, {
            text: `I sway constantly when I sit but I never need support`,
            score: 2,
          }, {
            text: `I sometimes need support when I sit to keep from swaying`,
            score: 3,
          }, {
            text: `I usually need support when I sit to keep from swaying`,
            score: 4,
          }
        ],
        answer: '',
      }
    ]
  },
  q8: {
    text: `In general, do tremors or coordination problems make it hard for you to use your arms and legs?`,
    jumpTo: 'q9',
    progress: 30,
    name: 'Q8',
    weight: 9,
    jumpBack: '',
    edss: 'Yes',
    type: 'table',
    answer: '',
    commonOptions: [
      {
        text: `I do not have tremors or coordination problems`,
      }, {
        text: `Rarely make it hard for me to use`,
      }, {
        text: `Sometimes make it hard for me to use`,
      }, {
        text: `Often make it hard for me to use`,
      }, {
        text: `Always make it hard for me to use`,
      }
    ],
    sub: [
      {
        text: `Your arm(s)`,
        name: 'Q8.1',
        options: [
          {
            text: `I do not have tremors or coordination problems`,
            score: 0,
            checked: false
          }, {
            text: `Rarely make it hard for me to use`,
            score: 0,
            checked: false
          }, {
            text: `Sometimes make it hard for me to use`,
            score: 1,
            checked: false
          }, {
            text: `Often make it hard for me to use`,
            score: 2,
            checked: false
          }, {
            text: `Always make it hard for me to use`,
            score: 3,
            checked: false
          }
        ]
      }, {
        text: `Your leg(s)`,
        name: 'Q8.2',
        options: [
          {
            text: `I do not have tremors or coordination problems`,
            score: 0,
            checked: false
          }, {
            text: `Rarely make it hard for me to use`,
            score: 1,
            checked: false
          }, {
            text: `Sometimes make it hard for me to use`,
            score: 2,
            checked: false
          }, {
            text: `Often make it hard for me to use`,
            score: 3,
            checked: false
          }, {
            text: `Always make it hard for me to use`,
            score: 4,
            checked: false
          }
        ]
      }
    ]
  },
  q9: {
    text: `In general, how much muscle weakness do you have in your face?`,
    jumpTo: 'q10',
    name: 'Q9',
    progress: 34,
    weight: 10,
    jumpBack: '',
    edss: 'Yes',
    type: 'table',
    answer: '',
    commonOptions: [
      {
        text: `I do not have muscle weakness in my face`,
        score: 0,
        checked: false
      }, {
        text: `A little, such as when I furrow my eyebrows or laugh`,
        score: 1,
        checked: false
      }, {
        text: `A lot, such as trouble with drooling or when closing my eye(s)`,
        score: 2,
        checked: false
      }, {
        text: `Total weakness or palsy, such as Bell's palsy`,
        score: 3,
        checked: false
      }
    ],
    sub: [
      {
        text: `Right side of your face`,
        name: 'Q9.1',
      }, {
        text: `Left side of your face`,
        name: 'Q9.2',
      }
    ]
  },
  q10: {
    text: `In general, how much feeling do you have in your face?`,
    jumpTo: 'q11',
    name: 'Q10',
    progress: 38,
    weight: 11,
    jumpBack: '',
    edss: 'Yes',
    type: 'table',
    answer: '',
    commonOptions: [
      {
        text: `Feeling is very good. No numbness or pain`,
        score: 0,
        checked: false
      }, {
        text: `Feeling is good. Some numbness`,
        score: 1,
        checked: false
      }, {
        text: `Feeling is fair. Hard to tell sharp touch from dull touch`,
        score: 2,
        checked: false
      }, {
        text: `Feeling is poor. Mild pain`,
        score: 3,
        checked: false
      }, {
        text: `Feeling is very poor or gone. Moderate to severe pain`,
        score: 4,
        checked: false
      }
    ],
    sub: [
      {
        text: `Right side of your face`,
        name: 'Q10.1',
      }, {
        text: `Left side of your face`,
        name: 'Q10.2',
      }
    ]
  },
  q11: {
    text: `Check the answer that best describes your ability to see. If you
        wear glasses or contact lenses, describe your vision when wearing these.`,
    jumpTo: 'q12',
    name: 'Q11',
    progress: 42,
    section: true,
    weight: 12,
    jumpBack: '',
    edss: 'Yes',
    type: 'sub2',
    answer: '',
    commonOptions: [
      {
        text: `I have no problems with my ability to see`,
        score: 0,
        checked: false
      }, {
        text: `My vision is slightly impaired`,
        score: 1,
        checked: false
      }, {
        text: `My vision is very impaired`,
        score: 2,
        checked: false
      }, {
        text: `I am blind, or almost blind, in that eye`,
        score: 3,
        checked: false
      }
    ],
    sub: [
      {
        text: `Problems with vision in your right eye`,
        name: 'Q11.1',
      }, {
        text: `Problems with vision in your left eye`,
        name: 'Q11.2',
      }
    ],
    sub2: [
      {
        text: `Do you have blind spots in your vision?`,
        name: 'Q11.3',
        options: [
          {
            text: `I do NOT have any blind spots in my vision`,
            score: 0
          }, {
            text: `My doctor has told me I have a blind spot but I do not notice it`,
            score: 1
          }, {
            text: `Yes, I notice a blind spot in my vision `,
            score: 2
          }
        ],
        answer: '',
      }
    ]
  },
  q12: {
    text: `Do you have double vision?`,
    jumpTo: 'q13',
    progress: 46,
    name: 'Q12',
    weight: 13,
    jumpBack: '',
    edss: 'Yes',
    answer: '',
    options: [
      {
        text: `I do NOT have any double vision`,
        score: 0,
        checked: false
      }, {
        text: `I have double vision that comes and goes`,
        score: 1,
        checked: false
      }, {
        text: `I almost always have double vision that goes away when one eye is closed`,
        score: 2,
        checked: false
      }, {
        text: `I have complete loss of eye movement when I look in one or more directions (one or both eyes)`,
        score: 3,
        checked: false
      }
    ],
    type: 'radio',
  },
  q13: {
    text: `Do you have any problems with your hearing?`,
    jumpTo: 'q14',
    progress: 50,
    name: 'Q13',
    weight: 14,
    jumpBack: '',
    edss: 'Yes',
    options: [
      {
        text: `I do NOT have problems hearing`,
        score: 0,
        checked: false
      }, {
        text: `I have mild hearing loss on one side`,
        score: 1,
        checked: false
      }, {
        text: `I have moderate or severe hearing loss on one side`,
        score: 2,
        checked: false
      }, {
        text: `I have total hearing loss on both sides. I am effectively deaf`,
        score: 3,
        checked: false
      }
    ],
    type: 'radio',
    answer: '',
  },
  q14: {
    text: `In general, how is your ability to speak?`,
    jumpTo: 'q15',
    progress: 54,
    name: 'Q14',
    weight: 15,
    jumpBack: '',
    edss: 'Yes',
    options: [
      {
        text: `I do NOT have problems speaking`,
        score: 0,
        checked: false
      }, {
        text: `I sometimes slur words but others don't seem to notice`,
        score: 1,
        checked: false
      }, {
        text: `I often slur words and others notice`,
        score: 2,
        checked: false
      }, {
        text: `I slur words so much that it interferes with my ability to have conversations`,
        score: 3,
        checked: false
      }, {
        text: `I slur my words so much that others cannot understand me`,
        score: 4,
        checked: false
      }, {
        text: `I cannot speak`,
        score: 5,
        checked: false
      }
    ],
    type: 'radio',
    answer: '',
  },
  q15: {
    text: `For an average day, check the one answer that best describes your ability to swallow liquids and solids.`,
    jumpTo: 'q16',
    progress: 58,
    name: 'Q15',
    weight: 16,
    jumpBack: '',
    edss: 'Yes',
    options: [
      {
        text: `I do NOT have any problems swallowing liquids or foods`,
        score: 0,
        checked: false
      }, {
        text: `I have problems swallowing liquids or solid foods`,
        score: 1,
        checked: false
      }, {
        text: `I have frequent problems with swallowing and need a pureed diet`,
        score: 2,
        checked: false
      }, {
        text: `I cannot swallow food or liquids`,
        score: 3,
        checked: false
      }
    ],
    type: 'radio',
    answer: '',
  },
  q16: {
    text: `On an average day, which of the following best describes your…`,
    jumpTo: 'q17',
    name: 'Q16',
    progress: 62,
    division: true,
    weight: 17,
    jumpBack: '',
    edss: 'Yes',
    type: 'division',
    section: 'Bowel Functioning',
    answer: '',
    sub: [
      {
        text: `Constipation`,
        name: 'Q16.1',
        options: [
          {
            text: `No constipation`,
            score: 0,
          }, {
            text: `Some constipation`,
            score: 1,
          }, {
            text: `Constipation so severe that I cannot move my bowels without an enema or manual measure`,
            score: 2,
          }
        ],
        answer: '',
      }, {
        text: `Bowel frequency`,
        name: 'Q16.2',
        options: [
          {
            text: `Normal`,
            score: 0,
          }, {
            text: `Mild frequency`,
            score: 1,
          }, {
            text: `I need to be close to the bathroom at all times and/or wear pads`,
            score: 2,
          }, {
            text: `I am not able to control my bowels`,
            score: 3,
          }
        ],
        answer: '',
      }
    ]
  },
  q17: {
    text: `In the last 4 weeks...`,
    jumpTo: 'q20',
    progress: 66,
    division: true,
    name: 'Q17',
    weight: 18,
    jumpBack: '',
    edss: 'Yes',
    type: 'division',
    answer: '',
    sub: [
      {
        name: 'Q17.1',
        text: `How often did you have a sudden and uncomfortable feeling that you had to urinate soon ("urgency")?`,
        options: [
          {
            text: `Never or rarely`,
            score: 0,
          }, {
            text: `About once a week`,
            score: 1,
          }, {
            text: `A few times a week`,
            score: 2,
          }, {
            text: `Every day`,
            score: 3,
          }, {
            text: `Several times a day`,
            score: 4,
          }
        ],
        answer: '',
      }, {
        text: `How often did you leak urine without meaning to, even a small amount?`,
        name: 'Q17.2',
        options: [
          {
            text: `Never or rarely`,
            score: 0,
          }, {
            text: `A few times`,
            score: 1,
          }, {
            text: `About once a week`,
            score: 2,
          }, {
            text: `A few times a week to every day`,
            score: 3,
          }, {
            text: `Several times a day`,
            score: 4,
          }
        ],
        answer: '',
      }, {
        text: `Do you wear a pad for your bladder problems or use a urinal?`,
        name: 'Q18',
        options: [
          {
            text: `No`,
            score: 0,
          }, {
            text: `Yes`,
            score: 1,
          }
        ],
        answer: '',
      }, {
        text: `On an average day, how easy it is for you to start urinating?`,
        name: 'Q19',
        options: [
          {
            text: `I do NOT have trouble with starting to urinate`,
            score: 0,
          }, {
            text: `I sometimes have trouble starting to urinate`,
            score: 1,
          }, {
            text: `I often have trouble starting to urinate, and/or experience frequent urinary tract infections`,
            score: 2,
          }, {
            text: `My difficulty urinating is so severe that I require intermittent catheterization`,
            score: 3,
          }, {
            text: `My difficulty urinating is so severe that I require an indwelling catheter`,
            score: 4,
          }, {
            text: `My retention is so severe that my bladder lets out unexpectedly,
                        even when I don't feel the urge to urinate ("overflow incontinence")`,
            score: 5,
          }
        ],
        answer: '',
      }
    ]
  },
  q20: {
    text: `On an average day, which of the following best describes your cognitive (thinking) ability?`,
    jumpTo: 'q21',
    name: 'Q20',
    progress: 72,
    weight: 20,
    jumpBack: '',
    edss: 'Yes',
    type: 'radio',
    answer: '',
    options: [
      {
        text: `I have NO problems with concentration or memory`,
        score: 0,
      }, {
        text: `I have some concentration and memory problems, or problems with
        coping with stress. But I am able to handle my daily routines including completing this survey`,
        score: 1,
      }, {
        text: `I have problems with concentration and memory that my friends and
        family notice. This is beginning to affect my daily routine. It makes completing  this survey difficult`,
        score: 2,
      }, {
        text: `I have severe impairment in my cognitive thinking abilities. For example,
        I sometimes forget where I am and who I am talking to. I need help completing this survey`,
        score: 3,
      }, {
        text: `I have no meaningful conversation and am unable to handle my affairs
        because of my severe cognitive problems. I need someone else to complete this survey`,
        score: 4,
      }
    ]
  },
  q21: {
    jumpTo: 'q23',
    progress: 76,
    name: 'Q21',
    weight: 21,
    jumpBack: '',
    division: true,
    type: 'division',
    answer: '',
    sub: [
      {
        text: `On an average day, which of the following describes your fatigue?`,
        name: 'Q21',
        edss: 'Yes',
        options: [
          {
            text: `I experience NO fatigue`,
            score: 0,
          }, {
            text: `I experience mild fatigue.
                        I do feel the need to rest more often, but I can still complete all my daily tasks`,
            score: 1,
          }, {
            text: `Due to my fatigue I have to rest unusually often. This affects less
            than half of my daily activities. I often cannot complete my daily routine without naps or significant rest`,
            score: 2,
          }, {
            text: `I experience severe fatigue levels that have overtaken my life. I am
            unable to complete more than half of my daily tasks`,
            score: 3,
          }
        ],
        answer: '',
      },
      {
        text: `In general, how often do you wake up feeling rested in the morning?`,
        edss: 'no',
        name: 'Q22',
        options: [
          {
            text: `All of the time`,
            score: 1,
            checked: false
          }, {
            text: `Most of the time`,
            score: 2,
            checked: false
          }, {
            text: `A good bit of the time`,
            score: 3,
            checked: false
          }, {
            text: `Some of the time`,
            score: 4,
            checked: false
          }, {
            text: `A little of the time`,
            score: 5,
            checked: false
          }, {
            text: `None of the time`,
            score: 6,
            checked: false
          }
        ],
        answer: '',
      }
    ]
  },
  q23: {
    text: `Over the past two weeks, how often have you been bothered by the following?`,
    jumpTo: 'q24',
    name: 'Q23',
    progress: 80,
    weight: 23,
    jumpBack: '',
    type: 'table',
    answer: '',
    commonOptions: [
      {
        text: `Not at all`,
        score: 0,
        checked: false
      }, {
        text: `Several days`,
        score: 1,
        checked: false
      }, {
        text: `More than half the days`,
        score: 2,
        checked: false
      }, {
        text: `Nearly every day`,
        score: 3,
        checked: false
      }
    ],
    sub: [
      {
        text: `Feeling nervous, anxious, or on edge`,
        name: 'Q23.1',
        edss: 'no',
      }, {
        text: `Not being able to stop or control worrying`,
        name: 'Q23.2',
        edss: 'no',
      }, {
        text: `Little interest or pleasure in doing things`,
        name: 'Q23.3',
        edss: 'no',
      }, {
        text: `Feeling down, depressed, or hopeless`,
        name: 'Q23.4',
        edss: 'no',
      }
    ]
  },
  q24: {
    text: `Overall, how satisfied were you with your sexual function during the past 4 weeks?`,
    jumpTo: 'q25',
    type: 'gender',
    gender: 'male',
    name: 'Q24a',
    progress: 85,
    answer: '',
    weight: 24,
    jumpBack: '',
    edss: 'no',
    options: [
      {
        text: `Very dissatisfied`,
        score: 1,
      }, {
        text: `Somewhat dissatisfied`,
        score: 2,
      }, {
        text: `Neither dissatisfied nor satisfied`,
        score: 3,
      }, {
        text: `Somewhat satisfied`,
        score: 4,
      }, {
        text: `Very satisfied`,
        score: 5,
      }
    ],
    male: {
      text: `How much of a problem was each of the following for you during the past 4 weeks?`,
      sub: [
        {
          text: `Lack of sexual interest`,
          name: 'Q24b.1',
          edss: 'no',
          options: [
            {
              text: `Not a problem`,
              score: 1,
              checked: false
            }, {
              text: `A little of a problem`,
              score: 2,
              checked: false
            }, {
              text: `Somewhat of a problem`,
              score: 3,
              checked: false
            }, {
              text: `Very much a problem`,
              score: 4,
              checked: false
            }
          ]
        }, {
          text: `Difficulty getting or keeping an erection`,
          name: 'Q24b.2',
          edss: 'no',
          options: [
            {
              text: `Not a problem`,
              score: 1,
              checked: false
            }, {
              text: `A little of a problem`,
              score: 2,
              checked: false
            }, {
              text: `Somewhat of a problem`,
              score: 3,
              checked: false
            }, {
              text: `Very much a problem`,
              score: 4,
              checked: false
            }
          ]
        }, {
          text: `Difficulty having orgasm`,
          name: 'Q24b.3',
          edss: 'no',
          options: [
            {
              text: `Not a problem`,
              score: 1,
              checked: false
            }, {
              text: `A little of a problem`,
              score: 2,
              checked: false
            }, {
              text: `Somewhat of a problem`,
              score: 3,
              checked: false
            }, {
              text: `Very much a problem`,
              score: 4,
              checked: false
            }
          ]
        }, {
          text: `Ability to satisfy sexual partner`,
          name: 'Q24b.4',
          edss: 'no',
          options: [
            {
              text: `Not a problem`,
              score: 1,
              checked: false
            }, {
              text: `A little of a problem`,
              score: 2,
              checked: false
            }, {
              text: `Somewhat of a problem`,
              score: 3,
              checked: false
            }, {
              text: `Very much a problem`,
              score: 4,
              checked: false
            }
          ]
        }
      ]
    },
    female: {
      text: `How much of a problem was each of the following for you during the past 4 weeks?`,
      sub: [
        {
          text: `Lack of sexual interest`,
          name: 'Q24b.1',
          edss: 'no',
          options: [
            {
              text: `Not a problem`,
              score: 1,
              checked: false
            }, {
              text: `A little of a problem`,
              score: 2,
              checked: false
            }, {
              text: `Somewhat of a problem`,
              score: 3,
              checked: false
            }, {
              text: `Very much a problem`,
              score: 4,
              checked: false
            }
          ],
        }, {
          text: `Inadequate lubrication`,
          name: 'Q24b.2',
          edss: 'no',
          options: [
            {
              text: `Not a problem`,
              score: 1,
              checked: false
            }, {
              text: `A little of a problem`,
              score: 2,
              checked: false
            }, {
              text: `Somewhat of a problem`,
              score: 3,
              checked: false
            }, {
              text: `Very much a problem`,
              score: 4,
              checked: false
            }
          ],
        }, {
          text: `Difficulty having orgasm`,
          name: 'Q24b.3',
          edss: 'no',
          options: [
            {
              text: `Not a problem`,
              score: 1,
              checked: false
            }, {
              text: `A little of a problem`,
              score: 2,
              checked: false
            }, {
              text: `Somewhat of a problem`,
              score: 3,
              checked: false
            }, {
              text: `Very much a problem`,
              score: 4,
              checked: false
            }
          ],
        }, {
          text: `Ability to satisfy sexual partner`,
          name: 'Q24b.4',
          edss: 'no',
          options: [
            {
              text: `Not a problem`,
              score: 1,
              checked: false
            }, {
              text: `A little of a problem`,
              score: 2,
              checked: false
            }, {
              text: `Somewhat of a problem`,
              score: 3,
              checked: false
            }, {
              text: `Very much a problem`,
              score: 4,
              checked: false
            }
          ],
        }
      ]
    }
  },
  q25: {
    text: `In general, how much pain are you in? Select one number from the scale below:`,
    name: 'Q25',
    jumpTo: `q26`,
    progress: 89,
    weight: 25,
    jumpBack: '',
    type: 'scale',
    scale: true,
    max: 10,
    min: 0,
    showTicks: true,
    step: 1,
    thumbLabel: true,
    answer: '',
    section: 'Pain',
    edss: 'No',
    leftRangeLabel: 'No Pain',
    rightRangeLabel: 'Pain as bad as it could be',
    options: [
      {
        text: `0`,
        score: 0,
      }, {
        text: `1`,
        score: 1,
      }, {
        text: `2`,
        score: 2,
      }, {
        text: `3`,
        score: 3,
      }, {
        text: `4`,
        score: 4,
      }, {
        text: `5`,
        score: 5,
      }, {
        text: `6`,
        score: 6,
      }, {
        text: `7`,
        score: 7,
      }, {
        text: `8`,
        score: 8,
      }, {
        text: `9`,
        score: 9,
      }, {
        text: `10`,
        score: 10,
      }
    ],
  },
  q26: {
    text: `Overall, how would you rate your own quality-of-life? Select one number from the scale below
    (0 being the best possible quality-of life, 10 being the worst possible quality-of-life): `,
    name: 'Q26',
    progress: 90,
    type: 'scale',
    scale: true,
    max: 10,
    weight: 26,
    jumpBack: '',
    min: 0,
    showTicks: true,
    step: 1,
    thumbLabel: true,
    answer: '',
    jumpTo: `q27`,
    section: 'Quality of Life',
    edss: 'No',
    leftRangeLabel: 'Best possible Quality-of-Life',
    rightRangeLabel: 'Worst possible Quality-of-Life. As bad as or worse than being dead.',
    options: [
      {
        text: `0`,
        score: 0,
      }, {
        text: `1`,
        score: 1,
      }, {
        text: `2`,
        score: 2,
      }, {
        text: `3`,
        score: 3,
      }, {
        text: `4`,
        score: 4,
      }, {
        text: `5`,
        score: 5,
      }, {
        text: `6`,
        score: 6,
      }, {
        text: `7`,
        score: 7,
      }, {
        text: `8`,
        score: 8,
      }, {
        text: `9`,
        score: 9,
      }, {
        text: `10`,
        score: 10,
      }
    ],
  },
  q27: {
    descr1: `This question asks about relapses.
        A relapse is when MS symptoms flare up. The symptoms might be new or significantly worse than before. Relapses generally: `,
    intro: ['Last for more than 24 hours',
      'Begin 30 days or more after your last relapse began',
      ' Are not related to an infection, fever, or other stresses'],
    name: 'Q27.2',
    progress: 92,
    abbProgress: 1,
    weight: 27,
    jumpBack: '',
    edss: 'no',
    sub3: [
      {
        name: 'Q27.1',
        edss: 'no',
        text: `Have you had any relapses since your last visit? `,
        deleteItems: ['Q27.2', 'Q27.3'],
        options: [
          {
            text: `I've had no relapses`,
            score: 0
          }, {
            text: `I've had relapses`,
            score: 1
          }
        ],
        answer: '',
      }
    ],
    sub2: {
      name: 'Q27.2',
      edss: 'no',
      text: `Have you had any relapses since your last visit? `,
      selectOption: [0, 1, 2, 3, 4, 5, 6],
      answer: '',
    },
    sub1: {
      name: 'Q27.3',
      relapsesYear: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: ''
      },
      relapsesMonth: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: ''
      },
      monthOptions: [
        { text: 'January', value: 1 },
        { text: 'February', value: 2 },
        { text: 'March', value: 3 },
        { text: 'April', value: 4 },
        { text: 'May', value: 5 },
        { text: 'June', value: 6 },
        { text: 'July', value: 7 },
        { text: 'August', value: 8 },
        { text: 'September', value: 9 },
        { text: 'October', value: 10 },
        { text: 'November', value: 11 },
        { text: 'December', value: 12 }
      ],
      answer_options: [],
      answer_options_score: [],
    },
    score: 0,
    jumpTo: `q28`,
    relapses: true,
    section: 'Relapse',
    type: 'relapses'
  },
  q28: {
    text: `Who completed this questionnaire?`,
    jumpTo: `q29`,
    progress: 95,
    abbProgress: 33.3,
    name: 'Q28',
    weight: 28,
    jumpBack: '',
    edss: 'no',
    options: [
      {
        text: `I completed it on my own`,
        score: 0,
        checked: false
      }, {
        text: `I required assistance to complete it`,
        score: 1,
        checked: false
      }
    ],
    type: 'radio',
    answer: '',
  },
  q29: {
    text: `Select all that apply`,
    progress: 98,
    abbProgress: 66.6,
    name: 'Q29',
    weight: 29,
    jumpBack: '',
    descr1: `Please select any topics you'd like to discuss at your next appointment.`,
    type: 'patientConcerns',
    jumpTo: 'review',
    section: 'Patient Concerns',
    outro: 'Click next to review the information before it’s sent to your doctor. ',
    edss: 'No',
    answer: '',
    options: [
      {
        text: `Medication concerns`,
        score: 1,
        checked: false,
      }, {
        text: `Medication refills`,
        score: 1,
        checked: false,
      }, {
        text: `Work-related needs`,
        score: 1,
        checked: false,
      }, {
        text: `Family planning`,
        score: 1,
        checked: false,
      }, {
        text: `Other topic`,
        score: 1,
        checked: false,
        textBox: true,
        othertext: ''
      },
      {
        text: `Other topic`,
        score: 1,
        checked: false,
        textBox: true,
        othertext: ''
      }, {
        text: `Other topic`,
        score: 1,
        checked: false,
        textBox: true,
        othertext: ''
      }
    ],
  }
};
