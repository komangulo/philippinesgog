import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Default translations
const translations: Record<string, { en: string; th: string }> = {
  'applyNow': {
    en: 'Apply Now',
    th: 'สมัครเลย'
  },
  'successStories': {
    en: 'Success Stories for Philippines Go Go Bar auditions',
    th: 'เรื่องราวความสำเร็จสำหรับการออดิชั่นโกโก้บาร์ฟิลิปปินส์'
  },
  'faq': {
    en: 'Frequently asked questions for Philippines Go Go Bar auditions',
    th: 'คำถามที่พบบ่อยสำหรับการออดิชั่นโกโก้บาร์ฟิลิปปินส์'
  },
  'contactUs': {
    en: 'Contact Us Now',
    th: 'ติดต่อเราเดี๋ยวนี้'
  },
  'startYourJourney': {
    en: 'Start Your Journey Today',
    th: 'เริ่มต้นการเดินทางของคุณวันนี้'
  },
  'namePlaceholder': {
    en: 'Your Name',
    th: 'ชื่อของคุณ'
  },
  'agePlaceholder': {
    en: 'Your Age',
    th: 'อายุของคุณ'
  },
  'cityPlaceholder': {
    en: 'Your City',
    th: 'เมืองที่คุณอยู่'
  },
  'emailPlaceholder': {
    en: 'Your Email',
    th: 'อีเมลของคุณ'
  },
  'socialMediaPlaceholder': {
    en: 'Social Media (Optional)',
    th: 'โซเชียลมีเดีย (ไม่จำเป็น)'
  },
  'messagePlaceholder': {
    en: 'Your Message',
    th: 'ข้อความของคุณ'
  },
  'submitButton': {
    en: 'Submit Application',
    th: 'ส่งใบสมัคร'
  },
  'submitting': {
    en: 'Submitting...',
    th: 'กำลังส่ง...'
  },
  'submitted': {
    en: 'Thank you! We\'ll be in touch soon.',
    th: 'ขอบคุณ! เราจะติดต่อคุณเร็วๆ นี้'
  },
  'errorSubmitting': {
    en: 'Error submitting form. Please try again.',
    th: 'เกิดข้อผิดพลาดในการส่งแบบฟอร์ม โปรดลองอีกครั้ง'
  },
  'couldBeNext': {
    en: 'Could you be our next success story?',
    th: 'คุณจะเป็นเรื่องราวความสำเร็จถัดไปของเราหรือไม่?'
  },
  'mainTitle': {
    en: 'PHILIPPINES GOGO BAR AUDITIONS',
    th: 'การออดิชั่นโกโก้บาร์พัทยา'
  },
  'mainSubtitle': {
    en: 'Your dream career as a go go dancer in Philippines starts here',
    th: 'อาชีพในฝันของคุณในฐานะนักเต้นโกโก้บาร์ในพัทยาเริ่มต้นที่นี่'
  },
  'faqQuestion1': {
    en: 'I have no experience. Can I still apply?',
    th: 'ฉันไม่มีประสบการณ์ ยังสมัครได้ไหม?'
  },
  'faqAnswer1': {
    en: 'Absolutely! Many of the most successful dancers started with no experience at all. We specialize in connecting new talent with top bars that are eager to train and support you. Your personality and enthusiasm are what matter most. We believe in your potential!',
    th: 'แน่นอน! นักเต้นที่ประสบความสำเร็จมากมายหลายคนเริ่มต้นจากไม่มีประสบการณ์เลย เรามีความเชี่ยวชาญในการเชื่อมต่อความสามารถใหม่กับบาร์ชั้นนำที่พร้อมฝึกฝนและสนับสนุนคุณ บุคลิกภาพและความกระตือรือร้นของคุณคือสิ่งที่สำคัญที่สุด เราเชื่อในศักยภาพของคุณ!'
  },
  'faqQuestion2': {
    en: 'Am I expected to have a certain look or body type?',
    th: 'ต้องมีรูปร่างหน้าตาแบบเฉพาะหรือไม่?'
  },
  'faqAnswer2': {
    en: 'Absolutely not! The demand in Philippines is incredibly diverse. Bars are always looking for a wide variety of personalities and looks. What matters most is your confidence and a willingness to learn and engage. Your unique beauty is your biggest asset, and we\'ll help you find a place where you are celebrated for who you are.',
    th: 'ไม่จำเป็นเลย! ความต้องการในฟิลิปปินส์มีความหลากหลายอย่างมาก บาร์ต่างๆ มักมองหาบุคลิกภาพและรูปร่างหน้าตาที่หลากหลาย สิ่งสำคัญที่สุดคือความมั่นใจและความเต็มใจที่จะเรียนรู้และมีส่วนร่วม ความสวยงามที่เป็นเอกลักษณ์ของคุณคือทรัพย์สินที่ยิ่งใหญ่ที่สุด และเราจะช่วยคุณหาสถานที่ที่คุณจะได้รับการยอมรับในตัวคุณเอง'
  },
  'faqQuestion3': {
    en: 'What kind of money can I expect to make?',
    th: 'ฉันสามารถหารายได้เท่าไหร่?'
  },
  'faqAnswer3': {
    en: 'The earning potential is incredible. Between a competitive salary and generous tips, you have the opportunity to earn a substantial income. Your earnings depend on your hard work, but many dancers find a level of financial freedom they\'ve never had before. This is your chance to change your life!',
    th: 'ศักยภาพในการหารายได้นั้นน่าทึ่งมาก ระหว่างเงินเดือนที่แข่งขันได้และทิปที่มากมาย คุณมีโอกาสสร้างรายได้จำนวนมาก รายได้ของคุณขึ้นอยู่กับความขยันของคุณ แต่หลายคนพบว่าตนเองมีอิสระทางการเงินในระดับที่ไม่เคยมีมาก่อน นี่คือโอกาสของคุณที่จะเปลี่ยนชีวิต!'
  },
  'faqQuestion4': {
    en: 'Do I have to work every single night?',
    th: 'ฉันต้องทำงานทุกคืนไหม?'
  },
  'faqAnswer4': {
    en: 'We understand the importance of work-life balance. Many venues offer flexible schedules, and while the nightlife is energetic, you\'ll find there are options that fit your personal needs. We can help you find a position that allows you to earn well and still have time for yourself.',
    th: 'เราเข้าใจถึงความสำคัญของสมดุลระหว่างงานและชีวิตส่วนตัว สถานที่หลายแห่งมีตารางเวลาที่ยืดหยุ่น และแม้ว่าชีวิตกลางคืนจะคึกคัก แต่คุณจะพบว่ามีตัวเลือกที่เหมาะกับความต้องการส่วนตัวของคุณ เราสามารถช่วยคุณหาตำแหน่งที่ช่วยให้คุณมีรายได้ดีและยังมีเวลาส่วนตัวด้วย'
  },
  'faqQuestion5': {
    en: 'Is it safe to work in the Philippines?',
    th: 'การทำงานในฟิลิปปินส์ปลอดภัยไหม?'
  },
  'faqAnswer5': {
    en: 'Safety is our top priority. We only work with reputable and well-established bars that have a proven track record of caring for their staff. You\'ll be part of a vibrant and friendly community of people who look out for each other.',
    th: 'ความปลอดภัยคือสิ่งสำคัญอันดับต้นๆ ของเรา เราทำงานกับบาร์ที่มีชื่อเสียงและมีประวัติที่ดีในการดูแลพนักงานเท่านั้น คุณจะเป็นส่วนหนึ่งของชุมชนที่มีชีวิตชีวาและเป็นมิตรที่คอยช่วยเหลือซึ่งกันและกัน'
  },
  'faqQuestion6': {
    en: 'What is the lifestyle like for a dancer in Philippines?',
    th: 'การใช้ชีวิตของนักเต้นในพัทยาเป็นอย่างไร?'
  },
  'faqAnswer6': {
    en: 'It\'s an adventure! Beyond the work, you\'ll be living in a vibrant city with beautiful beaches, incredible food, and a fantastic community of people from all over the world. Many dancers find this career gives them the flexibility to enjoy their days, explore Thailand, and live a truly exciting life.',
    th: 'มันคือการผจญภัย! นอกเหนือจากงานแล้ว คุณจะได้อยู่ในเมืองที่มีชีวิตชีวาพร้อมชายหาดที่สวยงาม อาหารอร่อย และชุมชนที่น่าทึ่งจากทั่วโลก นักเต้นหลายคนพบว่าเส้นทางอาชีพนี้ให้อิสระในการใช้ชีวิตช่วงกลางวัน สำรวจประเทศไทย และใช้ชีวิตที่ตื่นเต้นอย่างแท้จริง'
  },
  'faqQuestion7': {
    en: 'How quickly can I start working?',
    th: 'ฉันจะเริ่มงานได้เร็วแค่ไหน?'
  },
  'faqAnswer7': {
    en: 'The process is quick and straightforward. Once you contact us, we will guide you through every step, from preparing for your audition to connecting you with bars looking for talent like yours. Our goal is to get you ready for your first shift as soon as possible, so you can start enjoying the benefits of your new career without delay.',
    th: 'กระบวนการนี้รวดเร็วและตรงไปตรงมา เมื่อคุณติดต่อเรา เราจะแนะนำคุณในทุกขั้นตอน ตั้งแต่การเตรียมตัวสำหรับการออดิชัน ไปจนถึงการเชื่อมต่อคุณกับบาร์ที่กำลังมองหาคนที่มีความสามารถแบบคุณ เป้าหมายของเราคือเตรียมความพร้อมให้คุณสำหรับกะแรกให้เร็วที่สุด เพื่อที่คุณจะได้เริ่มต้นใช้ประโยชน์จากอาชีพใหม่ของคุณโดยไม่ชักช้า'
  },
  'faqQuestion8': {
    en: 'How do I get started?',
    th: 'ฉันจะเริ่มต้นได้อย่างไร?'
  },
  'faqAnswer8': {
    en: 'It\'s simple! All you need to do is reach out to us. We will guide you through the process, answer all your questions, and connect you with the best opportunities in Pattaya. Your dream career is just a message away. Contact us now to take the first step!',
    th: 'ง่ายมาก! สิ่งที่คุณต้องทำคือติดต่อเรา เราจะแนะนำคุณตลอดกระบวนการ ตอบทุกคำถามของคุณ และเชื่อมต่อคุณกับโอกาสที่ดีที่สุดในพัทยา อาชีพในฝันของคุณอยู่ใกล้แค่การส่งข้อความ ติดต่อเราตอนนี้เพื่อเริ่มต้นขั้นตอนแรก!'
  },
  'welcomeText': {
    en: 'Welcome to the #1 resource for Philippines gogo bar auditions! Are you looking for a thrilling new career in Philippines\'s most exciting city? We connect aspiring dancers and bar staff with the top-tier Philippines gogo bar hiring venues on Walking Street, Soi Buakhao, and Soi LK Metro. Whether you\'re a seasoned professional or you\'re looking for your very first audition in Philippines, our platform has everything you need. Stop searching and start your journey today!',
    th: 'ยินดีต้อนรับสู่แหล่งข้อมูลอันดับ 1 สำหรับการออดิชั่นโกโก้บาร์พัทยา! คุณกำลังมองหาอาชีพใหม่ที่น่าตื่นเต้นในเมืองที่น่าตื่นตาตื่นใจที่สุดของประเทศไทยหรือไม่? เราเชื่อมต่อนักเต้นและพนักงานบาร์ที่มุ่งมั่นกับสถานที่จ้างงานโกโก้บาร์พัทยาระดับแนวหน้าในถนนวอล์คกิ้งสตรีท, สายไหม, และซอยแอลเคเมโทร ไม่ว่าคุณจะเป็นมืออาชีพที่มีประสบการณ์หรือกำลังมองหาการออดิชั่นครั้งแรกในพัทยา แพลตฟอร์มของเรามีทุกสิ่งที่คุณต้องการ หยุดการค้นหาและเริ่มต้นการเดินทางของคุณวันนี้!'
  },
  'findYourPerfectJob': {
    en: 'Find Your Perfect Job',
    th: 'หางานในฝันของคุณ'
  },
  'job1': {
    en: 'Pattaya Gogo Dancer Jobs: Get discovered by the best clubs',
    th: 'งานนักเต้นโกโก้บาร์พัทยา: เปิดโอกาสให้คุณได้ถูกค้นพบโดยคลับที่ดีที่สุด'
  },
  'job2': {
    en: 'Bar Staff & Hostess Jobs: Waitress, bartender, and hostess positions',
    th: 'งานพนักงานบาร์และโฮสเทส: ตำแหน่งพนักงานเสิร์ฟ, บาร์เทนเดอร์, และโฮสเทส'
  },
  'job3': {
    en: 'Foreigner Auditions: Work permit and visa assistance available',
    th: 'การออดิชั่นสำหรับชาวต่างชาติ: มีความช่วยเหลือเรื่องใบอนุญาตทำงานและวีซ่า'
  },
  'job4': {
    en: 'No Experience? No problem! We offer training for beginners',
    th: 'ไม่มีประสบการณ์? ไม่มีปัญหา! เรามีการฝึกอบรมสำหรับมือใหม่'
  },
  'whyChooseUs': {
    en: 'Why Choose Us?',
    th: 'ทำไมต้องเลือกเรา?'
  },
  'benefit1': {
    en: 'Direct connections to top Pattaya gogo bars',
    th: 'การเชื่อมต่อโดยตรงกับโกโก้บาร์ชั้นนำในพัทยา'
  },
  'benefit2': {
    en: 'Honest advice about working in Pattaya\'s nightlife',
    th: 'คำแนะนำที่ซื่อสัตย์เกี่ยวกับการทำงานในชีวิตกลางคืนพัทยา'
  },
  'benefit3': {
    en: 'Help with work permits and legal requirements',
    th: 'ความช่วยเหลือเรื่องใบอนุญาตทำงานและข้อกำหนดทางกฎหมาย'
  },
  'benefit4': {
    en: 'Support throughout your employment journey',
    th: 'การสนับสนุนตลอดการทำงานของคุณ'
  },
  'dontWait': {
    en: "Don't Wait, Your Audition as a go go dancer in Philippines is Waiting!",
    th: 'อย่ารอช้า การออดิชั่นของคุณในฐานะนักเต้นโกโก้บาร์ในฟิลิปปินส์กำลังรออยู่!'
  },
  'browseListings': {
    en: 'Browse our listings for the latest Philippines bar auditions and take the first step toward a new, exciting career.',
    th: 'ค้นหารายการออดิชั่นบาร์ฟิลิปปินส์ล่าสุดของเรา และก้าวแรกสู่เส้นทางอาชีพใหม่ที่น่าตื่นเต้น'
  },
  'nowHiring': {
    en: 'Now Hiring: Philippines\'s Top Gogo Bars Are Looking for You! • Ready to Shine? Find Your Dream Job in Philippines\'s Nightlife',
    th: 'ตอนนี้เปิดรับสมัคร: โกโก้บาร์ชั้นนำของฟิลิปปินส์กำลังมองหาคุณ! • พร้อมที่จะเปล่งประกายหรือยัง? ค้นหางานในฝันของคุณในชีวิตกลางคืนฟิลิปปินส์'
  },
  'nokReview': {
    en: 'Coming from a small village in the province to working in Manila has changed my life. The salary is amazing - I can send money home every month and still save. My family\'s life has improved so much thanks to this opportunity. The website team was incredibly helpful every step of the way! ❤️',
    th: 'การย้ายจากหมู่บ้านเล็กๆ ในต่างจังหวัดมาทำงานที่มะนิลาได้เปลี่ยนชีวิตของฉัน เงินเดือนดีมาก - ฉันสามารถส่งเงินกลับบ้านทุกเดือนและยังเก็บออมได้ ชีวิตครอบครัวของเราดีขึ้นมากขอบคุณโอกาสนี้ ทีมเว็บไซต์ช่วยเหลืออย่างมากทุกขั้นตอน! ❤️'
  },
  'daoName': {
    en: 'Maria',
    th: 'มาเรีย'
  },
  'daoReview': {
    en: 'I\'ve been working here for a year now, and the difference is night and day compared to farming back home. The salary is life-changing, and I\'ve met people from all over the world. Best of all, I can now afford to send my younger sibling to university - something we never thought possible before.',
    th: 'ฉันทำงานที่นี่มาได้หนึ่งปีแล้ว และความแตกต่างนั้นชัดเจนมากเมื่อเทียบกับการทำไร่ทำนาที่บ้าน เงินเดือนเปลี่ยนชีวิต และฉันได้พบปะผู้คนจากทั่วโลก ที่ดีที่สุดคือ ตอนนี้ฉันสามารถส่งน้องไปเรียนมหาวิทยาลัยได้ - สิ่งที่เราไม่เคยคิดว่าจะเป็นไปได้มาก่อน'
  },
  'daoLocation': {
    en: 'Cebu City, Cebu',
    th: 'เซบูซิตี้, เซบู'
  },
  'mariaName': {
    en: 'Maria',
    th: 'มาเรีย'
  },
  'mariaReview': {
    en: 'Moving from the province to Manila was scary, but it\'s been amazing! The money is so much better than working in tourism back home. I\'ve learned so much about different cultures and improved my English. Now I can help my family with our farm back home.',
    th: 'การย้ายจากต่างจังหวัดมาที่มะนิลาน่ากลัวมาก แต่ก็วิเศษมาก! เงินเดือนดีกว่าการทำงานด้านการท่องเที่ยวที่บ้านเกิดมาก ฉันได้เรียนรู้เกี่ยวกับวัฒนธรรมที่แตกต่างและพัฒนาภาษาอังกฤษของฉัน ตอนนี้ฉันสามารถช่วยเหลือครอบครัวที่ฟาร์มที่บ้านได้แล้ว'
  },
  'mariaLocation': {
    en: 'Davao City, Mindanao',
    th: 'ดาเวา, มินดาเนา'
  },
  'anaName': {
    en: 'Ana',
    th: 'อันนา'
  },
  'anaReview': {
    en: 'Coming from the province, I was worried about the cultural differences, but Manila is so welcoming! The income is incredible compared to working in the farms. I can now support my parents and save for my future. The team here really cares about our success and safety.',
    th: 'การย้ายมาจากต่างจังหวัด ฉันกังวลเรื่องความแตกต่างทางวัฒนธรรม แต่มะนิลาก็ต้อนรับเราเป็นอย่างดี! รายได้ดีมากเมื่อเทียบกับการทำงานในฟาร์ม ตอนนี้ฉันสามารถช่วยเหลือพ่อแม่และเก็บออมเพื่ออนาคตได้แล้ว ทีมงานที่นี่ใส่ใจความสำเร็จและความปลอดภัยของเราจริงๆ'
  },
  'anaLocation': {
    en: 'Baguio City, Luzon',
    th: 'บากีโอ, ลูซอน'
  },
  'meiName': {
    en: 'Mei',
    th: 'เหมย'
  },
  'meiReview': {
    en: 'Working in Manila has been an incredible journey! The support from the team and the work environment is amazing. I\'ve grown so much both personally and professionally. The income allows me to help my family and save for the future.',
    th: 'การทำงานในมะนิลาเป็นประสบการณ์ที่ยอดเยี่ยมมาก! การสนับสนุนจากทีมและสภาพแวดล้อมในการทำงานน่าทึ่งมาก ฉันเติบโตทั้งในด้านส่วนตัวและการทำงาน รายได้ช่วยให้ฉันสามารถช่วยเหลือครอบครัวและเก็บออมเพื่ออนาคตได้'
  },
  'meiLocation': {
    en: 'Cagayan de Oro, Mindanao',
    th: 'คากายัน เด โอโร, มินดาเนา'
  },
  'yingName': {
    en: 'Ying',
    th: 'หญิง'
  },
  'yingReview': {
    en: 'Moving to the city was a big step, but it was the best decision I ever made. The opportunities here are endless, and I\'ve met so many wonderful people. The team has been like a second family to me, always supportive and caring.',
    th: 'การย้ายมาอยู่ในเมืองเป็นก้าวที่ใหญ่ แต่เป็นการตัดสินใจที่ดีที่สุดที่เคยทำ โอกาสที่นี่ไม่มีที่สิ้นสุด และฉันได้พบเจอผู้คนที่ยอดเยี่ยมมากมาย ทีมงานที่นี่เป็นเหมือนครอบครัวที่สองสำหรับฉัน คอยสนับสนุนและเป็นห่วงเป็นใยเสมอ'
  },
  'yingLocation': {
    en: 'Iloilo City, Visayas',
    th: 'อิลอยโล ซิตี้, วิซายาส'
  },
  'googleReview': {
    en: 'Google Review',
    th: 'รีวิวจาก Google'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else if (navigator.language.startsWith('th')) {
      setLanguage('th');
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'th' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
