import React, { useState } from 'react';
import Nav from './Nav.jsx';

const DiseasePrevention = () => {
  const [selectedContent, setSelectedContent] = useState(null);

  const contentData = [
    {
      id: 1,
      title: "রোগমুক্ত বীজ ব্যবহার করুন",
      preview: "রোগ প্রতিরোধ শুরু হয় বীজ থেকে।",
      content: "রোগাক্রান্ত বীজ জমিতে দিলে পুরো ফসল নষ্ট হয়ে যেতে পারে। তাই রোগমুক্ত, প্রক্রিয়াজাত বীজ ব্যবহার করতে হবে।",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=300&fit=crop",
      details: {
        "বীজ পরীক্ষা": "বীজ কিনার আগে রোগের লক্ষণ দেখুন",
        "সরকারি বীজ": "অনুমোদিত বীজ কেন্দ্র থেকে ক্রয় করুন",
        "বীজ শোধন": "রাসায়নিক দিয়ে বীজ শোধন করুন",
        "বীজ সংরক্ষণ": "শুষ্ক ও ঠান্ডা জায়গায় রাখুন",
        "বীজের বয়স": "নতুন বীজ ব্যবহার করুন"
      }
    },
    {
      id: 2,
      title: "সঠিক সময়ে ফসল রোপন করুন",
      preview: "দেরিতে রোপন করলে রোগের ঝুঁকি বাড়ে।",
      content: "সময় মতো ফসল রোপন করলে রোগবালাই অনেকটা কমে যায়। উদাহরণস্বরূপ, সময়মতো ধান রোপন করলে ব্লাস্ট রোগের ঝুঁকি কমে।",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop",
      details: {
        "মৌসুমি সময়": "প্রতিটি ফসলের নির্দিষ্ট রোপন সময় আছে",
        "আবহাওয়া": "উপযুক্ত তাপমাত্রা ও আর্দ্রতায় রোপন করুন",
        "বৃষ্টিপাত": "বৃষ্টির পূর্বাভাস দেখে রোপন করুন",
        "স্থানীয় পরামর্শ": "কৃষি অফিস থেকে সময় জানুন",
        "ফসলের জাত": "রোগ প্রতিরোধী জাত নির্বাচন করুন"
      }
    },
    {
      id: 3,
      title: "রোগ প্রতিরোধী জাত নির্বাচন করুন",
      preview: "উন্নত জাত ফসল রোগ প্রতিরোধী হয়।",
      content: "কৃষি গবেষণা কেন্দ্র থেকে রোগ প্রতিরোধী জাত সংগ্রহ করলে রোগের আক্রমণ তুলনামূলকভাবে কম হয়।",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&h=300&fit=crop",
      details: {
        "উন্নত জাত": "ব্রি ধান, বারি গম - রোগ প্রতিরোধী জাত ব্যবহার করুন",
        "স্থানীয় জাত": "স্থানীয় আবহাওয়ার সাথে মানানসই জাত নির্বাচন করুন",
        "গবেষণা কেন্দ্র": "কৃষি গবেষণা ইনস্টিটিউট থেকে পরামর্শ নিন",
        "জাতের বৈশিষ্ট্য": "রোগ প্রতিরোধ ক্ষমতা সম্পর্কে জানুন",
        "দীর্ঘমেয়াদি": "স্থায়ী রোগ প্রতিরোধের জন্য সঠিক জাত নির্বাচন করুন"
      }
    },
    {
      id: 4,
      title: "জমি পরিষ্কার রাখুন",
      preview: "আগাছা ও রোগাক্রান্ত গাছ ফেলে দিন।",
      content: "জমিতে রোগাক্রান্ত গাছ ফেলে রাখলে তা দ্রুত ছড়িয়ে পড়ে। তাই সাথে সাথে নষ্ট করতে হবে।",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=300&fit=crop",
      details: {
        "আগাছা দমন": "নিয়মিত আগাছা পরিষ্কার করুন",
        "রোগাক্রান্ত গাছ": "আক্রান্ত গাছ তাড়াতাড়ি সরান",
        "জমি পরিষ্কার": "চাষের পর জমি পরিষ্কার রাখুন",
        "বর্জ্য ব্যবস্থাপনা": "রোগাক্রান্ত অংশ পুড়িয়ে ফেলুন",
        "নিয়মিত পরিদর্শন": "সপ্তাহে অন্তত একবার জমি দেখুন"
      }
    },
    {
      id: 5,
      title: "ফসল ঘুরিয়ে চাষ করুন",
      preview: "একই জমিতে বারবার একই ফসল চাষ করলে রোগ বাড়ে।",
      content: "এক মৌসুমে ধান, পরের মৌসুমে ডাল বা সবজি চাষ করলে রোগবালাই অনেকটা নিয়ন্ত্রণে আসে।",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop",
      details: {
        "ফসল ঘূর্ণন": "একই জমিতে ভিন্ন ফসল চাষ করুন",
        "মৌসুমি পরিবর্তন": "খরিফ-রবি-খরিফ প্যাটার্ন অনুসরণ করুন",
        "মাটি বিশ্রাম": "কখনো কখনো জমি ফাঁকা রাখুন",
        "ডাল জাতীয়": "ডাল জাতীয় ফসল মাটি উন্নত করে",
        "রোগ চক্র ভাঙা": "রোগের জীবনচক্র ভেঙে দেয়"
      }
    },
    {
      id: 6,
      title: "সেচ ব্যবস্থায় সচেতন হোন",
      preview: "অতিরিক্ত আর্দ্রতা রোগ বাড়ায়।",
      content: "বেশি পানি জমলে ছত্রাকজনিত রোগ হয়। তাই সঠিক সময়ে ও সঠিক পরিমাণে পানি দিতে হবে।",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=500&h=300&fit=crop",
      details: {
        "সঠিক সেচ": "প্রয়োজন মতো পানি দিন, বেশি নয়",
        "পানি নিষ্কাশন": "জমিতে পানি জমতে দেবেন না",
        "সকালে সেচ": "সকালে সেচ দিলে পাতা শুকিয়ে যায়",
        "মাটির আর্দ্রতা": "মাটির আর্দ্রতা পরীক্ষা করুন",
        "বৃষ্টির পূর্বাভাস": "বৃষ্টির আগে সেচ বন্ধ করুন"
      }
    },
    {
      id: 7,
      title: "প্রয়োজনে জৈব প্রতিরোধ ব্যবহার করুন",
      preview: "রাসায়নিক ছাড়াও প্রাকৃতিক উপায় আছে।",
      content: "নিমপাতা, রসুন, লঙ্কার রস মিশ্রণ স্প্রে করলে প্রাথমিক পর্যায়ের রোগ নিয়ন্ত্রণ করা যায়।",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop",
      details: {
        "নিমপাতা": "নিমপাতার রস ছত্রাকনাশক হিসেবে কাজ করে",
        "রসুন": "রসুনের রস ব্যাকটেরিয়া প্রতিরোধ করে",
        "লঙ্কা": "লঙ্কার রস পোকামাকড় দূর করে",
        "জৈব স্প্রে": "প্রাকৃতিক উপাদান দিয়ে স্প্রে তৈরি করুন",
        "নিয়মিত প্রয়োগ": "সপ্তাহে ২-৩ বার স্প্রে করুন"
      }
    },
    {
      id: 8,
      title: "সুষম সার ব্যবহার করুন",
      preview: "বেশি ইউরিয়া ব্যবহার করলে রোগ বাড়তে পারে।",
      content: "মাটির পরীক্ষার ফল দেখে সার ব্যবহার করলে রোগ প্রতিরোধ ক্ষমতা বাড়ে।",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=500&h=300&fit=crop",
      details: {
        "মাটি পরীক্ষা": "মাটির পরীক্ষা করে সার প্রয়োগ করুন",
        "সুষম সার": "নাইট্রোজেন, ফসফরাস, পটাশ সমানভাবে দিন",
        "জৈব সার": "জৈব সার রোগ প্রতিরোধ ক্ষমতা বাড়ায়",
        "সার সময়": "সঠিক সময়ে সার প্রয়োগ করুন",
        "অতিরিক্ত সার": "অতিরিক্ত ইউরিয়া রোগের ঝুঁকি বাড়ায়"
      }
    },
    {
      id: 9,
      title: "চাষের মাঝে পর্যবেক্ষণ করুন",
      preview: "রোগ আগে ধরা গেলে নিয়ন্ত্রণ সহজ হয়।",
      content: "জমিতে নিয়মিত পর্যবেক্ষণ করলে প্রাথমিক পর্যায়ে রোগ ধরা পড়ে, এবং নিয়ন্ত্রণ করা যায়।",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=300&fit=crop",
      details: {
        "নিয়মিত পরিদর্শন": "সপ্তাহে অন্তত ২-৩ বার জমি দেখুন",
        "রোগের লক্ষণ": "পাতায় দাগ, হলুদ হওয়া দেখুন",
        "প্রাথমিক চিকিৎসা": "রোগের প্রথম লক্ষণেই ব্যবস্থা নিন",
        "রেকর্ড রাখা": "রোগের ধরন ও সময় লিখে রাখুন",
        "তুলনা": "সুস্থ গাছের সাথে তুলনা করুন"
      }
    },
    {
      id: 10,
      title: "কৃষি বিশেষজ্ঞের পরামর্শ নিন",
      preview: "বড় ধরনের রোগে একা সিদ্ধান্ত নেওয়া ঠিক নয়।",
      content: "গুরুতর সমস্যা হলে উপজেলা কৃষি অফিসার বা কৃষি বিশেষজ্ঞের সাহায্য নেওয়া জরুরি।",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      details: {
        "কৃষি অফিস": "উপজেলা কৃষি অফিসে যোগাযোগ করুন",
        "বিশেষজ্ঞ পরামর্শ": "কৃষি বিশেষজ্ঞের পরামর্শ নিন",
        "রোগ শনাক্তকরণ": "রোগের সঠিক নাম জানুন",
        "চিকিৎসা পদ্ধতি": "সঠিক চিকিৎসা পদ্ধতি জানুন",
        "ভবিষ্যতের পরিকল্পনা": "রোগ প্রতিরোধের পরিকল্পনা করুন"
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
          <h1 className="text-4xl font-bold text-green-400 mb-4">ফসল রোগ থেকে বাঁচাতে করণীয়</h1>
          <p className="text-gray-300 text-lg">সঠিক পদ্ধতিতে রোগ প্রতিরোধ করে ফসল রক্ষা করুন</p>
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

export default DiseasePrevention;
