document.addEventListener("DOMContentLoaded", async () => {
    const countriesListElement = document.getElementById("countries-list");

    try {
        const response = await fetch("https://restcountries.com/v3/all");
        const countries = await response.json();

        countries.sort((a, b) => a.name.common.toUpperCase().localeCompare(b.name.common.toUpperCase()));

        countries.forEach(country => {
            const countryElement = document.createElement("div");
            countryElement.classList.add("country");
            countryElement.innerHTML = `
                <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
                <p>${country.name.common}</p>
            `;
            countryElement.addEventListener("click", () => showCountryDetails(country));
            countriesListElement.appendChild(countryElement);
        });
    } catch (error) {
        console.error("meeehhhh", error);
    }
});

function showCountryDetails(country) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Circulación:</strong> ${country.car.side === "left" ? "Izquierda" : "Derecha"}</p>
            <button class="modal-close">Cerrar</button>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".modal-close").addEventListener("click", () => {
        document.body.removeChild(modal);
    });
}
