import "./styles/AboutPage.css";
function AboutPage() {
  return (
    <div className="about-container">
      <h2>About</h2>
      <p>
        NC News is a full-stack news application built as part of my final
        project during the Northcoders JavaScript bootcamp. It allows users to
        browse articles, filter them by topic, vote on their favorite articles,
        and write comments.
      </p>
      <p>
        The project is designed to mirror a simplified version of a news
        aggregation platform, focusing on creating a responsive, user-friendly
        frontend and connecting it to a real-time backend service.
      </p>
      <h3>Tech Stack</h3>
      <p>
        Frontend: React (component-based UI, responsive design, deployed on
        Render)
      </p>
      <p>
        Backend: Supabase hosted PostgreSQL database with RESTful API endpoints
      </p>
      <p>
        This project demonstrates my ability to build and deploy a full-stack
        JavaScript application, work with third-party backend services like
        Supabase, and create a smooth and engaging user experience using modern
        frontend tools.
      </p>
    </div>
  );
}

export default AboutPage;
