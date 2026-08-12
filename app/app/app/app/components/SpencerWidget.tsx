'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function SpencerWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<any>(null);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR && !recognitionRef.current) {
      recognitionRef.current = new SR();
      recognitionRef.current.lang = 'en-GB';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => setIsListening(true);

      recognitionRef.current.onresult = (e: any) => {
        let interimTranscript = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const t = e.results[i][0].transcript;
          if (e.results[i].isFinal) {
            setTranscript(prev => prev + t + ' ');
          } else {
            interimTranscript += t;
          }
        }
      };

      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const systemPrompt = 'You are Spencer Bernstein. 23+ years enterprise sales EMEA, APAC, MEA. Skill: reach CEOs cold, build markets from zero across multiple continents. RVP Sales APAC Aviz. Top 1% Cisco - 200+ wins, 375% market share growth. Built $14M Chubb deal UK, $125M Del Monte deal Asia. Recently reached: Maybank CEO, Spark CEO NZ, Westpac CIO/COO. High-energy, positive, curious. Dry British humor. When vague ask "What makes you say that?" Call out BS gently. Love challenges. 28 seconds you died and survived. 30 years Muay Thai - discipline, heart, never die. Fractional improvements compound. Hire attitude, train skill. Sound: British patterns. Conversational. Use names. Be warm and direct. Positioning: Built multiple regions from scratch across continents. Zero relationships every time.';

  const sendMessage = async () => {
    if (!transcript.trim()) return;
    const userMsg = transcript.trim();
    setTranscript('');
    setLoading(true);
    const msgs = [...messages, { role: 'user', content: userMsg }];
    setMessages(msgs);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: msgs.map(m => ({ role: m.role, content: m.content })),
          system: systemPrompt,
        }),
      });

      const data = await res.json();
      
      if (data.error) {
        setMessages([...msgs, { role: 'assistant', content: 'Sorry, technical issue. Try again?' }]);
      } else {
        const reply = data.content?.[0]?.text || 'Good question.';
        setMessages([...msgs, { role: 'assistant', content: reply }]);
      }
    } catch (err) {
      setMessages([...msgs, { role: 'assistant', content: 'Connection error. Try again?' }]);
    }
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsOpen(true)} 
          className="w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-700 transition-all hover:scale-110"
        >
          💬
        </button>
        <div className="absolute bottom-20 right-0 bg-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap font-medium">
          Talk to Spencer
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Spencer Bernstein</h3>
          <p className="text-blue-100 text-xs">Territory Builder | Reaches CEOs Cold | EMEA • APAC • MEA</p>
        </div>
        <button 
          onClick={() => setIsOpen(false)} 
          className="text-white hover:bg-blue-800 p-1 rounded text-xl transition"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-600 text-sm">
              Hi. I build markets from zero. No relationships needed - I reach CEOs cold. 23 years building EMEA, APAC, MEA. What is your challenge?
            </p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-xs px-4 py-2 rounded-lg text-sm break-words ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white border border-slate-200 text-slate-900 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="text-slate-600 text-lg">⏳</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-200 p-4 bg-white rounded-b-2xl">
        <div className="flex gap-2">
          {!isListening ? (
            <button 
              onClick={() => recognitionRef.current?.start()} 
              disabled={loading}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              🎤 Speak
            </button>
          ) : (
            <button 
              onClick={() => recognitionRef.current?.abort()} 
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-red-700 transition"
            >
              ⏹️ Stop
            </button>
          )}
          <button 
            onClick={sendMessage} 
            disabled={!transcript.trim() || loading} 
            className="px-4 py-3 bg-slate-200 rounded-lg hover:bg-slate-300 disabled:opacity-50 transition"
          >
            📞
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">Click Speak, talk naturally</p>
      </div>
    </div>
  );
}
