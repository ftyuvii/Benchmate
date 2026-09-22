import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'announcements', 'assignments', 'timetable'

  // Chat Messages State
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey everyone, kal Practical Exam file submit karni hai na?', sender: 'other', time: '10:15 AM' },
    { id: 2, text: 'Haan, PDF format me upload karni hai.', sender: 'me', time: '10:17 AM' }
  ]);
  const [inputText, setInputText] = useState('');

  // Announcements Data
  const [announcements] = useState([
    { id: 1, title: 'Mid-Term Exam Date Sheet', date: 'Oct 02', detail: 'Mid-term exams start from next Monday. Timetable is attached on notice board.' },
    { id: 2, title: 'BCA Lab Rescheduled', date: 'Sep 24', detail: 'Tomorrow Lab practical session is shifted to 2:00 PM.' }
  ]);

  // Assignments Data
  const [assignments] = useState([
    { id: 1, title: 'Web Development Project', subject: 'React & JavaScript', due: 'Tomorrow, 11:59 PM', status: 'Pending' },
    { id: 2, title: 'DBMS ER-Diagram Task', subject: 'Database Systems', due: 'Sep 28', status: 'Completed' }
  ]);

  // Timetable Data
  const [schedule] = useState([
    { time: '09:00 AM', subject: 'Data Structures', room: 'Lab 2' },
    { time: '10:30 AM', subject: 'Web Technologies', room: 'Room 204' },
    { time: '12:00 PM', subject: 'Database Management Systems', room: 'Room 201' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <div className="chat-container">
      {/* App Header */}
      <header className="chat-header">
        <h2 style={{ color: '#38bdf8' }}>Benchmate</h2>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Class Hub & Management</span>
      </header>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #334155', background: '#0f172a' }}>
        {['chat', 'announcements', 'assignments', 'timetable'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '10px 4px',
              background: 'none',
              border: 'none',
              color: activeTab === tab ? '#38bdf8' : '#94a3b8',
              borderBottom: activeTab === tab ? '2px solid #38bdf8' : 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '12px',
              textTransform: 'capitalize'
            }}
          >
            {tab === 'announcements' ? 'Notices' : tab === 'timetable' ? 'Schedule' : tab}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="chat-messages">
        {/* 1. CHAT TAB */}
        {activeTab === 'chat' && (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-bubble ${
                msg.sender === 'me' ? 'message-sent' : 'message-received'
              }`}
            >
              <div>{msg.text}</div>
              <div style={{ fontSize: '10px', opacity: 0.7, textAlign: 'right', marginTop: '4px' }}>
                {msg.time}
              </div>
            </div>
          ))
        )}

        {/* 2. NOTICES TAB */}
        {activeTab === 'announcements' && (
          announcements.map((item) => (
            <div key={item.id} style={{ background: '#334155', padding: '12px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong style={{ color: '#38bdf8' }}>{item.title}</strong>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{item.date}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#e2e8f0' }}>{item.detail}</p>
            </div>
          ))
        )}

        {/* 3. ASSIGNMENTS TAB */}
        {activeTab === 'assignments' && (
          assignments.map((item) => (
            <div key={item.id} style={{ background: '#334155', padding: '12px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong>{item.title}</strong>
                <span style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: item.status === 'Completed' ? '#166534' : '#854d0e',
                  color: '#fff'
                }}>
                  {item.status}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Subject: {item.subject}</div>
              <div style={{ fontSize: '12px', color: '#f43f5e', marginTop: '4px' }}>Due: {item.due}</div>
            </div>
          ))
        )}

        {/* 4. TIMETABLE TAB */}
        {activeTab === 'timetable' && (
          schedule.map((item, idx) => (
            <div key={idx} style={{ background: '#334155', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ display: 'block', color: '#f8fafc' }}>{item.subject}</strong>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.room}</span>
              </div>
              <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 'bold' }}>{item.time}</span>
            </div>
          ))
        )}
      </div>

      {/* Chat Input Bar (Only in Chat Tab) */}
      {activeTab === 'chat' && (
        <form className="chat-input-container" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="chat-input"
            placeholder="Class me message bhejo..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="send-btn">Send</button>
        </form>
      )}
    </div>
  );
      }
                
