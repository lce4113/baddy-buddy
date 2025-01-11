"use client"
import React from 'react';

function App() {
  const gameHistory = [
    { id: 1, name: "Game 1", date: "Jan 9th, 2025" },
    { id: 2, name: "Game 2", date: "Jan 10th, 2025" },
    { id: 3, name: "Game 3", date: "Jan 11th, 2025" },
    { id: 4, name: "Game 4", date: "Jan 12th, 2025" },
    { id: 5, name: "Game 5", date: "Jan 13th, 2025" },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Baddy Buddy</h1>
        <p style={styles.subtitle}>Advanced Analytics for Badminton</p>
        <button style={styles.uploadButton}>
          UPLOAD NEW GAME <span style={styles.icon}>📤</span>
        </button>
      </header>

      <section style={styles.gameHistorySection}>
        <h2 style={styles.gameHistoryTitle}>Game History</h2>
        <ul style={styles.gameList}>
          {gameHistory.map((game) => (
            <li key={game.id} style={styles.gameItem}>
              {game.name} - {game.date}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    minHeight: '100vh',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#bb00ff',
  },
  subtitle: {
    fontSize: '16px',
    color: '#aaaaaa',
  },
  uploadButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  icon: {
    marginLeft: '10px',
  },
  gameHistorySection: {
    textAlign: 'center',
  },
  gameHistoryTitle: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  gameList: {
    listStyle: 'none',
    padding: 0,
  },
  gameItem: {
    backgroundColor: '#111',
    padding: '15px 20px',
    margin: '10px auto',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    color: '#fff',
  },
};

export default App;