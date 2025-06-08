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
                <div class=".card-body-row-description">
                    <div class="card-body-description">
                        <strong>Empresa:</strong> ${vaga.empresa}
                    </div>
                    <div class=".card-body-row-description">
                        <strong>Cargo:</strong> ${vaga.cargo}
                    </div>
                    <div class=".card-body-row-description">
                        <strong>Descrição:</strong> ${vaga.descricao}
                    </div>
                    <div class=".card-body-row-description">
                        <strong>Carga Horária:</strong> ${vaga.cargaHoraria}
                    </div>
                    <div class=".card-body-row-description">
                        <strong>Período de graduação solicitado:</strong> ${vaga.periodoGraduacao}
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