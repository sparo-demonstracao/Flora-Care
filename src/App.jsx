import React, { useState, useRef } from 'react';

function App() {
    const [showModal, setShowModal] = useState(false);
    const [newPlantImg, setNewPlantImg] = useState(null);
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    const tasks = [
        { planta: 'Ficus Lyrata', regar: 'Em 2 dias', sol: 'Indireto, Brilhante', adubar: 'Em 3 semanas' },
        { planta: 'Espada de São Jorge', regar: 'Em 5 dias', sol: 'Baixa a alta luminosidade', adubar: 'Em 6 semanas' },
        { planta: 'Costela de Adão', regar: 'Em 3 dias', sol: 'Brilhante, Indireto', adubar: 'Em 4 semanas' },
    ];

    const allPlants = [
        { nome: 'Ficus Lyrata', status: 'Regar em 2 dias', img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=400' },
        { nome: 'Espada de São Jorge', status: 'Regar em 5 dias', img: '/images/espada-de-sao-jorge.jpg' },
        { nome: 'Costela de Adão', status: 'Regar em 3 dias', img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=400' },
        { nome: 'Jiboia', status: 'Regar em 4 dias', img: '/images/jiboia.jpg' },
    ];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setNewPlantImg(url);
        }
    };

    return (
        <div className="app-container">
            {/* Modal Overlay */}
            {showModal && (
                <div className="modal-overlay" onClick={() => { setShowModal(false); setNewPlantImg(null); }}>
                    <div className="modal glass-card" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => { setShowModal(false); setNewPlantImg(null); }}>✕</button>
                        <h2 className="modal-title">Adicionar Nova Planta</h2>
                        <p className="modal-subtitle">Escolha como deseja adicionar a foto da sua planta</p>

                        {newPlantImg ? (
                            <div className="modal-preview">
                                <img src={newPlantImg} alt="Preview" />
                                <div className="modal-actions">
                                    <button className="btn-secondary" onClick={() => setNewPlantImg(null)}>Trocar Foto</button>
                                    <button className="btn-add" onClick={() => { setShowModal(false); setNewPlantImg(null); }}>Salvar Planta</button>
                                </div>
                            </div>
                        ) : (
                            <div className="modal-options">
                                <button className="modal-option-btn" onClick={() => cameraInputRef.current?.click()}>
                                    <span className="modal-option-icon">📷</span>
                                    <span className="modal-option-label">Tirar Foto</span>
                                    <span className="modal-option-desc">Use a câmera do dispositivo</span>
                                </button>
                                <button className="modal-option-btn" onClick={() => fileInputRef.current?.click()}>
                                    <span className="modal-option-icon">🖼️</span>
                                    <span className="modal-option-label">Enviar Imagem</span>
                                    <span className="modal-option-desc">Escolha da sua galeria</span>
                                </button>
                            </div>
                        )}

                        <input
                            ref={cameraInputRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
            )}

            <header className="header glass-card">
                <div className="logo-container">
                    <div className="logo-icon">🌿</div>
                    <span>FloraCare</span>
                </div>
                <input type="text" placeholder="Pesquisar plantas..." className="search-bar" />
                <div className="header-right">
                    <div className="notification-badge">
                        🔔
                        <span className="notification-dot"></span>
                    </div>
                    <div className="avatar">
                        <img src="https://ui-avatars.com/api/?name=User&background=bbf7d0&color=166534&bold=true" alt="Perfil" />
                    </div>
                </div>
            </header>

            <div className="section-header">
                <h1>Minhas Plantas</h1>
                <button className="btn-add" onClick={() => setShowModal(true)}>
                    <span>＋</span> Adicionar Planta
                </button>
            </div>

            <section className="glass-card tasks-section">
                <h2>📅 Próximas Tarefas</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table className="tasks-table">
                        <thead>
                            <tr>
                                <th>Planta</th>
                                <th>Rega</th>
                                <th>Sol</th>
                                <th>Adubação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, i) => (
                                <tr key={i}>
                                    <td>{task.planta}</td>
                                    <td>{task.regar}</td>
                                    <td>{task.sol}</td>
                                    <td>{task.adubar}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="all-plants-section">
                <h2>🍃 Todas as Plantas</h2>
                <div className="plants-grid">
                    {allPlants.map((plant, i) => (
                        <div key={i} className="glass-card plant-card">
                            <div className="plant-img-container">
                                <img src={plant.img} alt={plant.nome} />
                            </div>
                            <h3>{plant.nome}</h3>
                            <p className="plant-status">
                                💧 {plant.status}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default App;
