import React, { useState } from 'react';
import Nav from './Nav.jsx';

const PestControl = () => {
  const [selectedContent, setSelectedContent] = useState(null);

  const contentData = [
    {
      id: 1,
      title: "প্রাথমিক পর্যবেক্ষণ জরুরি",
      preview: "পোকা শুরুতে দমন করলে সহজে নিয়ন্ত্রণ হয়।",
      content: "জমি নিয়মিত পর্যবেক্ষণ করলে রোগবালাই ও পোকা দ্রুত চিহ্নিত করা যায়।",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=300&fit=crop",
      details: {
        "নিয়মিত পরিদর্শন": "সপ্তাহে ২-৩ বার জমি দেখুন",
        "পোকার লক্ষণ": "পাতায় ছিদ্র, হলুদ দাগ দেখুন",
        "প্রাথমিক শনাক্তকরণ": "পোকার প্রথম আক্রমণেই ব্যবস্থা নিন",
        "রেকর্ড রাখা": "পোকার ধরন ও সংখ্যা লিখে রাখুন",
        "তুলনামূলক বিশ্লেষণ": "সুস্থ গাছের সাথে তুলনা করুন"
      }
    },
    {
      id: 2,
      title: "প্রাকৃতিক শত্রু ব্যবহার করুন",
      preview: "প্রাকৃতিকভাবে পোকা নিয়ন্ত্রণ সম্ভব।",
      content: "পাখি, ব্যাঙ ও মাকড়সা অনেক ক্ষতিকর পোকা খেয়ে ফেলে। জমিতে এগুলো রক্ষা করা উচিত।",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop",
      details: {
        "পাখি": "পাখির বাসা তৈরি করে দিন",
        "ব্যাঙ": "জমিতে ছোট পুকুর রাখুন",
        "মাকড়সা": "মাকড়সার জাল রক্ষা করুন",
        "প্রাকৃতিক পরিবেশ": "জমির চারপাশে গাছ লাগান",
        "রাসায়নিক এড়ানো": "কম রাসায়নিক ব্যবহার করুন"
      }
    },
    {
      id: 3,
      title: "জৈব কীটনাশক ব্যবহার করুন",
      preview: "নিমপাতার রস, লঙ্কার রস ইত্যাদি কার্যকর।",
      content: "প্রাকৃতিক কীটনাশক পরিবেশবান্ধব এবং স্বাস্থ্যসম্মত।",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop",
      details: {
        "নিমপাতা": "নিমপাতার রস সব পোকা দূর করে",
        "লঙ্কা": "লঙ্কার রস পোকামাকড় তাড়ায়",
        "রসুন": "রসুনের রস ব্যাকটেরিয়া দূর করে",
        "তুলসী": "তুলসীপাতা পোকা প্রতিরোধ করে",
        "সঠিক মিশ্রণ": "সঠিক অনুপাতে মিশিয়ে স্প্রে করুন"
      }
    },
    {
      id: 4,
      title: "ফেরোমন ফাঁদ ব্যবহার করুন",
      preview: "আধুনিক পদ্ধতিতে পোকা ধরা যায়।",
      content: "ফেরোমন ফাঁদ বিশেষ করে বেগুন, টমেটো, ধান ইত্যাদি ফসলে ভালো কাজ করে।",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=300&fit=crop",
      details: {
        "ফেরোমন": "পোকার আকর্ষণের জন্য ফেরোমন ব্যবহার",
        "ফাঁদ স্থাপন": "জমির বিভিন্ন জায়গায় ফাঁদ রাখুন",
        "নিয়মিত পরীক্ষা": "সপ্তাহে ২-৩ বার ফাঁদ পরীক্ষা করুন",
        "পোকা গণনা": "ধরা পড়া পোকার সংখ্যা গণনা করুন",
        "সঠিক সময়": "সন্ধ্যায় ফাঁদ স্থাপন করুন"
      }
    },
    {
      id: 5,
      title: "আলো ফাঁদ ব্যবহার করুন",
      preview: "রাতের বেলায় আলো ফাঁদ কার্যকর।",
      content: "অনেক পোকা আলোতে আসে, ফাঁদে পড়ে যায়। এতে কীটনাশকের ব্যবহার কমে।",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop",
      details: {
        "আলো ফাঁদ": "রাতের বেলায় আলো ফাঁদ স্থাপন করুন",
        "পোকা আকর্ষণ": "পোকা আলোর দিকে আসে",
        "ফাঁদ তৈরি": "সহজ উপায়ে আলো ফাঁদ তৈরি করুন",
        "নিয়মিত পরিষ্কার": "ফাঁদে জমা পোকা পরিষ্কার করুন",
        "সঠিক স্থান": "জমির মাঝখানে ফাঁদ রাখুন"
      }
    },
    {
      id: 6,
      title: "সঠিক কীটনাশক প্রয়োগ করুন",
      preview: "প্রয়োজন ছাড়া কীটনাশক ব্যবহার ক্ষতিকর।",
      content: "বিশেষজ্ঞের পরামর্শ নিয়ে সঠিক পরিমাণে কীটনাশক ব্যবহার করতে হবে।",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=500&h=300&fit=crop",
      details: {
        "বিশেষজ্ঞ পরামর্শ": "কৃষি অফিস থেকে পরামর্শ নিন",
        "সঠিক পরিমাণ": "নির্দেশিত পরিমাণে ব্যবহার করুন",
        "সঠিক সময়": "সকালে বা সন্ধ্যায় স্প্রে করুন",
        "ব্যক্তিগত সুরক্ষা": "মাস্ক ও গ্লাভস ব্যবহার করুন",
        "পরিবেশ সুরক্ষা": "পানি ও মাটি দূষণ এড়ান"
      }
    },
    {
      id: 7,
      title: "ফসল ঘুরিয়ে চাষ করুন",
      preview: "একই ফসল বারবার চাষ করলে পোকা জমে যায়।",
      content: "Crop Rotation করলে জমিতে নতুন রোগ ও পোকার আক্রমণ কম হয়।",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=300&fit=crop",
      details: {
        "ফসল ঘূর্ণন": "ভিন্ন ফসল চাষ করে পোকা নিয়ন্ত্রণ",
        "মৌসুমি পরিবর্তন": "খরিফ-রবি-খরিফ প্যাটার্ন",
        "পোকা চক্র ভাঙা": "পোকার জীবনচক্র ভেঙে দেয়",
        "মাটি বিশ্রাম": "কখনো কখনো জমি ফাঁকা রাখুন",
        "ডাল জাতীয়": "ডাল জাতীয় ফসল মাটি উন্নত করে"
      }
    },
    {
      id: 8,
      title: "রোগাক্রান্ত গাছ সরিয়ে ফেলুন",
      preview: "রোগ ছড়ানো থেকে রক্ষা পেতে দ্রুত সরাতে হবে।",
      content: "আক্রান্ত গাছ কেটে জমি থেকে সরিয়ে ফেললে অন্য গাছে রোগ কম ছড়ায়।",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop",
      details: {
        "দ্রুত সরানো": "রোগের প্রথম লক্ষণেই গাছ সরান",
        "সঠিক পদ্ধতি": "গাছের গোড়া থেকে কেটে ফেলুন",
        "বর্জ্য ব্যবস্থাপনা": "আক্রান্ত গাছ পুড়িয়ে ফেলুন",
        "জমি পরিষ্কার": "আক্রান্ত স্থান পরিষ্কার করুন",
        "অন্যান্য গাছ": "কাছাকাছি গাছ পরীক্ষা করুন"
      }
    },
    {
      id: 9,
      title: "আবহাওয়ার উপর নজর রাখুন",
      preview: "বৃষ্টি ও আর্দ্রতায় পোকা বাড়ে।",
      content: "মৌসুমি আবহাওয়া অনুযায়ী পোকা দমন ব্যবস্থা নিতে হবে।",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      details: {
        "বৃষ্টির পূর্বাভাস": "বৃষ্টির আগে সতর্কতা নিন",
        "আর্দ্রতা": "আর্দ্র আবহাওয়ায় পোকা বাড়ে",
        "তাপমাত্রা": "উপযুক্ত তাপমাত্রায় পোকা দমন করুন",
        "মৌসুমি পরিকল্পনা": "মৌসুম অনুযায়ী পরিকল্পনা করুন",
        "আবহাওয়া অফিস": "স্থানীয় আবহাওয়া অফিসের তথ্য নিন"
      }
    },
    {
      id: 10,
      title: "রাসায়নিক ও জৈব পদ্ধতি মিলিয়ে ব্যবহার করুন",
      preview: "Integrated Pest Management (IPM) সবচেয়ে কার্যকর।",
      content: "জৈব ও রাসায়নিক উভয় পদ্ধতি একসাথে ব্যবহার করলে খরচ কমে ও ফসল সুরক্ষিত থাকে।",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=300&fit=crop",
      details: {
        "IPM পদ্ধতি": "সমন্বিত পোকা দমন ব্যবস্থা",
        "জৈব পদ্ধতি": "প্রথমে জৈব পদ্ধতি ব্যবহার করুন",
        "রাসায়নিক": "শেষ উপায় হিসেবে রাসায়নিক ব্যবহার",
        "খরচ কমানো": "সঠিক পদ্ধতিতে খরচ কমে",
        "পরিবেশ সুরক্ষা": "পরিবেশের ক্ষতি কম হয়"
      }
    }
  ];

  const openModal = (content) => {
    setSelectedContent(content);
  };

  const closeModal = () => {
    setSelectedContent(null);
  };

  return (
    <div className="bg-gray-800 min-h-screen font-sans text-white">
      <Nav />
      <div className="max-w-screen-xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">রোগবালাই ও পোকামাকড়ের দমন</h1>
          <p className="text-gray-300 text-lg">সঠিক পদ্ধতিতে পোকামাকড় নিয়ন্ত্রণ করে ফসল রক্ষা করুন</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentData.map((item) => (
            <div key={item.id} className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-green-400 mb-3">{item.title}</h3>
              <p className="text-gray-300 mb-4">{item.preview}</p>
              <button
                onClick={() => openModal(item)}
                className="bg-gray-600 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg w-full transition-colors"
              >
                বিস্তারিত দেখুন
              </button>
            </div>
          ))}
        </div>

        {/* Enhanced Modal */}
        {selectedContent && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-green-400">{selectedContent.title}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              {/* Image */}
              {selectedContent.image && (
                <div className="mb-6">
                  <img 
                    src={selectedContent.image} 
                    alt={selectedContent.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              {/* Main Content */}
              <div className="text-gray-300 text-lg leading-relaxed mb-6">
                {selectedContent.content}
              </div>
              
              {/* Detailed Information */}
              {selectedContent.details && (
                <div className="bg-gray-700 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-bold text-green-400 mb-4">বিস্তারিত তথ্য</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedContent.details).map(([key, value], index) => (
                      <div key={index} className="bg-gray-600 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-300 mb-2">{key}</h4>
                        <p className="text-gray-300 text-sm">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PestControl;
