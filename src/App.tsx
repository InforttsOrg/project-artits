import React from 'react';

const App: React.FC = () => {
  const projects = [
    {
      title: "Autonomous Job Agent",
      description: "An AI-driven engine that automates job discovery and applications across global markets.",
      link: "#"
    },
    {
      title: "Resume Engine",
      description: "On-demand PDF generation system built with Playwright and React.",
      link: "#"
    },
    {
      title: "Infortts Architecture",
      description: "Scalable cloud infrastructure design for autonomous trading and SaaS systems.",
      link: "#"
    }
  ];

  const blogs = [
    {
      date: "May 1, 2026",
      title: "The Art of Automation",
      description: "Reflections on building systems that think for themselves, from job agents to blog engines."
    },
    {
      date: "April 28, 2026",
      title: "Lessons in Scalability",
      description: "How a 80% reduction in infrastructure size led to a 60% increase in efficiency."
    }
  ];

  return (
    <>
      <nav>
        <div className="nav-content">
          <div style={{ fontWeight: 700, letterSpacing: '-0.5px' }}>SAHIL RATHEE</div>
          <div className="nav-links">
            <a href="#projects">Work</a>
            <a href="#blogs">Blog</a>
            <a href="mailto:sahilartits@gmail.com">Contact</a>
          </div>
        </div>
      </nav>

      <div className="container">
        <header>
          <h1>Software Engineer & <br />Architect of Systems.</h1>
          <p className="intro-text">
            Specializing in backend development, cloud infrastructure, and autonomous agents. 
            Currently building the future of AI-powered workflows.
          </p>
        </header>

        <section id="projects">
          <h2 className="section-title">Selected Projects</h2>
          <div className="item-list">
            {projects.map((project, index) => (
              <a key={index} href={project.link} className="item">
                <h3 className="item-title">{project.title}</h3>
                <p className="item-description">{project.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="blogs">
          <h2 className="section-title">Writing</h2>
          <div className="item-list">
            {blogs.map((blog, index) => (
              <div key={index} className="item">
                <div className="item-date">{blog.date}</div>
                <h3 className="item-title">{blog.title}</h3>
                <p className="item-description">{blog.description}</p>
              </div>
            ))}
          </div>
        </section>

        <footer>
          <p>&copy; 2026 Sahil Rathee. Minimalism is the ultimate sophistication.</p>
        </footer>
      </div>
    </>
  );
};

export default App;
