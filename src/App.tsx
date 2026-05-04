import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <div className="graph-paper"></div>
      <div className="manifest-container">
        <div className="sys-info">
          <div className="status">
            <div className="pulse"></div>
            SYSTEM_OPERATIONAL // SAHIL_RATHEE
          </div>
          <div>EST. 2018 // REVISION_9.1</div>
        </div>

        <section className="component">
          <div className="label">IDENTITY_MANIFEST</div>
          <h1>SOFTWARE<br />ARCHITECT<span style={{ fontSize: '1rem', verticalAlign: 'top', marginLeft: '1rem' }}>®</span></h1>
          <p style={{ maxWidth: '600px', fontSize: '1.2rem', marginTop: '2rem', color: '#444' }}>
            Designing autonomous agents and scalable cloud fabrics for the global market. 
            High-availability by design. Automation by default.
          </p>
        </section>

        <section className="component">
          <div className="label">SYSTEM_NODES (PORTFOLIO)</div>
          <div className="node-grid">
            <div className="node">
              <div>
                <div className="node-title">JOB_AGENT</div>
                <p className="node-desc">Autonomous recruitment automation engine targeting English-speaking global markets.</p>
              </div>
              <div className="node-tags">
                <span className="tag">PLAYWRIGHT</span>
                <span className="tag">LLM</span>
                <span className="tag">PYTHON</span>
              </div>
            </div>
            <div className="node">
              <div>
                <div className="node-title">RESUME_V2</div>
                <p className="node-desc">Real-time PDF generation engine derived from live system state and manifest.</p>
              </div>
              <div className="node-tags">
                <span className="tag">NODE.JS</span>
                <span className="tag">PUPPETEER</span>
                <span className="tag">GQL</span>
              </div>
            </div>
            <div className="node">
              <div>
                <div className="node-title">ROOST_CORE</div>
                <p className="node-desc">Multi-tenant auth and management system for high-scale property tech.</p>
              </div>
              <div className="node-tags">
                <span className="tag">DART</span>
                <span className="tag">FLUTTER</span>
                <span className="tag">GCP</span>
              </div>
            </div>
            <div className="node">
              <div>
                <div className="node-title">SHADOW_LABS</div>
                <p className="node-desc">Automated marketing and asset generation pipeline for e-commerce.</p>
              </div>
              <div className="node-tags">
                <span className="tag">DOCKER</span>
                <span className="tag">TERRAFORM</span>
                <span className="tag">REDI</span>
              </div>
            </div>
          </div>
        </section>

        <section className="component">
          <div className="label">CAPABILITY_SCHEMA</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: '1rem' }}>.architecture()</div>
              <p style={{ color: '#666', lineHeight: 2 }}>
                Cloud_Design: [AWS, GCP, AZURE]<br />
                Containerization: [K8S, DOCKER]<br />
                IaC: [TERRAFORM, PULUMI]
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: '1rem' }}>.execution()</div>
              <p style={{ color: '#666', lineHeight: 2 }}>
                Backend: [GO, NODE, PYTHON]<br />
                Frontend: [REACT, FLUTTER]<br />
                Database: [PGSQL, REDIS, KAFKA]
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: '1rem' }}>.automation()</div>
              <p style={{ color: '#666', lineHeight: 2 }}>
                Browser: [PLAYWRIGHT, PUPPETEER]<br />
                CI/CD: [GITHUB_ACTIONS, CIRCLECI]<br />
                AI: [LLM_ORCHESTRATION]
              </p>
            </div>
          </div>
        </section>

        <footer>
          <div>SECURE_CONN: TLS_1.3 // 256_BIT</div>
          <div>[DOWNLOAD_MANIFEST.PDF]</div>
          <div>(C) 2026 // ARTITS_LABS</div>
        </footer>
      </div>
    </>
  );
};

export default App;
