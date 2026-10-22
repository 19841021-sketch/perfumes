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
    const filterContainer = document.querySelector(".filter-buttons");
    if (filterContainer) filterContainer.id = "coleccion";

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

    /* ==============================
       ANIMACIONES AL DESPLAZARSE
    ============================== */
    const animatedElements = document.querySelectorAll(
        ".section-title, .product-item, .info-card, .color-card, .scent-quiz-card, .cart-panel, .section-image"
    );
    animatedElements.forEach(function (element) {
        element.classList.add("reveal-on-scroll");
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        animatedElements.forEach(function (element) { revealObserver.observe(element); });
    } else {
        animatedElements.forEach(function (element) { element.classList.add("is-visible"); });
    }

    /* ==============================
       CARRITO LOCAL DE VELORIA
    ============================== */
    const cartItemsContainer = document.getElementById("cartItems");
    if (cartItemsContainer) {
        const cartCount = document.getElementById("cartCount");
        const cartTotal = document.getElementById("cartTotal");
        const cartMessage = document.getElementById("cartMessage");
        const clearCartButton = document.getElementById("clearCart");
        const copyOrderButton = document.getElementById("copyOrder");
        let cart = [];

        try {
            const savedCart = JSON.parse(localStorage.getItem("veloria-cart") || "[]");
            if (Array.isArray(savedCart)) cart = savedCart.filter(item => item && item.id && Number.isFinite(item.price) && Number.isFinite(item.qty) && item.qty > 0);
        } catch (error) {
            cart = [];
        }

        const money = value => "$" + value.toFixed(2);
        const saveCart = () => {
            localStorage.setItem("veloria-cart", JSON.stringify(cart));
            renderCart();
        };

        function renderCart() {
            const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
            const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
            if (cartCount) cartCount.textContent = totalItems;
            cartTotal.textContent = money(total);
            if (!cart.length) {
                cartItemsContainer.innerHTML = '<p class="cart-empty">Tu bolsa está esperando una esencia especial.</p>';
                return;
            }
            cartItemsContainer.innerHTML = cart.map(item => `
                <article class="cart-row" data-cart-id="${item.id}">
                    <div><div class="cart-product-name">${item.name}</div>
                    <div class="cart-product-meta">${money(item.price)} por unidad · Total ${money(item.price * item.qty)}</div></div>
                    <div class="cart-row-actions">
                        <button type="button" class="qty-button" data-cart-action="minus" data-id="${item.id}" aria-label="Quitar una unidad">−</button>
                        <span aria-label="Cantidad">${item.qty}</span>
                        <button type="button" class="qty-button" data-cart-action="plus" data-id="${item.id}" aria-label="Agregar una unidad">+</button>
                        <button type="button" class="remove-item" data-cart-action="remove" data-id="${item.id}">Eliminar</button>
                    </div>
                </article>`).join("");
        }

        document.querySelectorAll(".product-item").forEach(function (product, index) {
            const info = product.querySelector(".product-info");
            const name = info && info.querySelector("h2");
            const priceElement = info && info.querySelector("strong");
            if (!info || !name || !priceElement) return;
            const price = Number(priceElement.textContent.replace(/[^\d.]/g, ""));
            if (!Number.isFinite(price)) return;
            if (!info.querySelector(".add-to-cart")) {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "add-to-cart";
                button.textContent = "＋ Agregar a la bolsa";
                button.dataset.cartAdd = "true";
                button.dataset.productId = "veloria-" + (index + 1);
                button.dataset.productName = name.textContent.trim();
                button.dataset.productPrice = String(price);
                info.appendChild(button);
            }
        });

        document.addEventListener("click", function (event) {
            const addButton = event.target.closest("[data-cart-add]");
            if (addButton) {
                const id = addButton.dataset.productId;
                const existing = cart.find(item => item.id === id);
                if (existing) existing.qty += 1;
                else cart.push({ id, name: addButton.dataset.productName, price: Number(addButton.dataset.productPrice), qty: 1 });
                cartMessage.textContent = addButton.dataset.productName + " se agregó a tu bolsa.";
                saveCart();
                return;
            }
            const actionButton = event.target.closest("[data-cart-action]");
            if (!actionButton) return;
            const item = cart.find(entry => entry.id === actionButton.dataset.id);
            if (!item) return;
            const action = actionButton.dataset.cartAction;
            if (action === "plus") item.qty += 1;
            if (action === "minus") item.qty -= 1;
            if (action === "remove" || item.qty <= 0) cart = cart.filter(entry => entry.id !== item.id);
            cartMessage.textContent = "Tu bolsa se actualizó.";
            saveCart();
        });

        clearCartButton.addEventListener("click", function () {
            cart = [];
            cartMessage.textContent = "La bolsa está vacía.";
            saveCart();
        });

        copyOrderButton.addEventListener("click", async function () {
            if (!cart.length) {
                cartMessage.textContent = "Agrega al menos un perfume antes de preparar el pedido.";
                return;
            }
            const lines = cart.map(item => `${item.name} x${item.qty} — ${money(item.price * item.qty)}`);
            const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
            const orderText = `PEDIDO VELORIA PERFUMES\n${lines.join("\n")}\nSubtotal: ${money(total)}\n\nConsulta disponibilidad y entrega con VELORIA.`;
            try {
                await navigator.clipboard.writeText(orderText);
                cartMessage.textContent = "Resumen copiado. Puedes pegarlo en tu mensaje de contacto.";
            } catch (error) {
                const helper = document.createElement("textarea");
                helper.value = orderText;
                helper.setAttribute("readonly", "");
                helper.style.position = "absolute";
                helper.style.left = "-9999px";
                document.body.appendChild(helper);
                helper.select();
                const copied = document.execCommand("copy");
                helper.remove();
                cartMessage.textContent = copied ? "Resumen copiado. Pégalo en tu mensaje de contacto." : "No se pudo copiar automáticamente. Anota los productos y el total.";
            }
        });
        renderCart();
    }

    /* ==============================
       TEST DE AROMAS
    ============================== */
    const scentQuiz = document.getElementById("scentQuiz");
    if (scentQuiz) {
        scentQuiz.addEventListener("submit", function (event) {
            event.preventDefault();
            const choice = scentQuiz.querySelector('input[name="scentMood"]:checked');
            const result = document.getElementById("scentResult");
            if (!choice || !result) return;
            const recommendations = {
                floral: { title: "Tu perfil: floral y elegante", product: "VELORIA Nº03", detail: "Empieza explorando una fragancia descrita como floral y contemporánea. Puede encajar con tu preferencia por una presencia suave y refinada." },
                fresh: { title: "Tu perfil: fresco y luminoso", product: "VELORIA Nº01", detail: "Prueba una opción luminosa y versátil. Busca notas cítricas, verdes o acuáticas cuando compares aromas." },
                sweet: { title: "Tu perfil: cálido y acogedor", product: "VELORIA Nº02", detail: "Explora fragancias suaves y sofisticadas. Las notas de vainilla, ámbar o frutas pueden gustarte." },
                intense: { title: "Tu perfil: intenso y misterioso", product: "VELORIA Nº06", detail: "Una fragancia descrita como profunda puede ser un buen punto de partida. Busca notas amaderadas, especiadas o ambaradas." }
            };
            const recommendation = recommendations[choice.value];
            result.innerHTML = `<h3>${recommendation.title}</h3><p>${recommendation.detail}</p><strong>Para explorar: ${recommendation.product}</strong><br><a class="btn btn-veloria mt-3" href="#coleccion">Ver la colección</a>`;
            result.hidden = false;
            const targetProduct = Array.from(document.querySelectorAll(".product-item")).find(product => product.querySelector("h2")?.textContent.trim() === recommendation.product);
            if (targetProduct) {
                targetProduct.style.display = "";
                targetProduct.classList.add("is-visible");
                document.querySelectorAll(".filter-btn").forEach(button => button.classList.toggle("active", button.dataset.filter === "todos"));
                targetProduct.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            result.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
    }

}

});


