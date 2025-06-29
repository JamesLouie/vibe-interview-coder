'use client';

import React, { useState, useRef, useEffect } from 'react';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const PRESET_ALARMS = [5, 10, 20]; // in minutes

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [alarmAt, setAlarmAt] = useState<number | null>(null); // seconds
  const [customAlarm, setCustomAlarm] = useState('');
  const [blink, setBlink] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const blinkRef = useRef<NodeJS.Timeout | null>(null);
  const blinkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  // Alarm effect
  useEffect(() => {
    if (alarmAt !== null && seconds === alarmAt) {
      // Start blinking
      setBlink(true);
      blinkRef.current = setInterval(() => {
        setBlink((b) => !b);
      }, 500);
      // Stop blinking after 10 seconds if not manually stopped
      blinkTimeoutRef.current = setTimeout(() => {
        stopBlinking();
      }, 10000);
    }
    return () => {
      if (blinkRef.current && (alarmAt === null || seconds < alarmAt)) {
        clearInterval(blinkRef.current);
        blinkRef.current = null;
        setBlink(false);
      }
      if (blinkTimeoutRef.current && (alarmAt === null || seconds < alarmAt)) {
        clearTimeout(blinkTimeoutRef.current);
        blinkTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [seconds, alarmAt]);

  const stopBlinking = () => {
    setBlink(false);
    setAlarmAt(null);
    if (blinkRef.current) {
      clearInterval(blinkRef.current);
      blinkRef.current = null;
    }
    if (blinkTimeoutRef.current) {
      clearTimeout(blinkTimeoutRef.current);
      blinkTimeoutRef.current = null;
    }
  };

  const handleStart = () => setRunning(true);
  const handlePause = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setSeconds(0);
    setAlarmAt(null);
    setBlink(false);
    if (blinkRef.current) {
      clearInterval(blinkRef.current);
      blinkRef.current = null;
    }
    if (blinkTimeoutRef.current) {
      clearTimeout(blinkTimeoutRef.current);
      blinkTimeoutRef.current = null;
    }
  };

  const setAlarmFromNow = (minutes: number) => {
    setAlarmAt(seconds + minutes * 60);
    setCustomAlarm('');
    setRunning(true); // Auto-start timer when alarm is set
  };

  const handleCustomAlarm = () => {
    const min = parseInt(customAlarm, 10);
    if (!isNaN(min) && min > 0) {
      setAlarmFromNow(min);
    }
  };

  const alarmActive = alarmAt !== null && alarmAt > seconds;

  if (!showTimer) {
    return (
      <button
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          padding: '10px 18px',
          borderRadius: 20,
          background: '#222',
          color: '#fff',
          border: 'none',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
        }}
        onClick={() => setShowTimer(true)}
      >
        Start Timer
      </button>
    );
  }

  return (
    <div
      onClick={blink ? stopBlinking : undefined}
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 1000,
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: 12,
        padding: 18,
        minWidth: 180,
        boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: blink ? 'pointer' : 'default',
        animation: blink ? 'blinker 1s linear infinite' : undefined,
        backgroundColor: blink ? '#ffe066' : '#fff',
        borderColor: blink ? '#d97706' : '#ccc',
        transition: 'background 0.2s, border 0.2s',
      }}
      title={blink ? 'Click to stop alarm' : undefined}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 8,
          color: blink ? '#d97706' : '#222',
          borderRadius: 8,
          padding: '2px 12px',
        }}
      >
        {formatTime(seconds)}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={handleStart} disabled={running} style={{ padding: '4px 10px' }}>Start</button>
        <button onClick={handlePause} disabled={!running} style={{ padding: '4px 10px' }}>Pause</button>
        <button onClick={handleReset} style={{ padding: '4px 10px' }}>Reset</button>
      </div>
      {/* Alarm UI */}
      <div style={{ marginTop: 14, width: '100%' }}>
        {!alarmActive ? (
          <>
            <div style={{ fontSize: 13, marginBottom: 4, textAlign: 'center' }}>Set Alarm:</div>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 6 }}>
              {PRESET_ALARMS.map((min) => (
                <button
                  key={min}
                  onClick={() => setAlarmFromNow(min)}
                  style={{ padding: '3px 10px', fontSize: 13, borderRadius: 6, border: '1px solid #ccc', background: '#f9f9f9', cursor: 'pointer' }}
                  disabled={alarmActive}
                >
                  {min} min
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
              <input
                type="number"
                min="1"
                placeholder="Custom min"
                value={customAlarm}
                onChange={e => setCustomAlarm(e.target.value)}
                style={{ width: 70, fontSize: 13, padding: '2px 6px', borderRadius: 6, border: '1px solid #ccc' }}
                disabled={alarmActive}
              />
              <button
                onClick={handleCustomAlarm}
                style={{ padding: '3px 10px', fontSize: 13, borderRadius: 6, border: '1px solid #ccc', background: '#f9f9f9', cursor: 'pointer' }}
                disabled={!customAlarm || alarmActive}
              >
                Set
              </button>
            </div>
          </>
        ) : (
          <div style={{ fontSize: 14, color: '#d97706', marginTop: 4, textAlign: 'center', fontWeight: 600 }}>
            Alarm in {formatTime(alarmAt! - seconds)}
          </div>
        )}
      </div>
      <button
        onClick={() => setShowTimer(false)}
        style={{ marginTop: 8, background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 12 }}
      >
        Close
      </button>
      <style>{`
        @keyframes blinker { 50% { opacity: 0.3; } }
      `}</style>
    </div>
  );
};

export default Timer; 