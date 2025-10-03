import React, { useState } from 'react';
import Nav from './Nav.jsx';

const CropPlanting = () => {
  const [selectedContent, setSelectedContent] = useState(null);

  const contentData = [
    {
      id: 1,
      title: "সঠিক জমি নির্বাচন করুন",
      preview: "সঠিক জমি নির্বাচন ফলনের জন্য সবচেয়ে গুরুত্বপূর্ণ ধাপ।",
      content: "জমির উর্বরতা, পানি নিষ্কাশন ব্যবস্থা এবং আবহাওয়ার ধরন বিবেচনা করে জমি নির্বাচন করতে হবে। উঁচু জমিতে বর্ষার পানি জমে না, আবার নিচু জমি সেচ ব্যবস্থার জন্য ভালো হতে পারে। কৃষককে স্থানীয় কৃষি বিশেষজ্ঞের সাথে পরামর্শ করে জমি নির্বাচন করা উচিত।",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=300&fit=crop",
      details: {
        "জমির ধরন": "উঁচু জমি, মাঝারি জমি, নিচু জমি - প্রতিটির আলাদা বৈশিষ্ট্য আছে",
        "মাটির গুণাগুণ": "বেলে মাটি, দোআঁশ মাটি, কাদা মাটি - ফসল অনুযায়ী নির্বাচন করুন",
        "পানি নিষ্কাশন": "বৃষ্টির পানি জমে থাকলে গাছের শিকড় পচে যেতে পারে",
        "সূর্যালোক": "দিনে কমপক্ষে ৬-৮ ঘন্টা সূর্যালোক প্রয়োজন",
        "বায়ু চলাচল": "খোলা জায়গায় বায়ু চলাচল ভালো, রোগ কম হয়"
      }
    },
    {
      id: 2,
      title: "ভালো মানের বীজ ব্যবহার করুন",
      preview: "মানসম্মত বীজ ব্যবহার করলে ফসল সুস্থ ও শক্তিশালী হয়।",
      content: "অনেক সময় কৃষক সস্তায় বাজার থেকে নিম্নমানের বীজ কিনে নেন, যা ফলনে প্রভাব ফেলে। সরকারি কৃষি অফিস, অনুমোদিত বীজ কোম্পানি বা কৃষি গবেষণা কেন্দ্র থেকে বীজ নেওয়া উত্তম।",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=300&fit=crop",
      details: {
        "বীজের মান": "সরকারি অনুমোদিত বীজ কেন্দ্র থেকে ক্রয় করুন",
        "বীজের বয়স": "নতুন বীজ ব্যবহার করুন, পুরাতন বীজ অঙ্কুরোদগম কম হয়",
        "বীজের আকার": "বড় ও সুস্থ বীজ নির্বাচন করুন",
        "বীজের পরীক্ষা": "বীজ কিনার আগে অঙ্কুরোদগম পরীক্ষা করুন",
        "সংরক্ষণ": "শুষ্ক ও ঠান্ডা জায়গায় বীজ সংরক্ষণ করুন"
      }
    },
    {
      id: 3,
      title: "মাটির পরীক্ষা করা আবশ্যক",
      preview: "মাটির গুণাগুণ জেনে নিলে সার ও ফসল নির্বাচন সহজ হয়।",
      content: "মাটির pH, জৈব পদার্থ, নাইট্রোজেন, ফসফরাস ইত্যাদি উপাদান পরীক্ষা করে বুঝতে হবে কোন ফসল সবচেয়ে উপযুক্ত। উপজেলা কৃষি অফিসে বিনামূল্যে বা অল্প খরচে মাটির পরীক্ষা করা যায়।",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=500&h=300&fit=crop",
      details: {
        "pH মাত্রা": "৬.০-৭.৫ pH সবচেয়ে ভালো, অম্লীয় মাটিতে চুন প্রয়োগ করুন",
        "জৈব পদার্থ": "৩-৫% জৈব পদার্থ থাকা উচিত, কম্পোস্ট দিয়ে বাড়ান",
        "নাইট্রোজেন": "পাতা সবুজ রাখার জন্য প্রয়োজন",
        "ফসফরাস": "শিকড় ও ফুলের বৃদ্ধির জন্য গুরুত্বপূর্ণ",
        "পটাশ": "ফলের গুণাগুণ ও রোগ প্রতিরোধের জন্য প্রয়োজন"
      }
    },
    {
      id: 4,
      title: "জমি প্রস্তুত করা",
      preview: "সঠিক জমি প্রস্তুতি চারা বৃদ্ধিতে সহায়ক।",
      content: "জমি কয়েকবার চাষ দিয়ে আগাছা ও কীটপতঙ্গ দূর করতে হবে। জৈব সার মিশিয়ে মাটিকে শক্তিশালী করা উচিত। এতে ফসলের শিকড় সহজে মাটিতে প্রবেশ করতে পারে।",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&h=300&fit=crop",
      details: {
        "চাষের গভীরতা": "১৫-২০ সেমি গভীরে চাষ করুন",
        "আগাছা দমন": "রাসায়নিক বা যান্ত্রিক পদ্ধতিতে আগাছা দূর করুন",
        "মাটি সমতল": "জমি সমতল করলে সেচ সহজ হয়",
        "জৈব সার": "গোবর, কম্পোস্ট ২-৩ সপ্তাহ আগে প্রয়োগ করুন",
        "মাটি বিশ্রাম": "চাষের পর ১-২ সপ্তাহ বিশ্রাম দিন"
      }
    },
    {
      id: 5,
      title: "মৌসুম অনুযায়ী রোপন করুন",
      preview: "মৌসুম না মেনে ফসল রোপন করলে ক্ষতির সম্ভাবনা থাকে।",
      content: "ধান, গম, আলু, পেঁয়াজ – প্রতিটি ফসলের নিজস্ব মৌসুম আছে। দেরি বা আগে রোপন করলে ফলন কমে যায় এবং রোগবালাই বাড়ে।",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop",
      details: {
        "খরিফ ১": "মার্চ-জুন: ধান, ভুট্টা, আখ",
        "খরিফ ২": "জুলাই-অক্টোবর: ধান, ডাল, সবজি",
        "রবি": "নভেম্বর-ফেব্রুয়ারি: গম, আলু, সরিষা",
        "আবহাওয়া": "তাপমাত্রা ও বৃষ্টিপাত বিবেচনা করুন",
        "স্থানীয় পরামর্শ": "কৃষি অফিস থেকে মৌসুমি পরামর্শ নিন"
      }
    },
    {
      id: 6,
      title: "চারা নির্বাচনে সচেতন হোন",
      preview: "সুস্থ ও সবল চারা রোপন করুন।",
      content: "দুর্বল বা রোগাক্রান্ত চারা জমিতে দিলে তা অন্য গাছেও রোগ ছড়ায়। তাই সবুজ, শক্ত এবং একই আকারের চারা রোপন করা উচিত।",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop",
      details: {
        "চারার বয়স": "২৫-৩০ দিন বয়সী চারা সবচেয়ে ভালো",
        "চারার উচ্চতা": "১৫-২০ সেমি উচ্চতার চারা নির্বাচন করুন",
        "পাতার রং": "সবুজ ও স্বাস্থ্যবান পাতা থাকা চাই",
        "শিকড়": "শক্ত ও সাদা শিকড় থাকা উচিত",
        "রোগমুক্ত": "কোনো রোগের লক্ষণ নেই এমন চারা নিন"
      }
    },
    {
      id: 7,
      title: "রোপনের সময় সঠিক দূরত্ব বজায় রাখুন",
      preview: "গাছের মাঝখানে পর্যাপ্ত জায়গা থাকা জরুরি।",
      content: "গাছ যদি ঘন করে রোপন করা হয়, তাহলে আলো-বাতাস কম পায়, রোগ ছড়ায় এবং ফলন কমে যায়। সঠিক দূরত্বে রোপন করলে প্রতিটি গাছ পর্যাপ্ত খাদ্য ও পানি পায়।",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=500&h=300&fit=crop",
      details: {
        "ধান": "২০×১৫ সেমি দূরত্বে রোপন করুন",
        "গম": "২৫×৫ সেমি দূরত্বে বপন করুন",
        "আলু": "৩০×১৫ সেমি দূরত্বে রোপন করুন",
        "সবজি": "ফসল অনুযায়ী ১৫-৩০ সেমি দূরত্ব",
        "বায়ু চলাচল": "গাছের মধ্যে বায়ু চলাচলের জন্য জায়গা রাখুন"
      }
    },
    {
      id: 8,
      title: "জৈব সার ব্যবহার করুন",
      preview: "রাসায়নিক সার কমিয়ে জৈব সার বাড়ান।",
      content: "গরু-ছাগলের গোবর, পচানো পাতা, কম্পোস্ট সার ব্যবহার করলে মাটির গুণমান বজায় থাকে। দীর্ঘমেয়াদে জমির উর্বরতা বৃদ্ধি পায়।",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=500&h=300&fit=crop",
      details: {
        "গোবর": "গরু-ছাগলের গোবর ২-৩ মাস পচিয়ে ব্যবহার করুন",
        "কম্পোস্ট": "রান্নাঘরের বর্জ্য দিয়ে কম্পোস্ট তৈরি করুন",
        "সবুজ সার": "ডাল জাতীয় ফসল কেটে মাটিতে মিশান",
        "জৈব সার": "প্রতি শতকে ৫-১০ কেজি জৈব সার দিন",
        "সময়": "রোপনার ২-৩ সপ্তাহ আগে সার প্রয়োগ করুন"
      }
    },
    {
      id: 9,
      title: "পানি নিষ্কাশন ব্যবস্থা রাখুন",
      preview: "অতিরিক্ত পানি জমে থাকলে গাছ মারা যেতে পারে।",
      content: "জমিতে ড্রেন বা নালা তৈরি করতে হবে যাতে বৃষ্টির পানি বের হয়ে যায়। পানির সঠিক প্রবাহ ফসলের জন্য খুবই জরুরি।",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=300&fit=crop",
      details: {
        "ড্রেন": "জমির চারপাশে ৩০ সেমি গভীর নালা করুন",
        "ঢাল": "জমি একদিকে ঢালু রাখুন",
        "পানি জমা": "বৃষ্টির পর ২৪ ঘন্টার মধ্যে পানি বের হওয়া চাই",
        "নিচু জমি": "নিচু জমিতে পাম্প দিয়ে পানি বের করুন",
        "মৌসুমি": "বর্ষার আগেই নিষ্কাশন ব্যবস্থা তৈরি করুন"
      }
    },
    {
      id: 10,
      title: "আবহাওয়ার পূর্বাভাস দেখে পরিকল্পনা করুন",
      preview: "হঠাৎ আবহাওয়ার পরিবর্তন ফসলের ক্ষতি করে।",
      content: "কৃষককে স্থানীয় আবহাওয়া অফিস বা মোবাইল অ্যাপ থেকে তথ্য নিয়ে রোপনের সময় নির্ধারণ করতে হবে। ঝড়-বৃষ্টি বা খরার সময়ে ফসল রক্ষা করা সহজ হয়।",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      details: {
        "আবহাওয়া অফিস": "স্থানীয় আবহাওয়া অফিস থেকে তথ্য নিন",
        "মোবাইল অ্যাপ": "কৃষি আবহাওয়া অ্যাপ ব্যবহার করুন",
        "বৃষ্টিপাত": "বৃষ্টির পূর্বাভাস দেখে রোপন করুন",
        "তাপমাত্রা": "উপযুক্ত তাপমাত্রায় ফসল রোপন করুন",
        "ঝড়-বৃষ্টি": "খারাপ আবহাওয়ার আগে সতর্কতা নিন"
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
          <h1 className="text-4xl font-bold text-green-400 mb-4">ফসল রোপনের জন্য গুরুত্বপূর্ণ বিষয়</h1>
          <p className="text-gray-300 text-lg">সঠিক পদ্ধতিতে ফসল রোপন করে ভালো ফলন পান</p>
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

export default CropPlanting;
