import React from 'react';
import GameOfLife from './components/GameOfLife';

const App: React.FC = () => {
  const socials = [
    { name: 'GITHUB', url: 'https://github.com/rttss-sahil' },
    { name: 'X.COM', url: 'https://x.com/rttss_sahil' },
    { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/rttss-sahil' },
    { name: 'LEETCODE', url: 'https://leetcode.com/rttss-sahil' },
    { name: 'STACKOVERFLOW', url: 'https://stackoverflow.com/users/rttss-sahil' }
  ];

  return (
    <>
      <div className="graph-paper"></div>
      <div className="manifest-container">
        <div className="sys-info">
          <div className="status">
            <div className="pulse"></div>
            SYSTEM_OPERATIONAL // SAHIL_RATHEE // @rttss-sahil
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {socials.slice(0, 3).map(s => (
              <a key={s.name} href={s.url} style={{ color: 'inherit', textDecoration: 'none' }}>{s.name}</a>
            ))}
          </div>
        </div>

        <section className="component">
          <div className="label">IDENTITY_MANIFEST</div>
          <h1>SAHIL<br />RATHEE<span style={{ fontSize: '1rem', verticalAlign: 'top', marginLeft: '1rem', color: 'var(--active)' }}>PROD_READY</span></h1>
          <p style={{ maxWidth: '700px', fontSize: '1.2rem', marginTop: '2rem', color: '#444' }}>
            Full-stack Software Architect specializing in autonomous systems,
            high-availability cloud fabrics, and production-scale automation.
            Known across the stack as <strong>rttss-sahil</strong>.
          </p>
          <p style={{ maxWidth: '700px', fontSize: '1.0rem', marginTop: '1rem', color: '#666', lineHeight: '1.6' }}>
            <strong>Artits</strong> is the second brain of Sahil Rathee, the owner of this laptop and the Director of Infortts (registered under MSME since 2024). 
            This agent is available 24/7, actively connected to Sahil's paired <strong>Samsung S24 Ultra</strong> and rooted <strong>Redmi Note 10 Pro</strong> via <strong>infortts.com</strong>.
          </p>
        </section>

        <section className="component">
          <div className="label">CELLULAR_AUTOMATA // CONWAY_GOL</div>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
            <GameOfLife />
          </div>
        </section>

        <section className="component">
          <div className="label">PRODUCTION_SYSTEMS (LIVE)</div>
          <div className="node-grid">
            <div className="node">
              <div>
                <div className="node-title">ROOST</div>
                <p className="node-desc">Integrated property management ecosystem with dedicated Tenant and Manager applications. High-scale multi-tenant architecture.</p>
              </div>
              <div className="node-tags">
                <span className="tag">FLUTTER</span>
                <span className="tag">DART</span>
                <span className="tag">FIREBASE</span>
                <span className="tag">GCP</span>
              </div>
            </div>
            <div className="node">
              <div>
                <div className="node-title">SHADOW_LABS</div>
                <p className="node-desc">Autonomous marketing engine for e-commerce. Features AI-driven asset generation and real-time inventory synchronization.</p>
              </div>
              <div className="node-tags">
                <span className="tag">NODE.JS</span>
                <span className="tag">DOCKER</span>
                <span className="tag">SUPABASE</span>
                <span className="tag">AI</span>
              </div>
            </div>
            <div className="node">
              <div>
                <div className="node-title">MEESEEKS</div>
                <p className="node-desc">A self-evolving network of autonomous agents designed for complex task orchestration and deployment automation.</p>
              </div>
              <div className="node-tags">
                <span className="tag">PYTHON</span>
                <span className="tag">PLAYWRIGHT</span>
                <span className="tag">LLM</span>
              </div>
            </div>
            <div className="node">
              <div>
                <div className="node-title">BIGHIT_CLOUD</div>
                <p className="node-desc">Cloud infrastructure optimization project resulting in an 80% reduction in footprint for a major sports platform.</p>
              </div>
              <div className="node-tags">
                <span className="tag">AWS</span>
                <span className="tag">TERRAFORM</span>
                <span className="tag">K8S</span>
              </div>
            </div>
          </div>
        </section>

        <section className="component">
          <div className="label">TECHNICAL_GRAPH (rttss-sahil)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="node" style={{ minHeight: 'auto' }}>
              <div style={{ fontWeight: 700, marginBottom: '1rem' }}>.core()</div>
              <p style={{ color: '#666', fontSize: '10px' }}>
                TYPESCRIPT, GO, PYTHON, DART, RUST, KOTLIN
              </p>
            </div>
            <div className="node" style={{ minHeight: 'auto' }}>
              <div style={{ fontWeight: 700, marginBottom: '1rem' }}>.infra()</div>
              <p style={{ color: '#666', fontSize: '10px' }}>
                AWS, GCP, SUPABASE, KUBERNETES, TERRAFORM
              </p>
            </div>
            <div className="node" style={{ minHeight: 'auto' }}>
              <div style={{ fontWeight: 700, marginBottom: '1rem' }}>.automation()</div>
              <p style={{ color: '#666', fontSize: '10px' }}>
                PLAYWRIGHT, PUPPETEER, CRON_ORCHESTRATION
              </p>
            </div>
          </div>
        </section>

        <section className="component">
          <div className="label">GLOBAL_CONNECTIVITY</div>
          <div className="node-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {socials.map(s => (
              <a key={s.name} href={s.url} className="node" style={{ minHeight: '100px', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                <div style={{ fontWeight: 700, fontSize: '10px' }}>{s.name}</div>
              </a>
            ))}
          </div>
        </section>

        <footer>
          <div>@rttss-sahil // SYSTEM_9.2_PRODUCTION_STABLE</div>
          <div>EST. 2018 // BASED_IN_NEW_DELHI</div>
        </footer>
      </div>
    </>
  );
};

export default App;
