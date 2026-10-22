document.addEventListener("DOMContentLoaded", function () {


    /* ==============================
       MODO CLARO / OSCURO
    ============================== */

    const themeButton =
        document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem("veloria-theme");


    if (savedTheme === "dark") {

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        if (themeButton) {
            themeButton.textContent = "☀";
        }

    }


    if (themeButton) {

        themeButton.addEventListener("click", function () {

            const currentTheme =
                document.documentElement.getAttribute("data-theme");


            if (currentTheme === "dark") {

                document.documentElement.removeAttribute(
                    "data-theme"
                );

                localStorage.setItem(
                    "veloria-theme",
                    "light"
                );

                themeButton.textContent = "◐";

            } else {

                document.documentElement.setAttribute(
                    "data-theme",
                    "dark"
                );

                localStorage.setItem(
                    "veloria-theme",
                    "dark"
                );

                themeButton.textContent = "☀";

            }

        });

    }


    /* ==============================
       JAVASCRIPT DEMO
    ============================== */

    const jsButton =
        document.getElementById("jsDemoButton");

    const jsText =
        document.getElementById("jsDemoText");


    if (jsButton && jsText) {

        jsButton.addEventListener("click", function () {

            jsText.textContent =
                "¡JavaScript está funcionando correctamente en VELORIA!";

            jsText.classList.add("demo-active");

        });

    }


    /* ==============================
       FILTRO DEL CATÁLOGO
    ============================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const products =
        document.querySelectorAll(".product-item");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            const filter =
                button.getAttribute("data-filter");


            products.forEach(function (product) {

                const category =
                    product.getAttribute("data-category");


                if (
                    filter === "todos" ||
                    filter === category
                ) {

                    product.style.display = "";

                } else {

                    product.style.display = "none";

                }

            });

        });

    });


    /* ==============================
       jQUERY
    ============================== */

    if (typeof jQuery !== "undefined") {

        $("#fadeButton").on("click", function () {

            $("#jqueryDemo").fadeIn(600);

        });


        $("#slideButton").on("click", function () {

            $("#jqueryDemo").slideToggle(600);

        });

    }


    /* ==============================
       CUESTIONARIO
    ============================== */

    const quizForm =
        document.getElementById("quizForm");


    if (quizForm) {

        quizForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const correctAnswers = {

                q1: "a",
                q2: "b",
                q3: "c",
                q4: "a",
                q5: "b",
                q6: "c",
                q7: "a",
                q8: "b"

            };


            let score = 0;


            Object.keys(correctAnswers).forEach(function (question) {

                const selected =
                    document.querySelector(
                        `input[name="${question}"]:checked`
                    );


                const feedback =
                    document.getElementById(
                        question + "-feedback"
                    );


                if (!selected) {

                    feedback.textContent =
                        "No respondida.";

                    feedback.className =
                        "quiz-feedback incorrect";

                    return;

                }


                if (
                    selected.value ===
                    correctAnswers[question]
                ) {

                    score++;

                    feedback.textContent =
                        "✓ Respuesta correcta";

                    feedback.className =
                        "quiz-feedback correct";

                } else {

                    feedback.textContent =
                        "✗ Respuesta incorrecta";

                    feedback.className =
                        "quiz-feedback incorrect";

                }

            });


            const result =
                document.getElementById("quizResult");


            const total = 8;

            const percentage =
                Math.round((score / total) * 100);


            let message = "";


            if (percentage >= 90) {

                message =
                    "¡Excelente trabajo!";

            } else if (percentage >= 70) {

                message =
                    "¡Muy bien! Puedes seguir repasando.";

            } else {

                message =
                    "Te recomendamos repasar los temas.";

            }


            result.innerHTML =
                `<strong>Resultado: ${score}/${total}</strong>
                <br>
                ${percentage}%
                <br>
                ${message}`;


            result.style.display = "block";


            result.scrollIntoView({
                behavior: "smooth"
            });

        });

    }


    /* ==============================
       FORMULARIO DE CONTACTO
    ============================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const formMessage = document.getElementById("formMessage");
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const payload = {
                nombre: document.getElementById("nombre").value.trim(),
                correo: document.getElementById("correo").value.trim(),
                asunto: document.getElementById("asunto").value.trim(),
                mensaje: document.getElementById("mensaje").value.trim()
            };

            formMessage.style.display = "block";
            formMessage.textContent = "Enviando tu mensaje...";
            submitButton.disabled = true;

            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                const result = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(result.error || "No se pudo enviar el mensaje.");
                }

                formMessage.textContent = "✓ Gracias por contactar con VELORIA. Tu mensaje fue enviado correctamente.";
                contactForm.reset();
            } catch (error) {
                formMessage.textContent = "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.";
                console.error("Error enviando formulario:", error);
            } finally {
                submitButton.disabled = false;
            }
        });
    }
    const botonMusica = document.getElementById("boton-musica");
const musica = document.getElementById("musica-veloria");

if (botonMusica && musica) {
  botonMusica.addEventListener("click", async () => {
    if (musica.paused) {
      try {
        await musica.play();
        botonMusica.textContent = "Ⅱ Pausar música";
      } catch (error) {
        botonMusica.textContent = "♫ Intenta reproducir";
      }
    } else {
      musica.pause();
      botonMusica.textContent = "♫ Reproducir música";
    }
  });
}

});


