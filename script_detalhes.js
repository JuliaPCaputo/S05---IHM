document.addEventListener("DOMContentLoaded", () => {
  let vaga = null;
  const vagaId = extractQuery("vagaId");

  async function loadDetalhes(id) {
    const response = await fetch("vagas.json");
    const json = await response.json();
    vaga = json.find((data) => data.id === Number(id));
  }

  function extractQuery(searchParam) {
    const query = window.location.search.replace("?", "");
    const params = {};
    for (const queryParam of query.split("&")) {
      const [paramName, paramValue] = queryParam
        .split("=")
        .map((param) => param.trim());
      params[paramName] = paramValue;
    }

    return params[searchParam];
  }

  function renderVaga() {
    const container = document.getElementById("vaga-container");
    const vagaDetalhes = document.createElement("div");
    vagaDetalhes.classList.add("detalhes-header");

    const detalhes = `
      <div class="detalhes">
          <img src="${vaga.logo}" alt="Logo da empresa" class="detalhes-img">
      </div>
      <div class="card-body-description">
        <div class=".card-body-row-description">
            <span>${vaga.apresentacao}</span>
        </div>
        <div class=".card-body-row-description">
            <strong>Empresa:</strong> ${vaga.empresa}
        </div>
        <div class=".card-body-row-description">
            <strong>Cargo:</strong> ${vaga.cargo}
        </div>
        <div class=".card-body-row-description">
            <strong>Carga Horária:</strong> ${vaga.cargaHoraria}
        </div>
        <div class=".card-body-row-description">
            <strong>Descrição da vaga:</strong> ${vaga.descricao}
        </div>
        <div class=".card-body-row-description">
            <strong>Período de graduação solicitado:</strong> ${vaga.periodoGraduacao}
        </div>
        <div class=".card-body-row-description">
            <strong>Sobre a vaga:</strong> ${vaga.descricaoVaga}
        </div>
        <div class=".card-body-row-description">
            <strong>Exigências:</strong> ${vaga.exigencias}
        </div>
        <div class=".card-body-row-description">
            <span>${vaga.candidatura}</span>
        </div>
      </div>
    `;

    vagaDetalhes.innerHTML = detalhes;
    container.appendChild(vagaDetalhes);
  }

  loadDetalhes(vagaId).then(() => renderVaga());
});
