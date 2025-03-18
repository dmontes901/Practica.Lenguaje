import { DataService, ProcessedData } from './dataService';

class App {
  private data: ProcessedData | null = null;

  async initialize() {
    try {
      this.data = await DataService.loadAndValidateData();
      this.renderData();
      this.setupEventListeners();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  private renderData(filterText = '') {
    const container = document.getElementById('data-container');
    if (!container) return; // Verificar que el contenedor existe
    container.innerHTML = '';

    if (!this.data) return;

    // Filtrar municipios por el texto ingresado
    const filtered = this.data.municipalities.filter(muni =>
      muni.name.toLowerCase().includes(filterText.toLowerCase())
    );

    // Crear y agregar elementos al DOM
    filtered.forEach(muni => {
      const card = document.createElement('div');
      card.className = 'card p-3 border rounded shadow-sm';
      card.innerHTML = `
        <h3 class="h5">${muni.name}</h3>
        <p class="text-muted">ID: ${muni.id}</p>
      `;
      container.appendChild(card);
    });
  }

  private setupEventListeners() {
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('input', () => this.renderData(searchInput.value));
    }
  }
}

// Inicializar la aplicación
new App().initialize();
