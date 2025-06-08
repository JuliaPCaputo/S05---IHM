document.addEventListener("DOMContentLoaded", () => {
    let vagas = []

    async function loadVagas() {
        const response = await fetch('vagas.json')
        vagas = await response.json()
    }

    function renderVagas() {
        const container = document.getElementById("vagas-container")

        vagas.forEach((vaga) => {
            const vagaLink = document.createElement("a");
            vagaLink.href=`./DetalhesVagas.html?vagaId=${vaga.id}`;
            vagaLink.classList.add("vaga-link");
            
            const vagaCard = document.createElement("div")
            vagaCard.classList.add("vaga-container")
            
            const cardHeader = `
                <div class="card-header">
                    <img src="${vaga.logo}" alt="Logo da empresa" class="card-header-img">
                </div>
                <div class="card-body">
                    <div class="card-body-row">
                        <span>Empresa:</span>
                        <span>${vaga.empresa}</span>
                    </div>
                    <div class="card-body-row">
                        <span>Cargo:</span>
                        <span>${vaga.cargo}</span>
                    </div>
                    <div class="card-body-row">
                        <span>Descrição:</span>
                        <span>${vaga.descricao}</span>
                    </div>
                    <div class="card-body-row">
                        <span>Carga Horária:</span>
                        <span>${vaga.cargaHoraria}</span>
                    </div>
                    <div class="card-body-row">
                        <span>Período de graduação solicitado:</span>
                        <span>${vaga.periodoGraduacao}</span>
                    </div>
                    </div>
            `

            vagaCard.innerHTML = cardHeader

            vagaLink.append(vagaCard)
            container.append(vagaLink)
        })
    }

    loadVagas().then(() => renderVagas())
})