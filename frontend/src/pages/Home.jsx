import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>What do we do?</h1>
          <div className="divider"></div>
          <p>
            Our aim is to make the Placement Preparation Phase easier for the department of Industrial and Production Engineering at NIT Jalandhar.
          </p>
          <p>
            It is noticed that students struggle in identifying the industry-based skills, the resources and preparation strategies.
          </p>
          <p>
            In order to overcome this, We have made an attempt in creating exclusive platform where both Alumnus and Students of IPE department come together, interact, guide and suggest various Tricks and Techniques to bridge the gap between Company specific needs and Student acquired Skills to crack the Placement as well as Contribute to the development of the department.
          </p>
          <div className="cta-buttons">
            <Link to="/roles" className="btn btn-primary">Explore Roles</Link>
            <Link to="/alumni" className="btn btn-secondary">Connect with Alumni</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Study Materials</h3>
            <p>Access curated study materials shared by alumni and teachers</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Tips & Tricks</h3>
            <p>Learn industry-specific tips and tricks from experienced professionals</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Job Opportunities</h3>
            <p>Discover hiring opportunities shared by alumni working in various companies</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Alumni Network</h3>
            <p>Connect with alumni from your department for guidance and mentorship</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <h3>500+</h3>
          <p>Alumni Connected</p>
        </div>
        <div className="stat-card">
          <h3>200+</h3>
          <p>Study Materials</p>
        </div>
        <div className="stat-card">
          <h3>50+</h3>
          <p>Companies Hiring</p>
        </div>
        <div className="stat-card">
          <h3>100+</h3>
          <p>Success Stories</p>
        </div>
      </section>

      <section className="testimonials-section">
        <h2 className="section-title">What Our Alumni Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"This platform helped me connect with seniors who guided me through the placement process. I'm now working at my dream company!"</p>
            <div className="testimonial-author">
              <img src="https://via.placeholder.com/50" alt="Student" />
              <div>
                <h4>Rahul Sharma</h4>
                <p>Batch of 2022, Amazon</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p>"As an alumnus, I'm happy to give back to my department by sharing my industry experience with juniors. This platform makes it easy."</p>
            <div className="testimonial-author">
              <img src="https://via.placeholder.com/50" alt="Alumni" />
              <div>
                <h4>Priya Patel</h4>
                <p>Batch of 2018, Microsoft</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to get started?</h2>
        <p>Join our community today and take the first step towards your dream career.</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">Sign Up Now</Link>
          <Link to="/login" className="btn btn-secondary">Already a Member? Login</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;