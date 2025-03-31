class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.hoje = "ter";
  }

  connectedCallback() {
    this.loadData();
  }

  async loadData() {
    try {
      const response = await fetch("aulas.json");
      const aulas = await response.json();
      this.render(aulas);
    } catch (error) {
      console.error("Erro ao carregar os dados das aulas:", error);
    }
  }

  render(aulas) {
    const aulasDia = aulas.filter((a) => a.data === this.hoje);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "styles_componente.css";
    this.shadowRoot.appendChild(link);

    let corNota = "#126ae2";

    this.shadowRoot.innerHTML += `
      <div>
        ${aulasDia
          .map((a) => {
            let provaDisplay = a.prova_alert ? "" : "display: none;";
            if (a.nota < 6) {
              corNota = "#d40404";
            } else if (a.nota >= 6 && a.nota < 8) {
              corNota = "#f0911c";
            } else {
              corNota = "#0dc972";
            }
            return `
            <div class="comp-aula card-container">
              <div class="label-prova p_label" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
              <div class="titulo_aula">${a.disciplina}</div>
              <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
              <div class="labels">
                <div class="label-frequencia p_label">FALTAS: <b>${a.frequencia}</b></div>
                <div class="label-nota p_label" style="background-color: ${corNota};">CR: <b>${a.nota}</b></div>
              </div>
            </div>
          `;
          })
          .join("")}
      </div>
    `;
  }
}

customElements.define("aulas-component", AulasComponent);
