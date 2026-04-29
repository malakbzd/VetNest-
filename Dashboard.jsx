import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div style={styles.container}>
      <div style={styles.welcomeCard}>
        <h1 style={styles.title}>Welcome back, {user.name || "Pet Lover"}! 🐾</h1>
        <p style={styles.subtitle}>Your dashboard is your command center for all things pet care.</p>
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <h3> Pets</h3>
            <p>Manage your furry friends</p>
            <Link to="/pets" style={styles.linkButton}>Go to Pets</Link>
          </div>
          <div style={styles.statCard}>
            <h3> Appointments</h3>
            <p>Schedule vet visits</p>
            <Link to="/appointments" style={styles.linkButton}>View Appointments</Link>
          </div>
          <div style={styles.statCard}>
            <h3> Shop</h3>
            <p>Find the best products</p>
            <Link to="/shop" style={styles.linkButton}>Explore Shop</Link>
          </div>
          <div style={styles.statCard}>
            <h3> Articles</h3>
            <p>Learn about pet care</p>
            <Link to="/articles" style={styles.linkButton}>Read Articles</Link>
          </div>
        </div>
        <p style={styles.motivation}>Your pets deserve the best – and you're giving it to them!</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "80vh",
    padding: "2rem",
    background: "linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%)",
  },
  welcomeCard: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
    borderRadius: "24px",
    padding: "2rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    color: "#2c3e50",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#7f8c8d",
    marginBottom: "2rem",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
    margin: "2rem 0",
  },
  statCard: {
    background: "#f8f9fa",
    borderRadius: "16px",
    padding: "1.5rem",
    transition: "transform 0.3s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  linkButton: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "0.5rem 1.2rem",
    backgroundColor: "#3498db",
    color: "white",
    textDecoration: "none",
    borderRadius: "30px",
    transition: "background 0.3s",
  },
  motivation: {
    marginTop: "2rem",
    fontStyle: "italic",
    color: "#95a5a6",
  },
};

export default Dashboard;