import React, { useState } from 'react';
import Nav from './Nav.jsx';

const FertilizerIrrigation = () => {
  const [selectedContent, setSelectedContent] = useState(null);

  const contentData = [
    {
      id: 1,
      title: "সঠিক পরিমাণে সার ব্যবহার করুন",
      preview: "অতিরিক্ত সার ফসলের ক্ষতি করে।",
      content: "মাটির পরীক্ষার রিপোর্ট অনুযায়ী সার ব্যবহার করলে ফলন ভালো হয়।",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=500&h=300&fit=crop",
      details: {
        "মাটি পরীক্ষা": "মাটির পরীক্ষা করে সার প্রয়োগ করুন",
        "সঠিক পরিমাণ": "প্রতি শতকে নির্দিষ্ট পরিমাণ সার দিন",
        "অতিরিক্ত সার": "অতিরিক্ত সার গাছের ক্ষতি করে",
        "সময়": "সঠিক সময়ে সার প্রয়োগ করুন",
        "সার প্রকার": "ফসল অনুযায়ী সার নির্বাচন করুন"
      }
    },
    {
      id: 2,
      title: "জৈব সার প্রয়োগ করুন",
      preview: "রাসায়নিক সার কমান, জৈব সার বাড়ান।",
      content: "গোবর, কম্পোস্ট, সবুজ সার ব্যবহার করলে মাটির স্বাস্থ্য উন্নত হয়।",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=300&fit=crop",
      details: {
        "গোবর": "গরু-ছাগলের গোবর ২-৩ মাস পচিয়ে ব্যবহার করুন",
        "কম্পোস্ট": "রান্নাঘরের বর্জ্য দিয়ে কম্পোস্ট তৈরি করুন",
        "সবুজ সার": "ডাল জাতীয় ফসল কেটে মাটিতে মিশান",
        "জৈব সার": "প্রতি শতকে ৫-১০ কেজি জৈব সার দিন",
        "সময়": "রোপনার ২-৩ সপ্তাহ আগে সার প্রয়োগ করুন"
      }
    },
    {
      id: 3,
      title: "ইউরিয়া ব্যবহারে সতর্কতা",
      preview: "ইউরিয়া অতিরিক্ত দিলে গাছ দুর্বল হয়।",
      content: "ইউরিয়া সঠিক মাত্রায় ব্যবহার করতে হবে, নাহলে রোগের ঝুঁকি বাড়ে।",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop",
      details: {
        "সঠিক মাত্রা": "প্রতি শতকে ১-২ কেজি ইউরিয়া দিন",
        "সময়": "রোপনার ২৫-৩০ দিন পর ইউরিয়া দিন",
        "অতিরিক্ত ইউরিয়া": "অতিরিক্ত ইউরিয়া রোগের ঝুঁকি বাড়ায়",
        "ভাগ করে দেওয়া": "২-৩ ভাগে ভাগ করে দিন",
        "মাটির সাথে মিশানো": "মাটির সাথে ভালো করে মিশান"
      }
    },
    {
      id: 4,
      title: "সুষম সার প্রয়োগ করুন",
      preview: "শুধু নাইট্রোজেন নয়, অন্যান্য সারও প্রয়োজন।",
      content: "ফসফরাস, পটাশ, সালফার, জিংক ইত্যাদি মাটির জন্য সমান গুরুত্বপূর্ণ।",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=300&fit=crop",
      details: {
        "নাইট্রোজেন": "পাতা সবুজ রাখার জন্য প্রয়োজন",
        "ফসফরাস": "শিকড় ও ফুলের বৃদ্ধির জন্য গুরুত্বপূর্ণ",
        "পটাশ": "ফলের গুণাগুণ ও রোগ প্রতিরোধের জন্য প্রয়োজন",
        "সালফার": "প্রোটিন গঠনের জন্য প্রয়োজন",
        "জিংক": "ফলের বৃদ্ধি ও রোগ প্রতিরোধের জন্য প্রয়োজন"
      }
    },
    {
      id: 5,
      title: "ড্রিপ সেচ পদ্ধতি ব্যবহার করুন",
      preview: "পানি সাশ্রয়ী আধুনিক পদ্ধতি।",
      content: "ড্রিপ সেচে গাছের গোড়ায় সরাসরি পানি দেওয়া হয়, ফলে পানি অপচয় কমে।",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop",
      details: {
        "পানি সাশ্রয়": "৫০-৭০% পানি সাশ্রয় হয়",
        "সঠিক স্থান": "গাছের গোড়ায় সরাসরি পানি দেওয়া",
        "নিয়ন্ত্রিত সেচ": "প্রয়োজন মতো পানি দেওয়া যায়",
        "সার প্রয়োগ": "পানির সাথে সার মিশিয়ে দেওয়া যায়",
        "খরচ": "প্রাথমিক খরচ বেশি, দীর্ঘমেয়াদে সাশ্রয়"
      }
    },
    {
      id: 6,
      title: "স্প্রিঙ্কলার সেচ ব্যবহার করুন",
      preview: "বৃষ্টির মতো পানি ছিটানো হয়।",
      content: "সবজি ও ছোট ফসলে এই সেচ পদ্ধতি ভালো কাজ করে।",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=300&fit=crop",
      details: {
        "সবজি চাষ": "সবজি ও ছোট ফসলে ভালো কাজ করে",
        "সমান সেচ": "জমির সব জায়গায় সমান পানি দেওয়া",
        "পানি ছিটানো": "বৃষ্টির মতো পানি ছিটানো হয়",
        "সময়": "সকালে বা সন্ধ্যায় সেচ দিন",
        "খরচ": "ড্রিপ সেচের চেয়ে কম খরচ"
      }
    },
    {
      id: 7,
      title: "সময় মতো সেচ দিন",
      preview: "প্রয়োজন মতো পানি দিলে ফলন বাড়ে।",
      content: "অতিরিক্ত বা কম পানি দিলে ফসলের ক্ষতি হয়।",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=500&h=300&fit=crop",
      details: {
        "সঠিক সময়": "সকালে বা সন্ধ্যায় সেচ দিন",
        "মাটির আর্দ্রতা": "মাটির আর্দ্রতা পরীক্ষা করুন",
        "ফসলের ধরন": "ফসল অনুযায়ী সেচের পরিমাণ",
        "মৌসুম": "মৌসুম অনুযায়ী সেচের পরিকল্পনা",
        "অতিরিক্ত সেচ": "অতিরিক্ত সেচ গাছের ক্ষতি করে"
      }
    },
    {
      id: 8,
      title: "মাটির আর্দ্রতা বজায় রাখুন",
      preview: "গাছের জন্য পর্যাপ্ত আর্দ্রতা জরুরি।",
      content: "মালচিং করলে মাটির আর্দ্রতা দীর্ঘদিন ধরে রাখা যায়।",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=300&fit=crop",
      details: {
        "মালচিং": "গাছের গোড়ায় খড় বা পাতা দিয়ে ঢেকে দিন",
        "আর্দ্রতা রক্ষা": "মাটির আর্দ্রতা দীর্ঘদিন ধরে থাকে",
        "আগাছা দমন": "মালচিং আগাছা দমনেও সাহায্য করে",
        "তাপমাত্রা": "মাটির তাপমাত্রা নিয়ন্ত্রণ করে",
        "জৈব পদার্থ": "মালচিং পচে জৈব পদার্থ তৈরি করে"
      }
    },
    {
      id: 9,
      title: "বর্ষার পানি সংরক্ষণ করুন",
      preview: "সংরক্ষিত পানি শুষ্ক মৌসুমে কাজে লাগে।",
      content: "বাঁধ বা জলাধারে পানি ধরে রেখে পরে সেচের কাজে ব্যবহার করা যায়।",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      details: {
        "জলাধার": "বাঁধ বা জলাধারে পানি সংরক্ষণ করুন",
        "বৃষ্টির পানি": "বৃষ্টির পানি সংগ্রহ করে রাখুন",
        "শুষ্ক মৌসুম": "শুষ্ক মৌসুমে সংরক্ষিত পানি ব্যবহার করুন",
        "সেচের কাজ": "সংরক্ষিত পানি সেচের কাজে ব্যবহার করুন",
        "খরচ কমানো": "সংরক্ষিত পানি ব্যবহারে খরচ কমে"
      }
    },
    {
      id: 10,
      title: "সেচ ও সার একসাথে প্রয়োগ করুন",
      preview: "আধুনিক ফার্টিগেশন পদ্ধতি ব্যবহার করুন।",
      content: "পানির সাথে সার মিশিয়ে দিলে গাছ সহজে পুষ্টি পায় এবং ফলন বাড়ে।",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=300&fit=crop",
      details: {
        "ফার্টিগেশন": "পানির সাথে সার মিশিয়ে দেওয়া",
        "সহজ শোষণ": "গাছ সহজে পুষ্টি শোষণ করতে পারে",
        "সময় সাশ্রয়": "সেচ ও সার একসাথে দেওয়া যায়",
        "ফলন বৃদ্ধি": "সঠিক পুষ্টি পেয়ে ফলন বাড়ে",
        "খরচ কমানো": "শ্রম ও সময়ের খরচ কমে"
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
          <h1 className="text-4xl font-bold text-green-400 mb-4">সার ও সেচ প্রয়োগ</h1>
          <p className="text-gray-300 text-lg">সঠিক পদ্ধতিতে সার ও সেচ দিয়ে ভালো ফলন পান</p>
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

export default FertilizerIrrigation;
